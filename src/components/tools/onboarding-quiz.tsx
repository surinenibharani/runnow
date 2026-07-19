"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { healthFocusLabel } from "@/lib/plan/cross-train-guidance";
import { savePlanBrief } from "@/lib/plan/plan-brief";
import {
  ONBOARDING_STEPS,
  clearHealthFollowUps,
  getOnboardingFields,
  isHealthField,
  isOnboardingComplete,
  recommendOnboardingPlan,
  type OnboardingAgeBand,
  type OnboardingAnswers,
  type OnboardingDays,
  type OnboardingExperience,
  type OnboardingFieldId,
  type OnboardingGoal,
  type OnboardingLongestRun,
  type OnboardingNiggleArea,
  type OnboardingNiggleSeverity,
  type OnboardingSetback,
  type OnboardingTimeOffDuration,
  type OnboardingTimeOffReason,
  type OnboardingTimeline,
} from "@/lib/tools/onboarding";
import { cn } from "@/lib/utils";

type Option<T extends string | number> = {
  value: T;
  label: string;
  hint: string;
};

const EXPERIENCE_OPTIONS: Option<OnboardingExperience>[] = [
  {
    value: "never",
    label: "I've never really run",
    hint: "Starting from walking or the couch",
  },
  {
    value: "walk-run",
    label: "I can walk-run a bit",
    hint: "Short jogs mixed with walking",
  },
  {
    value: "jog-20",
    label: "I can jog ~20 minutes",
    hint: "Continuous easy running feels doable",
  },
  {
    value: "consistent",
    label: "I run most weeks already",
    hint: "Usually 2–4 easy runs without starting over",
  },
];

const LONGEST_OPTIONS: Option<OnboardingLongestRun>[] = [
  {
    value: "none",
    label: "I don't jog continuously yet",
    hint: "Walking only, or just getting started",
  },
  {
    value: "under-10",
    label: "Under 10 minutes",
    hint: "Short continuous jog before I need a walk",
  },
  {
    value: "10-20",
    label: "10–20 minutes",
    hint: "A short easy jog is comfortable",
  },
  {
    value: "20-30",
    label: "20–30 minutes",
    hint: "I can hold an easy pace that long",
  },
  {
    value: "30-plus",
    label: "30+ minutes",
    hint: "Easy continuous running is familiar",
  },
];

const GOAL_OPTIONS: Option<OnboardingGoal>[] = [
  {
    value: "get-started",
    label: "Just get started",
    hint: "Build the habit first",
  },
  { value: "5k", label: "Finish a 5K", hint: "3.1 miles" },
  { value: "10k", label: "Finish a 10K", hint: "6.2 miles" },
  { value: "half", label: "Half marathon", hint: "13.1 miles" },
  { value: "marathon", label: "Marathon", hint: "26.2 miles" },
];

const TIMELINE_OPTIONS: Option<OnboardingTimeline>[] = [
  {
    value: "no-rush",
    label: "No rush",
    hint: "Prefer the gentler full build",
  },
  {
    value: "4-6",
    label: "About 4–6 weeks",
    hint: "Shorter block if your fitness allows",
  },
  {
    value: "8-12",
    label: "About 8–12 weeks",
    hint: "Most common training window",
  },
  {
    value: "12-plus",
    label: "12+ weeks",
    hint: "Room for a longer, safer peak",
  },
];

const DAYS_OPTIONS: Option<OnboardingDays>[] = [
  { value: 3, label: "3 days a week", hint: "Best fit for most beginners" },
  { value: 4, label: "4 days a week", hint: "Helps longer-distance builds" },
];

const AGE_OPTIONS: Option<OnboardingAgeBand>[] = [
  {
    value: "under-40",
    label: "Under 40",
    hint: "Standard beginner progressions",
  },
  {
    value: "40-54",
    label: "40–54",
    hint: "We'll keep recovery in mind",
  },
  {
    value: "55-plus",
    label: "55+",
    hint: "Gentler volume and extra easy days",
  },
];

const SETBACK_OPTIONS: Option<OnboardingSetback>[] = [
  {
    value: "none",
    label: "Feeling healthy",
    hint: "No recent injury or long break",
  },
  {
    value: "time-off",
    label: "Coming back after time off",
    hint: "We'll ask a couple follow-ups",
  },
  {
    value: "niggle",
    label: "I have a lingering niggle",
    hint: "We'll ask where it shows up",
  },
];

const TIME_OFF_DURATION_OPTIONS: Option<OnboardingTimeOffDuration>[] = [
  {
    value: "under-4w",
    label: "Less than 4 weeks",
    hint: "A short pause",
  },
  {
    value: "1-3mo",
    label: "About 1–3 months",
    hint: "Fitness faded a bit",
  },
  {
    value: "3-plus-mo",
    label: "3+ months",
    hint: "Treat it like a restart",
  },
];

const TIME_OFF_REASON_OPTIONS: Option<OnboardingTimeOffReason>[] = [
  {
    value: "life",
    label: "Life got busy",
    hint: "Travel, work, family, schedule",
  },
  {
    value: "illness",
    label: "Illness",
    hint: "Cold, flu, or other sickness",
  },
  {
    value: "injury",
    label: "Injury or pain",
    hint: "You stopped to protect something",
  },
  {
    value: "other",
    label: "Something else",
    hint: "Motivation, weather, or other reasons",
  },
];

const NIGGLE_AREA_OPTIONS: Option<OnboardingNiggleArea>[] = [
  { value: "knee", label: "Knee", hint: "Front, side, or behind the knee" },
  { value: "shin", label: "Shin", hint: "Along the shin bone" },
  {
    value: "foot-ankle",
    label: "Foot or ankle",
    hint: "Arch, heel, or ankle area",
  },
  { value: "hip", label: "Hip or outer hip", hint: "Side of hip / IT band area" },
  {
    value: "calf-achilles",
    label: "Calf or Achilles",
    hint: "Lower leg or tendon above the heel",
  },
  { value: "other", label: "Other / not sure", hint: "Somewhere else, or unclear" },
];

const NIGGLE_SEVERITY_OPTIONS: Option<OnboardingNiggleSeverity>[] = [
  {
    value: "mild-after",
    label: "Mild after runs",
    hint: "Settles with rest; doesn't change walking",
  },
  {
    value: "during-runs",
    label: "Shows up during runs",
    hint: "You notice it while moving",
  },
  {
    value: "daily",
    label: "There in daily life",
    hint: "Walking stairs or normal days feel off",
  },
  {
    value: "sharp-worsening",
    label: "Sharp or getting worse",
    hint: "One spot, swelling, or changing your gait",
  },
];

function optionsForField(field: OnboardingFieldId): Option<string | number>[] {
  switch (field) {
    case "experience":
      return EXPERIENCE_OPTIONS;
    case "longestRun":
      return LONGEST_OPTIONS;
    case "goal":
      return GOAL_OPTIONS;
    case "timeline":
      return TIMELINE_OPTIONS;
    case "days":
      return DAYS_OPTIONS;
    case "ageBand":
      return AGE_OPTIONS;
    case "setback":
      return SETBACK_OPTIONS;
    case "timeOffDuration":
      return TIME_OFF_DURATION_OPTIONS;
    case "timeOffReason":
      return TIME_OFF_REASON_OPTIONS;
    case "niggleArea":
      return NIGGLE_AREA_OPTIONS;
    case "niggleSeverity":
      return NIGGLE_SEVERITY_OPTIONS;
  }
}

function titleForField(field: OnboardingFieldId): string {
  switch (field) {
    case "experience":
      return "What's your running experience?";
    case "longestRun":
      return "How long can you jog continuously today?";
    case "goal":
      return "What's your goal right now?";
    case "timeline":
      return "When do you want to be ready?";
    case "days":
      return "How many days can you train each week?";
    case "ageBand":
      return "Which age range fits you?";
    case "setback":
      return "Anything we should go easy on?";
    case "timeOffDuration":
      return "How long were you away from running?";
    case "timeOffReason":
      return "What mostly caused the time off?";
    case "niggleArea":
      return "Where do you notice the niggle most?";
    case "niggleSeverity":
      return "How does that niggle usually feel?";
  }
}

function chipLabelForField(field: OnboardingFieldId): string {
  switch (field) {
    case "timeOffDuration":
      return "Time away";
    case "timeOffReason":
      return "Why offline";
    case "niggleArea":
      return "Niggle area";
    case "niggleSeverity":
      return "Niggle feel";
    default: {
      const step = ONBOARDING_STEPS.find((s) => s.id === field);
      return step?.label ?? field;
    }
  }
}

function labelForAnswer(
  field: OnboardingFieldId,
  answers: Partial<OnboardingAnswers>
): string | null {
  const value = answers[field as keyof OnboardingAnswers];
  if (value == null) return null;
  const opt = optionsForField(field).find((o) => o.value === value);
  return opt?.label ?? String(value);
}

function answerValue(
  answers: Partial<OnboardingAnswers>,
  field: OnboardingFieldId
): string | number | undefined {
  return answers[field as keyof OnboardingAnswers] as
    | string
    | number
    | undefined;
}

export function OnboardingQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});
  const [showResult, setShowResult] = useState(false);

  const fields = useMemo(() => getOnboardingFields(answers), [answers]);
  const fieldId = fields[Math.min(stepIndex, fields.length - 1)];
  const totalSteps = fields.length;
  const answeredCount = fields.filter(
    (id) => answerValue(answers, id) != null
  ).length;

  const recommendation = useMemo(() => {
    if (!showResult || !isOnboardingComplete(answers)) return null;
    return recommendOnboardingPlan(answers);
  }, [answers, showResult]);

  const selectAnswer = (field: OnboardingFieldId, value: string | number) => {
    setAnswers((prev) => {
      let next: Partial<OnboardingAnswers> = { ...prev, [field]: value };
      if (field === "setback") {
        next = clearHealthFollowUps(next);
        next.setback = value as OnboardingSetback;
      }
      return next;
    });
    setShowResult(false);

    // Advance after state settles using next field list
    const provisional: Partial<OnboardingAnswers> = {
      ...answers,
      [field]: value,
    };
    if (field === "setback") {
      Object.assign(provisional, clearHealthFollowUps(provisional));
      provisional.setback = value as OnboardingSetback;
    }
    const nextFields = getOnboardingFields(provisional);
    const currentIdx = nextFields.indexOf(field);
    if (currentIdx >= 0 && currentIdx < nextFields.length - 1) {
      setStepIndex(currentIdx + 1);
    } else if (isOnboardingComplete(provisional)) {
      setShowResult(true);
      setStepIndex(nextFields.length - 1);
    }
  };

  const goToStep = (index: number) => {
    if (index < 0 || index >= fields.length) return;
    const firstUnanswered = fields.findIndex(
      (id) => answerValue(answers, id) == null
    );
    const maxReach =
      firstUnanswered === -1 ? fields.length - 1 : firstUnanswered;
    if (index <= maxReach) {
      setStepIndex(index);
      setShowResult(false);
    }
  };

  const restart = () => {
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
  };

  if (recommendation) {
    return (
      <div className="space-y-6">
        <ProgressHeader
          stepIndex={totalSteps - 1}
          totalSteps={totalSteps}
          answeredCount={totalSteps}
          complete
        />

        {(answers.setback === "time-off" || answers.setback === "niggle") && (
          <HealthDisclaimerBlock />
        )}

        <div className="space-y-5 rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6">
          <div>
            <p className="text-sm font-medium text-primary">Recommended plan</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              {recommendation.plan.name} · {recommendation.plan.duration}
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {recommendation.rationale}
            </p>
            {recommendation.note && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {recommendation.note}
              </p>
            )}
            {recommendation.caution && (
              <p className="mt-3 rounded-lg border border-border/70 bg-background/80 px-3 py-2 text-sm leading-relaxed">
                <MedicalDisclaimerText>
                  {recommendation.caution}
                </MedicalDisclaimerText>
              </p>
            )}
            {recommendation.injuryHref && (
              <p className="mt-2 text-sm text-muted-foreground">
                <Link
                  href={recommendation.injuryHref}
                  className="text-primary hover:underline"
                >
                  Read related injury guidance
                </Link>
              </p>
            )}
            <p className="mt-3 text-sm text-muted-foreground">
              {recommendation.plan.runsPerWeek} runs per week ·{" "}
              {recommendation.plan.prerequisite}
            </p>
          </div>

          {recommendation.crossTrain.length > 0 && (
            <div className="rounded-lg border border-border/50 bg-background/60 p-4">
              <h3 className="text-sm font-semibold tracking-tight">
                Suggested cross-training
                {recommendation.healthFocus
                  ? ` for ${recommendation.healthFocus}`
                  : ""}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Use these on cross-train days to build fitness without stacking
                more running impact.
              </p>
              <ul className="mt-3 space-y-2.5">
                {recommendation.crossTrain.map((item) => (
                  <li key={item.title} className="text-sm leading-relaxed">
                    <span className="font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      — {item.why}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AnswerSummary
            answers={answers as OnboardingAnswers}
            fields={fields}
            onEdit={(index) => {
              setShowResult(false);
              setStepIndex(index);
            }}
          />

          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={
                <Link
                  href={`/plan/${recommendation.planId}?from=start#plan-tracker`}
                  onClick={() => {
                    const complete = answers as OnboardingAnswers;
                    savePlanBrief({
                      planId: recommendation.planId,
                      rationale: recommendation.rationale,
                      note: recommendation.note,
                      caution: recommendation.caution,
                      injuryHref: recommendation.injuryHref,
                      healthFocus:
                        recommendation.healthFocus ??
                        healthFocusLabel(
                          complete.setback,
                          complete.niggleArea,
                          complete.timeOffReason
                        ),
                      crossTrain: recommendation.crossTrain,
                      fromQuiz: true,
                      savedAt: new Date().toISOString(),
                    });
                  }}
                />
              }
              size="lg"
              className="gap-2"
            >
              Open this plan
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            {recommendation.alternate && (
              <Button
                nativeButton={false}
                render={
                  <Link
                    href={`/plan/${recommendation.alternate.planId}?from=start#plan-tracker`}
                    onClick={() => {
                      const complete = answers as OnboardingAnswers;
                      savePlanBrief({
                        planId: recommendation.alternate!.planId,
                        rationale: `${recommendation.alternate!.label} ${recommendation.rationale}`,
                        note: recommendation.note,
                        caution: recommendation.caution,
                        injuryHref: recommendation.injuryHref,
                        healthFocus:
                          recommendation.healthFocus ??
                          healthFocusLabel(
                            complete.setback,
                            complete.niggleArea,
                            complete.timeOffReason
                          ),
                        crossTrain: recommendation.crossTrain,
                        fromQuiz: true,
                        savedAt: new Date().toISOString(),
                      });
                    }}
                  />
                }
                variant="outline"
                size="lg"
              >
                {recommendation.alternate.label}
              </Button>
            )}
            <Button
              nativeButton={false}
              render={
                <Link
                  href={`/plan/${recommendation.planId}/printable?from=start`}
                  onClick={() => {
                    const complete = answers as OnboardingAnswers;
                    savePlanBrief({
                      planId: recommendation.planId,
                      rationale: recommendation.rationale,
                      note: recommendation.note,
                      caution: recommendation.caution,
                      injuryHref: recommendation.injuryHref,
                      healthFocus:
                        recommendation.healthFocus ??
                        healthFocusLabel(
                          complete.setback,
                          complete.niggleArea,
                          complete.timeOffReason
                        ),
                      crossTrain: recommendation.crossTrain,
                      fromQuiz: true,
                      savedAt: new Date().toISOString(),
                    });
                  }}
                />
              }
              variant="outline"
              size="lg"
            >
              Download PDF
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/signup" />}
              variant="outline"
              size="lg"
            >
              Create a free account
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowResult(false);
                setStepIndex(totalSteps - 1);
              }}
            >
              Back to last question
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={restart}>
              Start over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentValue = answerValue(answers, fieldId);
  const options = optionsForField(fieldId);
  const showHealthDisclaimer = isHealthField(fieldId);

  return (
    <div className="space-y-6">
      <ProgressHeader
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        answeredCount={answeredCount}
      />

      <nav aria-label="Quiz steps" className="overflow-x-auto pb-1">
        <ol className="flex min-w-max gap-1.5 sm:gap-2">
          {fields.map((field, index) => {
            const done = answerValue(answers, field) != null;
            const active = index === stepIndex;
            const firstUnanswered = fields.findIndex(
              (id) => answerValue(answers, id) == null
            );
            const maxReach =
              firstUnanswered === -1 ? fields.length - 1 : firstUnanswered;
            const reachable = index <= maxReach;
            const isMain = ONBOARDING_STEPS.some((s) => s.id === field);

            return (
              <li key={field}>
                <button
                  type="button"
                  disabled={!reachable}
                  onClick={() => goToStep(index)}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors sm:px-3 sm:text-sm",
                    active && "bg-primary text-primary-foreground",
                    !active &&
                      done &&
                      "bg-muted text-foreground hover:bg-muted/80",
                    !active &&
                      !done &&
                      reachable &&
                      "text-muted-foreground hover:bg-muted/50",
                    !reachable && "cursor-not-allowed text-muted-foreground/40"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {done && !active ? (
                      <Check className="size-3.5 shrink-0" aria-hidden />
                    ) : (
                      <span className="tabular-nums">
                        {isMain
                          ? `${ONBOARDING_STEPS.findIndex((s) => s.id === field) + 1}.`
                          : "•"}
                      </span>
                    )}
                    {chipLabelForField(field)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {showHealthDisclaimer && <HealthDisclaimerBlock />}

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            {titleForField(fieldId)}
          </h2>
          <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
            {stepIndex + 1} / {totalSteps}
          </p>
        </div>

        <div
          className="grid gap-2"
          role="listbox"
          aria-label={titleForField(fieldId)}
        >
          {options.map((opt) => {
            const selected = currentValue === opt.value;
            return (
              <button
                key={String(opt.value)}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => selectAnswer(fieldId, opt.value)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors",
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border/60 bg-background hover:border-primary/40 hover:bg-muted/40"
                )}
              >
                <span>
                  <span className="block font-medium">{opt.label}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {opt.hint}
                  </span>
                </span>
                {selected ? (
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                ) : (
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5"
            disabled={stepIndex === 0}
            onClick={() => goToStep(stepIndex - 1)}
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Back
          </Button>

          {currentValue != null && (
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                if (stepIndex < totalSteps - 1) {
                  setStepIndex(stepIndex + 1);
                } else if (isOnboardingComplete(answers)) {
                  setShowResult(true);
                }
              }}
            >
              {stepIndex === totalSteps - 1 ? "See my plan" : "Continue"}
              <ArrowRight className="size-3.5" aria-hidden />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function HealthDisclaimerBlock() {
  return (
    <MedicalDisclaimerBanner>
      If pain is sharp, worsening, or changes how you walk, get it checked before
      building mileage.
    </MedicalDisclaimerBanner>
  );
}

function ProgressHeader({
  stepIndex,
  totalSteps,
  answeredCount,
  complete = false,
}: {
  stepIndex: number;
  totalSteps: number;
  answeredCount: number;
  complete?: boolean;
}) {
  const progress = complete
    ? 100
    : Math.round(
        ((stepIndex + (answeredCount > stepIndex ? 1 : 0)) / totalSteps) * 100
      );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>
          {complete
            ? "Quiz complete"
            : `Question ${stepIndex + 1} of ${totalSteps}`}
        </span>
        <span className="tabular-nums">{Math.min(progress, 100)}%</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={Math.min(progress, 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

function AnswerSummary({
  answers,
  fields,
  onEdit,
}: {
  answers: OnboardingAnswers;
  fields: OnboardingFieldId[];
  onEdit: (index: number) => void;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/60 p-4">
      <p className="text-sm font-medium text-foreground">Your answers</p>
      <ul className="mt-3 space-y-2">
        {fields.map((field, index) => (
          <li
            key={field}
            className="flex items-start justify-between gap-3 text-sm"
          >
            <div className="min-w-0">
              <p className="text-muted-foreground">{chipLabelForField(field)}</p>
              <p className="font-medium text-foreground">
                {labelForAnswer(field, answers)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(index)}
              className="shrink-0 text-primary hover:underline"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
