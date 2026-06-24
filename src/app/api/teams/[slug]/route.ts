import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { activitySummarySelect, groupActivitiesByUser } from "@/lib/activity-fields";
import { analyzePlanAlignment } from "@/lib/plan-alignment";
import { calculateRunStreak } from "@/lib/run-analysis";
import { getOrCreateUserTrainingPlan } from "@/lib/teams";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;

  const team = await prisma.team.findUnique({
    where: { slug },
    include: {
      coach: { select: { id: true, name: true, email: true } },
      members: {
        where: { status: "APPROVED" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              stravaAccount: { select: { athleteId: true } },
            },
          },
        },
      },
    },
  });

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  const isCoach = team.coachId === session.user.id;
  const isMember = team.members.some((m) => m.userId === session.user.id);

  if (!isCoach && !isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pending = isCoach
    ? await prisma.teamMember.findMany({
        where: { teamId: team.id, status: "PENDING" },
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "asc" },
      })
    : [];

  const memberUserIds = team.members.map((m) => m.user.id);

  const [allActivities, allPlans, allStravaAccounts] = await Promise.all([
    prisma.activity.findMany({
      where: { userId: { in: memberUserIds } },
      orderBy: { startDate: "desc" },
      select: activitySummarySelect,
    }),
    prisma.userTrainingPlan.findMany({
      where: { userId: { in: memberUserIds } },
    }),
    prisma.stravaAccount.findMany({
      where: { userId: { in: memberUserIds } },
      select: { userId: true, athleteId: true },
    }),
  ]);

  const activitiesByUser = groupActivitiesByUser(allActivities, memberUserIds, 50);
  const plansByUser = new Map(allPlans.map((p) => [p.userId, p]));
  const stravaByUser = new Map(allStravaAccounts.map((s) => [s.userId, s]));

  const memberStats = await Promise.all(
    team.members.map(async (member) => {
      const userId = member.user.id;
      const activities = activitiesByUser.get(userId) ?? [];
      const stravaAccount = stravaByUser.get(userId);
      const trainingPlan = plansByUser.get(userId);

      const streak = calculateRunStreak(activities);
      const plan = trainingPlan ?? (await getOrCreateUserTrainingPlan(userId));

      const alignment = analyzePlanAlignment({
        planId: plan.planId,
        currentWeek: plan.currentWeek,
        restDay: plan.restDay,
        longRunDay: plan.longRunDay,
        runDaysPerWeek: plan.runDaysPerWeek,
        completedIds: plan.completedIds,
        activities,
      });

      return {
        user: member.user,
        stravaConnected: !!stravaAccount,
        streak,
        totalRuns: activities.length,
        alignment: alignment
          ? {
              planName: alignment.planName,
              currentWeek: alignment.currentWeek,
              alignmentPercent: alignment.alignmentPercent,
              completed: alignment.completed,
              total: alignment.total,
              message: alignment.message,
            }
          : null,
        recentRuns: activities.slice(0, 3).map((a) => ({
          name: a.name,
          startDate: a.startDate.toISOString(),
          distance: a.distance,
          movingTime: a.movingTime,
        })),
      };
    })
  );

  return NextResponse.json({
    team: {
      id: team.id,
      name: team.name,
      slug: team.slug,
      description: team.description,
      inviteCode: isCoach ? team.inviteCode : undefined,
      coach: team.coach,
    },
    isCoach,
    pending,
    members: memberStats,
  });
}
