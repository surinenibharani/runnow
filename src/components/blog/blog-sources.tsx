import { BookMarked, ExternalLink } from "lucide-react";
import type { BlogSource } from "@/lib/blog/types";

type BlogSourcesProps = {
  sources: BlogSource[];
};

/** Renders authoritative references and further-reading links for a post. */
export function BlogSources({ sources }: BlogSourcesProps) {
  if (!sources.length) return null;

  return (
    <section
      aria-labelledby="sources-heading"
      className="mt-12 rounded-xl border border-border/60 bg-muted/30 px-4 py-5 sm:px-6"
    >
      <h2
        id="sources-heading"
        className="flex items-center gap-2 text-base font-semibold text-foreground"
      >
        <BookMarked className="size-4 text-primary" />
        Sources &amp; further reading
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Want the detail behind the guidance above? These are reputable medical
        and research references. They are for general education, not personal
        medical advice.
      </p>
      <ul className="mt-4 space-y-2.5">
        {sources.map((source) => (
          <li key={source.href} className="text-sm leading-relaxed">
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 font-medium text-primary hover:underline"
            >
              <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
              <span>{source.label}</span>
            </a>
            {source.publisher && (
              <span className="text-muted-foreground"> — {source.publisher}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
