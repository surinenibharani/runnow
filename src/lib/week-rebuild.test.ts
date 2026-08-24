import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  comparePlansForCatalog,
  isGentlePlan,
  planMatchesFilters,
} from "./plan-catalog";
import { proposeWeekRebuild } from "./week-rebuild";
import type { PlanAlignmentSummary } from "./plan-alignment";
import { getAdaptivePlanSuggestion } from "./adaptive-plan";
import type { TrainingPlan } from "./plan-types";

describe("plan-catalog gentle / walk-first", () => {
  it("tags 5k-gentle-16w as gentle", () => {
    assert.equal(isGentlePlan("5k-gentle-16w"), true);
    assert.equal(isGentlePlan("5k-4w"), false);
  });

  it("matches Walk-first filter", () => {
    assert.equal(planMatchesFilters("5k-gentle-16w", ["gentle"]), true);
    assert.equal(planMatchesFilters("5k-8w", ["gentle"]), false);
  });

  it("sorts gentle plans ahead of short cram plans", () => {
    const items = [
      { id: "5k-4w", familyId: "5k", stats: { durationWeeks: 4 } },
      { id: "5k-gentle-16w", familyId: "5k", stats: { durationWeeks: 16 } },
      { id: "5k-8w", familyId: "5k", stats: { durationWeeks: 8 } },
    ];
    items.sort(comparePlansForCatalog);
    assert.equal(items[0]?.id, "5k-gentle-16w");
  });
});

function fakeAlignment(
  overrides: Partial<PlanAlignmentSummary> & {
    days: PlanAlignmentSummary["days"];
  }
): PlanAlignmentSummary {
  return {
    planId: "5k-8w",
    planName: "5K",
    currentWeek: 3,
    weekTitle: "Week 3",
    weekFocus: "Easy",
    completed: 1,
    total: 4,
    alignmentPercent: 25,
    message: "Behind",
    ...overrides,
  };
}

describe("proposeWeekRebuild", () => {
  it("returns no_op when nothing was missed", () => {
    const proposal = proposeWeekRebuild({
      alignment: fakeAlignment({
        days: [
          {
            dayId: "a",
            dayName: "Monday",
            dayOfWeek: 1,
            date: "2026-08-17",
            kind: "run",
            label: "Easy",
            status: "completed",
            stravaMatch: null,
          },
        ],
        alignmentPercent: 100,
        completed: 1,
        total: 1,
      }),
    });
    assert.equal(proposal.mode, "no_op");
  });

  it("holds as deload when recovery is low", () => {
    const proposal = proposeWeekRebuild({
      recoveryScore: 40,
      alignment: fakeAlignment({
        days: [
          {
            dayId: "a",
            dayName: "Monday",
            dayOfWeek: 1,
            date: "2026-08-17",
            kind: "run",
            label: "Easy 20",
            status: "missed",
            stravaMatch: null,
          },
          {
            dayId: "b",
            dayName: "Wednesday",
            dayOfWeek: 3,
            date: "2026-08-19",
            kind: "cross-train",
            label: "Yoga",
            status: "upcoming",
            stravaMatch: null,
          },
        ],
      }),
    });
    assert.equal(proposal.mode, "hold_repeat");
    assert.match(proposal.reason, /Readiness/i);
  });

  it("suggests easy make-ups on remaining slots", () => {
    const proposal = proposeWeekRebuild({
      recoveryScore: 70,
      alignment: fakeAlignment({
        days: [
          {
            dayId: "a",
            dayName: "Monday",
            dayOfWeek: 1,
            date: "2026-08-17",
            kind: "run",
            label: "Easy 20",
            status: "missed",
            stravaMatch: null,
          },
          {
            dayId: "b",
            dayName: "Wednesday",
            dayOfWeek: 3,
            date: "2026-08-19",
            kind: "cross-train",
            label: "Yoga",
            status: "upcoming",
            stravaMatch: null,
          },
        ],
      }),
    });
    assert.equal(proposal.mode, "make_up_easy");
    assert.equal(proposal.placements.length, 1);
    assert.equal(proposal.placements[0]?.toDayName, "Wednesday");
  });
});

describe("getAdaptivePlanSuggestion deload / rebuild", () => {
  const plan = {
    id: "5k-8w",
    familyId: "5k",
    name: "5K",
    shortName: "5K",
    description: "",
    duration: "8 weeks",
    durationWeeks: 8,
    prerequisite: "",
    runsPerWeek: 3,
    weeks: [],
  } as TrainingPlan;

  it("suggests ease_volume with tip when recovery is low", () => {
    const s = getAdaptivePlanSuggestion({
      plan,
      profile: { age: null, fitnessLevel: "beginner", goalRaceDate: null },
      currentWeek: 3,
      recoveryScore: 42,
    });
    assert.equal(s.actionType, "ease_volume");
    assert.equal(s.tipHref, "/tips/resting-hr-up-for-days-back-off-early");
  });

  it("suggests rebuild_week when alignment is poor", () => {
    const s = getAdaptivePlanSuggestion({
      plan,
      profile: { age: null, fitnessLevel: "beginner", goalRaceDate: null },
      currentWeek: 3,
      weekAlignmentPercent: 20,
      recoveryScore: 80,
    });
    assert.equal(s.actionType, "rebuild_week");
    assert.equal(s.tipHref, "/tips/missed-a-week-dont-double-up");
  });
});
