import { BlogFaq } from "@/components/blog/blog-faq";
import type { HubEditorial } from "@/lib/hub-seo";

type HubEditorialBlockProps = {
  editorial: HubEditorial;
};

export function HubEditorialBlock({ editorial }: HubEditorialBlockProps) {
  return (
    <details className="group mb-10 rounded-xl border border-border/60 bg-muted/20 px-4 py-3 sm:px-5">
      <summary className="cursor-pointer list-none text-sm font-medium text-foreground after:ml-2 after:text-muted-foreground after:content-['+'] group-open:after:content-['–'] marker:content-none [&::-webkit-details-marker]:hidden">
        About this guide
      </summary>
      <div className="mt-4 space-y-6">
        <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
          {editorial.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <BlogFaq items={editorial.faqs} heading="Common questions" />
      </div>
    </details>
  );
}
