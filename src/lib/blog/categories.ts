import { blogPosts } from "@/lib/blog/posts";

export const ALL_BLOG_CATEGORY = "All";

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

export function getBlogCategories(): string[] {
  const fromPosts = new Set(blogPosts.map((p) => p.category));
  return BLOG_CATEGORY_ORDER.filter(
    (c) => c === ALL_BLOG_CATEGORY || fromPosts.has(c)
  );
}

export function categoryToParam(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function paramToCategory(param: string | null | undefined): string | null {
  if (!param) return null;
  const normalized = param.toLowerCase().replace(/-/g, " ");
  const fromOrder = BLOG_CATEGORY_ORDER.find(
    (c) => c !== ALL_BLOG_CATEGORY && c.toLowerCase() === normalized
  );
  if (fromOrder) return fromOrder;
  const match = blogPosts.find(
    (p) => p.category.toLowerCase() === normalized
  );
  return match?.category ?? null;
}

export function filterPostsByCategory<T extends { category: string }>(
  posts: T[],
  categoryParam: string | null | undefined
): T[] {
  const category = paramToCategory(categoryParam);
  if (!category) return posts;
  return posts.filter((p) => p.category === category);
}
