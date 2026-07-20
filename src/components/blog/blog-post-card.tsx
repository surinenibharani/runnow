import Link from "next/link";
import { ArrowRight, Clock, Lightbulb, MessageSquare, User } from "lucide-react";
import type { BlogPostCardSummary } from "@/lib/blog/types";
import { PostShareButtons } from "@/components/blog/post-share-buttons";
import {
  buildBlogPostHref,
  formatBlogPostPublishSchedule,
} from "@/lib/blog/preview";
import {
  getBlogPostCanonicalUrl,
  getBlogPostDisplayUrl,
} from "@/lib/blog/urls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type BlogPostCardProps = {
  post: BlogPostCardSummary;
  commentCount: number;
  scheduled: boolean;
  previewToken?: string;
};

export function BlogPostCard({
  post,
  commentCount,
  scheduled,
  previewToken,
}: BlogPostCardProps) {
  const postHref = buildBlogPostHref(post.slug, previewToken);
  const shareUrl = getBlogPostCanonicalUrl(post.slug, previewToken);
  const displayUrl = getBlogPostDisplayUrl(post.slug);

  return (
    <Card className="border-border/60 transition-all duration-300 hover:border-primary/20">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          {scheduled && (
            <Badge
              variant="outline"
              className="border-amber-500/50 text-xs text-amber-800 dark:text-amber-200"
            >
              Scheduled · {formatBlogPostPublishSchedule(post.publishedAt)}
            </Badge>
          )}
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

        <h2 className="text-xl font-semibold sm:text-2xl">
          <Link href={postHref} className="hover:text-primary">
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 line-clamp-3 leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        {post.whyItMatters && (
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground/90 line-clamp-2">
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

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            nativeButton={false}
            render={<Link href={postHref} />}
            size="sm"
          >
            Read complete post
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        <PostShareButtons
          title={post.title}
          url={shareUrl}
          displayUrl={displayUrl}
          compact
          className="mt-6 border-t border-border/60 pt-5"
        />
      </CardContent>
    </Card>
  );
}
