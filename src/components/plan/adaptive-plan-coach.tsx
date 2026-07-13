"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AdaptivePlanSuggestion } from "@/lib/adaptive-plan";
import { cn } from "@/lib/utils";

type AdaptivePlanCoachProps = {
  suggestion: AdaptivePlanSuggestion;
  onApplyWeek?: (week: number) => void;
  onApplyPlan?: (planId: string) => void;
};

const STATUS_STYLES: Record<AdaptivePlanSuggestion["status"], string> = {
  on_track: "border-primary/25 bg-primary/5",
  ahead: "border-sky-500/25 bg-sky-500/5",
  behind: "border-amber-500/30 bg-amber-500/5",
  strained: "border-destructive/25 bg-destructive/5",
  neutral: "border-border/60 bg-muted/20",
};

export function AdaptivePlanCoach({
  suggestion,
  onApplyWeek,
  onApplyPlan,
}: AdaptivePlanCoachProps) {
  const showWeek =
    suggestion.suggestedWeek != null &&
    onApplyWeek &&
    (suggestion.actionType === "repeat_week" ||
      suggestion.actionType === "ease_volume");

  const showPlan =
    suggestion.suggestedPlanId != null &&
    onApplyPlan &&
    suggestion.actionType === "consider_longer_plan";

  return (
    <Card className={cn("border", STATUS_STYLES[suggestion.status])}>
      <CardContent className="p-4 sm:p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/80 text-primary">
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Adaptive coach
            </p>
            <h3 className="font-semibold leading-snug">{suggestion.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {suggestion.detail}
            </p>
          </div>
        </div>
        {(showWeek || showPlan) && (
          <div className="flex flex-wrap gap-2 pl-0 sm:pl-12">
            {showWeek && suggestion.suggestedWeek != null && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onApplyWeek(suggestion.suggestedWeek!)}
              >
                Go to week {suggestion.suggestedWeek}
              </Button>
            )}
            {showPlan && suggestion.suggestedPlanId && (
              <Button
                size="sm"
                onClick={() => onApplyPlan(suggestion.suggestedPlanId!)}
              >
                Switch to recommended plan length
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
