import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/plan", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tips", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/gear", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/teams", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/injuries", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
