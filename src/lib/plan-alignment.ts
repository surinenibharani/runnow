import type { ActivitySummary } from "@/lib/activity-fields";
import type { ScheduleDay, ScheduledWeek } from "@/lib/plan-types";
import { applyScheduleToPlan } from "@/lib/schedule-builder";
import { getPlanById, DEFAULT_PLAN_ID } from "@/lib/plans";
import { formatDistance, formatDuration } from "@/lib/strava";

export type AlignmentStatus = "completed" | "missed" | "today" | "upcoming" | "rest";

export type DayAlignment = {
  dayId: string;
  dayName: string;
  dayOfWeek: number;
  date: string;
  kind: ScheduleDay["kind"];
  label: string;
  status: AlignmentStatus;
  stravaMatch: {
    id: string;
    name: string;
    distance: string;
    duration: string;
    startDate: string;
  } | null;
};

export type PlanAlignmentSummary = {
  planId: string;
  planName: string;
  currentWeek: number;
  weekTitle: string;
  weekFocus: string;
  completed: number;
  total: number;
  alignmentPercent: number;
  days: DayAlignment[];
  message: string;
};

function isRunType(type: string): boolean {
  const t = type.toLowerCase();
  return t.includes("run") || t === "trailrun" || t === "virtualrun";
}

function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dateForDayOfWeek(weekMonday: Date, dow: number): Date {
  const d = new Date(weekMonday);
  d.setDate(d.getDate() + (dow - 1));
  return d;
}

function parseCompletedIds(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseCompletedIdsFromDb(json: string): string[] {
  return parseCompletedIds(json);
}

export function serializeCompletedIds(ids: string[]): string {
  return JSON.stringify(ids);
}

type AlignmentInput = {
  planId: string;
  currentWeek: number;
  restDay: number;
  longRunDay: number;
  runDaysPerWeek?: number;
  completedIds: string;
  activities: ActivitySummary[];
};

export function analyzePlanAlignment(input: AlignmentInput): PlanAlignmentSummary | null {
  const plan = getPlanById(input.planId) ?? getPlanById(DEFAULT_PLAN_ID);
  if (!plan) return null;

  const scheduled = applyScheduleToPlan(plan, {
    restDay: input.restDay,
    longRunDay: input.longRunDay,
    runDaysPerWeek: input.runDaysPerWeek === 4 ? 4 : 3,
  });

  const weekIndex = Math.min(
    Math.max(input.currentWeek, 1),
    scheduled.scheduledWeeks.length
  ) - 1;

  const week: ScheduledWeek = scheduled.scheduledWeeks[weekIndex];
  const weekMonday = getMonday(new Date());
  const todayKey = toDateKey(new Date());
  const completedSet = new Set(parseCompletedIds(input.completedIds));

  const activitiesByDate = new Map<string, ActivitySummary[]>();
  for (const a of input.activities) {
    const key = toDateKey(a.startDate);
    const list = activitiesByDate.get(key) ?? [];
    list.push(a);
    activitiesByDate.set(key, list);
  }

  const days: DayAlignment[] = week.days.map((day) => {
    const date = dateForDayOfWeek(weekMonday, day.dayOfWeek);
    const dateKey = toDateKey(date);

    let label = "Rest";
    if (day.kind === "run" && day.run) label = day.run.name;
    if (day.kind === "cross-train" && day.crossTraining) label = day.crossTraining.name;

    const dayActivities = activitiesByDate.get(dateKey) ?? [];
    const runMatch = dayActivities.find((a) => isRunType(a.type));
    const anyMatch = dayActivities[0] ?? null;

    let status: AlignmentStatus = "upcoming";
    if (dateKey < todayKey) {
      status = "missed";
    } else if (dateKey === todayKey) {
      status = "today";
    }

    if (day.kind === "rest") {
      status = dateKey <= todayKey ? "rest" : "upcoming";
      return {
        dayId: day.id,
        dayName: day.dayName,
        dayOfWeek: day.dayOfWeek,
        date: dateKey,
        kind: day.kind,
        label: "Rest day",
        status,
        stravaMatch: null,
      };
    }

    const manuallyDone = completedSet.has(day.id) || (day.run && completedSet.has(day.run.id));

    let stravaMatch: DayAlignment["stravaMatch"] = null;
    if (day.kind === "run" && runMatch) {
      stravaMatch = {
        id: runMatch.id,
        name: runMatch.name,
        distance: formatDistance(runMatch.distance),
        duration: formatDuration(runMatch.movingTime),
        startDate: runMatch.startDate.toISOString(),
      };
      status = "completed";
    } else if (day.kind === "cross-train" && anyMatch) {
      stravaMatch = {
        id: anyMatch.id,
        name: anyMatch.name,
        distance: formatDistance(anyMatch.distance),
        duration: formatDuration(anyMatch.movingTime),
        startDate: anyMatch.startDate.toISOString(),
      };
      status = "completed";
    } else if (manuallyDone) {
      status = "completed";
    }

    return {
      dayId: day.id,
      dayName: day.dayName,
      dayOfWeek: day.dayOfWeek,
      date: dateKey,
      kind: day.kind,
      label,
      status,
      stravaMatch,
    };
  });

  const actionable = days.filter((d) => d.kind !== "rest");
  const completed = actionable.filter((d) => d.status === "completed").length;
  const total = actionable.length;
  const alignmentPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  let message = "Connect Strava and sync to auto-match runs with your plan.";
  if (completed === total && total > 0) {
    message = "Perfect week so far — every planned session is done!";
  } else if (completed > 0) {
    message = `${completed} of ${total} planned sessions matched this week.`;
  } else if (total > 0) {
    message = "No Strava matches yet this week — check your schedule and get moving!";
  }

  return {
    planId: plan.id,
    planName: plan.name,
    currentWeek: week.week,
    weekTitle: week.title,
    weekFocus: week.focus,
    completed,
    total,
    alignmentPercent,
    days,
    message,
  };
}
