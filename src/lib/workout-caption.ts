import type { RunType, ScheduleDay, Workout } from "@/lib/plan-types";

type CaptionContext = {
  durationLabel: string;
  durationWeeks: number;
  weekNumber: number;
  runDaysPerWeek: 3 | 4;
  isLongRunDay: boolean;
};

function timelineNote(week: number, totalWeeks: number, runType: RunType): string {
  if (runType === "race" || week === 1) return "";

  if (week === totalWeeks) {
    return " Final week of your plan — trust the work you've put in.";
  }
  if (week === totalWeeks - 1) {
    return " One week out — stay sharp but don't overdo it.";
  }

  const progress = week / totalWeeks;
  if (progress <= 0.3) {
    return " Early weeks — build the habit and keep every run easy.";
  }
  if (progress <= 0.55) {
    return " Mid-plan — consistency matters more than any single workout.";
  }
  if (progress <= 0.8) {
    return " Past halfway — your body is adapting to the workload.";
  }
  return " Late in the plan — protect your legs for race day.";
}

function runScheduleNote(
  run: Workout,
  runDaysPerWeek: 3 | 4,
  isLongRunDay: boolean
): string {
  if (run.id.includes("-extra")) {
    return " Added for your 4-day schedule — keep this run fully easy.";
  }

  if (runDaysPerWeek === 3) {
    if (run.runType === "long" || run.runType === "race" || isLongRunDay) {
      return " Three runs per week — this is your longest effort. Hold back on pace.";
    }
    if (run.runType === "tempo" || run.runType === "interval") {
      return " Three runs per week — your only harder session. Warm up and cool down well.";
    }
    if (run.runType === "walk-run") {
      return " Three runs per week — walk breaks are part of the workout, not a failure.";
    }
    return " Three runs per week — conversational pace only on this one.";
  }

  if (run.runType === "recovery") {
    return " Four runs per week — shake out tired legs without adding stress.";
  }
  if (run.runType === "long" || run.runType === "race" || isLongRunDay) {
    return " Four runs per week — save your energy for the long effort.";
  }
  return " Four runs per week — easy enough to recover before your next run.";
}

function crossTrainScheduleNote(runDaysPerWeek: 3 | 4): string {
  if (runDaysPerWeek === 3) {
    return "With 3 run days, cross-training keeps you active without extra impact.";
  }
  return "With 4 run days, use cross-training for mobility and strength — not more running.";
}

export function getActivityCaption(day: ScheduleDay, ctx: CaptionContext): string {
  if (day.kind === "rest") {
    const crossDays = 6 - ctx.runDaysPerWeek;
    return `Full rest — no running or cross-training. You have ${ctx.runDaysPerWeek} runs and ${crossDays} cross-training days this week.`;
  }

  if (day.kind === "cross-train" && day.crossTraining) {
    return `${day.crossTraining.focus} ${crossTrainScheduleNote(ctx.runDaysPerWeek)}`;
  }

  if (day.kind === "run" && day.run) {
    const run = day.run;
    const parts = [
      run.description,
      timelineNote(ctx.weekNumber, ctx.durationWeeks, run.runType),
      runScheduleNote(run, ctx.runDaysPerWeek, ctx.isLongRunDay),
    ].filter(Boolean);
    return parts.join("");
  }

  return "";
}
