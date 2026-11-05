import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatSiteDateKey } from "./date-keys";

describe("formatSiteDateKey", () => {
  it("keeps YYYY-MM-DD calendar dates off UTC midnight rollover", () => {
    assert.equal(formatSiteDateKey("2026-11-02"), "November 2, 2026");
    assert.equal(
      formatSiteDateKey("2026-11-02", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      "Nov 2, 2026"
    );
  });
});
