export type DumbbellWorkoutExercise = {
  number: number;
  id: string;
  name: string;
  prescription: string;
  menStartWeight: string;
  womenStartWeight: string;
  menWeek8Weight: string;
  womenWeek8Weight: string;
  position: string[];
};

export const DUMBBELL_WORKOUT_SHEET_SLUG = "full-body-dumbbell-workout-at-home";

export const dumbbellWorkoutExercises: DumbbellWorkoutExercise[] = [
  {
    number: 1,
    id: "goblet-squat",
    name: "Goblet squat",
    prescription: "3 × 15",
    menStartWeight: "15–25 lb (one bell)",
    womenStartWeight: "10–15 lb (one bell)",
    menWeek8Weight: "20–30 lb",
    womenWeek8Weight: "15–25 lb",
    position: [
      "Bell at chest, elbows inside knees",
      "Sit between hips — heels down",
      "Knees track over toes",
    ],
  },
  {
    number: 2,
    id: "rdl",
    name: "Romanian deadlift",
    prescription: "3 × 15",
    menStartWeight: "20–35 lb total",
    womenStartWeight: "10–15 lb total",
    menWeek8Weight: "25–35 lb total",
    womenWeek8Weight: "15–25 lb total",
    position: [
      "Soft knees, hips push back",
      "Flat back — bells skim thighs",
      "Feel hamstrings, not lower back",
    ],
  },
  {
    number: 3,
    id: "walking-lunge",
    name: "Walking lunges",
    prescription: "3 × 15 each leg",
    menStartWeight: "10–20 lb/hand",
    womenStartWeight: "5–8 lb/hand",
    menWeek8Weight: "15–20 lb/hand",
    womenWeek8Weight: "8–10 lb/hand",
    position: [
      "Torso tall, bells at sides",
      "Front knee over mid-foot",
      "Short controlled steps",
    ],
  },
  {
    number: 4,
    id: "bent-row",
    name: "Bent-over row",
    prescription: "3 × 15 each arm",
    menStartWeight: "15–25 lb/arm",
    womenStartWeight: "8–12 lb/arm",
    menWeek8Weight: "20–25 lb/arm",
    womenWeek8Weight: "12–15 lb/arm",
    position: [
      "Hinge ~45°, flat back",
      "Pull elbow to hip pocket",
      "Neck neutral",
    ],
  },
  {
    number: 5,
    id: "single-row",
    name: "Single-arm row",
    prescription: "3 × 15 each arm",
    menStartWeight: "15–25 lb/arm",
    womenStartWeight: "8–12 lb/arm",
    menWeek8Weight: "20–25 lb/arm",
    womenWeek8Weight: "12–15 lb/arm",
    position: [
      "Support hand on bench/knee",
      "Don't twist torso open",
      "Squeeze shoulder blade at top",
    ],
  },
  {
    number: 6,
    id: "floor-press",
    name: "Floor press",
    prescription: "3 × 15",
    menStartWeight: "10–20 lb/hand",
    womenStartWeight: "8–12 lb/hand",
    menWeek8Weight: "12–18 lb/hand",
    womenWeek8Weight: "10–12 lb/hand",
    position: [
      "Shoulders pinned to floor",
      "Elbows ~45° from ribs",
      "Press up — no bounce off floor",
    ],
  },
  {
    number: 7,
    id: "ohp",
    name: "Overhead press",
    prescription: "3 × 15",
    menStartWeight: "8–15 lb/hand",
    womenStartWeight: "5–8 lb/hand",
    menWeek8Weight: "10–15 lb/hand",
    womenWeek8Weight: "8–10 lb/hand",
    position: [
      "Core tight, glutes on",
      "Don't lean back",
      "Bell path close to face",
    ],
  },
  {
    number: 8,
    id: "hammer-curl",
    name: "Hammer curl",
    prescription: "3 × 15",
    menStartWeight: "10–15 lb",
    womenStartWeight: "5–8 lb",
    menWeek8Weight: "12–15 lb",
    womenWeek8Weight: "8 lb",
    position: [
      "Neutral grip",
      "Elbows pinned to sides",
      "No hip swing",
    ],
  },
  {
    number: 9,
    id: "tricep-ext",
    name: "Overhead tricep extension",
    prescription: "3 × 15",
    menStartWeight: "10–15 lb",
    womenStartWeight: "5–8 lb",
    menWeek8Weight: "12–15 lb",
    womenWeek8Weight: "8 lb",
    position: [
      "Elbows narrow, point up",
      "Only forearms move",
      "Keep ribs down",
    ],
  },
  {
    number: 10,
    id: "reverse-fly",
    name: "Reverse fly",
    prescription: "3 × 15",
    menStartWeight: "5–10 lb",
    womenStartWeight: "3–5 lb",
    menWeek8Weight: "8–10 lb",
    womenWeek8Weight: "5–8 lb",
    position: [
      "Slight hip hinge",
      "Soft elbows, open arms back",
      "Light weight, control",
    ],
  },
  {
    number: 11,
    id: "calf-raise",
    name: "Calf raise",
    prescription: "3 × 15",
    menStartWeight: "hold 15–25 lb",
    womenStartWeight: "hold 10–12 lb",
    menWeek8Weight: "20–25 lb",
    womenWeek8Weight: "15–20 lb",
    position: [
      "Stand tall, hold bells",
      "Pause 1 sec at top",
      "Lower slowly — no bounce",
    ],
  },
  {
    number: 12,
    id: "dead-bug",
    name: "Dead bug",
    prescription: "3 × 15 each side",
    menStartWeight: "bodyweight",
    womenStartWeight: "bodyweight",
    menWeek8Weight: "bodyweight",
    womenWeek8Weight: "bodyweight",
    position: [
      "Lower back glued to floor",
      "Opposite arm & leg move",
      "Slow — shorten range if back arches",
    ],
  },
  {
    number: 13,
    id: "farmer-carry",
    name: "Farmer carry",
    prescription: "3 × 15 steps each hand",
    menStartWeight: "15–25 lb/hand",
    womenStartWeight: "10–15 lb/hand",
    menWeek8Weight: "20–25 lb/hand",
    womenWeek8Weight: "15–20 lb/hand",
    position: [
      "Stand tall, shoulders packed",
      "Walk smooth steps",
      "Don't shrug bells up",
    ],
  },
];

export function dumbbellWorkoutPrintablePath(): string {
  return `/blog/${DUMBBELL_WORKOUT_SHEET_SLUG}/printable`;
}

export function dumbbellWorkoutSchedulePrintablePath(): string {
  return `/blog/${DUMBBELL_WORKOUT_SHEET_SLUG}/printable/schedule`;
}

export type DumbbellScheduleExample = {
  name: string;
  liftDays: string[];
  note: string;
};

export const dumbbellScheduleExamples: DumbbellScheduleExample[] = [
  {
    name: "Example A",
    liftDays: ["Tuesday", "Friday"],
    note: "Easy runs or rest on lift evenings",
  },
  {
    name: "Example B",
    liftDays: ["Monday", "Thursday"],
    note: "Long run Saturday · speed work Wednesday if your plan includes it",
  },
];

export const dumbbellScheduleRules: string[] = [
  "Same full-body workout (exercises 1–13) both lift days",
  "At least one rest day between lifts — no back-to-back strength days",
  "Never lift the day before a long run or interval session",
  "Lift after an easy run or on a rest day — protect run quality first",
  "Week 1 only: if very sore after session one, skip session two that week",
];

export type DumbbellSchedulePhase = {
  weeks: string;
  frequency: string;
  setsReps: string;
  weightFocus: string;
  finisher: string;
};

export const dumbbellSchedulePhases: DumbbellSchedulePhase[] = [
  {
    weeks: "1–2",
    frequency: "2× / week",
    setsReps: "2 × 15",
    weightFocus: "Learn form · light bells",
    finisher: "Skip",
  },
  {
    weeks: "3–4",
    frequency: "2× / week",
    setsReps: "3 × 15",
    weightFocus: "Same weight · add 3rd set",
    finisher: "Skip",
  },
  {
    weeks: "5–8",
    frequency: "2× / week",
    setsReps: "3 × 15",
    weightFocus: "Add 2.5–5 lb every 1–2 weeks (legs → rows → press)",
    finisher: "Week 7: one day · Week 8: both if recovered",
  },
  {
    weeks: "9–11",
    frequency: "2× / week",
    setsReps: "3 × 15",
    weightFocus: "Bump weight when both sessions hit 3×15 cleanly",
    finisher: "Optional both days if recovered",
  },
  {
    weeks: "12",
    frequency: "1× / week",
    setsReps: "2 × 15",
    weightFocus: "Deload — same or slightly lighter",
    finisher: "Skip",
  },
];

export const dumbbellScheduleProgressRule =
  "Golden rule: both lift sessions in the same week complete 3 × 15 with clean form → then add a little weight next week. Can't hit 15? Drop weight until 3×15 works.";

export const dumbbellWeeklyTrackerWeeks = 12;
