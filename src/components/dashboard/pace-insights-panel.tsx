import type { PaceInsights } from "@/lib/pace-analysis";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PaceInsightsPanelProps = {
  insights: PaceInsights;
};

function confidenceBadge(confidence: "low" | "medium" | "high") {
  if (confidence === "high") return { label: "High", variant: "default" as const };
  if (confidence === "medium") return { label: "Medium", variant: "secondary" as const };
  return { label: "Low", variant: "outline" as const };
}

export function PaceInsightsPanel({ insights }: PaceInsightsPanelProps) {
  if (!insights.available) {
    return (
      <Card className="border-border/60">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">Pace projections & training zones</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {insights.reason ??
              "Connect Strava and sync runs to estimate race times and pace zones."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/60">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">Race pace projections</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {insights.baselineNote} · {insights.runSampleSize} run
            {insights.runSampleSize === 1 ? "" : "s"} in the last 90 days
          </p>
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
            Estimates use the Riegel formula from your recent efforts. Longer races
            need more training — treat these as rough guides, not guarantees.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">Training pace zones</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Derived from your projected 5K pace — use on easy days, workouts, and
            long runs.
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
  );
}
