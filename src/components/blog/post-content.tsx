import Link from "next/link";
import type { BlogPost, BlogSection } from "@/lib/blog/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PostShareButtons } from "@/components/blog/post-share-buttons";
import { BlogComments } from "@/components/blog/blog-comments";
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
        <div key={sub.heading} className="rounded-xl border border-border/60 bg-muted/30 p-4 sm:p-5 space-y-3">
          <h3 className="font-semibold text-foreground">{sub.heading}</h3>
          {sub.paragraphs?.map((p) => (
            <p key={p} className="text-sm text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
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
    </section>
  );
}

type PostContentProps = {
  post: BlogPost;
  related?: BlogPost[];
  commentCount?: number;
};

export function PostContent({
  post,
  related = [],
  commentCount = 0,
}: PostContentProps) {
  return (
    <article>
      <header className="mb-10">
        <Badge variant="secondary" className="mb-4">
          {post.category}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
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
          <Link
            href="#comments"
            className="text-primary hover:underline"
          >
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
          <SectionBlock key={section.heading ?? section.paragraphs?.[0]} section={section} />
        ))}
      </div>

      <BlogComments postSlug={post.slug} initialCount={commentCount} />

      {related.length > 0 && (
        <>
          <Separator className="my-12" />
          <aside>
            <h2 className="text-lg font-semibold mb-4">Keep reading</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group block rounded-xl border border-border/60 p-4 hover:border-primary/30 hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-xs text-muted-foreground">{r.category}</span>
                    <span className="block font-medium group-hover:text-primary transition-colors mt-0.5">
                      {r.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </>
      )}
    </article>
  );
}
