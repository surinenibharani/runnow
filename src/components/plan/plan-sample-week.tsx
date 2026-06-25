import { cn } from "@/lib/utils";
import type { SampleWeekDay } from "@/lib/plan-stats";

const kindStyles: Record<SampleWeekDay["kind"], string> = {
  run: "border-l-orange-500 bg-orange-500/5",
  "cross-train": "border-l-sky-500 bg-sky-500/5",
  rest: "border-l-slate-400 bg-muted/30",
};

const kindLabels: Record<SampleWeekDay["kind"], string> = {
  run: "Run",
  "cross-train": "Cross-train",
  rest: "Rest",
};

type PlanSampleWeekProps = {
  title: string;
  focus: string;
  weekLabel: string;
  days: SampleWeekDay[];
  compact?: boolean;
};

export function PlanSampleWeek({
  title,
  focus,
  weekLabel,
  days,
  compact = false,
}: PlanSampleWeekProps) {
  return (
    <div className={cn("rounded-lg border border-border/60 bg-muted/20", compact ? "p-3" : "p-4")}>
      <div className="mb-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {weekLabel}
          </p>
          <p className={cn("font-semibold text-foreground", compact ? "text-sm" : "text-base")}>
            {title}
          </p>
        </div>
        {!compact && (
          <p className="text-xs text-muted-foreground sm:max-w-[50%] sm:text-right">
            {focus}
          </p>
        )}
      </div>

      {/* Desktop: 7-column grid when space allows */}
      <div className="hidden gap-1.5 sm:grid sm:grid-cols-7">
        {days.map((day) => (
          <div
            key={day.dayName}
            className={cn(
              "rounded-md border-l-2 px-2 py-2 text-center",
              kindStyles[day.kind]
            )}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {day.dayName}
            </p>
            <p className="mt-1 text-[10px] font-medium leading-tight text-foreground line-clamp-2">
              {day.kind === "rest" ? "Rest" : day.label.split(" ").slice(0, 3).join(" ")}
            </p>
            <p className="mt-0.5 text-[9px] text-muted-foreground capitalize">
              {kindLabels[day.kind]}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: stacked list */}
      <ul className="space-y-2 sm:hidden">
        {days.map((day) => (
          <li
            key={day.dayName}
            className={cn(
              "rounded-md border-l-2 px-3 py-2.5",
              kindStyles[day.kind]
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground">
                    {day.dayName}
                  </span>
                  <span className="rounded-full bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {kindLabels[day.kind]}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {day.label}
                </p>
                {day.detail && (
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {day.detail}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
