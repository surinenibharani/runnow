import { plans5k } from "@/lib/plans/5k";
import { plans10k } from "@/lib/plans/10k";
import { plansHalf } from "@/lib/plans/half-marathon";
import { plansFull } from "@/lib/plans/full-marathon";
import type { PlanFamily, TrainingPlan } from "@/lib/plan-types";

export const PLAN_FAMILIES: PlanFamily[] = [
  {
    id: "5k",
    name: "Couch to 5K",
    shortName: "5K",
    prerequisite: "No experience needed",
    runsPerWeek: 3,
    variantIds: plans5k.map((p) => p.id),
  },
  {
    id: "10k",
    name: "10K",
    shortName: "10K",
    prerequisite: "Comfortable completing a 5K or running ~30 minutes continuously",
    runsPerWeek: 3,
    variantIds: plans10k.map((p) => p.id),
  },
  {
    id: "half-marathon",
    name: "Half Marathon",
    shortName: "Half",
    prerequisite: "Comfortable running 30 minutes continuously",
    runsPerWeek: 4,
    variantIds: plansHalf.map((p) => p.id),
  },
  {
    id: "full-marathon",
    name: "Full Marathon",
    shortName: "Marathon",
    prerequisite: "Completed a half marathon or comfortable running 10+ miles",
    runsPerWeek: 4,
    variantIds: plansFull.map((p) => p.id),
  },
];

export const PLANS: TrainingPlan[] = [
  ...plans5k,
  ...plans10k,
  ...plansHalf,
  ...plansFull,
];
export const DEFAULT_FAMILY_ID = "5k";
export const DEFAULT_PLAN_ID = "5k-8w";

export function getPlanById(id: string): TrainingPlan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function getFamilyById(id: string): PlanFamily | undefined {
  return PLAN_FAMILIES.find((f) => f.id === id);
}

export function getPlansForFamily(familyId: string): TrainingPlan[] {
  return PLANS.filter((p) => p.familyId === familyId);
}

export type {
  TrainingPlan,
  WeekTemplate,
  ScheduledWeek,
  Workout,
  ScheduleDay,
  PlanFamily,
} from "@/lib/plan-types";
export { getTotalWorkouts } from "@/lib/plan-types";
