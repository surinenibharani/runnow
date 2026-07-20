import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isAppPathHref,
  isInPageOrHashHref,
} from "../../components/blog/format-blog-text";

describe("content link href classification", () => {
  it("treats hash-only and path+hash as in-page scroll links", () => {
    assert.equal(isInPageOrHashHref("#what-science-shows"), true);
    assert.equal(
      isInPageOrHashHref("/blog/why-super-shoes-not-for-everybody#what-science-shows"),
      true
    );
    assert.equal(isInPageOrHashHref("/injuries/for-women-runners#pelvic-floor"), true);
  });

  it("treats plain app paths as Next Link routes", () => {
    assert.equal(isAppPathHref("/blog/choosing-running-shoes"), true);
    assert.equal(isAppPathHref("/tips/slow-down-seriously"), true);
    assert.equal(isAppPathHref("#comments"), false);
    assert.equal(isAppPathHref("/blog/foo#bar"), false);
  });
});
