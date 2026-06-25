import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getOrCreateUserTrainingPlan,
  updateUserTrainingPlan,
} from "@/lib/teams";
import { parseCompletedIdsFromDb, serializeCompletedIds } from "@/lib/plan-alignment";
import { getPlanById } from "@/lib/plans";
import { parseAge, parseFitnessLevel, type FitnessLevel } from "@/lib/plan-personalization";
import {
  buildPlanPersonalization,
  remapCompletedIds,
  resolveSchedulePrefs,
  resolveWorkoutDayId,
  sanitizeCompletedIds,
} from "@/lib/plan-validation";

const VALID_FITNESS_LEVELS: FitnessLevel[] = [
  "beginner",
  "returning",
  "intermediate",
  "advanced",
];

function isValidFitnessLevel(value: unknown): value is FitnessLevel {
  return (
    typeof value === "string" &&
    VALID_FITNESS_LEVELS.includes(value as FitnessLevel)
  );
}

function serializeTrainingPlan(plan: Awaited<ReturnType<typeof getOrCreateUserTrainingPlan>>) {
  const planMeta = getPlanById(plan.planId);
  return {
    planId: plan.planId,
    planName: planMeta?.name ?? plan.planId,
    currentWeek: plan.currentWeek,
    restDay: plan.restDay,
    longRunDay: plan.longRunDay,
    runDaysPerWeek: plan.runDaysPerWeek === 4 ? 4 : 3,
    age: plan.age,
    fitnessLevel: parseFitnessLevel(plan.fitnessLevel),
    goalRaceDate: plan.goalRaceDate?.toISOString() ?? null,
    completedIds: parseCompletedIdsFromDb(plan.completedIds),
    streak: plan.streak,
    lastCompletedDate: plan.lastCompletedDate?.toISOString() ?? null,
    startedAt: plan.startedAt.toISOString(),
  };
}

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

  return NextResponse.json(serializeTrainingPlan(plan));
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
    age,
    fitnessLevel,
    goalRaceDate,
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

  if (age !== undefined && age !== null) {
    const parsedAge = parseAge(age);
    if (parsedAge === null) {
      return NextResponse.json({ error: "Invalid age" }, { status: 400 });
    }
  }

  if (
    fitnessLevel !== undefined &&
    fitnessLevel !== null &&
    !isValidFitnessLevel(fitnessLevel)
  ) {
    return NextResponse.json({ error: "Invalid fitness level" }, { status: 400 });
  }

  if (goalRaceDate !== undefined && goalRaceDate !== null) {
    const parsed = new Date(goalRaceDate);
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json({ error: "Invalid goal race date" }, { status: 400 });
    }
  }

  const plan = await getOrCreateUserTrainingPlan(session.user.id);
  const targetPlanId = planId ?? plan.planId;
  const schedulePrefs = resolveSchedulePrefs(plan, {
    restDay,
    longRunDay,
    runDaysPerWeek,
  });
  const personalization = buildPlanPersonalization(
    age === undefined ? plan.age : parseAge(age),
    fitnessLevel === undefined ? plan.fitnessLevel : fitnessLevel,
    goalRaceDate === undefined
      ? plan.goalRaceDate
      : goalRaceDate === null
        ? null
        : new Date(goalRaceDate)
  );

  if (completedIds !== undefined) {
    const sanitized = sanitizeCompletedIds(
      completedIds,
      targetPlanId,
      schedulePrefs,
      personalization
    );
    if (!sanitized) {
      return NextResponse.json({ error: "Invalid completed workouts" }, { status: 400 });
    }
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

  const sanitizedCompleted =
    completedIds !== undefined
      ? sanitizeCompletedIds(
          completedIds,
          targetPlanId,
          schedulePrefs,
          personalization
        )!
      : undefined;

  const allowStreak = completedIds !== undefined;

  const updateData: Parameters<typeof updateUserTrainingPlan>[1] = {
    planId,
    currentWeek,
    restDay,
    longRunDay,
    runDaysPerWeek,
    age: age === undefined ? undefined : parseAge(age),
    fitnessLevel:
      fitnessLevel === undefined
        ? undefined
        : fitnessLevel === null
          ? null
          : parseFitnessLevel(fitnessLevel),
    goalRaceDate:
      goalRaceDate === undefined
        ? undefined
        : goalRaceDate === null
          ? null
          : new Date(goalRaceDate),
    completedIds: sanitizedCompleted,
    lastCompletedDate:
      lastCompletedDate === null
        ? null
        : lastCompletedDate
          ? new Date(lastCompletedDate)
          : undefined,
  };

  if (allowStreak && streak !== undefined && typeof streak === "number") {
    const maxStreak = sanitizedCompleted?.length ?? plan.streak;
    updateData.streak = Math.min(365, Math.max(0, streak), maxStreak);
  }

  const updated = await updateUserTrainingPlan(session.user.id, updateData);

  return NextResponse.json(serializeTrainingPlan(updated));
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    workoutId,
    completed,
    planId: bodyPlanId,
    restDay,
    longRunDay,
    runDaysPerWeek,
    age,
    fitnessLevel,
    goalRaceDate,
  } = body as {
    workoutId?: string;
    completed?: boolean;
    planId?: string;
    restDay?: number;
    longRunDay?: number;
    runDaysPerWeek?: number;
    age?: number | null;
    fitnessLevel?: string | null;
    goalRaceDate?: string | null;
  };

  if (!workoutId || typeof completed !== "boolean") {
    return NextResponse.json({ error: "workoutId and completed required" }, { status: 400 });
  }

  if (bodyPlanId !== undefined && !getPlanById(bodyPlanId)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (restDay !== undefined && (restDay < 1 || restDay > 7)) {
    return NextResponse.json({ error: "Invalid rest day" }, { status: 400 });
  }

  if (longRunDay !== undefined && (longRunDay < 1 || longRunDay > 7)) {
    return NextResponse.json({ error: "Invalid long run day" }, { status: 400 });
  }

  if (
    runDaysPerWeek !== undefined &&
    runDaysPerWeek !== 3 &&
    runDaysPerWeek !== 4
  ) {
    return NextResponse.json({ error: "Invalid run days per week" }, { status: 400 });
  }

  const plan = await getOrCreateUserTrainingPlan(session.user.id);
  const targetPlanId = bodyPlanId ?? plan.planId;
  const schedulePrefs = resolveSchedulePrefs(plan, {
    restDay,
    longRunDay,
    runDaysPerWeek,
  });
  const personalization = buildPlanPersonalization(
    age === undefined ? plan.age : parseAge(age),
    fitnessLevel === undefined ? plan.fitnessLevel : fitnessLevel,
    goalRaceDate === undefined
      ? plan.goalRaceDate
      : goalRaceDate === null
        ? null
        : new Date(goalRaceDate)
  );

  const canonicalId = resolveWorkoutDayId(
    workoutId,
    targetPlanId,
    schedulePrefs,
    personalization
  );

  if (!canonicalId) {
    return NextResponse.json({ error: "Invalid workout" }, { status: 400 });
  }

  const existingIds = parseCompletedIdsFromDb(plan.completedIds);
  const remappedIds = remapCompletedIds(
    existingIds,
    targetPlanId,
    schedulePrefs,
    personalization
  );

  const next = completed
    ? [...new Set([...remappedIds, canonicalId])]
    : remappedIds.filter((id) => id !== canonicalId);

  const { streak, lastCompletedDate } = computeStreak(
    completed,
    plan.streak,
    plan.lastCompletedDate
  );

  const updated = await updateUserTrainingPlan(session.user.id, {
    ...(bodyPlanId !== undefined && { planId: bodyPlanId }),
    ...(restDay !== undefined && { restDay }),
    ...(longRunDay !== undefined && { longRunDay }),
    ...(runDaysPerWeek !== undefined && { runDaysPerWeek }),
    ...(age !== undefined && { age: parseAge(age) }),
    ...(fitnessLevel !== undefined && {
      fitnessLevel:
        fitnessLevel === null ? null : parseFitnessLevel(fitnessLevel),
    }),
    ...(goalRaceDate !== undefined && {
      goalRaceDate:
        goalRaceDate === null ? null : new Date(goalRaceDate),
    }),
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
