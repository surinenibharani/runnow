import Link from "next/link";
import { Calendar, ClipboardList, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TrainingPlanDisplay } from "@/lib/training-plan-display";

type TrainingPlanSummaryCardProps = {
  plan: TrainingPlanDisplay;
};

export function TrainingPlanSummaryCard({ plan }: TrainingPlanSummaryCardProps) {
  const raceCountdown =
    plan.weeksUntilRace != null && plan.weeksUntilRace >= 0
      ? plan.weeksUntilRace === 0
        ? "Race week"
        : `${plan.weeksUntilRace} week${plan.weeksUntilRace === 1 ? "" : "s"} away`
      : plan.goalRaceDate && plan.weeksUntilRace != null && plan.weeksUntilRace < 0
        ? "Goal date passed"
        : null;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium flex items-center gap-2">
              <ClipboardList className="size-4 text-primary" />
              Your training plan
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">{plan.planName}</h2>
              {plan.planDuration && (
                <Badge variant="secondary">{plan.planDuration}</Badge>
              )}
            </div>
            {plan.familyName && (
              <p className="mt-1 text-sm text-muted-foreground">{plan.familyName}</p>
            )}
            <p className="mt-2 text-sm text-muted-foreground">
              Week {plan.currentWeek}
              {plan.totalWeeks > 0 ? ` of ${plan.totalWeeks}` : ""}
              {" · "}
              {plan.runDaysPerWeek} runs/week
              {" · "}
              Long run {plan.longRunDayName}
              {" · "}
              Rest {plan.restDayName}
            </p>
          </div>

          <Button
            nativeButton={false}
            render={<Link href={plan.editPlanHref} />}
            size="sm"
            className="shrink-0"
          >
            <Pencil className="size-4" />
            Edit plan
          </Button>
        </div>

        <dl className="mt-5 grid gap-4 border-t border-primary/15 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Goal race
            </dt>
            <dd className="mt-1 text-sm font-semibold">
              {plan.goalRaceDateLabel ? (
                <span className="inline-flex items-start gap-2">
                  <Calendar className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    {plan.goalRaceDateLabel}
                    {raceCountdown && (
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {raceCountdown}
                      </span>
                    )}
                  </span>
                </span>
              ) : (
                <span className="text-muted-foreground">Not set yet</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Age
            </dt>
            <dd className="mt-1 text-sm font-semibold">
              {plan.age ?? <span className="text-muted-foreground">Not set</span>}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Fitness level
            </dt>
            <dd className="mt-1 text-sm font-semibold">{plan.fitnessLabel}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Started
            </dt>
            <dd className="mt-1 text-sm font-semibold">
              {plan.startedAt
                ? new Date(plan.startedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
