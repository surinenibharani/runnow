import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Surface-gap posts from Jul 2026 analysis: trail/ultra intro, cold hub,
 * night safety, chafing/blisters, first track session, kids/family running.
 */
export const surfaceGapPosts: BlogPost[] = [
  {
    slug: "trail-ultra-intro-beginners",
    metaTitle: "Trail Running for Beginners (and Ultra Lite Intro)",
    title: "First Trail Runs (and a Gentle Ultra Intro): What Road Runners Miss",
    excerpt:
      "Dirt isn't just prettier pavement. Surface, hills, navigation, fueling, and how to dabble in longer trail days without copying elite ultra Instagram.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2027-03-08",
    readTime: "9 min",
    relatedSlugs: [
      "how-to-not-hate-hills",
      "runner-etiquette-trails-roads-track",
      "hiking-instead-of-long-run",
      "hydration-electrolytes-running",
      "avoiding-injuries",
      "training-first-10k",
    ],
    closingQuestion:
      "Did your first trail run feel magical, chaotic, or both — what surprised you most?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.runningNutrition,
      SOURCES.heatSafety,
    ],
    faq: [
      {
        question: "Do I need trail shoes for my first trail run?",
        answer:
          "Not always — many beginners start on mild gravel or park paths in road shoes. True muddy, rocky, or steep trails benefit from more grip. Start easy surfaces first.",
      },
      {
        question: "Should beginners run ultras?",
        answer:
          "Not as a first goal. Build consistent road or easy trail volume first. Ultra-lite means learning trail skills and longer time-on-feet gradually — not signing up for 50 miles next month.",
      },
      {
        question: "Is hiking 'cheating' on trail long runs?",
        answer:
          "No. Power-hiking climbs is normal trail technique. Time on feet and smart effort matter more than continuous jogging on steep dirt.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Road running teaches rhythm. **Trail running teaches negotiation** — with roots, mud, climbs, and your own ego when the GPS pace looks 'slow.'",
          "This guide is for road runners curious about dirt, plus a gentle intro to ultra-style thinking (long days, walk breaks, fueling) without pretending you're ready for Western States.",
        ],
      },
      {
        id: "start",
        heading: "Pick a beginner-friendly first trail",
        list: [
          "Wide packed gravel or forest-park loops before technical singletrack",
          "Known distance under your usual long-run length",
          "Daylight, phone signal if possible, and a turnaround plan",
          "Tell someone where you're going",
        ],
        paragraphs: [
          "Save knife-edge ridges and unmarked bushwhacks for later. Etiquette still applies — yield rules differ on trails; review [runner etiquette](/blog/runner-etiquette-trails-roads-track).",
        ],
      },
      {
        id: "skills",
        heading: "Skills that transfer (and ones that don't)",
        list: [
          "Shorten stride on technical bits; look 2–3 steps ahead",
          "Walk steep climbs on purpose — see [hills](/blog/how-to-not-hate-hills)",
          "Expect slower pace; judge by effort and time, not Strava shame",
          "Carry water earlier than you would on roads",
          "Poles are optional later — not required for day one",
        ],
      },
      {
        id: "gear",
        heading: "Gear: start minimal",
        list: [
          "Shoes with decent tread for the surface you're on",
          "Phone, small soft flask or vest if >45–60 min",
          "Snack you've practiced ([fueling](/blog/hydration-electrolytes-running))",
          "Layers for shade-to-sun and weather swings",
          "Skip brand-new race kit on unfamiliar terrain",
        ],
      },
      {
        id: "ultra-lite",
        heading: "Ultra-lite thinking (without the 100-miler)",
        paragraphs: [
          "Ultras reward patience, gut training, and hiking as a skill. You can borrow that mindset on a 2–3 hour trail day long before any ultra entry.",
        ],
        list: [
          "Practice eating/drinking while moving",
          "Break the day into segments, not one heroic pace",
          "Build back-to-back easy days only after a solid base",
          "Strength for hips/ankles helps trail durability",
          "If a hike replaces a long run sometimes, that's okay — [hike vs long run](/blog/hiking-instead-of-long-run)",
        ],
        cta: { text: "Browse free training plans", href: "/plan" },
      },
      {
        id: "safety",
        heading: "Safety non-negotiables",
        list: [
          "Know the route or download an offline map",
          "Turn around with enough daylight margin",
          "Heat, storms, and wildlife rules are local — check them",
          "Pain that changes your gait on technical ground = walk out carefully",
        ],
      },
    ],
  },
  {
    slug: "cold-weather-running-hub",
    metaTitle: "Cold Weather Running Guide: Layers, Ice & Safety",
    title: "Cold-Weather Running Hub: Layers, Ice, Breathing & When to Stay In",
    excerpt:
      "One place for winter miles: how to layer, what 'feels like' means for pace, ice and black-ice rules, and when the treadmill is the smart call.",
    category: "Tips",
    author: AUTHOR,
    publishedAt: "2027-03-15",
    readTime: "8 min",
    relatedSlugs: [
      "running-in-bad-weather",
      "what-to-wear-running",
      "treadmill-indoor-winter-running",
      "night-running-safety",
      "warm-up-cool-down-running",
      "hot-weather-running-hub",
    ],
    closingQuestion:
      "What's your coldest successful run — and what layer combo actually worked?",
    sources: [SOURCES.heatSafety, SOURCES.physicalActivityGuidelinesUS],
    faq: [
      {
        question: "How cold is too cold to run outside?",
        answer:
          "It depends on wind, ice, daylight, and your health. Many runners skip outdoor runs in extreme wind chill, ice storms, or when sidewalks are sheets of ice. Indoor options keep the habit without the ER visit.",
      },
      {
        question: "Should I breathe through my nose in the cold?",
        answer:
          "Do what keeps you calm. Cold air can irritate airways — slow the pace, cover your mouth lightly if needed, and see a clinician if you get wheezing or chest symptoms.",
      },
      {
        question: "Why does cold make easy pace feel harder?",
        answer:
          "Stiffer tissues, heavier clothes, and cautious footing all raise effort. Run by feel, not summer splits.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Heat gets the drama posts. Cold cancels seasons quietly — ice, dark commutes, and 'I'll start again in April.' This hub is the winter counterpart to our [hot-weather guide](/blog/hot-weather-running-hub).",
          "Pair with the broader [bad weather](/blog/running-in-bad-weather) rules and [treadmill](/blog/treadmill-indoor-winter-running) tactics.",
        ],
      },
      {
        id: "layers",
        heading: "Layering that doesn't overheat",
        list: [
          "Dress like it's ~10–15°F warmer than the start — you'll heat up",
          "Base: moisture-wicking (not cotton)",
          "Mid: light insulation if needed",
          "Shell: wind/light precip when it's nasty",
          "Hands, ears, and a hat or headband matter more than fancy tights",
        ],
        cta: { text: "What to wear running", href: "/blog/what-to-wear-running" },
      },
      {
        id: "ice",
        heading: "Ice and footing",
        list: [
          "Black ice > hero miles — shorten, walk, or go indoors",
          "Traction devices help on packed snow; practice before race week",
          "Shorter strides; eyes up for melt-freeze patches",
          "Night + ice is a double risk — see [night safety](/blog/night-running-safety)",
        ],
      },
      {
        id: "pacing",
        heading: "Pace and warm-up in the cold",
        paragraphs: [
          "Warm up longer. Easy days stay easy. Quality sessions often belong on the treadmill or a clear path — not on a skating rink sidewalk.",
        ],
        list: [
          "Extend the walk warm-up ([warm-up guide](/blog/warm-up-cool-down-running))",
          "Accept slower paces; judge by effort",
          "Hydrate — dry air still dehydrates you",
        ],
      },
      {
        id: "bail",
        heading: "When to bail outdoors",
        list: [
          "Ice storms / untreated sidewalks",
          "Extreme wind chill with exposed skin risk",
          "Lightning or severe weather alerts",
          "You feel chest pain, dizziness, or can't feel fingers/toes",
        ],
        paragraphs: [
          "Indoor miles are consistency. Winter is a long game — finish March still running.",
        ],
      },
    ],
  },
  {
    slug: "night-running-safety",
    metaTitle: "Night Running Safety Tips for Beginners",
    title: "Night Running Safety: Be Seen, Be Predictable, Be Pickable",
    excerpt:
      "Dark miles are doable with the right route, lights, and habits. How to be visible, choose safer paths, and know when darkness means treadmill instead.",
    category: "Tips",
    author: AUTHOR,
    publishedAt: "2027-03-22",
    readTime: "7 min",
    relatedSlugs: [
      "cold-weather-running-hub",
      "running-in-bad-weather",
      "runner-etiquette-trails-roads-track",
      "what-to-wear-running",
      "first-run-tips",
      "treadmill-indoor-winter-running",
    ],
    closingQuestion:
      "Night runners — headlamp, waist light, or lit neighborhood loop?",
    sources: [SOURCES.physicalActivityGuidelinesUS, SOURCES.preParticipationScreening],
    faq: [
      {
        question: "Is it safe to run alone at night?",
        answer:
          "Risk varies by area and conditions. Prefer lit routes, tell someone your plan, carry a phone, and trust your gut. Group runs or treadmill are valid alternatives.",
      },
      {
        question: "Do I need a headlamp on city sidewalks?",
        answer:
          "If streetlights are strong and continuous, reflective gear may be enough. On dark paths or trails, a headlamp (and rear light) is smart so you see and are seen.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "After work is when many beginners actually have time — and when cars, curbs, and dogs become harder to see. **Night running is a skill stack: visibility, route choice, and predictability.**",
        ],
      },
      {
        id: "seen",
        heading: "Be seen",
        list: [
          "Light colors + reflective details beat camouflage black",
          "Clip-on lights front and rear when traffic exists",
          "Headlamp aimed slightly down so you don't blind oncoming people",
          "Assume drivers don't see you until proven otherwise",
        ],
      },
      {
        id: "route",
        heading: "Route rules",
        list: [
          "Favor lit, populated loops over isolated shortcuts",
          "Run against traffic where sidewalks force road sharing",
          "Skip headphone volume that erases cars and footsteps",
          "Change routes if a stretch feels off — pride is optional",
        ],
        paragraphs: [
          "Trail at night is a different sport — navigation + wildlife + footing. Start with easy road/path loops first ([trail intro](/blog/trail-ultra-intro-beginners)).",
        ],
      },
      {
        id: "habits",
        heading: "Habits that help",
        list: [
          "Share ETA with someone",
          "Carry ID and a charged phone",
          "Wear something you can be described in",
          "Winter dark + ice = extra caution ([cold hub](/blog/cold-weather-running-hub))",
        ],
      },
      {
        id: "bail",
        heading: "When darkness means indoors",
        paragraphs: [
          "Storms, ice, sketchy neighborhoods after late meetings, or feeling unwell — treadmill and rest keep you in the game. Consistency isn't the same as exposure.",
        ],
        cta: {
          text: "Indoor winter options",
          href: "/blog/treadmill-indoor-winter-running",
        },
      },
    ],
  },
  {
    slug: "chafing-blisters-running",
    metaTitle: "Chafing and Blisters from Running: Prevention & Care",
    title: "Chafing and Blisters: Stop the Rub Before It Ends Your Run",
    excerpt:
      "Salt, seams, wet socks, and new shoes create most beginner skin drama. Prevention first, then simple care — without weird internet remedies.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2027-03-29",
    readTime: "7 min",
    relatedSlugs: [
      "what-to-wear-running",
      "choosing-running-shoes",
      "beginner-gear-guide-under-50",
      "hot-weather-running-hub",
      "race-day-tips",
      "avoiding-injuries",
    ],
    closingQuestion:
      "What chafe zone surprised you first — thighs, toes, or sports-bra line?",
    sources: [SOURCES.peaceAndLove, SOURCES.preParticipationScreening],
    faq: [
      {
        question: "Should I pop a blister?",
        answer:
          "Often better to leave intact blisters alone if they're not painful. If you drain one, use clean technique and cover it. Seek care for signs of infection or diabetes-related foot concerns.",
      },
      {
        question: "Is petroleum jelly enough for chafing?",
        answer:
          "Anti-chafe balms designed for sport often last longer when you sweat. Test on training runs before race day. Fix the friction source (seams, fit) too.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Nothing ends a proud long run like raw skin. **Chafing and blisters are friction problems** — moisture, heat, and movement doing what physics does.",
          "**This is general skin-care education, not a dermatology visit.** Infection, severe pain, or chronic wounds need a clinician.",
        ],
      },
      {
        id: "prevent-chafe",
        heading: "Prevent chafing",
        list: [
          "Moisture-wicking fabrics; skip cotton underwear/shirts for longer runs",
          "Check seams and tags at thighs, underarms, bra lines, and waistbands",
          "Anti-chafe balm on known hotspots before you leave",
          "Lube again mid-run on hot humid days if needed",
          "Salt crust + wet kit = more rub — rinse and change after",
        ],
        cta: { text: "What to wear", href: "/blog/what-to-wear-running" },
      },
      {
        id: "prevent-blister",
        heading: "Prevent blisters",
        list: [
          "Shoes that fit the length and width of *your* foot ([shoe guide](/blog/choosing-running-shoes))",
          "Socks meant for running; consider double-layer or blister-specific pairs",
          "Don't debut race shoes or socks on race morning",
          "Keep nails trimmed; address hotspots early with tape/balm",
          "Wet feet on long rainy days need a plan — spare socks help",
        ],
      },
      {
        id: "care",
        heading: "If it's already raw",
        list: [
          "Clean gently; keep covered with a blister bandage or clean dressing",
          "Reduce friction next run — shorten, change kit, or cross-train",
          "Skip 'just push through' on open skin in heat — infection risk rises",
          "See a clinician for spreading redness, pus, fever, or diabetes foot issues",
        ],
      },
      {
        id: "race",
        heading: "Race-week skin checklist",
        paragraphs: [
          "Lay out kit you've already tested. Body-glide the usual spots the night before *and* morning of. Carry a tiny balm if you've needed mid-race fixes in training.",
        ],
      },
    ],
  },
  {
    slug: "first-track-workout-beginners",
    metaTitle: "First Track Workout for Beginners: How-To Guide",
    title: "Your First Track Session: Lanes, Warm-Up, and a Simple Workout",
    excerpt:
      "The oval isn't only for elites. How to find an open track, pick a lane, warm up, run a beginner-friendly session, and leave without lane-one drama.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2027-04-05",
    readTime: "8 min",
    relatedSlugs: [
      "run-workouts-hills-intervals-fartlek-track",
      "speedwork-after-5k-beginners",
      "runner-etiquette-trails-roads-track",
      "warm-up-cool-down-running",
      "how-to-pace-yourself",
      "easy-runs-effort-heart-rate",
    ],
    closingQuestion:
      "First track day — did lane etiquette or the workout itself feel weirder?",
    sources: [
      SOURCES.acsmExercisePrescription2009,
      SOURCES.intervalTrainingVO2max2024,
    ],
    faq: [
      {
        question: "Which lane should beginners use?",
        answer:
          "Outer lanes (often 4–8) for warm-up, cool-down, and easy running. Leave lane 1 for faster work and people doing timed intervals — then clear it between reps.",
      },
      {
        question: "Do I need spikes?",
        answer:
          "No. Regular running shoes are fine for beginner track sessions.",
      },
      {
        question: "When should I start track workouts?",
        answer:
          "After a base of easy running (often post–first 5K). See our speedwork-after-5K guide — one quality day per week is enough.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "A track is just a measured loop with rules. Once you know them, it's one of the friendliest places to practice honest effort — no mystery hills, no 'was that a mile?'",
          "Read [types of runs](/blog/run-workouts-hills-intervals-fartlek-track) for why intervals exist, then use this as the field manual.",
        ],
      },
      {
        id: "access",
        heading: "Finding a track",
        list: [
          "Public high-school or college tracks after hours / posted open times",
          "Respect closures, teams in practice, and meet days",
          "If unsure, ask — or use a quiet path with measured markers instead",
        ],
      },
      {
        id: "etiquette",
        heading: "Lane etiquette in 60 seconds",
        list: [
          "Run counterclockwise unless a sign says otherwise",
          "Faster traffic inside; pass on the outside and call 'on your outside'",
          "Don't stand in lane 1 after a rep — step inward or outward to recover",
          "Headphones low enough to hear calls",
        ],
        cta: {
          text: "Full etiquette guide",
          href: "/blog/runner-etiquette-trails-roads-track",
        },
      },
      {
        id: "session",
        heading: "A simple first workout",
        paragraphs: [
          "Warm up 10–15 min easy jog + strides ([warm-up](/blog/warm-up-cool-down-running)). Then try:",
        ],
        list: [
          "4–6 × 200m (half lap) at 'brisk but controlled' with equal jog/walk recovery",
          "Or 4 × 400m (one lap) if 200s felt easy — recover fully between",
          "Cool down 10 min easy",
          "Total quality volume stays small — leave wanting one more rep",
        ],
      },
      {
        id: "pacing",
        heading: "Pacing without a coaching degree",
        list: [
          "First reps too fast ruins the set — start boring",
          "Talk-test still helps on recoveries ([easy effort](/blog/easy-runs-effort-heart-rate))",
          "If form falls apart, stop the quality portion",
          "One track day a week max for beginners ([speedwork guide](/blog/speedwork-after-5k-beginners))",
        ],
        cta: { text: "Open free plans", href: "/plan" },
      },
    ],
  },
  {
    slug: "kids-family-running",
    metaTitle: "Running with Kids and Family: Beginner Guide",
    title: "Kids & Family Running: Make It Fun Without Making It a Workout Cult",
    excerpt:
      "Family 5Ks, scooter miles, and kid-paced loops can build a lifelong habit — if you keep it playful, age-appropriate, and free of adult ego pacing.",
    category: "Tips",
    author: AUTHOR,
    publishedAt: "2027-04-12",
    readTime: "8 min",
    relatedSlugs: [
      "stroller-running-guide",
      "dog-running-guide",
      "why-walking-is-not-cheating",
      "building-a-running-habit",
      "first-race-signup-logistics",
      "postpartum-return-to-run",
    ],
    closingQuestion:
      "Family runners — park loop, scooter tag-along, or event 5K as the tradition?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.exerciseAfterPregnancy,
    ],
    faq: [
      {
        question: "How far should kids run?",
        answer:
          "Follow pediatric guidance and the child's enthusiasm. Emphasize play, short bursts, and walking. Avoid adult-style mileage plans for young kids.",
      },
      {
        question: "Can toddlers come on runs?",
        answer:
          "Often via stroller once you're cleared and skilled — see the stroller guide. Jogging with a child in arms is usually a bad idea.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "The goal isn't a family Strava club with PRs. **It's showing that moving together is normal** — park loops, walk-run games, and low-pressure community 5Ks.",
          "Adult training can still happen solo. Family sessions are for connection first.",
        ],
      },
      {
        id: "ages",
        heading: "Keep it age-appropriate",
        list: [
          "Little kids: play, tag, short scooter/bike alongside, stroller miles for adults",
          "Elementary: short loop challenges, plenty of walking, water breaks",
          "Tweens/teens: optional — invite, don't force; let them set pace",
          "Never use running as punishment",
        ],
        paragraphs: [
          "Stroller mechanics for caregivers: [stroller running](/blog/stroller-running-guide). Postpartum return first if relevant: [return-to-run](/blog/postpartum-return-to-run).",
        ],
      },
      {
        id: "events",
        heading: "Family-friendly events",
        list: [
          "Look for 'fun run' distances and generous cutoffs",
          "Costume 5Ks > time-goal energy for first family races",
          "Pack snacks, layers, and an exit plan if moods tank",
          "Celebrate finishing together, not place",
        ],
        cta: {
          text: "First-race logistics",
          href: "/blog/first-race-signup-logistics",
        },
      },
      {
        id: "adult",
        heading: "Protect your own training",
        list: [
          "Keep hard workouts on solo days",
          "Family runs count as easy/recovery — [walking isn't cheating](/blog/why-walking-is-not-cheating)",
          "Dogs add another skill stack ([dog running](/blog/dog-running-guide))",
          "One joyful short loop beats a miserable 'family long run'",
        ],
      },
      {
        id: "habit",
        heading: "Make it a ritual, not a test",
        paragraphs: [
          "Same park night each week. Ice cream after. Photos over splits. Kids who feel free to walk become adults who still lace up — which is the whole point.",
        ],
        cta: { text: "Start a free adult plan", href: "/plan" },
      },
    ],
  },
];
