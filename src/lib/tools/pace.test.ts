import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  finishTimeFromPaceAndDistance,
  formatFinishTime,
  formatPace,
  parsePaceOrTime,
  paceFromDistanceAndTime,
} from "./pace";

describe("pace tools", () => {
  it("parses mm:ss and h:mm:ss", () => {
    assert.equal(parsePaceOrTime("8:30"), 510);
    assert.equal(parsePaceOrTime("1:02:15"), 3735);
    assert.equal(parsePaceOrTime("bad"), null);
  });

  it("computes pace from distance and time", () => {
    const pace = paceFromDistanceAndTime(5, 25 * 60);
    assert.ok(pace != null);
    assert.equal(formatPace(pace!), "5:00");
  });

  it("computes finish time from pace and distance", () => {
    const finish = finishTimeFromPaceAndDistance(300, 10);
    assert.ok(finish != null);
    assert.equal(formatFinishTime(finish!), "50:00");
  });
});
