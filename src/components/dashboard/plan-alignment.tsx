import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck } from "lucide-react";
import type { PlanAlignmentSummary } from "@/lib/plan-alignment";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  missed: "bg-destructive/10 text-destructive border-destructive/20",
  today: "bg-primary/10 text-primary border-primary/20",
  upcoming: "bg-muted text-muted-foreground border-border",
  rest: "bg-muted/50 text-muted-foreground border-border/60",
};

export function PlanAlignmentCard({ alignment }: { alignment: PlanAlignmentSummary }) {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarCheck className="size-5 text-primary" />
              Training plan alignment
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {alignment.planName} · Week {alignment.currentWeek}: {alignment.weekTitle}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{alignment.alignmentPercent}%</p>
            <p className="text-xs text-muted-foreground">this week</p>
          </div>
        </div>
        <Progress value={alignment.alignmentPercent} className="mt-4 h-2" />
        <p className="text-sm text-muted-foreground mt-2">{alignment.message}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {alignment.days.map((day) => (
          <div
            key={day.dayId}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 p-3 text-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-medium w-10 shrink-0">{day.dayName}</span>
              <div className="min-w-0">
                <p className="font-medium truncate">{day.label}</p>
                {day.stravaMatch && (
                  <p className="text-xs text-muted-foreground truncate">
                    Strava: {day.stravaMatch.name} · {day.stravaMatch.distance}
                  </p>
                )}
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn("text-xs capitalize shrink-0", statusStyles[day.status])}
            >
              {day.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
