import Link from "next/link";
import { ArrowRight, BookOpen, Dumbbell, Footprints, Lightbulb, ShoppingBag } from "lucide-react";
import type { ContentPathway, PathwayKind } from "@/lib/content-pathways";
import { cn } from "@/lib/utils";

const kindMeta: Record<
  PathwayKind,
  { label: string; icon: typeof Lightbulb; className: string }
> = {
  tip: {
    label: "Tip",
    icon: Lightbulb,
    className: "bg-amber-500/10 text-amber-800 dark:text-amber-200",
  },
  blog: {
    label: "Guide",
    icon: BookOpen,
    className: "bg-sky-500/10 text-sky-800 dark:text-sky-200",
  },
  plan: {
    label: "Plan",
    icon: Footprints,
    className: "bg-teal-500/10 text-teal-800 dark:text-teal-200",
  },
  injury: {
    label: "Injury",
    icon: Dumbbell,
    className: "bg-orange-500/10 text-orange-800 dark:text-orange-200",
  },
  gear: {
    label: "Gear",
    icon: ShoppingBag,
    className: "bg-violet-500/10 text-violet-800 dark:text-violet-200",
  },
};

type RelatedPathwaysProps = {
  pathway: ContentPathway;
  className?: string;
};

export function RelatedPathways({ pathway, className }: RelatedPathwaysProps) {
  return (
    <section
      aria-labelledby="related-pathways-heading"
      className={cn(
        "rounded-xl border border-border/60 bg-muted/20 px-4 py-5 sm:px-6",
        className
      )}
    >
      <h2
        id="related-pathways-heading"
        className="text-base font-semibold tracking-tight sm:text-lg"
      >
        {pathway.title}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {pathway.links.map((link) => {
          const meta = kindMeta[link.kind];
          const Icon = meta.icon;
          return (
            <li key={`${link.kind}-${link.href}`}>
              <Link
                href={link.href}
                className="group flex h-full flex-col rounded-lg border border-border/60 bg-background p-4 transition-colors hover:border-primary/30 hover:bg-muted/30"
              >
                <span
                  className={cn(
                    "inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                    meta.className
                  )}
                >
                  <Icon className="size-3" aria-hidden />
                  {meta.label}
                </span>
                <span className="mt-2 font-medium leading-snug group-hover:text-primary">
                  {link.label}
                </span>
                <span className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {link.detail}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
