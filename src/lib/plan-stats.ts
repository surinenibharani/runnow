import type { TrainingPlan, WeekTemplate, Workout } from "@/lib/plan-types";
import { applyScheduleToPlan, DEFAULT_SCHEDULE } from "@/lib/schedule-builder";

export type PlanStats = {
  durationWeeks: number;
  totalRuns: number;
  peakWeeklyMileage: number | null;
  peakWeeklyMileageLabel: string;
  crossTrainDaysPerWeek: number;
};

/** Parse distance in miles from workout interval text. */
export function parseMilesFromText(text: string): number | null {
  const normalized = text.toLowerCase();

  if (/\b26\.2\b/.test(normalized) || /\bfull marathon\b/.test(normalized)) {
    return 26.2;
  }
  if (/\b13\.1\b/.test(normalized) || /\bhalf marathon\b/.test(normalized)) {
    return 13.1;
  }
  if (/\b5k\b/.test(normalized)) {
    return 3.1;
  }

  const miles: number[] = [];
  const miRegex = /(\d+(?:\.\d+)?)\s*mi\b/g;
  let match: RegExpExecArray | null;
  while ((match = miRegex.exec(normalized)) !== null) {
    miles.push(parseFloat(match[1]));
  }

  if (miles.length === 0) return null;
  return miles.reduce((sum, n) => sum + n, 0);
}

function estimateMilesFromDuration(workout: Workout): number {
  const durationMatch = workout.duration.match(/(\d+(?:\.\d+)?)/);
  if (!durationMatch) return 0;

  const minutes = parseFloat(durationMatch[1]);
  if (workout.runType === "walk-run") {
    return Math.round((minutes / 14) * 10) / 10;
  }
  if (workout.runType === "race" && /5k/i.test(workout.intervals)) {
    return 3.1;
  }
  return Math.round((minutes / 11) * 10) / 10;
}

export function computeWeeklyMileage(week: WeekTemplate): number {
  let total = 0;

  for (const run of week.runs) {
    const parsed = parseMilesFromText(run.intervals);
    total += parsed ?? estimateMilesFromDuration(run);
  }

  return Math.round(total * 10) / 10;
}

export function computePlanStats(plan: TrainingPlan): PlanStats {
  const totalRuns = plan.weeks.reduce((sum, week) => sum + week.runs.length, 0);

  let peakWeeklyMileage = 0;
  for (const week of plan.weeks) {
    peakWeeklyMileage = Math.max(peakWeeklyMileage, computeWeeklyMileage(week));
  }

  const crossTrainDaysPerWeek =
    6 - DEFAULT_SCHEDULE.runDaysPerWeek;

  const peakWeeklyMileageLabel =
    peakWeeklyMileage > 0
      ? `~${peakWeeklyMileage} mi`
      : "Time-based";

  return {
    durationWeeks: plan.durationWeeks,
    totalRuns,
    peakWeeklyMileage: peakWeeklyMileage > 0 ? peakWeeklyMileage : null,
    peakWeeklyMileageLabel,
    crossTrainDaysPerWeek,
  };
}

export type SampleWeekDay = {
  dayName: string;
  kind: "run" | "cross-train" | "rest";
  label: string;
  detail: string;
};

export type SampleWeekPreview = {
  week: number;
  title: string;
  focus: string;
  days: SampleWeekDay[];
};

export function getSampleWeekPreview(
  plan: TrainingPlan,
  weekNumber = 1
): SampleWeekPreview {
  const scheduled = applyScheduleToPlan(plan, DEFAULT_SCHEDULE);
  const week =
    scheduled.scheduledWeeks.find((w) => w.week === weekNumber) ??
    scheduled.scheduledWeeks[0];

  return {
    week: week.week,
    title: week.title,
    focus: week.focus,
    days: week.days.map((day) => {
      if (day.kind === "rest") {
        return {
          dayName: day.dayName,
          kind: "rest" as const,
          label: "Rest",
          detail: "Complete rest day",
        };
      }
      if (day.kind === "run" && day.run) {
        return {
          dayName: day.dayName,
          kind: "run" as const,
          label: day.run.name,
          detail: day.run.intervals,
        };
      }
      if (day.kind === "cross-train" && day.crossTraining) {
        return {
          dayName: day.dayName,
          kind: "cross-train" as const,
          label: day.crossTraining.name,
          detail: day.crossTraining.focus,
        };
      }
      return {
        dayName: day.dayName,
        kind: "rest" as const,
        label: "Rest",
        detail: "",
      };
    }),
  };
}

export function getPeakWeekNumber(plan: TrainingPlan): number {
  let peak = 1;
  let peakMiles = 0;

  for (const week of plan.weeks) {
    const miles = computeWeeklyMileage(week);
    if (miles >= peakMiles) {
      peakMiles = miles;
      peak = week.week;
    }
  }

  return peak;
}
