/**
 * Category helpers kept free of the full blog content module so client
 * components do not pull every post body into the browser bundle.
 */
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

export function categoryToParam(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function paramToCategory(param: string | null | undefined): string | null {
  if (!param) return null;
  const normalized = param.toLowerCase().replace(/-/g, " ");
  const fromOrder = BLOG_CATEGORY_ORDER.find(
    (c) => c !== ALL_BLOG_CATEGORY && c.toLowerCase() === normalized
  );
  return fromOrder ?? null;
}

export function filterPostsByCategory<T extends { category: string }>(
  posts: T[],
  categoryParam: string | null | undefined
): T[] {
  const category = paramToCategory(categoryParam);
  if (!category) return posts;
  return posts.filter((p) => p.category === category);
}

/** Build filter chips from categories that actually have posts. */
export function buildBlogCategories(postCategories: Iterable<string>): string[] {
  const fromPosts = new Set(postCategories);
  return BLOG_CATEGORY_ORDER.filter(
    (c) => c === ALL_BLOG_CATEGORY || fromPosts.has(c)
  );
}
