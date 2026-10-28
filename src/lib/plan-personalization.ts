import { getPlanFilters, isGentlePlan } from "@/lib/plan-catalog";
import type { RunType, TrainingPlan, WeekTemplate, Workout } from "@/lib/plan-types";
import { getPlansForFamily } from "@/lib/plans";
import type { SchedulePreferences } from "@/lib/schedule-builder";
import {
  estimateMinutes,
  formatDistanceLabel,
  formatDurationMinutes,
  formatMilesNumber,
  parseMileRange,
  raceMilesFromText,
  workoutBaseMiles,
} from "@/lib/workout-load";

export type FitnessLevel =
  | "beginner"
  | "returning"
  | "intermediate"
  | "advanced";

export interface PlanPersonalization {
  age: number | null;
  fitnessLevel: FitnessLevel;
  goalRaceDate: string | null;
}

export const FITNESS_LEVEL_OPTIONS: {
  value: FitnessLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to running or returning after a long break",
  },
  {
    value: "returning",
    label: "Returning",
    description: "Ran before but not consistently in the last 6 months",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Runs 2–3 times per week already",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Comfortable with tempo runs and higher weekly volume",
  },
];

export const DEFAULT_PERSONALIZATION: PlanPersonalization = {
  age: null,
  fitnessLevel: "beginner",
  goalRaceDate: null,
};

export function parseFitnessLevel(value: unknown): FitnessLevel {
  if (
    typeof value === "string" &&
    FITNESS_LEVEL_OPTIONS.some((o) => o.value === value)
  ) {
    return value as FitnessLevel;
  }
  return "beginner";
}

export function parseAge(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : parseInt(String(value), 10);
  if (!Number.isFinite(n) || n < 13 || n > 100) return null;
  return n;
}

export function parseLocalDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function weeksUntilDate(
  goalDateIso: string,
  now: Date = new Date()
): number | null {
  const days = daysUntilDate(goalDateIso, now);
  if (days === null) return null;
  if (days <= 0) return 0;
  return Math.max(1, Math.ceil(days / 7));
}

/** Whole days from today to the goal date. Negative if the date has passed. */
export function daysUntilDate(
  goalDateIso: string,
  now: Date = new Date()
): number | null {
  const goal = parseLocalDate(goalDateIso);
  if (!goal) return null;

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  goal.setHours(0, 0, 0, 0);

  return Math.round((goal.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
}

export type RaceCountdown = {
  days: number;
  headline: string;
  detail: string;
  status: "upcoming" | "week" | "today" | "past";
};

export function getRaceCountdown(
  goalDateIso: string,
  now: Date = new Date()
): RaceCountdown | null {
  const days = daysUntilDate(goalDateIso, now);
  const goal = parseLocalDate(goalDateIso);
  if (days === null || !goal) return null;

  const raceLabel = goal.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  if (days < 0) {
    return {
      days,
      headline: "Race date passed",
      detail: `${raceLabel} is behind you. Set a new date when you’re ready for the next start line.`,
      status: "past",
    };
  }

  if (days === 0) {
    return {
      days,
      headline: "Race day",
      detail: `${raceLabel} — easy effort, walk breaks allowed. Finish wanting to come back.`,
      status: "today",
    };
  }

  if (days <= 7) {
    return {
      days,
      headline: `Race week · ${days} day${days === 1 ? "" : "s"}`,
      detail: `${raceLabel}. Keep runs easy. No stacking missed miles.`,
      status: "week",
    };
  }

  return {
    days,
    headline: `${days} days to race`,
    detail: `${raceLabel}. Parkrun or a local 5K is a fine first finish line.`,
    status: "upcoming",
  };
}

export function recommendPlanVariantId(
  familyId: string,
  profile: PlanPersonalization
): { planId: string; note: string } | null {
  const variants = getPlansForFamily(familyId).sort(
    (a, b) => a.durationWeeks - b.durationWeeks
  );
  if (variants.length === 0) return null;

  const weeksUntil = profile.goalRaceDate
    ? weeksUntilDate(profile.goalRaceDate)
    : null;

  let fitting = variants;
  let tightTimeline = false;

  if (weeksUntil !== null && weeksUntil > 0) {
    const fits = variants.filter((v) => v.durationWeeks <= weeksUntil);
    if (fits.length > 0) {
      fitting = fits;
    } else {
      tightTimeline = true;
      fitting = [variants[0]];
    }
  }

  let pick: (typeof variants)[number];

  switch (profile.fitnessLevel) {
    case "advanced":
      pick = fitting[0];
      break;
    case "intermediate":
      pick = fitting[Math.floor(fitting.length / 2)] ?? fitting[0];
      break;
    case "returning":
    case "beginner":
    default:
      pick = fitting[fitting.length - 1];
      break;
  }

  const parts: string[] = [];
  if (weeksUntil !== null && weeksUntil > 0) {
    parts.push(
      tightTimeline
        ? `Only ${weeksUntil} week${weeksUntil === 1 ? "" : "s"} until your race — using the shortest ${pick.shortName} plan`
        : `${weeksUntil} weeks until race — ${pick.duration} fits your timeline`
    );
  }

  switch (profile.fitnessLevel) {
    case "beginner":
      parts.push("gradual build for new runners");
      break;
    case "returning":
      parts.push("extra buffer as you rebuild fitness");
      break;
    case "intermediate":
      parts.push("balanced progression");
      break;
    case "advanced":
      parts.push("shorter, more focused block");
      break;
  }

  if (profile.age && profile.age >= 55) {
    parts.push("volume tuned for recovery at your age");
  }

  return {
    planId: pick.id,
    note: parts.join(" · "),
  };
}

export function deriveSchedulePrefs(
  prefs: SchedulePreferences,
  profile: PlanPersonalization,
  _planRunsPerWeek: number
): SchedulePreferences {
  let runDaysPerWeek = prefs.runDaysPerWeek;

  // Honor the runner’s chosen run days. Only age 55+ still needs an extra
  // recovery day even if they asked for four runs.
  if (profile.age && profile.age >= 55) {
    runDaysPerWeek = 3;
  }

  return { ...prefs, runDaysPerWeek };
}

/**
 * 5K templates are NHS Couch to 5K (true beginner). Higher levels add
 * Higdon-style volume (~20–30% Novice → Intermediate) without a weekly spike.
 */
export const LEVEL_VOLUME: Record<FitnessLevel, number> = {
  beginner: 1,
  returning: 1.1,
  intermediate: 1.22,
  advanced: 1.32,
};

/**
 * 10K / half templates match Hal Higdon Novice — they assume you can already
 * jog ~30 minutes. Beginner scales down; Intermediate keeps the written miles.
 */
const NOVICE_DISTANCE_VOLUME: Record<FitnessLevel, number> = {
  beginner: 0.65,
  returning: 0.85,
  intermediate: 1,
  advanced: 1.18,
};

/** Marathon templates assume a half-marathon base. */
const MARATHON_VOLUME: Record<FitnessLevel, number> = {
  beginner: 0.5,
  returning: 0.78,
  intermediate: 1,
  advanced: 1.15,
};

/** Walk-first 16-week 5K — keep the walking ramp, nudge volume only a little. */
const GENTLE_VOLUME: Record<FitnessLevel, number> = {
  beginner: 1,
  returning: 1.04,
  intermediate: 1.08,
  advanced: 1.12,
};

export function volumeForLevel(
  familyId: string,
  level: FitnessLevel,
  planId?: string
): number {
  if (planId && isGentlePlan(planId)) return GENTLE_VOLUME[level];
  if (
    planId &&
    familyId === "5k" &&
    getPlanFilters(planId).includes("already-running")
  ) {
    return NOVICE_DISTANCE_VOLUME[level];
  }
  if (familyId === "full-marathon") return MARATHON_VOLUME[level];
  if (familyId === "10k" || familyId === "half-marathon") {
    return NOVICE_DISTANCE_VOLUME[level];
  }
  return LEVEL_VOLUME[level];
}

export function isNoviceDistanceFamily(familyId: string): boolean {
  return (
    familyId === "10k" ||
    familyId === "half-marathon" ||
    familyId === "full-marathon"
  );
}

/**
 * Easy/conversational minutes per mile (Jack Daniels E-pace bands for
 * recreational VDOT ~30–52). Walk-run overall pace matches NHS Couch to 5K
 * session length (~20–30 min covering ~1.5–2 mi for true beginners).
 */
const EASY_MIN_PER_MILE: Record<FitnessLevel, number> = {
  beginner: 13,
  returning: 11.5,
  intermediate: 10.2,
  advanced: 8.8,
};

const WALK_RUN_MIN_PER_MILE: Record<FitnessLevel, number> = {
  beginner: 14,
  returning: 13,
  intermediate: 12,
  advanced: 11,
};

/** Race-day finish estimate — a bit quicker than easy, still not elite. */
const RACE_MIN_PER_MILE: Record<FitnessLevel, number> = {
  beginner: 11.5,
  returning: 10.2,
  intermediate: 9,
  advanced: 7.8,
};

export function easyPaceMinPerMile(
  level: FitnessLevel,
  runType: RunType
): number {
  if (runType === "walking") return 18;
  if (runType === "walk-run") return WALK_RUN_MIN_PER_MILE[level];
  if (runType === "race") return RACE_MIN_PER_MILE[level];
  if (runType === "recovery") return EASY_MIN_PER_MILE[level] + 0.6;
  return EASY_MIN_PER_MILE[level];
}

export function volumeMultiplier(
  profile: PlanPersonalization,
  weekNum: number,
  totalWeeks: number,
  familyId = "5k",
  planId?: string
): number {
  let mult = volumeForLevel(familyId, profile.fitnessLevel, planId);

  if (profile.age) {
    if (profile.age >= 65) mult *= 0.85;
    else if (profile.age >= 55) mult *= 0.9;
    else if (profile.age <= 25 && profile.fitnessLevel === "advanced") {
      mult *= 1.02;
    }
  }

  if (profile.goalRaceDate) {
    const weeksUntil = weeksUntilDate(profile.goalRaceDate);
    const weeksLeftInPlan = totalWeeks - weekNum + 1;
    if (weeksUntil !== null && weeksUntil === weeksLeftInPlan - 1) {
      mult *= 0.85;
    }
  }

  return Math.min(1.4, Math.max(0.45, mult));
}

/** Couch-to-5K-style recipe the in-app timer can parse. */
export function beginnerWalkRunRecipe(
  minutes: number,
  kind: "easy" | "long"
): string {
  if (kind === "long") {
    const warmup = 5;
    const reps = Math.max(3, Math.round((minutes - warmup * 2) / 4));
    return `Walk ${warmup} min → (Jog 2 min, Walk 2 min) × ${reps} → Walk ${warmup} min`;
  }
  const warmup = 4;
  const reps = Math.max(3, Math.round((minutes - warmup * 2) / 3));
  return `Walk ${warmup} min → (Jog 1 min, Walk 2 min) × ${reps} → Walk ${warmup} min`;
}

function isRestPlaceholder(workout: Workout): boolean {
  return (
    /^\s*rest\b/i.test(workout.duration) || /^\s*rest\b/i.test(workout.intervals)
  );
}

function beginnerWalkRunOnDistancePlan(
  familyId: string,
  profile: PlanPersonalization,
  workout: Workout,
  planId?: string
): boolean {
  if (profile.fitnessLevel !== "beginner") return false;
  if (workout.runType === "race" || isRestPlaceholder(workout)) return false;
  if (workout.runType === "walk-run" || workout.runType === "walking") {
    return false;
  }
  if (isNoviceDistanceFamily(familyId)) return true;
  return Boolean(
    planId && getPlanFilters(planId).includes("already-running")
  );
}

function roundSessionMinutes(minutes: number): number {
  const rounded =
    minutes >= 50
      ? Math.round(minutes / 5) * 5
      : Math.round(minutes / 2) * 2;
  return Math.min(180, Math.max(10, rounded));
}

function roundMiles(miles: number): number {
  return Math.round(Math.max(0.5, miles) * 10) / 10;
}

function roundClockMinutes(value: number): number {
  if (value < 2) return Math.max(1, Math.round(value * 2) / 2);
  return Math.max(1, Math.round(value));
}

function scaleIntervalRecipe(
  text: string,
  mileRatio: number,
  timeRatio: number
): string {
  let next = text;
  if (Math.abs(mileRatio - 1) > 0.02) {
    next = next.replace(
      /(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*mi\b/g,
      (_, low, high) => {
        const a = roundMiles(parseFloat(low) * mileRatio);
        const b = Math.max(a + 0.5, roundMiles(parseFloat(high) * mileRatio));
        return `${formatMilesNumber(a)}–${formatMilesNumber(b)} mi`;
      }
    );
    next = next.replace(/(\d+(?:\.\d+)?)\s*mi\b/g, (_, num) => {
      return `${formatMilesNumber(roundMiles(parseFloat(num) * mileRatio))} mi`;
    });
  }
  if (Math.abs(timeRatio - 1) > 0.02) {
    next = next.replace(/(\d+(?:\.\d+)?)\s*min\b/g, (_, num) => {
      return `${roundClockMinutes(parseFloat(num) * timeRatio)} min`;
    });
    next = next.replace(/(\d+)\s*sec\b/g, (_, num) => {
      const scaled = Math.max(15, Math.round(parseFloat(num) * timeRatio));
      return `${scaled} sec`;
    });
  }
  return next;
}

function adjustWorkout(
  workout: Workout,
  multiplier: number,
  profile: PlanPersonalization,
  familyId: string,
  planId: string
): Workout {
  if (isRestPlaceholder(workout)) return workout;

  const baseMiles = workoutBaseMiles(workout);
  const baseMinutes = estimateMinutes(workout.duration) || baseMiles * 11;
  const isRace = workout.runType === "race";
  const raceMiles =
    raceMilesFromText(`${workout.intervals} ${workout.name}`) ??
    (isRace ? baseMiles : null);

  const walkRun = beginnerWalkRunOnDistancePlan(
    familyId,
    profile,
    workout,
    planId
  );

  if (
    !walkRun &&
    profile.fitnessLevel === "beginner" &&
    Math.abs(multiplier - 1) < 0.02
  ) {
    return {
      ...workout,
      distance: formatDistanceLabel(isRace && raceMiles ? raceMiles : baseMiles),
    };
  }

  const targetMinutes = roundSessionMinutes(
    isRace
      ? (raceMiles ?? baseMiles) *
          easyPaceMinPerMile(profile.fitnessLevel, workout.runType)
      : baseMinutes * multiplier
  );
  const targetMiles = roundMiles(
    isRace && raceMiles
      ? raceMiles
      : walkRun
        ? targetMinutes / easyPaceMinPerMile("beginner", "walk-run")
        : baseMiles * multiplier
  );

  if (walkRun) {
    const duration = formatDurationMinutes(targetMinutes);
    const distance = formatDistanceLabel(targetMiles);
    const intervals = beginnerWalkRunRecipe(
      targetMinutes,
      workout.runType === "long" ? "long" : "easy"
    );
    const qualityNote =
      workout.runType === "tempo" || workout.runType === "interval"
        ? " Skip the speed work until easy days feel relaxed."
        : "";
    return {
      ...workout,
      runType: "walk-run",
      duration,
      intervals,
      distance,
      description: `${workout.description} Walk breaks are the workout — this plan usually assumes a 30-minute jog.${qualityNote}`,
    };
  }

  const mileRatio =
    !isRace && baseMiles > 0 ? targetMiles / baseMiles : 1;
  const timeRatio = baseMinutes > 0 ? targetMinutes / baseMinutes : 1;
  const duration = formatDurationMinutes(targetMinutes, isRace);
  const range = parseMileRange(workout.intervals);
  const distance = range
    ? `~${formatMilesNumber(roundMiles(range.low * mileRatio))}–${formatMilesNumber(roundMiles(range.high * mileRatio))} mi`
    : formatDistanceLabel(targetMiles);
  const intervals = scaleIntervalRecipe(workout.intervals, mileRatio, timeRatio);

  let description = workout.description;
  if (multiplier < 0.95 && profile.fitnessLevel !== "advanced") {
    description = `${description} Ease off if breathing feels strained.`;
  } else if (multiplier > 1.05 && profile.fitnessLevel === "advanced") {
    description = `${description} Optional: add 5 easy minutes if you feel strong.`;
  }

  return { ...workout, duration, intervals, distance, description };
}

function adjustWeek(
  week: WeekTemplate,
  profile: PlanPersonalization,
  totalWeeks: number,
  familyId: string,
  planId: string
): WeekTemplate {
  const mult = volumeMultiplier(
    profile,
    week.week,
    totalWeeks,
    familyId,
    planId
  );
  return {
    ...week,
    runs: week.runs.map((run) =>
      adjustWorkout(run, mult, profile, familyId, planId)
    ),
  };
}

export function personalizePlanWorkouts(
  plan: TrainingPlan,
  profile: PlanPersonalization
): TrainingPlan {
  return {
    ...plan,
    weeks: plan.weeks.map((week) =>
      adjustWeek(week, profile, plan.durationWeeks, plan.familyId, plan.id)
    ),
  };
}

export function getPlanTimelineHint(
  profile: PlanPersonalization,
  plan: TrainingPlan,
  currentWeek: number
): string | null {
  if (!profile.goalRaceDate) return null;

  const weeksUntil = weeksUntilDate(profile.goalRaceDate);
  if (weeksUntil === null) return null;

  const weeksLeftInPlan = plan.durationWeeks - currentWeek + 1;
  const raceDate = parseLocalDate(profile.goalRaceDate);
  const raceLabel = (raceDate ?? new Date(profile.goalRaceDate)).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  if (weeksUntil === 0) {
    return `Race week — your goal date is ${raceLabel}.`;
  }

  if (weeksUntil < weeksLeftInPlan) {
    return `${weeksUntil} week${weeksUntil === 1 ? "" : "s"} to ${raceLabel} — you're a bit behind the plan calendar; focus on consistency over catching up.`;
  }

  if (weeksUntil === weeksLeftInPlan) {
    return `On track for ${raceLabel} — ${weeksUntil} week${weeksUntil === 1 ? "" : "s"} left in your plan.`;
  }

  return `${weeksUntil} weeks until ${raceLabel} — ${weeksLeftInPlan} plan week${weeksLeftInPlan === 1 ? "" : "s"} remaining. Extra easy days are fine.`;
}
