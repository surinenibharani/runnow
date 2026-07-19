import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  fitnessScore,
  isOnboardingComplete,
  recommendOnboardingPlan,
  type OnboardingAnswers,
} from "./onboarding";

const base: OnboardingAnswers = {
  experience: "never",
  longestRun: "none",
  goal: "5k",
  timeline: "no-rush",
  days: 3,
  ageBand: "under-40",
  setback: "none",
};

describe("onboarding recommendations", () => {
  it("sends never-ran beginners to the gentlest couch to 5K", () => {
    const result = recommendOnboardingPlan(base);
    assert.equal(result.planId, "5k-8w");
  });

  it("routes jog-ready athletes toward 10K when fitness supports it", () => {
    const result = recommendOnboardingPlan({
      ...base,
      experience: "jog-20",
      longestRun: "20-30",
      goal: "10k",
      timeline: "8-12",
    });
    assert.equal(result.plan.familyId, "10k");
  });

  it("keeps marathon beginners on 5K first", () => {
    const result = recommendOnboardingPlan({
      ...base,
      goal: "marathon",
      days: 4,
    });
    assert.equal(result.planId, "5k-8w");
  });

  it("allows marathon only for consistent high-fitness runners", () => {
    const result = recommendOnboardingPlan({
      experience: "consistent",
      longestRun: "30-plus",
      goal: "marathon",
      timeline: "12-plus",
      days: 4,
      ageBand: "under-40",
      setback: "none",
    });
    assert.equal(result.plan.familyId, "full-marathon");
  });

  it("biases masters / niggles toward gentler volume messaging", () => {
    const result = recommendOnboardingPlan({
      ...base,
      experience: "jog-20",
      longestRun: "20-30",
      goal: "5k",
      ageBand: "55-plus",
      setback: "niggle",
      niggleArea: "knee",
      niggleSeverity: "mild-after",
      timeline: "4-6",
    });
    assert.equal(result.plan.familyId, "5k");
    assert.ok(result.caution || result.note);
    assert.ok(result.crossTrain.length > 0);
    assert.equal(result.healthFocus, "knee comfort");
  });

  it("forces a gentle 5K start for sharp or daily niggles", () => {
    const result = recommendOnboardingPlan({
      experience: "consistent",
      longestRun: "30-plus",
      goal: "half",
      timeline: "12-plus",
      days: 4,
      ageBand: "under-40",
      setback: "niggle",
      niggleArea: "shin",
      niggleSeverity: "sharp-worsening",
    });
    assert.equal(result.plan.familyId, "5k");
    assert.ok(result.caution);
    assert.equal(result.injuryHref, "/injuries/shin-splints");
  });

  it("scores fitness from experience + longest run", () => {
    assert.equal(fitnessScore(base), 0);
    assert.ok(
      fitnessScore({
        ...base,
        experience: "consistent",
        longestRun: "30-plus",
      }) > fitnessScore(base)
    );
  });
});

describe("onboarding completion", () => {
  it("requires time-off follow-ups", () => {
    assert.equal(
      isOnboardingComplete({
        ...base,
        setback: "time-off",
      }),
      false
    );
    assert.equal(
      isOnboardingComplete({
        ...base,
        setback: "time-off",
        timeOffDuration: "1-3mo",
        timeOffReason: "life",
      }),
      true
    );
  });

  it("requires niggle follow-ups", () => {
    assert.equal(
      isOnboardingComplete({
        ...base,
        setback: "niggle",
      }),
      false
    );
    assert.equal(
      isOnboardingComplete({
        ...base,
        setback: "niggle",
        niggleArea: "knee",
        niggleSeverity: "mild-after",
      }),
      true
    );
  });
});
