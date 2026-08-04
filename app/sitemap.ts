import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";

/**
 * Three URLs, so this is about completeness rather than crawl budget.
 *
 * No `lastModified`: the only value available at build time is "now", which
 * would claim every page changed on every deploy. A lastmod Google learns to
 * distrust is worse than one that isn't there.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    priority: route === "/" ? 1 : 0.8,
  }));
}
