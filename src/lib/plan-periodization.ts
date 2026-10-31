import type { TrainingPlan, WeekTemplate, Workout } from "@/lib/plan-types";
import {
  estimateMinutes,
  formatDistanceLabel,
  formatDurationMinutes,
  formatMilesNumber,
  parseMileRange,
  workoutBaseMiles,
} from "@/lib/workout-load";

export type PeriodizationLevel =
  | "beginner"
  | "returning"
  | "intermediate"
  | "advanced";

/**
 * Taper length from recreational standards:
 * 5K/10K — race week (~30% cut; NHS / Higdon Novice)
 * Half — 1–2 weeks
 * Marathon — 2–3 weeks, volume −41–60% (Wang et al. 2023, PLOS ONE)
 */
export function taperWeekCount(familyId: string, totalWeeks: number): number {
  if (familyId === "full-marathon") {
    return totalWeeks >= 12 ? 3 : 2;
  }
  if (familyId === "half-marathon") {
    return totalWeeks >= 10 ? 2 : 1;
  }
  return 1;
}

export function peakWeekNumber(familyId: string, totalWeeks: number): number {
  return Math.max(1, totalWeeks - taperWeekCount(familyId, totalWeeks));
}

export function isCutbackWeek(
  familyId: string,
  weekNum: number,
  totalWeeks: number
): boolean {
  if (familyId === "5k" || totalWeeks < 12) return false;
  const peak = peakWeekNumber(familyId, totalWeeks);
  return weekNum > 1 && weekNum < peak - 1 && weekNum % 4 === 0;
}

/**
 * Skill-level peak stays in volumeForLevel. This shapes the weeks:
 * start easy → rise toward peak (with a 3–4 week cutback) → taper.
 */
export function weekVolumeFactor(options: {
  weekNum: number;
  totalWeeks: number;
  familyId: string;
  startFactor: number;
  peakFactor: number;
}): number {
  const { weekNum, totalWeeks, familyId, startFactor, peakFactor } = options;
  const peakWeek = peakWeekNumber(familyId, totalWeeks);

  if (weekNum > peakWeek) {
    // 5K templates historically added volume into race week — cut it here.
    // Distance plans already write a taper; keep the peak skill factor so
    // beginners stay easier than advanced without a second taper.
    if (familyId === "5k") {
      return peakFactor * 0.7;
    }
    return peakFactor;
  }

  const t = (weekNum - 1) / Math.max(1, peakWeek - 1);
  let factor = startFactor + (peakFactor - startFactor) * t;
  if (isCutbackWeek(familyId, weekNum, totalWeeks)) {
    factor *= 0.82;
  }
  return factor;
}

export function startFactorFromPeak(
  familyId: string,
  peakFactor: number,
  level: PeriodizationLevel = "beginner"
): number {
  if (familyId === "5k") return peakFactor;
  if (level === "advanced" || level === "intermediate") return peakFactor;
  if (level === "returning") return peakFactor * 0.88;
  if (familyId === "full-marathon") return peakFactor * 0.68;
  return peakFactor * 0.74;
}

export function trainingMiles(week: WeekTemplate): number {
  let total = 0;
  for (const run of week.runs) {
    if (run.runType === "race") continue;
    if (/^\s*rest\b/i.test(run.duration)) continue;
    total += workoutBaseMiles(run);
  }
  return Math.round(total * 10) / 10;
}

export function longRunMiles(week: WeekTemplate): number {
  const hasRace = week.runs.some((run) => run.runType === "race");
  const training = week.runs.filter(
    (run) =>
      run.runType !== "race" && !/^\s*rest\b/i.test(run.duration)
  );
  const longs = training.filter((run) => run.runType === "long");
  if (longs.length > 0) {
    return Math.max(...longs.map((run) => workoutBaseMiles(run)));
  }
  if (hasRace || training.length === 0) return 0;
  return Math.max(...training.map((run) => workoutBaseMiles(run)));
}

function minPeakLongMiles(familyId: string, level: PeriodizationLevel): number {
  if (level === "intermediate" || level === "advanced") return 0;
  if (familyId === "half-marathon") {
    return 10;
  }
  if (familyId === "full-marathon") {
    return level === "beginner" ? 16 : 18;
  }
  return 0;
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

function scaleWorkout(workout: Workout, factor: number): Workout {
  if (
    workout.runType === "race" ||
    /^\s*rest\b/i.test(workout.duration) ||
    Math.abs(factor - 1) < 0.02
  ) {
    return workout;
  }

  const baseMiles = workoutBaseMiles(workout);
  const baseMinutes = estimateMinutes(workout.duration) || baseMiles * 11;
  const targetMiles = roundMiles(baseMiles * factor);
  const targetMinutes = Math.min(
    300,
    Math.max(10, Math.round((baseMinutes * factor) / 2) * 2)
  );
  const mileRatio = baseMiles > 0 ? targetMiles / baseMiles : factor;
  const timeRatio = baseMinutes > 0 ? targetMinutes / baseMinutes : factor;
  const range = parseMileRange(workout.intervals);

  return {
    ...workout,
    duration: formatDurationMinutes(targetMinutes),
    intervals: scaleIntervalRecipe(workout.intervals, mileRatio, timeRatio),
    distance: range
      ? `~${formatMilesNumber(roundMiles(range.low * mileRatio))}–${formatMilesNumber(roundMiles(range.high * mileRatio))} mi`
      : formatDistanceLabel(targetMiles),
  };
}

function scaleWeek(week: WeekTemplate, factor: number): WeekTemplate {
  if (Math.abs(factor - 1) < 0.02) return week;
  return {
    ...week,
    runs: week.runs.map((run) => scaleWorkout(run, factor)),
  };
}

function scaleLongRun(week: WeekTemplate, targetMiles: number): WeekTemplate {
  const current = longRunMiles(week);
  if (current <= 0 || Math.abs(targetMiles - current) < 0.15) return week;
  const factor = targetMiles / current;
  const longs = week.runs.filter((run) => run.runType === "long");
  const longestId =
    longs[0]?.id ??
    week.runs.reduce((best, run) => {
      if (run.runType === "race" || /^\s*rest\b/i.test(run.duration)) return best;
      if (!best) return run;
      return workoutBaseMiles(run) > workoutBaseMiles(best) ? run : best;
    }, null as Workout | null)?.id;
  return {
    ...week,
    runs: week.runs.map((run) =>
      run.id === longestId || (longs.length > 0 && run.runType === "long")
        ? scaleWorkout(run, factor)
        : run
    ),
  };
}

/**
 * Safety net on already-personalized weeks: cap long-run jumps, keep a
 * ~10% weekly mileage ceiling on distance plans, and make sure the peak
 * long run is long enough that race day is not a cliff.
 */
export function enforceStandardProgression(
  plan: TrainingPlan,
  level: PeriodizationLevel
): TrainingPlan {
  if (plan.familyId === "5k") return plan;

  const peakWeek = peakWeekNumber(plan.familyId, plan.durationWeeks);
  const weeks = plan.weeks.map((week) => ({ ...week, runs: [...week.runs] }));
  const minPeak = minPeakLongMiles(plan.familyId, level);
  const currentPeakLong = Math.max(
    0,
    ...weeks
      .filter((week) => week.week <= peakWeek)
      .map((week) => longRunMiles(week))
  );
  if (minPeak > 0 && currentPeakLong > 0 && currentPeakLong + 0.2 < minPeak) {
    const lift = minPeak / currentPeakLong;
    for (let i = 0; i < weeks.length; i++) {
      if (weeks[i]!.week > peakWeek) continue;
      const long = longRunMiles(weeks[i]!);
      if (long > 0) weeks[i] = scaleLongRun(weeks[i]!, roundMiles(long * lift));
    }
  }

  const peakLong = Math.max(
    ...weeks
      .filter((week) => week.week <= peakWeek)
      .map((week) => longRunMiles(week))
  );
  if (minPeak > 0 && peakLong > 0 && peakLong + 0.2 < minPeak) {
    const peakIndex = weeks.findIndex(
      (week) => week.week <= peakWeek && longRunMiles(week) === peakLong
    );
    if (peakIndex >= 0) {
      weeks[peakIndex] = scaleLongRun(weeks[peakIndex]!, minPeak);
    }
  }

  const peakTraining = Math.max(
    ...weeks
      .filter((week) => week.week <= peakWeek)
      .map((week) => trainingMiles(week))
  );

  for (const week of weeks) {
    if (week.week <= peakWeek) continue;
    const step = week.week - peakWeek;
    const taperN = taperWeekCount(plan.familyId, plan.durationWeeks);
    const targetFrac =
      taperN <= 1 ? 0.55 : step === 1 ? 0.7 : step === 2 ? 0.55 : 0.45;
    const current = trainingMiles(week);
    const target = roundMiles(peakTraining * targetFrac);
    if (current > target + 0.3 && current > 0) {
      const idx = weeks.findIndex((row) => row.week === week.week);
      weeks[idx] = scaleWeek(week, target / current);
    }
  }

  return { ...plan, weeks };
}
