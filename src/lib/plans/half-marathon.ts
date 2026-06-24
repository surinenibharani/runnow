import type { TrainingPlan } from "@/lib/plan-types";
import { buildWeek, runs } from "@/lib/plan-types";

const FAMILY = "half-marathon";

type WeekDef = { title: string; focus: string; items: Parameters<typeof runs>[2] };

function buildHalfPlan(
  id: string,
  durationWeeks: number,
  duration: string,
  description: string,
  weekDefs: WeekDef[]
): TrainingPlan {
  return {
    id,
    familyId: FAMILY,
    name: "Half Marathon",
    shortName: "Half",
    description,
    duration,
    durationWeeks,
    prerequisite: "Comfortable running 30 minutes continuously",
    runsPerWeek: 4,
    weeks: weekDefs.map((w, i) =>
      buildWeek(id, i + 1, w.title, w.focus, runs(id, i + 1, w.items))
    ),
  };
}

const weeks12: WeekDef[] = [
  { title: "Laying the Foundation", focus: "Establish your weekly rhythm with easy miles", items: [
    { day: 1, name: "Monday Mood Lifter", description: "Easy conversational pace.", duration: "~30 min", intervals: "3 mi easy run", runType: "easy" },
    { day: 2, name: "Tempo Tango (Gentle)", description: "Introduce slightly faster segments.", duration: "~35 min", intervals: "1 mi warm-up → 4 × 2 min brisk / 2 min easy → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Recovery Shuffle", description: "Shake out the legs.", duration: "~25 min", intervals: "2 mi very easy jog", runType: "recovery" },
    { day: 4, name: "The Long & Winding Road", description: "Your first long run.", duration: "~45 min", intervals: "4 mi easy", runType: "long" },
  ]},
  { title: "Finding Your Groove", focus: "Slightly longer runs", items: [
    { day: 1, name: "Espresso Easy Run", description: "Short and smooth.", duration: "~30 min", intervals: "3 mi easy", runType: "easy" },
    { day: 2, name: "Pick-Up Sticks", description: "Practice changing gears.", duration: "~38 min", intervals: "1 mi warm-up → 6 × 1 min fast / 2 min easy → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Pajama Pace Jog", description: "So easy you could nap.", duration: "~28 min", intervals: "2.5 mi recovery pace", runType: "recovery" },
    { day: 4, name: "Mile Marker Meditation", description: "Build mental stamina.", duration: "~50 min", intervals: "5 mi easy", runType: "long" },
  ]},
  { title: "Building the Base", focus: "Long run hits 6 miles", items: [
    { day: 1, name: "Steady Eddie Special", description: "Consistent, comfortable rhythm.", duration: "~32 min", intervals: "3.5 mi easy", runType: "easy" },
    { day: 2, name: "Fartlek Fiesta", description: "Unstructured speed play.", duration: "~40 min", intervals: "1 mi warm-up → 20 min fartlek → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Legs of Jelly Jog", description: "Active recovery.", duration: "~25 min", intervals: "2 mi easy", runType: "recovery" },
    { day: 4, name: "Six Miles & Smiles", description: "A real long run.", duration: "~60 min", intervals: "6 mi easy", runType: "long" },
  ]},
  { title: "Halfway to Half", focus: "Introduce tempo running", items: [
    { day: 1, name: "Coffee Run Classic", description: "Reward yourself afterward.", duration: "~35 min", intervals: "4 mi easy", runType: "easy" },
    { day: 2, name: "Tempo Tantrum (Controlled)", description: "Comfortably hard for 15 minutes.", duration: "~42 min", intervals: "1 mi warm-up → 15 min tempo → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Float Like a Recovery", description: "Absorb the week's work.", duration: "~28 min", intervals: "2.5 mi very easy", runType: "recovery" },
    { day: 4, name: "Lucky Number Seven", description: "7 miles. You're a distance runner.", duration: "~70 min", intervals: "7 mi easy", runType: "long" },
  ]},
  { title: "Climbing the Ladder", focus: "Long run reaches 8 miles", items: [
    { day: 1, name: "Maintenance Mode Miles", description: "Not too fast, not too slow.", duration: "~35 min", intervals: "4 mi easy", runType: "easy" },
    { day: 2, name: "Hill Hugger Intervals", description: "Power up, float down.", duration: "~40 min", intervals: "1 mi warm-up → 6 × 45 sec hill / walk down → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Sloth Speed Shuffle", description: "The slowest run of the week.", duration: "~25 min", intervals: "2 mi recovery", runType: "recovery" },
    { day: 4, name: "Great Eight Expedition", description: "Eight miles of becoming unstoppable.", duration: "~80 min", intervals: "8 mi easy", runType: "long" },
  ]},
  { title: "Mid-Plan Checkpoint", focus: "Assess how far you've come", items: [
    { day: 1, name: "Check-In Cruise", description: "Reflect on progress.", duration: "~38 min", intervals: "4.5 mi easy", runType: "easy" },
    { day: 2, name: "Speed Bump Session", description: "Short, sharp intervals.", duration: "~38 min", intervals: "1 mi warm-up → 8 × 400m fast / 400m jog → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Blanket Fort Recovery", description: "Cozy effort only.", duration: "~28 min", intervals: "2.5 mi easy", runType: "recovery" },
    { day: 4, name: "Nine Lives Long Run", description: "9 miles of grit.", duration: "~90 min", intervals: "9 mi easy", runType: "long" },
  ]},
  { title: "Entering the Build", focus: "Double-digit long run", items: [
    { day: 1, name: "Rhythm & Miles", description: "Pace you could hold for hours.", duration: "~40 min", intervals: "5 mi easy", runType: "easy" },
    { day: 2, name: "Tempo Tornado (Mild)", description: "20 min at half-marathon effort.", duration: "~45 min", intervals: "1 mi warm-up → 20 min tempo → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Ghost Pace Glide", description: "Light and quiet footsteps.", duration: "~30 min", intervals: "3 mi recovery", runType: "recovery" },
    { day: 4, name: "Double Digits Dance", description: "10 miles!", duration: "~100 min", intervals: "10 mi easy", runType: "long" },
  ]},
  { title: "Peak Building", focus: "Long run stretches to 11 miles", items: [
    { day: 1, name: "Workweek Warrior", description: "Shake off Monday.", duration: "~40 min", intervals: "5 mi easy", runType: "easy" },
    { day: 2, name: "Surge & Purge", description: "Surge the pace, purge the doubt.", duration: "~42 min", intervals: "1 mi warm-up → 5 × 3 min brisk / 2 min easy → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Marshmallow Miles", description: "Soft, forgiving pace.", duration: "~30 min", intervals: "3 mi recovery", runType: "recovery" },
    { day: 4, name: "Eleven Heaven", description: "11 miles. The half is within reach.", duration: "~110 min", intervals: "11 mi easy", runType: "long" },
  ]},
  { title: "The Peak Week", focus: "Longest training run at 12 miles", items: [
    { day: 1, name: "Calm Before the Storm", description: "Easy miles before the big effort.", duration: "~38 min", intervals: "4.5 mi easy", runType: "easy" },
    { day: 2, name: "Race Pace Rehearsal", description: "3 miles at goal race pace.", duration: "~45 min", intervals: "1 mi warm-up → 3 mi at goal race pace → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Pillow Soft Plod", description: "Rest the legs.", duration: "~25 min", intervals: "2 mi very easy", runType: "recovery" },
    { day: 4, name: "Dirty Dozen Derby", description: "12 miles — your longest run.", duration: "~120 min", intervals: "12 mi easy", runType: "long" },
  ]},
  { title: "Holding Steady", focus: "Maintain fitness", items: [
    { day: 1, name: "Status Quo Shuffle", description: "Same effort, same progress.", duration: "~38 min", intervals: "4.5 mi easy", runType: "easy" },
    { day: 2, name: "Sharp & Snappy", description: "Short tempo.", duration: "~40 min", intervals: "1 mi warm-up → 2 × 10 min tempo (3 min rest) → 1 mi cool-down", runType: "tempo" },
    { day: 3, name: "Zen Zone Jog", description: "Mindful miles.", duration: "~28 min", intervals: "2.5 mi recovery", runType: "recovery" },
    { day: 4, name: "Ten Miles of Triumph", description: "Still long, but you've done harder.", duration: "~100 min", intervals: "10 mi easy", runType: "long" },
  ]},
  { title: "Taper Begins", focus: "Reduce volume, keep the spark", items: [
    { day: 1, name: "Taper Tantrum Prevention", description: "Trust the taper.", duration: "~35 min", intervals: "4 mi easy", runType: "easy" },
    { day: 2, name: "Leg Sparklers", description: "Short fast bursts.", duration: "~32 min", intervals: "1 mi warm-up → 6 × 30 sec fast / 90 sec easy → 1 mi cool-down", runType: "interval" },
    { day: 3, name: "Featherweight Frolic", description: "Legs should feel springy.", duration: "~25 min", intervals: "2 mi easy", runType: "recovery" },
    { day: 4, name: "The Dress Rehearsal", description: "8 miles — practice race day.", duration: "~80 min", intervals: "8 mi easy", runType: "long" },
  ]},
  { title: "Race Week", focus: "Rest, trust, and conquer 13.1", items: [
    { day: 1, name: "Pre-Race Pep Jog", description: "Short and snappy.", duration: "~25 min", intervals: "2 mi easy with 4 × 20 sec strides", runType: "easy" },
    { day: 2, name: "Shakeout & Shoutout", description: "Loosen up.", duration: "~20 min", intervals: "1.5 mi very easy jog", runType: "recovery" },
    { day: 3, name: "Rest Day Royalty", description: "Full rest. Carb-load tonight.", duration: "Rest", intervals: "Rest day — hydrate, stretch, visualize", runType: "recovery" },
    { day: 4, name: "The Lucky 13.1 Coronation", description: "Race day! Start slow, finish proud.", duration: "~2–3 hrs", intervals: "13.1 mi race", runType: "race" },
  ]},
];

const weeks8Indices = [0, 2, 4, 6, 7, 8, 10, 11];

export const planHalf12w = buildHalfPlan(
  "half-12w",
  12,
  "12 weeks",
  "The full half marathon build — gradual mileage increase to 13.1 miles.",
  weeks12
);

export const planHalf8w = buildHalfPlan(
  "half-8w",
  8,
  "8 weeks",
  "An accelerated half marathon plan for runners with a solid 5K base.",
  weeks8Indices.map((i) => weeks12[i])
);

export const plansHalf = [planHalf8w, planHalf12w];
