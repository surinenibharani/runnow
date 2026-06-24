import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  calculateRunStreak,
  generateSuggestions,
  findRouteComparisons,
} from "@/lib/run-analysis";
import { analyzePlanAlignment } from "@/lib/plan-alignment";
import { getOrCreateUserTrainingPlan } from "@/lib/teams";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [user, activities, stravaAccount, trainingPlan] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.activity.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      take: 100,
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
    completedIds: trainingPlan.completedIds,
    activities,
  });

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
    },
    alignment,
    streak,
    suggestions,
    routeComparisons,
    recentRuns,
    totalRuns: activities.length,
  });
}
