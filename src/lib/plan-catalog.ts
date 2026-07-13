export type PlanFilter = "beginner" | "cross-training" | "time-constrained";

export const PLAN_FILTERS: Array<{
  id: PlanFilter;
  label: string;
  description: string;
}> = [
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

export function getPlanFilters(planId: string): PlanFilter[] {
  return PLAN_FILTER_TAGS[planId] ?? [];
}

export function planMatchesFilters(
  planId: string,
  activeFilters: PlanFilter[]
): boolean {
  if (activeFilters.length === 0) return true;
  const tags = getPlanFilters(planId);
  return activeFilters.every((filter) => tags.includes(filter));
}
