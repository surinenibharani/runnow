import type { Metadata } from "next";
import { WeekTracker } from "@/components/plan/week-tracker";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "8-Week Beginner Plan",
  description:
    "A free couch-to-5K plan with walk-run intervals, progress tracking, and streak counting.",
};

export default function PlanPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your 8-Week Plan
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Three runs per week. Walk-run intervals that grow with you.
              Check off each workout and watch your progress build.
            </p>
          </div>
        </FadeIn>

        <WeekTracker />
      </div>
    </div>
  );
}
