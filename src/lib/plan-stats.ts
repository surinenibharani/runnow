import {
  isStrengthSession,
  type TrainingPlan,
  type WeekTemplate,
  type Workout,
} from "@/lib/plan-types";
import { applyScheduleToPlan, DEFAULT_SCHEDULE } from "@/lib/schedule-builder";

export type PlanStats = {
  durationWeeks: number;
  totalRuns: number;
  peakWeeklyMileage: number | null;
  peakWeeklyMileageLabel: string;
  crossTrainDaysPerWeek: number;
};

function formatMilesNumber(miles: number): string {
  const rounded = Math.round(miles * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function raceMilesFromText(text: string): number | null {
  const normalized = text.toLowerCase();
  if (/\b26\.2\b/.test(normalized) || /\bfull marathon\b/.test(normalized)) {
    return 26.2;
  }
  if (/\b13\.1\b/.test(normalized) || /\bhalf marathon\b/.test(normalized)) {
    return 13.1;
  }
  if (/\b10k\b/.test(normalized) || /\b6\.2\b/.test(normalized)) {
    return 6.2;
  }
  if (/\b5k\b/.test(normalized)) {
    return 3.1;
  }
  return null;
}

function parseMileRange(text: string): { low: number; high: number } | null {
  const match = text
    .toLowerCase()
    .match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*mi\b/);
  if (!match) return null;
  const low = parseFloat(match[1]);
  const high = parseFloat(match[2]);
  if (!Number.isFinite(low) || !Number.isFinite(high) || high < low) return null;
  return { low, high };
}

/** Parse distance in miles from workout interval text. */
export function parseMilesFromText(text: string): number | null {
  const race = raceMilesFromText(text);
  if (race != null) return race;

  const range = parseMileRange(text);
  const miles: number[] = range ? [(range.low + range.high) / 2] : [];
  const remainder = range
    ? text.toLowerCase().replace(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*mi\b/g, " ")
    : text.toLowerCase();

  const miRegex = /(\d+(?:\.\d+)?)\s*mi\b/g;
  let match: RegExpExecArray | null;
  while ((match = miRegex.exec(remainder)) !== null) {
    miles.push(parseFloat(match[1]));
  }

  if (miles.length === 0) return null;
  return Math.round(miles.reduce((sum, n) => sum + n, 0) * 10) / 10;
}

function estimateMinutes(duration: string): number {
  const nums = [...duration.matchAll(/(\d+(?:\.\d+)?)/g)].map((m) =>
    parseFloat(m[1])
  );
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  return (nums[0] + nums[1]) / 2;
}

function estimateMilesFromDuration(workout: Workout): number {
  const minutes = estimateMinutes(workout.duration);
  if (!minutes) return 0;

  const race = raceMilesFromText(`${workout.intervals} ${workout.name}`);
  if (race != null) return race;

  if (workout.runType === "walking") {
    return Math.round((minutes / 18) * 10) / 10;
  }
  if (workout.runType === "walk-run") {
    return Math.round((minutes / 14) * 10) / 10;
  }
  return Math.round((minutes / 11) * 10) / 10;
}

/** How far this run should cover — prescribed miles, or an easy-pace estimate. */
export function formatWorkoutDistance(workout: Workout): string | null {
  const range = parseMileRange(workout.intervals);
  if (range) {
    return `~${formatMilesNumber(range.low)}–${formatMilesNumber(range.high)} mi`;
  }

  const estimated = estimateMilesFromDuration(workout);
  const parsed = parseMilesFromText(`${workout.intervals} ${workout.name}`);

  if (parsed != null && (estimated === 0 || parsed >= estimated * 0.65)) {
    return `~${formatMilesNumber(parsed)} mi`;
  }
  if (estimated > 0) {
    return `~${formatMilesNumber(estimated)} mi`;
  }
  if (parsed != null) {
    return `~${formatMilesNumber(parsed)} mi`;
  }
  return null;
}

/** Time plus distance, e.g. "~25 min · ~1.8 mi". */
export function formatWorkoutTimeAndDistance(workout: Workout): string {
  const distance = formatWorkoutDistance(workout);
  if (!distance) return workout.duration;
  if (/\bmi\b|\bkm\b|\b5k\b|\b10k\b/i.test(workout.duration)) {
    return workout.duration;
  }
  return `${workout.duration} · ${distance}`;
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
  load?: string;
  isStrength?: boolean;
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
          load: formatWorkoutTimeAndDistance(day.run),
        };
      }
      if (day.kind === "cross-train" && day.crossTraining) {
        return {
          dayName: day.dayName,
          kind: "cross-train" as const,
          label: day.crossTraining.name,
          detail: day.crossTraining.focus,
          isStrength: isStrengthSession(day),
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
