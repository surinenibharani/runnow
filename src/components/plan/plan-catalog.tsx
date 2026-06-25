import { PlanCatalogExplorer, type PlanCatalogItem } from "@/components/plan/plan-catalog-explorer";
import { getPlanFilters } from "@/lib/plan-catalog";
import {
  computePlanStats,
  getPeakWeekNumber,
  getSampleWeekPreview,
} from "@/lib/plan-stats";
import { PLANS, PLAN_FAMILIES, getFamilyById } from "@/lib/plans";

function buildCatalogItems(): PlanCatalogItem[] {
  return PLANS.map((plan) => {
    const family = getFamilyById(plan.familyId);
    const stats = computePlanStats(plan);
    const peakWeekNum = getPeakWeekNumber(plan);

    return {
      id: plan.id,
      familyId: plan.familyId,
      familyName: family?.name ?? plan.name,
      name: plan.name,
      duration: plan.duration,
      description: plan.description,
      prerequisite: plan.prerequisite,
      filters: getPlanFilters(plan.id),
      stats: {
        durationWeeks: stats.durationWeeks,
        totalRuns: stats.totalRuns,
        peakWeeklyMileageLabel: stats.peakWeeklyMileageLabel,
        crossTrainDaysPerWeek: stats.crossTrainDaysPerWeek,
      },
      sampleWeek: getSampleWeekPreview(plan, 1),
      peakWeek: getSampleWeekPreview(plan, peakWeekNum),
    };
  });
}

type PlanCatalogProps = {
  selectedPlanId?: string;
};

export function PlanCatalog({ selectedPlanId }: PlanCatalogProps) {
  const plans = buildCatalogItems();

  return (
    <PlanCatalogExplorer plans={plans} selectedPlanId={selectedPlanId} />
  );
}
