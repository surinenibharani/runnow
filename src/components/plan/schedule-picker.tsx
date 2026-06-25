"use client";

import { DAY_NAMES } from "@/lib/plan-types";
import type { SchedulePreferences } from "@/lib/schedule-builder";
import { cn } from "@/lib/utils";

interface SchedulePickerProps {
  preferences: SchedulePreferences;
  onChange: (prefs: SchedulePreferences) => void;
}

const dayButtonClass = (selected: boolean, disabled = false) =>
  cn(
    "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
    disabled && "opacity-50 cursor-not-allowed",
    selected
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-background border-border/60 text-foreground/80 hover:text-foreground"
  );

export function SchedulePicker({ preferences, onChange }: SchedulePickerProps) {
  const crossTrainDays = 6 - preferences.runDaysPerWeek;

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

  const setRunDaysPerWeek = (count: 3 | 4) => {
    onChange({ ...preferences, runDaysPerWeek: count });
  };

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5 space-y-5">
      <div>
        <h3 className="font-semibold">Your weekly schedule</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose how many days you run each week, then set your rest and long run
          days. Cross-training fills the remaining active days.
        </p>
      </div>

      <div role="group" aria-labelledby="schedule-run-days-label">
        <p id="schedule-run-days-label" className="text-sm font-medium mb-2">
          Run days per week
        </p>
        <div className="flex flex-wrap gap-2">
          {([3, 4] as const).map((count) => {
            const selected = preferences.runDaysPerWeek === count;
            return (
              <button
                key={`runs-${count}`}
                type="button"
                onClick={() => setRunDaysPerWeek(count)}
                aria-pressed={selected}
                aria-label={`${count} run days per week`}
                className={dayButtonClass(selected)}
              >
                {count} days
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {preferences.runDaysPerWeek} runs + {crossTrainDays} cross-training + 1
          rest day
        </p>
      </div>

      <div role="group" aria-labelledby="schedule-rest-day-label">
        <p id="schedule-rest-day-label" className="text-sm font-medium mb-2">
          Rest day (complete rest)
        </p>
        <div className="flex flex-wrap gap-2">
          {DAY_NAMES.map((name, i) => {
            const day = i + 1;
            const selected = preferences.restDay === day;
            return (
              <button
                key={`rest-${name}`}
                type="button"
                onClick={() => setRestDay(day)}
                aria-pressed={selected}
                aria-label={`Rest day: ${name}`}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                  selected
                    ? "bg-muted border-border text-foreground"
                    : "bg-background border-border/60 text-foreground/80 hover:text-foreground"
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <div role="group" aria-labelledby="schedule-long-run-label">
        <p id="schedule-long-run-label" className="text-sm font-medium mb-2">
          Long run day
        </p>
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
                aria-pressed={selected}
                aria-label={
                  isRest
                    ? `${name} unavailable — selected as rest day`
                    : `Long run day: ${name}`
                }
                className={dayButtonClass(selected, isRest)}
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
        <span className="rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-1">
          {preferences.runDaysPerWeek} run days
        </span>
        <span className="rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-400 px-2 py-1">
          {crossTrainDays} cross-train
        </span>
      </div>
    </div>
  );
}
