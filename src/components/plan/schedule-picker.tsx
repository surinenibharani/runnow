"use client";

import { DAY_NAMES } from "@/lib/plan-types";
import type { SchedulePreferences } from "@/lib/schedule-builder";
import { cn } from "@/lib/utils";

interface SchedulePickerProps {
  preferences: SchedulePreferences;
  onChange: (prefs: SchedulePreferences) => void;
}

export function SchedulePicker({ preferences, onChange }: SchedulePickerProps) {
  const setRestDay = (day: number) => {
    const next = { ...preferences, restDay: day };
    if (next.longRunDay === day) {
      const fallback = DAY_NAMES.map((_, i) => i + 1).find((d) => d !== day) ?? 6;
      next.longRunDay = fallback;
    }
    onChange(next);
  };

  const setLongRunDay = (day: number) => {
    if (day === preferences.restDay) return;
    onChange({ ...preferences, longRunDay: day });
  };

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5 space-y-5">
      <div>
        <h3 className="font-semibold">Your weekly schedule</h3>
        <p className="text-sm text-muted-foreground mt-1">
          6 training days + 1 complete rest day. Runs and cross-training shift to
          match your chosen rest and long run days.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Rest day (complete rest)</p>
        <div className="flex flex-wrap gap-2">
          {DAY_NAMES.map((name, i) => {
            const day = i + 1;
            const selected = preferences.restDay === day;
            return (
              <button
                key={`rest-${name}`}
                type="button"
                onClick={() => setRestDay(day)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                  selected
                    ? "bg-muted border-border text-foreground"
                    : "bg-background border-border/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Long run day</p>
        <div className="flex flex-wrap gap-2">
          {DAY_NAMES.map((name, i) => {
            const day = i + 1;
            const isRest = day === preferences.restDay;
            const selected = preferences.longRunDay === day;
            return (
              <button
                key={`long-${name}`}
                type="button"
                disabled={isRest}
                onClick={() => setLongRunDay(day)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                  isRest && "opacity-40 cursor-not-allowed",
                  selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-md bg-primary/10 text-primary px-2 py-1">
          Long run: {DAY_NAMES[preferences.longRunDay - 1]}
        </span>
        <span className="rounded-md bg-muted px-2 py-1">
          Rest: {DAY_NAMES[preferences.restDay - 1]}
        </span>
        <span className="rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2 py-1">
          6 active days
        </span>
      </div>
    </div>
  );
}
