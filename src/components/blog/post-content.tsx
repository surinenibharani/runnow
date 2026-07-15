import Link from "next/link";
import { Lightbulb } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { BlogFaq } from "@/components/blog/blog-faq";
import { BlogSources } from "@/components/blog/blog-sources";
import { BlogSectionBlock } from "@/components/blog/blog-section";
import { BlogTableOfContents } from "@/components/blog/blog-table-of-contents";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { PostShareButtons } from "@/components/blog/post-share-buttons";
import { ContentLikeButton } from "@/components/engagement/content-like-button";
import { BlogComments } from "@/components/blog/blog-comments";
import { RelatedPosts } from "@/components/blog/related-posts";
import { RelatedTips } from "@/components/tips/related-tips";
import { Badge } from "@/components/ui/badge";
import { categoryToParam } from "@/lib/blog/categories";
import { appendBlogPreviewParam } from "@/lib/blog/preview";
import { getBlogPostCanonicalUrl, getBlogPostDisplayUrl } from "@/lib/blog/urls";

type PostContentProps = {
  post: BlogPost;
  related?: BlogPost[];
  commentCount?: number;
  likeCount?: number;
  likedByMe?: boolean;
  previewToken?: string;
  scheduled?: boolean;
};

export function PostContent({
  post,
  related = [],
  commentCount = 0,
  likeCount = 0,
  likedByMe = false,
  previewToken,
  scheduled = false,
}: PostContentProps) {
  return (
    <article>
      <header className="mb-10">
        <Badge
          variant="secondary"
          className="mb-4"
          render={
            <Link
              href={appendBlogPreviewParam(
                `/blog?category=${categoryToParam(post.category)}`,
                previewToken
              )}
            />
          }
        >
          {post.category}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
        {post.whyItMatters && (
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 sm:px-5 sm:py-5">
            <p className="flex items-start gap-2.5 text-sm font-semibold text-foreground sm:text-base">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary sm:size-5" />
              Why this matters
            </p>
            <p className="mt-2 pl-6 text-sm leading-relaxed text-muted-foreground sm:pl-7 sm:text-base">
              {post.whyItMatters}
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span>
            By <span className="font-medium text-foreground">{post.author}</span>
          </span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <>
              <span aria-hidden>·</span>
              <span>
                Updated{" "}
                <time dateTime={post.updatedAt}>
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{post.readTime} read</span>
          <span aria-hidden>·</span>
          <Link href="#comments" className="text-primary hover:underline">
            {commentCount === 0
              ? "Leave a comment"
              : `${commentCount} comment${commentCount === 1 ? "" : "s"}`}
          </Link>
        </div>
        <div className="mt-6 space-y-5 border-t border-border/60 pt-6">
          <ContentLikeButton
            targetType="blog"
            targetSlug={post.slug}
            initialCount={likeCount}
            initialLiked={likedByMe}
          />
          <PostShareButtons
            title={post.title}
            url={getBlogPostCanonicalUrl(post.slug, previewToken)}
            displayUrl={getBlogPostDisplayUrl(post.slug)}
          />
        </div>
      </header>

      <BlogTableOfContents
        sections={post.sections}
        extra={
          post.faq?.length
            ? [{ id: "faq", label: "Frequently asked questions" }]
            : []
        }
        className="mb-10"
      />

      <div className="space-y-10">
        {post.sections.map((section, index) => (
          <BlogSectionBlock
            key={section.id ?? section.heading ?? section.paragraphs?.[0]}
            section={section}
            sectionIndex={index}
          />
        ))}
      </div>

      {post.faq && post.faq.length > 0 && <BlogFaq items={post.faq} />}

      {post.sources && post.sources.length > 0 && (
        <BlogSources sources={post.sources} />
      )}

      {post.closingQuestion && !scheduled && (
        <Link
          href="#comments"
          className="mt-10 block rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 text-sm leading-relaxed text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 sm:px-5"
        >
          <span className="font-semibold text-foreground">Join the conversation: </span>
          {post.closingQuestion}
          <span className="mt-2 block text-sm font-medium text-primary">
            Leave a comment below ↓
          </span>
        </Link>
      )}

      <RelatedPosts
        posts={related}
        category={post.category}
        previewToken={previewToken}
      />

      <RelatedTips blogSlug={post.slug} />

      {!scheduled && (
        <BlogComments postSlug={post.slug} initialCount={commentCount} />
      )}

      <StartPlanCta variant="compact" className="mt-12" />
    </article>
  );
}
