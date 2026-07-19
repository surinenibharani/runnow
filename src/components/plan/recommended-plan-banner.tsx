import Link from "next/link";
import { Button } from "@/components/ui/button";

type RecommendedPlanBannerProps = {
  planName: string;
  planDuration: string;
};

/** Shown when the runner arrived from the Start Here quiz. */
export function RecommendedPlanBanner({
  planName,
  planDuration,
}: RecommendedPlanBannerProps) {
  return (
    <div
      className="mb-8 rounded-xl border border-primary/25 bg-primary/5 px-4 py-4 sm:px-5"
      role="status"
    >
      <p className="text-sm font-medium text-primary">From your Start Here quiz</p>
      <p className="mt-1 text-base font-semibold tracking-tight sm:text-lg">
        {planName} · {planDuration}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Showing only the plan we recommended. You can retake the quiz or browse
        every plan anytime.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          nativeButton={false}
          render={<Link href="/start" />}
          variant="outline"
          size="sm"
        >
          Retake quiz
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/plan" />}
          variant="ghost"
          size="sm"
        >
          Browse all plans
        </Button>
      </div>
    </div>
  );
}
