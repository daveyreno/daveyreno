import { ROLES, type Role } from "./roles";
import {
  LEGAL_NAME,
  LOCATION,
  PROFILES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./site";

/**
 * Structured data for the site.
 *
 * This is doing the work the copy deliberately refuses to. The home page is one
 * locked viewport of about sixty words and the h1 is a claim rather than a name,
 * which is the right call for a human and almost nothing for a machine. The
 * graph below is where a crawler — or an assistant being asked "who is Davey
 * Reno" — gets the name, the legal name, the current role, the six companies
 * and the two profiles, in a form it cannot misread.
 *
 * Every value is derived from ROLES or lib/site, so it cannot drift from the
 * page. Nothing here is asserted that isn't already visible on /experience.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** A role's employer. `url` only where the product is actually live. */
const organisation = (role: Role) => ({
  "@type": "Organization",
  name: role.name,
  ...(role.url ? { url: role.url } : {}),
});

/** Open-ended roles are current employment; everything else is alumniOf. */
const current = ROLES.filter((r) => r.to === null);
const past = ROLES.filter((r) => r.to !== null);

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  // The site never shows this name; the resume and every reference check do.
  alternateName: LEGAL_NAME,
  url: `${SITE_URL}/`,
  jobTitle: "Head of Product",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCATION.locality,
    addressRegion: LOCATION.region,
    addressCountry: LOCATION.country,
  },
  worksFor: current.map(organisation),
  alumniOf: past.map(organisation),
  knowsAbout: [
    "Product management",
    "Product strategy",
    "Product discovery",
    "User research",
    "Prototyping",
    "AI product development",
    "FinTech",
    "ConTech",
    "LegalTech",
    "SaaS",
  ],
  sameAs: PROFILES.map((p) => p.href),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en-AU",
  publisher: { "@id": PERSON_ID },
};

/** Emitted on every page. The @ids make it one entity, not three copies. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [website, person],
};

/**
 * Home only. ProfilePage tells Google this URL is *about* a person rather than
 * merely mentioning one, which is what puts the name into an entity result.
 */
export const profilePageGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: `${SITE_NAME}, Product Manager`,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en-AU",
    },
  ],
};
