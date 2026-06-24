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
import { calculatePaceInsights } from "@/lib/pace-analysis";
import {
  getChartRangeStart,
  parseChartTimeRange,
} from "@/lib/chart-time-range";
import { analyzePlanAlignment } from "@/lib/plan-alignment";
import { getOrCreateUserTrainingPlan } from "@/lib/teams";

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

  const [user, activities, chartActivities, stravaAccount, trainingPlan] =
    await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        role: true,
        subscriptionTier: true,
      },
    }),
    prisma.activity.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      take: 100,
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
  ]);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const streak = calculateRunStreak(activities);
  const suggestions = generateSuggestions(user, activities);
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
  const activityBreakdown = aggregateActivityTypes(chartActivities);
  const heartRateZones = aggregateHeartRateZones(chartActivities, user.age);
  const paceInsights = calculatePaceInsights(activities);

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
    paceInsights,
    recentRuns,
    totalRuns: activities.length,
  });
}
