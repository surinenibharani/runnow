import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export type PlanLoadingVariant = "bundle" | "auth" | "sync";

const LOADING_COPY: Record<
  PlanLoadingVariant,
  { title: string; detail: string }
> = {
  bundle: {
    title: "Loading your training plan",
    detail:
      "Setting up distance options, weekly schedules, and workout tracking.",
  },
  auth: {
    title: "Checking your account",
    detail: "We'll load your saved plan and progress if you're signed in.",
  },
  sync: {
    title: "Syncing your progress",
    detail: "Pulling your plan settings and completed workouts from your account.",
  },
};

type PlanLoadingProps = {
  variant?: PlanLoadingVariant;
};

export function PlanLoading({ variant = "bundle" }: PlanLoadingProps) {
  const copy = LOADING_COPY[variant];

  return (
    <div
      className="space-y-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={copy.title}
    >
      <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3.5">
        <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">{copy.title}…</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{copy.detail}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-10 flex-1 rounded-lg" />
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60">
        <Skeleton className="h-28 rounded-none" />
        <div className="space-y-3 bg-muted/20 p-4 sm:p-5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-6 w-36 rounded-full" />
        </div>
      </div>

      <div>
        <Skeleton className="mb-2 h-4 w-28" />
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5 space-y-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 p-4 sm:p-5 space-y-3">
        <Skeleton className="h-5 w-36" />
        <div className="grid gap-2 sm:grid-cols-7">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="border-border/60">
            <CardContent className="flex items-center gap-4 p-6">
              <Skeleton className="size-12 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Skeleton key={i} className="h-8 w-12 rounded-lg" />
        ))}
      </div>

      <div className="space-y-3">
        {[0, 1, 2, 4].map((i) => (
          <Card key={i} className="border-border/60">
            <CardContent className="flex items-start gap-4 p-4 sm:p-6">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
