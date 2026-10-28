"use client";

import { useMemo } from "react";
import { Sparkles, User } from "lucide-react";
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
          Age and fitness change each run&apos;s time and distance. Set a
          first-race date below for a countdown and plan-length hint.
        </p>
      </div>

      <div>
        <Label htmlFor="plan-age" className="text-sm font-medium">
          Age
        </Label>
        <div className="relative mt-2 max-w-xs">
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
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Miles and minutes step up from the Novice template the way classic
          planners do (
          <a
            href="https://www.halhigdon.com/training-programs/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hal Higdon
          </a>{" "}
          Novice → Intermediate). Race-day time uses easy, conversational pace
          — slower when you&apos;re newer (
          <a
            href="https://www.vdoto2.com/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jack Daniels
          </a>{" "}
          easy-pace bands).{" "}
          <a
            href="https://www.nhs.uk/better-health/get-active/get-running-with-couch-to-5k/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NHS Couch to 5K
          </a>{" "}
          keeps true beginners on ~20–30 minute walk–run sessions;{" "}
          <a
            href="https://acsm.org/education-resources/books/guidelines-exercise-testing-prescription/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ACSM
          </a>{" "}
          progressive overload keeps the jump modest.
        </p>
        {profile.fitnessLevel === "beginner" &&
          (familyId === "10k" ||
            familyId === "half-marathon" ||
            familyId === "full-marathon") && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {familyId === "full-marathon" ? "Marathon" : familyId === "10k" ? "10K" : "Half-marathon"}{" "}
              tables usually assume you can already jog about 30 minutes (
              <a
                href="https://www.halhigdon.com/training-programs/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hal Higdon
              </a>{" "}
              Novice). Your beginner week uses shorter walk–run days instead of
              the written continuous miles. A 5K plan first is safer if the
              race can wait.
            </p>
          )}
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
