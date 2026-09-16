import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getPublishedBlogSitemapEntries,
  getVisiblePostBySlug,
} from "./posts";
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

describe("published blog visibility", () => {
  const now = new Date("2026-09-15T20:00:00-04:00");

  it("includes today's published posts in the sitemap and hides scheduled ones", () => {
    const slugs = getPublishedBlogSitemapEntries(now).map((p) => p.slug);
    assert.equal(slugs.includes("running-form-101"), true);
    assert.equal(slugs.includes("achilles-tendinitis-running"), false);
    assert.equal(slugs.includes("running-during-fasting"), false);
  });

  it("hides unknown and unreleased slugs from public visitors", () => {
    assert.equal(getVisiblePostBySlug("this-slug-does-not-exist-xyz", false, now), undefined);
    assert.equal(
      getVisiblePostBySlug("achilles-tendinitis-running", false, now),
      undefined
    );
    assert.equal(
      Boolean(getVisiblePostBySlug("achilles-tendinitis-running", true, now)),
      true
    );
    assert.equal(Boolean(getVisiblePostBySlug("running-form-101", false, now)), true);
  });
});
