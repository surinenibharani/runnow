import type { PlanAlignmentSummary } from "@/lib/plan-alignment";
import type { RecoveryReadiness } from "@/lib/recovery-readiness";
import type { PaceInsights } from "@/lib/pace-analysis";
import type { RunSuggestion, RunStreak } from "@/lib/run-analysis";
import type { TrainingPlanDisplay } from "@/lib/training-plan-display";
import {
  getAdaptivePlanSuggestion,
  type AdaptivePlanSuggestion,
} from "@/lib/adaptive-plan";
import { getPlanById } from "@/lib/plans";

export type AdaptiveAction =
  | "run_as_planned"
  | "go_easy"
  | "rest_or_walk"
  | "catch_up_gently"
  | "log_wellness"
  | "start_plan"
  | "connect_strava"
  | "protect_taper";

export type AdaptiveMetricInsight = {
  id: "recovery" | "alignment" | "pace" | "streak" | "volume";
  label: string;
  value: string;
  narrative: string;
  tone: "good" | "watch" | "neutral" | "unknown";
};

export type AdaptiveBrief = {
  headline: string;
  action: AdaptiveAction;
  body: string;
  reasons: string[];
  metricInsights: AdaptiveMetricInsight[];
  planSuggestion: AdaptivePlanSuggestion | null;
  todayWorkout: {
    label: string;
    kind: "run" | "cross-train" | "rest" | "none";
    weekTitle: string | null;
  };
  coachingPriority: RunSuggestion[];
  confidence: "low" | "medium" | "high";
  /** Always rules today; optional polish may set this client-side. */
  engine: "adaptive";
};

type BriefInput = {
  hasTrainingPlan: boolean;
  trainingPlan: TrainingPlanDisplay | null;
  alignment: PlanAlignmentSummary | null;
  recovery: RecoveryReadiness;
  paceInsights: PaceInsights | null;
  streak: RunStreak;
  suggestions: RunSuggestion[];
  stravaConnected: boolean;
  totalRuns: number;
};

function todayDayName(): string {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

function resolveTodayWorkout(
  plan: TrainingPlanDisplay | null,
  alignment: PlanAlignmentSummary | null
): AdaptiveBrief["todayWorkout"] {
  if (alignment) {
    const today = alignment.days.find((d) => d.status === "today");
    if (today) {
      return {
        label: today.label,
        kind: today.kind,
        weekTitle: alignment.weekTitle,
      };
    }
  }
  if (plan?.weekPreview) {
    const name = todayDayName();
    const day = plan.weekPreview.days.find((d) => d.dayName === name);
    if (day) {
      return {
        label: day.label,
        kind: day.kind,
        weekTitle: plan.weekPreview.weekTitle,
      };
    }
  }
  return { label: "No workout mapped", kind: "none", weekTitle: null };
}

function buildMetricInsights(input: BriefInput): AdaptiveMetricInsight[] {
  const insights: AdaptiveMetricInsight[] = [];
  const { recovery, alignment, paceInsights, streak, totalRuns } = input;

  if (recovery.score == null || recovery.label === "Unknown") {
    insights.push({
      id: "recovery",
      label: "Recovery",
      value: "Unknown",
      narrative:
        "Log last night's sleep and resting HR to unlock a readiness score — metrics stay sharper with 3+ days of wellness.",
      tone: "unknown",
    });
  } else {
    const tone: AdaptiveMetricInsight["tone"] =
      recovery.score >= 75
        ? "good"
        : recovery.score >= 55
          ? "neutral"
          : "watch";
    insights.push({
      id: "recovery",
      label: "Recovery",
      value: `${recovery.score} · ${recovery.label}`,
      narrative: recovery.summary,
      tone,
    });
  }

  if (alignment) {
    const tone: AdaptiveMetricInsight["tone"] =
      alignment.alignmentPercent >= 70
        ? "good"
        : alignment.alignmentPercent >= 40
          ? "neutral"
          : "watch";
    insights.push({
      id: "alignment",
      label: "Plan week",
      value: `${alignment.alignmentPercent}% · ${alignment.completed}/${alignment.total}`,
      narrative: alignment.message,
      tone,
    });
  }

  if (paceInsights?.available) {
    const conf = paceInsights.projections[0]?.confidence ?? "low";
    insights.push({
      id: "pace",
      label: "Pace model",
      value:
        conf === "high"
          ? "High confidence"
          : conf === "medium"
            ? "Medium confidence"
            : "Building",
      narrative:
        paceInsights.baselineNote ??
        `Zones from ${paceInsights.runSampleSize} recent run${paceInsights.runSampleSize === 1 ? "" : "s"}. Easy days still beat chasing projections.`,
      tone: conf === "low" ? "neutral" : "good",
    });
  } else if (input.stravaConnected) {
    insights.push({
      id: "pace",
      label: "Pace model",
      value: "Needs more runs",
      narrative:
        paceInsights?.reason ??
        "Sync a few more quality runs to estimate race times and training zones.",
      tone: "unknown",
    });
  }

  if (streak.current > 0 || totalRuns > 0) {
    insights.push({
      id: "streak",
      label: "Streak",
      value:
        streak.current > 0
          ? `${streak.current} day${streak.current === 1 ? "" : "s"}`
          : "Reset",
      narrative:
        streak.current >= 3
          ? "Consistency is compounding — protect easy days so the streak stays healthy."
          : streak.lastRunDate
            ? `Last run ${streak.lastRunDate}. Short frequent sessions rebuild streaks faster than make-up long runs.`
            : "Start with one easy session to light the streak.",
      tone: streak.current >= 3 ? "good" : "neutral",
    });
  }

  return insights;
}

function pickAction(input: BriefInput, today: AdaptiveBrief["todayWorkout"]): AdaptiveAction {
  if (!input.hasTrainingPlan) return "start_plan";
  if (
    input.recovery.score != null &&
    input.recovery.score < 45 &&
    today.kind === "run"
  ) {
    return "rest_or_walk";
  }
  if (
    input.recovery.score != null &&
    input.recovery.score < 60 &&
    today.kind === "run"
  ) {
    return "go_easy";
  }
  if (
    input.alignment &&
    input.alignment.alignmentPercent < 40 &&
    input.alignment.completed < input.alignment.total
  ) {
    return "catch_up_gently";
  }
  if (
    input.trainingPlan &&
    input.trainingPlan.currentWeek >= input.trainingPlan.totalWeeks - 1
  ) {
    return "protect_taper";
  }
  if (input.recovery.label === "Unknown") return "log_wellness";
  if (!input.stravaConnected && input.totalRuns === 0) return "connect_strava";
  if (today.kind === "rest") return "rest_or_walk";
  return "run_as_planned";
}

function buildHeadline(action: AdaptiveAction, today: AdaptiveBrief["todayWorkout"]): string {
  switch (action) {
    case "rest_or_walk":
      return today.kind === "rest"
        ? "Today is a recovery day — own it"
        : "Readiness says ease off today";
    case "go_easy":
      return "Keep today's effort honest and easy";
    case "catch_up_gently":
      return "Behind on the week? Don't double up";
    case "log_wellness":
      return "Two taps unlock smarter coaching";
    case "start_plan":
      return "Pick a plan so coaching has a target";
    case "connect_strava":
      return "Connect Strava to sharpen your metrics";
    case "protect_taper":
      return "Protect the taper — freshness beats secret miles";
    default:
      return today.kind === "run"
        ? `Today's focus: ${today.label}`
        : today.kind === "cross-train"
          ? `Cross-train day: ${today.label}`
          : "You're on track — stay consistent";
  }
}

function buildBody(
  action: AdaptiveAction,
  today: AdaptiveBrief["todayWorkout"],
  input: BriefInput
): string {
  const weekBit = today.weekTitle ? ` (${today.weekTitle})` : "";
  switch (action) {
    case "rest_or_walk":
      return input.recovery.score != null && input.recovery.score < 45
        ? `Recovery is ${input.recovery.score}. Swap a hard effort for a walk, easy spin, or full rest — fitness sticks when you absorb load.`
        : `Scheduled rest${weekBit}. Use it for sleep, light mobility, or a short walk. Showing up tomorrow matters more than inventing a workout today.`;
    case "go_easy":
      return `Plan says "${today.label}"${weekBit}, but readiness is only moderate. Keep effort conversational; skip surges and hills if your legs feel heavy.`;
    case "catch_up_gently":
      return `You're at ${input.alignment?.alignmentPercent ?? 0}% of this week's planned sessions. Finish easy remaining days or repeat the week on /plan — never stack two quality days to "catch up."`;
    case "log_wellness":
      return "Sleep and resting heart rate turn recovery from a guess into a score. Log them once; the dashboard adapts coaching and HR zones around you.";
    case "start_plan":
      return "Adaptive nudges need a plan week to attach to. Start a 5K–marathon plan, set your schedule, and check-offs will drive smarter advice.";
    case "connect_strava":
      return "Manual check-offs still work. Strava sync adds pace zones, weekly volume context, and auto plan alignment when you run.";
    case "protect_taper":
      return `Late-plan week${weekBit}: trust the lighter load. No time trials, no new shoes, no bonus long run.`;
    default:
      return today.kind === "run" || today.kind === "cross-train"
        ? `You're cleared for "${today.label}"${weekBit}. Warm up, keep most of the session at the planned effort, and cool down.`
        : "Consistency over heroics. Protect easy days and sleep — that's how metrics actually improve.";
  }
}

function buildReasons(
  action: AdaptiveAction,
  input: BriefInput,
  today: AdaptiveBrief["todayWorkout"]
): string[] {
  const reasons: string[] = [];
  if (input.recovery.score != null) {
    reasons.push(`Recovery ${input.recovery.score} (${input.recovery.label})`);
  } else {
    reasons.push("Recovery not logged yet");
  }
  if (input.alignment) {
    reasons.push(
      `Week alignment ${input.alignment.alignmentPercent}% (${input.alignment.completed}/${input.alignment.total})`
    );
  }
  if (today.kind !== "none") {
    reasons.push(`Today: ${today.label}`);
  }
  if (input.trainingPlan?.weeksUntilRace != null) {
    reasons.push(`${input.trainingPlan.weeksUntilRace} week(s) until race goal`);
  }
  if (action === "connect_strava") {
    reasons.push("Strava not connected");
  }
  return reasons.slice(0, 4);
}

function confidenceFor(input: BriefInput): AdaptiveBrief["confidence"] {
  let score = 0;
  if (input.recovery.score != null) score += 2;
  if (input.alignment) score += 2;
  if (input.paceInsights?.available) score += 1;
  if (input.hasTrainingPlan) score += 1;
  if (input.stravaConnected) score += 1;
  if (score >= 5) return "high";
  if (score >= 3) return "medium";
  return "low";
}

/**
 * Synthesizes recovery, plan alignment, pace model, and schedule into one
 * adaptive coaching brief — deterministic "AI coach" without an LLM subscription.
 */
export function buildAdaptiveBrief(input: BriefInput): AdaptiveBrief {
  const today = resolveTodayWorkout(input.trainingPlan, input.alignment);
  const action = pickAction(input, today);
  const metricInsights = buildMetricInsights(input);

  let planSuggestion: AdaptivePlanSuggestion | null = null;
  if (input.trainingPlan) {
    const plan = getPlanById(input.trainingPlan.planId);
    if (plan) {
      planSuggestion = getAdaptivePlanSuggestion({
        plan,
        profile: {
          age: input.trainingPlan.age,
          fitnessLevel: input.trainingPlan.fitnessLevel,
          goalRaceDate: input.trainingPlan.goalRaceDate,
        },
        currentWeek: input.trainingPlan.currentWeek,
        weekAlignmentPercent: input.alignment?.alignmentPercent ?? null,
        recoveryScore: input.recovery.score,
        planPercentComplete: input.trainingPlan.percentComplete,
      });
    }
  }

  const coachingPriority = [...input.suggestions]
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 };
      return rank[a.priority] - rank[b.priority];
    })
    .slice(0, 3);

  return {
    headline: buildHeadline(action, today),
    action,
    body: buildBody(action, today, input),
    reasons: buildReasons(action, input, today),
    metricInsights,
    planSuggestion,
    todayWorkout: today,
    coachingPriority,
    confidence: confidenceFor(input),
    engine: "adaptive",
  };
}
