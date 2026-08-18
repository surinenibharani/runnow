"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ALL_BLOG_CATEGORY,
  SCHEDULED_BLOG_FILTER,
  categoryToParam,
  paramToCategory,
} from "@/lib/blog/categories";

type BlogCategoryFilterProps = {
  categories: string[];
  className?: string;
};

export function BlogCategoryFilter({
  categories,
  className,
}: BlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeParam = searchParams.get("category");
  const activeCategory = paramToCategory(activeParam) ?? ALL_BLOG_CATEGORY;

  const setCategory = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category === ALL_BLOG_CATEGORY) {
        params.delete("category");
      } else {
        params.set("category", categoryToParam(category));
      }
      const query = params.toString();
      router.push(query ? `/blog?${query}` : "/blog", { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div
      className={cn("flex flex-wrap justify-center gap-2", className)}
      role="group"
      aria-label="Filter blog posts by category"
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => setCategory(category)}
            aria-pressed={isActive}
            aria-label={
              category === ALL_BLOG_CATEGORY
                ? "Show all categories"
                : category === SCHEDULED_BLOG_FILTER
                  ? "Show scheduled posts that are not public yet"
                  : `Show ${category} articles`
            }
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              category === SCHEDULED_BLOG_FILTER &&
                (isActive
                  ? "border-amber-600 bg-amber-500 text-amber-950 shadow-sm dark:border-amber-400 dark:bg-amber-500/90 dark:text-amber-950"
                  : "border-amber-500/50 bg-amber-500/10 text-amber-900 hover:border-amber-500/80 hover:text-amber-950 dark:text-amber-200 dark:hover:text-amber-50"),
              category !== SCHEDULED_BLOG_FILTER &&
                (isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/60 bg-background text-foreground/75 hover:border-primary/40 hover:text-foreground")
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
