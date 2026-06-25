import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/motion/fade-in";
import { PlanLoading } from "@/components/plan/plan-loading";
import { pageMetadata } from "@/lib/seo/metadata";

const WeekTracker = dynamic(
  () => import("@/components/plan/week-tracker").then((m) => ({ default: m.WeekTracker })),
  { loading: () => <PlanLoading /> }
);

export const metadata: Metadata = pageMetadata({
  title: "Training Plans",
  description:
    "Free 5K, half marathon, and marathon plans with multiple durations, cross-training, and progress tracking.",
  path: "/plan",
});

export default function PlanPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Training Plans
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Pick your distance and timeline, then add your age, fitness level, and
              goal race date for a plan tuned to you. Customize run days, rest day,
              and long run day — runs and cross-training shift to fit your schedule.
            </p>
          </div>
        </FadeIn>

        <Suspense fallback={<PlanLoading />}>
          <WeekTracker />
        </Suspense>
      </div>
    </div>
  );
}
