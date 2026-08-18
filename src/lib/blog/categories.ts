/**
 * Category helpers kept free of the full blog content module so client
 * components do not pull every post body into the browser bundle.
 */
import { isBlogPostPublishedAt } from "./publish-schedule";

export const ALL_BLOG_CATEGORY = "All";
/** Preview-only filter: posts that have not reached their 7:00 AM Eastern go-live. */
export const SCHEDULED_BLOG_FILTER = "Scheduled";

/** Stable display order for blog index filters. */
export const BLOG_CATEGORY_ORDER = [
  ALL_BLOG_CATEGORY,
  "Getting Started",
  "Training",
  "Racing",
  "Recovery",
  "Nutrition",
  "Gear",
  "Mindset",
  "Health",
  "Injuries",
  "Tips",
] as const;

export function categoryToParam(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function paramToCategory(param: string | null | undefined): string | null {
  if (!param) return null;
  const normalized = param.toLowerCase().replace(/-/g, " ");
  if (normalized === SCHEDULED_BLOG_FILTER.toLowerCase()) {
    return SCHEDULED_BLOG_FILTER;
  }
  const fromOrder = BLOG_CATEGORY_ORDER.find(
    (c) => c !== ALL_BLOG_CATEGORY && c.toLowerCase() === normalized
  );
  return fromOrder ?? null;
}

export function filterPostsByCategory<
  T extends { category: string; publishedAt: string },
>(
  posts: T[],
  categoryParam: string | null | undefined,
  now: Date = new Date()
): T[] {
  const category = paramToCategory(categoryParam);
  if (!category) return posts;
  if (category === SCHEDULED_BLOG_FILTER) {
    return posts
      .filter((p) => !isBlogPostPublishedAt(p.publishedAt, now))
      .slice()
      .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  }
  return posts.filter((p) => p.category === category);
}

/** Build filter chips from categories that actually have posts. */
export function buildBlogCategories(postCategories: Iterable<string>): string[] {
  const fromPosts = new Set(postCategories);
  return BLOG_CATEGORY_ORDER.filter(
    (c) => c === ALL_BLOG_CATEGORY || fromPosts.has(c)
  );
}
