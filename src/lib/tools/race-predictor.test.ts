import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { predictBetweenRaces, predictRaceTime } from "./race-predictor";

describe("race predictor", () => {
  it("applies the Riegel formula", () => {
    const t = predictRaceTime(25 * 60, 5, 10);
    assert.ok(t != null);
    // 25:00 5K → ~52:xx 10K (1.06 exponent)
    assert.ok(t! > 50 * 60 && t! < 55 * 60);
  });

  it("predicts between named races", () => {
    const half = predictBetweenRaces(25 * 60, "5k", "half");
    assert.ok(half != null);
    assert.ok(half! > 90 * 60 && half! < 130 * 60);
  });
});
