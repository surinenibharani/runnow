import type { User } from "@prisma/client";
import type { ActivitySummary } from "@/lib/activity-fields";
import {
  buildAthleteProfile,
  estimateMaxHeartRate,
  getEasyHeartRateRange,
  getWeeklyMileageCaps,
  hasPersonalizationData,
} from "@/lib/athlete-profile";
import {
  formatDistance,
  formatDuration,
  formatPace,
} from "@/lib/strava";
import {
  formatElevationFeet,
  weeklyElevationFeet,
  WORKOUT_TYPE_LABELS,
} from "@/lib/strava-training-load";

export interface RunStreak {
  current: number;
  longest: number;
  lastRunDate: string | null;
}

export interface RunSuggestion {
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
}

export interface RouteComparison {
  routeKey: string;
  routeLabel: string;
  current: {
    id: string;
    name: string;
    date: string;
    distance: string;
    duration: string;
    pace: string;
    avgHr: number | null;
  };
  previous: {
    id: string;
    name: string;
    date: string;
    distance: string;
    duration: string;
    pace: string;
    avgHr: number | null;
  } | null;
  delta: {
    paceSeconds: number;
    durationSeconds: number;
    hrBpm: number | null;
    summary: string;
  } | null;
}

function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function isRunActivity(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

export function calculateRunStreak(activities: ActivitySummary[]): RunStreak {
  const runDays = [
    ...new Set(
      activities
        .filter((a) => isRunActivity(a.type))
        .map((a) => toDateKey(a.startDate))
    ),
  ].sort();

  if (runDays.length === 0) {
    return { current: 0, longest: 0, lastRunDate: null };
  }

  let longest = 1;
  let current = 1;

  for (let i = 1; i < runDays.length; i++) {
    const prev = new Date(runDays[i - 1]);
    const curr = new Date(runDays[i]);
    const diffDays = Math.round(
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  const lastRunDate = runDays[runDays.length - 1];
  const today = toDateKey(new Date());
  const yesterday = toDateKey(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  let currentStreak = 0;
  if (lastRunDate === today || lastRunDate === yesterday) {
    currentStreak = 1;
    for (let i = runDays.length - 2; i >= 0; i--) {
      const prev = new Date(runDays[i]);
      const next = new Date(runDays[i + 1]);
      const diff = Math.round(
        (next.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff === 1) currentStreak++;
      else break;
    }
  }

  return {
    current: currentStreak,
    longest: Math.max(longest, currentStreak),
    lastRunDate,
  };
}

export function generateSuggestions(
  user: Pick<User, "age" | "gender" | "weightKg" | "heightCm">,
  activities: ActivitySummary[],
  restingHeartRate: number | null = null
): RunSuggestion[] {
  const suggestions: RunSuggestion[] = [];
  const runs = activities
    .filter((a) => isRunActivity(a.type))
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  if (runs.length === 0) {
    suggestions.push({
      title: "Sync your Strava runs",
      detail:
        "Connect Strava and sync activities to get personalized coaching tips based on your heart rate and run type.",
      priority: "high",
    });
    return suggestions;
  }

  const latest = runs[0];
  const profile = buildAthleteProfile(user, restingHeartRate);
  const maxHrEstimate = estimateMaxHeartRate(profile);
  const easyHr = getEasyHeartRateRange(profile);

  if (latest.averageHeartrate) {
    const hrPercent = (latest.averageHeartrate / maxHrEstimate) * 100;

    if (hrPercent > 85) {
      suggestions.push({
        title: "Ease the pace on easy days",
        detail: `Your last run averaged ${Math.round(latest.averageHeartrate)} bpm (~${Math.round(hrPercent)}% of your estimated max). For recovery and easy runs, aim for ${easyHr.min}–${easyHr.max} bpm (${easyHr.method === "karvonen" ? "heart-rate reserve" : "% max"} zones).`,
        priority: "high",
      });
    } else if (hrPercent < 60 && latest.distance > 5000) {
      suggestions.push({
        title: "Great aerobic effort",
        detail: `Heart rate stayed low at ${Math.round(latest.averageHeartrate)} bpm — this builds endurance efficiently. Keep most runs in this zone.`,
        priority: "low",
      });
    }
  } else {
    suggestions.push({
      title: "Enable heart rate tracking",
      detail:
        "Your recent runs lack HR data. A chest strap or watch with HR unlocks better pacing and recovery advice.",
      priority: "medium",
    });
  }

  const type = latest.type.toLowerCase();
  if (type.includes("trail")) {
    suggestions.push({
      title: "Trail run recovery",
      detail:
        "Trail runs stress stabilizer muscles. Add hip mobility (Pigeon Pose, clamshells) and an easy spin or walk tomorrow.",
      priority: "medium",
    });
  } else if (type === "virtualrun") {
    suggestions.push({
      title: "Treadmill tip",
      detail:
        "Set 1% incline on treadmill runs to better match outdoor effort. Follow with calf stretches.",
      priority: "low",
    });
  }

  const last7 = runs.filter(
    (r) => r.startDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const totalMiles7 =
    last7.reduce((s, r) => s + r.distance, 0) / 1609.34;
  const { softCap, hardCap } = getWeeklyMileageCaps(profile);

  if (totalMiles7 > hardCap) {
    suggestions.push({
      title: "Watch weekly volume",
      detail: `You've logged ${totalMiles7.toFixed(1)} miles in 7 days — above ~${hardCap} mi suggested for your age, sex, and BMI profile. Consider capping increases at ~10% per week.`,
      priority: "high",
    });
  } else if (totalMiles7 > softCap) {
    suggestions.push({
      title: "High weekly mileage",
      detail: `${totalMiles7.toFixed(1)} miles this week is near your profile's ~${softCap} mi comfort zone — extra sleep and easy days help you absorb the load.`,
      priority: "medium",
    });
  } else if (totalMiles7 < 5 && runs.length >= 2) {
    suggestions.push({
      title: "Build consistency",
      detail:
        "Under 5 miles this week. Short, frequent runs beat occasional long ones when building a habit.",
      priority: "medium",
    });
  }

  const longRuns = runs.filter((r) => r.distance > 10000);
  if (longRuns.length > 0) {
    const lastLong = longRuns[0];
    const daysSinceLong = Math.floor(
      (Date.now() - lastLong.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLong <= 2) {
      suggestions.push({
        title: "Post-long-run recovery",
        detail:
          "Within 48h of a long run: sleep extra, hydrate, and skip hard intervals. Yoga and easy walking only.",
        priority: "high",
      });
    }
  }

  const weekElevationFt = weeklyElevationFeet(runs, 7);
  if (weekElevationFt >= 2000) {
    suggestions.push({
      title: "Big climbing week",
      detail: `About ${Math.round(weekElevationFt).toLocaleString()} ft of gain in 7 days — downhill soreness peaks 24–48h later. Keep the next run easy and flat if legs feel beat up.`,
      priority: "high",
    });
  } else if (weekElevationFt >= 1200) {
    suggestions.push({
      title: "Hilly week",
      detail: `${Math.round(weekElevationFt).toLocaleString()} ft climbed this week. Hills count as extra load even at easy pace — favor recovery sleep.`,
      priority: "medium",
    });
  }

  const highSuffer = last7.filter((r) => (r.sufferScore ?? 0) >= 80);
  if (highSuffer.length >= 2) {
    suggestions.push({
      title: "Stacked hard efforts",
      detail: `${highSuffer.length} high-effort sessions this week (Strava relative effort). Slot an extra easy or rest day before the next workout.`,
      priority: "high",
    });
  }

  if (latest.workoutType === 3 && latest.averageHeartrate) {
    suggestions.push({
      title: "Workout day logged",
      detail: `Your latest run was tagged as a ${WORKOUT_TYPE_LABELS[3]} — follow with easy miles or cross-training, not back-to-back intensity.`,
      priority: "medium",
    });
  }

  if (latest.averageCadence != null && latest.averageCadence > 0 && latest.averageCadence < 160) {
    suggestions.push({
      title: "Cadence check",
      detail: `Last run cadence was ~${Math.round(latest.averageCadence)} spm. If you tend to overstride, experimenting with slightly quicker, shorter steps can help — there's no single "correct" cadence, so change it gradually and keep what feels smooth.`,
      priority: "low",
    });
  }

  const latestElev = formatElevationFeet(latest.elevationGain);
  if (latestElev && (latest.elevationGain ?? 0) > 150) {
    suggestions.push({
      title: "Hill run recovery",
      detail: `Latest run had ${latestElev} of climbing — quads and calves need extra mobility and hydration tomorrow.`,
      priority: "medium",
    });
  }

  if (!hasPersonalizationData(profile)) {
    suggestions.push({
      title: "Complete your profile",
      detail:
        "Add age, sex, weight, and height in your profile for heart rate zones, recovery scoring, and mileage guidance tuned to you.",
      priority: "medium",
    });
  } else if (!user.age) {
    suggestions.push({
      title: "Add your age",
      detail:
        "Age sharpens max heart rate estimates — update it in your profile for better zone accuracy.",
      priority: "medium",
    });
  }

  return suggestions.slice(0, 5);
}

export function findRouteComparisons(activities: ActivitySummary[]): RouteComparison[] {
  const runs = activities
    .filter((a) => isRunActivity(a.type) && a.routeKey)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  const byRoute = new Map<string, ActivitySummary[]>();
  for (const run of runs) {
    if (!run.routeKey) continue;
    const list = byRoute.get(run.routeKey) ?? [];
    list.push(run);
    byRoute.set(run.routeKey, list);
  }

  const comparisons: RouteComparison[] = [];

  for (const [routeKey, routeRuns] of byRoute) {
    if (routeRuns.length < 2) continue;

    const current = routeRuns[0];
    const previous = routeRuns[1];

    const currentSpeed = current.distance / current.movingTime;
    const prevSpeed = previous.distance / previous.movingTime;

    const paceDeltaSec = 1609.34 / currentSpeed - 1609.34 / prevSpeed;
    const durationDelta = current.movingTime - previous.movingTime;
    const hrDelta =
      current.averageHeartrate && previous.averageHeartrate
        ? current.averageHeartrate - previous.averageHeartrate
        : null;

    let summary: string;
    if (paceDeltaSec < -10) {
      summary = `Faster by ${Math.abs(Math.round(paceDeltaSec))} sec/mi on this route — nice progress!`;
    } else if (paceDeltaSec > 10) {
      summary = `Slower by ${Math.round(paceDeltaSec)} sec/mi — could be fatigue, heat, or intentional recovery pace.`;
    } else {
      summary = "Very similar pace to your last time on this route.";
    }

    if (hrDelta != null && hrDelta < -5) {
      summary += ` HR was ${Math.abs(Math.round(hrDelta))} bpm lower — improved efficiency.`;
    } else if (hrDelta != null && hrDelta > 5) {
      summary += ` HR was ${Math.round(hrDelta)} bpm higher — check sleep, hydration, and recovery.`;
    }

    comparisons.push({
      routeKey,
      routeLabel: current.name || `Route ${routeKey}`,
      current: {
        id: current.id,
        name: current.name,
        date: current.startDate.toISOString(),
        distance: formatDistance(current.distance),
        duration: formatDuration(current.movingTime),
        pace: formatPace(currentSpeed),
        avgHr: current.averageHeartrate,
      },
      previous: {
        id: previous.id,
        name: previous.name,
        date: previous.startDate.toISOString(),
        distance: formatDistance(previous.distance),
        duration: formatDuration(previous.movingTime),
        pace: formatPace(prevSpeed),
        avgHr: previous.averageHeartrate,
      },
      delta: {
        paceSeconds: paceDeltaSec,
        durationSeconds: durationDelta,
        hrBpm: hrDelta,
        summary,
      },
    });
  }

  return comparisons.slice(0, 10);
}
