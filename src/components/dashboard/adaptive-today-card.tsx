"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdaptivePlanCoach } from "@/components/plan/adaptive-plan-coach";
import type { AdaptiveBrief, AdaptiveMetricInsight } from "@/lib/adaptive-brief";
import { saveTrainingPlan } from "@/lib/training-plan-client";
import { cn } from "@/lib/utils";

type AdaptiveTodayCardProps = {
  brief: AdaptiveBrief;
  aiConfigured?: boolean;
  /** Called after a week hold / rebuild is saved so the dashboard can refresh. */
  onPlanWeekApplied?: () => void;
};

const TONE_STYLES: Record<AdaptiveMetricInsight["tone"], string> = {
  good: "border-primary/25 bg-primary/5",
  watch: "border-amber-500/30 bg-amber-500/5",
  neutral: "border-border/60 bg-muted/20",
  unknown: "border-border/50 bg-muted/10",
};

const ACTION_CTA: Partial<
  Record<AdaptiveBrief["action"], { href: string; label: string }>
> = {
  start_plan: { href: "/start", label: "Start here" },
  connect_strava: { href: "/api/strava/connect", label: "Connect Strava" },
  catch_up_gently: {
    href: "/tips/missed-a-week-dont-double-up",
    label: "Missed-week tip",
  },
  rebuild_week: {
    href: "/tips/missed-a-week-dont-double-up",
    label: "Why not catch up?",
  },
  hold_deload: {
    href: "/tips/resting-hr-up-for-days-back-off-early",
    label: "Resting HR tip",
  },
  protect_taper: { href: "/plan", label: "Open plan" },
  log_wellness: { href: "#recovery-readiness", label: "Log wellness" },
  go_easy: { href: "/plan", label: "View today's workout" },
  rest_or_walk: {
    href: "/tips/rest-days-are-training-days",
    label: "Rest-day tip",
  },
  run_as_planned: { href: "/plan", label: "Open plan" },
};

export function AdaptiveTodayCard({
  brief,
  aiConfigured = false,
  onPlanWeekApplied,
}: AdaptiveTodayCardProps) {
  const [headline, setHeadline] = useState(brief.headline);
  const [body, setBody] = useState(brief.body);
  const [polishing, setPolishing] = useState(false);
  const [polished, setPolished] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  useEffect(() => {
    setHeadline(brief.headline);
    setBody(brief.body);
    setPolished(false);
    setApplyMessage("");
  }, [brief.headline, brief.body, brief.action]);

  useEffect(() => {
    if (!aiConfigured || polished) return;
    let cancelled = false;

    async function polish() {
      setPolishing(true);
      try {
        const res = await fetch("/api/adaptive/polish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brief }),
        });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as {
          headline?: string;
          body?: string;
          polished?: boolean;
        };
        if (data.polished && data.headline && data.body && !cancelled) {
          setHeadline(data.headline);
          setBody(data.body);
          setPolished(true);
        }
      } catch {
        /* keep rule-based copy */
      } finally {
        if (!cancelled) setPolishing(false);
      }
    }

    void polish();
    return () => {
      cancelled = true;
    };
  }, [aiConfigured, brief, polished]);

  async function applyWeek(week: number, successNote: string) {
    setApplying(true);
    setApplyMessage("");
    try {
      await saveTrainingPlan({ currentWeek: week });
      setApplyMessage(successNote);
      onPlanWeekApplied?.();
    } catch {
      setApplyMessage("Couldn’t update your plan week. Try again from /plan.");
    } finally {
      setApplying(false);
    }
  }

  const cta = ACTION_CTA[brief.action];
  const rebuild = brief.weekRebuild;
  const showRebuildApply =
    rebuild &&
    rebuild.mode !== "no_op" &&
    (brief.action === "rebuild_week" ||
      brief.action === "hold_deload" ||
      brief.action === "catch_up_gently");

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/8 via-background to-background overflow-hidden">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Adaptive coach · today
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-[10px] uppercase">
                  {brief.confidence} signal
                </Badge>
                {polished && (
                  <Badge variant="outline" className="text-[10px] uppercase">
                    AI tone
                  </Badge>
                )}
                {polishing && (
                  <span className="text-[10px] text-muted-foreground">
                    Tuning copy…
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
              {headline}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {body}
            </p>
          </div>

          {brief.reasons.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {brief.reasons.map((reason) => (
                <li
                  key={reason}
                  className="rounded-md border border-border/60 bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {reason}
                </li>
              ))}
            </ul>
          )}

          {rebuild && rebuild.placements.length > 0 && (
            <ul className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 space-y-1.5 text-sm text-muted-foreground">
              {rebuild.placements.map((p) => (
                <li key={`${p.fromLabel}-${p.toDayName}`}>
                  Make up <span className="font-medium text-foreground">{p.fromLabel}</span>{" "}
                  as an easy effort on{" "}
                  <span className="font-medium text-foreground">{p.toDayName}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            {showRebuildApply && rebuild && (
              <Button
                size="sm"
                disabled={applying}
                onClick={() =>
                  void applyWeek(
                    rebuild.suggestedWeek,
                    `Plan held on week ${rebuild.suggestedWeek} — keep efforts easy.`
                  )
                }
              >
                {applying ? "Applying…" : rebuild.applyLabel}
                <ArrowRight className="size-4" />
              </Button>
            )}
            {cta &&
              (cta.href.startsWith("#") ? (
                <Button
                  size="sm"
                  variant={showRebuildApply ? "outline" : "default"}
                  nativeButton={false}
                  render={<a href={cta.href} />}
                >
                  {cta.label}
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant={showRebuildApply ? "outline" : "default"}
                  nativeButton={false}
                  render={<Link href={cta.href} />}
                >
                  {cta.label}
                  <ArrowRight className="size-4" />
                </Button>
              ))}
          </div>
          {applyMessage && (
            <p className="text-xs text-primary">{applyMessage}</p>
          )}
        </CardContent>
      </Card>

      {brief.metricInsights.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {brief.metricInsights.map((insight) => (
            <Card
              key={insight.id}
              className={cn("border", TONE_STYLES[insight.tone])}
            >
              <CardContent className="p-4 space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {insight.label}
                </p>
                <p className="font-semibold tabular-nums">{insight.value}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.narrative}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {brief.planSuggestion && (
        <AdaptivePlanCoach
          suggestion={brief.planSuggestion}
          applying={applying}
          onApplyWeek={(week) =>
            void applyWeek(
              week,
              `Plan held on week ${week} — keep efforts easy until readiness recovers.`
            )
          }
        />
      )}
    </div>
  );
}
