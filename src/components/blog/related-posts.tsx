import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { Badge } from "@/components/ui/badge";
import { categoryToParam } from "@/lib/blog/categories";
import { buildBlogPostHref, getBlogPreviewHrefSuffix, appendBlogPreviewParam } from "@/lib/blog/preview";

type RelatedPostsProps = {
  posts: BlogPost[];
  category?: string;
  previewToken?: string;
};

export function RelatedPosts({
  posts,
  category,
  previewToken,
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <aside className="mt-12 border-t border-border/60 pt-10">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        Related posts
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Keep reading in the same vein
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-1">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={buildBlogPostHref(post.slug, previewToken)}
              className="group block rounded-xl border border-border/60 p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="mt-2 font-semibold leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {category && (
        <p className="mt-6 text-sm text-muted-foreground">
          Browse more by topic on the{" "}
          <Link
            href={appendBlogPreviewParam(
              `/blog?category=${categoryToParam(category)}`,
              previewToken
            )}
            className="text-primary hover:underline"
          >
            {category}
          </Link>{" "}
          filter.
        </p>
      )}
    </aside>
  );
}
