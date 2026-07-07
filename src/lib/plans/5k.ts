import type { TrainingPlan } from "@/lib/plan-types";
import { buildWeek, runs } from "@/lib/plan-types";

const FAMILY = "5k";

function build5kPlan(
  id: string,
  durationWeeks: number,
  duration: string,
  description: string,
  weekBuilders: Array<{
    title: string;
    focus: string;
    items: Parameters<typeof runs>[2];
  }>,
  prerequisite: string = "No experience needed"
): TrainingPlan {
  return {
    id,
    familyId: FAMILY,
    name: "Couch to 5K",
    shortName: "5K",
    description,
    duration,
    durationWeeks,
    prerequisite,
    runsPerWeek: 3,
    weeks: weekBuilders.map((w, i) =>
      buildWeek(id, i + 1, w.title, w.focus, runs(id, i + 1, w.items))
    ),
  };
}

const week8 = [
  { title: "Getting Moving", focus: "Build the habit with short walk-run intervals", items: [
    { day: 1, name: "Lace-Up Lightning", description: "Alternate walking and light jogging.", duration: "~25 min", intervals: "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 2, name: "Sneaker Creeper", description: "Same structure. Consistency beats intensity.", duration: "~25 min", intervals: "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 3, name: "The Triple Threat", description: "Third run of the week. Building a routine.", duration: "~25 min", intervals: "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
  ]},
  { title: "Finding Your Rhythm", focus: "Slightly longer jog intervals", items: [
    { day: 1, name: "Rhythm & Blues (Legs Edition)", description: "Jog intervals increase to 90 seconds.", duration: "~28 min", intervals: "Walk 5 min → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 2, name: "Breathless in a Good Way", description: "Focus on relaxed breathing.", duration: "~28 min", intervals: "Walk 5 min → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 3, name: "Two-Week Tuesday Energy", description: "Two weeks in — you're doing great.", duration: "~28 min", intervals: "Walk 5 min → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
  ]},
  { title: "Building Endurance", focus: "2-minute jog intervals", items: [
    { day: 1, name: "Double Trouble Trot", description: "Jog 2 min, walk 2 min.", duration: "~30 min", intervals: "Walk 5 min → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 2, name: "Walk Break Waltz", description: "Keep jog pace slow enough to recover.", duration: "~30 min", intervals: "Walk 5 min → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 3, name: "Midweek Moxie", description: "Stay steady through the week.", duration: "~30 min", intervals: "Walk 5 min → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
  ]},
  { title: "Pushing Further", focus: "3-minute jog intervals", items: [
    { day: 1, name: "Three's Company (Minutes)", description: "Three minutes of jogging at a time.", duration: "~32 min", intervals: "Walk 5 min → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min", runType: "walk-run" as const },
    { day: 2, name: "Reset Button Ramble", description: "Walk breaks reset you, not defeat you.", duration: "~32 min", intervals: "Walk 5 min → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min", runType: "walk-run" as const },
    { day: 3, name: "One Month Milestone Mosey", description: "One month in — celebrate that.", duration: "~32 min", intervals: "Walk 5 min → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min", runType: "walk-run" as const },
  ]},
  { title: "Longer Stretches", focus: "5-minute jog intervals", items: [
    { day: 1, name: "High Five Hustle", description: "Five minutes of continuous jogging.", duration: "~35 min", intervals: "Walk 5 min → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min", runType: "easy" as const },
    { day: 2, name: "More Jog Than Walk Miracle", description: "Running more than walking now.", duration: "~35 min", intervals: "Walk 5 min → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min", runType: "easy" as const },
    { day: 3, name: "Trust Fall Trot", description: "Trust the process.", duration: "~35 min", intervals: "Walk 5 min → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min", runType: "easy" as const },
  ]},
  { title: "Almost There", focus: "8-minute jog intervals", items: [
    { day: 1, name: "Eight Minute Empire", description: "Eight minutes of jogging.", duration: "~38 min", intervals: "Walk 5 min → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min", runType: "easy" as const },
    { day: 2, name: "Patience Pays Off Plod", description: "Rest days matter.", duration: "~38 min", intervals: "Walk 5 min → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min", runType: "easy" as const },
    { day: 3, name: "Almost Famous Amble", description: "Two more weeks to 5K-ready.", duration: "~38 min", intervals: "Walk 5 min → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min", runType: "easy" as const },
  ]},
  { title: "The Home Stretch", focus: "20-minute continuous runs", items: [
    { day: 1, name: "Twenty Minute Legend", description: "Twenty minutes of running.", duration: "~30 min", intervals: "Walk 5 min → Jog 20 min → Walk 5 min", runType: "easy" as const },
    { day: 2, name: "Comfort Zone Cruise", description: "Find a sustainable pace.", duration: "~30 min", intervals: "Walk 5 min → Jog 20 min → Walk 5 min", runType: "easy" as const },
    { day: 3, name: "One Week Wonder", description: "One week left.", duration: "~30 min", intervals: "Walk 5 min → Jog 20 min → Walk 5 min", runType: "easy" as const },
  ]},
  { title: "5K Ready", focus: "Run your first 5K distance", items: [
    { day: 1, name: "Confidence Booster", description: "25-minute run to build confidence.", duration: "~35 min", intervals: "Walk 5 min → Jog 25 min → Walk 5 min", runType: "easy" as const },
    { day: 2, name: "Easy Does It Express", description: "Easy run — save energy for race day.", duration: "~30 min", intervals: "Walk 5 min → Jog 20 min → Walk 5 min", runType: "recovery" as const },
    { day: 3, name: "The 5K Coronation", description: "Run 5K at your own pace. Celebrate!", duration: "~35–45 min", intervals: "Walk 5 min → Run 5K easy → Walk 5 min", runType: "race" as const },
  ]},
];

const week4 = [
  { title: "Fast Start", focus: "Accelerated walk-run to build quickly", items: [
    { day: 1, name: "Zero to Hero Warm-Up", description: "Get moving with short jogs.", duration: "~25 min", intervals: "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 2, name: "Speed Bump Stroll", description: "Same intervals, stronger mindset.", duration: "~25 min", intervals: "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 3, name: "Week One Wrap Party", description: "Three down — habit forming.", duration: "~25 min", intervals: "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
  ]},
  { title: "Interval Ignition", focus: "2–3 minute jog blocks", items: [
    { day: 1, name: "Double Time Trot", description: "2-minute jog intervals.", duration: "~30 min", intervals: "Walk 5 min → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min", runType: "walk-run" as const },
    { day: 2, name: "Triple Threat Thursday", description: "Add a third minute on some reps.", duration: "~32 min", intervals: "Walk 5 min → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min", runType: "walk-run" as const },
    { day: 3, name: "Halfway Hustle", description: "Halfway through the plan.", duration: "~32 min", intervals: "Walk 5 min → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min", runType: "walk-run" as const },
  ]},
  { title: "Continuous Courage", focus: "Longer continuous jogs", items: [
    { day: 1, name: "Five Alive", description: "Five-minute jog blocks.", duration: "~35 min", intervals: "Walk 5 min → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min", runType: "easy" as const },
    { day: 2, name: "Ten Minute Tenderizer", description: "Two 8-min jogs back to back.", duration: "~38 min", intervals: "Walk 5 min → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min", runType: "easy" as const },
    { day: 3, name: "Twenty Minute Thunder", description: "First continuous 20-minute run.", duration: "~30 min", intervals: "Walk 5 min → Jog 20 min → Walk 5 min", runType: "easy" as const },
  ]},
  { title: "5K Sprint Finish", focus: "Race week", items: [
    { day: 1, name: "Dress Rehearsal Dash", description: "25-minute confidence run.", duration: "~35 min", intervals: "Walk 5 min → Jog 25 min → Walk 5 min", runType: "easy" as const },
    { day: 2, name: "Taper Tapper", description: "Short easy jog before race day.", duration: "~25 min", intervals: "Walk 5 min → Jog 15 min → Walk 5 min", runType: "recovery" as const },
    { day: 3, name: "The 5K Coronation", description: "Race day! Run 5K and celebrate.", duration: "~35–45 min", intervals: "Walk 5 min → Run 5K easy → Walk 5 min", runType: "race" as const },
  ]},
];

const week6Indices = [0, 1, 2, 3, 5, 7];

export const plan5k8w = build5kPlan(
  "5k-8w",
  8,
  "8 weeks",
  "The classic couch-to-5K path with gradual walk-run progressions.",
  week8
);

export const plan5k6w = build5kPlan(
  "5k-6w",
  6,
  "6 weeks",
  "A slightly accelerated 5K plan — ideal if you're active but new to running.",
  week6Indices.map((i) => week8[i])
);

export const plan5k4w = build5kPlan(
  "5k-4w",
  4,
  "4 weeks",
  "An aggressive 4-week 5K plan for those who are already active. True beginners should use the 8-week plan to lower injury risk.",
  week4,
  "Already active (walking 30+ min or light exercise most days)"
);

export const plans5k = [plan5k4w, plan5k6w, plan5k8w];
