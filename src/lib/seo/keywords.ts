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
  "8 week 10k training plan beginner",
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
  "night running safety tips",
  "cold weather running tips",
  "prevent chafing running",
  "track workout for beginners",
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
  "training-first-10k": [
    "first 10k training plan beginner",
    "how to train for a 10k after 5k",
    "10k training schedule beginner",
  ],
  "comeback-after-running-break": [
    "start running again after a break",
    "return to running after time off",
    "comeback running plan beginner",
  ],
  "easy-runs-effort-heart-rate": [
    "easy run heart rate zone beginner",
    "talk test running pace",
    "zone 2 running for beginners",
  ],
  "shin-splints-running": [
    "shin splints from running recovery",
    "how to fix shin splints beginner",
    "medial tibial stress syndrome running",
  ],
  "runners-knee-running": [
    "runners knee patellofemoral pain",
    "knee pain from running beginner",
    "PFPS running recovery",
  ],
  "treadmill-indoor-winter-running": [
    "treadmill running for beginners winter",
    "indoor running when sidewalks icy",
    "keep running streak in winter",
  ],
  "warm-up-cool-down-running": [
    "how to warm up before running beginner",
    "cool down after run",
    "should I stretch before running",
  ],
  "hydration-electrolytes-running": [
    "hydration for runners beginner",
    "electrolytes running when needed",
    "water vs sports drink running",
  ],
  "sleep-recovery-for-runners": [
    "sleep for runners recovery",
    "how much sleep do runners need",
    "running when sleep deprived",
  ],
  "speedwork-after-5k-beginners": [
    "speedwork for beginners after 5k",
    "interval training beginner runners",
    "when to start speed work running",
  ],
  "running-shoes-without-lab-reviews": [
    "buy running shoes without reviews",
    "running shoe fit vs awards",
    "best way to choose running shoes beginner",
  ],
  "plantar-fasciitis-running": [
    "plantar fasciitis from running",
    "heel pain running beginner",
    "plantar fasciitis recovery runners",
  ],
  "it-band-syndrome-running": [
    "IT band syndrome running",
    "outer knee pain running hills",
    "iliotibial band syndrome beginner",
  ],
  "first-race-signup-logistics": [
    "how to sign up for first 5k",
    "first race day logistics beginner",
    "what to know before first running race",
  ],
  "off-season-between-training-plans": [
    "what to do between training plans running",
    "off season running plan beginner",
    "base building after a race",
  ],
  "running-over-50-beginners": [
    "start running after 50",
    "beginner running guide over 50",
    "masters beginner running plan",
  ],
  "postpartum-return-to-run": [
    "postpartum return to running",
    "when can I run after pregnancy",
    "pelvic floor running after birth",
  ],
  "stress-fracture-running": [
    "stress fracture from running",
    "bone stress injury runners",
    "shin stress fracture symptoms",
  ],
  "hot-weather-running-hub": [
    "running in hot weather tips",
    "summer running hydration heat",
    "when to skip run in heat",
  ],
  "race-taper-guide": [
    "how to taper for a race beginner",
    "race week taper running",
    "taper before 5k 10k half marathon",
  ],
  "race-anxiety-nerves": [
    "race day anxiety tips",
    "nervous before first 5k",
    "calm pre race nerves running",
  ],
  "gps-watch-vs-no-watch": [
    "do I need a GPS watch to run",
    "running without a watch beginner",
    "GPS watch vs phone running",
  ],
  "stroller-running-guide": [
    "jogging stroller running tips",
    "how to run with a stroller",
    "stroller running form postpartum",
  ],
  "dog-running-guide": [
    "running with dog beginner",
    "how far can dogs run",
    "dog running leash tips heat",
  ],
  "trail-ultra-intro-beginners": [
    "trail running for beginners",
    "first trail run tips",
    "ultra running intro for road runners",
  ],
  "cold-weather-running-hub": [
    "cold weather running tips",
    "what to wear running in winter",
    "running on ice safety",
  ],
  "night-running-safety": [
    "night running safety tips",
    "running in the dark reflective gear",
    "is it safe to run at night",
  ],
  "chafing-blisters-running": [
    "prevent chafing while running",
    "blisters from running shoes",
    "anti chafe tips for runners",
  ],
  "first-track-workout-beginners": [
    "first track workout beginner",
    "how to use a running track",
    "track lane etiquette beginners",
  ],
  "kids-family-running": [
    "running with kids family 5k",
    "family fun run tips",
    "how to start kids running",
  ],
  "running-myths-debunked": [
    "running myths debunked",
    "running hydration myths",
    "beginner running pace myths",
    "running nutrition myths",
  ],
  "train-runners-heart-metrics": [
    "how to train runners heart",
    "running heart rate metrics explained",
    "resting heart rate for runners",
    "VO2max heart rate zones beginners",
  ],
  "resting-heart-rate-runners": [
    "resting heart rate for runners",
    "normal resting heart rate athletes",
    "why is my resting heart rate high",
  ],
  "maximum-heart-rate-runners": [
    "maximum heart rate for runners",
    "220 minus age heart rate accurate",
    "heart rate training zones beginners",
  ],
  "vo2max-for-runners": [
    "VO2max for runners explained",
    "how to improve VO2max running",
    "watch VO2max accuracy",
  ],
  "heart-rate-variability-runners": [
    "heart rate variability for runners",
    "HRV RMSSD training recovery",
    "should I rest when HRV is low",
  ],
  "training-zones-z1-z5-runners": [
    "heart rate zones z1 z5 explained",
    "zone 2 running for beginners",
    "training zones plain english runners",
  ],
  "lactate-threshold-for-runners": [
    "lactate threshold for runners",
    "tempo run threshold training beginners",
    "what is lactate threshold running",
  ],
  "blood-pressure-running-heart-health": [
    "running to lower blood pressure",
    "exercise and hypertension for runners",
    "blood pressure heart health running",
  ],
  "training-lungs-for-running": [
    "how to train lungs for running",
    "increase lung capacity running",
    "breathing strength for runners",
  ],
  "altitude-travel-race-running": [
    "running at altitude race tips",
    "destination race travel running",
    "altitude acclimation for runners",
  ],
  "foam-rolling-mobility-runners": [
    "foam rolling for runners",
    "mobility routine for runners beginners",
    "should runners stretch before running",
  ],
  "cadence-drills-runners": [
    "running cadence drills beginners",
    "180 steps per minute myth",
    "how to increase running cadence",
  ],
  "none-to-run-gentle-beginners": [
    "none to run beginner plan",
    "ultra gentle couch to 5k",
    "walk first running plan overweight",
  ],
  "workplace-lunch-run": [
    "lunch run at work tips",
    "how to run on lunch break",
    "office midday running routine",
  ],
  "running-through-menopause": [
    "running through menopause",
    "perimenopause running training",
    "menopause exercise tips runners",
  ],
  "reds-low-energy-availability-runners": [
    "REDs runners low energy availability",
    "underfueling running injuries",
    "relative energy deficiency sport running",
  ],
  "bone-health-masters-runners": [
    "bone health for masters runners",
    "osteoporosis running postmenopausal",
    "strength training bone density runners",
  ],
  "training-half-and-full-marathon-same-season": [
    "train for half marathon and marathon same time",
    "half marathon before marathon training plan",
    "two races same season running",
    "half marathon tune up for marathon",
    "marathon and half marathon training schedule",
  ],
  "prioritize-running-marathon-training": [
    "prioritize running marathon training",
    "marathon training dedication",
    "rest during marathon training",
    "nutrition marathon training plan",
    "cut back cross training marathon",
    "how hard is marathon training",
  ],
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
  "beginner-dumbbell-workout-at-home": [
    "beginner dumbbell workout at home",
    "first time lifting dumbbells at home",
    "full body dumbbell workout beginner",
    "dumbbell workout for beginners women",
    "home dumbbell workout no gym",
    "dumbbell warm up routine",
  ],
  "full-body-dumbbell-workout-at-home": [
    "full body dumbbell workout at home",
    "beginner dumbbell workout over 40",
    "60 minute dumbbell workout",
    "first time lifting dumbbells at home",
    "adjustable dumbbells vs fixed set",
    "gradual dumbbell progression beginner",
    "dumbbell workout for women beginners",
    "starting weights women dumbbells",
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
  "running-during-fasting": [
    "running and intermittent fasting",
    "running while fasting",
    "fasted running beginner",
    "can you run before breakfast",
    "fasted long run running",
    "16:8 fasting and running schedule",
    "running on empty stomach",
  ],
  "running-for-weight-loss-facts-and-myths": [
    "running for weight loss",
    "does running help lose weight",
    "running weight loss myths",
    "can you outrun a bad diet",
    "running not losing weight",
    "is running good for weight loss beginner",
    "fat burning zone running myth",
  ],
};

export function blogPostKeywords(slug: string, category: string): string[] {
  const extra = BLOG_POST_KEYWORDS[slug] ?? [];
  const fromSlug = slug.replace(/-/g, " ");
  return [
    category.toLowerCase(),
    fromSlug,
    `${fromSlug} beginner`,
    "beginner running",
    "running tips",
    ...extra,
    ...GLOBAL_SEO_KEYWORDS.slice(0, 4),
  ];
}
