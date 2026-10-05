import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { BlogSection } from "./types";
import {
  isResearchBlogSection,
  orderBlogSectionsForReading,
} from "./section-order";
import { blogPosts } from "./posts";

describe("isResearchBlogSection", () => {
  it("flags journal dumps and skips practical how-tos", () => {
    assert.equal(
      isResearchBlogSection({
        heading: "What medical journals actually show",
      }),
      true
    );
    assert.equal(
      isResearchBlogSection({
        heading: "How to overcome the wall — what the science supports",
      }),
      false
    );
    assert.equal(
      isResearchBlogSection({ heading: "What you can usually keep — the alternatives" }),
      false
    );
  });
});

describe("orderBlogSectionsForReading", () => {
  it("keeps the untitled intro first and moves research after practical lists", () => {
    const sections: BlogSection[] = [
      { paragraphs: ["Intro."] },
      { id: "journals", heading: "What medical journals actually show" },
      { id: "do-this", heading: "What to actually do" },
      { id: "final", heading: "Final thoughts" },
    ];
    const ordered = orderBlogSectionsForReading(sections);
    assert.deepEqual(
      ordered.map((section) => section.id ?? "intro"),
      ["intro", "do-this", "final", "journals"]
    );
  });

  it("is a no-op when research is already last", () => {
    const sections: BlogSection[] = [
      { paragraphs: ["Intro."] },
      { id: "do-this", heading: "Park these sports" },
      { id: "the-research", heading: "What the research says" },
    ];
    assert.equal(orderBlogSectionsForReading(sections), sections);
  });

  it("parks research sections after practical ones on every post", () => {
    for (const post of blogPosts) {
      const ordered = orderBlogSectionsForReading(post.sections);
      const researchFlags = ordered.map((section) =>
        isResearchBlogSection(section)
      );
      const firstResearch = researchFlags.indexOf(true);
      if (firstResearch === -1) continue;
      assert.ok(
        researchFlags.slice(firstResearch).every(Boolean),
        `${post.slug} still has practical copy after a research section`
      );
    }
  });
});
