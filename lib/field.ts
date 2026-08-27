/**
 * Career colour signatures.
 *
 * Every colour here is derived from a real brand asset already in this repo —
 * the field is an index of actual work, never decoration. Do not add a
 * signature for a role that does not exist in PRODUCT.md.
 */

export type FieldSignature = {
  /** Stable key, matches the role slug used across surfaces. */
  id: string;
  /** Linear-ish RGB triplet, 0..1, fed straight to the shader. */
  rgb: [number, number, number];
  /** CSS colour for type accents and rules. */
  css: string;
};

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const sig = (id: string, css: string): FieldSignature => ({
  id,
  css,
  rgb: hex(css),
});

export const SIGNATURES: Record<string, FieldSignature> = {
  rememberr: sig("rememberr", "#0BA6C9"),
  supadrone: sig("supadrone", "#F2B824"),
  soar: sig("soar", "#9AA7B4"),
  lendi: sig("lendi", "#10B981"),
  cranetime: sig("cranetime", "#3B82F6"),
  legalnet: sig("legalnet", "#A855F7"),
  crazydomains: sig("crazydomains", "#FF5A1F"),
  bookables: sig("bookables", "#FB923C"),
};

/** Field order = career order, most recent first. The dye reads left to right. */
export const FIELD_ORDER = [
  "rememberr",
  "supadrone",
  "soar",
  "lendi",
  "cranetime",
  "legalnet",
  "crazydomains",
  "bookables",
] as const;

export type RoleId = (typeof FIELD_ORDER)[number];

export const signatureFor = (id: string | null | undefined): FieldSignature | null =>
  id ? SIGNATURES[id] ?? null : null;
