import { Check, Flame } from "lucide-react";

const workouts = [
  { day: "Mon", name: "Easy Does It", detail: "Walk–jog · ~25 min" },
  { day: "Wed", name: "Shuffle Club", detail: "Walk–jog · ~25 min" },
  { day: "Sat", name: "Weekend Wander", detail: "Easy long · ~30 min" },
];

/** CSS-animated preview of checking off a week — no video asset required. */
export function PlanCheckoffDemo() {
  return (
    <figure className="plan-demo mx-auto w-full max-w-lg">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm font-semibold">Week 1 · Couch to 5K</p>
            <p className="text-xs text-muted-foreground">Tap the circle after each run</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-1 text-orange-600 dark:text-orange-400">
            <Flame className="size-3.5" aria-hidden />
            <span className="relative inline-block h-4 w-3 text-center text-xs font-bold tabular-nums">
              <span className="plan-demo-streak plan-demo-streak-0">0</span>
              <span className="plan-demo-streak plan-demo-streak-1">1</span>
              <span className="plan-demo-streak plan-demo-streak-2">2</span>
              <span className="plan-demo-streak plan-demo-streak-3">3</span>
            </span>
            <span className="text-xs font-medium">streak</span>
          </div>
        </div>

        <div className="px-4 pt-4 sm:px-5">
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>This week</span>
            <span className="relative inline-block h-4 w-8 text-right font-semibold tabular-nums text-foreground">
              <span className="plan-demo-count plan-demo-count-0">0/3</span>
              <span className="plan-demo-count plan-demo-count-1">1/3</span>
              <span className="plan-demo-count plan-demo-count-2">2/3</span>
              <span className="plan-demo-count plan-demo-count-3">3/3</span>
            </span>
          </div>
          <div
            className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted"
            aria-hidden
          >
            <div className="plan-demo-progress h-full rounded-full bg-primary" />
          </div>
        </div>

        <ul className="space-y-2 px-4 pb-4 sm:px-5">
          {workouts.map((workout, index) => (
            <li
              key={workout.name}
              className={`plan-demo-row plan-demo-row-${index + 1} flex items-center gap-3 rounded-xl border border-border/60 bg-background px-3 py-2.5`}
            >
              <span
                className="plan-demo-check flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-border"
                aria-hidden
              >
                <Check className="size-4" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium">
                  <span className="text-muted-foreground">{workout.day}</span>
                  {" · "}
                  {workout.name}
                </p>
                <p className="text-xs text-muted-foreground">{workout.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Your plan lives in the browser — check a workout, watch the streak grow.
      </figcaption>
    </figure>
  );
}
