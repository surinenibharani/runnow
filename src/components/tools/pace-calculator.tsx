"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  formatFinishTime,
  formatPace,
  finishTimeFromPaceAndDistance,
  parsePaceOrTime,
  paceFromDistanceAndTime,
  timePartsToSeconds,
  type DistanceUnit,
} from "@/lib/tools/pace";
import { cn } from "@/lib/utils";

type Mode = "pace" | "finish";

export function PaceCalculator() {
  const [mode, setMode] = useState<Mode>("pace");
  const [unit, setUnit] = useState<DistanceUnit>("mi");
  const [distance, setDistance] = useState("3.1");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");
  const [seconds, setSeconds] = useState("0");
  const [paceInput, setPaceInput] = useState("9:40");

  const distanceNum = Number(distance);
  const timeSeconds = timePartsToSeconds(
    Number(hours) || 0,
    Number(minutes) || 0,
    Number(seconds) || 0
  );

  let resultLabel = "";
  let resultValue = "—";

  if (mode === "pace") {
    const pace = paceFromDistanceAndTime(distanceNum, timeSeconds);
    resultLabel = `Pace per ${unit}`;
    resultValue = pace != null ? formatPace(pace) : "—";
  } else {
    const paceSeconds = parsePaceOrTime(paceInput);
    const finish =
      paceSeconds != null
        ? finishTimeFromPaceAndDistance(paceSeconds, distanceNum)
        : null;
    resultLabel = "Estimated finish time";
    resultValue = finish != null ? formatFinishTime(finish) : "—";
  }

  return (
    <div className="space-y-6">
      <div
        className="inline-flex rounded-lg bg-muted p-1"
        role="group"
        aria-label="Calculator mode"
      >
        {(
          [
            { id: "pace" as const, label: "Distance + time → pace" },
            { id: "finish" as const, label: "Pace + distance → finish" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setMode(opt.id)}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              mode === opt.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pace-distance">Distance</Label>
          <div className="flex gap-2">
            <Input
              id="pace-distance"
              type="number"
              min={0}
              step="0.1"
              inputMode="decimal"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="h-11"
            />
            <div
              className="inline-flex shrink-0 rounded-lg border border-border p-1"
              role="group"
              aria-label="Distance unit"
            >
              {(["mi", "km"] as const).map((u) => (
                <Button
                  key={u}
                  type="button"
                  size="sm"
                  variant={unit === u ? "default" : "ghost"}
                  onClick={() => setUnit(u)}
                  className="min-w-12"
                >
                  {u}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {mode === "pace" ? (
          <div className="space-y-2">
            <Label>Finish time</Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Input
                  id="pace-hours"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  aria-label="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="h-11"
                />
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  hr
                </p>
              </div>
              <div>
                <Input
                  id="pace-minutes"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  aria-label="Minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="h-11"
                />
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  min
                </p>
              </div>
              <div>
                <Input
                  id="pace-seconds"
                  type="number"
                  min={0}
                  max={59}
                  inputMode="numeric"
                  aria-label="Seconds"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="h-11"
                />
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  sec
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="pace-per-unit">
              Pace per {unit} (e.g. 9:40 or 0:09:40)
            </Label>
            <Input
              id="pace-per-unit"
              value={paceInput}
              onChange={(e) => setPaceInput(e.target.value)}
              placeholder="9:40"
              className="h-11"
            />
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 px-5 py-6 text-center">
        <p className="text-sm text-muted-foreground">{resultLabel}</p>
        <p className="mt-1 font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
          {resultValue}
        </p>
        {mode === "pace" && resultValue !== "—" && (
          <p className="mt-2 text-sm text-muted-foreground">
            minutes : seconds per {unit === "mi" ? "mile" : "kilometer"}
          </p>
        )}
      </div>
    </div>
  );
}
