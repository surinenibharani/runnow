import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getPlanById } from "./plans";
import {
  deriveSchedulePrefs,
  getRaceCountdown,
  weeksUntilDate,
} from "./plan-personalization";
import { applyScheduleToPlan, DEFAULT_SCHEDULE } from "./schedule-builder";
import { overlayHealthOnScheduledWeeks } from "./plan/cross-train-guidance";
import { isStrengthSession } from "./plan-types";

describe("assignStrengthDays", () => {
  it("puts two checkable strength sessions on a typical 5K week", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const scheduled = applyScheduleToPlan(plan, DEFAULT_SCHEDULE);
    const week = scheduled.scheduledWeeks[0];
    const strength = week.days.filter(isStrengthSession);
    assert.equal(strength.length, 2);
    for (const day of strength) {
      assert.equal(day.kind, "cross-train");
      assert.equal(day.crossTraining?.emphasis, "strength");
      assert.match(day.crossTraining?.name ?? "", /strength/i);
    }
  });

  it("does not replace race-day or eve-prep sessions", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const scheduled = applyScheduleToPlan(plan, DEFAULT_SCHEDULE);
    const lastWeek = scheduled.scheduledWeeks[scheduled.scheduledWeeks.length - 1];
    for (const day of lastWeek.days) {
      const name = `${day.run?.name ?? ""} ${day.crossTraining?.name ?? ""}`;
      if (/eve prep|race day/i.test(name)) {
        assert.equal(isStrengthSession(day), false);
      }
    }
  });
});

describe("health-aware schedule", () => {
  it("scales strength days down when health mode is support or protect", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const support = applyScheduleToPlan(plan, DEFAULT_SCHEDULE, null, {
      healthMode: "support",
    });
    assert.equal(support.scheduledWeeks[0].days.filter(isStrengthSession).length, 1);

    const protect = applyScheduleToPlan(plan, DEFAULT_SCHEDULE, null, {
      healthMode: "protect",
    });
    assert.equal(protect.scheduledWeeks[0].days.filter(isStrengthSession).length, 0);
  });

  it("overlays supporting CT onto strength days", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const scheduled = applyScheduleToPlan(plan, DEFAULT_SCHEDULE);
    const overlaid = overlayHealthOnScheduledWeeks(
      scheduled.scheduledWeeks,
      [
        {
          category: "cycling",
          title: "Easy bike spin",
          why: "Less knee impact.",
          how: "15 min easy.",
        },
      ],
      "knee comfort"
    );
    const strength = overlaid[0].days.find(isStrengthSession);
    assert.ok(strength?.crossTraining);
    assert.equal(strength.crossTraining.activities[0]?.title, "Easy bike spin");
    assert.match(strength.crossTraining.focus, /knee comfort/);
  });

  it("honors a beginner’s 4-day schedule pick", () => {
    const prefs = deriveSchedulePrefs(
      { ...DEFAULT_SCHEDULE, runDaysPerWeek: 4 },
      { age: null, fitnessLevel: "beginner", goalRaceDate: null },
      3
    );
    assert.equal(prefs.runDaysPerWeek, 4);
  });

  it("still drops to 3 run days at 55+", () => {
    const prefs = deriveSchedulePrefs(
      { ...DEFAULT_SCHEDULE, runDaysPerWeek: 4 },
      { age: 60, fitnessLevel: "intermediate", goalRaceDate: null },
      4
    );
    assert.equal(prefs.runDaysPerWeek, 3);
  });
});

describe("getRaceCountdown", () => {
  const now = new Date(2026, 8, 15);

  it("labels race day", () => {
    const countdown = getRaceCountdown("2026-09-15", now);
    assert.equal(countdown?.status, "today");
    assert.equal(countdown?.days, 0);
    assert.equal(weeksUntilDate("2026-09-15", now), 0);
  });

  it("counts remaining days", () => {
    const countdown = getRaceCountdown("2026-10-15", now);
    assert.equal(countdown?.status, "upcoming");
    assert.equal(countdown?.days, 30);
    assert.match(countdown?.headline ?? "", /30 days/);
  });

  it("marks a passed date", () => {
    const countdown = getRaceCountdown("2026-09-01", now);
    assert.equal(countdown?.status, "past");
  });
});
