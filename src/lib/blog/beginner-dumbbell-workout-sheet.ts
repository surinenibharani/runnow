export type BeginnerDumbbellExercise = {
  id: string;
  name: string;
  prescription: string;
};

export const BEGINNER_DUMBBELL_WORKOUT_SLUG = "beginner-dumbbell-workout-at-home";

export const beginnerDumbbellExercises: BeginnerDumbbellExercise[] = [
  {
    id: "deadlift",
    name: "Deadlift",
    prescription: "3 × 12–15",
  },
  {
    id: "goblet-squat",
    name: "Goblet squat",
    prescription: "3 × 12–15",
  },
  {
    id: "thread-row",
    name: "Thread the needle row",
    prescription: "3 × 12–15 / side",
  },
  {
    id: "chest-raise",
    name: "Dumbbell chest raise",
    prescription: "3 × 12–15",
  },
  {
    id: "rope-pull",
    name: "Rope pull (behind head)",
    prescription: "3 × 12–15",
  },
  {
    id: "bicep-curl",
    name: "Straight bicep curls",
    prescription: "3 × 12–15",
  },
  {
    id: "hammer-curl",
    name: "Hammer curls",
    prescription: "3 × 12–15",
  },
];

export const beginnerDumbbellTrackerWeeks = 12;

export const beginnerDumbbellWeekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export function beginnerDumbbellWorkoutPrintablePath(): string {
  return `/blog/${BEGINNER_DUMBBELL_WORKOUT_SLUG}/printable`;
}
