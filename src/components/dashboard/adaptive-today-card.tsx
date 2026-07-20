"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdaptivePlanCoach } from "@/components/plan/adaptive-plan-coach";
import type { AdaptiveBrief, AdaptiveMetricInsight } from "@/lib/adaptive-brief";
import { cn } from "@/lib/utils";

type AdaptiveTodayCardProps = {
  brief: AdaptiveBrief;
  aiConfigured?: boolean;
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
  start_plan: { href: "/plan", label: "Choose a plan" },
  connect_strava: { href: "/api/strava/connect", label: "Connect Strava" },
  catch_up_gently: { href: "/plan", label: "Adjust on plan page" },
  protect_taper: { href: "/plan", label: "Open plan" },
  log_wellness: { href: "#recovery-readiness", label: "Log wellness" },
  go_easy: { href: "/plan", label: "View today's workout" },
  rest_or_walk: { href: "/tips/rest-days-are-training-days", label: "Rest-day tip" },
  run_as_planned: { href: "/plan", label: "Open plan" },
};

export function AdaptiveTodayCard({
  brief,
  aiConfigured = false,
}: AdaptiveTodayCardProps) {
  const [headline, setHeadline] = useState(brief.headline);
  const [body, setBody] = useState(brief.body);
  const [polishing, setPolishing] = useState(false);
  const [polished, setPolished] = useState(false);

  useEffect(() => {
    setHeadline(brief.headline);
    setBody(brief.body);
    setPolished(false);
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

  const cta = ACTION_CTA[brief.action];

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

          {cta &&
            (cta.href.startsWith("#") ? (
              <Button size="sm" nativeButton={false} render={<a href={cta.href} />}>
                {cta.label}
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                nativeButton={false}
                render={<Link href={cta.href} />}
              >
                {cta.label}
                <ArrowRight className="size-4" />
              </Button>
            ))}
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
        <div>
          <AdaptivePlanCoach suggestion={brief.planSuggestion} />
          <p className="text-xs text-muted-foreground mt-2">
            Apply week or plan-length changes on{" "}
            <Link
              href="/plan"
              className="text-primary underline-offset-2 hover:underline"
            >
              your training plan
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
