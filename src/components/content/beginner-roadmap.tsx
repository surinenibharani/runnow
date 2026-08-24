import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { beginnerRoadmap } from "@/lib/beginner-roadmap";
import { cn } from "@/lib/utils";

type BeginnerRoadmapProps = {
  className?: string;
  /** Compact heading when the surrounding page already has an h1. */
  heading?: string;
};

export function BeginnerRoadmap({
  className,
  heading = "Beginner roadmap",
}: BeginnerRoadmapProps) {
  return (
    <section
      aria-labelledby="beginner-roadmap-heading"
      className={cn("rounded-2xl border border-border/60 bg-card/50 p-5 sm:p-8", className)}
    >
      <h2
        id="beginner-roadmap-heading"
        className="text-xl font-bold tracking-tight sm:text-2xl"
      >
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Week 1 to your first 5K — slow on purpose. Skip ahead only if the
        current step already feels easy.
      </p>

      <ol className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
        {beginnerRoadmap.map((step, index) => (
          <li
            key={step.id}
            className="relative flex gap-4 sm:flex-col sm:gap-0"
          >
            {index < beginnerRoadmap.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[1.15rem] top-10 h-[calc(100%-1.5rem)] w-px bg-border sm:hidden lg:left-auto lg:right-[-0.4rem] lg:top-5 lg:block lg:h-px lg:w-[calc(100%+0.75rem)]"
              />
            )}
            <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
              {index + 1}
            </div>
            <div className="pb-8 sm:pb-0 sm:pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {step.stage}
              </p>
              <p className="mt-1 font-semibold leading-snug">{step.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.summary}
              </p>
              <Link
                href={step.href}
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {step.hrefLabel}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 border-t border-border/60 pt-5 text-sm leading-relaxed text-muted-foreground">
        Need proof the slow path works?{" "}
        <Link
          href="/stories"
          className="font-medium text-primary hover:underline"
        >
          Read beginner success stories
        </Link>
        .
      </p>
    </section>
  );
}
