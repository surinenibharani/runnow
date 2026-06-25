import Link from "next/link";
import { Clock, Lightbulb, MessageSquare, User } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

type BlogPostCardsProps = {
  posts: BlogPost[];
  commentCounts: Record<string, number>;
};

export function BlogPostCards({ posts, commentCounts }: BlogPostCardsProps) {
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
      {posts.map((post) => {
        const commentCount = commentCounts[post.slug] ?? 0;

        return (
          <StaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <Card className="border-border/60 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                    {commentCount > 0 && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="size-3" />
                        {commentCount} comment{commentCount === 1 ? "" : "s"}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold transition-colors group-hover:text-primary sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  {post.whyItMatters && (
                    <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground/90">
                      <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-primary/70" />
                      <span>{post.whyItMatters}</span>
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="size-3.5" />
                      {post.author}
                    </span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerChildren>
  );
}
