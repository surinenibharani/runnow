import type { ActivitySummary } from "@/lib/activity-fields";

/** Strava workout_type: 0=default, 1=race, 2=long run, 3=workout */
export const WORKOUT_TYPE_LABELS: Record<number, string> = {
  0: "default",
  1: "race",
  2: "long run",
  3: "workout",
};

const METERS_PER_MILE = 1609.34;

/** Extra load factor from climbing (~100 ft per mile ≈ +6% effort). */
export function elevationLoadFactor(
  elevationGainMeters: number | null | undefined,
  distanceMeters: number
): number {
  if (!elevationGainMeters || elevationGainMeters <= 0 || distanceMeters <= 0) {
    return 1;
  }
  const miles = distanceMeters / METERS_PER_MILE;
  const feetPerMile = (elevationGainMeters * 3.28084) / miles;
  if (feetPerMile >= 150) return 1.22;
  if (feetPerMile >= 100) return 1.14;
  if (feetPerMile >= 60) return 1.08;
  if (feetPerMile >= 30) return 1.04;
  return 1;
}

export function workoutTypeIntensityFactor(workoutType: number | null | undefined): number {
  if (workoutType === 1) return 1.2;
  if (workoutType === 3) return 1.12;
  if (workoutType === 2) return 1.05;
  return 1;
}

/**
 * Normalized training load for an activity.
 * Prefers Strava suffer score when present; otherwise minutes × intensity.
 */
export function activityTrainingLoad(
  activity: Pick<
    ActivitySummary,
    | "movingTime"
    | "distance"
    | "sufferScore"
    | "elevationGain"
    | "workoutType"
    | "averageHeartrate"
    | "type"
  >,
  options?: { hrIntensity?: number; typeFactor?: number; profileMultiplier?: number }
): number {
  if (activity.sufferScore != null && activity.sufferScore > 0) {
    const elev = elevationLoadFactor(activity.elevationGain, activity.distance);
    const workout = workoutTypeIntensityFactor(activity.workoutType);
    return activity.sufferScore * elev * workout;
  }

  const minutes = activity.movingTime / 60;
  if (minutes <= 0) return 0;

  const hrIntensity = options?.hrIntensity ?? 1;
  const typeFactor = options?.typeFactor ?? 1;
  const profileMultiplier = options?.profileMultiplier ?? 1;
  const elev = elevationLoadFactor(activity.elevationGain, activity.distance);
  const workout = workoutTypeIntensityFactor(activity.workoutType);

  return minutes * hrIntensity * typeFactor * profileMultiplier * elev * workout;
}

export function formatElevationFeet(meters: number | null | undefined): string | null {
  if (meters == null || meters <= 0) return null;
  return `${Math.round(meters * 3.28084)} ft`;
}

export function weeklyElevationFeet(
  activities: Pick<ActivitySummary, "elevationGain" | "startDate">[],
  days = 7
): number {
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  return activities
    .filter((a) => a.startDate.getTime() >= since)
    .reduce((sum, a) => sum + (a.elevationGain ?? 0) * 3.28084, 0);
}
