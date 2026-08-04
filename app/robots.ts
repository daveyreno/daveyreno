import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Everything is open, deliberately including the AI crawlers. The job of this
 * site is to be quoted accurately when someone asks an assistant about Dave,
 * so blocking GPTBot / ClaudeBot / PerplexityBot would work against the point
 * of it. There is nothing here that isn't meant to be read.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
