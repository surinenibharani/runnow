import type { TrainingPlan } from "@/lib/plan-types";
import { getPlansForFamily } from "@/lib/plans";
import {
  type PlanPersonalization,
  weeksUntilDate,
} from "@/lib/plan-personalization";

export type AdaptiveActionType =
  | "repeat_week"
  | "ease_volume"
  | "stay_course"
  | "consider_longer_plan"
  | "protect_taper";

export type AdaptivePlanSuggestion = {
  status: "on_track" | "behind" | "ahead" | "strained" | "neutral";
  title: string;
  detail: string;
  actionType: AdaptiveActionType;
  /** Suggested week number to jump to (e.g. repeat current). */
  suggestedWeek?: number;
  /** Optional longer plan variant id when timeline is tight. */
  suggestedPlanId?: string;
};

type AdaptiveInput = {
  plan: TrainingPlan;
  profile: PlanPersonalization;
  currentWeek: number;
  /** 0–100 completion of scheduled activities this week, if known. */
  weekAlignmentPercent?: number | null;
  /** Recovery readiness 0–100, if known. */
  recoveryScore?: number | null;
  /** Workouts completed in plan / total. */
  planPercentComplete?: number | null;
};

/**
 * Lightweight adaptive coaching for browser plans — no AI subscription required.
 * Nudges users to repeat weeks, ease up, or switch variants instead of cramming.
 */
export function getAdaptivePlanSuggestion(
  input: AdaptiveInput
): AdaptivePlanSuggestion {
  const {
    plan,
    profile,
    currentWeek,
    weekAlignmentPercent,
    recoveryScore,
    planPercentComplete,
  } = input;

  const week = Math.min(Math.max(1, currentWeek), plan.durationWeeks);
  const weeksLeftInPlan = plan.durationWeeks - week + 1;
  const weeksUntil = profile.goalRaceDate
    ? weeksUntilDate(profile.goalRaceDate)
    : null;

  if (recoveryScore != null && recoveryScore < 50 && week < plan.durationWeeks) {
    return {
      status: "strained",
      title: "Recovery is asking for an easier day",
      detail:
        "Your readiness score is low. Keep today's effort easy or rest — don't stack catch-up workouts. Resume the plan when sleep and resting HR look better.",
      actionType: "ease_volume",
      suggestedWeek: week,
    };
  }

  if (
    weekAlignmentPercent != null &&
    weekAlignmentPercent < 40 &&
    week > 1
  ) {
    return {
      status: "behind",
      title: "Repeat this week instead of jumping ahead",
      detail:
        "Fewer than half of this week's planned activities are done. Repeating the week builds fitness more safely than cramming two weeks into one.",
      actionType: "repeat_week",
      suggestedWeek: week,
    };
  }

  if (weeksUntil != null && weeksUntil > 0) {
    if (weeksUntil < weeksLeftInPlan) {
      const familyPlans = getPlansForFamily(plan.familyId).sort(
        (a, b) => a.durationWeeks - b.durationWeeks
      );
      const shorter = familyPlans.find((p) => p.durationWeeks <= weeksUntil);

      if (shorter && shorter.id !== plan.id) {
        return {
          status: "behind",
          title: "Timeline is tight — consider a shorter plan variant",
          detail: `About ${weeksUntil} week${weeksUntil === 1 ? "" : "s"} until race day, but ${weeksLeftInPlan} plan weeks remain. Switching to the ${shorter.duration} option (or staying easy and accepting a slower build) beats doubling mileage.`,
          actionType: "consider_longer_plan",
          suggestedPlanId: shorter.id,
          suggestedWeek: week,
        };
      }

      return {
        status: "behind",
        title: "Don't stack missed runs to 'catch' race day",
        detail: `You're short on calendar weeks versus plan weeks left. Keep easy consistency, skip inventing bonus speedwork, and treat race day as a celebration finish if needed.`,
        actionType: "ease_volume",
        suggestedWeek: week,
      };
    }

    if (weeksUntil === weeksLeftInPlan) {
      return {
        status: "on_track",
        title: "Calendar and plan length match",
        detail:
          "Stay the course. Protect sleep and easy days — fitness is already in the bank for the final stretch.",
        actionType: "stay_course",
      };
    }

    if (weeksUntil > weeksLeftInPlan + 2 && week <= 2) {
      const longer = getPlansForFamily(plan.familyId)
        .filter((p) => p.durationWeeks > plan.durationWeeks)
        .sort((a, b) => a.durationWeeks - b.durationWeeks)[0];
      if (longer) {
        return {
          status: "ahead",
          title: "Extra time before race day",
          detail: `You have buffer weeks. The ${longer.duration} variant can add a gentler ramp — or keep this plan and use spare weeks as easy base.`,
          actionType: "consider_longer_plan",
          suggestedPlanId: longer.id,
        };
      }
    }
  }

  if (
    planPercentComplete != null &&
    planPercentComplete < 25 &&
    week >= Math.ceil(plan.durationWeeks * 0.5)
  ) {
    return {
      status: "behind",
      title: "Week number is ahead of completion",
      detail:
        "You've advanced further in the calendar than workouts completed. Jump back to an earlier week that matches what you've actually finished — progress is about work done, not the tab you're on.",
      actionType: "repeat_week",
      suggestedWeek: Math.max(1, week - 1),
    };
  }

  if (week >= plan.durationWeeks - 1) {
    return {
      status: "on_track",
      title: "Protect the taper — no secret workouts",
      detail:
        "Fitness won't vanish with a lighter week. Skip cramming long runs or time trials; show up fresh.",
      actionType: "protect_taper",
      suggestedWeek: week,
    };
  }

  return {
    status: "neutral",
    title: "Adaptive tip: consistency over catch-up",
    detail:
      "If life interrupts, repeat a week or shorten the run — don't double tomorrow. Your plan can flex; your tendons prefer patience.",
    actionType: "stay_course",
    suggestedWeek: week,
  };
}
