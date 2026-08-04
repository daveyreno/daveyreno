/**
 * The handful of facts that have to agree in four places at once: page
 * metadata, structured data, the sitemap and the footer. A `sameAs` list that
 * has drifted from the links actually rendered on the page is a worse signal
 * than no `sameAs` at all, so they read from here rather than each other.
 */

export const SITE_URL = "https://daveyreno.com";

export const SITE_NAME = "Davey Reno";

/**
 * Legal name. Never rendered anywhere on the site — it exists only as
 * `alternateName` in the structured data, so a recruiter holding the resume
 * and searching that name still lands here. See PRODUCT.md brand commitments.
 */
export const LEGAL_NAME = "Dave Reynolds";

export const SITE_DESCRIPTION =
  "Head of Product. Seventeen years across ConTech, LegalTech, FinTech and AI. Strategy, design and working code from the same person.";

export const LOCATION = {
  locality: "Perth",
  region: "WA",
  country: "AU",
} as const;

/** Rendered by the footer and emitted as `sameAs`. One list, both jobs. */
export const PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dave-r/" },
  { label: "GitHub", href: "https://github.com/daveyreno/" },
] as const;

/** Every indexable route. Drives the sitemap. */
export const ROUTES = ["/", "/experience", "/abilities"] as const;
