import type { StravaBestEffort } from "@/lib/strava";

const MILE = 1609.34;

export type CachedBestEffort = {
  name: string;
  distanceMeters: number;
  elapsedTimeSeconds: number;
  startDate: string;
  activityId: string;
  prRank: number | null;
};

export type BestEffortBaseline = {
  distanceMeters: number;
  movingTimeSeconds: number;
  source: string;
  startDate: Date;
  confidence: "high" | "medium";
};

const EFFORT_TARGETS: Array<{
  id: string;
  label: string;
  meters: number;
  tolerance: number;
}> = [
  { id: "5k", label: "5K", meters: 5000, tolerance: 200 },
  { id: "10k", label: "10K", meters: 10000, tolerance: 400 },
  { id: "half", label: "Half marathon", meters: 21097.5, tolerance: 800 },
  { id: "mile", label: "1 mile", meters: MILE, tolerance: 80 },
];

function matchesDistance(distance: number, target: number, tolerance: number): boolean {
  return Math.abs(distance - target) <= tolerance;
}

export function mergeBestEfforts(
  existing: CachedBestEffort[],
  incoming: StravaBestEffort[],
  activityId: string
): CachedBestEffort[] {
  const map = new Map<string, CachedBestEffort>();

  for (const effort of existing) {
    const key = effortKey(effort.distanceMeters);
    if (key) map.set(key, effort);
  }

  for (const effort of incoming) {
    const key = effortKey(effort.distance);
    if (!key) continue;

    const candidate: CachedBestEffort = {
      name: effort.name,
      distanceMeters: effort.distance,
      elapsedTimeSeconds: effort.elapsed_time,
      startDate: effort.start_date,
      activityId,
      prRank: effort.pr_rank ?? null,
    };

    const current = map.get(key);
    if (!current || candidate.elapsedTimeSeconds < current.elapsedTimeSeconds) {
      map.set(key, candidate);
    }
  }

  return [...map.values()].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

function effortKey(distanceMeters: number): string | null {
  for (const target of EFFORT_TARGETS) {
    if (matchesDistance(distanceMeters, target.meters, target.tolerance)) {
      return target.id;
    }
  }
  return null;
}

export function parseBestEffortsCache(value: unknown): CachedBestEffort[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is CachedBestEffort =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as CachedBestEffort).distanceMeters === "number" &&
      typeof (item as CachedBestEffort).elapsedTimeSeconds === "number"
  );
}

export function selectBestEffortBaseline(
  efforts: CachedBestEffort[],
  maxAgeDays = 120
): BestEffortBaseline | null {
  const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;

  // Prefer race-distance efforts; skip mile-only unless nothing else exists.
  const preference = ["5k", "10k", "half", "mile"] as const;

  for (const id of preference) {
    const target = EFFORT_TARGETS.find((t) => t.id === id);
    if (!target) continue;

    const match = efforts
      .filter(
        (e) =>
          matchesDistance(e.distanceMeters, target.meters, target.tolerance) &&
          new Date(e.startDate).getTime() >= cutoff
      )
      .sort((a, b) => a.elapsedTimeSeconds - b.elapsedTimeSeconds)[0];

    if (match) {
      return {
        distanceMeters: match.distanceMeters,
        movingTimeSeconds: match.elapsedTimeSeconds,
        source: `${target.label} best effort (${match.name})`,
        startDate: new Date(match.startDate),
        confidence:
          target.id === "5k" || target.id === "10k"
            ? "high"
            : target.id === "mile"
              ? "medium"
              : "medium",
      };
    }
  }

  return null;
}

export function formatBestEffortsForDisplay(
  efforts: CachedBestEffort[]
): Array<{
  name: string;
  time: string;
  distanceLabel: string;
  startDate: string;
  isPr: boolean;
}> {
  return efforts.slice(0, 5).map((effort) => {
    const total = Math.max(0, Math.round(effort.elapsedTimeSeconds));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const time =
      h > 0
        ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        : `${m}:${s.toString().padStart(2, "0")}`;

    return {
      name: effort.name,
      time,
      distanceLabel: effort.name,
      startDate: effort.startDate,
      isPr: effort.prRank === 1,
    };
  });
}
