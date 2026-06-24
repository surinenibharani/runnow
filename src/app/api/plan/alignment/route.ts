import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { analyzePlanAlignment } from "@/lib/plan-alignment";
import { getOrCreateUserTrainingPlan } from "@/lib/teams";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const [trainingPlan, activities] = await Promise.all([
    getOrCreateUserTrainingPlan(userId),
    prisma.activity.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      take: 50,
    }),
  ]);

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
