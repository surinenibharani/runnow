import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_PLAN_ID } from "@/lib/plans";
import { cn } from "@/lib/utils";

type StartPlanCtaProps = {
  variant?: "banner" | "compact" | "button";
  planId?: string;
  className?: string;
  headline?: string;
  description?: string;
};

function planHref(planId: string) {
  return `/plan/${planId}#plan-tracker`;
}

export function StartPlanCta({
  variant = "banner",
  planId = DEFAULT_PLAN_ID,
  className,
  headline = "Ready to start running?",
  description = "Free couch to 5K plan in your browser — no app download, no paywall.",
}: StartPlanCtaProps) {
  const href = planHref(planId);

  if (variant === "button") {
    return (
      <Button
        nativeButton={false}
        render={<Link href={href} />}
        size="sm"
        className={className}
      >
        Start Plan
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
      >
        <div>
          <p className="font-semibold">{headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href={href} />}
          className="shrink-0 gap-2"
        >
          Start Plan
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-primary px-5 py-10 text-center sm:rounded-3xl sm:px-12 sm:py-14",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,oklch(0.5_0.15_20/0.3)_100%)]" />
      <div className="relative">
        <h2 className="text-[clamp(1.5rem,3.5vw+0.5rem,2rem)] font-bold tracking-tight text-primary-foreground text-balance">
          {headline}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-primary-foreground/85 text-balance">
          {description}
        </p>
        <Button
          nativeButton={false}
          render={<Link href={href} />}
          size="lg"
          variant="secondary"
          className="mt-6 h-12 gap-2 px-8 text-base"
        >
          Start Plan
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
