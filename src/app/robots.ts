import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Served at /robots.txt — tells crawlers what to index and where the sitemap lives.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/teams/",
          "/login",
          "/signup",
          "/plan/share",
        ],
      },
    ],
    host: SITE_URL.replace(/\/$/, ""),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
