const STORAGE_KEY = "runnow-progress";

export interface ProgressData {
  completed: string[];
  lastCompletedDate: string | null;
  streak: number;
}

const defaultProgress: ProgressData = {
  completed: [],
  lastCompletedDate: null,
  streak: 0,
};

export function getProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

function isYesterday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function isToday(dateStr: string): boolean {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

export function toggleWorkout(workoutId: string): ProgressData {
  const current = getProgress();
  const today = new Date().toISOString();
  const isCompleted = current.completed.includes(workoutId);

  let completed: string[];
  let lastCompletedDate = current.lastCompletedDate;
  let streak = current.streak;

  if (isCompleted) {
    completed = current.completed.filter((id) => id !== workoutId);
  } else {
    completed = [...current.completed, workoutId];
    lastCompletedDate = today;

    if (current.lastCompletedDate) {
      if (isToday(current.lastCompletedDate)) {
        streak = current.streak;
      } else if (isYesterday(current.lastCompletedDate)) {
        streak = current.streak + 1;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }
  }

  const updated: ProgressData = { completed, lastCompletedDate, streak };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
