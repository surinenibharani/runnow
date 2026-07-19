"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getDefaultCrossTrainGuidance,
  getDefaultPlanRationale,
  type CrossTrainSuggestion,
} from "@/lib/plan/cross-train-guidance";
import { readPlanBrief, type PlanBrief } from "@/lib/plan/plan-brief";
import type { TrainingPlan } from "@/lib/plan-types";

type PlanRecommendationSummaryProps = {
  plan: TrainingPlan;
  fromQuiz?: boolean;
};

function CrossTrainList({ items }: { items: CrossTrainSuggestion[] }) {
  return (
    <ul className="mt-3 space-y-3">
      {items.map((item) => (
        <li
          key={item.title}
          className="rounded-lg border border-border/50 bg-background/70 px-3 py-2.5"
        >
          <p className="text-sm font-medium text-foreground">
            {item.title}{" "}
            <span className="font-normal text-muted-foreground">
              · {item.category}
            </span>
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.why}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground/90">
            {item.how}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function PlanRecommendationSummary({
  plan,
  fromQuiz = false,
}: PlanRecommendationSummaryProps) {
  const [brief, setBrief] = useState<PlanBrief | null>(null);

  useEffect(() => {
    setBrief(readPlanBrief(plan.id));
  }, [plan.id]);

  const rationale = useMemo(() => {
    if (brief?.rationale) return brief.rationale;
    return getDefaultPlanRationale(plan);
  }, [brief, plan]);

  const crossTrain = useMemo(() => {
    if (brief?.crossTrain?.length) return brief.crossTrain;
    return getDefaultCrossTrainGuidance();
  }, [brief]);

  const printableHref = `/plan/${plan.id}/printable${fromQuiz ? "?from=start" : ""}`;

  return (
    <section
      className="mb-8 rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6"
      aria-labelledby="plan-why-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-primary">
            {brief?.fromQuiz || fromQuiz
              ? "Why this plan"
              : "About this plan"}
          </p>
          <h2
            id="plan-why-heading"
            className="mt-1 text-lg font-semibold tracking-tight sm:text-xl"
          >
            {plan.name} · {plan.duration}
          </h2>
        </div>
        <Button
          nativeButton={false}
          render={<Link href={printableHref} />}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Download className="size-4" aria-hidden />
          Download PDF
        </Button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {rationale}
      </p>
      {brief?.note && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {brief.note}
        </p>
      )}
      {brief?.healthFocus && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground/90">
          <Sparkles className="size-3.5 text-primary" aria-hidden />
          Tailored for {brief.healthFocus}
        </p>
      )}

      <div className="mt-5 border-t border-border/50 pt-4">
        <h3 className="text-sm font-semibold tracking-tight">
          Suggested cross-training
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Use these on cross-train days (or as a gentle swap if a run feels
          aggressive). They add fitness while easing the issues you flagged.
        </p>
        <CrossTrainList items={crossTrain} />
      </div>

      {brief?.injuryHref && (
        <p className="mt-4 text-sm text-muted-foreground">
          <Link
            href={brief.injuryHref}
            className="text-primary hover:underline"
          >
            Related injury guidance
          </Link>
        </p>
      )}
    </section>
  );
}
