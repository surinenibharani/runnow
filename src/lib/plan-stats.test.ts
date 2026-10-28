import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Workout } from "./plan-types";
import {
  formatWorkoutDistance,
  formatWorkoutTimeAndDistance,
  parseMilesFromText,
} from "./plan-stats";

function workout(partial: Partial<Workout> & Pick<Workout, "duration" | "intervals">): Workout {
  return {
    id: "t",
    day: 1,
    name: "Test",
    description: "",
    runType: "easy",
    ...partial,
  };
}

describe("parseMilesFromText", () => {
  it("reads a single easy run", () => {
    assert.equal(parseMilesFromText("4 mi easy"), 4);
  });

  it("averages a mile range", () => {
    assert.equal(parseMilesFromText("2–3 mi easy — fully recoverable effort"), 2.5);
  });

  it("maps race shorthand", () => {
    assert.equal(parseMilesFromText("Walk 5 min → Run 5K easy → Walk 5 min"), 3.1);
    assert.equal(parseMilesFromText("6.2 mi race (10K)"), 6.2);
    assert.equal(parseMilesFromText("13.1 mi race"), 13.1);
  });
});

describe("formatWorkoutTimeAndDistance", () => {
  it("estimates walk-run distance from time", () => {
    const run = workout({
      duration: "~25 min",
      intervals: "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min",
      runType: "walk-run",
    });
    assert.equal(formatWorkoutDistance(run), "~1.8 mi");
    assert.equal(formatWorkoutTimeAndDistance(run), "~25 min · ~1.8 mi");
  });

  it("uses prescribed miles on distance-based plans", () => {
    const run = workout({
      duration: "~45 min",
      intervals: "4 mi easy",
      runType: "long",
    });
    assert.equal(formatWorkoutTimeAndDistance(run), "~45 min · ~4 mi");
  });

  it("keeps a written mile range", () => {
    const run = workout({
      duration: "~25–30 min",
      intervals: "2–3 mi easy — fully recoverable effort",
      runType: "recovery",
    });
    assert.equal(formatWorkoutTimeAndDistance(run), "~25–30 min · ~2–3 mi");
  });

  it("uses 5K race distance instead of a time estimate", () => {
    const run = workout({
      name: "The 5K Coronation",
      duration: "~35–45 min",
      intervals: "Walk 5 min → Run 5K easy → Walk 5 min",
      runType: "race",
    });
    assert.equal(formatWorkoutTimeAndDistance(run), "~35–45 min · ~3.1 mi");
  });
});
