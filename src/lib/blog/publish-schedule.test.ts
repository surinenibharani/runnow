import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getBlogPostPublishInstant,
  isBlogPostPublishedAt,
} from "./publish-schedule";

describe("blog publish schedule", () => {
  it("publishes at 7:00 AM America/New_York on the date", () => {
    const ms = getBlogPostPublishInstant("2026-07-18");
    // 7 AM EDT = 11:00 UTC in July
    assert.equal(new Date(ms).toISOString(), "2026-07-18T11:00:00.000Z");
  });

  it("treats posts as unpublished before the gate", () => {
    const before = new Date("2026-07-18T10:59:00.000Z");
    const after = new Date("2026-07-18T11:00:00.000Z");
    assert.equal(isBlogPostPublishedAt("2026-07-18", before), false);
    assert.equal(isBlogPostPublishedAt("2026-07-18", after), true);
  });
});
