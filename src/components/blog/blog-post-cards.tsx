"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { BlogPostCardSummary } from "@/lib/blog/types";
import { isBlogPostScheduled } from "@/lib/blog/preview";
import { BlogPostCard } from "@/components/blog/blog-post-card";

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
  const prefersReducedMotion = useReducedMotion();

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
    <div className="space-y-4">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.35,
                  // Only stagger the first page; later “Show more” batches appear promptly.
                  delay: index < 12 ? Math.min(index * 0.04, 0.32) : 0,
                  ease: [0.25, 0.4, 0.25, 1],
                }
          }
        >
          <BlogPostCard
            post={post}
            commentCount={commentCounts[post.slug] ?? 0}
            scheduled={isBlogPostScheduled(post.publishedAt)}
            previewToken={previewToken}
          />
        </motion.div>
      ))}
    </div>
  );
}
