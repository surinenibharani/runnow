import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getOrCreateUserTrainingPlan,
  updateUserTrainingPlan,
} from "@/lib/teams";
import { parseCompletedIdsFromDb, serializeCompletedIds } from "@/lib/plan-alignment";
import { getPlanById } from "@/lib/plans";

function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function isToday(date: Date): boolean {
  return date.toDateString() === new Date().toDateString();
}

function computeStreak(
  completed: boolean,
  currentStreak: number,
  lastCompletedDate: Date | null
): { streak: number; lastCompletedDate: Date | null } {
  if (!completed) {
    return { streak: currentStreak, lastCompletedDate };
  }

  const now = new Date();
  if (!lastCompletedDate) {
    return { streak: 1, lastCompletedDate: now };
  }
  if (isToday(lastCompletedDate)) {
    return { streak: currentStreak, lastCompletedDate };
  }
  if (isYesterday(lastCompletedDate)) {
    return { streak: currentStreak + 1, lastCompletedDate: now };
  }
  return { streak: 1, lastCompletedDate: now };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plan = await getOrCreateUserTrainingPlan(session.user.id);
  const planMeta = getPlanById(plan.planId);

  return NextResponse.json({
    planId: plan.planId,
    planName: planMeta?.name ?? plan.planId,
    currentWeek: plan.currentWeek,
    restDay: plan.restDay,
    longRunDay: plan.longRunDay,
    runDaysPerWeek: plan.runDaysPerWeek === 4 ? 4 : 3,
    completedIds: parseCompletedIdsFromDb(plan.completedIds),
    streak: plan.streak,
    lastCompletedDate: plan.lastCompletedDate?.toISOString() ?? null,
    startedAt: plan.startedAt.toISOString(),
  });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    planId,
    currentWeek,
    restDay,
    longRunDay,
    runDaysPerWeek,
    completedIds,
    streak,
    lastCompletedDate,
  } = body;

  if (currentWeek !== undefined && (currentWeek < 1 || currentWeek > 52)) {
    return NextResponse.json({ error: "Invalid week" }, { status: 400 });
  }

  if (completedIds !== undefined && !Array.isArray(completedIds)) {
    return NextResponse.json({ error: "completedIds must be an array" }, { status: 400 });
  }

  if (runDaysPerWeek !== undefined && runDaysPerWeek !== 3 && runDaysPerWeek !== 4) {
    return NextResponse.json({ error: "Invalid run days per week" }, { status: 400 });
  }

  if (planId !== undefined && !getPlanById(planId)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (restDay !== undefined && (restDay < 1 || restDay > 7)) {
    return NextResponse.json({ error: "Invalid rest day" }, { status: 400 });
  }

  if (longRunDay !== undefined && (longRunDay < 1 || longRunDay > 7)) {
    return NextResponse.json({ error: "Invalid long run day" }, { status: 400 });
  }

  if (
    restDay !== undefined &&
    longRunDay !== undefined &&
    restDay === longRunDay
  ) {
    return NextResponse.json(
      { error: "Rest day and long run day must differ" },
      { status: 400 }
    );
  }

  const allowStreak = completedIds !== undefined;
  const updateData: Parameters<typeof updateUserTrainingPlan>[1] = {
    planId,
    currentWeek,
    restDay,
    longRunDay,
    runDaysPerWeek,
    completedIds,
    lastCompletedDate:
      lastCompletedDate === null
        ? null
        : lastCompletedDate
          ? new Date(lastCompletedDate)
          : undefined,
  };

  if (allowStreak && streak !== undefined) {
    updateData.streak = typeof streak === "number" ? Math.max(0, streak) : 0;
  }

  const updated = await updateUserTrainingPlan(session.user.id, updateData);

  return NextResponse.json({
    planId: updated.planId,
    currentWeek: updated.currentWeek,
    restDay: updated.restDay,
    longRunDay: updated.longRunDay,
    runDaysPerWeek: updated.runDaysPerWeek === 4 ? 4 : 3,
    completedIds: parseCompletedIdsFromDb(updated.completedIds),
    streak: updated.streak,
    lastCompletedDate: updated.lastCompletedDate?.toISOString() ?? null,
  });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { workoutId, completed } = body as { workoutId?: string; completed?: boolean };

  if (!workoutId || typeof completed !== "boolean") {
    return NextResponse.json({ error: "workoutId and completed required" }, { status: 400 });
  }

  const plan = await getOrCreateUserTrainingPlan(session.user.id);
  const ids = parseCompletedIdsFromDb(plan.completedIds);
  const next = completed
    ? [...new Set([...ids, workoutId])]
    : ids.filter((id) => id !== workoutId);

  const { streak, lastCompletedDate } = computeStreak(
    completed,
    plan.streak,
    plan.lastCompletedDate
  );

  const updated = await updateUserTrainingPlan(session.user.id, {
    completedIds: next,
    streak,
    lastCompletedDate,
  });

  return NextResponse.json({
    completedIds: parseCompletedIdsFromDb(updated.completedIds),
    streak: updated.streak,
    lastCompletedDate: updated.lastCompletedDate?.toISOString() ?? null,
  });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updated = await updateUserTrainingPlan(session.user.id, {
    completedIds: [],
    streak: 0,
    lastCompletedDate: null,
    currentWeek: 1,
  });

  return NextResponse.json({
    completedIds: parseCompletedIdsFromDb(updated.completedIds),
    streak: updated.streak,
    currentWeek: updated.currentWeek,
  });
}
