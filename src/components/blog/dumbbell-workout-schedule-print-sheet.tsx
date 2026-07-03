import Link from "next/link";
import { PrintableWatermark } from "@/components/blog/printable-watermark";
import { PrintPageButton } from "@/components/blog/print-page-button";
import {
  dumbbellScheduleExamples,
  dumbbellSchedulePhases,
  dumbbellScheduleProgressRule,
  dumbbellScheduleRules,
  dumbbellWeeklyTrackerWeeks,
  dumbbellWorkoutExercises,
  dumbbellWorkoutPrintablePath,
} from "@/lib/blog/dumbbell-workout-sheet";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type DumbbellWorkoutSchedulePrintSheetProps = {
  articleHref: string;
};

function dayAbbrev(day: string): string {
  return day.slice(0, 3);
}

export function DumbbellWorkoutSchedulePrintSheet({
  articleHref,
}: DumbbellWorkoutSchedulePrintSheetProps) {
  const workoutSheetHref = dumbbellWorkoutPrintablePath();

  return (
    <div className="print-sheet relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <PrintableWatermark />
      <div className="relative z-10">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href={articleHref} className="font-medium text-primary hover:underline">
            ← Back to article
          </Link>
          <Link href={workoutSheetHref} className="font-medium text-primary hover:underline">
            Workout sheet with diagrams
          </Link>
        </div>
        <PrintPageButton />
      </div>

      <header className="print-header mb-8 border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          LetsRunNow · Printable schedule
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          12-week dumbbell schedule
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">2 full-body sessions per week</strong> on
          non-consecutive days. Same 13 exercises in order each time. Print this for your fridge
          or basement — check off each week as you go.
        </p>
        <p className="mt-2 text-xs text-muted-foreground print:text-[10px]">
          Print → Save as PDF. Pair with the{" "}
          <span className="text-foreground">workout sheet</span> for exercise diagrams.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-bold">Pick your two lift days</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Stick to the same days each week. Leave at least one day between lifts.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {dumbbellScheduleExamples.map((example) => (
            <div
              key={example.name}
              className="rounded-lg border border-border/80 bg-card p-4 break-inside-avoid"
            >
              <p className="font-semibold">{example.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{example.note}</p>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs">
                {WEEK_DAYS.map((d) => {
                  const isLift = example.liftDays.some((lift) => dayAbbrev(lift) === d);
                  return (
                    <div key={d} className="flex flex-col gap-1">
                      <span className="text-muted-foreground">{d}</span>
                      <span
                        className={
                          isLift
                            ? "rounded-md bg-primary py-1.5 font-bold text-primary-foreground"
                            : "rounded-md border border-border/60 py-1.5 text-muted-foreground"
                        }
                      >
                        {isLift ? "Lift" : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold">Rules (running + lifting)</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {dumbbellScheduleRules.map((rule) => (
            <li key={rule} className="flex gap-2">
              <span className="text-primary shrink-0">·</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold">12-week progression</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-border/80">
          <table className="w-full min-w-[32rem] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30">
                <th className="px-3 py-2 font-semibold">Weeks</th>
                <th className="px-3 py-2 font-semibold">Frequency</th>
                <th className="px-3 py-2 font-semibold">Sets × reps</th>
                <th className="px-3 py-2 font-semibold">Weight focus</th>
                <th className="px-3 py-2 font-semibold">Finisher</th>
              </tr>
            </thead>
            <tbody>
              {dumbbellSchedulePhases.map((phase) => (
                <tr key={phase.weeks} className="border-b border-border/50">
                  <td className="px-3 py-2 font-medium tabular-nums">{phase.weeks}</td>
                  <td className="px-3 py-2">{phase.frequency}</td>
                  <td className="px-3 py-2 font-medium">{phase.setsReps}</td>
                  <td className="px-3 py-2 text-muted-foreground">{phase.weightFocus}</td>
                  <td className="px-3 py-2 text-muted-foreground">{phase.finisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {dumbbellScheduleProgressRule}
        </p>
      </section>

      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold">Week 1–2 starting weights</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Use 2 × 15 reps in weeks 1–2. Men&apos;s and women&apos;s ranges are listed separately below.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border/80 bg-card p-4">
            <h3 className="font-semibold">Men</h3>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground">
              {dumbbellWorkoutExercises.map((exercise) => (
                <li key={`men-start-${exercise.id}`}>
                  <span className="font-medium text-foreground">{exercise.number}.</span>{" "}
                  {exercise.name} — {exercise.menStartWeight}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border/80 bg-card p-4">
            <h3 className="font-semibold">Women</h3>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground">
              {dumbbellWorkoutExercises.map((exercise) => (
                <li key={`women-start-${exercise.id}`}>
                  <span className="font-medium text-foreground">{exercise.number}.</span>{" "}
                  {exercise.name} — {exercise.womenStartWeight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8 break-inside-avoid print:break-before-page">
        <h2 className="text-lg font-bold">Typical week 8 targets (3 × 15)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          After gradual 2.5–5 lb bumps in weeks 5–8. Adjust if your path differs.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border/80 bg-card p-4">
            <h3 className="font-semibold">Men</h3>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground">
              {dumbbellWorkoutExercises.map((exercise) => (
                <li key={`men-w8-${exercise.id}`}>
                  <span className="font-medium text-foreground">{exercise.number}.</span>{" "}
                  {exercise.name} — {exercise.menWeek8Weight}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border/80 bg-card p-4">
            <h3 className="font-semibold">Women</h3>
            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-muted-foreground">
              {dumbbellWorkoutExercises.map((exercise) => (
                <li key={`women-w8-${exercise.id}`}>
                  <span className="font-medium text-foreground">{exercise.number}.</span>{" "}
                  {exercise.name} — {exercise.womenWeek8Weight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8 break-inside-avoid">
        <h2 className="text-lg font-bold">Weekly check-off tracker</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark each session when done. Add weight only when both sessions in a week felt solid at 3×15.
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-border/80">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30">
                <th className="px-3 py-2 font-semibold">Week</th>
                <th className="px-3 py-2 font-semibold">Session 1 ✓</th>
                <th className="px-3 py-2 font-semibold">Session 2 ✓</th>
                <th className="px-3 py-2 font-semibold">Weight bump?</th>
                <th className="px-3 py-2 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: dumbbellWeeklyTrackerWeeks }, (_, i) => i + 1).map((week) => (
                <tr key={week} className="border-b border-border/50">
                  <td className="px-3 py-3 font-medium tabular-nums">{week}</td>
                  <td className="px-3 py-3">
                    <span className="inline-block size-4 rounded border border-border" />
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block size-4 rounded border border-border" />
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block size-4 rounded border border-border" />
                  </td>
                  <td className="px-3 py-3 min-w-[8rem] border-b border-dotted border-border/80" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
        <p>
          Exercise list & form diagrams: {workoutSheetHref} · Full article:{" "}
          {articleHref.replace(/^https?:\/\/[^/]+/, "")}
        </p>
        <p className="mt-1">Not medical advice. Stop if you feel sharp joint pain.</p>
      </footer>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-sheet { max-width: 100%; padding: 0.35in; }
          .print-watermark { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .print-header { margin-bottom: 0.2in; padding-bottom: 0.15in; }
          table { font-size: 9pt; }
        }
      `}</style>
    </div>
  );
}
