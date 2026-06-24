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

function storageKey(planId: string): string {
  return `letsrunnow-progress-${planId}`;
}

function legacyStorageKey(planId: string): string {
  return `runnow-progress-${planId}`;
}

export function getProgress(planId: string): ProgressData {
  if (typeof window === "undefined") return defaultProgress;

  try {
    let raw = localStorage.getItem(storageKey(planId));
    if (!raw) {
      raw = localStorage.getItem(legacyStorageKey(planId));
      if (raw) {
        localStorage.setItem(storageKey(planId), raw);
        localStorage.removeItem(legacyStorageKey(planId));
      }
    }
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

export function toggleWorkout(planId: string, workoutId: string): ProgressData {
  const current = getProgress(planId);
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
  localStorage.setItem(storageKey(planId), JSON.stringify(updated));
  return updated;
}

export function resetProgress(planId: string): void {
  localStorage.removeItem(storageKey(planId));
}
