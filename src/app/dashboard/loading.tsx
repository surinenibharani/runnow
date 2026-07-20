import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Skeleton className="mb-2 h-9 w-56" />
        <Skeleton className="mb-8 h-5 w-80" />
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="mb-4 h-64 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    </div>
  );
}
