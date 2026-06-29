import Link from "next/link";
import { Lightbulb } from "lucide-react";
import type { BlogPost, BlogSection } from "@/lib/blog/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostShareButtons } from "@/components/blog/post-share-buttons";
import { BlogComments } from "@/components/blog/blog-comments";
import { RelatedPosts } from "@/components/blog/related-posts";
import { categoryToParam } from "@/lib/blog/categories";
import { appendBlogPreviewParam } from "@/lib/blog/preview";
import { SITE_URL } from "@/lib/site";

function SectionBlock({ section }: { section: BlogSection }) {
  return (
    <section className="space-y-4">
      {section.heading && (
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {section.heading}
        </h2>
      )}
      {section.paragraphs?.map((p) => (
        <p key={p} className="text-muted-foreground leading-relaxed">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="space-y-2">
          {section.list.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-muted-foreground leading-relaxed text-sm sm:text-base"
            >
              <span className="text-primary shrink-0 mt-1.5">·</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.subsections?.map((sub) => (
        <div
          key={sub.heading}
          className={
            sub.variant === "quote"
              ? "rounded-xl border border-border/60 border-l-4 border-l-primary/40 bg-muted/20 p-4 sm:p-5 space-y-3"
              : "rounded-xl border border-border/60 bg-muted/30 p-4 sm:p-5 space-y-3"
          }
        >
          {sub.variant !== "quote" && (
            <h3 className="font-semibold text-foreground">{sub.heading}</h3>
          )}
          {sub.paragraphs?.map((p) => (
            <p
              key={p}
              className={
                sub.variant === "quote"
                  ? "text-sm text-foreground leading-relaxed italic"
                  : "text-sm text-muted-foreground leading-relaxed"
              }
            >
              {sub.variant === "quote" ? `“${p}”` : p}
            </p>
          ))}
          {sub.variant === "quote" && (
            <p className="text-sm font-medium text-muted-foreground not-italic">
              {sub.heading}
            </p>
          )}
          {sub.list && (
            <ul className="space-y-1.5">
              {sub.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-primary shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {section.cta && (
        <Button
          nativeButton={false}
          render={<Link href={section.cta.href} />}
          size="lg"
          className="mt-2"
        >
          {section.cta.text}
        </Button>
      )}
    </section>
  );
}

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
          url={`${SITE_URL}/blog/${post.slug}`}
          className="mt-6 pt-6 border-t border-border/60"
        />
      </header>

      <div className="space-y-10">
        {post.sections.map((section) => (
          <SectionBlock
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
    </article>
  );
}
