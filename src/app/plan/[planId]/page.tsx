import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { PlanCatalog } from "@/components/plan/plan-catalog";
import { PlanLoading } from "@/components/plan/plan-loading";
import { PlanRecommendationSummary } from "@/components/plan/plan-recommendation-summary";
import { RecommendedPlanBanner } from "@/components/plan/recommended-plan-banner";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { PlanPageHero } from "@/components/visuals/plan-scenes";
import { getPlanById, PLANS } from "@/lib/plans";
import {
  buildPlanPageMetadata,
  getPlanPageTitle,
  plansPageJsonLd,
} from "@/lib/seo/plans";

const WeekTracker = dynamic(
  () =>
    import("@/components/plan/week-tracker").then((m) => ({
      default: m.WeekTracker,
    })),
  { loading: () => <PlanLoading variant="bundle" /> }
);

type PlanVariantPageProps = {
  params: Promise<{ planId: string }>;
  searchParams: Promise<{ from?: string }>;
};

export function generateStaticParams() {
  return PLANS.map((plan) => ({ planId: plan.id }));
}

export async function generateMetadata({
  params,
}: PlanVariantPageProps): Promise<Metadata> {
  const { planId } = await params;
  return buildPlanPageMetadata(planId);
}

export default async function PlanVariantPage({
  params,
  searchParams,
}: PlanVariantPageProps) {
  const { planId } = await params;
  const { from } = await searchParams;
  const selectedPlan = getPlanById(planId);
  if (!selectedPlan) notFound();

  const fromQuiz = from === "start";

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={plansPageJsonLd(selectedPlan)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            ...(fromQuiz
              ? [{ label: "Start here", href: "/start" as const }]
              : [{ label: "Training plans", href: "/plan" as const }]),
            { label: getPlanPageTitle(selectedPlan) },
          ]}
        />

        <FadeIn className="mb-10">
          {!fromQuiz && <PlanPageHero className="mb-8" />}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {getPlanPageTitle(selectedPlan)}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {selectedPlan.description}
            </p>
          </div>
        </FadeIn>

        {fromQuiz && (
          <FadeIn>
            <RecommendedPlanBanner
              planName={selectedPlan.name}
              planDuration={selectedPlan.duration}
            />
          </FadeIn>
        )}

        <FadeIn>
          <PlanRecommendationSummary
            plan={selectedPlan}
            fromQuiz={fromQuiz}
          />
        </FadeIn>

        <FadeIn className="mb-8">
          <MedicalDisclaimerBanner>
            Build volume gradually and stop for chest pain, dizziness, or sharp
            joint pain.{" "}
          </MedicalDisclaimerBanner>
        </FadeIn>

        {!fromQuiz && <PlanCatalog selectedPlanId={planId} />}

        <div id="plan-tracker" className="scroll-mt-24">
          <div className="mb-6 border-t border-border/60 pt-10">
            <h2 className="text-xl font-bold sm:text-2xl">
              {fromQuiz ? "Your recommended plan" : "Your plan tracker"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Mark workouts complete, adjust your schedule, and sync progress when
              signed in.
            </p>
          </div>

          <Suspense fallback={<PlanLoading variant="bundle" />}>
            <WeekTracker initialPlanId={planId} lockToPlan={fromQuiz} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
