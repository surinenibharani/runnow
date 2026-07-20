import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Bone,
  Footprints,
  HeartPulse,
  Shield,
} from "lucide-react";

export type CommonInjury = {
  slug: string;
  icon: LucideIcon;
  area: string;
  title: string;
  symptoms: string;
  avoid: string[];
  fix: string[];
  seeSpecialist: string[];
  /** Authoritative medical reference for this condition. */
  learnMore?: { label: string; href: string; publisher: string };
  /** Deep-dive blog guide on LetsRunNow. */
  relatedBlog?: { label: string; href: string };
};

export const commonInjuries: CommonInjury[] = [
  {
    slug: "shin-splints",
    icon: Footprints,
    area: "Lower leg",
    title: "Shin splints",
    symptoms:
      "Pain along the inner edge of your shinbone, often when you increase mileage or intensity too fast.",
    avoid: [
      "Increase weekly mileage by no more than 10% per week",
      "Run on softer surfaces when possible — avoid only concrete",
      "Replace worn shoes (every 300–500 miles)",
      "Strengthen calves and hips with heel raises and glute bridges",
    ],
    fix: [
      "Rest or cross-train (bike, swim) for 1–2 weeks",
      "Short bouts of ice (10–15 min) may soothe soreness, but gentle movement and load progression matter more for recovery",
      "Gentle calf stretches and foam rolling",
      "Return with walk-run intervals before full running",
    ],
    seeSpecialist: [
      "Pain lasts more than 2–3 weeks despite rest and icing",
      "Pain is on one specific spot (not a diffuse strip) — could signal a stress fracture",
      "Swelling, redness, or warmth along the shin",
      "You can't walk without limping",
    ],
    learnMore: {
      label: "Shin splints — symptoms & causes",
      href: "https://www.mayoclinic.org/diseases-conditions/shin-splints/symptoms-causes/syc-20354105",
      publisher: "Mayo Clinic",
    },
    relatedBlog: {
      label: "Shin splints deep dive for runners",
      href: "/blog/shin-splints-running",
    },
  },
  {
    slug: "runners-knee",
    icon: HeartPulse,
    area: "Knee",
    title: "Runner's knee (PFPS)",
    symptoms:
      "Dull ache around or behind the kneecap, worse going downstairs, after sitting, or on longer runs.",
    avoid: [
      "Don't ramp up hills and speed work in the same week",
      "Strengthen quads and glutes — weak hips can contribute to knee tracking issues",
      "Avoid overstriding; aim for a quicker, shorter stride on easy days",
      "Increase volume gradually — avoid sudden weekly leaps and single-run spikes beyond recent long-run distance",
    ],
    fix: [
      "Reduce mileage and avoid hills until pain subsides",
      "Ice may soothe a hot spot briefly, but don't rely on it alone — load management and strength work drive recovery",
      "Exercises: clamshells, side-lying leg lifts, wall sits",
      "Gradually rebuild volume once pain-free on stairs and easy walks",
    ],
    seeSpecialist: [
      "Pain persists beyond 2 weeks of reduced activity",
      "Knee locks, gives way, or swells noticeably after runs",
      "Pain is severe enough to change how you walk day-to-day",
      "Same knee pain returns every time you build mileage — a sports physio can assess tracking and hip strength",
    ],
    learnMore: {
      label: "Patellofemoral pain syndrome — symptoms & causes",
      href: "https://www.mayoclinic.org/diseases-conditions/patellofemoral-pain-syndrome/symptoms-causes/syc-20350792",
      publisher: "Mayo Clinic",
    },
    relatedBlog: {
      label: "Runner's knee deep dive",
      href: "/blog/runners-knee-running",
    },
  },
  {
    slug: "it-band-syndrome",
    icon: Bone,
    area: "Hip / thigh",
    title: "IT band syndrome",
    symptoms:
      "Sharp or burning pain on the outside of the knee or hip, especially when running downhill or on cambered roads.",
    avoid: [
      "Don't skip hip and glute strength work",
      "Avoid always running the same direction on a track or sloped road",
      "Replace shoes before they're completely dead",
      "Build long runs gradually — IT band issues often follow volume spikes",
    ],
    fix: [
      "Rest from running; use cycling or swimming to maintain fitness",
      "Foam roll glutes and outer thigh (not directly on the IT band — it's not meant to be rolled aggressively)",
      "Strengthen gluteus medius: side steps with band, single-leg deadlifts",
      "Return slowly with flat routes before hills",
    ],
    seeSpecialist: [
      "Pain lasts more than 4 weeks despite rest and rehab exercises",
      "Pain shoots down the leg or you feel numbness/tingling",
      "IT band issues keep returning every time you increase distance",
      "A sports physio or orthopaedic specialist can check hip biomechanics and running gait",
    ],
    learnMore: {
      label: "Iliotibial (IT) band syndrome",
      href: "https://my.clevelandclinic.org/health/diseases/21967-iliotibial-band-syndrome",
      publisher: "Cleveland Clinic",
    },
    relatedBlog: {
      label: "IT band syndrome deep dive",
      href: "/blog/it-band-syndrome-running",
    },
  },
  {
    slug: "plantar-fasciitis",
    icon: Footprints,
    area: "Foot",
    title: "Plantar fasciitis",
    symptoms:
      "Stabbing heel pain, worst with first steps in the morning or after sitting.",
    avoid: [
      "Don't suddenly increase barefoot walking or minimalist shoes",
      "Stretch calves daily — tight calves pull on the plantar fascia",
      "Wear supportive shoes around the house if you have hard floors",
      "Avoid jumping into speed work on a weak base",
    ],
    fix: [
      "Roll a frozen water bottle under your foot for 5–10 min",
      "Towel scrunches and calf stretches (wall stretch, 30 sec each side)",
      "Night splints or supportive insoles can help some runners",
      "Recovery takes weeks to months — patience beats pushing through",
    ],
    seeSpecialist: [
      "Heel pain hasn't improved after 4–6 weeks of daily stretching and rest",
      "Pain is severe enough to avoid walking normally",
      "Sharp pain in the arch or heel after a sudden increase in activity",
      "A podiatrist can assess foot mechanics; a physio can guide loading and return-to-run",
    ],
    learnMore: {
      label: "Plantar fasciitis — symptoms & causes",
      href: "https://www.mayoclinic.org/diseases-conditions/plantar-fasciitis/symptoms-causes/syc-20354846",
      publisher: "Mayo Clinic",
    },
    relatedBlog: {
      label: "Plantar fasciitis deep dive",
      href: "/blog/plantar-fasciitis-running",
    },
  },
  {
    slug: "achilles-tendinitis",
    icon: AlertTriangle,
    area: "Ankle / calf",
    title: "Achilles tendinitis",
    symptoms:
      "Stiffness and pain in the Achilles tendon, especially in the morning or at the start of a run.",
    avoid: [
      "Never increase speed and distance in the same week",
      "Warm up with walking and easy jogging — no sprints cold",
      "Avoid excessive hill repeats when building mileage",
      "Eccentric heel drops (off a step) as prevention once you're running regularly",
    ],
    fix: [
      "Stop running if pain is sharp — Achilles tears are serious",
      "Progress loading carefully: air skipping → heel raises → eccentric heel lowers (see the deep-dive post)",
      "Eccentric heel lowers off a step only after lighter phases stay calm — 3 sets of ~15, slow lower, as tolerated",
      "Reduce hills and speed until walking is pain-free for a week; ice only for short comfort if needed",
      "Return with flat, easy runs only after a pain-free week of walking and stable loading work",
    ],
    seeSpecialist: [
      "Immediately — if you heard a pop, have sudden severe pain, or can't rise onto your toes",
      "Pain or stiffness lasts more than 2 weeks despite rest and eccentric exercises",
      "The tendon is visibly swollen, thickened, or warm to touch",
      "Morning stiffness doesn't ease after 30 minutes of walking — see a sports doctor or physio to rule out a partial tear",
    ],
    learnMore: {
      label: "Achilles tendinitis — symptoms & causes",
      href: "https://www.mayoclinic.org/diseases-conditions/achilles-tendinitis/symptoms-causes/syc-20369020",
      publisher: "Mayo Clinic",
    },
    relatedBlog: {
      label: "Achilles tendinitis deep dive",
      href: "/blog/achilles-tendinitis-running",
    },
  },
  {
    slug: "stress-fractures",
    icon: Shield,
    area: "Bone",
    title: "Stress fractures",
    symptoms:
      "Localized pain that worsens with running and can hurt even at rest. Often in shins, feet, or hips.",
    avoid: [
      "Never ignore pain that gets worse as a run goes on",
      "Eat enough calories — under-fueling raises stress fracture risk",
      "Get enough calcium and vitamin D; consider a bone health check if you're at risk",
      "Alternate hard days with easy days; respect rest days in your plan",
    ],
    fix: [
      "Stop running immediately — do not try to run through this",
      "Expect 6–12 weeks (or more) off running depending on location",
      "Cross-train only with medical clearance (pool running, swimming)",
      "Address the cause: often rapid mileage increase, poor nutrition, or biomechanics",
    ],
    seeSpecialist: [
      "Right away — see a doctor or sports medicine physician for imaging (X-ray or MRI)",
      "Pain is pinpoint on the bone and worsens with weight-bearing",
      "Pain at rest or at night, not just during runs",
      "You've had multiple stress injuries or suspect low bone density — ask about a bone health workup",
    ],
    learnMore: {
      label: "Stress fractures — symptoms & causes",
      href: "https://www.mayoclinic.org/diseases-conditions/stress-fractures/symptoms-causes/syc-20354057",
      publisher: "Mayo Clinic",
    },
    relatedBlog: {
      label: "Stress fracture deep dive for runners",
      href: "/blog/stress-fracture-running",
    },
  },
];

export const commonInjurySlugs = commonInjuries.map((injury) => injury.slug);

export function getCommonInjuryBySlug(slug: string): CommonInjury | undefined {
  return commonInjuries.find((injury) => injury.slug === slug);
}

export const preventionPrinciples = [
  "Increase volume gradually — avoid sudden weekly leaps and big single-run spikes vs your recent longest run",
  "One rest day per week minimum; sleep 7–9 hours",
  "Rotate easy, moderate, and hard days — not every run is a workout",
  "Replace running shoes every 300–500 miles",
  "Strength train 2× per week: glutes, core, calves",
  "Pain that changes your gait means stop and assess",
];
