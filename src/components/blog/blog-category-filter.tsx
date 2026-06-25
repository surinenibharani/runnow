"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ALL_BLOG_CATEGORY,
  categoryToParam,
  getBlogCategories,
  paramToCategory,
} from "@/lib/blog/categories";

type BlogCategoryFilterProps = {
  className?: string;
};

export function BlogCategoryFilter({ className }: BlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeParam = searchParams.get("category");
  const activeCategory = paramToCategory(activeParam) ?? ALL_BLOG_CATEGORY;
  const categories = getBlogCategories();

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
                : `Show ${category} articles`
            }
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/60 bg-background text-foreground/75 hover:border-primary/40 hover:text-foreground"
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
