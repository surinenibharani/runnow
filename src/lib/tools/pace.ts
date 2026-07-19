/** Distance unit for pace / finish-time calculators. */
export type DistanceUnit = "km" | "mi";

const KM_PER_MILE = 1.609344;

/** Convert a distance between km and miles. */
export function convertDistance(
  distance: number,
  from: DistanceUnit,
  to: DistanceUnit
): number {
  if (!Number.isFinite(distance) || distance < 0) return 0;
  if (from === to) return distance;
  return from === "mi" ? distance * KM_PER_MILE : distance / KM_PER_MILE;
}

/** Combine hours, minutes, and seconds into total seconds. */
export function timePartsToSeconds(
  hours: number,
  minutes: number,
  seconds: number
): number {
  const h = Math.max(0, hours || 0);
  const m = Math.max(0, minutes || 0);
  const s = Math.max(0, seconds || 0);
  return h * 3600 + m * 60 + s;
}

/**
 * Parse "mm:ss" or "h:mm:ss" (also accepts single colon "m:ss") into seconds.
 * Returns null if the string is empty or invalid.
 */
export function parsePaceOrTime(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(":").map((p) => p.trim());
  if (parts.length < 2 || parts.length > 3) return null;
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isFinite(n) || n < 0)) return null;
  if (parts.length === 2) {
    const [m, s] = nums;
    if (s >= 60) return null;
    return m * 60 + s;
  }
  const [h, m, s] = nums;
  if (m >= 60 || s >= 60) return null;
  return h * 3600 + m * 60 + s;
}

/** Format seconds as pace "m:ss" (minutes can exceed 59). */
export function formatPace(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "—";
  const rounded = Math.round(totalSeconds);
  const m = Math.floor(rounded / 60);
  const s = rounded % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Format seconds as finish time "h:mm:ss" or "m:ss" when under an hour. */
export function formatFinishTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "—";
  const rounded = Math.round(totalSeconds);
  const h = Math.floor(rounded / 3600);
  const m = Math.floor((rounded % 3600) / 60);
  const s = rounded % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Pace in seconds per unit (km or mi) from distance + elapsed time.
 * Distance must already be in the desired unit. Returns null when invalid.
 */
export function paceFromDistanceAndTime(
  distance: number,
  timeSeconds: number
): number | null {
  if (!Number.isFinite(distance) || distance <= 0) return null;
  if (!Number.isFinite(timeSeconds) || timeSeconds <= 0) return null;
  return timeSeconds / distance;
}

/**
 * Finish time in seconds from pace (sec/unit) and distance in the same unit.
 */
export function finishTimeFromPaceAndDistance(
  paceSecondsPerUnit: number,
  distance: number
): number | null {
  if (!Number.isFinite(paceSecondsPerUnit) || paceSecondsPerUnit <= 0) {
    return null;
  }
  if (!Number.isFinite(distance) || distance <= 0) return null;
  return paceSecondsPerUnit * distance;
}
