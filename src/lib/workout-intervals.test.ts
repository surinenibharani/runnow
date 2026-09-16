import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  formatCueClock,
  parseWorkoutIntervals,
} from "./workout-intervals";

describe("parseWorkoutIntervals", () => {
  it("expands couch-to-5K walk–jog repeats", () => {
    const cues = parseWorkoutIntervals(
      "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min"
    );
    assert.ok(cues);
    assert.equal(cues.length, 12);
    assert.equal(cues[0]?.kind, "Walk");
    assert.equal(cues[0]?.seconds, 300);
    assert.equal(cues[1]?.kind, "Jog");
    assert.equal(cues[1]?.seconds, 60);
    assert.equal(cues[2]?.kind, "Walk");
    assert.equal(cues[2]?.seconds, 120);
    assert.equal(cues[11]?.kind, "Walk");
    assert.equal(cues[11]?.seconds, 300);
  });

  it("handles 90-second jogs", () => {
    const cues = parseWorkoutIntervals(
      "Walk 5 min → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min"
    );
    assert.equal(cues?.[1]?.seconds, 90);
  });

  it("parses second-based micro-jogs", () => {
    const cues = parseWorkoutIntervals(
      "Walk 5 min → (Jog 30 sec, Walk 2 min) × 5 → Walk 5 min"
    );
    assert.ok(cues);
    assert.equal(cues[1]?.kind, "Jog");
    assert.equal(cues[1]?.seconds, 30);
  });

  it("returns null for mileage-only easy runs", () => {
    assert.equal(parseWorkoutIntervals("3 mi easy — fully recoverable effort"), null);
  });
});

describe("formatCueClock", () => {
  it("pads seconds", () => {
    assert.equal(formatCueClock(90), "1:30");
    assert.equal(formatCueClock(5), "0:05");
  });
});
