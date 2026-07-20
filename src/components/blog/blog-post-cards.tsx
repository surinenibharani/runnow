import Link from "next/link";
import type { BlogPostCardSummary } from "@/lib/blog/types";
import { isBlogPostScheduled } from "@/lib/blog/preview";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

type BlogPostCardsProps = {
  /** Expected newest-first; caller owns sort order. */
  posts: BlogPostCardSummary[];
  commentCounts: Record<string, number>;
  previewToken?: string;
};

export function BlogPostCards({
  posts,
  commentCounts,
  previewToken,
}: BlogPostCardsProps) {
  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No posts in this category yet.{" "}
        <Link href="/blog" className="text-primary hover:underline">
          View all articles
        </Link>
        .
      </p>
    );
  }

  return (
    <StaggerChildren className="space-y-4">
      {posts.map((post) => (
        <StaggerItem key={post.slug}>
          <BlogPostCard
            post={post}
            commentCount={commentCounts[post.slug] ?? 0}
            scheduled={isBlogPostScheduled(post.publishedAt)}
            previewToken={previewToken}
          />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
