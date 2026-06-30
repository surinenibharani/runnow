import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { activitySummarySelect } from "@/lib/activity-fields";
import { analyzePlanAlignment } from "@/lib/plan-alignment";
import { getUserTrainingPlan } from "@/lib/teams";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const [trainingPlan, activities] = await Promise.all([
    getUserTrainingPlan(userId),
    prisma.activity.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      take: 50,
      select: activitySummarySelect,
    }),
  ]);

  if (!trainingPlan) {
    return NextResponse.json({ alignment: null });
  }

  const alignment = analyzePlanAlignment({
    planId: trainingPlan.planId,
    currentWeek: trainingPlan.currentWeek,
    restDay: trainingPlan.restDay,
    longRunDay: trainingPlan.longRunDay,
    runDaysPerWeek: trainingPlan.runDaysPerWeek,
    completedIds: trainingPlan.completedIds,
    activities,
  });

  return NextResponse.json({ alignment });
}
