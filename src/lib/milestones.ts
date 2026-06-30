export type MilestoneKind =
  | "week-complete"
  | "plan-complete"
  | "percent-25"
  | "percent-50"
  | "percent-75";

export type MilestoneHighlight = {
  kind: MilestoneKind;
  week?: number;
};

const PERCENT_MILESTONES = [25, 50, 75] as const;

export function detectProgressMilestone(
  prevPercent: number,
  nextPercent: number,
  prevWeekDone: boolean,
  nextWeekDone: boolean,
  week: number
): MilestoneHighlight | null {
  if (nextPercent >= 100 && prevPercent < 100) {
    return { kind: "plan-complete" };
  }

  if (nextWeekDone && !prevWeekDone) {
    return { kind: "week-complete", week };
  }

  for (const threshold of PERCENT_MILESTONES) {
    const kind = `percent-${threshold}` as MilestoneKind;
    if (prevPercent < threshold && nextPercent >= threshold) {
      return { kind };
    }
  }

  return null;
}

export function milestoneHeadline(highlight: MilestoneHighlight): string {
  switch (highlight.kind) {
    case "plan-complete":
      return "Plan complete — share your finish!";
    case "week-complete":
      return `Week ${highlight.week ?? ""} done — share your progress!`.trim();
    case "percent-25":
      return "25% through your plan — nice work!";
    case "percent-50":
      return "Halfway there — share the milestone!";
    case "percent-75":
      return "75% complete — almost there!";
    default:
      return "Share your progress";
  }
}

export function percentComplete(
  completed: string[],
  planDayIds: string[],
  totalWorkouts: number
): number {
  const count = completed.filter((id) => planDayIds.includes(id)).length;
  return totalWorkouts ? Math.round((count / totalWorkouts) * 100) : 0;
}

export function isWeekComplete(
  weeks: { week: number; days: { id: string; kind: string }[] }[],
  weekNumber: number,
  completed: string[]
): boolean {
  const week = weeks.find((w) => w.week === weekNumber);
  if (!week) return false;
  const ids = week.days.filter((d) => d.kind !== "rest").map((d) => d.id);
  return ids.length > 0 && ids.every((id) => completed.includes(id));
}
