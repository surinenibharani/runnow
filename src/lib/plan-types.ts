export type RunType =
  | "walk-run"
  | "easy"
  | "tempo"
  | "interval"
  | "recovery"
  | "long"
  | "race";

export type CrossTrainCategory =
  | "yoga"
  | "walking"
  | "cycling"
  | "weights"
  | "bodyweight";

export interface CrossTrainingActivity {
  category: CrossTrainCategory;
  title: string;
  details: string;
}

export interface CrossTraining {
  id: string;
  name: string;
  focus: string;
  duration: string;
  activities: CrossTrainingActivity[];
}

export interface Workout {
  id: string;
  day: number;
  name: string;
  description: string;
  duration: string;
  intervals: string;
  runType: RunType;
}

export interface ScheduleDay {
  id: string;
  dayOfWeek: number;
  dayName: string;
  kind: "run" | "cross-train" | "rest";
  run?: Workout;
  crossTraining?: CrossTraining;
}

export interface WeekTemplate {
  week: number;
  title: string;
  focus: string;
  runs: Workout[];
}

export interface ScheduledWeek {
  week: number;
  title: string;
  focus: string;
  days: ScheduleDay[];
}

export interface TrainingPlan {
  id: string;
  familyId: string;
  name: string;
  shortName: string;
  description: string;
  duration: string;
  durationWeeks: number;
  prerequisite: string;
  runsPerWeek: number;
  weeks: WeekTemplate[];
}

export interface PlanFamily {
  id: string;
  name: string;
  shortName: string;
  prerequisite: string;
  runsPerWeek: number;
  variantIds: string[];
}

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function getTotalWorkouts(weeks: ScheduledWeek[]): number {
  return weeks.reduce(
    (sum, w) =>
      sum + w.days.filter((d) => d.kind === "run" || d.kind === "cross-train").length,
    0
  );
}

type WorkoutInput = Omit<Workout, "id"> & { id?: string };

export function buildWeek(
  planId: string,
  weekNum: number,
  title: string,
  focus: string,
  workouts: WorkoutInput[]
): WeekTemplate {
  return {
    week: weekNum,
    title,
    focus,
    runs: workouts.map((w) => ({
      ...w,
      id: w.id ?? `${planId}-w${weekNum}r${w.day}`,
    })),
  };
}

type RunInput = Omit<Workout, "id" | "runType"> & {
  id?: string;
  runType?: RunType;
};

export function runs(
  planId: string,
  weekNum: number,
  items: RunInput[]
): WorkoutInput[] {
  return items.map((item, i) => ({
    ...item,
    day: item.day ?? i + 1,
    runType: item.runType ?? inferRunType(item),
  }));
}

function inferRunType(item: RunInput): RunType {
  const text = `${item.name} ${item.description} ${item.intervals}`.toLowerCase();
  if (
    text.includes("5k") ||
    text.includes("13.1") ||
    text.includes("26.2") ||
    text.includes("race day") ||
    text.includes("coronation") ||
    text.includes("victory lap")
  )
    return "race";
  if (
    text.includes("long") ||
    (text.includes(" mi easy") &&
      (text.includes("10 mi") ||
        text.includes("11 mi") ||
        text.includes("12 mi") ||
        text.includes("13 mi") ||
        text.includes("14 mi") ||
        text.includes("15 mi") ||
        text.includes("16 mi") ||
        text.includes("17 mi") ||
        text.includes("18 mi") ||
        text.includes("20 mi") ||
        text.includes("22 mi") ||
        text.includes("winding road") ||
        text.includes("dozen") ||
        text.includes("double digit") ||
        text.includes("two-oh") ||
        text.includes("two-two")))
  )
    return "long";
  if (
    text.includes("tempo") ||
    text.includes("fartlek") ||
    text.includes("brisk") ||
    text.includes("race pace")
  )
    return "tempo";
  if (
    text.includes("interval") ||
    text.includes("400m") ||
    text.includes("hill") ||
    text.includes("pick-up") ||
    text.includes("× 1 min fast") ||
    text.includes("speed")
  )
    return "interval";
  if (
    text.includes("recovery") ||
    text.includes("shuffle") ||
    text.includes("pajama") ||
    text.includes("jelly")
  )
    return "recovery";
  if (
    text.includes("walk-run") ||
    text.includes("jog 1 min") ||
    text.includes("jog 1.5") ||
    text.includes("jog 2 min") ||
    text.includes("walk 2 min")
  )
    return "walk-run";
  return "easy";
}
