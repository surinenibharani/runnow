import { getFamilyById, getPlanById } from "@/lib/plans";
import { DAY_NAMES } from "@/lib/plan-types";
import {
  FITNESS_LEVEL_OPTIONS,
  parseFitnessLevel,
  weeksUntilDate,
  type FitnessLevel,
} from "@/lib/plan-personalization";

export type TrainingPlanDisplay = {
  planId: string;
  planName: string;
  planDuration: string;
  familyName: string;
  currentWeek: number;
  totalWeeks: number;
  restDayName: string;
  longRunDayName: string;
  runDaysPerWeek: 3 | 4;
  age: number | null;
  fitnessLevel: FitnessLevel;
  fitnessLabel: string;
  goalRaceDate: string | null;
  goalRaceDateLabel: string | null;
  weeksUntilRace: number | null;
  startedAt: string | null;
  editPlanHref: string;
};

type TrainingPlanRecord = {
  planId: string;
  currentWeek: number;
  restDay: number;
  longRunDay: number;
  runDaysPerWeek: number;
  age: number | null;
  fitnessLevel: string | null;
  goalRaceDate: Date | null;
  startedAt?: Date;
};

function formatGoalRaceDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function buildTrainingPlanDisplay(
  plan: TrainingPlanRecord
): TrainingPlanDisplay {
  const meta = getPlanById(plan.planId);
  const family = meta ? getFamilyById(meta.familyId) : undefined;
  const fitnessLevel = parseFitnessLevel(plan.fitnessLevel);
  const fitnessLabel =
    FITNESS_LEVEL_OPTIONS.find((option) => option.value === fitnessLevel)?.label ??
    fitnessLevel;
  const goalRaceDateIso = plan.goalRaceDate?.toISOString() ?? null;

  return {
    planId: plan.planId,
    planName: meta?.name ?? plan.planId,
    planDuration: meta?.duration ?? "",
    familyName: family?.name ?? "",
    currentWeek: plan.currentWeek,
    totalWeeks: meta?.durationWeeks ?? meta?.weeks.length ?? 0,
    restDayName: DAY_NAMES[plan.restDay - 1] ?? "Sun",
    longRunDayName: DAY_NAMES[plan.longRunDay - 1] ?? "Sat",
    runDaysPerWeek: plan.runDaysPerWeek === 4 ? 4 : 3,
    age: plan.age,
    fitnessLevel,
    fitnessLabel,
    goalRaceDate: goalRaceDateIso,
    goalRaceDateLabel: plan.goalRaceDate
      ? formatGoalRaceDate(plan.goalRaceDate)
      : null,
    weeksUntilRace: goalRaceDateIso ? weeksUntilDate(goalRaceDateIso) : null,
    startedAt: plan.startedAt?.toISOString() ?? null,
    editPlanHref: `/plan?plan=${encodeURIComponent(plan.planId)}`,
  };
}
