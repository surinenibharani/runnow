import type { SchedulePreferences } from "@/lib/schedule-builder";
import { DEFAULT_SCHEDULE } from "@/lib/schedule-builder";

const STORAGE_KEY = "letsrunnow-schedule-prefs";
const LEGACY_STORAGE_KEY = "runnow-schedule-prefs";

export function getSchedulePreferences(): SchedulePreferences {
  if (typeof window === "undefined") return DEFAULT_SCHEDULE;

  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        localStorage.setItem(STORAGE_KEY, raw);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    }
    if (!raw) return DEFAULT_SCHEDULE;
    const parsed = JSON.parse(raw) as SchedulePreferences;
    if (parsed.restDay === parsed.longRunDay) return DEFAULT_SCHEDULE;
    const merged = { ...DEFAULT_SCHEDULE, ...parsed };
    if (merged.runDaysPerWeek !== 3 && merged.runDaysPerWeek !== 4) {
      merged.runDaysPerWeek = DEFAULT_SCHEDULE.runDaysPerWeek;
    }
    return merged;
  } catch {
    return DEFAULT_SCHEDULE;
  }
}

export function saveSchedulePreferences(prefs: SchedulePreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}
