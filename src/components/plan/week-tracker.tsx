"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Flame, Moon, RotateCcw } from "lucide-react";
import {
  PLAN_FAMILIES,
  PLANS,
  DEFAULT_PLAN_ID,
  getPlansForFamily,
  getTotalWorkouts,
} from "@/lib/plans";
import type { TrainingPlan, ScheduleDay } from "@/lib/plans";
import { applyScheduleToPlan } from "@/lib/schedule-builder";
import type { SchedulePreferences } from "@/lib/schedule-builder";
import {
  getSchedulePreferences,
  saveSchedulePreferences,
} from "@/lib/schedule-preferences";
import { getProgress, toggleWorkout, resetProgress, type ProgressData } from "@/lib/progress";
import { CrossTrainingDetails, CrossTrainingPreview } from "@/components/plan/cross-training-details";
import { SchedulePicker } from "@/components/plan/schedule-picker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

function resolveInitialPlan(searchPlan: string | null): TrainingPlan {
  if (searchPlan && PLANS.some((p) => p.id === searchPlan)) {
    return PLANS.find((p) => p.id === searchPlan)!;
  }
  return PLANS.find((p) => p.id === DEFAULT_PLAN_ID) ?? PLANS[0];
}

export function WeekTracker() {
  const searchParams = useSearchParams();
  const initialPlan = resolveInitialPlan(searchParams.get("plan"));

  const [familyId, setFamilyId] = useState(initialPlan.familyId);
  const [planId, setPlanId] = useState(initialPlan.id);
  const [basePlan, setBasePlan] = useState<TrainingPlan>(initialPlan);
  const [schedulePrefs, setSchedulePrefs] = useState<SchedulePreferences>({
    restDay: 7,
    longRunDay: 6,
  });
  const [progress, setProgress] = useState<ProgressData>({
    completed: [],
    lastCompletedDate: null,
    streak: 0,
  });
  const [activeWeek, setActiveWeek] = useState("1");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const scheduledPlan = useMemo(
    () => applyScheduleToPlan(basePlan, schedulePrefs),
    [basePlan, schedulePrefs]
  );

  const weeks = scheduledPlan.scheduledWeeks;
  const totalWorkouts = getTotalWorkouts(weeks);
  const planDayIds = weeks.flatMap((w) => w.days.map((d) => d.id));
  const completedInPlan = progress.completed.filter((id) =>
    planDayIds.includes(id)
  ).length;
  const percentComplete = totalWorkouts
    ? Math.round((completedInPlan / totalWorkouts) * 100)
    : 0;

  useEffect(() => {
    setSchedulePrefs(getSchedulePreferences());
  }, []);

  useEffect(() => {
    setProgress(getProgress(planId));
    setActiveWeek("1");
    setExpandedDay(null);
  }, [planId, schedulePrefs]);

  const handleScheduleChange = useCallback((prefs: SchedulePreferences) => {
    setSchedulePrefs(prefs);
    saveSchedulePreferences(prefs);
  }, []);

  const handleFamilyChange = useCallback((id: string) => {
    const variants = getPlansForFamily(id);
    const selected = variants[variants.length - 1] ?? variants[0];
    if (selected) {
      setFamilyId(id);
      setPlanId(selected.id);
      setBasePlan(selected);
    }
  }, []);

  const handleVariantChange = useCallback((id: string) => {
    const selected = PLANS.find((p) => p.id === id);
    if (selected) {
      setPlanId(id);
      setBasePlan(selected);
    }
  }, []);

  const handleToggle = useCallback(
    (dayId: string) => {
      const updated = toggleWorkout(planId, dayId);
      setProgress(updated);
    },
    [planId]
  );

  const handleReset = useCallback(() => {
    if (
      confirm(
        `Reset all progress for ${basePlan.name} (${basePlan.duration})?`
      )
    ) {
      resetProgress(planId);
      setProgress(getProgress(planId));
    }
  }, [planId, basePlan.name, basePlan.duration]);

  const dayKindLabel = (day: ScheduleDay) => {
    if (day.kind === "run") return "Run";
    if (day.kind === "cross-train") return "Cross-train";
    return "Rest";
  };

  const dayKindColor = (day: ScheduleDay) => {
    if (day.kind === "run") return "bg-primary/10 text-primary";
    if (day.kind === "cross-train")
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      <Tabs value={familyId} onValueChange={handleFamilyChange}>
        <TabsList className="w-full h-auto flex flex-col sm:flex-row gap-1 bg-muted/50 p-1">
          {PLAN_FAMILIES.map((f) => (
            <TabsTrigger
              key={f.id}
              value={f.id}
              className="flex-1 data-active:bg-background py-2.5"
            >
              {f.shortName}
            </TabsTrigger>
          ))}
        </TabsList>

        {PLAN_FAMILIES.map((f) => (
          <TabsContent key={f.id} value={f.id} className="mt-6 space-y-4">
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5">
              <h2 className="font-semibold text-lg">{f.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {getPlansForFamily(f.id)[0]?.description}
              </p>
              <Badge variant="outline" className="mt-3">
                {f.prerequisite}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Choose duration</p>
              <div className="flex flex-wrap gap-2">
                {getPlansForFamily(f.id).map((variant) => (
                  <Button
                    key={variant.id}
                    variant={planId === variant.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setFamilyId(f.id);
                      handleVariantChange(variant.id);
                    }}
                  >
                    {variant.duration}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <SchedulePicker
        preferences={schedulePrefs}
        onChange={handleScheduleChange}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/60">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Check className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {completedInPlan}/{totalWorkouts}
              </p>
              <p className="text-sm text-muted-foreground">Activities done</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Flame className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{progress.streak}</p>
              <p className="text-sm text-muted-foreground">Day streak</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Overall progress</p>
              <p className="text-sm font-semibold">{percentComplete}%</p>
            </div>
            <Progress value={percentComplete} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeWeek} onValueChange={setActiveWeek}>
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 max-h-32 overflow-y-auto">
          {weeks.map((week) => {
            const weekDayIds = week.days
              .filter((d) => d.kind !== "rest")
              .map((d) => d.id);
            const weekDone = weekDayIds.every((id) =>
              progress.completed.includes(id)
            );
            return (
              <TabsTrigger
                key={week.week}
                value={String(week.week)}
                className="flex-1 min-w-[3.5rem] data-active:bg-background"
              >
                W{week.week}
                {weekDone && <Check className="size-3 ml-1 text-primary" />}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {weeks.map((week) => (
          <TabsContent key={week.week} value={String(week.week)} className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{week.title}</h2>
              <p className="text-muted-foreground mt-1">{week.focus}</p>
            </div>

            <div className="space-y-3">
              {week.days.map((day) => {
                const isDone = progress.completed.includes(day.id);
                const isExpanded = expandedDay === day.id;
                const isCompleteRest = day.kind === "rest";

                const title = isCompleteRest
                  ? "Complete Rest Day"
                  : day.kind === "run"
                    ? day.run!.name
                    : day.crossTraining!.name;

                const description = isCompleteRest
                  ? "No running or cross-training. Let your body fully recover."
                  : day.kind === "run"
                    ? day.run!.description
                    : day.crossTraining!.focus;

                const duration = isCompleteRest
                  ? "Rest"
                  : day.kind === "run"
                    ? day.run!.duration
                    : day.crossTraining!.duration;

                return (
                  <Card
                    key={day.id}
                    className={cn(
                      "border-border/60 transition-all duration-300",
                      isDone && "bg-primary/5 border-primary/20",
                      isCompleteRest && "bg-muted/20"
                    )}
                  >
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        {!isCompleteRest ? (
                          <button
                            onClick={() => handleToggle(day.id)}
                            className={cn(
                              "flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                              isDone
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-border hover:border-primary hover:bg-primary/5"
                            )}
                            aria-label={
                              isDone ? "Mark incomplete" : "Mark complete"
                            }
                          >
                            <AnimatePresence mode="wait">
                              {isDone && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <Check className="size-5" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        ) : (
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-muted">
                            <Moon className="size-5 text-muted-foreground" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-xs font-mono"
                            >
                              {day.dayName}
                            </Badge>
                            <Badge className={cn("text-xs", dayKindColor(day))}>
                              {dayKindLabel(day)}
                            </Badge>
                            {day.kind === "cross-train" && day.crossTraining && (
                              <CrossTrainingPreview crossTraining={day.crossTraining} />
                            )}
                            {day.kind === "run" &&
                              day.dayOfWeek === schedulePrefs.longRunDay && (
                                <Badge variant="secondary" className="text-xs">
                                  Long run
                                </Badge>
                              )}
                            <CardTitle className="text-base sm:text-lg">
                              {title}
                            </CardTitle>
                            <Badge variant="secondary">{duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {description}
                          </p>
                        </div>

                        {!isCompleteRest && (
                          <button
                            onClick={() =>
                              setExpandedDay(isExpanded ? null : day.id)
                            }
                            className="p-2 rounded-lg hover:bg-muted shrink-0"
                            aria-label="Toggle details"
                          >
                            <ChevronDown
                              className={cn(
                                "size-5 transition-transform duration-200",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </button>
                        )}
                      </div>
                    </CardHeader>

                    <AnimatePresence>
                      {isExpanded && !isCompleteRest && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6 ml-14 sm:ml-16">
                            {day.kind === "run" && day.run && (
                              <div className="rounded-xl bg-muted/50 p-4">
                                <p className="text-sm font-medium mb-1">
                                  Workout details
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {day.run.intervals}
                                </p>
                              </div>
                            )}
                            {day.kind === "cross-train" && day.crossTraining && (
                              <CrossTrainingDetails
                                crossTraining={day.crossTraining}
                              />
                            )}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-center pt-4">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="size-4" />
          Reset progress
        </Button>
      </div>
    </div>
  );
}
