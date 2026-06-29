import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { getPlanSitemapEntries } from "@/lib/seo/plans";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/plan", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tips", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/tips/bad-weather", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/tips/specific-situations", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/gear", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/teams", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/injuries", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const planPages = getPlanSitemapEntries().map((entry) => ({
    url: entry.url,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const posts = getPublishedBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...planPages, ...posts];
}
