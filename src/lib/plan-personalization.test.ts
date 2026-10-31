import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getPlanById, PLANS } from "./plans";
import {
  easyPaceMinPerMile,
  LEVEL_VOLUME,
  personalizePlanWorkouts,
  volumeMultiplier,
  type PlanPersonalization,
} from "./plan-personalization";
import { parseWorkoutIntervals } from "./workout-intervals";
import { estimateMinutes, formatWorkoutTimeAndDistance } from "./workout-load";

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

const advanced: PlanPersonalization = {
  age: null,
  fitnessLevel: "advanced",
  goalRaceDate: null,
};

describe("level volume and pace", () => {
  it("steps volume up from Novice to Intermediate to Advanced", () => {
    assert.equal(LEVEL_VOLUME.beginner, 1);
    assert.ok(LEVEL_VOLUME.returning > LEVEL_VOLUME.beginner);
    assert.ok(LEVEL_VOLUME.intermediate > LEVEL_VOLUME.returning);
    assert.ok(LEVEL_VOLUME.advanced > LEVEL_VOLUME.intermediate);
  });

  it("gives beginners a slower easy pace than advanced", () => {
    assert.ok(
      easyPaceMinPerMile("beginner", "easy") >
        easyPaceMinPerMile("advanced", "easy")
    );
    assert.ok(
      easyPaceMinPerMile("beginner", "walk-run") >
        easyPaceMinPerMile("intermediate", "walk-run")
    );
  });

  it("keeps skill-level volume on the last week", () => {
    assert.ok(
      volumeMultiplier(advanced, 8, 8, "5k") >
        volumeMultiplier(beginner, 8, 8, "5k")
    );
    assert.ok(
      volumeMultiplier(beginner, 12, 12, "half-marathon") <
        volumeMultiplier(intermediate, 12, 12, "half-marathon")
    );
  });

  it("tapers 5K race week below the peak week", () => {
    assert.ok(
      volumeMultiplier(intermediate, 8, 8, "5k") <
        volumeMultiplier(intermediate, 7, 8, "5k")
    );
  });

  it("ramps beginner half-marathon from an easier opener toward peak", () => {
    assert.ok(volumeMultiplier(beginner, 1, 12, "half-marathon") < 0.8);
    assert.ok(
      volumeMultiplier(beginner, 9, 12, "half-marathon") >
        volumeMultiplier(beginner, 1, 12, "half-marathon")
    );
    assert.equal(volumeMultiplier(intermediate, 1, 12, "half-marathon"), 1);
  });
});

describe("personalizePlanWorkouts", () => {
  it("keeps couch-to-5K beginner week 1 on NHS-style ~25 min walk-run", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const personalized = personalizePlanWorkouts(plan, beginner);
    const run = personalized.weeks[0]?.runs[0];
    assert.ok(run);
    assert.match(run.duration, /25 min/);
    assert.match(formatWorkoutTimeAndDistance(run), /~25 min · ~1\.8 mi/);
  });

  it("labels 5K week 1 by Higdon-style volume", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const label = (level: PlanPersonalization["fitnessLevel"]) => {
      const run = personalizePlanWorkouts(plan, {
        age: null,
        fitnessLevel: level,
        goalRaceDate: null,
      }).weeks[0]!.runs[0]!;
      return formatWorkoutTimeAndDistance(run);
    };
    assert.equal(label("beginner"), "~25 min · ~1.8 mi");
    assert.equal(label("returning"), "~28 min · ~2 mi");
    assert.equal(label("intermediate"), "~30 min · ~2.2 mi");
    assert.equal(label("advanced"), "~34 min · ~2.4 mi");
  });

  it("gives intermediate 5K week 1 more time and distance than beginner", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const beg = personalizePlanWorkouts(plan, beginner).weeks[0]!.runs[0]!;
    const mid = personalizePlanWorkouts(plan, intermediate).weeks[0]!.runs[0]!;
    const begMiles = parseFloat(beg.distance?.replace(/[^\d.]/g, "") ?? "0");
    const midMiles = parseFloat(mid.distance?.replace(/[^\d.]/g, "") ?? "0");
    assert.ok(midMiles > begMiles);
    assert.ok(estimateMinutes(mid.duration) > estimateMinutes(beg.duration));
  });

  it("keeps 5K race at 3.1 mi and shortens race time for advanced", () => {
    const plan = getPlanById("5k-8w");
    assert.ok(plan);
    const beg = personalizePlanWorkouts(plan, beginner).weeks.at(-1)!.runs.find(
      (r) => r.runType === "race"
    )!;
    const adv = personalizePlanWorkouts(plan, advanced).weeks.at(-1)!.runs.find(
      (r) => r.runType === "race"
    )!;
    assert.match(beg.distance ?? "", /3\.1 mi/);
    assert.match(adv.distance ?? "", /3\.1 mi/);
    assert.ok(estimateMinutes(adv.duration) < estimateMinutes(beg.duration));
  });

  it("gives beginner half-marathon a walk-run opener under 3 miles", () => {
    const plan = getPlanById("half-12w");
    assert.ok(plan);
    const beg = personalizePlanWorkouts(plan, beginner).weeks[0]!.runs[0]!;
    const mid = personalizePlanWorkouts(plan, intermediate).weeks[0]!.runs[0]!;
    assert.equal(beg.runType, "walk-run");
    assert.match(beg.intervals, /Jog 1 min/);
    assert.equal(formatWorkoutTimeAndDistance(beg), "~20 min · ~1.4 mi");
    assert.ok(parseWorkoutIntervals(beg.intervals));
    assert.match(formatWorkoutTimeAndDistance(mid), /~30 min · ~3 mi/);
  });

  it("changes every week's time or distance with skill level on every plan", () => {
    for (const plan of PLANS) {
      const begPlan = personalizePlanWorkouts(plan, beginner);
      const advPlan = personalizePlanWorkouts(plan, advanced);
      assert.equal(begPlan.weeks.length, plan.weeks.length, plan.id);
      for (let i = 0; i < plan.weeks.length; i++) {
        const begRuns = begPlan.weeks[i]!.runs;
        const advRuns = advPlan.weeks[i]!.runs;
        const weekDiffers = begRuns.some((run, j) => {
          const other = advRuns[j];
          if (!other) return true;
          return (
            formatWorkoutTimeAndDistance(run) !==
            formatWorkoutTimeAndDistance(other)
          );
        });
        assert.ok(
          weekDiffers,
          `${plan.id} week ${plan.weeks[i]!.week} should change with skill level`
        );
      }
    }
  });

  it("keeps half-marathon later weeks easier for beginners than intermediates", () => {
    const plan = getPlanById("half-12w");
    assert.ok(plan);
    const midWeek = 5;
    const beg = personalizePlanWorkouts(plan, beginner).weeks[midWeek]!.runs.find(
      (r) => r.runType === "walk-run" || r.runType === "long"
    )!;
    const mid = personalizePlanWorkouts(plan, intermediate).weeks[midWeek]!.runs.find(
      (r) => r.runType === "long" || r.runType === "easy"
    )!;
    assert.ok(estimateMinutes(beg.duration) < estimateMinutes(mid.duration));
    const begMiles = parseFloat(beg.distance?.replace(/[^\d.]/g, "") ?? "9");
    const midMiles = parseFloat(mid.distance?.replace(/[^\d.]/g, "") ?? "0");
    assert.ok(begMiles < midMiles);
  });

  it("scales a 10K long run's miles for advanced, keeps race at 6.2", () => {
    const plan = getPlanById("10k-8w");
    assert.ok(plan);
    const long = personalizePlanWorkouts(plan, advanced).weeks[0]!.runs.find(
      (r) => r.runType === "long"
    );
    const templateLong = plan.weeks[0]!.runs.find((r) => r.runType === "long");
    assert.ok(long);
    assert.ok(templateLong);
    const templateMiles = parseFloat(
      /([\d.]+)\s*mi/.exec(templateLong.intervals)?.[1] ?? "0"
    );
    const advancedMiles = parseFloat(long.distance?.replace(/[^\d.]/g, "") ?? "0");
    assert.ok(templateMiles > 0);
    assert.ok(advancedMiles > templateMiles);

    const raceWeek = personalizePlanWorkouts(plan, advanced).weeks.at(-1);
    const race = raceWeek?.runs.find((r) => r.runType === "race");
    assert.ok(race);
    assert.match(race.distance ?? "", /6\.2 mi/);
  });
});
