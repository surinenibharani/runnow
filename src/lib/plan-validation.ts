import { applyScheduleToPlan, DEFAULT_SCHEDULE } from "@/lib/schedule-builder";
import { getPlanById } from "@/lib/plans";
import type { ScheduledWeek } from "@/lib/plan-types";
import {
  parseFitnessLevel,
  type PlanPersonalization,
} from "@/lib/plan-personalization";

const MAX_COMPLETED_IDS = 300;
const MAX_WORKOUT_ID_LENGTH = 80;
const WORKOUT_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/i;

export type SchedulePrefs = {
  restDay: number;
  longRunDay: number;
  runDaysPerWeek: 3 | 4;
};

export function getScheduledWorkoutIds(
  planId: string,
  prefs: SchedulePrefs,
  personalization?: PlanPersonalization | null
): Set<string> {
  const plan = getPlanById(planId);
  if (!plan) return new Set();

  const scheduled = applyScheduleToPlan(plan, prefs, personalization);
  const ids = new Set<string>();

  for (const week of scheduled.scheduledWeeks) {
    for (const day of week.days) {
      if (day.kind === "run" || day.kind === "cross-train") {
        ids.add(day.id);
      }
    }
  }

  return ids;
}

export function resolveWorkoutDayId(
  workoutId: string,
  planId: string,
  prefs: SchedulePrefs,
  personalization?: PlanPersonalization | null
): string | null {
  if (workoutId.length > MAX_WORKOUT_ID_LENGTH) return null;
  if (!WORKOUT_ID_PATTERN.test(workoutId)) return null;

  const validIds = getScheduledWorkoutIds(planId, prefs, personalization);
  if (validIds.has(workoutId)) return workoutId;

  const plan = getPlanById(planId);
  if (!plan) return null;

  const scheduled = applyScheduleToPlan(plan, prefs, personalization);

  const runDayMatch = workoutId.match(/^(.+)-d([1-7])$/);
  if (runDayMatch) {
    const baseRunId = runDayMatch[1];
    for (const week of scheduled.scheduledWeeks) {
      for (const day of week.days) {
        if (day.kind === "run" && day.run?.id === baseRunId) {
          return day.id;
        }
      }
    }
  }

  const crossTrainMatch = workoutId.match(/^(.+)-w(\d+)d(\d+)-ct$/);
  if (crossTrainMatch && crossTrainMatch[1] === planId) {
    const weekNum = Number(crossTrainMatch[2]);
    const oldDayOfWeek = Number(crossTrainMatch[3]);
    const week = scheduled.scheduledWeeks.find((w) => w.week === weekNum);
    if (week) {
      const crossTrainDays = week.days
        .filter((day) => day.kind === "cross-train")
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek);
      if (crossTrainDays.length === 1) {
        return crossTrainDays[0].id;
      }
      const mapped = mapCrossTrainByWeekSlot(week, oldDayOfWeek);
      if (mapped) return mapped;
    }
  }

  return null;
}

function mapCrossTrainByWeekSlot(
  week: ScheduledWeek,
  oldDayOfWeek: number
): string | null {
  const crossTrainDays = week.days
    .filter((day) => day.kind === "cross-train")
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  if (!crossTrainDays.length) return null;

  const activeDays = week.days
    .filter((day) => day.kind !== "rest")
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  const slotIndex = activeDays.findIndex((day) => day.dayOfWeek === oldDayOfWeek);
  if (slotIndex >= 0 && crossTrainDays[slotIndex]) {
    return crossTrainDays[slotIndex].id;
  }

  return crossTrainDays[0]?.id ?? null;
}

export function remapCompletedIds(
  ids: string[],
  planId: string,
  prefs: SchedulePrefs,
  personalization?: PlanPersonalization | null
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const id of ids) {
    const resolved = resolveWorkoutDayId(id, planId, prefs, personalization);
    if (resolved && !seen.has(resolved)) {
      seen.add(resolved);
      result.push(resolved);
    }
  }

  return result;
}

export function buildPlanPersonalization(
  age: number | null | undefined,
  fitnessLevel: string | null | undefined,
  goalRaceDate: Date | string | null | undefined
): PlanPersonalization | null {
  if (age == null && !fitnessLevel && !goalRaceDate) return null;

  return {
    age: age ?? null,
    fitnessLevel: parseFitnessLevel(fitnessLevel),
    goalRaceDate:
      goalRaceDate == null
        ? null
        : goalRaceDate instanceof Date
          ? goalRaceDate.toISOString()
          : goalRaceDate,
  };
}

export function sanitizeCompletedIds(
  ids: unknown,
  planId: string,
  prefs: SchedulePrefs,
  personalization?: PlanPersonalization | null
): string[] | null {
  if (!Array.isArray(ids)) return null;
  if (ids.length > MAX_COMPLETED_IDS) return null;

  const validStrings = ids.filter((id): id is string => typeof id === "string");
  const remapped = remapCompletedIds(validStrings, planId, prefs, personalization);
  const validIds = getScheduledWorkoutIds(planId, prefs, personalization);

  if (validStrings.length > 0 && remapped.length === 0) return null;
  if (!remapped.every((id) => validIds.has(id))) return null;

  return remapped;
}

export function isValidWorkoutId(
  workoutId: string,
  planId: string,
  prefs: SchedulePrefs,
  personalization?: PlanPersonalization | null
): boolean {
  return resolveWorkoutDayId(workoutId, planId, prefs, personalization) !== null;
}

export function resolveSchedulePrefs(
  plan: {
    restDay: number;
    longRunDay: number;
    runDaysPerWeek: number;
  },
  overrides: {
    restDay?: number;
    longRunDay?: number;
    runDaysPerWeek?: number;
  }
) {
  return {
    restDay: overrides.restDay ?? plan.restDay,
    longRunDay: overrides.longRunDay ?? plan.longRunDay,
    runDaysPerWeek: (overrides.runDaysPerWeek === 4 ? 4 : 3) as 3 | 4,
  };
}

export { DEFAULT_SCHEDULE };
