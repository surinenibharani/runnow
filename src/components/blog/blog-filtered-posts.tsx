"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BlogPostCardSummary } from "@/lib/blog/types";
import { filterPostsByCategory, paramToCategory } from "@/lib/blog/categories";
import { BlogPostCards } from "@/components/blog/blog-post-cards";
import { Button } from "@/components/ui/button";

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;

type BlogFilteredPostsProps = {
  /** Already newest-first from the server. */
  posts: BlogPostCardSummary[];
  commentCounts: Record<string, number>;
  previewToken?: string;
};

export function BlogFilteredPosts({
  posts,
  commentCounts,
  previewToken,
}: BlogFilteredPostsProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategory = paramToCategory(categoryParam);
  const filteredPosts = filterPostsByCategory(posts, categoryParam);
  const listKey = categoryParam ?? "all";
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [listKey]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const remaining = filteredPosts.length - visiblePosts.length;

  return (
    <>
      {activeCategory && (
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{activeCategory}</span>{" "}
          · {filteredPosts.length} article
          {filteredPosts.length === 1 ? "" : "s"}
        </p>
      )}

      <BlogPostCards
        key={listKey}
        posts={visiblePosts}
        commentCounts={commentCounts}
        previewToken={previewToken}
      />

      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setVisibleCount((count) => count + LOAD_MORE_STEP)
            }
          >
            Show more ({remaining} left)
          </Button>
        </div>
      )}
    </>
  );
}
