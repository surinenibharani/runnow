import type { PaceInsights } from "@/lib/pace-analysis";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PaceInsightsPanelProps = {
  insights: PaceInsights;
  /** Adaptive coaching note layered on top of pace model (e.g. easy day when recovery is low). */
  adaptiveNote?: string | null;
};

function confidenceBadge(confidence: "low" | "medium" | "high") {
  if (confidence === "high") return { label: "High", variant: "default" as const };
  if (confidence === "medium") return { label: "Medium", variant: "secondary" as const };
  return { label: "Low", variant: "outline" as const };
}

export function PaceInsightsPanel({
  insights,
  adaptiveNote,
}: PaceInsightsPanelProps) {
  if (!insights.available) {
    return (
      <Card className="border-border/60">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">Pace projections & training zones</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {insights.reason ??
              "Connect Strava and sync runs to estimate race times and pace zones."}
          </p>
          {adaptiveNote && (
            <p className="mt-3 text-sm text-primary leading-relaxed">{adaptiveNote}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {adaptiveNote && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-sm leading-relaxed">{adaptiveNote}</p>
          </CardContent>
        </Card>
      )}

      {insights.athleteStats && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-5">
            <h3 className="font-semibold">Strava running totals</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              From your synced runs (last 28 days / calendar YTD) — same activities
              listed on this dashboard.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-muted-foreground">Last 4 weeks</p>
                <p className="font-semibold text-lg tabular-nums">
                  {insights.athleteStats.recentRunMiles.toFixed(1)} mi
                </p>
                <p className="text-xs text-muted-foreground">
                  {insights.athleteStats.recentRunCount} run
                  {insights.athleteStats.recentRunCount === 1 ? "" : "s"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Year to date</p>
                <p className="font-semibold text-lg tabular-nums">
                  {insights.athleteStats.ytdRunMiles.toFixed(1)} mi
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Projection source</p>
                <p className="font-medium capitalize">
                  {insights.baselineSource === "best_effort"
                    ? "Strava PR"
                    : "Blended recent training"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {insights.bestEfforts && insights.bestEfforts.length > 0 && (
        <Card className="border-border/60">
          <CardContent className="p-5">
            <h3 className="font-semibold">Recent best efforts</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pulled from Strava on sync — sharpens race projections when available.
            </p>
            <ul className="mt-3 space-y-2">
              {insights.bestEfforts.map((effort) => (
                <li
                  key={`${effort.name}-${effort.startDate}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-3 py-2 text-sm"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{effort.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(effort.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {effort.isPr && (
                      <Badge variant="secondary" className="text-xs">
                        PR
                      </Badge>
                    )}
                    <span className="font-semibold tabular-nums">{effort.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/60">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">Race pace projections</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {insights.baselineNote}
            {insights.runSampleSize + insights.crossTrainSampleSize > 0 && (
              <>
                {" "}
                · {insights.runSampleSize} run
                {insights.runSampleSize === 1 ? "" : "s"}
                {insights.crossTrainSampleSize > 0 && (
                  <>
                    , {insights.crossTrainSampleSize} cross-training
                  </>
                )}{" "}
                in the last 90 days
              </>
            )}
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              These are estimated finish times if you raced today, based on how
              fast you&apos;ve been running on Strava lately — not a promise of
              what you&apos;ll run on race day.
            </p>
            <p>
              We analyze recent runs plus cross-training (rides, elliptical,
              rowing, brisk hikes) — converted to run-equivalent effort — and
              use your age, sex, weight, and height when available to tune easy
              zones. Heart rate on activities helps weight harder efforts.
            </p>
            <p>
              Projections use your Strava best efforts when available, otherwise a
              blended recent-training baseline with the Riegel formula. The pace shown
              is the average you&apos;d need to hold for that race.
            </p>
            <p>
              <span className="font-medium text-foreground">Confidence</span> reflects
              how much recent data we have and how close your training is to each
              distance — marathon estimates are less certain if you haven&apos;t run
              long lately.
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {insights.projections.map((race) => {
              const badge = confidenceBadge(race.confidence);
              return (
                <div
                  key={race.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium">{race.label}</p>
                      <Badge variant={badge.variant} className="text-xs">
                        {badge.label} confidence
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {race.distanceLabel}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold tabular-nums">{race.projectedTime}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {race.projectedPace}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            Projections update as you sync new runs. Build mileage gradually before
            racing longer distances — these numbers are guides for pacing, not
            targets to chase in training every day.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">Training pace zones</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Anchored to estimated <span className="text-foreground">5K race pace</span>
            {insights.baselineSource === "best_effort"
              ? " from your Strava best efforts"
              : " from your fastest recent efforts (not average jog pace)"}
            , then adjusted for your profile.
          </p>
          <ul className="mt-5 space-y-2.5">
            {insights.zones.map((zone) => (
              <li
                key={zone.id}
                className="flex items-start gap-3 rounded-lg border border-border/60 px-3 py-2.5"
              >
                <span
                  className="mt-1 size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: zone.color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-medium text-sm">{zone.label}</p>
                    <p className="text-sm tabular-nums text-muted-foreground shrink-0">
                      {zone.paceRange}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {zone.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p
            className={cn(
              "mt-4 text-xs text-muted-foreground leading-relaxed",
              "border-t border-border/60 pt-3"
            )}
          >
            Most weekly mileage should fall in Easy and Recovery. Hit Threshold and
            Interval zones only on planned workout days.
          </p>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
