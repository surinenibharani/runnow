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
  completed: boolean
): Promise<Pick<TrainingPlanState, "completedIds" | "streak" | "lastCompletedDate">> {
  const res = await fetch("/api/user/training-plan", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workoutId, completed }),
  });
  if (!res.ok) throw new Error("Failed to update workout");
  return res.json();
}

export async function resetTrainingPlanRemote(): Promise<TrainingPlanState> {
  const res = await fetch("/api/user/training-plan", { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to reset training plan");
  return res.json();
}
