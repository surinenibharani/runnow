export interface Workout {
  id: string;
  day: number;
  name: string;
  description: string;
  duration: string;
  intervals: string;
}

export interface Week {
  week: number;
  title: string;
  focus: string;
  workouts: Workout[];
}

export interface TrainingPlan {
  id: string;
  name: string;
  shortName: string;
  description: string;
  duration: string;
  prerequisite: string;
  runsPerWeek: number;
  weeks: Week[];
}

export function getTotalWorkouts(plan: TrainingPlan): number {
  return plan.weeks.reduce((sum, w) => sum + w.workouts.length, 0);
}

type WorkoutInput = Omit<Workout, "id"> & { id?: string };

export function buildWeek(
  planId: string,
  weekNum: number,
  title: string,
  focus: string,
  workouts: WorkoutInput[]
): Week {
  return {
    week: weekNum,
    title,
    focus,
    workouts: workouts.map((w) => ({
      ...w,
      id: w.id ?? `${planId}-w${weekNum}d${w.day}`,
    })),
  };
}
