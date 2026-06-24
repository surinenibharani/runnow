import { Badge } from "@/components/ui/badge";
import type { CrossTraining, CrossTrainCategory } from "@/lib/plan-types";
import { Bike, Dumbbell, Footprints, PersonStanding, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryMeta: Record<
  CrossTrainCategory,
  { label: string; icon: typeof Footprints; color: string }
> = {
  yoga: { label: "Yoga", icon: PersonStanding, color: "text-violet-500 bg-violet-500/10" },
  walking: { label: "Walking", icon: Footprints, color: "text-emerald-500 bg-emerald-500/10" },
  cycling: { label: "Cycling", icon: Bike, color: "text-sky-500 bg-sky-500/10" },
  weights: { label: "Weights", icon: Dumbbell, color: "text-amber-500 bg-amber-500/10" },
  bodyweight: { label: "Bodyweight", icon: Sparkles, color: "text-orange-500 bg-orange-500/10" },
};

export function CrossTrainingPreview({
  crossTraining,
}: {
  crossTraining: CrossTraining;
}) {
  return (
    <>
      {crossTraining.activities.map((activity) => {
        const meta = categoryMeta[activity.category];
        const Icon = meta.icon;
        return (
          <span
            key={`${activity.category}-${activity.title}`}
            className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-background/60 px-2 py-0.5 text-xs text-muted-foreground"
            title={activity.title}
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded",
                meta.color
              )}
            >
              <Icon className="size-2.5" />
            </span>
            <span className="font-medium text-foreground/80">{meta.label}</span>
            <span className="text-muted-foreground">·</span>
            <span className="truncate max-w-[8rem] sm:max-w-[12rem]">
              {activity.title}
            </span>
          </span>
        );
      })}
    </>
  );
}

export function CrossTrainingDetails({
  crossTraining,
  compact = false,
}: {
  crossTraining: CrossTraining;
  compact?: boolean;
}) {
  return (
    <div className={cn("space-y-3", compact && "space-y-2")}>
      <p className="text-sm text-muted-foreground">{crossTraining.focus}</p>
      <div className="space-y-3">
        {crossTraining.activities.map((activity) => {
          const meta = categoryMeta[activity.category];
          const Icon = meta.icon;
          return (
            <div
              key={`${activity.category}-${activity.title}`}
              className="rounded-lg border border-border/50 bg-background/50 p-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md",
                    meta.color
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
                <Badge variant="secondary" className="text-xs">
                  {meta.label}
                </Badge>
                <span className="text-sm font-medium">{activity.title}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                {activity.details}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
