import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { activitySummarySelect } from "@/lib/activity-fields";
import {
  calculateRunStreak,
  generateSuggestions,
  findRouteComparisons,
} from "@/lib/run-analysis";
import {
  aggregateActivityTypes,
  aggregateHeartRateZones,
} from "@/lib/activity-charts";
import { formatActivityType } from "@/lib/activity-types";
import { calculatePaceInsights } from "@/lib/pace-analysis";
import {
  getChartRangeStart,
  parseChartTimeRange,
} from "@/lib/chart-time-range";
import { analyzePlanAlignment } from "@/lib/plan-alignment";
import { calculateRecoveryReadiness, toDateKey } from "@/lib/recovery-readiness";
import { buildAthleteProfile } from "@/lib/athlete-profile";
import { getOrCreateUserTrainingPlan } from "@/lib/teams";

function isRunActivity(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

function resolveRestingHeartRate(
  wellness: Array<{ restingHeartRate: number | null }>
): number | null {
  return wellness.find((w) => w.restingHeartRate != null)?.restingHeartRate ?? null;
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const chartTimeRange = parseChartTimeRange(
    new URL(request.url).searchParams.get("range")
  );
  const chartRangeStart = getChartRangeStart(chartTimeRange);

  const [user, activities, chartActivities, stravaAccount, trainingPlan, wellnessRows] =
    await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        gender: true,
        weightKg: true,
        heightCm: true,
        role: true,
        subscriptionTier: true,
      },
    }),
    prisma.activity.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      take: 500,
      select: activitySummarySelect,
    }),
    prisma.activity.findMany({
      where: {
        userId,
        ...(chartRangeStart
          ? { startDate: { gte: chartRangeStart } }
          : {}),
      },
      orderBy: { startDate: "desc" },
      select: activitySummarySelect,
    }),
    prisma.stravaAccount.findUnique({ where: { userId } }),
    getOrCreateUserTrainingPlan(userId),
    prisma.dailyWellness.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 30,
    }),
  ]);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const wellness = wellnessRows.map((w) => ({
    date: toDateKey(w.date),
    sleepMinutes: w.sleepMinutes,
    restingHeartRate: w.restingHeartRate,
    source: w.source,
  }));

  const streak = calculateRunStreak(activities);
  const restingHeartRate = resolveRestingHeartRate(wellness);
  const athleteProfile = buildAthleteProfile(user, restingHeartRate);
  const suggestions = generateSuggestions(user, activities, restingHeartRate);
  const routeComparisons = findRouteComparisons(activities);
  const alignment = analyzePlanAlignment({
    planId: trainingPlan.planId,
    currentWeek: trainingPlan.currentWeek,
    restDay: trainingPlan.restDay,
    longRunDay: trainingPlan.longRunDay,
    runDaysPerWeek: trainingPlan.runDaysPerWeek,
    completedIds: trainingPlan.completedIds,
    activities,
  });

  const hrProfile = athleteProfile;
  const activityBreakdown = aggregateActivityTypes(chartActivities);
  const heartRateZones = aggregateHeartRateZones(chartActivities, hrProfile);
  const paceInsights = calculatePaceInsights(activities, athleteProfile);

  const hrActivities = chartActivities.map((a) => ({
    id: a.id,
    name: a.name,
    type: a.type,
    activityLabel: formatActivityType(a.type, a.name),
    startDate: a.startDate.toISOString(),
    averageHeartrate: a.averageHeartrate,
    movingTime: a.movingTime,
  }));

  const activityList = chartActivities.map((a) => ({
    id: a.id,
    name: a.name,
    type: a.type,
    activityLabel: formatActivityType(a.type, a.name),
    startDate: a.startDate.toISOString(),
    movingTime: a.movingTime,
    distance: a.distance,
  }));

  const recovery = calculateRecoveryReadiness(wellness, activities, user);

  const recentRuns = activities.slice(0, 10).map((a) => ({
    id: a.id,
    stravaId: a.stravaId,
    name: a.name,
    type: a.type,
    distance: a.distance,
    movingTime: a.movingTime,
    averageHeartrate: a.averageHeartrate,
    maxHeartrate: a.maxHeartrate,
    startDate: a.startDate.toISOString(),
    routeKey: a.routeKey,
  }));

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      weightKg: user.weightKg,
      heightCm: user.heightCm,
      role: user.role,
      subscriptionTier: user.subscriptionTier,
    },
    stravaConnected: !!stravaAccount,
    stravaAthleteId: stravaAccount?.athleteId ?? null,
    stravaLastSyncedAt: stravaAccount?.lastSyncedAt?.toISOString() ?? null,
    stravaProfileUrl: stravaAccount
      ? `https://www.strava.com/athletes/${stravaAccount.athleteId}`
      : null,
    trainingPlan: {
      planId: trainingPlan.planId,
      currentWeek: trainingPlan.currentWeek,
      restDay: trainingPlan.restDay,
      longRunDay: trainingPlan.longRunDay,
      runDaysPerWeek: trainingPlan.runDaysPerWeek === 4 ? 4 : 3,
    },
    alignment,
    streak,
    suggestions,
    routeComparisons,
    chartTimeRange,
    activityBreakdown,
    heartRateZones,
    hrZoneMethod: hrProfile.restingHeartRate ? "karvonen" : "percent_max",
    hrActivities,
    activityList,
    recovery,
    paceInsights,
    recentRuns,
    totalRuns: activities.filter((a) => isRunActivity(a.type)).length,
    totalActivities: activities.length,
  });
}
