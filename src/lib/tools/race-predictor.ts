/** Riegel endurance formula: T2 = T1 × (D2 / D1)^1.06 */
export const RIEGEL_EXPONENT = 1.06;

export type RaceDistanceId = "5k" | "10k" | "half" | "full";

export type RaceDistance = {
  id: RaceDistanceId;
  label: string;
  /** Official distance in kilometers */
  km: number;
};

export const RACE_DISTANCES: RaceDistance[] = [
  { id: "5k", label: "5K", km: 5 },
  { id: "10k", label: "10K", km: 10 },
  { id: "half", label: "Half marathon", km: 21.0975 },
  { id: "full", label: "Marathon", km: 42.195 },
];

export function getRaceDistance(id: RaceDistanceId): RaceDistance | undefined {
  return RACE_DISTANCES.find((d) => d.id === id);
}

/**
 * Predict finish time for a target distance from a known race result.
 * Distances must be in the same unit (typically km). Returns null if invalid.
 */
export function predictRaceTime(
  knownTimeSeconds: number,
  knownDistance: number,
  targetDistance: number,
  exponent = RIEGEL_EXPONENT
): number | null {
  if (!Number.isFinite(knownTimeSeconds) || knownTimeSeconds <= 0) return null;
  if (!Number.isFinite(knownDistance) || knownDistance <= 0) return null;
  if (!Number.isFinite(targetDistance) || targetDistance <= 0) return null;
  return knownTimeSeconds * (targetDistance / knownDistance) ** exponent;
}

/** Predict from a known race id to a target race id. */
export function predictBetweenRaces(
  knownTimeSeconds: number,
  knownId: RaceDistanceId,
  targetId: RaceDistanceId
): number | null {
  const known = getRaceDistance(knownId);
  const target = getRaceDistance(targetId);
  if (!known || !target) return null;
  return predictRaceTime(knownTimeSeconds, known.km, target.km);
}
