import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { getTipSitemapEntries } from "@/lib/tips/helpers";
import { commonInjurySlugs } from "@/lib/injuries/common-injuries";
import { menRunnerConcernSlugs } from "@/lib/injuries/men-runner-concerns";
import { womenRunnerConcernSlugs } from "@/lib/injuries/women-runner-concerns";
import { getPlanSitemapEntries } from "@/lib/seo/plans";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

/** Public marketing and content routes (excludes auth, dashboard, API). */
const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/plan", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tips", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/tips/bad-weather", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/tips/specific-situations", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/gear", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/tools", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/tools/pace-calculator", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/tools/race-predictor", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/tools/shoe-quiz", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/start", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/injuries", priority: 0.8, changeFrequency: "monthly" as const },
  {
    path: "/injuries/for-women-runners",
    priority: 0.75,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/injuries/for-men-runners",
    priority: 0.75,
    changeFrequency: "monthly" as const,
  },
  { path: "/stories", priority: 0.75, changeFrequency: "weekly" as const },
  { path: "/stories/write", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/instagram", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/faq", priority: 0.55, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" as const },
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
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tipPages: MetadataRoute.Sitemap = getTipSitemapEntries().map(
    (entry) => ({
      url: `${SITE_URL}${entry.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })
  );

  const injuryDetails: MetadataRoute.Sitemap = [
    ...commonInjurySlugs.map((slug) => `/injuries/${slug}`),
    ...womenRunnerConcernSlugs.map((slug) => `/injuries/for-women-runners/${slug}`),
    ...menRunnerConcernSlugs.map((slug) => `/injuries/for-men-runners/${slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...planPages, ...posts, ...tipPages, ...injuryDetails].sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  );
}
