import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Skeleton className="mb-8 h-4 w-40" />
        <Skeleton className="mx-auto mb-4 h-10 w-72" />
        <Skeleton className="mx-auto mb-10 h-5 w-full max-w-xl" />
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
