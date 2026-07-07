import Link from "next/link";
import { PrintableWatermark } from "@/components/blog/printable-watermark";
import { PrintPageButton } from "@/components/blog/print-page-button";
import {
  beginnerDumbbellExercises,
  beginnerDumbbellTrackerWeeks,
  beginnerDumbbellWeekDays,
} from "@/lib/blog/beginner-dumbbell-workout-sheet";
import { BRAND_CAPTION } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";

type BeginnerDumbbellWorkoutTrackerPrintSheetProps = {
  articleHref: string;
};

function WeekTrackerTable({ week }: { week: number }) {
  return (
    <section className="week-block break-inside-avoid rounded-lg border border-border/80 bg-card p-3 sm:p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/60 pb-2">
        <h3 className="text-sm font-bold sm:text-base">Week {week}</h3>
        <p className="text-xs sm:text-sm">
          <span className="font-semibold text-foreground">Body weight:</span>{" "}
          <span className="inline-block min-w-[5rem] border-b border-dotted border-border align-bottom" />
          <span className="ml-1 text-muted-foreground">(lb or kg)</span>
        </p>
      </div>

      <p className="mt-2 text-[10px] leading-snug text-muted-foreground sm:text-xs">
        Circle the days you lifted. In each day column, write reps per set as{" "}
        <span className="font-medium text-foreground">12/14/15</span> (set 1 / set 2 / set 3).
        Use the weight column for the dumbbell load that day.
      </p>

      <div className="mt-2 overflow-x-auto">
        <table className="tracker-table w-full min-w-[36rem] text-left text-[10px] sm:text-xs">
          <thead>
            <tr className="border-b border-border/80 bg-muted/30">
              <th className="px-1.5 py-1.5 font-semibold sm:px-2">Exercise</th>
              {beginnerDumbbellWeekDays.map((day) => (
                <th key={day} className="px-1 py-1.5 text-center font-semibold">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {beginnerDumbbellExercises.map((exercise) => (
              <tr key={exercise.id} className="border-b border-border/50">
                <td className="px-1.5 py-2 align-top sm:px-2">
                  <span className="font-medium leading-snug">{exercise.name}</span>
                  <span className="mt-0.5 block text-[9px] text-muted-foreground sm:text-[10px]">
                    {exercise.prescription}
                  </span>
                </td>
                {beginnerDumbbellWeekDays.map((day) => (
                  <td key={day} className="px-1 py-1.5 align-top">
                    <div className="tracker-cell mx-auto min-h-[2.75rem] w-full max-w-[4.5rem] rounded border border-border/70 bg-background p-1">
                      <div className="mb-1 border-b border-dotted border-border/60 pb-0.5 text-[8px] text-muted-foreground">
                        wt
                      </div>
                      <div className="min-h-[1.25rem] text-center text-[9px] leading-tight text-muted-foreground">
                        /
                        <span className="text-border">/</span>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-[10px] text-muted-foreground sm:text-xs">
        Notes:{" "}
        <span className="inline-block min-w-[12rem] flex-1 border-b border-dotted border-border" />
      </p>
    </section>
  );
}

export function BeginnerDumbbellWorkoutTrackerPrintSheet({
  articleHref,
}: BeginnerDumbbellWorkoutTrackerPrintSheetProps) {
  const weeks = Array.from({ length: beginnerDumbbellTrackerWeeks }, (_, i) => i + 1);

  return (
    <div className="print-sheet relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <PrintableWatermark />
      <div className="relative z-10">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href={articleHref} className="text-sm font-medium text-primary hover:underline">
            ← Back to full article
          </Link>
          <PrintPageButton />
        </div>

        <header className="print-header mb-8 border-b border-border pb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {SITE_NAME} · {BRAND_CAPTION} · Printable tracker
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Beginner dumbbell workout tracker
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Log <strong className="text-foreground">dumbbell weight</strong>,{" "}
            <strong className="text-foreground">reps per set</strong>, and{" "}
            <strong className="text-foreground">which days</strong> you trained each week. Record{" "}
            <strong className="text-foreground">weekly body weight</strong> at the top of each week
            block. Plan for <strong className="text-foreground">2–3 sessions per week</strong> on
            non-consecutive days.
          </p>
          <p className="mt-2 text-xs text-muted-foreground print:text-[10px]">
            Use your browser&apos;s print dialog and choose &quot;Save as PDF&quot; for a portable
            copy. letsrunnow.com
          </p>
        </header>

        <section className="mb-8 break-inside-avoid">
          <h2 className="text-lg font-bold">How to fill this in</h2>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
              <span className="text-primary">·</span> Each cell = one exercise on one day. Top line:
              dumbbell weight. Bottom line: reps for set 1 / set 2 / set 3 (e.g. 12/14/15).
            </li>
            <li>
              <span className="text-primary">·</span> Leave cells blank on days you did not lift that
              exercise.
            </li>
            <li>
              <span className="text-primary">·</span> For thread-the-needle rows, log each side in
              the notes line or use two sessions on different days.
            </li>
            <li>
              <span className="text-primary">·</span> When every set feels easy for a full week, bump
              weight slightly the next week — not every exercise has to progress on the same day.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="mb-4 text-lg font-bold">12-week log</h2>
          <div className="grid gap-6">
            {weeks.map((week) => (
              <WeekTrackerTable key={week} week={week} />
            ))}
          </div>
        </section>

        <section className="mb-8 break-inside-avoid rounded-lg border border-border/80 bg-muted/20 p-4">
          <h2 className="text-sm font-bold">Exercise reminder</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Do in order: warm-up → deadlift → goblet squat → thread-the-needle row → chest raise →
            rope pull → bicep curls → hammer curls.
          </p>
        </section>

        <footer className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>
            Full article: {articleHref.replace(/^https?:\/\/[^/]+/, "")}
          </p>
          <p className="mt-1">
            <strong className="font-semibold">Not medical advice.</strong> Stop if you feel sharp joint pain.
          </p>
        </footer>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-sheet { max-width: 100%; padding: 0.3in; }
          .print-watermark { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .print-header { margin-bottom: 0.15in; padding-bottom: 0.12in; }
          .week-block {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 0.2in;
            padding: 0.12in;
          }
          .week-block:nth-child(odd) {
            break-before: auto;
          }
          .week-block:nth-child(3n) {
            break-before: page;
            page-break-before: always;
          }
          .tracker-table { font-size: 7.5pt; }
          .tracker-cell { min-height: 0.45in; }
        }
      `}</style>
    </div>
  );
}
