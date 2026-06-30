import { parseCompletedIdsFromDb } from "@/lib/plan-alignment";
import { getFamilyById, getPlanById } from "@/lib/plans";
import { DAY_NAMES, getTotalWorkouts } from "@/lib/plan-types";
import {
  FITNESS_LEVEL_OPTIONS,
  parseFitnessLevel,
  weeksUntilDate,
  type FitnessLevel,
} from "@/lib/plan-personalization";
import { buildPlanPersonalization } from "@/lib/plan-validation";
import { applyScheduleToPlan } from "@/lib/schedule-builder";
import type { TrainingPlanState } from "@/lib/training-plan-client";

export type TrainingPlanWeekDayPreview = {
  dayName: string;
  label: string;
  kind: "run" | "cross-train" | "rest";
};

export type TrainingPlanWeekPreview = {
  weekNumber: number;
  weekTitle: string;
  focus: string;
  days: TrainingPlanWeekDayPreview[];
};

export type TrainingPlanDisplay = {
  planId: string;
  familyId: string;
  planName: string;
  planDuration: string;
  familyName: string;
  currentWeek: number;
  totalWeeks: number;
  restDay: number;
  longRunDay: number;
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
  completedCount: number;
  totalWorkouts: number;
  percentComplete: number;
  weekPreview: TrainingPlanWeekPreview | null;
  editPlanHref: string;
};

export type TrainingPlanRecord = {
  planId: string;
  currentWeek: number;
  restDay: number;
  longRunDay: number;
  runDaysPerWeek: number;
  age: number | null;
  fitnessLevel: string | null;
  goalRaceDate: Date | null;
  startedAt?: Date;
  completedIds?: string | string[];
};

function formatGoalRaceDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function resolveCompletedIds(completedIds?: string | string[]): string[] {
  if (!completedIds) return [];
  if (Array.isArray(completedIds)) return completedIds;
  return parseCompletedIdsFromDb(completedIds);
}

function buildScheduledPlan(plan: TrainingPlanRecord) {
  const meta = getPlanById(plan.planId);
  if (!meta) return null;

  const prefs = {
    restDay: plan.restDay,
    longRunDay: plan.longRunDay,
    runDaysPerWeek: (plan.runDaysPerWeek === 4 ? 4 : 3) as 3 | 4,
  };
  const personalization = buildPlanPersonalization(
    plan.age,
    plan.fitnessLevel,
    plan.goalRaceDate
  );

  return {
    meta,
    scheduled: applyScheduleToPlan(meta, prefs, personalization),
    prefs,
    personalization,
  };
}

export function buildTrainingPlanWeekPreview(
  plan: TrainingPlanRecord,
  weekNumber = plan.currentWeek
): TrainingPlanWeekPreview | null {
  const built = buildScheduledPlan(plan);
  if (!built) return null;

  const week = built.scheduled.scheduledWeeks[weekNumber - 1];
  if (!week) return null;

  return {
    weekNumber,
    weekTitle: week.title,
    focus: week.focus,
    days: week.days.map((day) => ({
      dayName: day.dayName,
      kind: day.kind,
      label:
        day.kind === "run"
          ? (day.run?.name ?? "Run")
          : day.kind === "cross-train"
            ? (day.crossTraining?.name ?? "Cross-train")
            : "Rest",
    })),
  };
}

function buildTrainingPlanProgress(
  plan: TrainingPlanRecord,
  completedIds: string[]
) {
  const built = buildScheduledPlan(plan);
  if (!built) {
    return { completedCount: 0, totalWorkouts: 0, percentComplete: 0 };
  }

  const planDayIds = new Set(
    built.scheduled.scheduledWeeks.flatMap((week) => week.days.map((day) => day.id))
  );
  const totalWorkouts = getTotalWorkouts(built.scheduled.scheduledWeeks);
  const completedCount = completedIds.filter((id) => planDayIds.has(id)).length;
  const percentComplete = totalWorkouts
    ? Math.round((completedCount / totalWorkouts) * 100)
    : 0;

  return { completedCount, totalWorkouts, percentComplete };
}

export function buildTrainingPlanDisplay(
  plan: TrainingPlanRecord,
  completedIdsInput?: string[] | string
): TrainingPlanDisplay {
  const meta = getPlanById(plan.planId);
  const family = meta ? getFamilyById(meta.familyId) : undefined;
  const fitnessLevel = parseFitnessLevel(plan.fitnessLevel);
  const fitnessLabel =
    FITNESS_LEVEL_OPTIONS.find((option) => option.value === fitnessLevel)?.label ??
    fitnessLevel;
  const goalRaceDateIso = plan.goalRaceDate?.toISOString() ?? null;
  const completedIds = resolveCompletedIds(
    completedIdsInput ?? plan.completedIds
  );
  const progress = buildTrainingPlanProgress(plan, completedIds);

  return {
    planId: plan.planId,
    familyId: meta?.familyId ?? "",
    planName: meta?.name ?? plan.planId,
    planDuration: meta?.duration ?? "",
    familyName: family?.name ?? "",
    currentWeek: plan.currentWeek,
    totalWeeks: meta?.durationWeeks ?? meta?.weeks.length ?? 0,
    restDay: plan.restDay,
    longRunDay: plan.longRunDay,
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
    ...progress,
    weekPreview: buildTrainingPlanWeekPreview(plan),
    editPlanHref: `/plan?plan=${encodeURIComponent(plan.planId)}`,
  };
}

export function displayFromTrainingPlanState(
  state: TrainingPlanState
): TrainingPlanDisplay {
  return buildTrainingPlanDisplay(
    {
      planId: state.planId,
      currentWeek: state.currentWeek,
      restDay: state.restDay,
      longRunDay: state.longRunDay,
      runDaysPerWeek: state.runDaysPerWeek,
      age: state.age,
      fitnessLevel: state.fitnessLevel,
      goalRaceDate: state.goalRaceDate ? new Date(state.goalRaceDate) : null,
      startedAt: state.startedAt ? new Date(state.startedAt) : undefined,
    },
    state.completedIds
  );
}
