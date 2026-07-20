"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type RaceMarker = {
  cx: number;
  cy: number;
  label: string;
  nudge?: string;
};

const raceMarkers: RaceMarker[] = [
  { cx: 130, cy: 159, label: "5K", nudge: "translate-x-3" },
  { cx: 400, cy: 158, label: "Half marathon" },
  { cx: 610, cy: 153, label: "Full marathon", nudge: "-translate-x-2" },
];

const SPOTLIGHT_MS = 2000;
const ALL_FADED_MS = 2000;
const ITERATIONS = 2;

export function HeroRaceMarkers() {
  const [focusIndex, setFocusIndex] = useState(0);
  const [allFaded, setAllFaded] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setSettled(true);
      setFocusIndex(-1);
      setAllFaded(false);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    void (async () => {
      for (let iteration = 0; iteration < ITERATIONS; iteration++) {
        for (let index = 0; index < raceMarkers.length; index++) {
          if (cancelled) return;
          setAllFaded(false);
          setFocusIndex(index);
          await wait(SPOTLIGHT_MS);
        }

        if (cancelled) return;
        setFocusIndex(-1);
        setAllFaded(true);
        await wait(ALL_FADED_MS);
      }

      if (cancelled) return;
      setSettled(true);
      setAllFaded(true);
      setFocusIndex(-1);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {raceMarkers.map((marker, index) => {
        const signWidth = marker.label === "5K" ? 40 : 78;
        const fontSize = marker.label === "5K" ? 10 : 7.5;
        const isFocused = !settled && !allFaded && focusIndex === index;

        return (
          <g
            key={marker.label}
            transform={`translate(${marker.cx}, ${marker.cy})`}
            className={marker.nudge}
          >
            <g
              className={cn(
                "hero-race-marker",
                isFocused && "hero-race-marker-focused",
                !settled && allFaded && "hero-race-marker-faded",
                settled && "hero-race-marker-settled"
              )}
            >
              <circle
                r="4"
                className="fill-primary stroke-primary"
                strokeWidth="1.2"
              />
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={-18}
                className="stroke-primary"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <rect
                x={-signWidth / 2}
                y={-36}
                width={signWidth}
                height={16}
                rx={4}
                className="fill-background stroke-primary/50"
                strokeWidth="1"
              />
              <text
                y={-25}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
                className="fill-primary"
              >
                {marker.label}
              </text>
            </g>
          </g>
        );
      })}
    </>
  );
}
