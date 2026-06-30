import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { getPlanSitemapEntries } from "@/lib/seo/plans";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Public marketing and content routes (excludes auth, dashboard, API). */
const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/plan", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tips", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/tips/bad-weather", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/tips/specific-situations", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/gear", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/injuries", priority: 0.8, changeFrequency: "monthly" as const },
  {
    path: "/injuries/for-women-runners",
    priority: 0.75,
    changeFrequency: "monthly" as const,
  },
  { path: "/stories", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/teams", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const planPages: MetadataRoute.Sitemap = getPlanSitemapEntries().map(
    (entry) => ({
      url: entry.url,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })
  );

  const posts: MetadataRoute.Sitemap = getPublishedBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...planPages, ...posts].sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  );
}
