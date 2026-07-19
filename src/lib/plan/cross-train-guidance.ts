import type { CrossTrainCategory, CrossTraining } from "@/lib/plan-types";
import type {
  OnboardingAnswers,
  OnboardingNiggleArea,
  OnboardingSetback,
  OnboardingTimeOffReason,
} from "@/lib/tools/onboarding";
import type { TrainingPlan } from "@/lib/plans";

export type CrossTrainSuggestion = {
  category: CrossTrainCategory;
  title: string;
  /** Why this helps the runner's situation */
  why: string;
  /** How to do it (keep short for UI + PDF) */
  how: string;
};

const BY_NIGGLE: Record<OnboardingNiggleArea, CrossTrainSuggestion[]> = {
  knee: [
    {
      category: "cycling",
      title: "Easy bike spin",
      why: "Builds aerobic fitness with less knee impact than another run.",
      how: "15–25 min low resistance, conversational effort. Stop if the knee pinches.",
    },
    {
      category: "bodyweight",
      title: "Hip & glute stability",
      why: "Stronger hips often reduce load the knee has to manage alone.",
      how: "Glute bridges 3×12 · Clamshells 2×15/side · Side-lying leg lifts 2×12/side.",
    },
    {
      category: "yoga",
      title: "Quad & hip flexor ease",
      why: "Tight fronts of the hips can pull on the knee tracking line.",
      how: "Low lunge 1 min/side · Figure-4 stretch 2 min/side · Gentle quad stretch standing.",
    },
  ],
  shin: [
    {
      category: "walking",
      title: "Flat recovery walk",
      why: "Keeps blood moving without the pounding that irritates shin tissue.",
      how: "20–30 min easy flat walk. Skip hills and speed.",
    },
    {
      category: "bodyweight",
      title: "Calf & foot strength",
      why: "Stronger calves and feet share load with the shin during landing.",
      how: "Calf raises 3×15 · Toe walks 2×20 steps · Ankle circles 10 each way.",
    },
    {
      category: "cycling",
      title: "Seated easy spin",
      why: "Cardio without repetitive shin impact.",
      how: "15–20 min easy bike. Prefer seated over standing climbs.",
    },
  ],
  "foot-ankle": [
    {
      category: "cycling",
      title: "Low-impact cardio",
      why: "Maintains fitness while the foot/ankle gets quieter loading.",
      how: "15–25 min easy bike or elliptical if available.",
    },
    {
      category: "bodyweight",
      title: "Foot intrinsic work",
      why: "Small foot muscles support the arch and ankle control.",
      how: "Towel scrunches 2×20 · Short-foot holds 3×10 sec · Calf stretch at wall 1 min/side.",
    },
    {
      category: "yoga",
      title: "Gentle lower-leg mobility",
      why: "Easing stiff calves and ankles can reduce pull into the foot.",
      how: "Downward dog 1 min · Seated ankle rolls · Soft calf stretch — no forcing.",
    },
  ],
  hip: [
    {
      category: "yoga",
      title: "Hip opener flow",
      why: "Mobility around the hip can reduce side-hip irritation from stiff tissues.",
      how: "Pigeon 2 min/side · Figure-4 2 min/side · Gentle side-lying stretch.",
    },
    {
      category: "bodyweight",
      title: "Glute med + core",
      why: "Lateral hip strength helps control pelvic drop that stresses the outer hip.",
      how: "Side planks 3×20–30 sec · Clamshells 3×15 · Bird-dog 3×8/side.",
    },
    {
      category: "walking",
      title: "Easy walk on soft ground",
      why: "Movement without aggressive hills keeps hips warm and calm.",
      how: "20–30 min flat walk; avoid long downhill stretches.",
    },
  ],
  "calf-achilles": [
    {
      category: "cycling",
      title: "Easy spin (seated)",
      why: "Cardio with less Achilles stretch-load than hills or speedwork.",
      how: "15–25 min seated easy spin. Avoid standing sprints.",
    },
    {
      category: "bodyweight",
      title: "Isometric calf holds",
      why: "Light isometric loading is often better tolerated than bouncing calf work.",
      how: "Double-leg calf raise hold mid-range 3×20–30 sec. Pain-free only.",
    },
    {
      category: "walking",
      title: "Flat walk",
      why: "Keeps tissue circulating without aggressive dorsiflexion hills.",
      how: "20 min flat easy walk. Skip steep downhills.",
    },
  ],
  other: [
    {
      category: "walking",
      title: "Easy recovery walk",
      why: "Gentle movement supports habit without stacking more impact.",
      how: "20–30 min conversational walk on flat ground.",
    },
    {
      category: "yoga",
      title: "Full-body ease",
      why: "Light mobility reduces overall stiffness while you rebuild.",
      how: "10–15 min easy flow: Cat-Cow, Child's Pose, gentle twists.",
    },
    {
      category: "cycling",
      title: "Optional easy bike",
      why: "Backup cardio if walking still aggravates the area.",
      how: "15–20 min very easy spin only if pain-free.",
    },
  ],
};

const BY_TIME_OFF_REASON: Record<OnboardingTimeOffReason, CrossTrainSuggestion[]> = {
  life: [
    {
      category: "walking",
      title: "Habit walks",
      why: "Rebuilds consistency with almost no recovery cost.",
      how: "20–30 min easy walk on non-run days.",
    },
    {
      category: "bodyweight",
      title: "Simple strength",
      why: "A little strength protects the comeback as mileage returns.",
      how: "Squats 2×12 · Glute bridges 2×12 · Plank 2×20–30 sec.",
    },
  ],
  illness: [
    {
      category: "walking",
      title: "Return-to-move walks",
      why: "After illness, easy walking is usually safer than rushing back to intensity.",
      how: "15–25 min flat walk only when fever-free and breathing feels normal.",
    },
    {
      category: "yoga",
      title: "Breath-led mobility",
      why: "Gentle movement without crushing your recovery budget.",
      how: "10 min easy stretches; stop if dizzy or wiped out.",
    },
  ],
  injury: [
    {
      category: "cycling",
      title: "Low-impact cardio",
      why: "Maintains fitness while impact stays lower than running.",
      how: "15–25 min easy bike if the injured area stays quiet.",
    },
    {
      category: "bodyweight",
      title: "Supported strength",
      why: "Keeps supporting muscles online without repeating the injury load.",
      how: "Pain-free glute bridges, side planks, and calf raises as tolerated.",
    },
  ],
  other: [
    {
      category: "walking",
      title: "Easy walk",
      why: "Simple movement rebuilds the show-up habit.",
      how: "20–30 min easy walk.",
    },
    {
      category: "yoga",
      title: "Light mobility",
      why: "Loosens stiffness from time away without a hard session.",
      how: "10–15 min gentle flow.",
    },
  ],
};

const DEFAULT_PLAN_CROSS_TRAIN: CrossTrainSuggestion[] = [
  {
    category: "yoga",
    title: "Recovery mobility",
    why: "Eases stiffness so easy runs feel smoother the next day.",
    how: "10–20 min hips, calves, and gentle twists.",
  },
  {
    category: "bodyweight",
    title: "Runner strength basics",
    why: "Hips, calves, and core help you absorb landing forces better.",
    how: "Glute bridges, calf raises, bird-dogs, and a short plank.",
  },
  {
    category: "cycling",
    title: "Easy aerobic filler",
    why: "Adds fitness on non-run days without stacking impact.",
    how: "15–30 min conversational bike or elliptical.",
  },
];

function uniqueByTitle(items: CrossTrainSuggestion[]): CrossTrainSuggestion[] {
  const seen = new Set<string>();
  const out: CrossTrainSuggestion[] = [];
  for (const item of items) {
    if (seen.has(item.title)) continue;
    seen.add(item.title);
    out.push(item);
  }
  return out;
}

/** Tailored cross-training from Start Here health answers. */
export function getCrossTrainGuidanceForAnswers(
  answers: Pick<
    OnboardingAnswers,
    "setback" | "niggleArea" | "niggleSeverity" | "timeOffReason" | "timeOffDuration"
  >
): CrossTrainSuggestion[] {
  const picked: CrossTrainSuggestion[] = [];

  if (answers.setback === "niggle" && answers.niggleArea) {
    picked.push(...BY_NIGGLE[answers.niggleArea]);
  }

  if (answers.setback === "time-off" && answers.timeOffReason) {
    picked.push(...BY_TIME_OFF_REASON[answers.timeOffReason]);
  }

  if (picked.length === 0) {
    return DEFAULT_PLAN_CROSS_TRAIN;
  }

  return uniqueByTitle(picked).slice(0, 3);
}

/** Default cross-train guidance when browsing a plan directly. */
export function getDefaultCrossTrainGuidance(): CrossTrainSuggestion[] {
  return DEFAULT_PLAN_CROSS_TRAIN;
}

export function healthFocusLabel(
  setback: OnboardingSetback | undefined,
  niggleArea?: OnboardingNiggleArea,
  timeOffReason?: OnboardingTimeOffReason
): string | null {
  if (setback === "niggle" && niggleArea) {
    const labels: Record<OnboardingNiggleArea, string> = {
      knee: "knee comfort",
      shin: "shin comfort",
      "foot-ankle": "foot/ankle comfort",
      hip: "hip comfort",
      "calf-achilles": "calf/Achilles comfort",
      other: "easing a lingering niggle",
    };
    return labels[niggleArea];
  }
  if (setback === "time-off") {
    if (timeOffReason === "illness") return "returning after illness";
    if (timeOffReason === "injury") return "returning after injury time off";
    return "rebuilding after time off";
  }
  return null;
}

/** Default “why this plan” copy when opening a plan without the quiz. */
export function getDefaultPlanRationale(plan: TrainingPlan): string {
  return `${plan.name} (${plan.duration}) is a structured ${plan.runsPerWeek}-run-per-week build. ${plan.description} Cross-training days keep fitness moving without stacking more impact.`;
}

/**
 * Prepend tailored health cross-training onto a scheduled CT day
 * so the plan UI reflects injury/time-off guidance.
 */
export function applyHealthCrossTrain(
  crossTraining: CrossTraining,
  suggestions: CrossTrainSuggestion[]
): CrossTraining {
  if (suggestions.length === 0) return crossTraining;

  const tailored = suggestions.map((s) => ({
    category: s.category,
    title: s.title,
    details: `${s.how} — ${s.why}`,
  }));

  const seen = new Set(tailored.map((a) => a.title.toLowerCase()));
  const rest = crossTraining.activities.filter(
    (a) => !seen.has(a.title.toLowerCase())
  );

  return {
    ...crossTraining,
    focus: `${crossTraining.focus} Prioritize the first options if you’re managing a niggle or comeback.`,
    activities: [...tailored, ...rest].slice(0, 5),
  };
}
