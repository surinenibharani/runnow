import { Card, CardContent } from "@/components/ui/card";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted ${className ?? ""}`}
      aria-hidden
    />
  );
}

export function PlanLoading() {
  return (
    <div
      className="space-y-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading training plan"
    >
      <span className="sr-only">Loading your training plan…</span>

      <Skeleton className="h-12 w-full max-w-md mx-auto" />

      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="border-border/60">
            <CardContent className="p-6 flex items-center gap-4">
              <Skeleton className="size-12 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {[0, 1, 2].map((i) => (
          <Card key={i} className="border-border/60">
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
