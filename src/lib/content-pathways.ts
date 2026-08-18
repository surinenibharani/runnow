export type PathwayKind = "tip" | "blog" | "plan" | "injury" | "gear";

export type PathwayLink = {
  kind: PathwayKind;
  href: string;
  label: string;
  detail: string;
};

export type ContentPathway = {
  title: string;
  links: PathwayLink[];
};

const injuryPathways: Record<string, PathwayLink[]> = {
  "shin-splints": [
    {
      kind: "tip",
      href: "/tips/strength-twice-a-week-beats-more-junk-miles",
      label: "Strength twice a week",
      detail: "Calves and hips take load off the shin.",
    },
    {
      kind: "blog",
      href: "/blog/shin-splints-running",
      label: "Shin splints guide",
      detail: "Why they show up and how to come back.",
    },
    {
      kind: "plan",
      href: "/tips/missed-a-week-dont-double-up",
      label: "Ease the plan — don’t catch up",
      detail: "Cut volume; don’t stack missed runs.",
    },
  ],
  "runners-knee": [
    {
      kind: "tip",
      href: "/tips/strength-twice-a-week-beats-more-junk-miles",
      label: "Hip and quad strength",
      detail: "Weak hips often show up as knee pain.",
    },
    {
      kind: "tip",
      href: "/tips/mobility-in-minutes-not-marathons",
      label: "Short mobility",
      detail: "A few minutes beats a heroic foam-roll session.",
    },
    {
      kind: "blog",
      href: "/blog/runners-knee-running",
      label: "Runner’s knee guide",
      detail: "Stairs, hills, and how to rebuild.",
    },
    {
      kind: "plan",
      href: "/plan/5k-8w",
      label: "Stay on an easy plan",
      detail: "Skip hills and speed until stairs feel calm.",
    },
  ],
  "it-band-syndrome": [
    {
      kind: "tip",
      href: "/tips/strength-twice-a-week-beats-more-junk-miles",
      label: "Glute strength",
      detail: "Side steps and single-leg work beat more miles.",
    },
    {
      kind: "blog",
      href: "/blog/it-band-syndrome-running",
      label: "IT band guide",
      detail: "Why hills and cambered roads flare it.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Flatten the routes",
      detail: "Use rest and cross-train days already in the plan.",
    },
  ],
  "plantar-fasciitis": [
    {
      kind: "tip",
      href: "/tips/shoes-matter-more-than-gadgets",
      label: "Shoes before gadgets",
      detail: "Worn-out foam is a classic plantar trigger.",
    },
    {
      kind: "gear",
      href: "/gear#shoes",
      label: "Shoe guide",
      detail: "When to replace and what to look for.",
    },
    {
      kind: "blog",
      href: "/blog/plantar-fasciitis-running",
      label: "Plantar fasciitis guide",
      detail: "Morning pain, load, and the slow return.",
    },
  ],
  "achilles-tendinitis": [
    {
      kind: "tip",
      href: "/tips/rest-days-are-training-days",
      label: "Rest days are training",
      detail: "Achilles hates stacked hard days.",
    },
    {
      kind: "blog",
      href: "/blog/achilles-tendinitis-running",
      label: "Achilles guide",
      detail: "Loading, hills, and when to stop.",
    },
    {
      kind: "plan",
      href: "/tips/if-easy-days-arent-easy-slow-down-now",
      label: "If easy isn’t easy, back off",
      detail: "Stiffness that warms up still counts as a warning.",
    },
  ],
  "stress-fractures": [
    {
      kind: "tip",
      href: "/tips/fuel-the-miles-under-eating-isnt-toughness",
      label: "Fuel the miles",
      detail: "Under-eating raises bone-stress risk.",
    },
    {
      kind: "blog",
      href: "/blog/stress-fracture-running",
      label: "Stress fracture guide",
      detail: "Stop running and get imaging — this is not a push-through.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Pause the plan",
      detail: "Cross-train only with clinician clearance.",
    },
  ],
};

const tipPathways: Record<string, PathwayLink[]> = {
  "slow-down-seriously": [
    {
      kind: "blog",
      href: "/blog/how-to-pace-yourself",
      label: "How to pace yourself",
      detail: "Conversational effort, walk breaks, and why slow works.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Start with a walk–run plan",
      detail: "The quiz picks a free beginner schedule.",
    },
  ],
  "shoes-matter-more-than-gadgets": [
    {
      kind: "blog",
      href: "/blog/choosing-running-shoes",
      label: "Choosing running shoes",
      detail: "Fit first — ignore the hype.",
    },
    {
      kind: "gear",
      href: "/gear#shoes",
      label: "Gear: shoes",
      detail: "What to look for and when to replace.",
    },
    {
      kind: "injury",
      href: "/injuries/plantar-fasciitis",
      label: "Plantar fasciitis",
      detail: "Worn shoes are a common trigger.",
    },
  ],
  "rest-days-are-training-days": [
    {
      kind: "injury",
      href: "/injuries",
      label: "Injury prevention",
      detail: "Most beginner injuries start with skipped rest.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Plans with rest built in",
      detail: "3–4 run days max — the empty days are load management.",
    },
  ],
  "missed-a-week-dont-double-up": [
    {
      kind: "plan",
      href: "/plan",
      label: "Resume the next scheduled run",
      detail: "Catch-up mileage is how shin splints start.",
    },
    {
      kind: "injury",
      href: "/injuries/shin-splints",
      label: "Shin splints",
      detail: "A classic result of stacking missed work.",
    },
  ],
  "strength-twice-a-week-beats-more-junk-miles": [
    {
      kind: "injury",
      href: "/injuries/runners-knee",
      label: "Runner’s knee",
      detail: "Hips and quads take pressure off the kneecap.",
    },
    {
      kind: "injury",
      href: "/injuries/shin-splints",
      label: "Shin splints",
      detail: "Calf and hip strength are part of prevention.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Use the cross-train days",
      detail: "Strength belongs on the days already on the calendar.",
    },
  ],
  "walk-only-weeks-still-count": [
    {
      kind: "blog",
      href: "/blog/walking-for-fitness-without-running",
      label: "Walking for fitness",
      detail: "Brisk walking hits the health target.",
    },
    {
      kind: "plan",
      href: "/plan/5k-gentle-16w",
      label: "16-week walk-first plan",
      detail: "Four weeks of walking, then tiny jogs.",
    },
  ],
  "fuel-the-miles-under-eating-isnt-toughness": [
    {
      kind: "injury",
      href: "/injuries/stress-fractures",
      label: "Stress fractures",
      detail: "Low energy availability raises bone-stress risk.",
    },
    {
      kind: "blog",
      href: "/blog/stress-fracture-running",
      label: "Stress fracture guide",
      detail: "Fueling, load, and when to get imaging.",
    },
  ],
};

const blogPathways: Record<string, PathwayLink[]> = {
  "shin-splints-running": injuryPathways["shin-splints"] ?? [],
  "runners-knee-running": injuryPathways["runners-knee"] ?? [],
  "it-band-syndrome-running": injuryPathways["it-band-syndrome"] ?? [],
  "plantar-fasciitis-running": injuryPathways["plantar-fasciitis"] ?? [],
  "achilles-tendinitis-running": injuryPathways["achilles-tendinitis"] ?? [],
  "stress-fracture-running": injuryPathways["stress-fractures"] ?? [],
  "choosing-running-shoes": tipPathways["shoes-matter-more-than-gadgets"] ?? [],
  "never-ran-where-to-start": [
    {
      kind: "plan",
      href: "/start",
      label: "Start here",
      detail: "A two-minute quiz picks a free plan.",
    },
    {
      kind: "plan",
      href: "/plan/5k-gentle-16w",
      label: "Walk-to-5K plan",
      detail: "If jogging still feels like too much.",
    },
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "Conversational pace is the whole point.",
    },
  ],
  "first-run-tips": [
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "If you can’t talk, you’re racing week one.",
    },
    {
      kind: "gear",
      href: "/gear#shoes",
      label: "Shoes only",
      detail: "Everything else can wait.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Get a plan",
      detail: "So the second run is already on the calendar.",
    },
  ],
  "none-to-run-gentle-beginners": [
    {
      kind: "plan",
      href: "/plan/5k-gentle-16w",
      label: "16-week walk-first plan",
      detail: "Walking weeks, then micro-jogs.",
    },
    {
      kind: "tip",
      href: "/tips/walk-only-weeks-still-count",
      label: "Walk-only weeks still count",
      detail: "Impact can wait until the habit is real.",
    },
  ],
};

const gearPathways: Record<string, PathwayLink[]> = {
  shoes: [
    {
      kind: "tip",
      href: "/tips/shoes-matter-more-than-gadgets",
      label: "Shoes before gadgets",
      detail: "The only gear that matters on day one.",
    },
    {
      kind: "blog",
      href: "/blog/choosing-running-shoes",
      label: "Shoe guide",
      detail: "Fit, drop, and when to replace.",
    },
    {
      kind: "injury",
      href: "/injuries/plantar-fasciitis",
      label: "Plantar fasciitis",
      detail: "Dead foam is a common cause.",
    },
  ],
  "chafing-creams": [
    {
      kind: "tip",
      href: "/tips/lube-the-hotspots-before-you-leave",
      label: "Lube the hotspots",
      detail: "Before the run, not after it burns.",
    },
    {
      kind: "blog",
      href: "/blog/what-to-wear-running",
      label: "What to wear",
      detail: "Seams, sports bras, and weather.",
    },
  ],
  "strava-app": [
    {
      kind: "plan",
      href: "/start",
      label: "Get a plan first",
      detail: "Track the workout after you know what it is.",
    },
    {
      kind: "blog",
      href: "/blog/beginner-gear-guide-under-50",
      label: "Gear under $50",
      detail: "Your phone is enough for a long time.",
    },
  ],
};

function pathway(title: string, links: PathwayLink[]): ContentPathway | null {
  if (links.length === 0) return null;
  return { title, links };
}

export function getInjuryPathway(slug: string): ContentPathway | null {
  return pathway("Next steps for this injury", injuryPathways[slug] ?? []);
}

export function getTipPathway(slug: string): ContentPathway | null {
  return pathway("Related reading and next steps", tipPathways[slug] ?? []);
}

export function getBlogPathway(slug: string): ContentPathway | null {
  const links = blogPathways[slug];
  if (links?.length) {
    return pathway("Related tips, gear, and plans", links);
  }
  return null;
}

export function getGearPathway(slug: string): ContentPathway | null {
  return pathway("Related tips and guides", gearPathways[slug] ?? []);
}

export const gearHubReads: PathwayLink[] = [
  {
    kind: "blog",
    href: "/blog/choosing-running-shoes",
    label: "Choosing running shoes",
    detail: "Fit first. Lab awards can wait.",
  },
  {
    kind: "blog",
    href: "/blog/beginner-gear-guide-under-50",
    label: "Gear under $50",
    detail: "Socks, anti-chafe, and what actually helps.",
  },
  {
    kind: "blog",
    href: "/blog/what-to-wear-running",
    label: "What to wear",
    detail: "Weather, sports bras, and skip-the-cotton basics.",
  },
  {
    kind: "tip",
    href: "/tips/shoes-matter-more-than-gadgets",
    label: "Shoes before gadgets",
    detail: "A watch is optional. A decent shoe is not.",
  },
];

export const gearHubNextSteps: PathwayLink[] = [
  {
    kind: "plan",
    href: "/start",
    label: "Start here",
    detail: "Get a free plan, then buy shoes if you need them.",
  },
  {
    kind: "tip",
    href: "/tips",
    label: "Beginner tips",
    detail: "Pace, rest, and how not to overdo week one.",
  },
  {
    kind: "injury",
    href: "/injuries",
    label: "If something hurts",
    detail: "Most beginner niggles are load, not the wrong gadget.",
  },
];
