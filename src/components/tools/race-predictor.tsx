"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatFinishTime, timePartsToSeconds } from "@/lib/tools/pace";
import {
  predictBetweenRaces,
  RACE_DISTANCES,
  type RaceDistanceId,
} from "@/lib/tools/race-predictor";
import { cn } from "@/lib/utils";

export function RacePredictor() {
  const [knownId, setKnownId] = useState<RaceDistanceId>("5k");
  const [targetId, setTargetId] = useState<RaceDistanceId>("half");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("28");
  const [seconds, setSeconds] = useState("0");

  const timeSeconds = timePartsToSeconds(
    Number(hours) || 0,
    Number(minutes) || 0,
    Number(seconds) || 0
  );

  const predicted =
    knownId === targetId
      ? timeSeconds
      : predictBetweenRaces(timeSeconds, knownId, targetId);

  const known = RACE_DISTANCES.find((d) => d.id === knownId);
  const target = RACE_DISTANCES.find((d) => d.id === targetId);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>I have run a…</Label>
        <div className="flex flex-wrap gap-2">
          {RACE_DISTANCES.map((d) => (
            <Button
              key={d.id}
              type="button"
              size="sm"
              variant={knownId === d.id ? "default" : "outline"}
              onClick={() => setKnownId(d.id)}
            >
              {d.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>My finish time</Label>
        <div className="grid max-w-md grid-cols-3 gap-2">
          <div>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              aria-label="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="h-11"
            />
            <p className="mt-1 text-center text-xs text-muted-foreground">hr</p>
          </div>
          <div>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              aria-label="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="h-11"
            />
            <p className="mt-1 text-center text-xs text-muted-foreground">min</p>
          </div>
          <div>
            <Input
              type="number"
              min={0}
              max={59}
              inputMode="numeric"
              aria-label="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="h-11"
            />
            <p className="mt-1 text-center text-xs text-muted-foreground">sec</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Predict time for…</Label>
        <div className="flex flex-wrap gap-2">
          {RACE_DISTANCES.map((d) => (
            <Button
              key={d.id}
              type="button"
              size="sm"
              variant={targetId === d.id ? "default" : "outline"}
              onClick={() => setTargetId(d.id)}
              className={cn(knownId === d.id && targetId !== d.id && "opacity-80")}
            >
              {d.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 px-5 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Predicted {target?.label} time
          {known ? ` from a ${known.label}` : ""}
        </p>
        <p className="mt-1 font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
          {predicted != null && predicted > 0
            ? formatFinishTime(predicted)
            : "—"}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Uses the Riegel formula (T₂ = T₁ × (D₂/D₁)¹·⁰⁶). It&apos;s a rough
          endurance estimate — hills, heat, and training change real results.
        </p>
      </div>
    </div>
  );
}
