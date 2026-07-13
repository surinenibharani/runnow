"use client";

import { useState } from "react";
import { Battery, Moon, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RecoveryReadiness } from "@/lib/recovery-readiness";
import { cn } from "@/lib/utils";

type RecoveryReadinessCardProps = {
  recovery: RecoveryReadiness;
  onSaved: () => void;
};

const SCORE_COLORS: Record<RecoveryReadiness["label"], string> = {
  Excellent: "text-green-600 dark:text-green-400",
  Good: "text-primary",
  Moderate: "text-amber-600 dark:text-amber-400",
  Low: "text-red-600 dark:text-red-400",
  Unknown: "text-muted-foreground",
};

const SCORE_RING: Record<RecoveryReadiness["label"], string> = {
  Excellent: "from-green-500/20 to-green-500/5 ring-green-500/30",
  Good: "from-primary/20 to-primary/5 ring-primary/30",
  Moderate: "from-amber-500/20 to-amber-500/5 ring-amber-500/30",
  Low: "from-red-500/20 to-red-500/5 ring-red-500/30",
  Unknown: "from-muted/30 to-muted/10 ring-border",
};

function FactorBar({ factor }: { factor: RecoveryReadiness["factors"][0] }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium">{factor.label}</span>
        <span className="text-muted-foreground tabular-nums">
          {factor.available ? `${factor.score}%` : "—"}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            factor.available ? "bg-primary" : "bg-muted-foreground/20"
          )}
          style={{ width: factor.available ? `${factor.score}%` : "0%" }}
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {factor.detail}
      </p>
    </div>
  );
}

export function RecoveryReadinessCard({
  recovery,
  onSaved,
}: RecoveryReadinessCardProps) {
  const [sleepHours, setSleepHours] = useState("");
  const [restingHr, setRestingHr] = useState("");
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormMessage("");

    const payload: Record<string, number | null> = {};
    if (sleepHours.trim()) {
      payload.sleepHours = parseFloat(sleepHours);
    }
    if (restingHr.trim()) {
      payload.restingHeartRate = parseInt(restingHr, 10);
    }

    if (Object.keys(payload).length === 0) {
      setFormMessage("Enter sleep and/or resting heart rate.");
      setSaving(false);
      return;
    }

    const res = await fetch("/api/user/wellness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setSaving(false);

    if (!res.ok) {
      setFormMessage(json.error || "Could not save.");
      return;
    }

    setFormMessage(json.message);
    if (sleepHours.trim()) setSleepHours("");
    if (restingHr.trim()) setRestingHr("");
    onSaved();
  }

  return (
    <Card id="recovery-readiness" className="border-border/60 scroll-mt-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Battery className="size-5 text-primary" />
          Recovery readiness
        </CardTitle>
        <p className="text-sm text-muted-foreground font-normal">
          Combines sleep, resting heart rate, weekly training load, and workouts
          from the last 48 hours — adjusted for your age and sex from profile.
          Log resting HR and sleep from your watch each morning for accurate
          scores (we do not treat run average HR as resting HR).
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
          <div
            className={cn(
              "flex size-32 shrink-0 flex-col items-center justify-center rounded-full bg-gradient-to-b ring-2 mx-auto sm:mx-0",
              SCORE_RING[recovery.label]
            )}
          >
            <span
              className={cn(
                "text-4xl font-bold tabular-nums",
                SCORE_COLORS[recovery.label]
              )}
            >
              {recovery.score ?? "—"}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {recovery.label}
            </span>
          </div>

          <div className="flex-1 space-y-4 min-w-0">
            <p className="text-sm leading-relaxed">{recovery.summary}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {recovery.profileSummary}
            </p>
            <div className="grid gap-4">
              {recovery.factors.map((factor) => (
                <FactorBar key={factor.id} factor={factor} />
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-lg border border-border/60 bg-muted/30 p-4 space-y-4"
        >
          <p className="text-sm font-medium flex items-center gap-2">
            <Moon className="size-4 text-primary" />
            Log from your watch
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="sleep-hours"
                className="text-xs text-muted-foreground"
              >
                Last night&apos;s sleep (hours)
              </Label>
              <Input
                id="sleep-hours"
                type="number"
                min={0}
                max={24}
                step={0.25}
                placeholder="e.g. 7.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="h-9 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="resting-hr"
                className="text-xs text-muted-foreground"
              >
                Resting heart rate this morning (bpm)
              </Label>
              <Input
                id="resting-hr"
                type="number"
                min={30}
                max={120}
                placeholder="e.g. 52"
                value={restingHr}
                onChange={(e) => setRestingHr(e.target.value)}
                className="h-9 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="sm" disabled={saving}>
              {saving ? "Saving…" : "Save wellness data"}
            </Button>
            {formMessage && (
              <span className="text-xs text-primary">{formMessage}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <HeartPulse className="size-3.5 shrink-0 mt-0.5" />
            Copy sleep and resting HR from Apple Health, Garmin Connect, or Coros
            each morning. Training load still uses your synced Strava workouts when
            wellness fields are empty.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
