import type { Workout } from "@/lib/plan-types";

export function formatMilesNumber(miles: number): string {
  const rounded = Math.round(miles * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function raceMilesFromText(text: string): number | null {
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

export function parseMileRange(text: string): { low: number; high: number } | null {
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

export function estimateMinutes(duration: string): number {
  const nums = [...duration.matchAll(/(\d+(?:\.\d+)?)/g)].map((m) =>
    parseFloat(m[1])
  );
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  return (nums[0] + nums[1]) / 2;
}

/** Canonical template pace used to read miles out of a time-only workout. */
export function templatePaceMinPerMile(workout: Workout): number {
  if (workout.runType === "walking") return 18;
  if (workout.runType === "walk-run") return 14;
  return 11;
}

export function estimateMilesFromDuration(workout: Workout): number {
  const minutes = estimateMinutes(workout.duration);
  if (!minutes) return 0;

  const race = raceMilesFromText(`${workout.intervals} ${workout.name}`);
  if (race != null) return race;

  return Math.round((minutes / templatePaceMinPerMile(workout)) * 10) / 10;
}

export function workoutBaseMiles(workout: Workout): number {
  const labeled = workout.distance
    ? parseMilesFromText(workout.distance)
    : null;
  if (labeled != null) return labeled;

  const estimated = estimateMilesFromDuration(workout);
  const parsed = parseMilesFromText(`${workout.intervals} ${workout.name}`);
  if (parsed != null && (estimated === 0 || parsed >= estimated * 0.65)) {
    return parsed;
  }
  if (estimated > 0) return estimated;
  if (parsed != null) return parsed;
  return 0;
}

/** How far this run should cover — prescribed miles, or an easy-pace estimate. */
export function formatWorkoutDistance(workout: Workout): string | null {
  if (workout.distance) return workout.distance;

  const range = parseMileRange(workout.intervals);
  if (range) {
    return `~${formatMilesNumber(range.low)}–${formatMilesNumber(range.high)} mi`;
  }

  const miles = workoutBaseMiles(workout);
  if (miles > 0) return `~${formatMilesNumber(miles)} mi`;
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

export function formatDurationMinutes(minutes: number, asRange = false): string {
  const rounded = Math.max(10, Math.round(minutes));
  if (!asRange) return `~${rounded} min`;
  const low = Math.max(10, rounded - 4);
  const high = Math.max(low + 4, rounded + 4);
  return `~${low}–${high} min`;
}

export function formatDistanceLabel(miles: number): string {
  return `~${formatMilesNumber(Math.max(0.5, miles))} mi`;
}
