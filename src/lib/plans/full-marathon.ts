import type { TrainingPlan } from "@/lib/plan-types";
import { buildWeek, runs } from "@/lib/plan-types";

const FAMILY = "full-marathon";

type WeekDef = { title: string; focus: string; items: Parameters<typeof runs>[2] };

function buildFullPlan(
  id: string,
  durationWeeks: number,
  duration: string,
  description: string,
  weekDefs: WeekDef[]
): TrainingPlan {
  return {
    id,
    familyId: FAMILY,
    name: "Full Marathon",
    shortName: "Marathon",
    description,
    duration,
    durationWeeks,
    prerequisite: "Completed a half marathon or comfortable running 10+ miles",
    runsPerWeek: 4,
    weeks: weekDefs.map((w, i) =>
      buildWeek(id, i + 1, w.title, w.focus, runs(id, i + 1, w.items))
    ),
  };
}

const baseWeeks16: WeekDef[] = [
  { title: "Extended Base — Week 1", focus: "Gentle re-entry for a longer build", items: [
    { day: 1, name: "Slow Burn Sunday Start", description: "Easy effort to open a 16-week journey.", duration: "~38 min", intervals: "4.5 mi easy", runType: "easy" },
    { day: 2, name: "Tempo Taste Test", description: "Light tempo introduction.", duration: "~38 min", intervals: "1 mi warm-up → 10 min tempo → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Recovery Rodeo Jr.", description: "Easy shakeout miles.", duration: "~28 min", intervals: "2.5 mi recovery", runType: "recovery" },
    { day: 4, name: "Eight Is Enough", description: "8-mile long run to start the extended base.", duration: "~80 min", intervals: "8 mi easy", runType: "long" },
  ]},
  { title: "Extended Base — Week 2", focus: "Build aerobic capacity before peak volume", items: [
    { day: 1, name: "Monday Mileage Mellow", description: "Steady easy miles.", duration: "~40 min", intervals: "5 mi easy", runType: "easy" },
    { day: 2, name: "Fartlek First Date", description: "Play with pace.", duration: "~42 min", intervals: "1 mi warm-up → 20 min fartlek → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Cloud Walker Shuffle", description: "Float through recovery.", duration: "~30 min", intervals: "3 mi easy", runType: "recovery" },
    { day: 4, name: "Nine Lives Preview", description: "9-mile long run.", duration: "~90 min", intervals: "9 mi easy", runType: "long" },
  ]},
];

const weeks14: WeekDef[] = [
  { title: "Marathon Mission Begins", focus: "Settle into four runs per week", items: [
    { day: 1, name: "Monday Mileage Motivator", description: "Marathon training is a marathon, not a sprint.", duration: "~40 min", intervals: "5 mi easy", runType: "easy" },
    { day: 2, name: "Tempo Teaser", description: "Gentle sustained faster running.", duration: "~42 min", intervals: "1 mi warm-up → 15 min tempo → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Recovery Rodeo", description: "Ride easy.", duration: "~30 min", intervals: "3 mi recovery pace", runType: "recovery" },
    { day: 4, name: "Double Digit Debut", description: "10 miles. Your marathon story starts here.", duration: "~100 min", intervals: "10 mi easy", runType: "long" },
  ]},
  { title: "Building the Engine", focus: "Long run stretches to 11 miles", items: [
    { day: 1, name: "Steady State Stew", description: "Low and slow wins.", duration: "~42 min", intervals: "5 mi easy", runType: "easy" },
    { day: 2, name: "Fartlek Friday Energy", description: "Play with pace.", duration: "~45 min", intervals: "1 mi warm-up → 25 min fartlek → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Cloud Nine Shuffle", description: "Float through recovery.", duration: "~32 min", intervals: "3.5 mi easy", runType: "recovery" },
    { day: 4, name: "Eleven & Divine", description: "11 miles of confidence.", duration: "~110 min", intervals: "11 mi easy", runType: "long" },
  ]},
  { title: "Volume Rises", focus: "12-mile long run", items: [
    { day: 1, name: "Workweek Warm-Up", description: "Ease into the block.", duration: "~45 min", intervals: "5.5 mi easy", runType: "easy" },
    { day: 2, name: "Hill Thrill Drill", description: "Build strength.", duration: "~45 min", intervals: "1 mi warm-up → 8 × 60 sec hill / jog down → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Snooze Button Shuffle", description: "Almost too easy.", duration: "~30 min", intervals: "3 mi recovery", runType: "recovery" },
    { day: 4, name: "The Dozen Derby", description: "12 miles.", duration: "~120 min", intervals: "12 mi easy", runType: "long" },
  ]},
  { title: "Finding Marathon Pace", focus: "Goal marathon pace segments", items: [
    { day: 1, name: "Maintenance Miles", description: "Keep the engine humming.", duration: "~45 min", intervals: "5.5 mi easy", runType: "easy" },
    { day: 2, name: "Marathon Pace Meet-Cute", description: "Meet your race pace.", duration: "~48 min", intervals: "1 mi warm-up → 3 mi at goal marathon pace → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Pillow Talk Jog", description: "Thank your legs.", duration: "~32 min", intervals: "3.5 mi recovery", runType: "recovery" },
    { day: 4, name: "Thirteen Unlucky (For Doubt)", description: "13 miles.", duration: "~130 min", intervals: "13 mi easy", runType: "long" },
  ]},
  { title: "The Long Climb", focus: "14-mile long run", items: [
    { day: 1, name: "Rhythm & Resilience", description: "Steady effort builds grit.", duration: "~48 min", intervals: "6 mi easy", runType: "easy" },
    { day: 2, name: "Tempo Tornado (Round 2)", description: "25 min at half-marathon effort.", duration: "~50 min", intervals: "1 mi warm-up → 25 min tempo → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Marshmallow Monday Jr.", description: "Soft miles.", duration: "~35 min", intervals: "4 mi easy", runType: "recovery" },
    { day: 4, name: "Fourteen & Thriving", description: "14 miles.", duration: "~140 min", intervals: "14 mi easy", runType: "long" },
  ]},
  { title: "Mid-Training Summit", focus: "15-mile mental breakthrough", items: [
    { day: 1, name: "Checkpoint Cruise", description: "Halfway through training.", duration: "~48 min", intervals: "6 mi easy", runType: "easy" },
    { day: 2, name: "Speed Limit Test", description: "Short fast intervals.", duration: "~42 min", intervals: "1 mi warm-up → 10 × 400m fast / 400m jog → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Spa Day Shuffle", description: "Recovery at its finest.", duration: "~35 min", intervals: "4 mi recovery", runType: "recovery" },
    { day: 4, name: "Fifteen & Alive", description: "15 miles.", duration: "~150 min", intervals: "15 mi easy", runType: "long" },
  ]},
  { title: "Peak Volume Approaches", focus: "16-mile long run", items: [
    { day: 1, name: "Grit & Grind Easy", description: "Show up.", duration: "~50 min", intervals: "6 mi easy", runType: "easy" },
    { day: 2, name: "Marathon Pace Reunion", description: "5 miles at goal marathon pace.", duration: "~52 min", intervals: "1 mi warm-up → 5 mi at goal marathon pace → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Ghost Miles Glide", description: "Maximum recovery.", duration: "~35 min", intervals: "4 mi recovery", runType: "recovery" },
    { day: 4, name: "Sweet Sixteen Saunter", description: "16 miles.", duration: "~160 min", intervals: "16 mi easy", runType: "long" },
  ]},
  { title: "The Big Build", focus: "17-mile long run", items: [
    { day: 1, name: "Momentum Monday", description: "Carry weekend confidence forward.", duration: "~50 min", intervals: "6 mi easy", runType: "easy" },
    { day: 2, name: "Surge Protector", description: "Tempo surges.", duration: "~48 min", intervals: "1 mi warm-up → 4 × 5 min brisk / 2 min easy → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Velvet Recovery", description: "Smooth and restorative.", duration: "~35 min", intervals: "4 mi easy", runType: "recovery" },
    { day: 4, name: "Lucky Seventeen Lap", description: "17 miles.", duration: "~170 min", intervals: "17 mi easy", runType: "long" },
  ]},
  { title: "Approaching Peak", focus: "18-mile long run", items: [
    { day: 1, name: "Calm Confidence Cruise", description: "Trust the training.", duration: "~52 min", intervals: "6.5 mi easy", runType: "easy" },
    { day: 2, name: "Race Simulation Lite", description: "6 miles at marathon pace.", duration: "~55 min", intervals: "2 mi warm-up → 6 mi at goal marathon pace → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Blanket Burrito Jog", description: "Easy miles only.", duration: "~35 min", intervals: "4 mi recovery", runType: "recovery" },
    { day: 4, name: "Eighteen & Elevated", description: "18 miles.", duration: "~180 min", intervals: "18 mi easy", runType: "long" },
  ]},
  { title: "Peak Week", focus: "20-mile benchmark long run", items: [
    { day: 1, name: "Pre-Peak Pep", description: "Easy miles before the crown jewel.", duration: "~48 min", intervals: "6 mi easy", runType: "easy" },
    { day: 2, name: "Tempo Torch", description: "30 min tempo.", duration: "~55 min", intervals: "1 mi warm-up → 30 min tempo → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Restful Rambler", description: "Bank energy for Sunday.", duration: "~30 min", intervals: "3 mi very easy", runType: "recovery" },
    { day: 4, name: "The Big Two-Oh", description: "20 miles!", duration: "~200 min", intervals: "20 mi easy", runType: "long" },
  ]},
  { title: "Coming Down the Mountain", focus: "14-mile maintenance long run", items: [
    { day: 1, name: "Taper Tingle", description: "That's the taper talking.", duration: "~48 min", intervals: "6 mi easy", runType: "easy" },
    { day: 2, name: "Leg Brighteners", description: "Short fast reps.", duration: "~38 min", intervals: "1 mi warm-up → 8 × 30 sec fast / 90 sec easy → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Feather Float", description: "Effortless recovery.", duration: "~32 min", intervals: "3.5 mi easy", runType: "recovery" },
    { day: 4, name: "Fourteen Farewell", description: "14 miles.", duration: "~140 min", intervals: "14 mi easy", runType: "long" },
  ]},
  { title: "Taper Deepens", focus: "10-mile tune-up", items: [
    { day: 1, name: "Antsy Energy Express", description: "Channel restlessness.", duration: "~42 min", intervals: "5 mi easy", runType: "easy" },
    { day: 2, name: "Marathon Pace Flashback", description: "3 miles at race pace.", duration: "~42 min", intervals: "1 mi warm-up → 3 mi at goal marathon pace → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Zen Recovery Zone", description: "Maximum recovery.", duration: "~28 min", intervals: "3 mi recovery", runType: "recovery" },
    { day: 4, name: "Ten Miles of Trust", description: "Trust your training.", duration: "~100 min", intervals: "10 mi easy", runType: "long" },
  ]},
  { title: "Race Week Minus One", focus: "Final long-ish run", items: [
    { day: 1, name: "Penultimate Pep Jog", description: "Almost there.", duration: "~38 min", intervals: "4 mi easy with 4 × 20 sec strides", runType: "easy" },
    { day: 2, name: "Spark Plug Session", description: "Keep legs awake.", duration: "~30 min", intervals: "1 mi warm-up → 4 × 1 min brisk / 2 min easy → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Cloud Walker", description: "Gentle shakeout.", duration: "~25 min", intervals: "2 mi very easy", runType: "recovery" },
    { day: 4, name: "The Almost-There Eight", description: "Last long effort before race week.", duration: "~80 min", intervals: "8 mi easy", runType: "long" },
  ]},
  { title: "Race Week", focus: "Rest, fuel, and run 26.2", items: [
    { day: 1, name: "Race Week Rambler", description: "Stay loose, stay calm.", duration: "~20 min", intervals: "2 mi easy with 4 × 20 sec strides", runType: "easy" },
    { day: 2, name: "Shakeout & Shine", description: "Check your race bag twice.", duration: "~15 min", intervals: "1 mi very easy", runType: "recovery" },
    { day: 3, name: "Rest Day Royalty (Deluxe)", description: "Feet up. Carbs in.", duration: "Rest", intervals: "Rest day — hydrate, carb-load", runType: "recovery" },
    { day: 4, name: "The 26.2 Victory Lap", description: "Marathon day! Finish legendary.", duration: "~4–5 hrs", intervals: "26.2 mi race", runType: "race" },
  ]},
];

const weeks12Indices = [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const peakWeek16: WeekDef = {
  title: "Extended Peak", focus: "22-mile long run for extra endurance",
  items: [
    { day: 1, name: "Pre-Peak Pep (Extended)", description: "Easy miles before the longest run.", duration: "~48 min", intervals: "6 mi easy", runType: "easy" },
    { day: 2, name: "Tempo Torch (Extended)", description: "30 min tempo.", duration: "~55 min", intervals: "1 mi warm-up → 30 min tempo → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Restful Rambler (Extended)", description: "Bank energy.", duration: "~30 min", intervals: "3 mi very easy", runType: "recovery" },
    { day: 4, name: "The Big Two-Two", description: "22 miles — extra confidence for race day.", duration: "~220 min", intervals: "22 mi easy", runType: "long" },
  ],
};

export const planFull14w = buildFullPlan(
  "full-14w",
  14,
  "14 weeks",
  "The standard marathon build with a 20-mile peak long run.",
  weeks14
);

export const planFull12w = buildFullPlan(
  "full-12w",
  12,
  "12 weeks",
  "A compressed marathon plan for experienced half marathoners.",
  weeks12Indices.map((i) => weeks14[i])
);

export const planFull16w = buildFullPlan(
  "full-16w",
  16,
  "16 weeks",
  "An extended marathon build with gentler base weeks and a 22-mile peak.",
  [
    ...baseWeeks16,
    ...weeks14.slice(0, 9),
    peakWeek16,
    ...weeks14.slice(10),
  ]
);

export const plansFull = [planFull12w, planFull14w, planFull16w];
