import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Remaining P1 thin-gap posts (Aug 2026 audit) + P3 mental-health depth.
 * P1/P2 canvas batch lives in posts-p1-p2-gaps.ts (GI, gait, periodization, etc.).
 */
export const p1P3GapPosts: BlogPost[] = [
  {
    slug: "overtraining-recognition-runners",
    metaTitle: "Overtraining vs Tired: Signs Runners Should Not Ignore",
    title:
      "Overtraining Recognition for Runners: When 'Push Through' Becomes a Problem",
    excerpt:
      "Persistent slump, mood crash, and paces that won't budge despite rest often mean non-functional overreaching — not weak motivation. How recreational runners spot overload early and fix load before months disappear.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2026-12-02",
    readTime: "11 min",
    relatedSlugs: [
      "easy-runs-effort-heart-rate",
      "sleep-recovery-for-runners",
      "reds-low-energy-availability-runners",
      "comeback-after-running-break",
      "resting-heart-rate-runners",
      "heart-rate-variability-runners",
      "avoiding-injuries",
    ],
    closingQuestion:
      "What signal finally made you back off — sleep, mood, pace, or something a watch showed?",
    sources: [
      SOURCES.overtrainingSystematicReview2022,
      SOURCES.overtrainingScopingReview2021,
      SOURCES.overtrainingUnderstanding2024,
      SOURCES.ecssAcsmOvertrainingConsensus2012,
      SOURCES.redS,
      SOURCES.sleepTips,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "What's the difference between tired and overtrained?",
        answer:
          "Normal fatigue improves with a few easy days or a lighter week. Non-functional overreaching lasts weeks with stagnant or worsening performance despite rest. Full overtraining syndrome can take months — ECSS/ACSM consensus frames the key difference as duration of maladaptation after adequate recovery.",
      },
      {
        question: "Can beginners overtrain?",
        answer:
          "Yes — usually via too much too soon, all medium-hard days, or stacking life stress on top of new mileage. You don't need elite volume to hit non-functional overreaching.",
      },
      {
        question: "Does a high resting heart rate mean overtraining?",
        answer:
          "A sustained rise above your baseline can be one data point — especially with poor sleep and heavy load — but no single marker diagnoses overtraining. Trends plus mood, performance, and recovery matter more than one morning reading.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Run culture rewards the gray zone: not injured enough to stop, not fresh enough to improve. That limbo has names in sports medicine — **functional overreaching** (short dip, then bounce back), **non-functional overreaching** (weeks of stale legs), and **overtraining syndrome** (prolonged underperformance even after rest).",
          "A 2022 systematic review in the *International Journal of Sports Physiology and Performance* notes OTS is often defined retrospectively — performance stays down for weeks or months despite recovery, usually with mood disturbance. There is no single blood test beginners should obsess over.",
          "**Educational only — not medical advice.** Depression, thyroid disease, anemia, and infection can mimic overtraining. Persistent exhaustion, chest symptoms, or disordered eating need clinical care — not another deload guess.",
        ],
      },
      {
        id: "signs",
        heading: "Signs recreational runners actually notice",
        list: [
          "Easy pace feels hard for **two or more weeks** despite cutting intensity",
          "Resting heart rate or HRV drifted away from baseline for many days",
          "Sleep is long but unrefreshing; irritability or apathy toward running",
          "Minor niggles multiply; old injuries whisper constantly",
          "Motivation collapse that feels biochemical, not lazy",
          "Needing longer warm-ups just to feel human",
        ],
      },
      {
        id: "fix",
        heading: "Fix the load error early",
        list: [
          "One full week mostly off or walk-only — not 'easy jogging through it'",
          "Rebuild with [easy effort](/blog/easy-runs-effort-heart-rate) only; add intensity only after easy feels boring",
          "Audit life stress, sleep, and fuel — [REDs](/blog/reds-low-energy-availability-runners) masquerades as overtraining",
          "Keep a simple log: weekly minutes, how many runs were truly easy, mood 1–5",
          "If no improvement after 2–3 weeks of real rest, see a clinician",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Overtraining recognition is mostly pattern recognition: performance and mood stuck down while load stayed up. Rest first, fuel honestly, rebuild slower — pride keeps more runners broken than genetics do.",
        ],
        cta: { text: "Sleep & recovery primer", href: "/blog/sleep-recovery-for-runners" },
      },
    ],
  },
  {
    slug: "side-stitch-running",
    metaTitle: "Side Stitch While Running: Causes & Quick Fixes",
    title: "Side Stitches While Running: What They Are and What Usually Helps",
    excerpt:
      "That sharp pain under your ribs isn't a mystery badge of toughness. Breathing rhythm, timing of food, and pace spikes explain most side stitches — and when to rule out something else.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2026-12-09",
    readTime: "8 min",
    relatedSlugs: [
      "runners-gi-distress",
      "breathing-while-running",
      "training-lungs-for-running",
      "nutrition-for-runners",
      "easy-runs-effort-heart-rate",
    ],
    closingQuestion: "What fixed your stitches first — slowing down, exhaling longer, or changing pre-run food?",
    sources: [
      SOURCES.exerciseRelatedTransientAbdominalPain2014,
      SOURCES.diaphragmaticBreathingMayo,
      SOURCES.runningNutrition,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "What causes a side stitch?",
        answer:
          "Exercise-related transient abdominal pain (ETAP) — the medical term for side stitch — is linked to intense or irregular breathing, posture, and GI factors in many runners. Exact mechanism is still debated; practical triggers include starting too fast, shallow breathing, and running too soon after a large meal.",
      },
      {
        question: "Should I keep running through a side stitch?",
        answer:
          "Slow down first. Deepen the exhale (some runners exhale as the foot on the opposite side strikes). Press the area gently while easing pace. Sprinting through sharp pain rarely helps.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Side stitches are common in beginners and in speed sessions — a localized stab under the ribs that makes you gasp and grab your side. They're usually **exercise-related transient abdominal pain (ETAP)**, not a organ emergency.",
          "For GI-heavy symptoms (urgency, nausea, full-belly pain), see the broader [runner's GI distress guide](/blog/runners-gi-distress). This post is the focused stitch playbook.",
        ],
      },
      {
        id: "triggers",
        heading: "Common triggers",
        list: [
          "Starting too fast before breathing settles",
          "Shallow, rapid chest breathing",
          "Large or high-fat meal within 1–2 hours pre-run",
          "Sugary drink or new gel on an empty gut",
          "Downhill or track intervals without warm-up",
        ],
      },
      {
        id: "fixes",
        heading: "What usually helps in the moment",
        list: [
          "Slow pace until you can speak in sentences",
          "Lengthen exhale — try 3 steps in, 3–4 steps out",
          "Gentle pressure on the painful spot while jogging lightly",
          "Raise the arm on the stitch side briefly while exhaling",
          "Walk until it releases, then restart easy",
        ],
      },
      {
        id: "prevent",
        heading: "Prevention habits",
        list: [
          "Gradual warm-up — don't jump to goal pace from the door",
          "Light, familiar pre-run food; practice race fuel on easy long runs",
          "Most weekly runs truly easy ([effort guide](/blog/easy-runs-effort-heart-rate))",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Side stitches respond to boring fixes: slow down, breathe out longer, fix meal timing. Persistent or worsening abdominal pain — especially with fever, vomiting, or localized rebound tenderness — needs a clinician, not another lap.",
        ],
      },
    ],
  },
  {
    slug: "walking-for-fitness-without-running",
    metaTitle: "Walk-Only Fitness: Build Health Without Running Yet",
    title:
      "Walking for Fitness (Without Running Yet): A Valid Path, Not a Shortcut",
    excerpt:
      "You don't have to run to be 'a runner in training.' Brisk walking counts toward health guidelines, builds habit, and prepares joints for walk-run when you're ready.",
    category: "Getting Started",
    author: AUTHOR,
    publishedAt: "2026-12-16",
    readTime: "9 min",
    relatedSlugs: [
      "why-walking-is-not-cheating",
      "none-to-run-gentle-beginners",
      "never-ran-where-to-start",
      "building-a-running-habit",
      "beginner-running-a-to-z",
      "avoiding-injuries",
    ],
    closingQuestion: "Did you start with walking only — and when did run intervals feel optional instead of mandatory?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.physicalActivityGuidelines,
      SOURCES.preParticipationScreening,
    ],
    faq: [
      {
        question: "Is walking 'enough' exercise?",
        answer:
          "U.S. Physical Activity Guidelines recommend at least 150 minutes per week of moderate-intensity activity — brisk walking qualifies. Health benefits are real even if you never jog.",
      },
      {
        question: "When should I add running?",
        answer:
          "When walk intervals feel easy, joints tolerate impact, and you want more cardiovascular challenge — often after weeks of consistent walking. [None-to-run](/blog/none-to-run-gentle-beginners) and [why walking isn't cheating](/blog/why-walking-is-not-cheating) help the transition.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Run culture treats walking like a consolation prize. Physiology disagrees. Brisk walking is moderate aerobic work — it counts toward the **150 minutes per week** target in U.S. guidelines and builds the habit loop that keeps people moving for decades.",
          "Some beginners should walk-only first: high BMI with joint sensitivity, post-injury return, cardiac clearance that limits impact, or simply preference. Running can wait; quitting because you forced impact too early cannot be undone with pride.",
        ],
      },
      {
        id: "how-much",
        heading: "How much walking moves the needle",
        list: [
          "Aim for **30 minutes brisk walking, 5 days/week** — or shorter bouts that add up",
          "Brisk = you can talk but not sing; slight breathlessness",
          "Include hills or stairs gradually for leg strength without pounding",
          "Track consistency, not speed — streaks beat hero walks",
        ],
      },
      {
        id: "to-run",
        heading: "Walk → walk-run when ready",
        list: [
          "Add 30–60 second jogs inside walks once walking feels easy for 30+ minutes",
          "Keep jogs conversational; return to walk before form falls apart",
          "Use a free plan or [beginner map](/blog/beginner-running-a-to-z) — don't skip straight to 5K ego pace",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Walk-only fitness is not failing the sport — it's respecting the entry ramp. The best runner is the one still showing up next year.",
        ],
        cta: { text: "Start a free plan when ready", href: "/plan/5k-gentle-16w" },
      },
    ],
  },
  {
    slug: "morning-vs-evening-running",
    metaTitle: "Morning vs Evening Runs: What Actually Matters",
    title: "Morning vs Evening Running: Schedule Honesty Beats Biology Debates",
    excerpt:
      "Circadian performance differences are real but small for most beginners. The best time to run is when you'll actually go — with heat, safety, and sleep as tiebreakers.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-12-23",
    readTime: "8 min",
    relatedSlugs: [
      "building-a-running-habit",
      "workplace-lunch-run",
      "hot-weather-running-hub",
      "night-running-safety",
      "sleep-recovery-for-runners",
      "easy-runs-effort-heart-rate",
    ],
    closingQuestion: "Are you a morning runner by choice or by calendar hostage?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.sleepTips,
      SOURCES.heatSafety,
    ],
    faq: [
      {
        question: "Is morning or evening better for performance?",
        answer:
          "Lab studies often show slightly better strength and power later in the day, but recreational running improvements come from consistency, not optimizing circadian peaks. The slot you keep matters more than forum biology.",
      },
      {
        question: "Will evening runs ruin sleep?",
        answer:
          "Most people tolerate moderate evening runs fine if they finish 1–2+ hours before bed. Very late intense sessions or caffeine pre-workouts can disrupt sleep — track your own pattern.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Morning versus evening debates fill running forums. For beginners, the winner is almost always **the time you reliably show up** — not the hour with a 2% lab performance edge.",
        ],
      },
      {
        id: "morning",
        heading: "Morning pros and cons",
        list: [
          "Pros: done before life hijacks the day; cooler in summer; quieter roads",
          "Cons: stiff muscles — longer warm-up; dark in winter ([night safety](/blog/night-running-safety)); skimping sleep to alarm early",
        ],
      },
      {
        id: "evening",
        heading: "Evening pros and cons",
        list: [
          "Pros: body often feels less creaky; social run clubs; de-stress after work",
          "Cons: heat peaks in summer; willpower fatigue; family time competition",
          "Midday option: [workplace lunch run](/blog/workplace-lunch-run)",
        ],
      },
      {
        id: "rules",
        heading: "Decision rules that beat ideology",
        list: [
          "Pick **three consistent slots** per week over perfect optimization",
          "Protect sleep — cutting rest to run early backfires in weeks",
          "Summer: morning or shaded evening; winter: light and visibility first",
          "Hard workouts when you're alert; easy days can be whichever time is calmest",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Morning people aren't morally superior; evening people aren't lazy. Calendar honesty wins.",
        ],
      },
    ],
  },
  {
    slug: "headphones-safety-running",
    metaTitle: "Running With Headphones: Safety & Awareness Guide",
    title: "Headphones While Running: Enjoy the Playlist Without Losing Situational Awareness",
    excerpt:
      "Music helps many beginners finish miles — but cars, bikes, dogs, and other runners need your ears. Practical rules for roads, trails, tracks, and races.",
    category: "Tips",
    author: AUTHOR,
    publishedAt: "2026-12-30",
    readTime: "9 min",
    relatedSlugs: [
      "night-running-safety",
      "runner-etiquette-trails-roads-track",
      "gps-watch-vs-no-watch",
      "first-run-tips",
      "dog-running-guide",
    ],
    closingQuestion: "Do you run open-ear, one bud, or phone-only — and has that changed after a close call?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.preParticipationScreening,
    ],
    faq: [
      {
        question: "Is it safe to run with headphones?",
        answer:
          "It can be, with context. Shared roads, dim light, and busy paths need more auditory awareness. Open-ear bone conduction, one earbud out, or lower volume reduce risk compared with noise-canceling isolation on busy routes.",
      },
      {
        question: "Are headphones allowed in races?",
        answer:
          "Many races discourage or ban headphones on courses with vehicle traffic or narrow trails — check the entrant guide. Some allow open-ear devices; others ban all audio.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Headphones aren't a character test — they're a trade-off between motivation and sensory input. For beginners, music or podcasts often bridge the awkward first months. The goal is keeping the playlist **without** missing the cyclist, dog, or car that needed a half-second of your attention.",
        ],
      },
      {
        id: "risk",
        heading: "Where ears matter most",
        list: [
          "Road shoulders and crosswalks — assume drivers don't see you",
          "Multi-use paths — bikes approach from behind",
          "Trails — runners, horses, wildlife",
          "Night or pre-dawn — see [night running safety](/blog/night-running-safety)",
          "Track workouts in shared lanes — listen for lap calls",
        ],
      },
      {
        id: "rules",
        heading: "Practical safety rules",
        list: [
          "**One earbud out** on roads, or use open-ear/transparency mode",
          "Volume low enough to hear your footfalls and surroundings",
          "Pause audio at every crossing; look, then go",
          "No noise-canceling on shared routes",
          "Phone-only (no headphones) is valid — especially while learning routes",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Keep the joy; adjust the setup to the environment. Silence isn't purist — it's sometimes the safest gear choice.",
        ],
      },
    ],
  },
  {
    slug: "air-quality-pollution-running",
    metaTitle: "Running in Smoke, Pollen & Poor Air Quality (AQI Guide)",
    title: "Air Quality, Pollen & Smoke: When to Run Outside (and When to Swap Indoors)",
    excerpt:
      "Wildfire smoke, ozone spikes, and pollen season don't require quitting — but they do require checking the AQI, adjusting intensity, and knowing when treadmill beats heroics.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2027-01-06",
    readTime: "10 min",
    relatedSlugs: [
      "running-in-bad-weather",
      "hot-weather-running-hub",
      "treadmill-indoor-winter-running",
      "breathing-while-running",
      "training-lungs-for-running",
    ],
    closingQuestion: "What finally made you check AQI — a smoky sky, asthma flare, or a post-run cough?",
    sources: [
      SOURCES.airPollutionPhysicalActivity2024,
      SOURCES.whoAirPollutionPersonalActions2024,
      SOURCES.acsmAirQualityOutdoorExercise,
      SOURCES.airPollutionSportsPerformance2025,
      SOURCES.exerciseInducedAsthma,
      SOURCES.heatSafety,
    ],
    faq: [
      {
        question: "What AQI is safe for running?",
        answer:
          "U.S. EPA categories: green (0–50) is generally fine for outdoor exercise. Yellow (51–100) may bother sensitive lungs — reduce intensity. Orange (101+) often warrants moving indoors or shortening easy runs. Red (151+) — skip outdoor hard efforts. Individual asthma or heart conditions need stricter personal rules.",
      },
      {
        question: "Do the health benefits of running outweigh pollution?",
        answer:
          "For short-term moderate pollution exposure, UK COMEAP and ACSM note long-term activity benefits often outweigh brief elevated exposure for many healthy adults — but reducing intensity, timing, and route choice still matters. On very high smoke days, indoor movement wins.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "You breathe far more air per minute while running than while sitting — so air quality hits athletes harder on bad days. A 2024 review in *Eco-Environment & Health* frames the trade-off between pollution exposure and physical activity as a public-health balancing act, not a binary 'never run outside.'",
          "WHO 2024 guidance on personal actions recommends checking local air-quality forecasts, favoring green spaces away from traffic, and easing or stopping if cough, chest tightness, or wheeze appears.",
          "**Educational only.** Asthma, COPD, pregnancy, and heart disease may need stricter thresholds — follow your clinician's plan.",
        ],
      },
      {
        id: "check",
        heading: "Check before you lace up",
        list: [
          "U.S.: [AirNow.gov](https://www.airnow.gov) AQI for your ZIP",
          "Watch for wildfire smoke plumes even when local AQI lags",
          "Pollen counts if you have allergies — antihistamines may help; hard efforts still irritate",
          "Ozone often peaks afternoon — morning can be cleaner in summer",
        ],
      },
      {
        id: "adjust",
        heading: "Adjust, don't cancel the habit",
        list: [
          "AQI yellow: easy runs only; skip intervals",
          "AQI orange: indoor treadmill/bike or walk indoors",
          "AQI red/purple: rest or indoor low-intensity — don't 'tough out' smoke",
          "Route away from rush-hour traffic tunnels",
          "See [bad weather hub](/blog/running-in-bad-weather) and [treadmill guide](/blog/treadmill-indoor-winter-running)",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Air quality is a dial, not a veto on fitness. Check the index, move intensity indoors when needed, and treat respiratory symptoms as stop signals — not weakness.",
        ],
      },
    ],
  },
  {
    slug: "sports-bra-guide-runners",
    metaTitle: "Sports Bra Guide for Runners: Support, Fit & Less Pain",
    title: "Sports Bras for Runners: Support Is Gear, Not Vanity",
    excerpt:
      "Breast pain and bounce keep many women off the path. What research says about support, fit checks, and bra types for easy runs versus long efforts.",
    category: "Gear",
    author: AUTHOR,
    publishedAt: "2027-01-13",
    readTime: "10 min",
    relatedSlugs: [
      "running-guide-for-women",
      "what-to-wear-running",
      "chafing-blisters-running",
      "beginner-gear-guide-under-50",
      "avoiding-injuries",
    ],
    closingQuestion: "Did the right bra change how far you were willing to run?",
    sources: [
      SOURCES.sportsBraPhysicalActivityMeta2024,
      SOURCES.breastSupportBiomechanics2020,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "Do sports bras really matter for running?",
        answer:
          "Yes. A 2024 systematic review and meta-analysis in the *Journal of Women's Sports Medicine* found sports bras associated with significantly less exercise-induced breast pain than standard bras during activity — and larger breast size linked to more pain and movement without adequate support.",
      },
      {
        question: "Compression vs encapsulation?",
        answer:
          "Compression bras press tissue against the chest — often fine for smaller sizes on easy runs. Encapsulation styles support each breast separately — many runners prefer them for longer or faster efforts. Combination designs exist for higher impact.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Breast support is performance equipment. Reviews estimate large fractions of active women report **exercise-induced breast pain** despite wearing bras — often a fit or support-level problem, not a reason to quit running.",
          "Biomechanics research (McGhee & Steele, 2020) notes excessive breast motion during running contributes to pain and can alter upper-body mechanics — good support reduces that load.",
        ],
      },
      {
        id: "fit",
        heading: "Fit checklist (home mirror test)",
        list: [
          "Band provides **80% of support** — snug on the loosest hook; two-finger fit",
          "Straps adjust without digging; you shouldn't need to hitch shoulders constantly",
          "Minimal bounce when you jump in place — not zero movement, but controlled",
          "No chafing at seams; nipple coverage without sandpaper fabric",
          "Rethink fit after weight change, pregnancy, or nursing",
        ],
      },
      {
        id: "when",
        heading: "Match bra to the run",
        list: [
          "Easy 30 minutes: moderate-support may suffice",
          "Long runs / downhills / speed: high-support encapsulation or hybrid",
          "Nursing: clip access + extra support; feed or pump before long efforts",
          "Pair with [chafing prevention](/blog/chafing-blisters-running) — sports-bra line is a common hot spot",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "If pain or embarrassment kept you from running, fix the bra before you fix your pace. Support is health infrastructure — cite the 2024 meta-analysis to anyone who calls it frivolous.",
        ],
        cta: { text: "Women's running guide", href: "/blog/running-guide-for-women" },
      },
    ],
  },
  {
    slug: "running-burnout-overtraining-mental-health",
    metaTitle: "Running Burnout & Mental Health: When Miles Stop Helping",
    title:
      "Running Burnout: When the Sport You Loved Starts to Feel Like a Job",
    excerpt:
      "Dread, guilt, and all-gray-zone training aren't always 'mental weakness.' How burnout overlaps with overtraining, REDs, and depression — and how to rebuild joy without quitting movement.",
    category: "Mindset",
    author: AUTHOR,
    publishedAt: "2027-01-20",
    readTime: "12 min",
    relatedSlugs: [
      "mental-side-of-running",
      "overtraining-recognition-runners",
      "reds-low-energy-availability-runners",
      "off-season-between-training-plans",
      "race-anxiety-nerves",
      "running-beyond-the-numbers",
      "comeback-after-running-break",
    ],
    closingQuestion: "Have you taken a joy-first break that saved your relationship with running?",
    sources: [
      SOURCES.overtrainingSystematicReview2022,
      SOURCES.overtrainingUnderstanding2024,
      SOURCES.redS,
      SOURCES.anxietyDisorders,
      SOURCES.sleepTips,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "Is running burnout the same as overtraining?",
        answer:
          "They overlap. Overtraining emphasizes physiological maladaptation and performance decline; burnout emphasizes psychological exhaustion, cynicism toward running, and lost sense of accomplishment. Both need load reduction — burnout may persist even when legs feel fine if pressure and identity are the drivers.",
      },
      {
        question: "Should I take a complete break?",
        answer:
          "Sometimes yes — a true off-season with other movement (walk, yoga, strength) can reset identity. If mood symptoms are severe, persistent, or include self-harm thoughts, seek mental-health care immediately — not just a lighter training week.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Running started as relief and became another inbox: metrics, streaks, comparison, guilt on rest days. That's **burnout** — not a character flaw.",
          "Sports-medicine literature on overtraining consistently includes **mood disturbance** alongside performance decline (Weakley et al., 2022 systematic review). Burnout sits at that intersection plus identity pressure — especially when every easy day secretly races Strava.",
          "**Educational only — not mental-health treatment.** Depression, anxiety disorders, and eating disorders need qualified care. If you're struggling to function outside running, please reach out to a professional.",
        ],
      },
      {
        id: "signs",
        heading: "Burnout signals beyond 'lazy'",
        list: [
          "Dreading runs you used to enjoy — especially easy days",
          "Irritability when training is disrupted; guilt on rest",
          "All runs feel medium-hard — no true easy, no joyful hard",
          "Constant comparison to past self or social feeds",
          "Identity collapse if you miss a day ('I'm not a runner anymore')",
        ],
      },
      {
        id: "fix",
        heading: "Rebuild joy without abandoning health",
        list: [
          "Structured off-season: [between plans guide](/blog/off-season-between-training-plans)",
          "Delete or mute feeds that trigger comparison — [beyond the numbers](/blog/running-beyond-the-numbers)",
          "Run without watch days; meet a friend for conversational miles",
          "Cross-train until running sounds appealing again",
          "Screen for [overtraining](/blog/overtraining-recognition-runners) and [under-fueling](/blog/reds-low-energy-availability-runners) in parallel",
        ],
      },
      {
        id: "help",
        heading: "When to get professional help",
        list: [
          "Persistent low mood most days for two+ weeks",
          "Loss of interest in most activities, not just running",
          "Sleep or appetite major shifts; panic or hopelessness",
          "Disordered eating patterns tied to training",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Burnout is a signal to change the relationship — volume, pressure, or identity — not proof running failed you. The goal is a sustainable decades-long habit, not a heroic quarter.",
        ],
        cta: { text: "Mental side of running", href: "/blog/mental-side-of-running" },
      },
    ],
  },
];
