import type { TrainingPlan, WeekTemplate, Workout } from "@/lib/plan-types";
import { getPlansForFamily } from "@/lib/plans";
import type { SchedulePreferences } from "@/lib/schedule-builder";

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

export function weeksUntilDate(goalDateIso: string): number | null {
  const goal = new Date(goalDateIso);
  if (Number.isNaN(goal.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  goal.setHours(0, 0, 0, 0);

  const diffMs = goal.getTime() - today.getTime();
  if (diffMs < 0) return 0;
  return Math.max(1, Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000)));
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

  if (weeksUntil !== null) {
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
  if (weeksUntil !== null) {
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
  planRunsPerWeek: number
): SchedulePreferences {
  let runDaysPerWeek = prefs.runDaysPerWeek;

  if (
    profile.fitnessLevel === "beginner" ||
    profile.fitnessLevel === "returning"
  ) {
    runDaysPerWeek = 3;
  } else if (
    profile.fitnessLevel === "advanced" &&
    planRunsPerWeek >= 4
  ) {
    runDaysPerWeek = 4;
  }

  if (profile.age && profile.age >= 55) {
    runDaysPerWeek = 3;
  }

  return { ...prefs, runDaysPerWeek };
}

function volumeMultiplier(profile: PlanPersonalization, weekNum: number, totalWeeks: number): number {
  let mult = 1;

  switch (profile.fitnessLevel) {
    case "beginner":
      mult = 0.88;
      break;
    case "returning":
      mult = 0.94;
      break;
    case "intermediate":
      mult = 1;
      break;
    case "advanced":
      mult = 1.05;
      break;
  }

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
    if (weekNum === totalWeeks) {
      mult = 1;
    }
  }

  return Math.min(1.12, Math.max(0.75, mult));
}

function scaleDuration(duration: string, multiplier: number): string {
  if (multiplier === 1) return duration;
  return duration.replace(
    /~?(\d+)\s*[–-]\s*(\d+)\s*min/g,
    (_, low, high) => {
      const a = Math.max(10, Math.round(Number(low) * multiplier));
      const b = Math.max(a + 2, Math.round(Number(high) * multiplier));
      return `~${a}–${b} min`;
    }
  ).replace(/~?(\d+)\s*min/g, (_, mins) => {
    const scaled = Math.max(10, Math.round(Number(mins) * multiplier));
    return `~${scaled} min`;
  });
}

function scaleMiles(text: string, multiplier: number): string {
  if (multiplier === 1) return text;
  return text.replace(/(\d+(?:\.\d+)?)\s*mi\b/g, (_, num) => {
    const scaled = Math.round(parseFloat(num) * multiplier * 10) / 10;
    return `${scaled} mi`;
  });
}

function adjustWorkout(
  workout: Workout,
  multiplier: number,
  profile: PlanPersonalization
): Workout {
  if (multiplier === 1 && !profile.age) return workout;
  if (workout.runType === "race") return workout;

  const duration = scaleDuration(workout.duration, multiplier);
  const intervals = scaleMiles(workout.intervals, multiplier);

  let description = workout.description;
  if (multiplier < 0.95 && profile.fitnessLevel !== "advanced") {
    description = `${description} Ease off if breathing feels strained.`;
  } else if (multiplier > 1 && profile.fitnessLevel === "advanced") {
    description = `${description} Optional: add 5 easy minutes if you feel strong.`;
  }

  return { ...workout, duration, intervals, description };
}

function adjustWeek(
  week: WeekTemplate,
  profile: PlanPersonalization,
  totalWeeks: number
): WeekTemplate {
  const mult = volumeMultiplier(profile, week.week, totalWeeks);
  if (mult === 1 && !profile.age && !profile.goalRaceDate) return week;

  return {
    ...week,
    runs: week.runs.map((run) => adjustWorkout(run, mult, profile)),
  };
}

export function personalizePlanWorkouts(
  plan: TrainingPlan,
  profile: PlanPersonalization
): TrainingPlan {
  if (
    !profile.age &&
    profile.fitnessLevel === "beginner" &&
    !profile.goalRaceDate
  ) {
    return plan;
  }

  return {
    ...plan,
    weeks: plan.weeks.map((week) =>
      adjustWeek(week, profile, plan.durationWeeks)
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
  const raceLabel = new Date(profile.goalRaceDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
