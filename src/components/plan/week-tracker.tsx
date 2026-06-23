"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Flame, RotateCcw } from "lucide-react";
import { PLAN, TOTAL_WORKOUTS } from "@/lib/plan-data";
import { getProgress, toggleWorkout, resetProgress, type ProgressData } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function WeekTracker() {
  const [progress, setProgress] = useState<ProgressData>({
    completed: [],
    lastCompletedDate: null,
    streak: 0,
  });
  const [activeWeek, setActiveWeek] = useState("1");
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleToggle = useCallback((workoutId: string) => {
    const updated = toggleWorkout(workoutId);
    setProgress(updated);
  }, []);

  const handleReset = useCallback(() => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      resetProgress();
      setProgress(getProgress());
    }
  }, []);

  const completedCount = progress.completed.length;
  const percentComplete = Math.round((completedCount / TOTAL_WORKOUTS) * 100);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/60">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Check className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {completedCount}/{TOTAL_WORKOUTS}
              </p>
              <p className="text-sm text-muted-foreground">Workouts done</p>
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
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {PLAN.map((week) => {
            const weekWorkouts = week.workouts.map((w) => w.id);
            const weekDone = weekWorkouts.every((id) =>
              progress.completed.includes(id)
            );
            return (
              <TabsTrigger
                key={week.week}
                value={String(week.week)}
                className="flex-1 min-w-[4rem] data-active:bg-background"
              >
                W{week.week}
                {weekDone && (
                  <Check className="size-3 ml-1 text-primary" />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {PLAN.map((week) => (
          <TabsContent key={week.week} value={String(week.week)} className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{week.title}</h2>
              <p className="text-muted-foreground mt-1">{week.focus}</p>
            </div>

            <div className="space-y-3">
              {week.workouts.map((workout) => {
                const isDone = progress.completed.includes(workout.id);
                const isExpanded = expandedWorkout === workout.id;

                return (
                  <Card
                    key={workout.id}
                    className={cn(
                      "border-border/60 transition-all duration-300",
                      isDone && "bg-primary/5 border-primary/20"
                    )}
                  >
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => handleToggle(workout.id)}
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                            isDone
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border hover:border-primary hover:bg-primary/5"
                          )}
                          aria-label={isDone ? "Mark incomplete" : "Mark complete"}
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

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-base sm:text-lg">
                              Day {workout.day}: {workout.title}
                            </CardTitle>
                            <Badge variant="secondary">{workout.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {workout.description}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedWorkout(isExpanded ? null : workout.id)
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
                      </div>
                    </CardHeader>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6 ml-14 sm:ml-16">
                            <div className="rounded-xl bg-muted/50 p-4">
                              <p className="text-sm font-medium mb-1">Intervals</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {workout.intervals}
                              </p>
                            </div>
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
