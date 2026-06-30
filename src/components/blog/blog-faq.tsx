import type { BlogFaqItem } from "@/lib/blog/types";
import { FormatBlogText } from "@/components/blog/format-blog-text";

type BlogFaqProps = {
  items: BlogFaqItem[];
  heading?: string;
};

export function BlogFaq({
  items,
  heading = "Frequently asked questions",
}: BlogFaqProps) {
  if (items.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-24 mt-10 space-y-4">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{heading}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-border/60 bg-muted/20 px-4 py-3 sm:px-5"
          >
            <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                {item.question}
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <FormatBlogText text={item.answer} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
