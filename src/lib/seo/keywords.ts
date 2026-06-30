import { SITE_NAME } from "@/lib/site";

/** Site-wide long-tail terms for beginners searching without an app. */
export const GLOBAL_SEO_KEYWORDS = [
  "couch to 5k free plan",
  "beginner running schedule no app",
  "free 5k training plan beginner",
  "couch to 5k no app",
  "beginner running plan free",
  "how to start running beginner",
  "free marathon training plan beginner",
  "half marathon training plan free",
  "running plan in browser",
  SITE_NAME.toLowerCase(),
] as const;

export const HOME_SEO_KEYWORDS = [
  ...GLOBAL_SEO_KEYWORDS,
  "start running today",
  "beginner runner training schedule",
  "free running plan no download",
  "couch to 5k for beginners",
] as const;

export const PLAN_SEO_KEYWORDS = [
  ...GLOBAL_SEO_KEYWORDS,
  "8 week couch to 5k plan",
  "12 week half marathon plan",
  "16 week marathon plan beginner",
  "running schedule 3 days a week",
  "cross training running plan",
  "customize run days",
] as const;

export const BLOG_SEO_KEYWORDS = [
  ...GLOBAL_SEO_KEYWORDS,
  "beginner running tips",
  "first time runner advice",
  "running blog for beginners",
] as const;

export const TIPS_SEO_KEYWORDS = [
  ...GLOBAL_SEO_KEYWORDS,
  "beginner running tips",
  "how to pace yourself running",
  "running tips for new runners",
  "easy running pace beginner",
] as const;

export const GEAR_SEO_KEYWORDS = [
  "beginner running gear",
  "first running shoes",
  "running gear for beginners",
  "what to wear running beginner",
  "cheap running gear starter kit",
] as const;

export const INJURIES_SEO_KEYWORDS = [
  "beginner running injuries",
  "shin splints prevention running",
  "runner knee beginner",
  "how to avoid running injuries",
  "plantar fasciitis running",
  "running injuries women",
  "pelvic floor running leakage",
  "RED-S running female",
] as const;

export const BAD_WEATHER_SEO_KEYWORDS = [
  "running in rain tips",
  "running in heat beginner",
  "indoor running alternatives",
  "bad weather running plan",
] as const;

export const SITUATIONAL_SEO_KEYWORDS = [
  "running while pregnant",
  "running over 55 beginner",
  "running with asthma",
  "running with diabetes beginner",
] as const;

/** Extra keywords for individual blog posts by slug. */
export const BLOG_POST_KEYWORDS: Record<string, string[]> = {
  "never-ran-where-to-start": [
    "never ran before where to start",
    "how to start running from zero",
  ],
  "training-first-5k": ["first 5k training plan", "train for first 5k beginner"],
  "first-run-tips": ["first run tips beginner", "what to know before first run"],
  "why-walking-is-not-cheating": [
    "walk run method beginner",
    "couch to 5k walk run intervals",
  ],
  "beginner-gear-guide-under-50": [
    "running gear under 50 dollars",
    "cheap beginner running gear",
  ],
  "what-to-wear-running": [
    "what to wear for running beginner",
    "running clothes for beginners",
  ],
  "building-a-running-habit": [
    "how to stick to running habit",
    "running consistency beginner",
  ],
  "how-to-pace-yourself": [
    "how to pace yourself running beginner",
    "easy run pace beginner",
  ],
  "nutrition-basics-for-beginners": [
    "beginner runner nutrition",
    "what to eat when you start running",
  ],
  "bodyweight-strength-for-runners": [
    "bodyweight strength training for runners",
    "strength exercises for beginner runners",
  ],
  "running-form-101": [
    "beginner running form",
    "how to run with good form",
    "running cadence beginner",
  ],
  "running-guide-for-women": [
    "running tips for women beginners",
    "women beginner running guide",
    "running during menstrual cycle",
    "sports bra for running women",
    "running after pregnancy beginner",
    "RED-S female runners",
  ],
  "running-guide-for-men": [
    "running tips for men beginners",
    "men beginner running guide",
    "chest pain running men",
    "RED-S male runners",
    "sports hernia running",
    "running after 40 men",
  ],
  "dumbbell-strength-at-home-for-runners": [
    "dumbbell workout for runners at home",
    "strength training runners home dumbbells",
  ],
  "advanced-strength-training-for-runners": [
    "advanced strength training for runners",
    "plyometrics for runners",
    "runner weight training program",
  ],
  "running-vs-biking": [
    "running vs cycling for runners",
    "cycling cross training for runners",
    "bike or run beginner fitness",
  ],
  "hiking-instead-of-long-run": [
    "hiking instead of long run training",
    "trail hiking for runners cross training",
    "does hiking help running",
  ],
  "runner-etiquette-trails-roads-track": [
    "running etiquette for beginners",
    "trail running etiquette rules",
    "how to run on track etiquette",
  ],
  "group-running-coach-and-pacer": [
    "running coach for beginners",
    "how to listen to running coach",
    "group running training coach",
    "couch to 5k coach clinic",
    "listening to running coach beginner",
  ],
  "mortons-neuroma-running": [
    "mortons neuroma running",
    "forefoot pain running numb toes",
    "wide toe box running shoes",
    "metatarsal pad running",
    "ball of foot pain runner",
  ],
  "achilles-tendinitis-running": [
    "achilles tendinitis running",
    "achilles pain runner mileage",
    "calf raises achilles tendinopathy",
    "isometric calf raises running injury",
    "return to running achilles pain",
  ],
};

export function blogPostKeywords(slug: string, category: string): string[] {
  const extra = BLOG_POST_KEYWORDS[slug] ?? [];
  return [
    category.toLowerCase(),
    "beginner running",
    "running tips",
    ...extra,
    ...GLOBAL_SEO_KEYWORDS.slice(0, 4),
  ];
}
