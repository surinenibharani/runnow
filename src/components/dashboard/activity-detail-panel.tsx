"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Mountain, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  ActivityLapRow,
  ActivitySplitRow,
  DecouplingInsight,
} from "@/lib/activity-detail";
import { cn } from "@/lib/utils";

type ActivityDetailSummary = {
  id: string;
  name: string;
  activityLabel: string;
  startDate: string;
  distanceLabel: string;
  durationLabel: string;
  paceLabel: string;
  averageHeartrate: number | null;
  maxHeartrate: number | null;
  elevationLabel: string | null;
  averageCadence: number | null;
  sufferScore: number | null;
  workoutTypeLabel: string | null;
};

type ActivityDetailResponse = {
  summary: ActivityDetailSummary;
  splits: ActivitySplitRow[];
  laps: ActivityLapRow[];
  splitTrend: string | null;
  decoupling: DecouplingInsight;
};

type ActivityDetailPanelProps = {
  activityId: string | null;
  onClose: () => void;
};

function decouplingBadgeClass(label: DecouplingInsight["label"]) {
  if (label === "excellent") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  if (label === "good") return "bg-sky-500/10 text-sky-700 dark:text-sky-300";
  if (label === "moderate") return "bg-amber-500/10 text-amber-800 dark:text-amber-200";
  return "bg-rose-500/10 text-rose-700 dark:text-rose-300";
}

export function ActivityDetailPanel({
  activityId,
  onClose,
}: ActivityDetailPanelProps) {
  const [data, setData] = useState<ActivityDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/activities/${id}/detail`);
      if (!res.ok) throw new Error("Failed to load activity");
      setData((await res.json()) as ActivityDetailResponse);
    } catch {
      setError("Could not load activity details from Strava.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activityId) {
      setData(null);
      setError(null);
      return;
    }
    void loadDetail(activityId);
  }, [activityId, loadDetail]);

  if (!activityId) return null;

  const summary = data?.summary;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-detail-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-hidden border-border/60 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="flex max-h-[90vh] flex-col p-0">
          <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {summary
                  ? new Date(summary.startDate).toLocaleString()
                  : "Loading activity…"}
              </p>
              <h2 id="activity-detail-title" className="truncate text-lg font-semibold">
                {summary?.name ?? "Activity detail"}
              </h2>
              {summary && (
                <p className="text-sm text-muted-foreground">{summary.activityLabel}</p>
              )}
            </div>
            <Button type="button" variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="overflow-y-auto px-5 py-4 space-y-5">
            {loading && (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="size-5 animate-spin" aria-hidden />
                <span className="ml-2 text-sm">Loading splits from Strava…</span>
              </div>
            )}

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            {summary && !loading && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Stat label="Distance" value={summary.distanceLabel} />
                  <Stat label="Moving time" value={summary.durationLabel} />
                  <Stat label="Pace" value={summary.paceLabel} />
                  {summary.averageHeartrate != null && (
                    <Stat
                      label="Avg HR"
                      value={`${Math.round(summary.averageHeartrate)} bpm`}
                    />
                  )}
                  {summary.elevationLabel && (
                    <Stat
                      label="Elevation"
                      value={summary.elevationLabel}
                      icon={<Mountain className="size-3.5" />}
                    />
                  )}
                  {summary.averageCadence != null && summary.averageCadence > 0 && (
                    <Stat
                      label="Cadence"
                      value={`${Math.round(summary.averageCadence)} spm`}
                    />
                  )}
                  {summary.sufferScore != null && summary.sufferScore > 0 && (
                    <Stat label="Relative effort" value={String(summary.sufferScore)} />
                  )}
                  {summary.workoutTypeLabel && summary.workoutTypeLabel !== "default" && (
                    <Stat
                      label="Workout type"
                      value={summary.workoutTypeLabel}
                    />
                  )}
                </div>

                {data?.decoupling.available && (
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-sm">Aerobic decoupling</p>
                      <Badge
                        variant="secondary"
                        className={cn("capitalize", decouplingBadgeClass(data.decoupling.label))}
                      >
                        {data.decoupling.label}
                        {data.decoupling.percent != null && ` · ${data.decoupling.percent}%`}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {data.decoupling.summary}
                    </p>
                    {data.decoupling.firstHalfPace && data.decoupling.secondHalfPace && (
                      <p className="text-xs text-muted-foreground">
                        1st half {data.decoupling.firstHalfPace}/mi @{" "}
                        {data.decoupling.firstHalfHr} bpm · 2nd half{" "}
                        {data.decoupling.secondHalfPace}/mi @ {data.decoupling.secondHalfHr} bpm
                      </p>
                    )}
                  </div>
                )}

                {data?.splitTrend && (
                  <p className="text-sm text-muted-foreground">{data.splitTrend}</p>
                )}

                {data && data.splits.length > 0 && (
                  <Section title="Mile splits">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-xs text-muted-foreground">
                            <th className="pb-2 pr-3">Split</th>
                            <th className="pb-2 pr-3">Pace</th>
                            <th className="pb-2 pr-3">HR</th>
                            <th className="pb-2">Elev Δ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.splits.map((split) => (
                            <tr key={split.index} className="border-t border-border/40">
                              <td className="py-2 pr-3 font-medium">{split.label}</td>
                              <td className="py-2 pr-3">{split.pace}</td>
                              <td className="py-2 pr-3">
                                {split.averageHeartrate
                                  ? `${Math.round(split.averageHeartrate)}`
                                  : "—"}
                              </td>
                              <td className="py-2">
                                {split.elevationDifference != null
                                  ? `${Math.round(split.elevationDifference * 3.28)} ft`
                                  : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Section>
                )}

                {data && data.laps.length > 1 && (
                  <Section title="Laps">
                    <div className="space-y-2">
                      {data.laps.map((lap) => (
                        <div
                          key={lap.index}
                          className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 text-sm"
                        >
                          <span className="font-medium">{lap.name}</span>
                          <span className="text-muted-foreground">
                            {lap.pace}
                            {lap.averageHeartrate
                              ? ` · ${Math.round(lap.averageHeartrate)} bpm`
                              : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/15 px-3 py-2.5">
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}
