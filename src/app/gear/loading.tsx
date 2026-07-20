import { Skeleton } from "@/components/ui/skeleton";

export default function GearLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Skeleton className="mb-8 h-4 w-36" />
        <Skeleton className="mx-auto mb-4 h-10 w-56" />
        <Skeleton className="mx-auto mb-10 h-5 w-full max-w-lg" />
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
