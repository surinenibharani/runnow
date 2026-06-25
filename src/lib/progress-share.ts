import { SITE_URL } from "@/lib/site";

export type ProgressShareInput = {
  planId: string;
  planName: string;
  planDuration: string;
  week: number;
  totalWeeks: number;
  percentComplete: number;
  streak: number;
  completedCount: number;
  totalWorkouts: number;
};

export function buildProgressShareUrl(input: ProgressShareInput): string {
  const params = new URLSearchParams({
    plan: input.planId,
    name: input.planName,
    duration: input.planDuration,
    week: String(input.week),
    weeks: String(input.totalWeeks),
    percent: String(input.percentComplete),
    streak: String(input.streak),
    done: String(input.completedCount),
    total: String(input.totalWorkouts),
  });
  return `${SITE_URL}/plan/share?${params.toString()}`;
}

export function buildProgressShareMessage(input: ProgressShareInput): string {
  const url = buildProgressShareUrl(input);
  const headline =
    input.percentComplete >= 100
      ? `I finished my ${input.planName} plan (${input.planDuration})!`
      : `I just finished Week ${input.week} of my ${input.planName} plan!`;

  return `${headline}\n${input.percentComplete}% complete · ${input.completedCount}/${input.totalWorkouts} activities · ${input.streak}-day streak\n${url}`;
}

export function parseProgressShareParams(
  params: Record<string, string | string[] | undefined>
): ProgressShareInput | null {
  const planId = String(params.plan ?? "");
  const planName = String(params.name ?? "");
  const week = parseInt(String(params.week ?? ""), 10);
  const totalWeeks = parseInt(String(params.weeks ?? ""), 10);

  if (!planId || !planName || !Number.isFinite(week) || week < 1) {
    return null;
  }

  return {
    planId,
    planName,
    planDuration: String(params.duration ?? ""),
    week,
    totalWeeks: Number.isFinite(totalWeeks) ? totalWeeks : week,
    percentComplete: parseInt(String(params.percent ?? "0"), 10) || 0,
    streak: parseInt(String(params.streak ?? "0"), 10) || 0,
    completedCount: parseInt(String(params.done ?? "0"), 10) || 0,
    totalWorkouts: parseInt(String(params.total ?? "0"), 10) || 0,
  };
}
