import type {
  CrossTraining,
  RunType,
  ScheduleDay,
  ScheduledWeek,
  TrainingPlan,
  WeekTemplate,
  Workout,
} from "@/lib/plan-types";
import { DAY_NAMES } from "@/lib/plan-types";

export interface SchedulePreferences {
  restDay: number;
  longRunDay: number;
}

export const DEFAULT_SCHEDULE: SchedulePreferences = {
  restDay: 7,
  longRunDay: 6,
};

export function isValidSchedule(prefs: SchedulePreferences): boolean {
  return (
    prefs.restDay >= 1 &&
    prefs.restDay <= 7 &&
    prefs.longRunDay >= 1 &&
    prefs.longRunDay <= 7 &&
    prefs.restDay !== prefs.longRunDay
  );
}

export function applyScheduleToPlan(
  plan: TrainingPlan,
  prefs: SchedulePreferences
): TrainingPlan & { scheduledWeeks: ScheduledWeek[] } {
  const schedule = isValidSchedule(prefs) ? prefs : DEFAULT_SCHEDULE;

  return {
    ...plan,
    scheduledWeeks: plan.weeks.map((week) =>
      scheduleWeek(plan.id, week, schedule)
    ),
  };
}

function scheduleWeek(
  planId: string,
  week: WeekTemplate,
  prefs: SchedulePreferences
): ScheduledWeek {
  const { restDay, longRunDay } = prefs;
  const activeDays = DAY_NAMES.map((_, i) => i + 1).filter((d) => d !== restDay);
  const runDays = pickRunDays(activeDays, longRunDay, week.runs.length);
  const runAssignment = assignRunsToDays(week.runs, runDays, longRunDay);

  const runDaySet = new Set(runDays);
  const nextRunTypeByDay = buildNextRunLookup(runDays, runAssignment);

  const days: ScheduleDay[] = [];
  let lastRunType: RunType | null = null;

  for (let dow = 1; dow <= 7; dow++) {
    const dayName = DAY_NAMES[dow - 1];

    if (dow === restDay) {
      days.push({
        id: `${planId}-w${week.week}d${dow}-rest`,
        dayOfWeek: dow,
        dayName,
        kind: "rest",
      });
      continue;
    }

    const run = runAssignment.get(dow);
    if (run) {
      days.push({
        id: `${run.id}-d${dow}`,
        dayOfWeek: dow,
        dayName,
        kind: "run",
        run,
      });
      lastRunType = run.runType;
      continue;
    }

    const nextRunType = nextRunTypeByDay.get(dow) ?? null;
    const context =
      nextRunType === "long" || nextRunType === "race"
        ? "pre-long"
        : lastRunType
          ? "day-after"
          : "mid-week";

    days.push({
      id: `${planId}-w${week.week}d${dow}-ct`,
      dayOfWeek: dow,
      dayName,
      kind: "cross-train",
      crossTraining: buildCrossTraining(
        planId,
        week.week,
        dow,
        lastRunType ?? "easy",
        context,
        nextRunType
      ),
    });
  }

  return {
    week: week.week,
    title: week.title,
    focus: week.focus,
    days,
  };
}

function pickRunDays(
  activeDays: number[],
  longRunDay: number,
  runCount: number
): number[] {
  const others = activeDays.filter((d) => d !== longRunDay);
  const nonLongCount = runCount - 1;

  if (nonLongCount <= 0) return [longRunDay];

  const nonLongDays = pickEvenlySpaced(others, nonLongCount);
  return [...nonLongDays, longRunDay].sort((a, b) => a - b);
}

function pickEvenlySpaced(days: number[], count: number): number[] {
  if (count <= 0) return [];
  if (count >= days.length) return [...days];

  const picked: number[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor((i * days.length) / count);
    picked.push(days[idx]);
  }
  return [...new Set(picked)];
}

function getLongRun(runs: Workout[]): Workout {
  return (
    runs.find((r) => r.runType === "race") ??
    runs.find((r) => r.runType === "long") ??
    runs[runs.length - 1]
  );
}

function assignRunsToDays(
  runs: Workout[],
  runDays: number[],
  longRunDay: number
) {
  const longRun = getLongRun(runs);
  const otherRuns = runs.filter((r) => r.id !== longRun.id);
  const nonLongRunDays = runDays.filter((d) => d !== longRunDay).sort((a, b) => a - b);

  const assignment = new Map<number, Workout>();
  nonLongRunDays.forEach((day, i) => {
    if (otherRuns[i]) assignment.set(day, otherRuns[i]);
  });
  assignment.set(longRunDay, longRun);
  return assignment;
}

function buildNextRunLookup(
  runDays: number[],
  assignment: Map<number, Workout>
) {
  const lookup = new Map<number, RunType>();
  const sortedRunDays = [...runDays].sort((a, b) => a - b);

  for (let dow = 1; dow <= 7; dow++) {
    const nextRunDay = sortedRunDays.find((d) => d > dow);
    if (nextRunDay) {
      lookup.set(dow, assignment.get(nextRunDay)!.runType);
    }
  }
  return lookup;
}

function buildCrossTraining(
  planId: string,
  week: number,
  day: number,
  previousRunType: RunType,
  context: "day-after" | "pre-long" | "mid-week",
  nextRunType: RunType | null
): CrossTraining {
  const { name, focus, duration, activities } = getCrossTrainingContent(
    previousRunType,
    context,
    nextRunType
  );

  return {
    id: `${planId}-w${week}d${day}-ct`,
    name,
    focus,
    duration,
    activities,
  };
}

function getCrossTrainingContent(
  previousRunType: RunType,
  context: "day-after" | "pre-long" | "mid-week",
  nextRunType: RunType | null
): Omit<CrossTraining, "id"> {
  if (context === "pre-long") {
    return {
      name: "Long Run Eve Prep",
      focus: "Loosen hips and calves without tiring your legs",
      duration: "25–35 min",
      activities: [
        {
          category: "yoga",
          title: "Hip opener flow",
          details:
            "Downward Dog (1 min) → Low Lunge (1 min each side) → Pigeon Pose (2 min each side) → Calf stretch at wall (1 min each leg)",
        },
        {
          category: "walking",
          title: "Easy shakeout walk",
          details: "15–20 min flat walk, relaxed pace — no hills",
        },
        {
          category: "bodyweight",
          title: "Activation only",
          details:
            "Glute bridges (2 × 12) → Clamshells (2 × 15 each side) → Ankle circles (10 each direction)",
        },
      ],
    };
  }

  const templates: Record<RunType, Omit<CrossTraining, "id">> = {
    "walk-run": {
      name: "Walk-Run Recovery Mix",
      focus: "Ease soreness from walk-run intervals and build base strength",
      duration: "30–40 min",
      activities: [
        {
          category: "yoga",
          title: "Beginner recovery flow",
          details:
            "Cat-Cow (10 reps) → Downward Dog (1 min) → Puppy Pose (1 min) → Reclined Pigeon (2 min each side) → Child's Pose (2 min)",
        },
        {
          category: "walking",
          title: "Active recovery walk",
          details: "20–30 min easy walk on flat ground — keep heart rate low",
        },
        {
          category: "bodyweight",
          title: "Runner foundation circuit",
          details:
            "Bird-Dog (3 × 10 each side) → Glute bridges (3 × 15) → Standing calf raises (3 × 15) → Side-lying leg lifts (2 × 12 each side)",
        },
      ],
    },
    easy: {
      name: "Easy Day Recharge",
      focus: "Flush easy-run fatigue and reinforce hip stability",
      duration: "30–45 min",
      activities: [
        {
          category: "yoga",
          title: "Hip & hamstring release",
          details:
            "Standing Forward Fold (1 min) → Half Split (1 min each side) → Figure-4 stretch (2 min each side) → Supine Twist (1 min each side)",
        },
        {
          category: "cycling",
          title: "Easy spin",
          details:
            "20–25 min low-resistance cycling or stationary bike — conversational effort",
        },
        {
          category: "bodyweight",
          title: "Stability circuit",
          details:
            "Single-leg glute bridge (3 × 10 each) → Plank (3 × 30 sec) → Reverse lunges (2 × 10 each) → Dead bug (3 × 8 each side)",
        },
      ],
    },
    tempo: {
      name: "Tempo Day Cool-Down Protocol",
      focus: "Calm taxed legs after harder effort and restore range of motion",
      duration: "35–45 min",
      activities: [
        {
          category: "yoga",
          title: "Post-tempo restore",
          details:
            "Legs Up the Wall (5 min) → Reclined Butterfly (2 min) → Seated Forward Fold (2 min) → Sphinx Pose (1 min) → Corpse Pose (5 min)",
        },
        {
          category: "walking",
          title: "Gentle flush walk",
          details:
            "15–20 min very easy walk — helps clear lactate without adding stress",
        },
        {
          category: "cycling",
          title: "Recovery ride",
          details: "20 min easy cycling, high cadence, minimal resistance",
        },
      ],
    },
    interval: {
      name: "Speed Work Recovery Lab",
      focus: "Repair after fast reps — prioritize mobility over strength",
      duration: "30–40 min",
      activities: [
        {
          category: "yoga",
          title: "Fast-leg release",
          details:
            "Downward Dog with calf pedaling (1 min) → Low Lunge with quad stretch (1 min each) → Pigeon Pose (2 min each) → Happy Baby (2 min)",
        },
        {
          category: "walking",
          title: "Easy walk",
          details:
            "15–20 min flat walk, focus on relaxed shoulders and arm swing",
        },
        {
          category: "bodyweight",
          title: "Light mobility only",
          details:
            "Hip circles (10 each direction) → Ankle alphabet (each foot) → World's greatest stretch (5 each side) — no jumping",
        },
      ],
    },
    recovery: {
      name: "Recovery Run Companion",
      focus: "Support yesterday's shakeout run with low-impact strength",
      duration: "25–35 min",
      activities: [
        {
          category: "yoga",
          title: "Gentle mobility",
          details:
            "Cat-Cow (10 reps) → Thread the Needle (1 min each side) → Reclined Spinal Twist (1 min each side)",
        },
        {
          category: "walking",
          title: "Coffee walk",
          details: "20–25 min easy walk — optional, skip if legs feel heavy",
        },
        {
          category: "weights",
          title: "Light dumbbell strength",
          details:
            "Goblet squat (2 × 10, light) → Dumbbell RDL (2 × 10) → Farmer carry (2 × 30 sec) — keep weight easy",
        },
      ],
    },
    long: {
      name: "Long Run Recovery Station",
      focus: "Rebuild after long miles — stretch, walk, and restore",
      duration: "40–50 min",
      activities: [
        {
          category: "yoga",
          title: "Post-long run deep stretch",
          details:
            "Legs Up the Wall (5–8 min) → Pigeon Pose (3 min each side) → Seated Hamstring Stretch (2 min each) → Child's Pose (3 min) → Corpse Pose (5 min)",
        },
        {
          category: "walking",
          title: "Optional easy walk",
          details: "10–15 min only if stiff — otherwise skip and rest",
        },
        {
          category: "bodyweight",
          title: "Gentle activation",
          details:
            "Clamshells (2 × 15 each) → Glute bridges (2 × 15) → Toe towel scrunches (2 × 20) — no squats or lunges today",
        },
      ],
    },
    race: {
      name: "Race Day Recovery Ritual",
      focus: "Celebrate and recover — mobility only for the next 48 hours",
      duration: "20–30 min",
      activities: [
        {
          category: "yoga",
          title: "Victory stretch",
          details:
            "Legs Up the Wall (10 min) → Supine Twist (2 min each side) → Child's Pose (3 min) → Corpse Pose (5 min)",
        },
        {
          category: "walking",
          title: "Gentle celebration walk",
          details: "10–15 min easy walk the day after — flat ground only",
        },
      ],
    },
  };

  const base = templates[previousRunType];

  if (context === "mid-week" && nextRunType === "tempo") {
    return {
      name: "Pre-Tempo Primer",
      focus: "Activate glutes and core before tomorrow's harder effort",
      duration: "25–30 min",
      activities: [
        {
          category: "bodyweight",
          title: "Activation circuit",
          details:
            "Glute bridges (2 × 15) → Clamshells (2 × 15 each) → Walking lunges (2 × 8 each) → Plank (2 × 30 sec)",
        },
        {
          category: "yoga",
          title: "Dynamic warm-up poses",
          details:
            "Sun Salutation A (3 rounds, easy) → Warrior II (30 sec each side) → Triangle Pose (30 sec each side)",
        },
        {
          category: "cycling",
          title: "Optional easy spin",
          details: "15 min easy cycling if legs feel flat — skip if tired",
        },
      ],
    };
  }

  if (previousRunType === "easy" && context === "day-after") {
    return {
      ...base,
      activities: [
        ...base.activities,
        {
          category: "weights",
          title: "Runner strength (moderate)",
          details:
            "Dumbbell step-ups (3 × 8 each leg) → Single-leg RDL (3 × 8 each) → Dumbbell row (3 × 10 each) → Calf raises (3 × 15)",
        },
      ],
    };
  }

  return base;
}
