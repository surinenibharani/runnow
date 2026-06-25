import { PlanLoading } from "@/components/plan/plan-loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlanRouteLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Skeleton className="mb-8 h-4 w-48" />
        <Skeleton className="mx-auto mb-4 h-10 w-64" />
        <Skeleton className="mx-auto h-5 w-full max-w-xl" />

        <div className="mb-12 mt-10">
          <Skeleton className="mb-2 h-7 w-40" />
          <Skeleton className="mb-6 h-4 w-72" />
          <div className="mb-6 flex gap-2 overflow-hidden">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="mb-4 h-48 w-full rounded-xl" />
          ))}
        </div>

        <div id="plan-tracker" className="scroll-mt-24 border-t border-border/60 pt-10">
          <PlanLoading variant="bundle" />
        </div>
      </div>
    </div>
  );
}
