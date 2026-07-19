import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlanPrintableSheet } from "@/components/plan/plan-printable-sheet";
import { getPlanById, PLANS } from "@/lib/plans";
import {
  applyScheduleToPlan,
  defaultRunDaysForPlan,
  DEFAULT_SCHEDULE,
} from "@/lib/schedule-builder";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PlanPrintablePageProps = {
  params: Promise<{ planId: string }>;
  searchParams: Promise<{ from?: string }>;
};

export function generateStaticParams() {
  return PLANS.map((plan) => ({ planId: plan.id }));
}

export async function generateMetadata({
  params,
}: PlanPrintablePageProps): Promise<Metadata> {
  const { planId } = await params;
  const plan = getPlanById(planId);
  if (!plan) return { title: "Plan printable" };

  return {
    title: `Printable ${plan.name} tracker`,
    description: `Print or save as PDF: track duration, cross-training, mood, and effort for every day of ${plan.name}.`,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${SITE_URL}/plan/${plan.id}/printable`,
    },
  };
}

export default async function PlanPrintablePage({
  params,
  searchParams,
}: PlanPrintablePageProps) {
  const { planId } = await params;
  const { from } = await searchParams;
  const plan = getPlanById(planId);
  if (!plan) notFound();

  const scheduled = applyScheduleToPlan(plan, {
    ...DEFAULT_SCHEDULE,
    runDaysPerWeek: defaultRunDaysForPlan(plan.runsPerWeek),
  });
  const planHref = `/plan/${plan.id}${from === "start" ? "?from=start" : ""}`;

  return (
    <div className="min-h-screen bg-background">
      <PlanPrintableSheet
        plan={plan}
        weeks={scheduled.scheduledWeeks}
        planHref={planHref}
        fromQuiz={from === "start"}
      />
      <p className="no-print pb-10 text-center text-sm text-muted-foreground">
        <Link href={planHref} className="text-primary hover:underline">
          Open {plan.name} on {SITE_NAME}
        </Link>
      </p>
    </div>
  );
}
