import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { PlanCatalog } from "@/components/plan/plan-catalog";
import { PlanLoading } from "@/components/plan/plan-loading";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { ContentCopyrightNotice } from "@/components/legal/content-copyright-notice";
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
  if (planId && getPlanById(planId)) {
    redirect(`/plan/${planId}`);
  }

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={plansPageJsonLd()} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Training plans" }]} />

        <FadeIn className="mb-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Training plans
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Pick a distance, then a length. New to running? Choose{" "}
              <span className="font-medium text-foreground">
                16 wk · Walk-first
              </span>{" "}
              on Couch to 5K, or{" "}
              <Link href="/start" className="font-medium text-primary hover:underline">
                Start here
              </Link>{" "}
              for a 60-second recommendation.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              After you load a plan you can print it or save a PDF from the
              browser.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mb-8">
          <MedicalDisclaimerBanner>
            Build volume gradually and stop for chest pain, dizziness, or sharp
            joint pain.{" "}
          </MedicalDisclaimerBanner>
        </FadeIn>

        <PlanCatalog />

        <div id="plan-tracker" className="scroll-mt-24">
          <div className="mb-6 border-t border-border/60 pt-10">
            <h2 className="text-xl font-bold sm:text-2xl">Plan tracker</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Mark workouts complete, adjust your schedule, and sync progress when
              signed in. Prefer paper? Open the printable sheet for your selected
              plan and use{" "}
              <span className="font-medium text-foreground">
                Print → Save as PDF
              </span>{" "}
              to download it.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Example:{" "}
              <Link
                href="/plan/5k-8w/printable"
                className="font-medium text-primary hover:underline"
              >
                Printable 8-week 5K tracker
              </Link>
              .
            </p>
          </div>

          <Suspense fallback={<PlanLoading variant="bundle" />}>
            <WeekTracker />
          </Suspense>
        </div>

        <ContentCopyrightNotice kind="plan" className="mt-10" />
      </div>
    </div>
  );
}
