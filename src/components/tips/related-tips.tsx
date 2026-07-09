import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { getTipsForBlogPost } from "@/lib/tips/helpers";

type RelatedTipsProps = {
  blogSlug: string;
};

export function RelatedTips({ blogSlug }: RelatedTipsProps) {
  const tips = getTipsForBlogPost(blogSlug);
  if (tips.length === 0) return null;

  return (
    <section
      aria-labelledby="related-tips-heading"
      className="mt-12 rounded-xl border border-border/60 bg-muted/30 px-4 py-5 sm:px-6"
    >
      <h2
        id="related-tips-heading"
        className="flex items-center gap-2 text-base font-semibold text-foreground"
      >
        <Lightbulb className="size-4 text-primary" />
        Related quick tips
      </h2>
      <ul className="mt-4 space-y-3">
        {tips.map((tip) => (
          <li key={tip.slug}>
            <Link
              href={`/tips/${tip.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {tip.title}
            </Link>
            <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
              {tip.content}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        Browse all{" "}
        <Link href="/tips" className="text-primary hover:underline">
          beginner running tips
        </Link>
        .
      </p>
    </section>
  );
}
