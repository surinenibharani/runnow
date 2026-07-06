"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Cloud, Flame, Moon, RotateCcw, Sparkles } from "lucide-react";
import {
  PLAN_FAMILIES,
  PLANS,
  DEFAULT_PLAN_ID,
  getPlansForFamily,
  getTotalWorkouts,
} from "@/lib/plans";
import type { TrainingPlan, ScheduleDay } from "@/lib/plans";
import { applyScheduleToPlan, DEFAULT_SCHEDULE } from "@/lib/schedule-builder";
import type { SchedulePreferences } from "@/lib/schedule-builder";
import {
  getSchedulePreferences,
  saveSchedulePreferences,
} from "@/lib/schedule-preferences";
import { getPlanProfile, savePlanProfile } from "@/lib/plan-profile";
import {
  DEFAULT_PERSONALIZATION,
  deriveSchedulePrefs,
  recommendPlanVariantId,
  type PlanPersonalization,
} from "@/lib/plan-personalization";
import { getProgress, toggleWorkout, resetProgress, type ProgressData } from "@/lib/progress";
import {
  fetchTrainingPlan,
  saveTrainingPlan,
  toggleWorkoutRemote,
  resetTrainingPlanRemote,
  type WorkoutToggleContext,
} from "@/lib/training-plan-client";
import { remapCompletedIds } from "@/lib/plan-validation";
import { CrossTrainingDetails, CrossTrainingPreview } from "@/components/plan/cross-training-details";
import { PlanFamilyIllustration, WorkoutKindAccent } from "@/components/visuals/plan-scenes";
import { getActivityCaption } from "@/lib/workout-caption";
import { StravaConnectBanner } from "@/components/strava/strava-connect-banner";
import { SchedulePicker } from "@/components/plan/schedule-picker";
import { PlanProfilePicker } from "@/components/plan/plan-profile-picker";
import { PlanLoading } from "@/components/plan/plan-loading";
import { ProgressShare } from "@/components/plan/progress-share";
import {
  detectProgressMilestone,
  isWeekComplete,
  percentComplete as computePercentComplete,
  type MilestoneHighlight,
} from "@/lib/milestones";
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

const emptyProgress: ProgressData = {
  completed: [],
  lastCompletedDate: null,
  streak: 0,
};

export function WeekTracker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status: authStatus } = useSession();
  const initialPlan = resolveInitialPlan(searchParams.get("plan"));

  const [familyId, setFamilyId] = useState(initialPlan.familyId);
  const [planId, setPlanId] = useState(initialPlan.id);
  const [basePlan, setBasePlan] = useState<TrainingPlan>(initialPlan);
  const [schedulePrefs, setSchedulePrefs] = useState<SchedulePreferences>(DEFAULT_SCHEDULE);
  const [planProfile, setPlanProfile] = useState<PlanPersonalization>(DEFAULT_PERSONALIZATION);
  const [progress, setProgress] = useState<ProgressData>(emptyProgress);
  const [activeWeek, setActiveWeek] = useState("1");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [useRemote, setUseRemote] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [bootstrapComplete, setBootstrapComplete] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [milestoneHighlight, setMilestoneHighlight] =
    useState<MilestoneHighlight | null>(null);
  const migratedRef = useRef(false);
  const migrationPlanIdRef = useRef(initialPlan.id);
  const shareSectionRef = useRef<HTMLElement>(null);
  const syncedUrlPlanIdRef = useRef<string | null>(searchParams.get("plan"));

  const isAuthenticated = authStatus === "authenticated";
  const urlPlanId = searchParams.get("plan");
  const explicitUrlPlanId =
    urlPlanId && PLANS.some((p) => p.id === urlPlanId) ? urlPlanId : null;

  const scheduledPlan = useMemo(
    () => applyScheduleToPlan(basePlan, schedulePrefs, planProfile),
    [basePlan, schedulePrefs, planProfile]
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

  const applyRemotePlan = useCallback((remote: {
    planId: string;
    currentWeek: number;
    restDay: number;
    longRunDay: number;
    runDaysPerWeek?: number;
    age?: number | null;
    fitnessLevel?: string;
    goalRaceDate?: string | null;
    completedIds: string[];
    streak: number;
    lastCompletedDate: string | null;
  }) => {
    const selected = PLANS.find((p) => p.id === remote.planId);
    if (selected) {
      setFamilyId(selected.familyId);
      setPlanId(selected.id);
      setBasePlan(selected);
    }
    const profile: PlanPersonalization = {
      age: remote.age ?? null,
      fitnessLevel:
        remote.fitnessLevel === "returning" ||
        remote.fitnessLevel === "intermediate" ||
        remote.fitnessLevel === "advanced"
          ? remote.fitnessLevel
          : "beginner",
      goalRaceDate: remote.goalRaceDate ?? null,
    };
    const prefs = {
      restDay: remote.restDay,
      longRunDay: remote.longRunDay,
      runDaysPerWeek: (remote.runDaysPerWeek === 4 ? 4 : 3) as 3 | 4,
    };
    setPlanProfile(profile);
    setSchedulePrefs(prefs);
    setProgress({
      completed: remapCompletedIds(
        remote.completedIds,
        remote.planId,
        prefs,
        profile
      ),
      streak: remote.streak,
      lastCompletedDate: remote.lastCompletedDate,
    });
    setActiveWeek(String(remote.currentWeek || 1));
  }, []);

  useEffect(() => {
    if (authStatus === "loading") return;

    if (authStatus !== "authenticated") {
      setUseRemote(false);
      setSchedulePrefs(getSchedulePreferences());
      setPlanProfile(getPlanProfile());
      setProgress(getProgress(planId));
      setBootstrapComplete(true);
      return;
    }

    let cancelled = false;

    async function loadRemote() {
      setBootstrapComplete(false);
      setSyncing(true);
      try {
        const remote = await fetchTrainingPlan();
        if (cancelled) return;

        if (!remote) {
          setUseRemote(false);
          setSchedulePrefs(getSchedulePreferences());
          setPlanProfile(getPlanProfile());
          setProgress(getProgress(planId));
          return;
        }

        if (!migratedRef.current) {
          const localProgress = getProgress(remote.planId);
          const localSchedule = getSchedulePreferences();
          const hasLocalProgress = localProgress.completed.length > 0;
          const hasRemoteProgress = remote.completedIds.length > 0;

          if (hasLocalProgress && !hasRemoteProgress) {
            const merged = await saveTrainingPlan({
              planId:
                remote.planId !== DEFAULT_PLAN_ID
                  ? remote.planId
                  : migrationPlanIdRef.current,
              restDay: localSchedule.restDay,
              longRunDay: localSchedule.longRunDay,
              runDaysPerWeek: localSchedule.runDaysPerWeek,
              age: getPlanProfile().age,
              fitnessLevel: getPlanProfile().fitnessLevel,
              goalRaceDate: getPlanProfile().goalRaceDate,
              completedIds: localProgress.completed,
              streak: localProgress.streak,
              lastCompletedDate: localProgress.lastCompletedDate,
            });
            applyRemotePlan(merged);
          } else if (explicitUrlPlanId && explicitUrlPlanId !== remote.planId) {
            const selected = PLANS.find((p) => p.id === explicitUrlPlanId)!;
            setFamilyId(selected.familyId);
            setPlanId(selected.id);
            setBasePlan(selected);
            const profile = getPlanProfile();
            const nextPrefs = deriveSchedulePrefs(
              getSchedulePreferences(),
              profile,
              selected.runsPerWeek
            );
            setPlanProfile(profile);
            setSchedulePrefs(nextPrefs);
            setProgress(getProgress(explicitUrlPlanId));
            setActiveWeek("1");
          } else {
            applyRemotePlan(remote);
          }
          migratedRef.current = true;
        } else if (explicitUrlPlanId && explicitUrlPlanId !== remote.planId) {
          const selected = PLANS.find((p) => p.id === explicitUrlPlanId)!;
          setFamilyId(selected.familyId);
          setPlanId(selected.id);
          setBasePlan(selected);
          const profile = getPlanProfile();
          const nextPrefs = deriveSchedulePrefs(
            getSchedulePreferences(),
            profile,
            selected.runsPerWeek
          );
          setPlanProfile(profile);
          setSchedulePrefs(nextPrefs);
          setProgress(getProgress(explicitUrlPlanId));
          setActiveWeek("1");
        } else {
          applyRemotePlan(remote);
        }

        setUseRemote(true);
      } catch {
        setUseRemote(false);
        setSchedulePrefs(getSchedulePreferences());
        setPlanProfile(getPlanProfile());
        setProgress(getProgress(planId));
      } finally {
        if (!cancelled) {
          setSyncing(false);
          setBootstrapComplete(true);
        }
      }
    }

    loadRemote();
    return () => {
      cancelled = true;
    };
  }, [authStatus, applyRemotePlan]);

  useEffect(() => {
    if (!isAuthenticated || !useRemote) {
      setProgress(getProgress(planId));
      setActiveWeek("1");
      setExpandedDay(null);
    }
  }, [planId, schedulePrefs, isAuthenticated, useRemote]);

  const persistPlanSettings = useCallback(
    async (
      nextPlanId: string,
      prefs: SchedulePreferences,
      profile: PlanPersonalization,
      week?: number
    ) => {
      if (!useRemote) return;
      try {
        const updated = await saveTrainingPlan({
          planId: nextPlanId,
          restDay: prefs.restDay,
          longRunDay: prefs.longRunDay,
          runDaysPerWeek: prefs.runDaysPerWeek,
          age: profile.age,
          fitnessLevel: profile.fitnessLevel,
          goalRaceDate: profile.goalRaceDate,
          ...(week !== undefined && { currentWeek: week }),
        });
        setProgress((p) => ({
          ...p,
          completed: updated.completedIds,
          streak: updated.streak,
          lastCompletedDate: updated.lastCompletedDate,
        }));
      } catch {
        // keep local UI state on failure
      }
    },
    [useRemote]
  );

  const syncPlanUrl = useCallback(
    (id: string) => {
      if (searchParams.get("plan") === id) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set("plan", id);
      syncedUrlPlanIdRef.current = id;
      router.replace(`/plan?${params.toString()}#plan-tracker`, { scroll: false });
    },
    [router, searchParams]
  );

  const applyPlanSelection = useCallback(
    (id: string, options?: { resetWeek?: boolean; fromUrl?: boolean }) => {
      const selected = PLANS.find((p) => p.id === id);
      if (!selected || selected.id === planId) return;

      setFamilyId(selected.familyId);
      setPlanId(selected.id);
      setBasePlan(selected);
      const nextPrefs = deriveSchedulePrefs(
        schedulePrefs,
        planProfile,
        selected.runsPerWeek
      );
      setSchedulePrefs(nextPrefs);

      if (options?.resetWeek !== false) {
        setActiveWeek("1");
        setExpandedDay(null);
      }

      if (!options?.fromUrl) {
        syncPlanUrl(selected.id);
      }

      if (useRemote) {
        void persistPlanSettings(
          selected.id,
          nextPrefs,
          planProfile,
          options?.resetWeek !== false ? 1 : undefined
        );
      } else {
        saveSchedulePreferences(nextPrefs);
        setProgress(getProgress(selected.id));
      }
    },
    [planId, schedulePrefs, planProfile, useRemote, persistPlanSettings, syncPlanUrl]
  );

  useEffect(() => {
    if (!bootstrapComplete || !urlPlanId) return;
    if (!PLANS.some((p) => p.id === urlPlanId)) return;
    if (syncedUrlPlanIdRef.current === urlPlanId) return;
    syncedUrlPlanIdRef.current = urlPlanId;
    applyPlanSelection(urlPlanId, { resetWeek: true, fromUrl: true });
  }, [urlPlanId, bootstrapComplete, applyPlanSelection]);

  const handleScheduleChange = useCallback(
    (prefs: SchedulePreferences) => {
      setSchedulePrefs(prefs);
      if (useRemote) {
        void persistPlanSettings(planId, prefs, planProfile);
      } else {
        saveSchedulePreferences(prefs);
      }
    },
    [useRemote, planId, planProfile, persistPlanSettings]
  );

  const handleProfileChange = useCallback(
    (profile: PlanPersonalization) => {
      setPlanProfile(profile);
      if (!useRemote) {
        savePlanProfile(profile);
      }

      const recommendation = recommendPlanVariantId(familyId, profile);
      let nextPlanId = planId;
      let nextPlan = basePlan;

      if (recommendation) {
        const selected = PLANS.find((p) => p.id === recommendation.planId);
        if (selected) {
          nextPlanId = selected.id;
          nextPlan = selected;
          setPlanId(selected.id);
          setBasePlan(selected);
        }
      }

      const nextPrefs = deriveSchedulePrefs(
        schedulePrefs,
        profile,
        nextPlan.runsPerWeek
      );
      setSchedulePrefs(nextPrefs);

      if (useRemote) {
        void persistPlanSettings(nextPlanId, nextPrefs, profile);
      } else {
        savePlanProfile(profile);
        saveSchedulePreferences(nextPrefs);
      }
    },
    [
      useRemote,
      familyId,
      planId,
      basePlan,
      schedulePrefs,
      persistPlanSettings,
    ]
  );

  const handleFamilyChange = useCallback(
    (id: string) => {
      const recommendation = recommendPlanVariantId(id, planProfile);
      const variants = getPlansForFamily(id);
      const selected =
        PLANS.find((p) => p.id === recommendation?.planId) ??
        variants[variants.length - 1] ??
        variants[0];
      if (selected) {
        setFamilyId(id);
        setPlanId(selected.id);
        setBasePlan(selected);
        const nextPrefs = deriveSchedulePrefs(
          schedulePrefs,
          planProfile,
          selected.runsPerWeek
        );
        setSchedulePrefs(nextPrefs);
        syncPlanUrl(selected.id);
        if (useRemote) {
          void persistPlanSettings(selected.id, nextPrefs, planProfile, 1);
        } else {
          saveSchedulePreferences(nextPrefs);
        }
      }
    },
    [useRemote, schedulePrefs, planProfile, persistPlanSettings, syncPlanUrl]
  );

  const handleVariantChange = useCallback(
    (id: string) => {
      applyPlanSelection(id, { resetWeek: false });
    },
    [applyPlanSelection]
  );

  const workoutToggleContext = useMemo<WorkoutToggleContext>(
    () => ({
      planId,
      restDay: schedulePrefs.restDay,
      longRunDay: schedulePrefs.longRunDay,
      runDaysPerWeek: schedulePrefs.runDaysPerWeek,
      age: planProfile.age,
      fitnessLevel: planProfile.fitnessLevel,
      goalRaceDate: planProfile.goalRaceDate,
    }),
    [planId, schedulePrefs, planProfile]
  );

  const checkMilestone = useCallback(
    (previous: ProgressData, next: ProgressData) => {
      const prevPercent = computePercentComplete(
        previous.completed,
        planDayIds,
        totalWorkouts
      );
      const nextPercent = computePercentComplete(
        next.completed,
        planDayIds,
        totalWorkouts
      );
      const weekNumber = Number(activeWeek);
      const milestone = detectProgressMilestone(
        prevPercent,
        nextPercent,
        isWeekComplete(weeks, weekNumber, previous.completed),
        isWeekComplete(weeks, weekNumber, next.completed),
        weekNumber
      );
      if (milestone) {
        setMilestoneHighlight(milestone);
      }
    },
    [activeWeek, planDayIds, totalWorkouts, weeks]
  );

  useEffect(() => {
    if (!milestoneHighlight || !shareSectionRef.current) return;
    shareSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [milestoneHighlight]);

  const handleStartPlan = useCallback(async () => {
    setEnrolling(true);
    setSaveError(null);

    try {
      const saved = await saveTrainingPlan({
        planId,
        currentWeek: Number(activeWeek) || 1,
        restDay: schedulePrefs.restDay,
        longRunDay: schedulePrefs.longRunDay,
        runDaysPerWeek: schedulePrefs.runDaysPerWeek,
        age: planProfile.age,
        fitnessLevel: planProfile.fitnessLevel,
        goalRaceDate: planProfile.goalRaceDate,
        completedIds: progress.completed,
      });
      applyRemotePlan(saved);
      setUseRemote(true);
    } catch {
      setSaveError("Could not save your plan. Please try again.");
    } finally {
      setEnrolling(false);
    }
  }, [
    planId,
    activeWeek,
    schedulePrefs,
    planProfile,
    progress,
    applyRemotePlan,
  ]);

  const handleToggle = useCallback(
    async (dayId: string) => {
      setSaveError(null);

      if (useRemote) {
        const isCompleted = progress.completed.includes(dayId);
        const previous = progress;
        const optimistic: ProgressData = {
          ...progress,
          completed: isCompleted
            ? progress.completed.filter((id) => id !== dayId)
            : [...progress.completed, dayId],
        };
        setProgress(optimistic);

        try {
          const updated = await toggleWorkoutRemote(
            dayId,
            !isCompleted,
            workoutToggleContext
          );
          const nextProgress = {
            completed: updated.completedIds,
            streak: updated.streak,
            lastCompletedDate: updated.lastCompletedDate,
          };
          checkMilestone(progress, nextProgress);
          setProgress(nextProgress);
        } catch {
          setProgress(previous);
          setSaveError("Could not save workout progress. Please try again.");
        }
        return;
      }

      const updated = toggleWorkout(planId, dayId);
      checkMilestone(progress, updated);
      setProgress(updated);
    },
    [useRemote, planId, progress, workoutToggleContext, checkMilestone]
  );

  const handleReset = useCallback(async () => {
    if (
      !confirm(
        `Reset all progress for ${basePlan.name} (${basePlan.duration})?`
      )
    ) {
      return;
    }

    if (useRemote) {
      try {
        const updated = await resetTrainingPlanRemote();
        setProgress({
          completed: updated.completedIds,
          streak: updated.streak,
          lastCompletedDate: updated.lastCompletedDate,
        });
        setActiveWeek("1");
      } catch {
        // ignore
      }
      return;
    }

    resetProgress(planId);
    setProgress(getProgress(planId));
  }, [planId, basePlan.name, basePlan.duration, useRemote]);

  const handleWeekChange = useCallback(
    (week: string) => {
      setActiveWeek(week);
      if (useRemote) {
        void saveTrainingPlan({ currentWeek: Number(week) });
      }
    },
    [useRemote]
  );

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

  const shareInput = useMemo(
    () => ({
      planId,
      planName: basePlan.name,
      planDuration: basePlan.duration,
      week: Number(activeWeek),
      totalWeeks: weeks.length,
      percentComplete,
      streak: progress.streak,
      completedCount: completedInPlan,
      totalWorkouts,
    }),
    [
      planId,
      basePlan.name,
      basePlan.duration,
      activeWeek,
      weeks.length,
      percentComplete,
      progress.streak,
      completedInPlan,
      totalWorkouts,
    ]
  );

  if (authStatus === "loading") {
    return <PlanLoading variant="auth" />;
  }

  if (!bootstrapComplete) {
    return (
      <PlanLoading variant={isAuthenticated ? "sync" : "bundle"} />
    );
  }

  return (
    <div className="space-y-8">
      <StravaConnectBanner />

      {isAuthenticated && useRemote && (
        <div
          className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <Cloud className="size-4 text-primary shrink-0" />
          Tap the circle next to each workout to mark it complete — progress saves
          to your account
          {syncing && <span className="text-xs">· loading…</span>}
        </div>
      )}

      {isAuthenticated && !useRemote && (
        <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Start this plan on your account</p>
              <p className="text-sm text-muted-foreground">
                Save your distance, schedule, and goal race to track progress here and on
                your dashboard.
              </p>
            </div>
            <Button
              type="button"
              size="lg"
              className="h-12 w-full gap-2 px-6 text-base sm:w-auto sm:min-w-[12rem]"
              onClick={() => void handleStartPlan()}
              disabled={enrolling || syncing}
            >
              <Sparkles className="size-4" />
              {enrolling ? "Saving plan…" : "Start this plan"}
            </Button>
          </div>
        </div>
      )}

      {saveError && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive"
          role="alert"
        >
          {saveError}
        </div>
      )}

      {authStatus === "unauthenticated" && (
        <p className="text-sm text-muted-foreground text-center">
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>{" "}
          to save workout progress to your account and sync across devices.
        </p>
      )}

      <Tabs value={familyId} onValueChange={handleFamilyChange}>
        <TabsList
          className="grid w-full grid-cols-1 gap-1 bg-muted/50 p-1 min-[480px]:grid-cols-3 sm:flex sm:h-auto sm:flex-row"
          aria-label="Training plan distance"
        >
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

        {PLAN_FAMILIES.map((f) => {
          const familyVariants = getPlansForFamily(f.id);
          const displayPlan =
            f.id === familyId
              ? basePlan
              : familyVariants[familyVariants.length - 1] ?? familyVariants[0];

          return (
          <TabsContent key={f.id} value={f.id} className="mt-6 space-y-4">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <PlanFamilyIllustration familyId={f.id} familyName={f.name} decorative />
              <div className="bg-muted/20 p-4 sm:p-5">
                <h2 className="text-lg font-semibold">{f.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {displayPlan?.description}
                </p>
                <Badge variant="outline" className="mt-3">
                  {f.prerequisite}
                </Badge>
              </div>
            </div>

            <div role="group" aria-labelledby={`${f.id}-duration-label`}>
              <p id={`${f.id}-duration-label`} className="text-sm font-medium mb-2">
                Choose duration
              </p>
              <div className="flex flex-wrap gap-2">
                {getPlansForFamily(f.id).map((variant) => {
                  const selected = planId === variant.id;
                  return (
                  <Button
                    key={variant.id}
                    variant={selected ? "default" : "outline"}
                    size="sm"
                    aria-pressed={selected}
                    aria-label={`${variant.duration} week plan`}
                    onClick={() => {
                      setFamilyId(f.id);
                      handleVariantChange(variant.id);
                    }}
                  >
                    {variant.duration}
                  </Button>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          );
        })}
      </Tabs>

      <PlanProfilePicker
        profile={planProfile}
        familyId={familyId}
        plan={basePlan}
        currentWeek={Number(activeWeek)}
        onChange={handleProfileChange}
      />

      <SchedulePicker
        preferences={schedulePrefs}
        onChange={handleScheduleChange}
      />

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3">
        <Card className="border-border/60">
          <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
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
          <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
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
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Overall progress</p>
              <p className="text-sm font-semibold">{percentComplete}%</p>
            </div>
            <Progress
              value={percentComplete}
              className="h-2"
              aria-label={`${percentComplete} percent of plan complete`}
            />
          </CardContent>
        </Card>
      </div>

      {completedInPlan > 0 && (
        <ProgressShare
          input={shareInput}
          highlight={milestoneHighlight}
          sectionRef={shareSectionRef}
        />
      )}

      <Tabs value={activeWeek} onValueChange={handleWeekChange}>
        <TabsList
          className="w-full h-auto flex gap-1 bg-muted/50 p-1 overflow-x-auto sm:flex-wrap sm:overflow-y-auto sm:max-h-32 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Training plan weeks"
        >
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
                className="shrink-0 min-w-[3.25rem] flex-1 data-active:bg-background sm:min-w-[3.5rem]"
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
                  ? getActivityCaption(day, {
                      durationLabel: basePlan.duration,
                      durationWeeks: basePlan.durationWeeks,
                      weekNumber: week.week,
                      runDaysPerWeek: schedulePrefs.runDaysPerWeek,
                      isLongRunDay: false,
                      personalization: planProfile,
                    })
                  : getActivityCaption(day, {
                      durationLabel: basePlan.duration,
                      durationWeeks: basePlan.durationWeeks,
                      weekNumber: week.week,
                      runDaysPerWeek: schedulePrefs.runDaysPerWeek,
                      isLongRunDay:
                        day.kind === "run" &&
                        day.dayOfWeek === schedulePrefs.longRunDay,
                      personalization: planProfile,
                    });

                const duration = isCompleteRest
                  ? "Rest"
                  : day.kind === "run"
                    ? day.run!.duration
                    : day.crossTraining!.duration;

                return (
                  <Card
                    key={day.id}
                    className={cn(
                      "relative overflow-hidden border-border/60 transition-all duration-300",
                      isDone && "bg-primary/5 border-primary/20",
                      isCompleteRest && "bg-muted/20"
                    )}
                  >
                    <WorkoutKindAccent
                      kind={
                        isCompleteRest
                          ? "rest"
                          : day.kind === "run"
                            ? "run"
                            : "cross-train"
                      }
                    />
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
                              isDone
                                ? `Mark ${title} incomplete`
                                : `Mark ${title} complete`
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
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs font-mono shrink-0"
                            >
                              {day.dayName}
                            </Badge>
                            <Badge className={cn("text-xs shrink-0", dayKindColor(day))}>
                              {dayKindLabel(day)}
                            </Badge>
                            {day.kind === "cross-train" && day.crossTraining && (
                              <CrossTrainingPreview crossTraining={day.crossTraining} />
                            )}
                            {day.kind === "run" &&
                              day.dayOfWeek === schedulePrefs.longRunDay && (
                                <Badge variant="secondary" className="text-xs shrink-0">
                                  Long run
                                </Badge>
                              )}
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {duration}
                            </Badge>
                          </div>
                          <CardTitle className="mt-2 text-base leading-snug sm:text-lg">
                            {title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
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
