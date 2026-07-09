import type { BlogSection } from "@/lib/blog/types";
import { resolveSectionId } from "@/lib/blog/section-ids";
import { cn } from "@/lib/utils";

type BlogTableOfContentsProps = {
  sections: BlogSection[];
  extra?: { id: string; label: string }[];
  className?: string;
};

export function BlogTableOfContents({
  sections,
  extra = [],
  className,
}: BlogTableOfContentsProps) {
  const sectionItems = sections
    .map((section, index) => {
      const id = resolveSectionId(section.id, section.heading, index);
      if (!id || !section.heading) return null;
      return { id, label: section.heading };
    })
    .filter((item): item is { id: string; label: string } => item !== null);
  const items = [...sectionItems, ...extra];

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-xl border border-border/60 bg-muted/30 p-5 sm:p-6",
        className
      )}
    >
      <p className="text-sm font-semibold text-foreground">On this page</p>
      <ol className="mt-3 space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="mr-2 text-xs text-muted-foreground/70">
                {index + 1}.
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
