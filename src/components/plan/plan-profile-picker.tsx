"use client";

import { useMemo } from "react";
import { Calendar, Sparkles, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FITNESS_LEVEL_OPTIONS,
  getPlanTimelineHint,
  recommendPlanVariantId,
  type PlanPersonalization,
} from "@/lib/plan-personalization";
import type { TrainingPlan } from "@/lib/plans";
import { cn } from "@/lib/utils";

interface PlanProfilePickerProps {
  profile: PlanPersonalization;
  familyId: string;
  plan: TrainingPlan;
  currentWeek: number;
  onChange: (profile: PlanPersonalization) => void;
}

function minGoalDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
}

export function PlanProfilePicker({
  profile,
  familyId,
  plan,
  currentWeek,
  onChange,
}: PlanProfilePickerProps) {
  const recommendation = useMemo(
    () => recommendPlanVariantId(familyId, profile),
    [familyId, profile]
  );

  const timelineHint = useMemo(
    () => getPlanTimelineHint(profile, plan, currentWeek),
    [profile, plan, currentWeek]
  );

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5 space-y-5">
      <div>
        <h3 className="font-semibold">Your runner profile</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Age, fitness, and goal date tune plan length, weekly volume, and workout
          intensity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="plan-age" className="text-sm font-medium">
            Age
          </Label>
          <div className="relative mt-2">
            <User className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="plan-age"
              type="number"
              min={13}
              max={100}
              placeholder="e.g. 32"
              value={profile.age ?? ""}
              onChange={(e) =>
                onChange({
                  ...profile,
                  age: e.target.value ? parseInt(e.target.value, 10) : null,
                })
              }
              className="pl-8"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Runners 55+ get slightly lower volume for recovery.
          </p>
        </div>

        <div>
          <Label htmlFor="plan-goal-date" className="text-sm font-medium">
            Goal race date
          </Label>
          <div className="relative mt-2">
            <Calendar className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="plan-goal-date"
              type="date"
              min={minGoalDate()}
              value={profile.goalRaceDate?.slice(0, 10) ?? ""}
              onChange={(e) =>
                onChange({
                  ...profile,
                  goalRaceDate: e.target.value || null,
                })
              }
              className="pl-8"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Picks the best plan length and aligns your calendar.
          </p>
        </div>
      </div>

      <div role="group" aria-labelledby="plan-fitness-label">
        <p id="plan-fitness-label" className="text-sm font-medium mb-2">
          Current fitness level
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {FITNESS_LEVEL_OPTIONS.map((option) => {
            const selected = profile.fitnessLevel === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  onChange({ ...profile, fitnessLevel: option.value })
                }
                aria-pressed={selected}
                aria-label={`Fitness level: ${option.label}`}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-left transition-colors",
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border/60 bg-background hover:border-border"
                )}
              >
                <span className="text-sm font-medium">{option.label}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {(recommendation || timelineHint) && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
          <div className="flex items-start gap-2">
            <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              {recommendation && (
                <p className="text-foreground">{recommendation.note}</p>
              )}
              {timelineHint && (
                <p className="text-muted-foreground">{timelineHint}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
