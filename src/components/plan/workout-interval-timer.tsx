"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  formatCueClock,
  parseWorkoutIntervals,
  type IntervalCue,
} from "@/lib/workout-intervals";
import { cn } from "@/lib/utils";

type WorkoutIntervalTimerProps = {
  intervals: string;
};

function cueTone(kind: IntervalCue["kind"]) {
  if (kind === "Jog" || kind === "Run") {
    return "bg-primary/15 text-primary";
  }
  if (kind === "Walk") {
    return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  }
  return "bg-muted text-muted-foreground";
}

function beep(frequency: number, durationSec = 0.14) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + durationSec);
    oscillator.start();
    oscillator.stop(ctx.currentTime + durationSec);
    oscillator.onended = () => {
      void ctx.close();
    };
  } catch {
    // Audio is optional — timer still works silently.
  }
}

export function WorkoutIntervalTimer({ intervals }: WorkoutIntervalTimerProps) {
  const cues = useMemo(() => parseWorkoutIntervals(intervals), [intervals]);
  const labelId = useId();
  const [running, setRunning] = useState(false);
  const [cueIndex, setCueIndex] = useState(0);
  const [remainingMs, setRemainingMs] = useState(
    () => (cues?.[0]?.seconds ?? 0) * 1000
  );
  const [activeIntervals, setActiveIntervals] = useState(intervals);
  const remainingRef = useRef(remainingMs);
  const cueIndexRef = useRef(0);

  if (activeIntervals !== intervals) {
    setActiveIntervals(intervals);
    if (cues) {
      const first = cues[0];
      setCueIndex(0);
      setRemainingMs((first?.seconds ?? 0) * 1000);
      setRunning(false);
    }
  }

  useEffect(() => {
    remainingRef.current = remainingMs;
  }, [remainingMs]);

  useEffect(() => {
    cueIndexRef.current = cueIndex;
  }, [cueIndex]);

  useEffect(() => {
    if (!running || !cues) return;
    const playlist = cues;

    const tickMs = 200;
    const id = window.setInterval(() => {
      const nextRemaining = remainingRef.current - tickMs;
      if (nextRemaining > 0) {
        remainingRef.current = nextRemaining;
        setRemainingMs(nextRemaining);
        return;
      }

      const nextIndex = cueIndexRef.current + 1;
      const next = playlist[nextIndex];
      if (!next) {
        remainingRef.current = 0;
        setRemainingMs(0);
        setRunning(false);
        beep(880, 0.22);
        window.setTimeout(() => beep(880, 0.22), 180);
        return;
      }

      cueIndexRef.current = nextIndex;
      remainingRef.current = next.seconds * 1000;
      setCueIndex(nextIndex);
      setRemainingMs(next.seconds * 1000);
      beep(next.kind === "Walk" || next.kind === "Rest" ? 440 : 660);
    }, tickMs);

    return () => window.clearInterval(id);
  }, [running, cues]);

  if (!cues) return null;

  const playlist = cues;
  const cue = playlist[Math.min(cueIndex, playlist.length - 1)] ?? playlist[0];
  if (!cue) return null;
  const totalMs = cue.seconds * 1000;
  const elapsedRatio =
    totalMs <= 0 ? 1 : Math.min(1, Math.max(0, 1 - remainingMs / totalMs));
  const finished =
    !running && remainingMs === 0 && cueIndex >= playlist.length - 1;
  const nextCue =
    cueIndex < playlist.length - 1 ? playlist[cueIndex + 1] : null;

  function startOrResume() {
    const first = playlist[0];
    if (!first) return;
    if (finished) {
      remainingRef.current = first.seconds * 1000;
      cueIndexRef.current = 0;
      setCueIndex(0);
      setRemainingMs(first.seconds * 1000);
    }
    setRunning(true);
    beep(cue.kind === "Walk" || cue.kind === "Rest" ? 440 : 660);
  }

  function skip() {
    const nextIndex = cueIndex + 1;
    const next = playlist[nextIndex];
    if (!next) {
      remainingRef.current = 0;
      setRemainingMs(0);
      setRunning(false);
      return;
    }
    cueIndexRef.current = nextIndex;
    remainingRef.current = next.seconds * 1000;
    setCueIndex(nextIndex);
    setRemainingMs(next.seconds * 1000);
  }

  function reset() {
    const first = playlist[0];
    if (!first) return;
    remainingRef.current = first.seconds * 1000;
    cueIndexRef.current = 0;
    setRunning(false);
    setCueIndex(0);
    setRemainingMs(first.seconds * 1000);
  }

  return (
    <div
      className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4"
      role="region"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="text-sm font-medium">
        Interval timer
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Beeps at each walk/jog change — keep your phone nearby. Optional sound.
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p
            className={cn(
              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
              cueTone(cue.kind)
            )}
          >
            {finished ? "Done" : cue.kind}
          </p>
          <p className="mt-2 font-mono text-4xl font-semibold tracking-tight tabular-nums">
            {formatCueClock(remainingMs / 1000)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {finished
              ? "Nice work — mark the day complete when you’re ready."
              : nextCue
                ? `Next: ${nextCue.kind} ${formatCueClock(nextCue.seconds)}`
                : "Last interval"}
            {!finished && ` · ${cueIndex + 1} of ${playlist.length}`}
          </p>
        </div>
      </div>

      <Progress
        value={finished ? 100 : Math.round(elapsedRatio * 100)}
        className="mt-4 h-2"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {running ? (
          <Button type="button" size="sm" onClick={() => setRunning(false)}>
            <Pause className="size-3.5" />
            Pause
          </Button>
        ) : (
          <Button type="button" size="sm" onClick={startOrResume}>
            <Play className="size-3.5" />
            {finished ? "Restart" : remainingMs < totalMs ? "Resume" : "Start"}
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={skip}
          disabled={finished}
        >
          <SkipForward className="size-3.5" />
          Skip
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={reset}>
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>
    </div>
  );
}
