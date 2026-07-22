import Link from "next/link";
import { DumbbellExerciseDiagram } from "@/components/blog/dumbbell-exercise-diagram";
import { PrintableWatermark } from "@/components/blog/printable-watermark";
import { PrintPageButton } from "@/components/blog/print-page-button";
import {
  dumbbellWorkoutExercises,
  dumbbellWorkoutSchedulePrintablePath,
} from "@/lib/blog/dumbbell-workout-sheet";
import { BRAND_CAPTION } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";

type DumbbellWorkoutPrintSheetProps = {
  articleHref: string;
};

export function DumbbellWorkoutPrintSheet({ articleHref }: DumbbellWorkoutPrintSheetProps) {
  return (
    <div className="print-sheet relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <PrintableWatermark />
      <div className="relative z-10">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href={articleHref}
              className="font-medium text-primary hover:underline"
            >
              ← Back to full article
            </Link>
            <Link
              href={dumbbellWorkoutSchedulePrintablePath()}
              className="font-medium text-primary hover:underline"
            >
              12-week schedule (print)
            </Link>
          </div>
          <PrintPageButton />
        </div>

        <header className="print-header mb-8 border-b border-border pb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {SITE_NAME} · {BRAND_CAPTION} · Printable workout sheet
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Full-body dumbbell workout
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Do exercises <strong className="text-foreground">1–13 in order</strong>. Finish all
            sets before the next move.{" "}
            <strong className="text-foreground">2× per week</strong> on non-consecutive days. Weeks
            1–2: <strong className="text-foreground">2 × 15</strong> · Week 3+:{" "}
            <strong className="text-foreground">3 × 15</strong>. Form and cues are the same for
            everyone — only starting weights differ (see weight chart at the end).
          </p>
          <p className="mt-2 text-xs text-muted-foreground print:text-[10px]">
            Use your browser&apos;s print dialog and choose &quot;Save as PDF&quot; for a portable
            copy. letsrunnow.com
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-1 text-lg font-bold">Form & exercise order</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Same positioning for men and women. Pick your starting weight from the chart below.
          </p>
          <div className="exercise-grid grid gap-4 sm:grid-cols-2">
            {dumbbellWorkoutExercises.map((exercise) => (
              <article
                key={exercise.id}
                className="exercise-card break-inside-avoid rounded-lg border border-border/80 bg-card p-3 sm:p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold leading-snug sm:text-base">
                    <span className="text-primary">{exercise.number}.</span> {exercise.name}
                  </h3>
                  <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
                    {exercise.prescription}
                  </span>
                </div>
                <DumbbellExerciseDiagram
                  exerciseId={exercise.id}
                  className="mt-3 h-auto w-full min-h-[170px] rounded-md border border-border/60 bg-white print:min-h-[185px] print:border-border"
                />
                <ol className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm print:text-[10px]">
                  {exercise.position.map((cue, i) => (
                    <li key={cue} className="flex gap-2">
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="break-inside-avoid print:break-before-page">
          <h2 className="mb-1 text-lg font-bold">Starting weights</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Week 1–2 use 2 × 15 at these weights. Week 3+ move to 3 × 15 before adding load.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border/80">
            <table className="w-full min-w-[28rem] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/80 bg-muted/30">
                  <th className="px-3 py-2 font-semibold w-8">#</th>
                  <th className="px-3 py-2 font-semibold">Exercise</th>
                  <th className="px-3 py-2 font-semibold">Men</th>
                  <th className="px-3 py-2 font-semibold">Women</th>
                </tr>
              </thead>
              <tbody>
                {dumbbellWorkoutExercises.map((exercise) => (
                  <tr key={exercise.id} className="border-b border-border/50">
                    <td className="px-3 py-2 font-medium tabular-nums text-primary">
                      {exercise.number}
                    </td>
                    <td className="px-3 py-2 font-medium">{exercise.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{exercise.menStartWeight}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {exercise.womenStartWeight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>
            12-week schedule & tracker: {dumbbellWorkoutSchedulePrintablePath()} · Full article:{" "}
            {articleHref.replace(/^https?:\/\/[^/]+/, "")}
          </p>
          <p className="mt-1">
            <strong className="font-semibold">Not medical advice.</strong> Stop if you feel sharp joint pain.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} {SITE_NAME}. Personal use only — do not
            republish.
          </p>
        </footer>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-sheet { max-width: 100%; padding: 0.35in; }
          .print-watermark { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .exercise-grid { gap: 0.2in; }
          .exercise-card { break-inside: avoid; page-break-inside: avoid; padding: 0.15in; }
          .print-header { margin-bottom: 0.2in; padding-bottom: 0.15in; }
          svg { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          table { font-size: 9pt; }
        }
      `}</style>
    </div>
  );
}
