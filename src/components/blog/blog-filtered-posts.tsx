"use client";

import { useSearchParams } from "next/navigation";
import type { BlogPost } from "@/lib/blog/types";
import { filterPostsByCategory, paramToCategory } from "@/lib/blog/categories";
import { BlogPostCards } from "@/components/blog/blog-post-cards";

type BlogFilteredPostsProps = {
  posts: BlogPost[];
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
        posts={filteredPosts}
        commentCounts={commentCounts}
        previewToken={previewToken}
      />
    </>
  );
}
