import type { ActivitySummary } from "@/lib/activity-fields";
import type { BestEffortBaseline } from "@/lib/strava-best-efforts";
import {
  estimateMaxHeartRate,
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
const MIN_RUN_METERS = MILE_METERS;

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
  baselineSource?: "best_effort" | "blended" | "riegel";
  runSampleSize: number;
  crossTrainSampleSize: number;
  projections: RaceProjection[];
  zones: PaceZone[];
  athleteStats?: {
    recentRunMiles: number;
    recentRunCount: number;
    ytdRunMiles: number;
  };
  bestEfforts?: Array<{
    name: string;
    time: string;
    distanceLabel: string;
    startDate: string;
    isPr: boolean;
  }>;
};

type PaceSample = {
  runEquivSpeedMps: number;
  weight: number;
  source: string;
  startDate: Date;
  kind: "run" | "cross_train";
  /** Fraction of estimated max HR when present (0–1+). */
  hrPctMax: number | null;
  workoutType: number | null;
};

type ActivityPaceRule = {
  kind: "run" | "cross_train";
  speedFactor: number;
  minMeters: number;
  maxSecPerMile?: number;
  baseWeight: number;
};

function isRunActivity(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

function getActivityPaceRule(type: string): ActivityPaceRule | null {
  const t = type.toLowerCase();

  if (t.includes("virtual") && t.includes("run")) {
    return { kind: "run", speedFactor: 1, minMeters: MIN_RUN_METERS, baseWeight: 1 };
  }
  if (t === "trailrun" || (t.includes("trail") && t.includes("run"))) {
    return { kind: "run", speedFactor: 0.97, minMeters: MIN_RUN_METERS, baseWeight: 0.95 };
  }
  if (t.includes("run")) {
    return { kind: "run", speedFactor: 1, minMeters: MIN_RUN_METERS, baseWeight: 1 };
  }
  if (t.includes("virtual") && (t.includes("ride") || t.includes("bike"))) {
    return { kind: "cross_train", speedFactor: 0.43, minMeters: 4000, baseWeight: 0.55 };
  }
  if (t.includes("ride") || t.includes("bike") || t.includes("cycl")) {
    return { kind: "cross_train", speedFactor: 0.43, minMeters: 5000, baseWeight: 0.6 };
  }
  if (t.includes("elliptical")) {
    return { kind: "cross_train", speedFactor: 0.88, minMeters: MIN_RUN_METERS, baseWeight: 0.7 };
  }
  if (t.includes("row")) {
    return { kind: "cross_train", speedFactor: 0.52, minMeters: 2000, baseWeight: 0.55 };
  }
  if (t.includes("ski")) {
    return { kind: "cross_train", speedFactor: 0.5, minMeters: 3000, baseWeight: 0.5 };
  }
  if (t.includes("hike")) {
    return {
      kind: "cross_train",
      speedFactor: 0.78,
      minMeters: 2000,
      maxSecPerMile: 18 * 60,
      baseWeight: 0.45,
    };
  }
  if (t.includes("walk")) {
    return {
      kind: "cross_train",
      speedFactor: 0.82,
      minMeters: 2000,
      maxSecPerMile: 15 * 60,
      baseWeight: 0.4,
    };
  }
  if (
    t.includes("swim") ||
    t.includes("workout") ||
    t.includes("crossfit") ||
    t.includes("hiit") ||
    t.includes("weight") ||
    t.includes("strength") ||
    t.includes("yoga")
  ) {
    return null;
  }

  return null;
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

function secPerMile(distanceM: number, movingTimeS: number): number {
  if (distanceM <= 0 || movingTimeS <= 0) return Infinity;
  return (movingTimeS / distanceM) * MILE_METERS;
}

function hrEffortMultiplier(
  activity: ActivitySummary,
  profile?: AthleteProfile
): number {
  if (!activity.averageHeartrate || !profile) return 1;

  const maxHr = estimateMaxHeartRate(profile);
  const pct = (activity.averageHeartrate / maxHr) * 100;

  if (pct >= 88 && pct <= 98) return 1.25;
  if (pct >= 80 && pct < 88) return 1.1;
  if (pct >= 70 && pct < 80) return 0.95;
  if (pct < 60) return 0.75;
  return 1;
}

function extractPaceSample(
  activity: ActivitySummary,
  profile?: AthleteProfile
): PaceSample | null {
  const rule = getActivityPaceRule(activity.type);
  if (!rule) return null;
  if (activity.distance < rule.minMeters || activity.movingTime <= 0) return null;

  const paceSecPerMile = secPerMile(activity.distance, activity.movingTime);
  if (rule.maxSecPerMile && paceSecPerMile > rule.maxSecPerMile) return null;

  const speedMps = activity.distance / activity.movingTime;
  const runEquivSpeedMps = speedMps * rule.speedFactor;

  const recencyWeight = Math.max(0.35, 1 - daysAgo(activity.startDate) / LOOKBACK_DAYS);
  const distanceWeight = Math.min(activity.distance / 5000, 1.5);
  const hrWeight = hrEffortMultiplier(activity, profile);
  const workoutBoost =
    activity.workoutType === 1 ? 1.35 : activity.workoutType === 3 ? 1.2 : 1;
  const weight =
    rule.baseWeight * recencyWeight * distanceWeight * hrWeight * workoutBoost;

  const source =
    rule.kind === "run"
      ? activity.type.replace(/_/g, " ")
      : `cross-training (${activity.type.replace(/_/g, " ")})`;

  let hrPctMax: number | null = null;
  if (activity.averageHeartrate && profile) {
    hrPctMax = activity.averageHeartrate / estimateMaxHeartRate(profile);
  }

  return {
    runEquivSpeedMps,
    weight,
    source,
    startDate: activity.startDate,
    kind: rule.kind,
    hrPctMax,
    workoutType: activity.workoutType ?? null,
  };
}

type Baseline = {
  distanceMeters: number;
  movingTimeSeconds: number;
  confidence: ProjectionConfidence;
  note: string;
};

/**
 * Estimate race-capable speed from training samples.
 * Easy aerobic miles dominate Strava history — averaging them as "5K pace"
 * makes projections and zones far too slow. Prefer faster / harder efforts
 * and convert clearly-easy paces toward race effort.
 */
function selectBaseline(
  samples: PaceSample[],
  runCount: number,
  crossTrainCount: number
): Baseline | null {
  if (samples.length === 0) return null;

  const plausible = samples.filter((s) => {
    const implied5kTime = FIVE_K_METERS / s.runEquivSpeedMps;
    return implied5kTime >= 12 * 60 && implied5kTime <= 55 * 60;
  });
  const pool = plausible.length > 0 ? plausible : samples;
  const runPool = pool.filter((s) => s.kind === "run");
  const primary = runPool.length > 0 ? runPool : pool;

  const sorted = [...primary].sort(
    (a, b) => b.runEquivSpeedMps - a.runEquivSpeedMps
  );
  const topCount = Math.max(1, Math.ceil(sorted.length * 0.3));
  const top = sorted.slice(0, topCount);

  let weightedSpeed = 0;
  let totalWeight = 0;
  for (const sample of top) {
    weightedSpeed += sample.runEquivSpeedMps * sample.weight;
    totalWeight += sample.weight;
  }
  if (totalWeight <= 0) return null;

  let anchorSpeed = weightedSpeed / totalWeight;
  const best = sorted[0];

  // Detect easy-dominated sample: few races/workouts and low HR share.
  const hardTagged = top.filter(
    (s) =>
      s.workoutType === 1 ||
      s.workoutType === 3 ||
      (s.hrPctMax != null && s.hrPctMax >= 0.85)
  );
  const easyLooking =
    hardTagged.length === 0 &&
    top.every(
      (s) =>
        s.hrPctMax == null ||
        s.hrPctMax < 0.8 ||
        (s.workoutType !== 1 && s.workoutType !== 3)
    );

  let convertedFromEasy = false;
  if (easyLooking && primary === runPool) {
    // Typical recreational gap: easy ~15–20% slower than 5K race pace.
    anchorSpeed *= 1.16;
    convertedFromEasy = true;
  } else if (hardTagged.length === 0 && best.runEquivSpeedMps > anchorSpeed) {
    // Bias toward the freshest hard-ish effort without treating one outlier as race form.
    anchorSpeed = best.runEquivSpeedMps * 0.55 + anchorSpeed * 0.45;
  }

  // Clamp implied 5K to a sane beginner→advanced band.
  const implied5k = FIVE_K_METERS / anchorSpeed;
  if (implied5k < 13 * 60) anchorSpeed = FIVE_K_METERS / (13 * 60);
  if (implied5k > 50 * 60) anchorSpeed = FIVE_K_METERS / (50 * 60);

  const referenceDistance = FIVE_K_METERS;
  const movingTimeSeconds = referenceDistance / anchorSpeed;

  let confidence: ProjectionConfidence = "low";
  if (runCount >= 5 && !convertedFromEasy && hardTagged.length > 0) {
    confidence = "high";
  } else if (runCount >= 4) confidence = "medium";
  else if (runCount >= 2 && crossTrainCount > 0) confidence = "medium";
  else if (runCount >= 1 || crossTrainCount >= 2) confidence = "low";
  if (convertedFromEasy && confidence === "high") confidence = "medium";

  const recent = daysAgo(best.startDate) <= 21;
  if (confidence === "high" && !recent) confidence = "medium";

  const parts: string[] = [];
  if (runCount > 0) {
    parts.push(`${runCount} run${runCount === 1 ? "" : "s"}`);
  }
  if (crossTrainCount > 0) {
    parts.push(
      `${crossTrainCount} cross-training workout${crossTrainCount === 1 ? "" : "s"}`
    );
  }

  let note = `Based on ${parts.join(" and ")}`;
  if (convertedFromEasy) {
    note += " · estimated race pace from easier training (zones use race-effort, not jog pace)";
  } else if (runPool.length === 0) {
    note += " · cross-training converted to run-equivalent pace";
  } else if (crossTrainCount > 0 && runCount > 0) {
    note += " · fastest recent efforts weighted highest";
  } else {
    note += " · fastest recent efforts weighted highest";
  }

  return {
    distanceMeters: referenceDistance,
    movingTimeSeconds,
    confidence,
    note,
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

type ZoneAdjustments = {
  easyOffset: number;
  notes: string[];
};

function getZoneAdjustments(profile?: AthleteProfile): ZoneAdjustments {
  const notes: string[] = [];
  let easyOffset = 0;

  if (!profile) return { easyOffset, notes };

  const age = resolveAge(profile);
  if (age > 40) {
    const ageBump = Math.floor((age - 40) / 10) * 4;
    easyOffset += ageBump;
    if (ageBump > 0) notes.push("easy/recovery widened for age");
  }

  if (profile.gender === "female" && age >= 45) {
    easyOffset += 2;
  }

  const bmi = getBmi(profile);
  if (bmi != null) {
    if (bmi >= 30) {
      easyOffset += 8;
      notes.push("easy paces adjusted for BMI");
    } else if (bmi >= 25) {
      easyOffset += 4;
    } else if (bmi < 18.5) {
      easyOffset += 3;
      notes.push("conservative easy paces for low BMI");
    }
  }

  if (profile.heightCm != null && profile.heightCm >= 190) {
    easyOffset += 2;
  }

  if (profile.weightKg != null && profile.gender === "male" && profile.weightKg >= 95) {
    easyOffset += 3;
  }

  return { easyOffset, notes };
}

function buildPaceZones(
  fiveKPaceSecPerMile: number,
  profile?: AthleteProfile
): PaceZone[] {
  const { easyOffset } = getZoneAdjustments(profile);
  const p = fiveKPaceSecPerMile;

  // Offsets relative to true 5K race pace (Daniels / McMillan-style recreational bands).
  const defs: Array<Omit<PaceZone, "paceRange">> = [
    {
      id: "recovery",
      label: "Recovery",
      description: "Very easy — full conversation, active rest",
      minSecondsPerMile: p + 100 + easyOffset,
      maxSecondsPerMile: p + 140 + easyOffset,
      color: ZONE_COLORS.recovery,
    },
    {
      id: "easy",
      label: "Easy",
      description: "Aerobic base — conversational effort",
      minSecondsPerMile: p + 70 + easyOffset,
      maxSecondsPerMile: p + 100 + easyOffset,
      color: ZONE_COLORS.easy,
    },
    {
      id: "marathon",
      label: "Marathon",
      description: "Sustainable race-day marathon effort",
      minSecondsPerMile: p + 35 + Math.round(easyOffset * 0.25),
      maxSecondsPerMile: p + 50 + Math.round(easyOffset * 0.25),
      color: ZONE_COLORS.marathon,
    },
    {
      id: "threshold",
      label: "Threshold",
      description: "Comfortably hard — ~1-hour race effort",
      minSecondsPerMile: p + 15,
      maxSecondsPerMile: p + 28,
      color: ZONE_COLORS.threshold,
    },
    {
      id: "interval",
      label: "Interval",
      description: "Hard repeats — near 5K race effort",
      minSecondsPerMile: p - 8,
      maxSecondsPerMile: p + 8,
      color: ZONE_COLORS.interval,
    },
    {
      id: "repetition",
      label: "Repetition",
      description: "Short, fast reps — mile or faster",
      minSecondsPerMile: p - 30,
      maxSecondsPerMile: p - 12,
      color: ZONE_COLORS.repetition,
    },
  ];

  return defs.map((zone) => ({
    ...zone,
    paceRange: formatPaceRange(zone.minSecondsPerMile, zone.maxSecondsPerMile),
  }));
}

function buildProjectionsFromBaseline(baseline: Baseline): RaceProjection[] {
  return buildProjections(baseline);
}

function baselineFromBestEffort(effort: BestEffortBaseline): Baseline {
  let confidence: ProjectionConfidence =
    effort.confidence === "high" ? "high" : "medium";
  const daysOld = daysAgo(effort.startDate);
  if (daysOld > 60) confidence = confidence === "high" ? "medium" : "low";

  return {
    distanceMeters: effort.distanceMeters,
    movingTimeSeconds: effort.movingTimeSeconds,
    confidence,
    note: `Based on Strava ${effort.source} from ${effort.startDate.toLocaleDateString()}`,
  };
}

export function calculatePaceInsights(
  activities: ActivitySummary[],
  profile?: AthleteProfile,
  options?: {
    bestEffortBaseline?: BestEffortBaseline | null;
    athleteStats?: PaceInsights["athleteStats"];
    bestEfforts?: PaceInsights["bestEfforts"];
  }
): PaceInsights {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - LOOKBACK_DAYS);

  const recent = activities.filter((a) => a.startDate >= cutoff);
  const samples: PaceSample[] = [];
  let runCount = 0;
  let crossTrainCount = 0;

  for (const activity of recent) {
    const rule = getActivityPaceRule(activity.type);
    if (!rule) continue;

    const sample = extractPaceSample(activity, profile);
    if (!sample) continue;

    samples.push(sample);
    if (rule.kind === "run") runCount++;
    else crossTrainCount++;
  }

  if (samples.length === 0 && !options?.bestEffortBaseline) {
    const hasAnyActivity = recent.some((a) => getActivityPaceRule(a.type) != null);
    return {
      available: false,
      reason: hasAnyActivity
        ? "Need at least one run or cross-training session of 1 mile or longer with pace data."
        : "Sync runs or cross-training (ride, elliptical, hike, etc.) to see pace zones.",
      runSampleSize: 0,
      crossTrainSampleSize: 0,
      projections: [],
      zones: [],
      athleteStats: options?.athleteStats,
      bestEfforts: options?.bestEfforts,
    };
  }

  const baseline =
    options?.bestEffortBaseline != null
      ? baselineFromBestEffort(options.bestEffortBaseline)
      : selectBaseline(samples, runCount, crossTrainCount);
  if (!baseline) {
    return {
      available: false,
      reason: "Not enough recent activity data for pace projections yet.",
      runSampleSize: runCount,
      crossTrainSampleSize: crossTrainCount,
      projections: [],
      zones: [],
      athleteStats: options?.athleteStats,
      bestEfforts: options?.bestEfforts,
    };
  }

  const projections = buildProjectionsFromBaseline(baseline);
  const fiveK = projections.find((p) => p.id === "5k");
  const fiveKPaceSecPerMile =
    fiveK!.projectedTimeSeconds / (FIVE_K_METERS / MILE_METERS);
  const zones = buildPaceZones(fiveKPaceSecPerMile, profile);

  const { notes: zoneNotes } = getZoneAdjustments(profile);
  const profileNotes = [...zoneNotes];

  if (profile?.age != null || profile?.gender != null) {
    profileNotes.push("profile-adjusted zones");
  }
  if (crossTrainCount > 0 && runCount === 0) {
    profileNotes.push("zones estimated from cross-training only");
  }

  const baselineNote = [baseline.note, ...profileNotes].filter(Boolean).join(" · ");

  return {
    available: true,
    baselineNote,
    baselineSource: options?.bestEffortBaseline ? "best_effort" : "blended",
    runSampleSize: runCount,
    crossTrainSampleSize: crossTrainCount,
    projections,
    zones,
    athleteStats: options?.athleteStats,
    bestEfforts: options?.bestEfforts,
  };
}

// Exported for tests / reuse
export { isRunActivity, getActivityPaceRule };
