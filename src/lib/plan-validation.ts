import { applyScheduleToPlan, DEFAULT_SCHEDULE } from "@/lib/schedule-builder";
import { getPlanById } from "@/lib/plans";
import {
  parseFitnessLevel,
  type PlanPersonalization,
} from "@/lib/plan-personalization";

const MAX_COMPLETED_IDS = 300;
const MAX_WORKOUT_ID_LENGTH = 80;
const WORKOUT_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/i;

export function getScheduledWorkoutIds(
  planId: string,
  prefs: {
    restDay: number;
    longRunDay: number;
    runDaysPerWeek: 3 | 4;
  },
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
  validIds: Set<string>
): string[] | null {
  if (!Array.isArray(ids)) return null;
  if (ids.length > MAX_COMPLETED_IDS) return null;

  const seen = new Set<string>();
  const result: string[] = [];

  for (const id of ids) {
    if (typeof id !== "string" || id.length > MAX_WORKOUT_ID_LENGTH) return null;
    if (!WORKOUT_ID_PATTERN.test(id)) return null;
    if (!validIds.has(id)) return null;
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(id);
  }

  return result;
}

export function isValidWorkoutId(
  workoutId: string,
  validIds: Set<string>
): boolean {
  if (workoutId.length > MAX_WORKOUT_ID_LENGTH) return false;
  if (!WORKOUT_ID_PATTERN.test(workoutId)) return false;
  return validIds.has(workoutId);
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
