"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Check,
  ClipboardList,
  ExternalLink,
  Pencil,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanProfilePicker } from "@/components/plan/plan-profile-picker";
import { SchedulePicker } from "@/components/plan/schedule-picker";
import {
  deriveSchedulePrefs,
  getPlanTimelineHint,
  recommendPlanVariantId,
  type PlanPersonalization,
} from "@/lib/plan-personalization";
import {
  PLAN_FAMILIES,
  PLANS,
  getPlanById,
  getPlansForFamily,
  type TrainingPlan,
} from "@/lib/plans";
import { remapCompletedIds } from "@/lib/plan-validation";
import type { SchedulePreferences } from "@/lib/schedule-builder";
import {
  buildTrainingPlanDisplay,
  buildTrainingPlanWeekPreview,
  displayFromTrainingPlanState,
  type TrainingPlanDisplay,
} from "@/lib/training-plan-display";
import {
  deleteTrainingPlan,
  fetchTrainingPlan,
  saveTrainingPlan,
  type TrainingPlanState,
} from "@/lib/training-plan-client";
import { PLAN_DELETED_MESSAGE, type PlanDeletedMessage } from "@/lib/plan-messages";
import { cn } from "@/lib/utils";

type TrainingPlanEditorCardProps = {
  plan: TrainingPlanDisplay;
  onPlanUpdated: (plan: TrainingPlanDisplay) => void;
  onPlanRemoved?: (notice?: PlanDeletedMessage) => void;
};

function stateToDraft(state: TrainingPlanState) {
  const meta = getPlanById(state.planId);
  return {
    familyId: meta?.familyId ?? "5k",
    planId: state.planId,
    basePlan: meta ?? getPlanById("5k-8w")!,
    currentWeek: state.currentWeek,
    profile: {
      age: state.age,
      fitnessLevel: state.fitnessLevel,
      goalRaceDate: state.goalRaceDate,
    } satisfies PlanPersonalization,
    schedulePrefs: {
      restDay: state.restDay,
      longRunDay: state.longRunDay,
      runDaysPerWeek: state.runDaysPerWeek,
    } satisfies SchedulePreferences,
    completedIds: state.completedIds,
  };
}

function dayKindClass(kind: "run" | "cross-train" | "rest") {
  if (kind === "run") return "bg-primary/10 text-primary";
  if (kind === "cross-train") return "bg-sky-500/10 text-sky-700 dark:text-sky-300";
  return "bg-muted text-muted-foreground";
}

export function TrainingPlanEditorCard({
  plan,
  onPlanUpdated,
  onPlanRemoved,
}: TrainingPlanEditorCardProps) {
  const [displayPlan, setDisplayPlan] = useState(plan);
  const [editing, setEditing] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const [familyId, setFamilyId] = useState(plan.familyId || "5k");
  const [planId, setPlanId] = useState(plan.planId);
  const [basePlan, setBasePlan] = useState<TrainingPlan>(
    () => getPlanById(plan.planId) ?? getPlanById("5k-8w")!
  );
  const [currentWeek, setCurrentWeek] = useState(plan.currentWeek);
  const [profile, setProfile] = useState<PlanPersonalization>({
    age: plan.age,
    fitnessLevel: plan.fitnessLevel,
    goalRaceDate: plan.goalRaceDate,
  });
  const [schedulePrefs, setSchedulePrefs] = useState<SchedulePreferences>({
    restDay: plan.restDay,
    longRunDay: plan.longRunDay,
    runDaysPerWeek: plan.runDaysPerWeek,
  });
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    setDisplayPlan(plan);
  }, [plan]);

  const draftRecord = useMemo(
    () => ({
      planId,
      currentWeek,
      restDay: schedulePrefs.restDay,
      longRunDay: schedulePrefs.longRunDay,
      runDaysPerWeek: schedulePrefs.runDaysPerWeek,
      age: profile.age,
      fitnessLevel: profile.fitnessLevel,
      goalRaceDate: profile.goalRaceDate ? new Date(profile.goalRaceDate) : null,
    }),
    [planId, currentWeek, schedulePrefs, profile]
  );

  const previewDisplay = useMemo(
    () => buildTrainingPlanDisplay(draftRecord, completedIds),
    [draftRecord, completedIds]
  );

  const previewWeek = useMemo(
    () => buildTrainingPlanWeekPreview(draftRecord, currentWeek),
    [draftRecord, currentWeek]
  );

  const recommendation = useMemo(
    () => recommendPlanVariantId(familyId, profile),
    [familyId, profile]
  );

  const timelineHint = useMemo(
    () => getPlanTimelineHint(profile, basePlan, currentWeek),
    [profile, basePlan, currentWeek]
  );

  const resetDraftFromDisplay = useCallback(() => {
    const meta = getPlanById(displayPlan.planId);
    setFamilyId(displayPlan.familyId || meta?.familyId || "5k");
    setPlanId(displayPlan.planId);
    setBasePlan(meta ?? getPlanById("5k-8w")!);
    setCurrentWeek(displayPlan.currentWeek);
    setProfile({
      age: displayPlan.age,
      fitnessLevel: displayPlan.fitnessLevel,
      goalRaceDate: displayPlan.goalRaceDate,
    });
    setSchedulePrefs({
      restDay: displayPlan.restDay,
      longRunDay: displayPlan.longRunDay,
      runDaysPerWeek: displayPlan.runDaysPerWeek,
    });
  }, [displayPlan]);

  const openEditor = useCallback(async () => {
    setSaveError(null);
    setSavedMessage(null);
    setLoadingDraft(true);
    try {
      const remote = await fetchTrainingPlan();
      if (remote) {
        const draft = stateToDraft(remote);
        setFamilyId(draft.familyId);
        setPlanId(draft.planId);
        setBasePlan(draft.basePlan);
        setCurrentWeek(draft.currentWeek);
        setProfile(draft.profile);
        setSchedulePrefs(draft.schedulePrefs);
        setCompletedIds(draft.completedIds);
      } else {
        resetDraftFromDisplay();
      }
      setEditing(true);
    } catch {
      setSaveError("Could not load your plan for editing.");
    } finally {
      setLoadingDraft(false);
    }
  }, [resetDraftFromDisplay]);

  const closeEditor = useCallback(() => {
    setEditing(false);
    setSaveError(null);
    resetDraftFromDisplay();
  }, [resetDraftFromDisplay]);

  const applyProfileChange = useCallback(
    (nextProfile: PlanPersonalization) => {
      setProfile(nextProfile);

      const recommendationResult = recommendPlanVariantId(familyId, nextProfile);
      let nextPlan = basePlan;
      let nextPlanId = planId;

      if (recommendationResult) {
        const selected = PLANS.find((item) => item.id === recommendationResult.planId);
        if (selected) {
          nextPlan = selected;
          nextPlanId = selected.id;
          setPlanId(selected.id);
          setBasePlan(selected);
        }
      }

      setSchedulePrefs((prefs) =>
        deriveSchedulePrefs(prefs, nextProfile, nextPlan.runsPerWeek)
      );
    },
    [familyId, basePlan, planId]
  );

  const applyFamilyChange = useCallback(
    (nextFamilyId: string) => {
      const recommendationResult = recommendPlanVariantId(nextFamilyId, profile);
      const variants = getPlansForFamily(nextFamilyId);
      const selected =
        PLANS.find((item) => item.id === recommendationResult?.planId) ??
        variants[variants.length - 1] ??
        variants[0];

      if (!selected) return;

      setFamilyId(nextFamilyId);
      setPlanId(selected.id);
      setBasePlan(selected);
      setSchedulePrefs((prefs) =>
        deriveSchedulePrefs(prefs, profile, selected.runsPerWeek)
      );
    },
    [profile]
  );

  const applyVariantChange = useCallback(
    (nextPlanId: string) => {
      const selected = PLANS.find((item) => item.id === nextPlanId);
      if (!selected) return;
      setPlanId(selected.id);
      setBasePlan(selected);
      setSchedulePrefs((prefs) =>
        deriveSchedulePrefs(prefs, profile, selected.runsPerWeek)
      );
    },
    [profile]
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveError(null);
    setSavedMessage(null);

    try {
      const remappedCompleted = remapCompletedIds(
        completedIds,
        planId,
        schedulePrefs,
        profile
      );

      const updated = await saveTrainingPlan({
        planId,
        currentWeek,
        restDay: schedulePrefs.restDay,
        longRunDay: schedulePrefs.longRunDay,
        runDaysPerWeek: schedulePrefs.runDaysPerWeek,
        age: profile.age,
        fitnessLevel: profile.fitnessLevel,
        goalRaceDate: profile.goalRaceDate,
        completedIds: remappedCompleted,
      });

      const nextDisplay = displayFromTrainingPlanState(updated);
      setDisplayPlan(nextDisplay);
      onPlanUpdated(nextDisplay);
      setCompletedIds(updated.completedIds);
      setEditing(false);
      setSavedMessage("Plan updated — your schedule has been recalculated.");
    } catch {
      setSaveError("Could not save your plan. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [
    completedIds,
    planId,
    currentWeek,
    schedulePrefs,
    profile,
    onPlanUpdated,
  ]);

  const applyDisplayPlan = useCallback(
    (nextDisplay: TrainingPlanDisplay, completed: string[] = []) => {
      setDisplayPlan(nextDisplay);
      onPlanUpdated(nextDisplay);
      setCompletedIds(completed);
      setFamilyId(nextDisplay.familyId || "5k");
      setPlanId(nextDisplay.planId);
      setBasePlan(getPlanById(nextDisplay.planId) ?? getPlanById("5k-8w")!);
      setCurrentWeek(nextDisplay.currentWeek);
      setProfile({
        age: nextDisplay.age,
        fitnessLevel: nextDisplay.fitnessLevel,
        goalRaceDate: nextDisplay.goalRaceDate,
      });
      setSchedulePrefs({
        restDay: nextDisplay.restDay,
        longRunDay: nextDisplay.longRunDay,
        runDaysPerWeek: nextDisplay.runDaysPerWeek,
      });
    },
    [onPlanUpdated]
  );

  const handleDelete = useCallback(async () => {
    if (
      !confirm(
        "Delete your saved plan? This clears your goal race, profile settings, schedule, and workout progress."
      )
    ) {
      return;
    }

    setDeleting(true);
    setSaveError(null);
    setSavedMessage(null);

    try {
      await deleteTrainingPlan();
      setEditing(false);
      onPlanRemoved?.(PLAN_DELETED_MESSAGE);
    } catch {
      setSaveError("Could not delete your plan. Please try again.");
    } finally {
      setDeleting(false);
    }
  }, [onPlanRemoved]);

  const activePlan = editing ? previewDisplay : displayPlan;
  const activeWeekPreview = editing ? previewWeek : displayPlan.weekPreview;

  const raceCountdown =
    activePlan.weeksUntilRace != null && activePlan.weeksUntilRace >= 0
      ? activePlan.weeksUntilRace === 0
        ? "Race week"
        : `${activePlan.weeksUntilRace} week${activePlan.weeksUntilRace === 1 ? "" : "s"} away`
      : activePlan.goalRaceDate &&
          activePlan.weeksUntilRace != null &&
          activePlan.weeksUntilRace < 0
        ? "Goal date passed"
        : null;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-medium">
              <ClipboardList className="size-4 text-primary" />
              Your training plan
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">{activePlan.planName}</h2>
              {activePlan.planDuration && (
                <Badge variant="secondary">{activePlan.planDuration}</Badge>
              )}
            </div>
            {activePlan.familyName && (
              <p className="mt-1 text-sm text-muted-foreground">
                {activePlan.familyName}
              </p>
            )}
            <p className="mt-2 text-sm text-muted-foreground">
              Week {activePlan.currentWeek}
              {activePlan.totalWeeks > 0 ? ` of ${activePlan.totalWeeks}` : ""}
              {" · "}
              {activePlan.runDaysPerWeek} runs/week
              {" · "}
              Long run {activePlan.longRunDayName}
              {" · "}
              Rest {activePlan.restDayName}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {!editing ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={openEditor}
                  disabled={loadingDraft}
                >
                  <Pencil className="size-4" />
                  {loadingDraft ? "Loading…" : "Edit plan"}
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href={displayPlan.editPlanHref} />}
                  size="sm"
                  variant="ghost"
                >
                  <ExternalLink className="size-4" />
                  Open tracker
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={handleDelete}
                  disabled={deleting || loadingDraft}
                >
                  <Trash2 className="size-4" />
                  {deleting ? "Deleting…" : "Delete plan"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={closeEditor}
                  disabled={saving}
                >
                  <X className="size-4" />
                  Cancel
                </Button>
                <Button type="button" size="sm" onClick={handleSave} disabled={saving}>
                  <Check className="size-4" />
                  {saving ? "Saving…" : "Save plan"}
                </Button>
              </>
            )}
          </div>
        </div>

        {!editing && activePlan.totalWorkouts > 0 && (
          <div className="mt-5 border-t border-primary/15 pt-5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">Plan progress</span>
              <span className="font-medium">
                {activePlan.completedCount}/{activePlan.totalWorkouts} workouts ·{" "}
                {activePlan.percentComplete}%
              </span>
            </div>
            <Progress value={activePlan.percentComplete} className="mt-2 h-2" />
          </div>
        )}

        {!editing && (
          <dl className="mt-5 grid gap-4 border-t border-primary/15 pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Goal race
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                {activePlan.goalRaceDateLabel ? (
                  <span className="inline-flex items-start gap-2">
                    <Calendar className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      {activePlan.goalRaceDateLabel}
                      {raceCountdown && (
                        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                          {raceCountdown}
                        </span>
                      )}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Not set yet</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Age
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                {activePlan.age ?? (
                  <span className="text-muted-foreground">Not set</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Fitness level
              </dt>
              <dd className="mt-1 text-sm font-semibold">{activePlan.fitnessLabel}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Started
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                {activePlan.startedAt
                  ? new Date(activePlan.startedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </dd>
            </div>
          </dl>
        )}

        {editing && (
          <div className="mt-6 space-y-6 border-t border-primary/15 pt-6">
            <Tabs value={familyId} onValueChange={applyFamilyChange}>
              <TabsList
                className="grid w-full grid-cols-1 gap-1 bg-muted/50 p-1 min-[480px]:grid-cols-3"
                aria-label="Training plan distance"
              >
                {PLAN_FAMILIES.map((family) => (
                  <TabsTrigger
                    key={family.id}
                    value={family.id}
                    className="flex-1 data-active:bg-background py-2.5"
                  >
                    {family.shortName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {PLAN_FAMILIES.map((family) => (
                <TabsContent key={family.id} value={family.id} className="mt-4 space-y-3">
                  <p className="text-sm text-muted-foreground">{family.name}</p>
                  <div role="group" aria-labelledby={`${family.id}-duration-label`}>
                    <p
                      id={`${family.id}-duration-label`}
                      className="mb-2 text-sm font-medium"
                    >
                      Choose duration
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getPlansForFamily(family.id).map((variant) => {
                        const selected = planId === variant.id;
                        return (
                          <Button
                            key={variant.id}
                            type="button"
                            variant={selected ? "default" : "outline"}
                            size="sm"
                            aria-pressed={selected}
                            onClick={() => applyVariantChange(variant.id)}
                          >
                            {variant.duration}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <PlanProfilePicker
              profile={profile}
              familyId={familyId}
              plan={basePlan}
              currentWeek={currentWeek}
              onChange={applyProfileChange}
            />

            <SchedulePicker preferences={schedulePrefs} onChange={setSchedulePrefs} />

            {(recommendation || timelineHint) && (
              <div className="rounded-lg border border-primary/20 bg-background/60 px-4 py-3 text-sm">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
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
        )}

        {activeWeekPreview && (
          <div
            className={cn(
              "border-t border-primary/15 pt-5",
              editing ? "mt-6" : "mt-5"
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold">
                Week {activeWeekPreview.weekNumber}: {activeWeekPreview.weekTitle}
              </h3>
              {editing && (
                <span className="text-xs text-primary">Live preview</span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {activeWeekPreview.focus}
            </p>
            <ul className="mt-3 space-y-2">
              {activeWeekPreview.days.map((day) => (
                <li
                  key={`${day.dayName}-${day.label}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-sm"
                >
                  <span className="font-medium w-10 shrink-0">{day.dayName}</span>
                  <span className="min-w-0 flex-1 truncate">{day.label}</span>
                  <Badge
                    variant="outline"
                    className={cn("shrink-0 text-xs capitalize", dayKindClass(day.kind))}
                  >
                    {day.kind === "cross-train" ? "Cross-train" : day.kind}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}

        {saveError && (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {saveError}
          </p>
        )}
        {savedMessage && !editing && (
          <p className="mt-4 text-sm text-primary" role="status">
            {savedMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
