import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { personalizePlanWorkouts, type PlanPersonalization } from "./plan-personalization";
import {
  isCutbackWeek,
  longRunMiles,
  peakWeekNumber,
  trainingMiles,
} from "./plan-periodization";
import { PLANS } from "./plans";

const beginner: PlanPersonalization = {
  age: null,
  fitnessLevel: "beginner",
  goalRaceDate: null,
};

const intermediate: PlanPersonalization = {
  age: null,
  fitnessLevel: "intermediate",
  goalRaceDate: null,
};

describe("international-style progression", () => {
  it("caps long-run jumps on distance plans", () => {
    for (const plan of PLANS.filter((row) => row.familyId !== "5k")) {
      const personalized = personalizePlanWorkouts(plan, beginner);
      const peakWeek = peakWeekNumber(plan.familyId, plan.durationWeeks);
      let prev = 0;
      for (const week of personalized.weeks) {
        if (week.week > peakWeek) break;
        const miles = longRunMiles(week);
        if (
          miles > 0 &&
          prev > 0 &&
          !isCutbackWeek(plan.familyId, week.week - 1, plan.durationWeeks)
        ) {
          assert.ok(
            miles <= prev + 2.1,
            `${plan.id} week ${week.week} long ${miles} after ${prev}`
          );
        }
        if (miles > 0) prev = miles;
      }
    }
  });

  it("tapers training miles before race week", () => {
    for (const plan of PLANS) {
      const personalized = personalizePlanWorkouts(plan, intermediate);
      const peakWeek = peakWeekNumber(plan.familyId, plan.durationWeeks);
      const peak = Math.max(
        ...personalized.weeks
          .filter((week) => week.week <= peakWeek)
          .map((week) => trainingMiles(week))
      );
      const raceWeek = personalized.weeks.at(-1)!;
      const raceTraining = trainingMiles(raceWeek);
      if (peak > 4) {
        assert.ok(
          raceTraining < peak * 0.85,
          `${plan.id} race-week training ${raceTraining} vs peak ${peak}`
        );
      }
      const race = raceWeek.runs.find((run) => run.runType === "race");
      assert.ok(race, plan.id);
    }
  });

  it("gives beginners a half-marathon peak long run of at least 10 miles", () => {
    const plan = PLANS.find((row) => row.id === "half-12w");
    assert.ok(plan);
    const personalized = personalizePlanWorkouts(plan, beginner);
    const peak = Math.max(...personalized.weeks.map((week) => longRunMiles(week)));
    assert.ok(peak >= 9.8, `peak long ${peak}`);
  });

  it("gives beginners a marathon peak long run of at least 16 miles", () => {
    const plan = PLANS.find((row) => row.id === "full-14w");
    assert.ok(plan);
    const personalized = personalizePlanWorkouts(plan, beginner);
    const peak = Math.max(...personalized.weeks.map((week) => longRunMiles(week)));
    assert.ok(peak >= 15.8, `peak long ${peak}`);
  });

  it("builds the 8-week half with rising longs then a taper", () => {
    const plan = PLANS.find((row) => row.id === "half-8w");
    assert.ok(plan);
    const personalized = personalizePlanWorkouts(plan, intermediate);
    const longs = personalized.weeks.map((week) => longRunMiles(week));
    assert.ok(longs[0]! >= 4.8 && longs[0]! <= 5.5);
    assert.ok(longs[5]! > longs[0]!);
    assert.ok(longs[6]! < longs[5]!);
    assert.equal(longs[7], 0);
  });
});
