export type PlanFilter =
  | "gentle"
  | "beginner"
  | "cross-training"
  | "time-constrained";

export const PLAN_FILTERS: Array<{
  id: PlanFilter;
  label: string;
  description: string;
}> = [
  {
    id: "gentle",
    label: "Walk-first",
    description: "Walking first, then micro-jogs — the gentlest ramp",
  },
  {
    id: "beginner",
    label: "Beginner",
    description: "No or minimal running background — gradual build-up",
  },
  {
    id: "cross-training",
    label: "With Cross-training",
    description: "3 run days per week with yoga, cycling, or strength on other days",
  },
  {
    id: "time-constrained",
    label: "Time-constrained",
    description: "Shorter calendar — fewer weeks to race day",
  },
];

/** Filter tags assigned to each plan variant. */
export const PLAN_FILTER_TAGS: Record<string, PlanFilter[]> = {
  "5k-8w": ["beginner", "cross-training"],
  "5k-gentle-16w": ["gentle", "beginner", "cross-training"],
  "5k-6w": ["beginner", "cross-training", "time-constrained"],
  "5k-4w": ["cross-training", "time-constrained"],
  "10k-10w": ["beginner", "cross-training"],
  "10k-8w": ["beginner", "cross-training"],
  "10k-6w": ["cross-training", "time-constrained"],
  "half-12w": ["beginner", "cross-training"],
  "half-8w": ["cross-training", "time-constrained"],
  "full-16w": ["beginner", "cross-training"],
  "full-14w": ["cross-training"],
  "full-12w": ["cross-training", "time-constrained"],
};

/** Catalog sort: walk-first first, then beginner, then shorter aggressive plans. */
const FILTER_SORT_WEIGHT: Record<PlanFilter, number> = {
  gentle: 0,
  beginner: 1,
  "cross-training": 2,
  "time-constrained": 3,
};

export function getPlanFilters(planId: string): PlanFilter[] {
  return PLAN_FILTER_TAGS[planId] ?? [];
}

export function isGentlePlan(planId: string): boolean {
  return getPlanFilters(planId).includes("gentle");
}

export function planMatchesFilters(
  planId: string,
  activeFilters: PlanFilter[]
): boolean {
  if (activeFilters.length === 0) return true;
  const tags = getPlanFilters(planId);
  return activeFilters.every((filter) => tags.includes(filter));
}

/** Sort for the plan explorer — gentle / walk-first rises above 4-week cram plans. */
export function comparePlansForCatalog(
  a: { id: string; familyId: string; stats: { durationWeeks: number } },
  b: { id: string; familyId: string; stats: { durationWeeks: number } }
): number {
  const aGentle = isGentlePlan(a.id) ? 0 : 1;
  const bGentle = isGentlePlan(b.id) ? 0 : 1;
  if (aGentle !== bGentle) return aGentle - bGentle;

  const aTags = getPlanFilters(a.id);
  const bTags = getPlanFilters(b.id);
  const aWeight = Math.min(
    ...aTags.map((t) => FILTER_SORT_WEIGHT[t]),
    FILTER_SORT_WEIGHT["time-constrained"]
  );
  const bWeight = Math.min(
    ...bTags.map((t) => FILTER_SORT_WEIGHT[t]),
    FILTER_SORT_WEIGHT["time-constrained"]
  );
  if (aWeight !== bWeight) return aWeight - bWeight;

  if (a.familyId !== b.familyId) {
    return a.familyId.localeCompare(b.familyId);
  }

  // Within a family, longer beginner ramps before short cram plans
  return b.stats.durationWeeks - a.stats.durationWeeks;
}
