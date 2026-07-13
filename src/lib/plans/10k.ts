import type { TrainingPlan } from "@/lib/plan-types";
import { buildWeek, runs } from "@/lib/plan-types";

const FAMILY = "10k";

type WeekDef = { title: string; focus: string; items: Parameters<typeof runs>[2] };

function build10kPlan(
  id: string,
  durationWeeks: number,
  duration: string,
  description: string,
  weekDefs: WeekDef[],
  prerequisite: string = "Comfortable completing a 5K or running ~30 minutes continuously"
): TrainingPlan {
  return {
    id,
    familyId: FAMILY,
    name: "10K",
    shortName: "10K",
    description,
    duration,
    durationWeeks,
    prerequisite,
    runsPerWeek: 3,
    weeks: weekDefs.map((w, i) =>
      buildWeek(id, i + 1, w.title, w.focus, runs(id, i + 1, w.items))
    ),
  };
}

/** Full 10-week build — gentlest ramp for runners whose longest run is still ~3 miles. */
const weeks10: WeekDef[] = [
  {
    title: "Settle In",
    focus: "Re-establish rhythm after a 5K base",
    items: [
      {
        day: 1,
        name: "Easy Opener",
        description: "Conversational pace. Leave ego at home.",
        duration: "~28 min",
        intervals: "2.5 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Midweek Mellow",
        description: "Same easy effort. Consistency over heroics.",
        duration: "~28 min",
        intervals: "2.5 mi easy",
        runType: "easy",
      },
      {
        day: 3,
        name: "Long & Loose",
        description: "First long run of the block — walk breaks fine.",
        duration: "~40 min",
        intervals: "3.5 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Find the Groove",
    focus: "Nudge the long run without rushing midweek",
    items: [
      {
        day: 1,
        name: "Steady Eddie",
        description: "Smooth and boring in the best way.",
        duration: "~30 min",
        intervals: "3 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Shakeout Shuffle",
        description: "Keep it light — save legs for the long day.",
        duration: "~28 min",
        intervals: "2.5 mi easy",
        runType: "recovery",
      },
      {
        day: 3,
        name: "Four-Mile Friday Energy",
        description: "Long run climbs to ~4 miles.",
        duration: "~45 min",
        intervals: "4 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Add a Little Spark",
    focus: "Short strides after an easy warm-up",
    items: [
      {
        day: 1,
        name: "Cruise Control",
        description: "Easy miles only.",
        duration: "~32 min",
        intervals: "3 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Stride Sampler",
        description: "Practice smooth turnover — not sprinting.",
        duration: "~35 min",
        intervals:
          "1.5 mi easy → 4 × 20 sec relaxed strides / 90 sec walk → 1 mi easy",
        runType: "interval",
      },
      {
        day: 3,
        name: "Four-and-a-Half Freedom",
        description: "Long run keeps growing.",
        duration: "~50 min",
        intervals: "4.5 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Halfway Habit",
    focus: "Long run near 5 miles — still easy",
    items: [
      {
        day: 1,
        name: "Talk-Test Tuesday",
        description: "You should finish wanting a little more.",
        duration: "~35 min",
        intervals: "3.5 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Recovery Ramble",
        description: "Very easy. Hydrate and sleep well.",
        duration: "~28 min",
        intervals: "2.5 mi recovery",
        runType: "recovery",
      },
      {
        day: 3,
        name: "Five Alive",
        description: "First ~5-mile long run of the plan.",
        duration: "~55 min",
        intervals: "5 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Steady Strength",
    focus: "Gentle continuous effort midweek",
    items: [
      {
        day: 1,
        name: "Easy Does It",
        description: "Protect the legs for the long run.",
        duration: "~35 min",
        intervals: "3.5 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Steady State Taste",
        description: "Slightly quicker than easy — still conversational in short phrases.",
        duration: "~38 min",
        intervals: "1 mi warm-up → 12 min steady → 1 mi cool-down",
        runType: "tempo",
      },
      {
        day: 3,
        name: "Five-and-a-Half Club",
        description: "Long run approaches race distance.",
        duration: "~60 min",
        intervals: "5.5 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Close the Gap",
    focus: "Long run hits ~6 miles",
    items: [
      {
        day: 1,
        name: "Mileage Maintenance",
        description: "Easy and honest.",
        duration: "~35 min",
        intervals: "3.5 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Hill Hints (Optional Flat Alt)",
        description: "Short hills or flat pickups — keep form tall.",
        duration: "~38 min",
        intervals:
          "1 mi warm-up → 6 × 45 sec uphill easy-brisk / walk down → 1 mi cool-down",
        runType: "tempo",
      },
      {
        day: 3,
        name: "Six-Mile Smile",
        description: "You're basically race-ready on distance.",
        duration: "~65 min",
        intervals: "6 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Confidence Peak",
    focus: "One more solid long run before taper",
    items: [
      {
        day: 1,
        name: "Keep It Kind",
        description: "Shorter easy run — don't bank extra miles.",
        duration: "~32 min",
        intervals: "3 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Light Legs",
        description: "Shakeout effort only.",
        duration: "~25 min",
        intervals: "2 mi very easy",
        runType: "recovery",
      },
      {
        day: 3,
        name: "Dress Rehearsal Distance",
        description: "6–6.5 miles easy — race breakfast optional practice.",
        duration: "~70 min",
        intervals: "6.5 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Slight Cutback",
    focus: "Volume down, freshness up",
    items: [
      {
        day: 1,
        name: "Easy Cruise",
        description: "Feel snappy, not tired.",
        duration: "~30 min",
        intervals: "3 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Stride Reminder",
        description: "A few strides so legs remember quick feet.",
        duration: "~30 min",
        intervals:
          "1.5 mi easy → 3 × 20 sec strides / 90 sec walk → 1 mi easy",
        runType: "interval",
      },
      {
        day: 3,
        name: "Medium Long",
        description: "Shorter than peak — still honest aerobic work.",
        duration: "~50 min",
        intervals: "5 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Taper Buffer",
    focus: "Volume down one more week before race week",
    items: [
      {
        day: 1,
        name: "Short & Sweet",
        description: "Easy jog. Trust the work already done.",
        duration: "~25 min",
        intervals: "2.5 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Stride Reminder Lite",
        description: "A few strides so legs remember quick feet.",
        duration: "~28 min",
        intervals:
          "1.5 mi easy → 3 × 20 sec strides / 90 sec walk → 1 mi easy",
        runType: "interval",
      },
      {
        day: 3,
        name: "Medium Long",
        description: "Honest aerobic work — not a peak long run.",
        duration: "~48 min",
        intervals: "4.5 mi easy",
        runType: "long",
      },
    ],
  },
  {
    title: "Race Week",
    focus: "Show up rested and ready",
    items: [
      {
        day: 1,
        name: "Final Easy Miles",
        description: "Keep it conversational.",
        duration: "~22 min",
        intervals: "2 mi easy",
        runType: "easy",
      },
      {
        day: 2,
        name: "Shakeout Special",
        description: "Very short — loosen, don't train.",
        duration: "~20 min",
        intervals: "1.5–2 mi very easy + 2 relaxed strides",
        runType: "recovery",
      },
      {
        day: 3,
        name: "The 10K Coronation",
        description: "Pin the bib. Start boring. Celebrate the finish.",
        duration: "~50–75 min",
        intervals: "6.2 mi race (10K)",
        runType: "race",
      },
    ],
  },
];

/** Default 8-week plan — skip the gentlest opener; end on race week. */
const weeks8Indices = [1, 2, 3, 4, 5, 6, 7, 9];

/** Accelerated 6-week plan for runners already near 4–5 mile long runs. */
const weeks6Indices = [2, 3, 4, 5, 6, 9];
export const plan10k10w = build10kPlan(
  "10k-10w",
  10,
  "10 weeks",
  "A gentler 10K build if your longest run is still around 3 miles — more buffer before race day.",
  weeks10
);

export const plan10k8w = build10kPlan(
  "10k-8w",
  8,
  "8 weeks",
  "The default first-10K path after a 5K — grow the long run toward 6.2 miles with three runs a week.",
  weeks8Indices.map((i) => weeks10[i])
);

export const plan10k6w = build10kPlan(
  "10k-6w",
  6,
  "6 weeks",
  "A shorter 10K peak if you already run 4–5 miles comfortably and have a nearby race date.",
  weeks6Indices.map((i) => weeks10[i]),
  "Comfortable running 4–5 miles; recent 5K finish preferred"
);

export const plans10k = [plan10k6w, plan10k8w, plan10k10w];
