import type { ActivitySummary } from "@/lib/activity-fields";
import {
  buildAthleteProfile,
  estimateExpectedRestingHr,
  getSleepTarget,
  getTrainingLoadMultiplier,
  type AthleteProfile,
} from "@/lib/athlete-profile";

export type WellnessSnapshot = {
  date: string;
  sleepMinutes: number | null;
  restingHeartRate: number | null;
  source: string;
};

export type RecoveryFactor = {
  id: "sleep" | "restingHr" | "trainingLoad";
  label: string;
  score: number;
  detail: string;
  available: boolean;
};

export type RecoveryReadiness = {
  score: number | null;
  label: "Excellent" | "Good" | "Moderate" | "Low" | "Unknown";
  summary: string;
  factors: RecoveryFactor[];
  todayRestingHeartRate: number | null;
  restingHeartRateSource: "manual" | "estimated" | null;
  lastNightSleepMinutes: number | null;
  sleepSource: "manual" | null;
};

function isRunActivity(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseDateKey(key: string): Date {
  return new Date(`${key}T12:00:00.000Z`);
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(12, 0, 0, 0);
  return d;
}

function scoreSleep(
  minutes: number | null,
  profile: AthleteProfile,
  source?: string | null
): RecoveryFactor {
  if (minutes == null || minutes <= 0) {
    return {
      id: "sleep",
      label: "Sleep",
      score: 0,
      detail: "Log last night's sleep from your watch or tracker.",
      available: false,
    };
  }

  const sourceNote =
    source === "estimated"
      ? " (estimated from easy activities)"
      : source === "manual"
        ? " (from your log)"
        : "";

  const hours = minutes / 60;
  const target = getSleepTarget(profile);
  let score: number;
  let detail: string;

  if (hours >= target.minHours && hours <= target.maxHours) {
    score = 100;
    detail = `${formatSleep(minutes)}${sourceNote} — solid recovery sleep for your profile.`;
  } else if (hours >= target.minHours - 1 && hours < target.minHours) {
    score = 75;
    detail = `${formatSleep(minutes)}${sourceNote} — a bit short; an easy day may help.`;
  } else if (hours > target.maxHours && hours <= target.maxHours + 1) {
    score = 88;
    detail = `${formatSleep(minutes)}${sourceNote} — extra rest; listen to how you feel.`;
  } else if (hours >= target.minHours - 2 && hours < target.minHours - 1) {
    score = 50;
    detail = `${formatSleep(minutes)}${sourceNote} — under-slept; keep today's effort easy.`;
  } else if (hours < target.minHours - 2) {
    score = 25;
    detail = `${formatSleep(minutes)}${sourceNote} — very low sleep; prioritize rest.`;
  } else {
    score = 70;
    detail = `${formatSleep(minutes)}${sourceNote} — long sleep block; ease into training.`;
  }

  return { id: "sleep", label: "Sleep", score, detail, available: true };
}

function formatSleep(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function scoreRestingHr(
  todayRhr: number | null,
  baselineRhr: number | null,
  profile: AthleteProfile,
  source: "manual" | "estimated" | null
): RecoveryFactor {
  if (todayRhr == null) {
    return {
      id: "restingHr",
      label: "Resting heart rate",
      score: 0,
      detail:
        "Add this morning's resting HR from Apple Watch, Garmin, or Coros — or we'll estimate from easy activities.",
      available: false,
    };
  }

  const sourceNote =
    source === "estimated"
      ? " (estimated from easy activities)"
      : source === "manual"
        ? " (from your log)"
        : "";

  if (baselineRhr == null) {
    const expected = estimateExpectedRestingHr(profile);
    const vsExpected = todayRhr - expected;
    let detail = `${todayRhr} bpm${sourceNote}`;
    if (vsExpected <= 3) {
      detail += ` — near your sex/age expected ~${expected} bpm.`;
    } else if (vsExpected <= 8) {
      detail += ` — slightly above expected ~${expected} bpm for your profile.`;
    } else {
      detail += ` — elevated vs expected ~${expected} bpm; log more days for a personal baseline.`;
    }
    return {
      id: "restingHr",
      label: "Resting heart rate",
      score: vsExpected <= 5 ? 75 : vsExpected <= 10 ? 60 : 45,
      detail,
      available: true,
    };
  }

  const diff = todayRhr - baselineRhr;
  const expected = estimateExpectedRestingHr(profile);
  let score: number;
  let detail: string;

  if (diff <= -2) {
    score = 100;
    detail = `${todayRhr} bpm${sourceNote} — below your ${Math.round(baselineRhr)} bpm baseline; well recovered.`;
  } else if (diff <= 2) {
    score = 90;
    detail = `${todayRhr} bpm${sourceNote} — in line with your ${Math.round(baselineRhr)} bpm baseline.`;
  } else if (diff <= 5) {
    score = 65;
    detail = `${todayRhr} bpm${sourceNote} — slightly elevated vs ${Math.round(baselineRhr)} bpm; go easy.`;
  } else if (diff <= 8) {
    score = 40;
    detail = `${todayRhr} bpm${sourceNote} — notably higher than ${Math.round(baselineRhr)} bpm; recovery day advised.`;
  } else {
    score = 20;
    detail = `${todayRhr} bpm${sourceNote} — well above ${Math.round(baselineRhr)} bpm; rest or very light movement.`;
  }

  if (todayRhr > expected + 12) {
    score = Math.min(score, 35);
    detail += ` Also above typical ~${expected} bpm for your age/sex.`;
  }

  return {
    id: "restingHr",
    label: "Resting heart rate",
    score,
    detail,
    available: true,
  };
}

function runMinutesInRange(
  activities: ActivitySummary[],
  start: Date,
  end: Date
): number {
  return activities
    .filter(
      (a) =>
        isRunActivity(a.type) &&
        a.startDate >= start &&
        a.startDate <= end
    )
    .reduce((sum, a) => sum + a.movingTime / 60, 0);
}

function scoreTrainingLoad(
  activities: ActivitySummary[],
  profile: AthleteProfile
): RecoveryFactor {
  const now = new Date();
  const acuteStart = daysAgo(6);
  const chronicStart = daysAgo(27);
  const loadMultiplier = getTrainingLoadMultiplier(profile);

  const acuteMinutes =
    runMinutesInRange(activities, acuteStart, now) * loadMultiplier;
  const chronicMinutes =
    runMinutesInRange(activities, chronicStart, now) * loadMultiplier;
  const chronicWeekly = chronicMinutes / 4;

  if (acuteMinutes === 0 && chronicWeekly === 0) {
    return {
      id: "trainingLoad",
      label: "Training load",
      score: 80,
      detail: "No recent run load — good to build gradually.",
      available: true,
    };
  }

  if (chronicWeekly < 30) {
    const detail =
      acuteMinutes > 0
        ? `${Math.round(acuteMinutes)} run min this week — still building your base.`
        : "Light recent load — room to add easy miles.";
    return {
      id: "trainingLoad",
      label: "Training load",
      score: 85,
      detail,
      available: true,
    };
  }

  const ratio = acuteMinutes / chronicWeekly;
  let score: number;
  let detail: string;

  if (ratio >= 0.8 && ratio <= 1.2) {
    score = 100;
    detail = `Balanced load (${Math.round(acuteMinutes)} min this week vs ~${Math.round(chronicWeekly)} min/week avg).`;
  } else if (ratio > 1.2 && ratio <= 1.5) {
    score = 70;
    detail = `Ramping up (${Math.round(acuteMinutes)} min this week) — watch fatigue.`;
  } else if (ratio > 1.5 && ratio <= 2) {
    score = 45;
    detail = `High acute load (${Math.round(acuteMinutes)} min) vs your usual — extra recovery helps.`;
  } else if (ratio > 2) {
    score = 20;
    detail = `Spike in training (${Math.round(acuteMinutes)} min this week) — prioritize rest.`;
  } else if (ratio < 0.8) {
    score = 90;
    detail = `Lighter week (${Math.round(acuteMinutes)} min) — good for absorbing training.`;
  } else {
    score = 75;
    detail = `${Math.round(acuteMinutes)} run min this week.`;
  }

  return {
    id: "trainingLoad",
    label: "Training load",
    score,
    detail,
    available: true,
  };
}

/** Lowest easy-effort HR from recent activities — proxy when no watch RHR is logged. */
export function estimateRestingHeartRate(
  activities: ActivitySummary[],
  lookbackDays = 14
): number | null {
  const since = daysAgo(lookbackDays);
  const withHr = activities.filter(
    (a) =>
      a.averageHeartrate != null &&
      a.averageHeartrate > 0 &&
      a.startDate >= since &&
      a.movingTime >= 600
  );

  if (withHr.length === 0) return null;

  const easyEfforts = withHr
    .filter((a) => {
      const t = a.type.toLowerCase();
      return (
        t.includes("walk") ||
        t.includes("hike") ||
        isRunActivity(a.type)
      );
    })
    .map((a) => a.averageHeartrate as number)
    .sort((a, b) => a - b);

  const pool = easyEfforts.length > 0 ? easyEfforts : withHr.map((a) => a.averageHeartrate as number).sort((a, b) => a - b);
  const index = Math.min(Math.floor(pool.length * 0.1), pool.length - 1);
  return Math.round(pool[Math.max(0, index)]);
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function resolveTodayRhr(
  wellness: WellnessSnapshot[],
  activities: ActivitySummary[]
): { rhr: number | null; source: "manual" | "estimated" | null } {
  const todayKey = toDateKey(new Date());
  const todayManual = wellness.find(
    (w) => w.date === todayKey && w.restingHeartRate != null
  );
  if (todayManual?.restingHeartRate) {
    return { rhr: todayManual.restingHeartRate, source: "manual" };
  }

  const estimated = estimateRestingHeartRate(activities);
  if (estimated != null) {
    return { rhr: estimated, source: "estimated" };
  }

  return { rhr: null, source: null };
}

function resolveBaselineRhr(
  wellness: WellnessSnapshot[],
  activities: ActivitySummary[]
): number | null {
  const manual = wellness
    .filter((w) => w.restingHeartRate != null)
    .slice(0, 14)
    .map((w) => w.restingHeartRate as number);

  if (manual.length >= 3) {
    return median(manual);
  }

  const estimated = estimateRestingHeartRate(activities, 28);
  return estimated;
}

function resolveLastNightSleep(
  wellness: WellnessSnapshot[]
): { minutes: number | null; source: "manual" | null } {
  const todayKey = toDateKey(new Date());
  const yesterdayKey = toDateKey(daysAgo(1));

  const todaySleep = wellness.find(
    (w) => w.date === todayKey && w.sleepMinutes != null
  );
  if (todaySleep?.sleepMinutes) {
    return { minutes: todaySleep.sleepMinutes, source: "manual" };
  }

  const yesterdaySleep = wellness.find(
    (w) => w.date === yesterdayKey && w.sleepMinutes != null
  );
  if (yesterdaySleep?.sleepMinutes) {
    return { minutes: yesterdaySleep.sleepMinutes, source: "manual" };
  }

  const recent = wellness.find((w) => w.sleepMinutes != null);
  return recent?.sleepMinutes
    ? { minutes: recent.sleepMinutes, source: "manual" }
    : { minutes: null, source: null };
}

function overallLabel(
  score: number
): RecoveryReadiness["label"] {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Moderate";
  return "Low";
}

function buildSummary(score: number, factors: RecoveryFactor[]): string {
  const weakest = [...factors]
    .filter((f) => f.available)
    .sort((a, b) => a.score - b.score)[0];

  if (score >= 85) {
    return "You're well recovered — a good day for planned training if you feel ready.";
  }
  if (score >= 70) {
    return "Recovery looks solid. Stick to your plan and keep easy days easy.";
  }
  if (score >= 50) {
    return weakest
      ? `${weakest.label} is holding you back — consider dialing back intensity.`
      : "Mixed signals — listen to your body and bias toward easy effort.";
  }
  return "Recovery is low — rest, sleep, and easy movement beat pushing through today.";
}

export function calculateRecoveryReadiness(
  wellness: WellnessSnapshot[],
  activities: ActivitySummary[],
  user?: {
    age: number | null;
    gender?: string | null;
    weightKg?: number | null;
    heightCm?: number | null;
  }
): RecoveryReadiness {
  const sleep = resolveLastNightSleep(wellness);
  const { rhr, source } = resolveTodayRhr(wellness, activities);
  const baselineRhr = resolveBaselineRhr(wellness, activities);

  const profile = buildAthleteProfile(
    {
      age: user?.age ?? null,
      gender: user?.gender ?? null,
      weightKg: user?.weightKg ?? null,
      heightCm: user?.heightCm ?? null,
    },
    rhr
  );

  const sleepFactor = scoreSleep(sleep.minutes, profile, sleep.source);
  const rhrFactor = scoreRestingHr(rhr, baselineRhr, profile, source);
  const loadFactor = scoreTrainingLoad(activities, profile);
  const factors = [sleepFactor, rhrFactor, loadFactor];

  const available = factors.filter((f) => f.available);
  if (available.length === 0) {
    return {
      score: null,
      label: "Unknown",
      summary:
        "Log sleep and resting heart rate from your watch to unlock a recovery readiness score.",
      factors,
      todayRestingHeartRate: rhr,
      restingHeartRateSource: source,
      lastNightSleepMinutes: sleep.minutes,
      sleepSource: sleep.source,
    };
  }

  const weights = { sleep: 0.35, restingHr: 0.35, trainingLoad: 0.3 };
  let weightSum = 0;
  let weighted = 0;

  for (const factor of factors) {
    if (!factor.available) continue;
    const w = weights[factor.id];
    weighted += factor.score * w;
    weightSum += w;
  }

  const score = Math.round(weighted / weightSum);

  return {
    score,
    label: overallLabel(score),
    summary: buildSummary(score, factors),
    factors,
    todayRestingHeartRate: rhr,
    restingHeartRateSource: source,
    lastNightSleepMinutes: sleep.minutes,
    sleepSource: sleep.source,
  };
}

export function wellnessDateKeysForLog(): {
  sleepDate: string;
  rhrDate: string;
} {
  return {
    sleepDate: toDateKey(daysAgo(1)),
    rhrDate: toDateKey(new Date()),
  };
}

export { toDateKey, parseDateKey };
