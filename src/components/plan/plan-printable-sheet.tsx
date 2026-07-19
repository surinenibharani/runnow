"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PrintableWatermark } from "@/components/blog/printable-watermark";
import { PrintPageButton } from "@/components/blog/print-page-button";
import {
  getDefaultCrossTrainGuidance,
  getDefaultPlanRationale,
  type CrossTrainSuggestion,
} from "@/lib/plan/cross-train-guidance";
import { readPlanBrief } from "@/lib/plan/plan-brief";
import { BRAND_CAPTION } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";
import type { ScheduledWeek, TrainingPlan } from "@/lib/plan-types";

type PlanPrintableSheetProps = {
  plan: TrainingPlan;
  weeks: ScheduledWeek[];
  planHref: string;
  fromQuiz?: boolean;
};

function WriteLine({ label }: { label: string }) {
  return (
    <div className="min-h-[1.75rem] rounded border border-border/70 bg-background px-1 py-0.5">
      <span className="block text-[8px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="block min-h-[0.9rem] border-b border-dotted border-border/50" />
    </div>
  );
}

function WeekTable({
  week,
  focusCt,
}: {
  week: ScheduledWeek;
  focusCt: CrossTrainSuggestion[];
}) {
  const focusTitles = focusCt.map((c) => c.title).join(" · ");

  return (
    <section className="week-block relative break-inside-avoid overflow-hidden rounded-lg border border-border/80 bg-card p-3 sm:p-4">
      <PrintableWatermark mode="section" />
      <div className="relative z-10">
        <div className="border-b border-border/60 pb-2">
          <h3 className="text-sm font-bold sm:text-base">
            Week {week.week}: {week.title}
          </h3>
          <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
            {week.focus}
          </p>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="tracker-table w-full min-w-[40rem] text-left text-[10px] sm:text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30">
                <th className="px-1.5 py-1.5 font-semibold sm:px-2">Day</th>
                <th className="px-1.5 py-1.5 font-semibold sm:px-2">Session</th>
                <th className="px-1.5 py-1.5 font-semibold sm:px-2">Plan</th>
                <th className="w-[4.5rem] px-1 py-1.5 text-center font-semibold">
                  Duration
                </th>
                <th className="w-[5.5rem] px-1 py-1.5 text-center font-semibold">
                  Cross-train
                </th>
                <th className="w-[3.5rem] px-1 py-1.5 text-center font-semibold">
                  Mood
                </th>
                <th className="w-[3.5rem] px-1 py-1.5 text-center font-semibold">
                  Effort
                </th>
              </tr>
            </thead>
            <tbody>
              {week.days.map((day) => {
                const session =
                  day.kind === "run"
                    ? day.run?.name ?? "Run"
                    : day.kind === "cross-train"
                      ? day.crossTraining?.name ?? "Cross-train"
                      : "Rest";
                const planHint =
                  day.kind === "run"
                    ? day.run?.duration ?? ""
                    : day.kind === "cross-train"
                      ? day.crossTraining?.duration ?? ""
                      : "—";
                const ctHint =
                  day.kind === "cross-train" && focusTitles
                    ? focusTitles
                    : day.kind === "cross-train"
                      ? "See focus list"
                      : "";

                return (
                  <tr key={day.id} className="border-b border-border/50">
                    <td className="px-1.5 py-2 align-top font-medium sm:px-2">
                      {day.dayName}
                    </td>
                    <td className="px-1.5 py-2 align-top sm:px-2">
                      <span className="font-medium leading-snug">{session}</span>
                      {day.kind === "run" && day.run?.description && (
                        <span className="mt-0.5 block text-[9px] leading-snug text-muted-foreground">
                          {day.run.description}
                        </span>
                      )}
                      {ctHint && (
                        <span className="mt-0.5 block text-[9px] leading-snug text-muted-foreground">
                          Focus: {ctHint}
                        </span>
                      )}
                    </td>
                    <td className="px-1.5 py-2 align-top text-muted-foreground sm:px-2">
                      {planHint}
                    </td>
                    <td className="px-1 py-1.5 align-top">
                      {day.kind === "rest" ? (
                        <span className="block text-center text-muted-foreground">
                          —
                        </span>
                      ) : (
                        <WriteLine label="min" />
                      )}
                    </td>
                    <td className="px-1 py-1.5 align-top">
                      {day.kind === "rest" ? (
                        <span className="block text-center text-muted-foreground">
                          —
                        </span>
                      ) : (
                        <WriteLine label="notes" />
                      )}
                    </td>
                    <td className="px-1 py-1.5 align-top">
                      {day.kind === "rest" ? (
                        <span className="block text-center text-muted-foreground">
                          —
                        </span>
                      ) : (
                        <WriteLine label="1–5" />
                      )}
                    </td>
                    <td className="px-1 py-1.5 align-top">
                      {day.kind === "rest" ? (
                        <span className="block text-center text-muted-foreground">
                          —
                        </span>
                      ) : (
                        <WriteLine label="1–10" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function PlanPrintableSheet({
  plan,
  weeks,
  planHref,
  fromQuiz = false,
}: PlanPrintableSheetProps) {
  const [focusCt, setFocusCt] = useState<CrossTrainSuggestion[]>(
    getDefaultCrossTrainGuidance
  );
  const [rationale, setRationale] = useState(() =>
    getDefaultPlanRationale(plan)
  );
  const [healthFocus, setHealthFocus] = useState<string | null>(null);

  useEffect(() => {
    const brief = readPlanBrief(plan.id);
    if (brief?.crossTrain?.length) {
      setFocusCt(brief.crossTrain);
    } else {
      setFocusCt(getDefaultCrossTrainGuidance());
    }
    setRationale(brief?.rationale ?? getDefaultPlanRationale(plan));
    setHealthFocus(brief?.healthFocus ?? null);
  }, [plan]);

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 print:max-w-none print:px-0 print:py-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            <Link href={planHref} className="text-primary hover:underline">
              ← Back to plan
            </Link>
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            Printable plan tracker
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use Print → Save as PDF. Fill duration, cross-train notes, mood
            (1–5), and effort (1–10) by hand to compare weeks later.
          </p>
        </div>
        <PrintPageButton label="Print / Save PDF" />
      </div>

      <header className="mb-6 border-b border-border/70 pb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {SITE_NAME}
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
          {plan.name} · {plan.duration}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{BRAND_CAPTION}</p>
        {fromQuiz && (
          <p className="mt-2 text-xs text-muted-foreground">
            Personalized from Start Here
            {healthFocus ? ` · focused on ${healthFocus}` : ""}
          </p>
        )}
      </header>

      {(rationale || focusCt.length > 0) && (
        <section className="mb-6 break-inside-avoid rounded-lg border border-border/70 bg-muted/20 p-3 sm:p-4">
          {rationale && (
            <>
              <h3 className="text-sm font-semibold">Why this plan</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {rationale}
              </p>
            </>
          )}
          <h3 className={`${rationale ? "mt-3" : ""} text-sm font-semibold`}>
            Suggested cross-training
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs sm:text-sm">
            {focusCt.map((item) => (
              <li key={item.title} className="leading-snug">
                <span className="font-medium">{item.title}</span>
                <span className="text-muted-foreground">
                  {" "}
                  — {item.why} ({item.how})
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[10px] leading-snug text-muted-foreground sm:text-xs">
            Mood: 1 = drained · 5 = great. Effort: 1 = very easy · 10 = max.
            Educational only — not medical advice. Stop for sharp pain,
            dizziness, or chest pain.
          </p>
        </section>
      )}

      <div className="space-y-4">
        {weeks.map((week) => (
          <WeekTable key={week.week} week={week} focusCt={focusCt} />
        ))}
      </div>

      <footer className="mt-8 border-t border-border/60 pt-4 text-center text-[10px] text-muted-foreground sm:text-xs">
        <p>
          {SITE_NAME} · Keep this sheet to compare weeks. Re-print anytime from{" "}
          {planHref}
        </p>
      </footer>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-watermark {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          .print-watermark-img {
            opacity: 0.16 !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          body {
            background: white !important;
          }
          .week-block {
            break-inside: avoid;
            page-break-inside: avoid;
            position: relative;
          }
          .tracker-table {
            font-size: 7.5pt;
          }
        }
        .print-watermark-img {
          opacity: 0.1;
        }
        @media screen {
          .print-watermark-img {
            opacity: 0.08;
          }
        }
      `}</style>
    </div>
  );
}
