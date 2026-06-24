import type { SchedulePreferences } from "@/lib/schedule-builder";
import { DEFAULT_SCHEDULE } from "@/lib/schedule-builder";

const STORAGE_KEY = "runnow-schedule-prefs";

export function getSchedulePreferences(): SchedulePreferences {
  if (typeof window === "undefined") return DEFAULT_SCHEDULE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SCHEDULE;
    const parsed = JSON.parse(raw) as SchedulePreferences;
    if (parsed.restDay === parsed.longRunDay) return DEFAULT_SCHEDULE;
    return { ...DEFAULT_SCHEDULE, ...parsed };
  } catch {
    return DEFAULT_SCHEDULE;
  }
}

export function saveSchedulePreferences(prefs: SchedulePreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}
