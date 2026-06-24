import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/motion/fade-in";
import { pageMetadata } from "@/lib/seo/metadata";

const WeekTracker = dynamic(
  () => import("@/components/plan/week-tracker").then((m) => ({ default: m.WeekTracker })),
  { loading: () => <div className="text-center text-muted-foreground">Loading plans...</div> }
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
              Pick your distance and timeline, then set your rest day and long
              run day. Six active days per week — runs and cross-training move
              to fit your schedule.
            </p>
          </div>
        </FadeIn>

        <Suspense fallback={<div className="text-center text-muted-foreground">Loading plans...</div>}>
          <WeekTracker />
        </Suspense>
      </div>
    </div>
  );
}
