import type { ActivitySummary } from "@/lib/activity-fields";
import {
  getBmi,
  resolveAge,
  type AthleteProfile,
} from "@/lib/athlete-profile";
import { formatPace } from "@/lib/strava";

const MILE_METERS = 1609.34;
const FIVE_K_METERS = 5000;
const HALF_MARATHON_METERS = 21097.5;
const MARATHON_METERS = 42195;
const RIEGEL_EXPONENT = 1.06;
const LOOKBACK_DAYS = 90;
const MIN_BASELINE_METERS = MILE_METERS;

export type ProjectionConfidence = "low" | "medium" | "high";

export type RaceProjection = {
  id: "5k" | "half" | "marathon";
  label: string;
  distanceLabel: string;
  projectedTimeSeconds: number;
  projectedTime: string;
  projectedPace: string;
  confidence: ProjectionConfidence;
};

export type PaceZone = {
  id: string;
  label: string;
  description: string;
  paceRange: string;
  minSecondsPerMile: number;
  maxSecondsPerMile: number;
  color: string;
};

export type PaceInsights = {
  available: boolean;
  reason?: string;
  baselineNote?: string;
  runSampleSize: number;
  projections: RaceProjection[];
  zones: PaceZone[];
};

function isRunActivity(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

function formatRaceTime(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatPaceRange(minSec: number, maxSec: number): string {
  const minSpeed = MILE_METERS / minSec;
  const maxSpeed = MILE_METERS / maxSec;
  return `${formatPace(maxSpeed)} – ${formatPace(minSpeed)}`;
}

function riegelTime(
  baselineDistanceM: number,
  baselineTimeS: number,
  targetDistanceM: number
): number {
  if (baselineDistanceM <= 0 || baselineTimeS <= 0) return 0;
  return baselineTimeS * (targetDistanceM / baselineDistanceM) ** RIEGEL_EXPONENT;
}

function daysAgo(date: Date): number {
  return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
}

type Baseline = {
  distanceMeters: number;
  movingTimeSeconds: number;
  confidence: ProjectionConfidence;
  note: string;
};

function selectBaseline(runs: ActivitySummary[]): Baseline | null {
  if (runs.length === 0) return null;

  const fiveKProxies = runs.filter(
    (r) => r.distance >= 4000 && r.distance <= 8500
  );
  if (fiveKProxies.length > 0) {
    const best = [...fiveKProxies].sort(
      (a, b) => a.movingTime / a.distance - b.movingTime / b.distance
    )[0];
    const recent = daysAgo(best.startDate) <= 30;
    return {
      distanceMeters: best.distance,
      movingTimeSeconds: best.movingTime,
      confidence: recent && runs.length >= 5 ? "high" : "medium",
      note: `Based on your recent ${(best.distance / 1000).toFixed(1)} km run`,
    };
  }

  const longRuns = runs
    .filter((r) => r.distance >= 5000)
    .sort((a, b) => b.distance - a.distance);
  if (longRuns.length > 0) {
    const best = longRuns.reduce((fastest, run) => {
      const pace = run.movingTime / run.distance;
      const fastestPace = fastest.movingTime / fastest.distance;
      return pace < fastestPace ? run : fastest;
    });
    return {
      distanceMeters: best.distance,
      movingTimeSeconds: best.movingTime,
      confidence: runs.length >= 4 ? "medium" : "low",
      note: `Projected from your recent ${(best.distance / MILE_METERS).toFixed(1)} mi effort`,
    };
  }

  const qualifying = runs.filter((r) => r.distance >= MIN_BASELINE_METERS);
  if (qualifying.length === 0) return null;

  let weightedSpeed = 0;
  let totalWeight = 0;
  for (const run of qualifying) {
    const recencyWeight = Math.max(0.35, 1 - daysAgo(run.startDate) / LOOKBACK_DAYS);
    const distanceWeight = Math.min(run.distance / 5000, 1.5);
    const weight = recencyWeight * distanceWeight;
    weightedSpeed += (run.distance / run.movingTime) * weight;
    totalWeight += weight;
  }

  if (totalWeight <= 0) return null;

  const avgSpeed = weightedSpeed / totalWeight;
  const referenceDistance = 5000;
  return {
    distanceMeters: referenceDistance,
    movingTimeSeconds: referenceDistance / avgSpeed,
    confidence: qualifying.length >= 5 ? "medium" : "low",
    note: `Estimated from ${qualifying.length} recent runs`,
  };
}

function buildProjections(baseline: Baseline): RaceProjection[] {
  const races: Array<{
    id: RaceProjection["id"];
    label: string;
    distanceLabel: string;
    meters: number;
  }> = [
    { id: "5k", label: "5K", distanceLabel: "3.1 mi", meters: FIVE_K_METERS },
    {
      id: "half",
      label: "Half marathon",
      distanceLabel: "13.1 mi",
      meters: HALF_MARATHON_METERS,
    },
    {
      id: "marathon",
      label: "Marathon",
      distanceLabel: "26.2 mi",
      meters: MARATHON_METERS,
    },
  ];

  return races.map((race) => {
    const projectedTimeSeconds = riegelTime(
      baseline.distanceMeters,
      baseline.movingTimeSeconds,
      race.meters
    );
    const projectedPace = formatPace(race.meters / projectedTimeSeconds);

    let confidence = baseline.confidence;
    if (race.id === "marathon" && baseline.distanceMeters < 10000) {
      confidence = confidence === "high" ? "medium" : "low";
    }
    if (race.id === "half" && baseline.distanceMeters < 8000) {
      confidence = confidence === "high" ? "medium" : confidence;
    }

    return {
      id: race.id,
      label: race.label,
      distanceLabel: race.distanceLabel,
      projectedTimeSeconds,
      projectedTime: formatRaceTime(projectedTimeSeconds),
      projectedPace,
      confidence,
    };
  });
}

const ZONE_COLORS = {
  recovery: "#94a3b8",
  easy: "#22c55e",
  marathon: "#3b82f6",
  threshold: "#f97316",
  interval: "#ef4444",
  repetition: "#a855f7",
};

function buildPaceZones(
  fiveKPaceSecPerMile: number,
  profile?: Pick<AthleteProfile, "age" | "gender" | "weightKg" | "heightCm">
): PaceZone[] {
  const age = profile ? resolveAge(profile) : 35;
  const ageEaseOffset = age > 40 ? Math.floor((age - 40) / 10) * 4 : 0;
  const p = fiveKPaceSecPerMile;
  const defs: Array<Omit<PaceZone, "paceRange">> = [
    {
      id: "recovery",
      label: "Recovery",
      description: "Very easy — full conversation, active rest",
      minSecondsPerMile: p + 105 + ageEaseOffset,
      maxSecondsPerMile: p + 135 + ageEaseOffset,
      color: ZONE_COLORS.recovery,
    },
    {
      id: "easy",
      label: "Easy",
      description: "Aerobic base — conversational effort",
      minSecondsPerMile: p + 75 + ageEaseOffset,
      maxSecondsPerMile: p + 105 + ageEaseOffset,
      color: ZONE_COLORS.easy,
    },
    {
      id: "marathon",
      label: "Marathon",
      description: "Sustainable race-day marathon effort",
      minSecondsPerMile: p + 42,
      maxSecondsPerMile: p + 55,
      color: ZONE_COLORS.marathon,
    },
    {
      id: "threshold",
      label: "Threshold",
      description: "Comfortably hard — ~1-hour race effort",
      minSecondsPerMile: p + 20,
      maxSecondsPerMile: p + 32,
      color: ZONE_COLORS.threshold,
    },
    {
      id: "interval",
      label: "Interval",
      description: "Hard repeats — near 5K race effort",
      minSecondsPerMile: p - 5,
      maxSecondsPerMile: p + 8,
      color: ZONE_COLORS.interval,
    },
    {
      id: "repetition",
      label: "Repetition",
      description: "Short, fast reps — mile or faster",
      minSecondsPerMile: p - 25,
      maxSecondsPerMile: p - 10,
      color: ZONE_COLORS.repetition,
    },
  ];

  return defs.map((zone) => ({
    ...zone,
    paceRange: formatPaceRange(zone.minSecondsPerMile, zone.maxSecondsPerMile),
  }));
}

export function calculatePaceInsights(
  activities: ActivitySummary[],
  profile?: Pick<AthleteProfile, "age" | "gender" | "weightKg" | "heightCm">
): PaceInsights {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - LOOKBACK_DAYS);

  const runs = activities
    .filter(
      (a) =>
        isRunActivity(a.type) &&
        a.distance >= MIN_BASELINE_METERS &&
        a.movingTime > 0 &&
        a.startDate >= cutoff
    )
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  if (runs.length === 0) {
    return {
      available: false,
      reason: "Sync at least one run of 1 mile or longer to see pace projections.",
      runSampleSize: 0,
      projections: [],
      zones: [],
    };
  }

  const baseline = selectBaseline(runs);
  if (!baseline) {
    return {
      available: false,
      reason: "Not enough recent run data for projections yet.",
      runSampleSize: runs.length,
      projections: [],
      zones: [],
    };
  }

  const projections = buildProjections(baseline);
  const fiveK = projections.find((p) => p.id === "5k");
  const fiveKPaceSecPerMile =
    fiveK!.projectedTimeSeconds / (FIVE_K_METERS / MILE_METERS);
  const zones = buildPaceZones(fiveKPaceSecPerMile, profile);

  const profileNotes: string[] = [];
  if (profile?.age != null && profile.age > 40) {
    profileNotes.push("easy/recovery paces widened slightly for your age");
  }
  const bmi =
    profile?.weightKg && profile?.heightCm
      ? getBmi({
          age: profile.age ?? null,
          gender: profile.gender ?? null,
          weightKg: profile.weightKg,
          heightCm: profile.heightCm,
          restingHeartRate: null,
        })
      : null;
  if (bmi != null && bmi >= 30) {
    profileNotes.push("build volume gradually given your BMI");
  }

  const baselineNote = [baseline.note, ...profileNotes].filter(Boolean).join(" · ");

  return {
    available: true,
    baselineNote,
    runSampleSize: runs.length,
    projections,
    zones,
  };
}
