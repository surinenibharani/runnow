import Link from "next/link";
import { Lightbulb } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { BlogSectionBlock } from "@/components/blog/blog-section";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { PostShareButtons } from "@/components/blog/post-share-buttons";
import { BlogComments } from "@/components/blog/blog-comments";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Badge } from "@/components/ui/badge";
import { categoryToParam } from "@/lib/blog/categories";
import { appendBlogPreviewParam } from "@/lib/blog/preview";
import { getBlogPostCanonicalUrl, getBlogPostDisplayUrl } from "@/lib/blog/urls";

type PostContentProps = {
  post: BlogPost;
  related?: BlogPost[];
  commentCount?: number;
  previewToken?: string;
  scheduled?: boolean;
};

export function PostContent({
  post,
  related = [],
  commentCount = 0,
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
          <span aria-hidden>·</span>
          <span>{post.readTime} read</span>
          <span aria-hidden>·</span>
          <Link href="#comments" className="text-primary hover:underline">
            {commentCount === 0
              ? "Leave a comment"
              : `${commentCount} comment${commentCount === 1 ? "" : "s"}`}
          </Link>
        </div>
        <PostShareButtons
          title={post.title}
          url={getBlogPostCanonicalUrl(post.slug, previewToken)}
          displayUrl={getBlogPostDisplayUrl(post.slug)}
          className="mt-6 pt-6 border-t border-border/60"
        />
      </header>

      <div className="space-y-10">
        {post.sections.map((section) => (
          <BlogSectionBlock
            key={section.heading ?? section.paragraphs?.[0]}
            section={section}
          />
        ))}
      </div>

      <RelatedPosts
        posts={related}
        category={post.category}
        previewToken={previewToken}
      />

      {!scheduled && (
        <BlogComments postSlug={post.slug} initialCount={commentCount} />
      )}

      <StartPlanCta variant="compact" className="mt-12" />
    </article>
  );
}
