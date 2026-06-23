export interface Workout {
  id: string;
  day: number;
  title: string;
  description: string;
  duration: string;
  intervals: string;
}

export interface Week {
  week: number;
  title: string;
  focus: string;
  workouts: Workout[];
}

export const PLAN: Week[] = [
  {
    week: 1,
    title: "Getting Moving",
    focus: "Build the habit with short walk-run intervals",
    workouts: [
      {
        id: "w1d1",
        day: 1,
        title: "Workout 1",
        description: "Alternate walking and light jogging. Keep the pace conversational.",
        duration: "~25 min",
        intervals: "Walk 5 min warm-up → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
      {
        id: "w1d2",
        day: 2,
        title: "Workout 2",
        description: "Same structure as Day 1. Consistency beats intensity.",
        duration: "~25 min",
        intervals: "Walk 5 min warm-up → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
      {
        id: "w1d3",
        day: 3,
        title: "Workout 3",
        description: "Third run of the week. You're building a routine.",
        duration: "~25 min",
        intervals: "Walk 5 min warm-up → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
    ],
  },
  {
    week: 2,
    title: "Finding Your Rhythm",
    focus: "Slightly longer jog intervals",
    workouts: [
      {
        id: "w2d1",
        day: 1,
        title: "Workout 1",
        description: "Jog intervals increase to 90 seconds.",
        duration: "~28 min",
        intervals: "Walk 5 min warm-up → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
      {
        id: "w2d2",
        day: 2,
        title: "Workout 2",
        description: "Focus on relaxed breathing during jogs.",
        duration: "~28 min",
        intervals: "Walk 5 min warm-up → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
      {
        id: "w2d3",
        day: 3,
        title: "Workout 3",
        description: "Two weeks in — you're doing great.",
        duration: "~28 min",
        intervals: "Walk 5 min warm-up → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
    ],
  },
  {
    week: 3,
    title: "Building Endurance",
    focus: "2-minute jog intervals",
    workouts: [
      {
        id: "w3d1",
        day: 1,
        title: "Workout 1",
        description: "Jog for 2 minutes, walk for 2 minutes.",
        duration: "~30 min",
        intervals: "Walk 5 min warm-up → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
      {
        id: "w3d2",
        day: 2,
        title: "Workout 2",
        description: "Keep your jog pace slow enough to recover during walks.",
        duration: "~30 min",
        intervals: "Walk 5 min warm-up → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
      {
        id: "w3d3",
        day: 3,
        title: "Workout 3",
        description: "Halfway through the week — stay steady.",
        duration: "~30 min",
        intervals: "Walk 5 min warm-up → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min cool-down",
      },
    ],
  },
  {
    week: 4,
    title: "Pushing Further",
    focus: "3-minute jog intervals",
    workouts: [
      {
        id: "w4d1",
        day: 1,
        title: "Workout 1",
        description: "Three minutes of jogging at a time.",
        duration: "~32 min",
        intervals: "Walk 5 min warm-up → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min cool-down",
      },
      {
        id: "w4d2",
        day: 2,
        title: "Workout 2",
        description: "Use walk breaks to reset, not to quit.",
        duration: "~32 min",
        intervals: "Walk 5 min warm-up → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min cool-down",
      },
      {
        id: "w4d3",
        day: 3,
        title: "Workout 3",
        description: "One month in — celebrate that.",
        duration: "~32 min",
        intervals: "Walk 5 min warm-up → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min cool-down",
      },
    ],
  },
  {
    week: 5,
    title: "Longer Stretches",
    focus: "5-minute jog intervals",
    workouts: [
      {
        id: "w5d1",
        day: 1,
        title: "Workout 1",
        description: "Five minutes of continuous jogging.",
        duration: "~35 min",
        intervals: "Walk 5 min warm-up → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min cool-down",
      },
      {
        id: "w5d2",
        day: 2,
        title: "Workout 2",
        description: "You're running more than you're walking now.",
        duration: "~35 min",
        intervals: "Walk 5 min warm-up → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min cool-down",
      },
      {
        id: "w5d3",
        day: 3,
        title: "Workout 3",
        description: "Trust the process — your body is adapting.",
        duration: "~35 min",
        intervals: "Walk 5 min warm-up → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min cool-down",
      },
    ],
  },
  {
    week: 6,
    title: "Almost There",
    focus: "8-minute jog intervals",
    workouts: [
      {
        id: "w6d1",
        day: 1,
        title: "Workout 1",
        description: "Eight minutes of jogging — you've come so far.",
        duration: "~38 min",
        intervals: "Walk 5 min warm-up → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min cool-down",
      },
      {
        id: "w6d2",
        day: 2,
        title: "Workout 2",
        description: "Stay patient on tired days. Rest matters.",
        duration: "~38 min",
        intervals: "Walk 5 min warm-up → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min cool-down",
      },
      {
        id: "w6d3",
        day: 3,
        title: "Workout 3",
        description: "Two more weeks until your 5K-ready self.",
        duration: "~38 min",
        intervals: "Walk 5 min warm-up → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min cool-down",
      },
    ],
  },
  {
    week: 7,
    title: "The Home Stretch",
    focus: "20-minute continuous runs",
    workouts: [
      {
        id: "w7d1",
        day: 1,
        title: "Workout 1",
        description: "Twenty minutes of running. You are a runner.",
        duration: "~30 min",
        intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down",
      },
      {
        id: "w7d2",
        day: 2,
        title: "Workout 2",
        description: "Find a comfortable, sustainable pace.",
        duration: "~30 min",
        intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down",
      },
      {
        id: "w7d3",
        day: 3,
        title: "Workout 3",
        description: "One week left. You've got this.",
        duration: "~30 min",
        intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down",
      },
    ],
  },
  {
    week: 8,
    title: "5K Ready",
    focus: "Run your first 5K distance",
    workouts: [
      {
        id: "w8d1",
        day: 1,
        title: "Workout 1",
        description: "25-minute run to build confidence.",
        duration: "~35 min",
        intervals: "Walk 5 min warm-up → Jog 25 min → Walk 5 min cool-down",
      },
      {
        id: "w8d2",
        day: 2,
        title: "Workout 2",
        description: "Easy run — save energy for the big day.",
        duration: "~30 min",
        intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down",
      },
      {
        id: "w8d3",
        day: 3,
        title: "Your 5K Run",
        description: "This is it. Run 5K (3.1 miles) at your own pace. Celebrate!",
        duration: "~35–45 min",
        intervals: "Walk 5 min warm-up → Run 5K at easy pace → Walk 5 min cool-down",
      },
    ],
  },
];

export const TOTAL_WORKOUTS = PLAN.reduce((sum, w) => sum + w.workouts.length, 0);
