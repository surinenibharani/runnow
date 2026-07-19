"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  recommendShoeCategory,
  type CushionPreference,
  type InjuryHistory,
  type MileageBand,
  type RunningSurface,
  type ShoeQuizAnswers,
} from "@/lib/tools/shoe-quiz";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2 | 3 | 4;

const MILEAGE_OPTIONS: { value: MileageBand; label: string; hint: string }[] = [
  { value: "under-10", label: "Under 10 mi / week", hint: "Just starting" },
  { value: "10-25", label: "10–25 mi / week", hint: "Building a habit" },
  { value: "25-40", label: "25–40 mi / week", hint: "Steady volume" },
  { value: "over-40", label: "40+ mi / week", hint: "Higher mileage" },
];

const SURFACE_OPTIONS: { value: RunningSurface; label: string; hint: string }[] =
  [
    { value: "road", label: "Road / pavement", hint: "Sidewalks & roads" },
    { value: "trail", label: "Trails", hint: "Dirt, rocks, roots" },
    { value: "mixed", label: "Mixed", hint: "Mostly road, some trail" },
  ];

const CUSHION_OPTIONS: {
  value: CushionPreference;
  label: string;
  hint: string;
}[] = [
  { value: "soft", label: "Soft / cushy", hint: "Plush landing" },
  { value: "moderate", label: "Balanced", hint: "Middle ground" },
  { value: "firm", label: "Firmer", hint: "More ground feel" },
];

const INJURY_OPTIONS: { value: InjuryHistory; label: string; hint: string }[] = [
  { value: "none", label: "No notable history", hint: "Feeling good" },
  { value: "past", label: "Past niggles", hint: "Resolved or managed" },
  {
    value: "current",
    label: "Something hurts now",
    hint: "Get care first",
  },
];

export function ShoeQuiz() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Partial<ShoeQuizAnswers>>({});

  const recommendation =
    step === 4 &&
    answers.mileage &&
    answers.surface &&
    answers.cushion &&
    answers.injury
      ? recommendShoeCategory(answers as ShoeQuizAnswers)
      : null;

  function selectMileage(value: MileageBand) {
    setAnswers((a) => ({ ...a, mileage: value }));
    setStep(1);
  }
  function selectSurface(value: RunningSurface) {
    setAnswers((a) => ({ ...a, surface: value }));
    setStep(2);
  }
  function selectCushion(value: CushionPreference) {
    setAnswers((a) => ({ ...a, cushion: value }));
    setStep(3);
  }
  function selectInjury(value: InjuryHistory) {
    setAnswers((a) => ({ ...a, injury: value }));
    setStep(4);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              step > i || (step === 4 && i <= 3)
                ? "bg-primary"
                : step === i
                  ? "bg-primary/50"
                  : "bg-muted"
            )}
          />
        ))}
      </div>

      {step === 0 && (
        <Question
          title="How many miles do you run in a typical week?"
          options={MILEAGE_OPTIONS}
          onSelect={selectMileage}
        />
      )}
      {step === 1 && (
        <Question
          title="Where do you run most often?"
          options={SURFACE_OPTIONS}
          onSelect={selectSurface}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <Question
          title="What kind of cushion feel do you prefer?"
          options={CUSHION_OPTIONS}
          onSelect={selectCushion}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Question
          title="Any injury history worth mentioning?"
          options={INJURY_OPTIONS}
          onSelect={selectInjury}
          onBack={() => setStep(2)}
        />
      )}

      {recommendation && (
        <div className="space-y-5 rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6">
          <div>
            <p className="text-sm font-medium text-primary">Suggestion</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              {recommendation.category}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {recommendation.summary}
            </p>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {recommendation.tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">
            This is category guidance for shopping conversations — not medical
            advice or a prescription.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={<Link href={recommendation.gearHref} />}
              className="gap-2"
            >
              See shoe picks in Gear
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button type="button" variant="outline" onClick={restart}>
              Retake quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Question<T extends string>({
  title,
  options,
  onSelect,
  onBack,
}: {
  title: string;
  options: { value: T; label: string; hint: string }[];
  onSelect: (value: T) => void;
  onBack?: () => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
        {title}
      </h2>
      <div className="grid gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background px-4 py-3.5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <span>
              <span className="block font-medium">{opt.label}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {opt.hint}
              </span>
            </span>
            <ArrowRight
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
          </button>
        ))}
      </div>
      {onBack && (
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          Back
        </Button>
      )}
    </div>
  );
}
