import type { FitnessLevel } from "@/lib/plan-personalization";

export type TrainingPlanState = {
  planId: string;
  planName?: string;
  currentWeek: number;
  restDay: number;
  longRunDay: number;
  runDaysPerWeek: 3 | 4;
  age: number | null;
  fitnessLevel: FitnessLevel;
  goalRaceDate: string | null;
  completedIds: string[];
  streak: number;
  lastCompletedDate: string | null;
  startedAt?: string;
};

export type WorkoutToggleContext = Pick<
  TrainingPlanState,
  | "planId"
  | "restDay"
  | "longRunDay"
  | "runDaysPerWeek"
  | "age"
  | "fitnessLevel"
  | "goalRaceDate"
>;

export async function fetchTrainingPlan(): Promise<TrainingPlanState | null> {
  const res = await fetch("/api/user/training-plan");
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to load training plan");
  return res.json();
}

export async function saveTrainingPlan(
  data: Partial<TrainingPlanState>
): Promise<TrainingPlanState> {
  const res = await fetch("/api/user/training-plan", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save training plan");
  return res.json();
}

export async function toggleWorkoutRemote(
  workoutId: string,
  completed: boolean,
  context: WorkoutToggleContext
): Promise<Pick<TrainingPlanState, "completedIds" | "streak" | "lastCompletedDate">> {
  const res = await fetch("/api/user/training-plan", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workoutId, completed, ...context }),
  });
  if (!res.ok) throw new Error("Failed to update workout");
  return res.json();
}

export async function resetTrainingPlanRemote(): Promise<
  Pick<TrainingPlanState, "completedIds" | "streak" | "lastCompletedDate" | "currentWeek">
> {
  const res = await fetch("/api/user/training-plan?reset=progress", {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to reset training plan");
  return res.json();
}

export async function deleteTrainingPlan(): Promise<TrainingPlanState> {
  const res = await fetch("/api/user/training-plan?reset=all", { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete training plan");
  return res.json();
}
