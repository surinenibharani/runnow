"use client";

import Link from "next/link";
import { Calendar, Flag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getRaceCountdown,
  type PlanPersonalization,
} from "@/lib/plan-personalization";

type PlanRaceCountdownProps = {
  profile: PlanPersonalization;
  onChange: (profile: PlanPersonalization) => void;
};

function minGoalDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function PlanRaceCountdown({
  profile,
  onChange,
}: PlanRaceCountdownProps) {
  const countdown = profile.goalRaceDate
    ? getRaceCountdown(profile.goalRaceDate)
    : null;

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Flag className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">First race date</h3>
          {countdown ? (
            <>
              <p className="mt-1 text-lg font-semibold tracking-tight">
                {countdown.headline}
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {countdown.detail}
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Parkrun, a local 5K, or any community race works. Leave this blank
              if you are just building the habit — a date is optional.
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 max-w-xs">
        <Label htmlFor="plan-race-countdown-date" className="text-sm font-medium">
          Goal race date
        </Label>
        <div className="relative mt-2">
          <Calendar className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="plan-race-countdown-date"
            type="date"
            min={minGoalDate()}
            value={profile.goalRaceDate?.slice(0, 10) ?? ""}
            onChange={(event) =>
              onChange({
                ...profile,
                goalRaceDate: event.target.value || null,
              })
            }
            className="pl-8"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Saturday Parkrun is a free community 5K — treat it as a dress rehearsal.{" "}
        <Link href="/blog/race-day-tips" className="text-primary hover:underline">
          Race-day tips
        </Link>
        .
      </p>
    </div>
  );
}
