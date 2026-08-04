import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

/**
 * The share card. Applies to every route that doesn't define its own, and
 * Next derives `twitter:image` from it too.
 *
 * This is not a nice-to-have here: the site's distribution is a LinkedIn post
 * and a link pasted into a hiring thread, so for a lot of visitors this image
 * is the first thing they see. A bare text unfurl would undercut the whole
 * "the site is the portfolio piece" argument before anyone reaches the site.
 *
 * Built to the same contract as the pages — near-black ground, zero radius,
 * one hairline rule, tracked uppercase labels, one monumental statement. The
 * cyan sweep stands in for the live field, which cannot render in a static PNG.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Davey Reno, Head of Product. Seventeen years across ConTech, LegalTech, FinTech and AI.";

const INK = "#f4f4f2";
const DIM = "rgba(244,244,242,0.62)";
const RULE = "rgba(244,244,242,0.12)";

/** Shared by the two label rows: mono-register small caps, heavily tracked. */
const label = {
  fontSize: 19,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

/**
 * The real display face, so the card and the page agree — weight 500 to match
 * the `font-medium` the pages set their display type in.
 *
 * A static instance, not the variable file Google ships as Archivo's default:
 * satori cannot read the `wdth,wght` build and fails the render outright. Falls
 * back to the built-in font if the file ever goes missing, because a plain
 * share card beats a broken deploy.
 */
async function displayFont() {
  try {
    const data = await readFile(
      join(process.cwd(), "assets", "Archivo-Medium.ttf"),
    );
    return [{ name: "Archivo", data, style: "normal" as const, weight: 500 as const }];
  } catch {
    return undefined;
  }
}

export default async function Image() {
  const fonts = await displayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: INK,
          backgroundColor: "#060608",
          // Linear rather than radial: satori's radial support is patchy, and a
          // corner sweep reads as the same atmosphere at this size anyway.
          backgroundImage:
            "linear-gradient(122deg, #060608 0%, #060608 46%, #07293f 74%, #0BA6C9 128%)",
          fontFamily: fonts ? "Archivo" : undefined,
        }}
      >
        {/* identity ------------------------------------------------------- */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ ...label, color: INK }}>{SITE_NAME}</div>
            <div style={{ ...label, color: DIM }}>Product Manager</div>
          </div>
          <div style={{ ...label, color: DIM }}>Perth, Australia</div>
        </div>

        {/* statement ------------------------------------------------------ */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              maxWidth: 900,
            }}
          >
            I deliver value. Fast.
          </div>

          <div style={{ display: "flex", height: 1, backgroundColor: RULE, marginTop: 44 }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 26,
            }}
          >
            <div style={{ display: "flex", gap: 44 }}>
              <div style={{ ...label, color: DIM }}>Seventeen years</div>
              <div style={{ ...label, color: DIM }}>Six companies</div>
              <div style={{ ...label, color: DIM }}>Three acquisitions</div>
            </div>
            <div style={{ ...label, color: INK }}>daveyreno.com</div>
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) },
  );
}
