import { BlogFaq } from "@/components/blog/blog-faq";
import type { HubEditorial } from "@/lib/hub-seo";

type HubEditorialBlockProps = {
  editorial: HubEditorial;
};

export function HubEditorialBlock({ editorial }: HubEditorialBlockProps) {
  return (
    <div className="mb-10 space-y-6">
      <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
        {editorial.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      <BlogFaq items={editorial.faqs} heading="Common questions" />
    </div>
  );
}
