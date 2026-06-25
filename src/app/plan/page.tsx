import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { PlanCatalog } from "@/components/plan/plan-catalog";
import { PlanLoading } from "@/components/plan/plan-loading";
import { PlanPageHero } from "@/components/visuals/plan-scenes";
import { getPlanById } from "@/lib/plans";
import {
  buildPlanPageMetadata,
  plansPageJsonLd,
} from "@/lib/seo/plans";

const WeekTracker = dynamic(
  () => import("@/components/plan/week-tracker").then((m) => ({ default: m.WeekTracker })),
  { loading: () => <PlanLoading variant="bundle" /> }
);

type PlanPageProps = {
  searchParams: Promise<{ plan?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PlanPageProps): Promise<Metadata> {
  const { plan: planId } = await searchParams;
  return buildPlanPageMetadata(planId);
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const { plan: planId } = await searchParams;
  const selectedPlan = planId ? getPlanById(planId) : undefined;

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={plansPageJsonLd(selectedPlan)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Training plans" }]} />

        <FadeIn className="mb-10">
          <PlanPageHero className="mb-8" />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Training Plans
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Pick your distance and timeline, then add your age, fitness level, and
              goal race date for a plan tuned to you. Customize run days, rest day,
              and long run day — runs and cross-training shift to fit your schedule.
            </p>
          </div>
        </FadeIn>

        <PlanCatalog selectedPlanId={planId} />

        <div id="plan-tracker" className="scroll-mt-24">
          <div className="mb-6 border-t border-border/60 pt-10">
            <h2 className="text-xl font-bold sm:text-2xl">Your plan tracker</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Mark workouts complete, adjust your schedule, and sync progress when
              signed in.
            </p>
          </div>

          <Suspense fallback={<PlanLoading variant="bundle" />}>
            <WeekTracker />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
