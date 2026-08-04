import {
  ADVECTION_FRAG,
  BLOOM_FRAG,
  CLEAR_FRAG,
  CURL_FRAG,
  DISPLAY_FRAG,
  DIVERGENCE_FRAG,
  GRADIENT_SUBTRACT_FRAG,
  PRESSURE_FRAG,
  SPLAT_FRAG,
  VERT,
  VORTICITY_FRAG,
} from "./shaders";

export type EngineOptions = {
  /** Career signatures, in career order. The plume walks this palette. */
  palette: [number, number, number][];
  ground: [number, number, number];
};

/* ------------------------------------------------------------- solver config */

/**
 * Liquid, not smoke.
 *
 * The dial that decides which one you get is vorticity confinement. High curl
 * re-injects energy into small eddies and you get wispy, fraying, smoke-like
 * filaments. Near-zero curl lets surface tension read as coherent rounded
 * masses that shear and fold — liquid. Everything else here follows from that:
 * big soft splats, low velocity dissipation so momentum carries like a fluid
 * with mass, and low density dissipation so colour pools instead of venting.
 */
const CONFIG = {
  /** Velocity grid. Coarse is correct: pressure solves are the expensive part. */
  simResolution: 128,
  /** Dye grid. Deliberately not huge — fine dye detail is what reads as smoke. */
  dyeResolution: 512,
  /**
   * Higher = dye fades faster. This is the *size* dial as much as the fade
   * dial: too low and the dye never clears, so every stroke accumulates until
   * the plume covers the viewport and the type becomes unreadable.
   */
  densityDissipation: 1.15,
  /** Low, so a stroke keeps travelling after the pointer stops. */
  velocityDissipation: 0.45,
  /** Bloom target size, as a fraction of the dye grid. See BLOOM_FRAG. */
  bloomScale: 0.25,
  /** Pressure carried between frames. Below 1 bleeds off residual stiffness. */
  pressure: 0.8,
  /**
   * Jacobi iterations. This is the single biggest solver cost. 16 is visually
   * indistinguishable from 20 here because the velocity grid is small and the
   * pressure field carries over between frames.
   */
  pressureIterations: 16,
  /** Near zero. This is the smoke/liquid dial — see the note above. */
  curl: 3,
  /** Small and soft: a compact ribbon, not a wall of colour. */
  splatRadius: 0.0016,
  splatForce: 6000,
  /** Splat colours are pushed past 1 so cores clip bright and drive the bloom. */
  splatGain: 1.5,
} as const;

/* ------------------------------------------------------------------ plumbing */

type Program = { program: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type);
  if (!sh) throw new Error("shader alloc failed");
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`shader compile failed: ${log}`);
  }
  return sh;
};

const link = (gl: WebGL2RenderingContext, fragSrc: string, names: string[]): Program => {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  const program = gl.createProgram();
  if (!program) throw new Error("program alloc failed");
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`program link failed: ${log}`);
  }
  const u: Record<string, WebGLUniformLocation | null> = {};
  for (const n of names) u[n] = gl.getUniformLocation(program, n);
  return { program, u };
};

type FBO = {
  fbo: WebGLFramebuffer;
  tex: WebGLTexture;
  w: number;
  h: number;
  texel: [number, number];
  attach(unit: number): number;
};

type DoubleFBO = { read: FBO; write: FBO; swap(): void; w: number; h: number; texel: [number, number] };

export type FieldEngine = {
  setSize(cssW: number, cssH: number, dpr: number): void;
  /** Pointer position in 0..1 uv, y measured from the top. */
  setPointer(x: number, y: number): void;
  /** Lock the dye to one career signature; null returns it to the walk. */
  setSignature(index: number | null): void;
  setIntensity(v: number): void;
  frame(nowMs: number): void;
  /** Run the solver without presenting, to develop a composition before reveal. */
  prime(seconds: number): void;
  probe(): { max: number; mean: number };
  dispose(): void;
};

export function createFieldEngine(
  canvas: HTMLCanvasElement,
  opts: EngineOptions,
): FieldEngine | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  if (!gl) return null;
  if (!gl.getExtension("EXT_color_buffer_float")) return null;
  const linearFloat = !!gl.getExtension("OES_texture_float_linear");

  /* ------------------------------------------------------------- targets */

  const createFBO = (
    w: number,
    h: number,
    internal: number,
    format: number,
    type: number,
    filter: number,
  ): FBO => {
    const tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      fbo,
      tex,
      w,
      h,
      texel: [1 / w, 1 / h],
      attach(unit: number) {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        return unit;
      },
    };
  };

  const createDouble = (
    w: number,
    h: number,
    internal: number,
    format: number,
    type: number,
    filter: number,
  ): DoubleFBO => {
    let a = createFBO(w, h, internal, format, type, filter);
    let b = createFBO(w, h, internal, format, type, filter);
    return {
      w,
      h,
      texel: [1 / w, 1 / h],
      get read() {
        return a;
      },
      get write() {
        return b;
      },
      swap() {
        const t = a;
        a = b;
        b = t;
      },
    };
  };

  const destroyFBO = (f: FBO | null | undefined) => {
    if (!f) return;
    gl.deleteFramebuffer(f.fbo);
    gl.deleteTexture(f.tex);
  };

  /* ------------------------------------------------------------ programs */

  let progs: {
    clear: Program;
    splat: Program;
    advect: Program;
    curl: Program;
    vorticity: Program;
    divergence: Program;
    pressure: Program;
    gradient: Program;
    bloom: Program;
    display: Program;
  };
  try {
    progs = {
      clear: link(gl, CLEAR_FRAG, ["uTexelSize", "uTexture", "uValue"]),
      splat: link(gl, SPLAT_FRAG, ["uTexelSize", "uTarget", "uAspect", "uColor", "uPoint", "uRadius"]),
      advect: link(gl, ADVECTION_FRAG, [
        "uTexelSize", "uVelocity", "uSource", "uSourceTexelSize", "uDt", "uDissipation",
      ]),
      curl: link(gl, CURL_FRAG, ["uTexelSize", "uVelocity"]),
      vorticity: link(gl, VORTICITY_FRAG, ["uTexelSize", "uVelocity", "uCurl", "uCurlStrength", "uDt"]),
      divergence: link(gl, DIVERGENCE_FRAG, ["uTexelSize", "uVelocity"]),
      pressure: link(gl, PRESSURE_FRAG, ["uTexelSize", "uPressure", "uDivergence"]),
      gradient: link(gl, GRADIENT_SUBTRACT_FRAG, ["uTexelSize", "uPressure", "uVelocity"]),
      bloom: link(gl, BLOOM_FRAG, [
        "uTexelSize", "uTexture", "uSourceTexelSize", "uRadius", "uThreshold",
      ]),
      display: link(gl, DISPLAY_FRAG, [
        "uTexelSize", "uTexture", "uBloom", "uResolution", "uTime",
        "uBlur", "uGlow", "uExposure",
        "uSaturation", "uGrain", "uVignette", "uGround",
      ]),
    };
  } catch {
    return null;
  }

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const blit = (target: FBO | null) => {
    if (target) {
      gl.viewport(0, 0, target.w, target.h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, viewW, viewH);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  /* --------------------------------------------------------------- state */

  let dye: DoubleFBO | null = null;
  let velocity: DoubleFBO | null = null;
  let pressure: DoubleFBO | null = null;
  let divergence: FBO | null = null;
  let curlTex: FBO | null = null;
  let bloom: FBO | null = null;

  let viewW = 1;
  let viewH = 1;
  let aspect = 1;
  let intensity = 1;
  let time = 0;
  let lastMs = 0;
  let disposed = false;

  let sinceInput = 99;
  let travel = 0;
  let locked: number | null = null;

  const palette = opts.palette;
  const pointer = { x: 0.5, y: 0.5, px: 0.5, py: 0.5, moved: false };

  const resolution = (target: number, w: number, h: number) => {
    const ar = w / h;
    const min = Math.round(target);
    const max = Math.round(target * (ar >= 1 ? ar : 1 / ar));
    return ar >= 1 ? { w: max, h: min } : { w: min, h: max };
  };

  const allocate = (cssW: number, cssH: number) => {
    const filter = linearFloat ? gl.LINEAR : gl.NEAREST;
    const sim = resolution(CONFIG.simResolution, cssW, cssH);
    const dyeRes = resolution(CONFIG.dyeResolution, cssW, cssH);

    [dye, velocity, pressure].forEach((d) => {
      if (d) {
        destroyFBO(d.read);
        destroyFBO(d.write);
      }
    });
    destroyFBO(divergence);
    destroyFBO(curlTex);
    destroyFBO(bloom);

    dye = createDouble(dyeRes.w, dyeRes.h, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, filter);
    bloom = createFBO(
      Math.max(8, Math.round(dyeRes.w * CONFIG.bloomScale)),
      Math.max(8, Math.round(dyeRes.h * CONFIG.bloomScale)),
      gl.RGBA16F,
      gl.RGBA,
      gl.HALF_FLOAT,
      filter,
    );
    velocity = createDouble(sim.w, sim.h, gl.RG16F, gl.RG, gl.HALF_FLOAT, filter);
    pressure = createDouble(sim.w, sim.h, gl.R16F, gl.RED, gl.HALF_FLOAT, gl.NEAREST);
    divergence = createFBO(sim.w, sim.h, gl.R16F, gl.RED, gl.HALF_FLOAT, gl.NEAREST);
    curlTex = createFBO(sim.w, sim.h, gl.R16F, gl.RED, gl.HALF_FLOAT, gl.NEAREST);
  };

  const setSize = (cssW: number, cssH: number, dpr: number) => {
    const w = Math.max(1, Math.round(cssW * dpr));
    const h = Math.max(1, Math.round(cssH * dpr));
    if (w === viewW && h === viewH && dye) return;
    viewW = w;
    viewH = h;
    canvas.width = w;
    canvas.height = h;
    aspect = cssW / cssH;
    allocate(cssW, cssH);
  };

  /* -------------------------------------------------------------- splats */

  const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => {
    if (!velocity || !dye) return;

    gl.useProgram(progs.splat.program);
    const u = progs.splat.u;

    gl.uniform2f(u.uTexelSize, velocity.texel[0], velocity.texel[1]);
    gl.uniform1i(u.uTarget, velocity.read.attach(0));
    gl.uniform1f(u.uAspect, aspect);
    gl.uniform2f(u.uPoint, x, y);
    gl.uniform3f(u.uColor, dx, dy, 0);
    gl.uniform1f(u.uRadius, CONFIG.splatRadius);
    blit(velocity.write);
    velocity.swap();

    const gain = CONFIG.splatGain * intensity;
    gl.uniform2f(u.uTexelSize, dye.texel[0], dye.texel[1]);
    gl.uniform1i(u.uTarget, dye.read.attach(0));
    gl.uniform3f(u.uColor, color[0] * gain, color[1] * gain, color[2] * gain);
    blit(dye.write);
    dye.swap();
  };

  /**
   * When nobody is driving, the field drives itself along a slow figure that
   * sweeps the whole frame — so the composition on load is already developed,
   * and touch devices get the same world a mouse gets.
   */
  const autoPath = (t: number): [number, number] => [
    0.5 + Math.cos(t * 0.26) * 0.2 + Math.cos(t * 0.089) * 0.07,
    0.52 + Math.sin(t * 0.37) * 0.13 + Math.sin(t * 0.15) * 0.05,
  ];

  /** Sample the career palette as a continuous loop, blending neighbours. */
  const sample = (f: number): [number, number, number] => {
    const n = palette.length;
    const w = ((f % n) + n) % n;
    const i = Math.floor(w);
    const k = w - i;
    const a = palette[i];
    const b = palette[(i + 1) % n];
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
  };

  /**
   * Colour has two clocks.
   *
   * A slow drift walks the whole field through the career palette over roughly
   * two minutes, so the page is a different colour when you come back to it.
   * A separate, slower "spread" oscillator decides how much hue a single stroke
   * covers: near zero the plume is monochrome and the drift colour dominates;
   * near one a single gesture lays down the full spectrum. The field therefore
   * passes through quiet single-colour stretches and loud rainbow ones instead
   * of sitting at one energy forever.
   */
  const colourAt = (dist: number): [number, number, number] => {
    if (locked !== null) {
      const c = palette[locked % palette.length];
      return [c[0], c[1], c[2]];
    }
    const drift = time * 0.055;
    const spread = 0.5 + 0.5 * Math.sin(time * 0.041);
    return sample(drift + dist * (0.1 + spread * 1.6));
  };

  const applyInput = (dt: number) => {
    sinceInput += dt;

    if (sinceInput > 1.0) {
      const [ax, ay] = autoPath(time);
      pointer.x = ax;
      pointer.y = ay;
      pointer.moved = true;
    }

    if (!pointer.moved) return;
    pointer.moved = false;

    const dx = (pointer.x - pointer.px) * CONFIG.splatForce;
    const dy = (pointer.y - pointer.py) * CONFIG.splatForce;
    const dist = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
    pointer.px = pointer.x;
    pointer.py = pointer.y;

    if (dist < 0.0004) return;
    travel += dist * 9;

    // Splat in GL space, where y runs from the bottom.
    splat(pointer.x, 1 - pointer.y, dx, -dy, colourAt(travel));
  };

  /* --------------------------------------------------------------- solve */

  const step = (dt: number) => {
    if (!dye || !velocity || !pressure || !divergence || !curlTex) return;
    time += dt;
    applyInput(dt);

    const vtex = velocity.texel;

    // Curl
    gl.useProgram(progs.curl.program);
    gl.uniform2f(progs.curl.u.uTexelSize, vtex[0], vtex[1]);
    gl.uniform1i(progs.curl.u.uVelocity, velocity.read.attach(0));
    blit(curlTex);

    // Vorticity confinement
    gl.useProgram(progs.vorticity.program);
    gl.uniform2f(progs.vorticity.u.uTexelSize, vtex[0], vtex[1]);
    gl.uniform1i(progs.vorticity.u.uVelocity, velocity.read.attach(0));
    gl.uniform1i(progs.vorticity.u.uCurl, curlTex.attach(1));
    gl.uniform1f(progs.vorticity.u.uCurlStrength, CONFIG.curl);
    gl.uniform1f(progs.vorticity.u.uDt, dt);
    blit(velocity.write);
    velocity.swap();

    // Divergence
    gl.useProgram(progs.divergence.program);
    gl.uniform2f(progs.divergence.u.uTexelSize, vtex[0], vtex[1]);
    gl.uniform1i(progs.divergence.u.uVelocity, velocity.read.attach(0));
    blit(divergence);

    // Decay carried-over pressure
    gl.useProgram(progs.clear.program);
    gl.uniform2f(progs.clear.u.uTexelSize, vtex[0], vtex[1]);
    gl.uniform1i(progs.clear.u.uTexture, pressure.read.attach(0));
    gl.uniform1f(progs.clear.u.uValue, CONFIG.pressure);
    blit(pressure.write);
    pressure.swap();

    // Jacobi pressure solve
    gl.useProgram(progs.pressure.program);
    gl.uniform2f(progs.pressure.u.uTexelSize, vtex[0], vtex[1]);
    gl.uniform1i(progs.pressure.u.uDivergence, divergence.attach(0));
    for (let i = 0; i < CONFIG.pressureIterations; i++) {
      gl.uniform1i(progs.pressure.u.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    // Project velocity back to divergence-free
    gl.useProgram(progs.gradient.program);
    gl.uniform2f(progs.gradient.u.uTexelSize, vtex[0], vtex[1]);
    gl.uniform1i(progs.gradient.u.uPressure, pressure.read.attach(0));
    gl.uniform1i(progs.gradient.u.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    // Advect velocity, then dye
    gl.useProgram(progs.advect.program);
    const au = progs.advect.u;
    gl.uniform2f(au.uTexelSize, vtex[0], vtex[1]);
    gl.uniform2f(au.uSourceTexelSize, vtex[0], vtex[1]);
    gl.uniform1i(au.uVelocity, velocity.read.attach(0));
    gl.uniform1i(au.uSource, velocity.read.attach(0));
    gl.uniform1f(au.uDt, dt);
    gl.uniform1f(au.uDissipation, CONFIG.velocityDissipation);
    blit(velocity.write);
    velocity.swap();

    gl.uniform2f(au.uTexelSize, vtex[0], vtex[1]);
    gl.uniform2f(au.uSourceTexelSize, dye.texel[0], dye.texel[1]);
    gl.uniform1i(au.uVelocity, velocity.read.attach(0));
    gl.uniform1i(au.uSource, dye.read.attach(1));
    gl.uniform1f(au.uDissipation, CONFIG.densityDissipation);
    blit(dye.write);
    dye.swap();
  };

  const present = () => {
    if (!dye || !bloom) return;

    // Bloom first, into a quarter-size target — see BLOOM_FRAG for why.
    gl.useProgram(progs.bloom.program);
    const b = progs.bloom.u;
    gl.uniform2f(b.uTexelSize, bloom.texel[0], bloom.texel[1]);
    gl.uniform2f(b.uSourceTexelSize, dye.texel[0], dye.texel[1]);
    gl.uniform1i(b.uTexture, dye.read.attach(0));
    gl.uniform1f(b.uRadius, 22);
    gl.uniform1f(b.uThreshold, 0.1);
    blit(bloom);

    gl.useProgram(progs.display.program);
    const u = progs.display.u;
    gl.uniform2f(u.uTexelSize, dye.texel[0], dye.texel[1]);
    gl.uniform1i(u.uTexture, dye.read.attach(0));
    gl.uniform1i(u.uBloom, bloom.attach(1));
    gl.uniform2f(u.uResolution, viewW, viewH);
    gl.uniform1f(u.uTime, time);
    gl.uniform1f(u.uBlur, 1.4);
    gl.uniform1f(u.uGlow, 1.15);
    gl.uniform1f(u.uExposure, 1.5);
    gl.uniform1f(u.uSaturation, 1.4);
    gl.uniform1f(u.uGrain, 0.018);
    gl.uniform1f(u.uVignette, 0.45);
    gl.uniform3f(u.uGround, opts.ground[0], opts.ground[1], opts.ground[2]);
    blit(null);
  };

  return {
    setSize,
    setPointer(x, y) {
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
      sinceInput = 0;
    },
    setSignature(index) {
      locked = index;
    },
    setIntensity(v) {
      intensity = v;
    },
    prime(seconds) {
      const dt = 1 / 60;
      for (let t = 0; t < seconds; t += dt) step(dt);
      present();
    },
    probe() {
      present();
      const px = new Uint8Array(viewW * viewH * 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.readPixels(0, 0, viewW, viewH, gl.RGBA, gl.UNSIGNED_BYTE, px);
      let max = 0;
      let sum = 0;
      for (let i = 0; i < px.length; i += 4) {
        const v = Math.max(px[i], px[i + 1], px[i + 2]);
        if (v > max) max = v;
        sum += v;
      }
      return { max: max / 255, mean: sum / (px.length / 4) / 255 };
    },
    frame(nowMs) {
      if (disposed) return;
      // Clamp dt: a backgrounded tab returns with a delta that would blow the
      // advection step past its stability envelope.
      const dt = lastMs ? Math.min(1 / 30, (nowMs - lastMs) / 1000) : 1 / 60;
      lastMs = nowMs;
      step(dt);
      present();
    },
    dispose() {
      disposed = true;
      [dye, velocity, pressure].forEach((d) => {
        if (d) {
          destroyFBO(d.read);
          destroyFBO(d.write);
        }
      });
      destroyFBO(divergence);
      destroyFBO(curlTex);
      destroyFBO(bloom);
      Object.values(progs).forEach((p) => gl.deleteProgram(p.program));
      gl.deleteVertexArray(vao);
      // Deliberately NOT calling WEBGL_lose_context.loseContext(): losing the
      // context poisons the <canvas> element permanently, so the next engine
      // mounted on the same node draws into a dead context. React StrictMode
      // remounts effects in development, which makes that an instant failure.
    },
  };
}
