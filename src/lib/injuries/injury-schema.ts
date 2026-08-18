import type { BlogFaqItem } from "@/lib/blog/types";

export type InjuryGuideLike = {
  title: string;
  symptoms: string;
  avoid: string[];
  fix: string[];
  seeSpecialist: string[];
};

const HOW_TO_STEP_NAMES = [
  "Ease the load",
  "Calm the tissue",
  "Rebuild strength",
  "Return slowly",
];

export function injuryGuideFaqs(injury: InjuryGuideLike): BlogFaqItem[] {
  return [
    {
      question: `What does ${injury.title} feel like for runners?`,
      answer: injury.symptoms,
    },
    {
      question: `How do runners usually start recovering from ${injury.title.toLowerCase()}?`,
      answer: injury.fix.slice(0, 3).join(" "),
    },
    {
      question: `When should I see a specialist for ${injury.title.toLowerCase()}?`,
      answer:
        injury.seeSpecialist[0] ??
        "Get checked if pain is sharp, worsening, or changing how you walk.",
    },
  ];
}

export function injuryGuideHowTo(injury: InjuryGuideLike): {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
} {
  return {
    name: `What to do about ${injury.title.toLowerCase()} as a runner`,
    description: injury.symptoms,
    steps: injury.fix.slice(0, 4).map((text, index) => ({
      name: HOW_TO_STEP_NAMES[index] ?? `Step ${index + 1}`,
      text,
    })),
  };
}

/** Unique intro copy for common-injury detail pages (hub cards stay short). */
export const commonInjuryOverviews: Record<string, string[]> = {
  "shin-splints": [
    "Shin splints (often medial tibial stress syndrome) are the classic beginner tax: new volume, hard surfaces, and shoes that should have been retired. The pain usually runs along a strip of the inner shin, worse at the start of a run or the day after a jump in mileage.",
    "The important split is diffuse shin ache versus one pinpoint hot spot on the bone. A strip that eases with rest and a slower build is a load problem. A single tender point, night pain, or a limp belongs with a clinician before you 'train through it.' This page is education, not a diagnosis.",
  ],
  "runners-knee": [
    "Runner's knee (patellofemoral pain) is a dull kneecap ache that hates stairs, sitting, and sudden hills more than it hates an easy flat jog. Beginners meet it when they add speed, downhills, and extra days in the same week — not because running 'ruins knees.'",
    "Hips and quads that cannot control the femur often show up as kneecap noise. Cutting hills and volume while you build side-hip strength is the usual first move. Locking, giving way, or swelling after ordinary easy runs is a different conversation.",
  ],
  "it-band-syndrome": [
    "IT band syndrome lights up the outside of the knee (sometimes the hip) on downhills, cambered roads, and 'just one more long run.' The band itself is not a muscle you foam-roll into submission — the usual gap is hip control and a volume spike on the same side of the road every day.",
    "Cross-training that does not hammer that outside-knee angle, plus glute medius work, beats another week of 'it'll warm up.' Numbness, shooting pain down the leg, or a niggle that returns every time you add distance needs a gait and hip check, not a harder roller.",
  ],
  "plantar-fasciitis": [
    "Plantar fasciitis is the first-step-in-the-morning heel stab that makes beginners think they broke something overnight. Tight calves, a sudden jump into faster sessions, and hard floors in unsupportive slippers are frequent co-stars.",
    "Loading and calf flexibility help more than heroic rest on the couch for months — but recovery is slow. If you cannot walk normally, or stretching for weeks does nothing, a podiatrist or physio should look at foot mechanics before you stack another speed day.",
  ],
  "achilles-tendinitis": [
    "Achilles pain that is stiff at the start of a run or the first steps out of bed is a tendon-load problem. Speed, hills, and dead shoes in the same block are how beginners pick it up. A loud pop, sudden inability to rise on the toes, or a tendon that looks deformed is an emergency, not a foam-roll night.",
    "You rebuild this with careful loading, not with stretching the tendon aggressively while you keep hammering. Flat easy walking that stays calm for a week is the green light to jog — not a calendar date you invented.",
  ],
  "stress-fractures": [
    "A stress fracture is a bone that has been loaded faster than it can remodel. The pain is picky: one spot, worse as you go, sometimes aching at rest or at night. Shin 'splints' that shrink to a fingerprint of bone tenderness are a stop-running signal, not a tougher warmup.",
    "Under-fueling, rapid mileage jumps, and ignored rest days raise the odds. Do not jog on a suspected stress fracture to 'keep fitness.' Imaging and a plan for time off — often weeks to months — come first. Educational only; this is a medical workup, not a blog DIY.",
  ],
};
