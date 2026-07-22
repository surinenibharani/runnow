import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Served at /robots.txt — tells crawlers what to index and where the sitemap lives.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    "/api/",
    "/dashboard",
    "/teams/",
    "/login",
    "/signup",
    "/plan/share",
    "/blog/*/printable",
    "/blog/*/printable/schedule",
    "/plan/*/printable",
  ];

  /** AI / training crawlers — disallowed; mainstream search remains allowed via "*". */
  const aiTrainingBots = [
    "GPTBot",
    "ChatGPT-User",
    "Google-Extended",
    "CCBot",
    "anthropic-ai",
    "ClaudeBot",
    "Claude-Web",
    "Bytespider",
    "FacebookBot",
    "meta-externalagent",
    "cohere-ai",
    "Diffbot",
    "Omgilibot",
    "PerplexityBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      ...aiTrainingBots.map((userAgent) => ({
        userAgent,
        disallow: ["/"],
      })),
    ],
    host: SITE_URL.replace(/\/$/, ""),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
