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
    assert.equal(
      protect.scheduledWeeks[0].days.filter((day) => day.kind === "rest").length,
      2
    );
  });

  it("keeps a single rest day in support mode", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const support = applyScheduleToPlan(plan, DEFAULT_SCHEDULE, null, {
      healthMode: "support",
    });
    assert.equal(
      support.scheduledWeeks[0].days.filter((day) => day.kind === "rest").length,
      1
    );
  });

  it("overlays condition exercises onto remaining cross-train days after extra rest", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const scheduled = applyScheduleToPlan(plan, DEFAULT_SCHEDULE, null, {
      healthMode: "protect",
    });
    const overlaid = overlayHealthOnScheduledWeeks(
      scheduled.scheduledWeeks,
      [
        {
          category: "walking",
          title: "Easy walk",
          why: "Heart-friendly cardio.",
          how: "20 min conversational.",
        },
        {
          category: "yoga",
          title: "Easy range-of-motion",
          why: "Recovery without intensity.",
          how: "10 min Cat-Cow.",
        },
      ],
      "training around a heart or blood-pressure condition"
    );
    const restDays = overlaid[0].days.filter((day) => day.kind === "rest");
    const ctDays = overlaid[0].days.filter((day) => day.kind === "cross-train");
    assert.equal(restDays.length, 2);
    assert.ok(ctDays.length >= 1);
    for (const day of ctDays) {
      assert.equal(day.crossTraining?.activities[0]?.title, "Easy walk");
      assert.match(day.crossTraining?.focus ?? "", /heart/i);
    }
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
