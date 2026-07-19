"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar, ChevronDown, ChevronUp, Footprints, Route, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PLAN_FILTERS,
  planMatchesFilters,
  type PlanFilter,
} from "@/lib/plan-catalog";
import { PLAN_FAMILIES } from "@/lib/plans";
import type { SampleWeekPreview } from "@/lib/plan-stats";
import { PlanSampleWeek } from "@/components/plan/plan-sample-week";
import { cn } from "@/lib/utils";

export type PlanCatalogItem = {
  id: string;
  familyId: string;
  familyName: string;
  name: string;
  duration: string;
  description: string;
  prerequisite: string;
  filters: PlanFilter[];
  stats: {
    durationWeeks: number;
    totalRuns: number;
    peakWeeklyMileageLabel: string;
    crossTrainDaysPerWeek: number;
  };
  sampleWeek: SampleWeekPreview;
  peakWeek: SampleWeekPreview;
};

type PlanCatalogExplorerProps = {
  plans: PlanCatalogItem[];
  selectedPlanId?: string;
};

export function PlanCatalogExplorer({
  plans,
  selectedPlanId,
}: PlanCatalogExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathPlanMatch = pathname.match(/^\/plan\/([^/]+)\/?$/);
  const activePlanId =
    selectedPlanId ??
    pathPlanMatch?.[1] ??
    searchParams.get("plan") ??
    undefined;

  const [activeFilters, setActiveFilters] = useState<PlanFilter[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(
    activePlanId ?? plans[0]?.id ?? null
  );
  const [previewMode, setPreviewMode] = useState<Record<string, "week1" | "peak">>(
    {}
  );

  useEffect(() => {
    if (activePlanId) setExpandedId(activePlanId);
  }, [activePlanId]);

  const selectPlan = (planId: string) => {
    router.push(`/plan/${planId}#plan-tracker`, { scroll: false });
    requestAnimationFrame(() => {
      document.getElementById("plan-tracker")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const filteredPlans = useMemo(
    () => plans.filter((plan) => planMatchesFilters(plan.id, activeFilters)),
    [plans, activeFilters]
  );

  const toggleFilter = (filter: PlanFilter) => {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((f) => f !== filter)
        : [...current, filter]
    );
  };

  return (
    <section aria-labelledby="plan-catalog-heading" className="mb-12">
      <div className="mb-6">
        <h2 id="plan-catalog-heading" className="text-xl font-bold sm:text-2xl">
          Compare plans
        </h2>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Summaries load instantly — pick a plan, then customize your schedule
          below.
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter training plans"
        className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {PLAN_FILTERS.map((filter) => {
          const active = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => toggleFilter(filter.id)}
              aria-pressed={active}
              title={filter.description}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/60 bg-background text-foreground/80 hover:border-primary/40 hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          );
        })}
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveFilters([])}
            className="shrink-0 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {filteredPlans.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border/60 px-4 py-8 text-center text-sm text-muted-foreground">
          No plans match those filters. Try removing one.
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredPlans.map((plan) => {
            const isExpanded = expandedId === plan.id;
            const isSelected = activePlanId === plan.id;
            const preview =
              previewMode[plan.id] === "peak" ? plan.peakWeek : plan.sampleWeek;

            return (
              <li key={plan.id}>
                <Card
                  className={cn(
                    "overflow-hidden border-border/60 transition-shadow",
                    isSelected && "ring-2 ring-primary/30 border-primary/30"
                  )}
                >
                  <CardContent className="p-0">
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {plan.familyName}
                            </Badge>
                            {isSelected && (
                              <Badge className="text-xs">Selected</Badge>
                            )}
                            {plan.filters.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-[10px] font-normal"
                              >
                                {PLAN_FILTERS.find((f) => f.id === tag)?.label}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="mt-2 text-lg font-semibold sm:text-xl">
                            {plan.name}{" "}
                            <span className="text-muted-foreground font-normal">
                              · {plan.duration}
                            </span>
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {plan.description}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
                          <Button
                            type="button"
                            size="sm"
                            className="w-full sm:min-w-[8rem] inline-flex items-center justify-center gap-1"
                            onClick={() => selectPlan(plan.id)}
                          >
                            {isSelected ? "Open tracker" : "Select plan"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full sm:min-w-[8rem] inline-flex items-center justify-center gap-1"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : plan.id)
                            }
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? (
                              <>
                                Hide preview
                                <ChevronUp className="size-4" aria-hidden />
                              </>
                            ) : (
                              <>
                                Sample week
                                <ChevronDown className="size-4" aria-hidden />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-lg bg-muted/40 px-3 py-2.5">
                          <dt className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            <Calendar className="size-3" aria-hidden />
                            Duration
                          </dt>
                          <dd className="mt-0.5 text-sm font-semibold">
                            {plan.stats.durationWeeks} weeks
                          </dd>
                        </div>
                        <div className="rounded-lg bg-muted/40 px-3 py-2.5">
                          <dt className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            <Footprints className="size-3" aria-hidden />
                            Total runs
                          </dt>
                          <dd className="mt-0.5 text-sm font-semibold">
                            {plan.stats.totalRuns}
                          </dd>
                        </div>
                        <div className="rounded-lg bg-muted/40 px-3 py-2.5">
                          <dt className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            <Route className="size-3" aria-hidden />
                            Peak week
                          </dt>
                          <dd className="mt-0.5 text-sm font-semibold">
                            {plan.stats.peakWeeklyMileageLabel}
                          </dd>
                        </div>
                        <div className="rounded-lg bg-muted/40 px-3 py-2.5">
                          <dt className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            <Timer className="size-3" aria-hidden />
                            Cross-train
                          </dt>
                          <dd className="mt-0.5 text-sm font-semibold">
                            {plan.stats.crossTrainDaysPerWeek} days/wk
                          </dd>
                        </div>
                      </dl>

                      <p className="mt-3 text-xs text-muted-foreground">
                        {plan.prerequisite}
                      </p>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border/60 bg-background/50 px-4 py-4 sm:px-5">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewMode((m) => ({ ...m, [plan.id]: "week1" }))
                            }
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                              previewMode[plan.id] !== "peak"
                                ? "bg-primary/10 text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Week 1
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewMode((m) => ({ ...m, [plan.id]: "peak" }))
                            }
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                              previewMode[plan.id] === "peak"
                                ? "bg-primary/10 text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            Peak week
                          </button>
                        </div>
                        <PlanSampleWeek
                          title={preview.title}
                          focus={preview.focus}
                          weekLabel={
                            previewMode[plan.id] === "peak"
                              ? `Peak week (W${preview.week})`
                              : `Sample week (W${preview.week})`
                          }
                          days={preview.days}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {PLAN_FAMILIES.length} distances · {plans.length} plan lengths · default
        schedule: 3 run days + cross-training
      </p>
    </section>
  );
}
