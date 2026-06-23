import type { TrainingPlan } from "@/lib/plan-types";
import { buildWeek } from "@/lib/plan-types";

const ID = "5k";

export const plan5k: TrainingPlan = {
  id: ID,
  name: "Couch to 5K",
  shortName: "5K",
  description: "From zero to your first 5K in 8 weeks with walk-run intervals.",
  duration: "8 weeks",
  prerequisite: "No experience needed",
  runsPerWeek: 3,
  weeks: [
    buildWeek(ID, 1, "Getting Moving", "Build the habit with short walk-run intervals", [
      { day: 1, name: "Lace-Up Lightning", description: "Alternate walking and light jogging. Keep the pace conversational.", duration: "~25 min", intervals: "Walk 5 min warm-up → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
      { day: 2, name: "Sneaker Creeper", description: "Same structure as Day 1. Consistency beats intensity.", duration: "~25 min", intervals: "Walk 5 min warm-up → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
      { day: 3, name: "The Triple Threat", description: "Third run of the week. You're building a routine.", duration: "~25 min", intervals: "Walk 5 min warm-up → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
    ]),
    buildWeek(ID, 2, "Finding Your Rhythm", "Slightly longer jog intervals", [
      { day: 1, name: "Rhythm & Blues (Legs Edition)", description: "Jog intervals increase to 90 seconds.", duration: "~28 min", intervals: "Walk 5 min warm-up → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
      { day: 2, name: "Breathless in a Good Way", description: "Focus on relaxed breathing during jogs.", duration: "~28 min", intervals: "Walk 5 min warm-up → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
      { day: 3, name: "Two-Week Tuesday Energy", description: "Two weeks in — you're doing great.", duration: "~28 min", intervals: "Walk 5 min warm-up → (Jog 1.5 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
    ]),
    buildWeek(ID, 3, "Building Endurance", "2-minute jog intervals", [
      { day: 1, name: "Double Trouble Trot", description: "Jog for 2 minutes, walk for 2 minutes.", duration: "~30 min", intervals: "Walk 5 min warm-up → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
      { day: 2, name: "Walk Break Waltz", description: "Keep your jog pace slow enough to recover during walks.", duration: "~30 min", intervals: "Walk 5 min warm-up → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
      { day: 3, name: "Midweek Moxie", description: "Halfway through the week — stay steady.", duration: "~30 min", intervals: "Walk 5 min warm-up → (Jog 2 min, Walk 2 min) × 5 → Walk 5 min cool-down" },
    ]),
    buildWeek(ID, 4, "Pushing Further", "3-minute jog intervals", [
      { day: 1, name: "Three's Company (Minutes)", description: "Three minutes of jogging at a time.", duration: "~32 min", intervals: "Walk 5 min warm-up → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min cool-down" },
      { day: 2, name: "Reset Button Ramble", description: "Use walk breaks to reset, not to quit.", duration: "~32 min", intervals: "Walk 5 min warm-up → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min cool-down" },
      { day: 3, name: "One Month Milestone Mosey", description: "One month in — celebrate that.", duration: "~32 min", intervals: "Walk 5 min warm-up → (Jog 3 min, Walk 2 min) × 4 → Walk 5 min cool-down" },
    ]),
    buildWeek(ID, 5, "Longer Stretches", "5-minute jog intervals", [
      { day: 1, name: "High Five Hustle", description: "Five minutes of continuous jogging.", duration: "~35 min", intervals: "Walk 5 min warm-up → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min cool-down" },
      { day: 2, name: "More Jog Than Walk Miracle", description: "You're running more than you're walking now.", duration: "~35 min", intervals: "Walk 5 min warm-up → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min cool-down" },
      { day: 3, name: "Trust Fall Trot", description: "Trust the process — your body is adapting.", duration: "~35 min", intervals: "Walk 5 min warm-up → (Jog 5 min, Walk 3 min) × 3 → Walk 5 min cool-down" },
    ]),
    buildWeek(ID, 6, "Almost There", "8-minute jog intervals", [
      { day: 1, name: "Eight Minute Empire", description: "Eight minutes of jogging — you've come so far.", duration: "~38 min", intervals: "Walk 5 min warm-up → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min cool-down" },
      { day: 2, name: "Patience Pays Off Plod", description: "Stay patient on tired days. Rest matters.", duration: "~38 min", intervals: "Walk 5 min warm-up → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min cool-down" },
      { day: 3, name: "Almost Famous Amble", description: "Two more weeks until your 5K-ready self.", duration: "~38 min", intervals: "Walk 5 min warm-up → (Jog 8 min, Walk 3 min) × 2 → Walk 5 min cool-down" },
    ]),
    buildWeek(ID, 7, "The Home Stretch", "20-minute continuous runs", [
      { day: 1, name: "Twenty Minute Legend", description: "Twenty minutes of running. You are a runner.", duration: "~30 min", intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down" },
      { day: 2, name: "Comfort Zone Cruise", description: "Find a comfortable, sustainable pace.", duration: "~30 min", intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down" },
      { day: 3, name: "One Week Wonder", description: "One week left. You've got this.", duration: "~30 min", intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down" },
    ]),
    buildWeek(ID, 8, "5K Ready", "Run your first 5K distance", [
      { day: 1, name: "Confidence Booster", description: "25-minute run to build confidence.", duration: "~35 min", intervals: "Walk 5 min warm-up → Jog 25 min → Walk 5 min cool-down" },
      { day: 2, name: "Easy Does It Express", description: "Easy run — save energy for the big day.", duration: "~30 min", intervals: "Walk 5 min warm-up → Jog 20 min → Walk 5 min cool-down" },
      { day: 3, name: "The 5K Coronation", description: "This is it. Run 5K (3.1 miles) at your own pace. Celebrate!", duration: "~35–45 min", intervals: "Walk 5 min warm-up → Run 5K at easy pace → Walk 5 min cool-down" },
    ]),
  ],
};
