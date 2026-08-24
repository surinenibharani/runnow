import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PathwayLink } from "@/lib/content-pathways";
import { cn } from "@/lib/utils";

type HubNextStepsProps = {
  heading?: string;
  steps: PathwayLink[];
  className?: string;
};

export function HubNextSteps({
  heading = "Clear next steps",
  steps,
  className,
}: HubNextStepsProps) {
  return (
    <section className={cn("rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6", className)}>
      <h2 className="text-base font-semibold sm:text-lg">{heading}</h2>
      <ul
        className={cn(
          "mt-4 grid gap-3",
          steps.length > 3
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-3"
        )}
      >
        {steps.map((step) => (
          <li key={step.href}>
            <Link
              href={step.href}
              className="group flex h-full flex-col rounded-lg bg-background/80 p-4 ring-1 ring-border/60 transition-colors hover:ring-primary/30"
            >
              <span className="font-medium group-hover:text-primary">
                {step.label}
              </span>
              <span className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {step.detail}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Go
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
