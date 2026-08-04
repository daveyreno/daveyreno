/**
 * A real incompressible fluid solver, run on the GPU.
 *
 * This is the standard stable-fluids pipeline (Stam, "Stable Fluids", 1999;
 * GPU Gems ch.38): splat impulses into a velocity field, advect velocity and
 * dye along it, add vorticity confinement to restore the small curls the
 * semi-Lagrangian advection damps out, then project the velocity back to a
 * divergence-free state with a Jacobi pressure solve and a gradient subtract.
 *
 * The soft saturated blooms with dark rims are not a stylistic trick — they
 * are what an incompressible solver does. Approximating it with curl noise
 * cannot produce them, which is why this is worth the extra passes.
 *
 * All passes share one fullscreen-triangle vertex shader and read neighbours
 * from `uTexelSize`.
 */

export const VERT = /* glsl */ `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(
    (gl_VertexID == 1) ? 3.0 : -1.0,
    (gl_VertexID == 2) ? 3.0 : -1.0
  );
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const HEAD = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
uniform vec2 uTexelSize;
`;

/** Fade a field toward zero — used to bleed off pressure between frames. */
export const CLEAR_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uTexture;
uniform float uValue;
void main() {
  fragColor = uValue * texture(uTexture, vUv);
}`;

/**
 * Gaussian impulse. Used for both velocity (rgb = delta) and dye (rgb = colour).
 * `uAspect` keeps the splat circular on a non-square viewport.
 */
export const SPLAT_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec3  uColor;
uniform vec2  uPoint;
uniform float uRadius;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`;

/**
 * Semi-Lagrangian advection: trace backwards down the velocity field and read
 * what was there. Unconditionally stable, which is the whole point of Stam.
 */
export const ADVECTION_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2  uSourceTexelSize;
uniform float uDt;
uniform float uDissipation;

// Manual bilinear filter, so this pass is correct even where the source
// texture is only NEAREST-filterable.
vec4 bilerp(sampler2D tex, vec2 uv, vec2 texel) {
  vec2 st = uv / texel - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture(tex, (iuv + vec2(0.5, 0.5)) * texel);
  vec4 b = texture(tex, (iuv + vec2(1.5, 0.5)) * texel);
  vec4 c = texture(tex, (iuv + vec2(0.5, 1.5)) * texel);
  vec4 d = texture(tex, (iuv + vec2(1.5, 1.5)) * texel);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}

void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uTexelSize;
  vec4 result = bilerp(uSource, coord, uSourceTexelSize);
  // Exponential decay, framerate-independent.
  float decay = 1.0 + uDissipation * uDt;
  fragColor = result / decay;
}`;

/** Scalar curl of the velocity field — the input to vorticity confinement. */
export const CURL_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
  float R = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
  float B = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
  float T = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
  fragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`;

/**
 * Vorticity confinement. Semi-Lagrangian advection is diffusive and eats the
 * small vortices; this pushes energy back into them, which is what gives the
 * plume its filaments and the blobs their dark rims.
 */
export const VORTICITY_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlStrength;
uniform float uDt;
void main() {
  float L = texture(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
  float B = texture(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
  float T = texture(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
  float C = texture(uCurl, vUv).x;

  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= uCurlStrength * C;
  force.y *= -1.0;

  vec2 vel = texture(uVelocity, vUv).xy + force * uDt;
  fragColor = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}`;

export const DIVERGENCE_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
  float B = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
  float T = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;

  // Free-slip walls: reflect the normal component at the boundary.
  vec2 C = texture(uVelocity, vUv).xy;
  if (vUv.x - uTexelSize.x < 0.0) { L = -C.x; }
  if (vUv.x + uTexelSize.x > 1.0) { R = -C.x; }
  if (vUv.y - uTexelSize.y < 0.0) { B = -C.y; }
  if (vUv.y + uTexelSize.y > 1.0) { T = -C.y; }

  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

/** One Jacobi iteration of the pressure Poisson equation. */
export const PRESSURE_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float B = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float T = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  float divergence = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`;

/** Subtract the pressure gradient — the projection that makes it incompressible. */
export const GRADIENT_SUBTRACT_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float B = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float T = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

/**
 * Bloom prepass, run into a quarter-size target.
 *
 * The wide gather that makes the field glow costs 16 texture fetches per pixel.
 * Doing that at full device resolution on a 2x display is tens of millions of
 * fetches per frame and visibly janks the whole browser. Because the result is
 * a very low-frequency blur, computing it at a fraction of the resolution is
 * visually identical and ~16x cheaper; the display pass then reads it in one
 * bilinear tap.
 */
export const BLOOM_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uTexture;
uniform vec2  uSourceTexelSize;
uniform float uRadius;
uniform float uThreshold;

void main() {
  const float GA = 2.39996323;
  vec2 texel = uSourceTexelSize * uRadius;
  vec3 sum = vec3(0.0);
  float wsum = 0.0;
  for (int i = 0; i < 16; i++) {
    float fi = float(i) + 1.0;
    float a = fi * GA;
    float r = sqrt(fi / 16.0);
    vec2 off = vec2(cos(a), sin(a)) * r * texel;
    vec3 s = texture(uTexture, vUv + off).rgb;
    // Soft knee: only the brighter dye contributes, so the glow reads as light
    // coming off the cores rather than a flat haze over everything.
    float l = dot(s, vec3(0.2126, 0.7152, 0.0722));
    s *= smoothstep(uThreshold, uThreshold + 0.35, l);
    float w = 1.0 - r * 0.75;
    sum += s * w;
    wsum += w;
  }
  fragColor = vec4(sum / wsum, 1.0);
}`;

/**
 * Presentation. A small spiral blur softens the dye grid, the prebuilt bloom is
 * added on top, then a luminance-based Reinhard curve rolls highlights off
 * without desaturating them — per-channel Reinhard is what turns saturated
 * overlaps into white.
 */
export const DISPLAY_FRAG = HEAD + /* glsl */ `
out vec4 fragColor;
uniform sampler2D uTexture;
uniform sampler2D uBloom;
uniform vec2  uResolution;
uniform float uTime;
uniform float uBlur;
uniform float uGlow;
uniform float uExposure;
uniform float uSaturation;
uniform float uGrain;
uniform float uVignette;
uniform vec3  uGround;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  // A 5-tap cross is enough to hide the dye grid once it is upscaled; the wide
  // glow already arrives prebuilt in uBloom, so this pass stays cheap even at
  // full device resolution.
  vec2 texel = uTexelSize * uBlur;
  vec3 c =
      texture(uTexture, vUv).rgb * 0.4
    + texture(uTexture, vUv + vec2( texel.x, 0.0)).rgb * 0.15
    + texture(uTexture, vUv + vec2(-texel.x, 0.0)).rgb * 0.15
    + texture(uTexture, vUv + vec2(0.0,  texel.y)).rgb * 0.15
    + texture(uTexture, vUv + vec2(0.0, -texel.y)).rgb * 0.15;

  c = c * uExposure + texture(uBloom, vUv).rgb * uGlow;

  // Tone map on luminance so hue and saturation survive bright overlaps.
  // Per-channel Reinhard is what turns saturated overlaps into white.
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c *= 1.0 / (1.0 + l);
  // pow(0.0, y) is undefined in GLSL and yields NaN on ANGLE/D3D11, which
  // rasterises as white — floor the input so an empty field stays black.
  c = pow(max(c, vec3(1e-5)), vec3(0.82));

  // Advection and blur both pull toward grey; push the chroma back out so the
  // dye reads as liquid colour rather than lit smoke.
  float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = clamp(mix(vec3(luma), c, uSaturation), 0.0, 1.0);

  vec2 q = vUv - 0.5;
  q.x *= uResolution.x / uResolution.y;
  c *= 1.0 - smoothstep(0.4, 1.15, length(q)) * uVignette;

  vec3 col = uGround + c;

  float g = hash12(vUv * uResolution + fract(uTime) * 977.0) - 0.5;
  col += g * uGrain;

  fragColor = vec4(col, 1.0);
}`;
