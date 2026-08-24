import type { PlanAlignmentSummary } from "@/lib/plan-alignment";

export type WeekRebuildMode =
  | "hold_repeat"
  | "make_up_easy"
  | "no_op";

export type WeekRebuildPlacement = {
  /** Missed session label */
  fromLabel: string;
  /** Suggested upcoming day name */
  toDayName: string;
  /** Keep effort easy — never stack quality */
  ease: true;
};

export type WeekRebuildProposal = {
  mode: WeekRebuildMode;
  reason: string;
  /** Stay on this plan week (don't advance / repeat). */
  suggestedWeek: number;
  placements: WeekRebuildPlacement[];
  /** Primary button copy */
  applyLabel: string;
  tipHref: string;
  tipLabel: string;
};

type RebuildInput = {
  alignment: PlanAlignmentSummary;
  recoveryScore?: number | null;
  /** True when within last 2 plan weeks (taper). */
  isTaper?: boolean;
};

/**
 * Propose how to rebuild the current Mon–Sun week after missed sessions.
 * Never invents stacked quality; prefers hold/repeat or easy make-ups on
 * remaining rest/cross-train slots.
 */
export function proposeWeekRebuild(input: RebuildInput): WeekRebuildProposal {
  const { alignment, recoveryScore, isTaper } = input;
  const week = alignment.currentWeek;
  const tip = {
    tipHref: "/tips/missed-a-week-dont-double-up",
    tipLabel: "Missed-week tip",
  };

  const missed = alignment.days.filter(
    (d) => d.status === "missed" && d.kind !== "rest"
  );
  const upcomingSlots = alignment.days.filter(
    (d) =>
      (d.status === "upcoming" || d.status === "today") &&
      (d.kind === "rest" || d.kind === "cross-train")
  );

  if (missed.length === 0) {
    return {
      mode: "no_op",
      reason: "No missed sessions this week.",
      suggestedWeek: week,
      placements: [],
      applyLabel: "Stay on this week",
      ...tip,
    };
  }

  if (isTaper) {
    return {
      mode: "hold_repeat",
      reason:
        "Taper week — skip inventing make-up miles. Stay on this week and keep efforts easy.",
      suggestedWeek: week,
      placements: [],
      applyLabel: `Hold week ${week}`,
      ...tip,
    };
  }

  if (recoveryScore != null && recoveryScore < 50) {
    return {
      mode: "hold_repeat",
      reason:
        "Readiness is low. Hold this week as an easy/deload week — don't redistribute hard sessions.",
      suggestedWeek: week,
      placements: [],
      applyLabel: `Hold easy week ${week}`,
      tipHref: "/tips/resting-hr-up-for-days-back-off-early",
      tipLabel: "Resting HR tip",
    };
  }

  const makeUpCount = Math.min(missed.length, upcomingSlots.length, 2);
  if (
    makeUpCount > 0 &&
    alignment.alignmentPercent < 70 &&
    missed.length <= 2
  ) {
    const placements: WeekRebuildPlacement[] = [];
    for (let i = 0; i < makeUpCount; i++) {
      const from = missed[i];
      const to = upcomingSlots[i];
      if (!from || !to) break;
      placements.push({
        fromLabel: from.label,
        toDayName: to.dayName,
        ease: true,
      });
    }
    return {
      mode: "make_up_easy",
      reason: `Missed ${missed.length} session${missed.length === 1 ? "" : "s"}. Use remaining easy/cross-train slots — conversational effort only, never two hard days back-to-back.`,
      suggestedWeek: week,
      placements,
      applyLabel: `Stay on week ${week}`,
      ...tip,
    };
  }

  return {
    mode: "hold_repeat",
    reason:
      "Too many missed sessions to cram. Repeat/hold this week instead of stacking catch-up volume.",
    suggestedWeek: week,
    placements: [],
    applyLabel: `Repeat week ${week}`,
    ...tip,
  };
}
