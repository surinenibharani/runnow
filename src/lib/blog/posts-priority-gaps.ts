import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Priority gap-fill posts from content analysis:
 * First 10K → Comeback after a break → Easy runs by effort/HR →
 * Shin splints → Runner's knee.
 */
export const priorityGapPosts: BlogPost[] = [
  {
    slug: "training-first-10k",
    metaTitle: "First 10K Training Guide for Beginners",
    title: "Training for Your First 10K: The Bridge Between 5K and Half",
    excerpt:
      "6.2 miles is the sweet next goal after a 5K — long enough to feel like a leap, short enough to train without marathon-level volume. Here's how to build up safely.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-08-04",
    readTime: "9 min",
    relatedSlugs: [
      "training-first-5k",
      "training-first-half-marathon",
      "race-day-tips",
      "race-taper-guide",
      "how-to-pace-yourself",
      "easy-runs-effort-heart-rate",
      "nutrition-for-runners",
    ],
    closingQuestion:
      "Are you eyeing a first 10K this year — or stuck deciding between another 5K and jumping straight to a half?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.runningNutrition,
      SOURCES.acsmExercisePrescription2009,
    ],
    faq: [
      {
        question: "How long does it take to train for a first 10K?",
        answer:
          "Most runners who can already finish a 5K need 6–10 weeks. If you can jog 30 minutes continuously, an 8-week build is a solid default. True beginners should finish a 5K plan first.",
      },
      {
        question: "Do I need to run 10K in training before race day?",
        answer:
          "Ideally yes — or get within about a mile of it on a long run. Hitting 5.5–6.5 miles at easy pace once or twice before race week builds confidence without requiring a full-distance dress rehearsal every weekend.",
      },
      {
        question: "Is a 10K harder than a 5K?",
        answer:
          "Yes in duration and fueling, but the pacing is often more forgiving than a hard 5K. Most first-timers race a 10K closer to 'steady' than 'all-out,' which makes it a great learning race.",
      },
      {
        question: "Can I use walk breaks in a 10K?",
        answer:
          "Absolutely. Planned walk breaks (or a walk-run approach) are smart training and valid race strategy — especially on hills or in heat. Finishing strong beats dying for continuous running glory.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** Stop for chest pain, fainting, or unusual breathlessness, and get clinical guidance if you have chronic conditions before hard sessions.",
          "A 5K teaches you that you can finish. A half marathon asks you to rearrange your weekends. The **10K (6.2 miles)** sits in the middle — long enough to feel like a real step up, short enough that three good runs a week still fit a normal life.",
          "If you've finished a 5K (or can jog about 30 minutes without stopping), you're ready to start a 10K build. If you're still walking most of your sessions, [finish a beginner 5K plan](/blog/training-first-5k) first — the 10K will wait.",
        ],
      },
      {
        id: "prerequisites",
        heading: "Are you ready for 10K training?",
        list: [
          "You can complete a 5K (race or time trial) without feeling wrecked for three days",
          "You run or walk-run 3 days per week most weeks",
          "No sharp pain that changes your gait",
          "You're willing to keep most runs easy while the long run grows",
        ],
        paragraphs: [
          "If you're coming back after months off, use the [comeback guide](/blog/comeback-after-running-break) before stacking 10K volume. Fitness fades; tendons need a ramp.",
        ],
      },
      {
        id: "timeline",
        heading: "How many weeks do you need?",
        list: [
          "6 weeks — you already run 4–5 miles on long days and want a short peak for a nearby race",
          "8 weeks — best default for most first-timers after a 5K",
          "10 weeks — if your longest run is still under 3.5 miles, or life is chaotic and you want buffer weeks",
        ],
        paragraphs: [
          "Use LetsRunNow's free [8-week 10K plan](/plan?plan=10k-8w) as the default after a 5K — or pick the [10-week](/plan?plan=10k-10w) or [6-week](/plan?plan=10k-6w) variant to match your timeline. Prefer a gentler start? Finish a [5K plan](/plan?plan=5k-8w) first, then switch families when you're ready.",
        ],
        cta: { text: "Open the free 10K plan", href: "/plan?plan=10k-8w" },
      },
      {
        id: "weekly-structure",
        heading: "What a typical 10K week looks like",
        list: [
          "Easy run — conversational, 20–40 minutes",
          "Rest or cross-train — bike, swim, yoga, or full rest",
          "Easy run or light quality — short strides or gentle hills only after base feels solid",
          "Rest day — real rest",
          "Optional easy jog or strength (hips, calves, core)",
          "Long run — the centerpiece; grows toward race distance",
          "Rest day",
        ],
        paragraphs: [
          "Three runs per week still works for many first 10Ks. A fourth easy day is optional once recovery feels easy. Don't add speed and mileage in the same week if you're new to the distance.",
        ],
      },
      {
        id: "long-run",
        heading: "Grow the long run without blowing up",
        paragraphs: [
          "The long run is how you earn the 10K. Keep it easy — same effort as an easy day, just longer. Walk breaks are fine. Hills are fine if you shorten the distance that week.",
          "A practical progression after a 5K base:",
        ],
        list: [
          "Week 1–2: longest run ~3.5–4 miles",
          "Week 3–4: ~4.5–5 miles",
          "Week 5–6: ~5.5–6 miles",
          "Week 7: ~6–6.5 miles (or race-week shorter long run)",
          "Race week: cut volume ~20–30%; keep a short easy shakeout",
          "If a week feels rough, repeat the previous long-run distance instead of forcing the jump",
        ],
      },
      {
        id: "pacing",
        heading: "Pacing: steadier than a 5K, smarter than a half",
        paragraphs: [
          "Most beginners race a 5K near the edge of 'hard.' A first 10K goes better when you start closer to 'steady' — you can talk in short phrases, not full podcast mode, but you're not gasping at mile one.",
          "Practice that feel on long runs. If you only know all-out or crawl, race day will surprise you. For more on keeping easy days easy, see [effort and heart rate](/blog/easy-runs-effort-heart-rate).",
        ],
        list: [
          "Miles 1–2: deliberately boring — let people pass you",
          "Miles 3–4: settle into sustainable rhythm",
          "Miles 5–6: only then ask 'can I nudge a little?'",
          "Final 0.2: whatever you've got left — you've earned it",
        ],
      },
      {
        id: "fueling",
        heading: "Fuel and fluid for 6.2 miles",
        paragraphs: [
          "Many runners finish a 10K on a normal breakfast and water. Still, practice race-morning food on a long-run day. Don't debut a new gel at the start line.",
        ],
        list: [
          "Eat a familiar carb-focused breakfast 2–3 hours before (or a smaller snack 60–90 minutes out)",
          "Sip water in the hours before; don't chug a liter at the start",
          "In heat or if you run over ~60–75 minutes, consider a small gel or sports drink mid-race — only if you've tried it in training",
          "Skip brand-new shoes, socks, or shorts on race day",
        ],
        cta: {
          text: "Runner's nutrition basics",
          href: "/blog/nutrition-for-runners",
        },
      },
      {
        id: "race-week",
        heading: "Race week and race day",
        list: [
          "Sleep beats secret workouts — protect the nights before",
          "Lay out bib, pins, shoes, and weather layers the night before",
          "Warm up 5–10 minutes easy + a few relaxed strides if you feel flat",
          "Line up by realistic pace, not pride",
          "Thank volunteers; grab water even if you 'feel fine' early",
        ],
        paragraphs: [
          "For the full race-day checklist across distances, see [race day tips](/blog/race-day-tips).",
        ],
      },
      {
        id: "after",
        heading: "After your first 10K",
        paragraphs: [
          "Celebrate. Then take an easy week — shorter runs, extra sleep, no sudden half-marathon signup the next morning unless your body (and calendar) are truly ready.",
          "A 10K is often the confidence bridge to [half marathon training](/blog/training-first-half-marathon). It's also a great forever distance if you love the middle ground. Either way, you just proved you can handle more than 3.1 miles — on purpose.",
        ],
      },
    ],
  },
  {
    slug: "comeback-after-running-break",
    metaTitle: "How to Start Running Again After a Break",
    title: "Coming Back to Running After a Break (Without Getting Hurt)",
    excerpt:
      "Fitness fades faster than ego. Whether you took three weeks or three years off, here's how to rebuild mileage so the comeback sticks — and the injuries don't.",
    category: "Getting Started",
    author: AUTHOR,
    publishedAt: "2026-08-22",
    readTime: "8 min",
    relatedSlugs: [
      "what-to-do-when-you-miss-a-run",
      "never-ran-where-to-start",
      "why-walking-is-not-cheating",
      "avoiding-injuries",
      "building-a-running-habit",
      "easy-runs-effort-heart-rate",
      "off-season-between-training-plans",
    ],
    closingQuestion:
      "What's the longest break you've taken from running — and what made coming back hardest?",
    sources: [
      SOURCES.preParticipationScreening,
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.shinSplints,
      SOURCES.patellofemoralPain,
    ],
    faq: [
      {
        question: "How long does it take to get running fitness back?",
        answer:
          "Aerobic fitness drops within weeks, but it returns faster than the first time you built it — if you respect tendons and start easier than your old paces. Expect several weeks to months depending on how long you were off and why.",
      },
      {
        question: "Should I jump back into my old training plan?",
        answer:
          "No. Use a shorter, easier restart for 2–4 weeks (or more after injury or a long layoff), then re-enter a plan at an earlier week. Matching old volume on week one is a common way comebacks end in shin or knee pain.",
      },
      {
        question: "Is walking okay when returning to running?",
        answer:
          "Yes — walk-run intervals are often the smartest comeback tool. Continuous running pride is how many returning runners get hurt in week two.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** This guide is for general education — it is not a diagnosis, treatment plan, or substitute for care from a qualified clinician.",
          "Missing one run is a scheduling problem. Coming back after weeks, months, or years is a different sport — your lungs may remember more than your shins do.",
          "This guide is for layoffs longer than a messy week: illness, travel, burnout, life, or injury. For a single skipped workout, see [what to do when you miss a run](/blog/what-to-do-when-you-miss-a-run). **If you stopped because of injury or a medical issue, get clearance before you rebuild.**",
        ],
      },
      {
        id: "honest-reset",
        heading: "Start with an honest reset (not your old Strava ego)",
        paragraphs: [
          "Your last PR and your current tissues are not the same person. Pace from 'how I used to feel' is how comebacks fail. Pace from 'can I finish feeling like I could do this again in two days?'",
        ],
        list: [
          "Delete or ignore old 'easy' paces for the first month",
          "Use time or talk-test effort, not race memories",
          "Expect walk breaks even if you 'never walked before'",
          "Count consistency for 3–4 weeks before chasing speed",
        ],
      },
      {
        id: "by-layoff-length",
        heading: "How long were you out?",
        list: [
          "1–2 weeks (travel, mild illness): drop volume ~30–50% for a week, keep intensity easy, then resume",
          "3–6 weeks: restart with walk-run or very easy continuous jogs; rebuild toward prior volume over 3–5 weeks",
          "2–6 months: treat yourself like an advanced beginner — 3 easy days/week, long run shorter than you 'should' be able to handle",
          "6+ months or post-injury: medical clearance if needed, then a true base rebuild (often 6–8+ weeks before old peak miles)",
        ],
        paragraphs: [
          "Pregnancy, surgery, or cardiac issues need personalized medical guidance — don't copy a generic schedule from the internet.",
        ],
      },
      {
        id: "first-two-weeks",
        heading: "A simple first two weeks",
        paragraphs: [
          "Keep it almost insultingly easy. The goal is tendon load and habit, not fitness bragging rights.",
        ],
        list: [
          "3 sessions per week, with at least one full rest day between runs",
          "20–30 minutes total moving time (walk-run is ideal)",
          "Example: 1–2 min jog, 1–2 min walk, repeat",
          "Flat routes; skip hills, track repeats, and group race-pace runs",
          "Stop for sharp pain, limping, or pain that worsens as you go",
        ],
        cta: {
          text: "Start a gentle free plan when you're ready",
          href: "/plan?plan=5k-8w",
        },
      },
      {
        id: "rebuild-rules",
        heading: "Rebuild rules that actually prevent injury",
        list: [
          "Increase total weekly running time by roughly 10% or less once the current level feels easy",
          "Only add one stressor at a time — volume or intensity or hills, not all three",
          "Keep most runs conversational ([effort / HR guide](/blog/easy-runs-effort-heart-rate))",
          "Sleep and food are training — under-eating on a comeback invites bone and tendon trouble",
          "Two short strength sessions (hips, calves, core) beat random FOMO miles",
        ],
        paragraphs: [
          "Watch for early warning signs: shin pain that lingers after runs, kneecap ache on stairs, morning Achilles stiffness that worsens week to week. Back off early — see [injury prevention](/blog/avoiding-injuries), [shin splints](/blog/shin-splints-running), and [runner's knee](/blog/runners-knee-running).",
        ],
      },
      {
        id: "mindset",
        heading: "The mental side of a comeback",
        paragraphs: [
          "Shame is a terrible coach. You didn't 'fall off.' You lived a life that temporarily didn't include running. The runners who last are the ones who re-enter without turning week one into a redemption arc.",
          "Measure success by show-ups for a month. Speed returns after consistency. If comparison on social media ruins your easy days, mute it until your base is back.",
        ],
        list: [
          "Pick a short horizon: 'four easy weeks' beats 'get my old marathon shape back by October'",
          "Tell one supportive person your plan — accountability without a crowd",
          "Celebrate boring weeks; boring is how bases are built",
        ],
      },
      {
        id: "when-to-progress",
        heading: "When to progress back into 'real' training",
        list: [
          "You've completed 3+ weeks of easy running without lingering pain",
          "Easy pace feels easier than week one (even if the watch disagrees)",
          "You can finish sessions wanting to do a little more — and you don't",
          "Sleep and mood aren't crashing after every run",
        ],
        paragraphs: [
          "You're ready to rejoin a structured plan (or an earlier week of your old one) when the checklist above is true.",
          "Then pick the next goal honestly: another [5K](/blog/training-first-5k), a first [10K](/blog/training-first-10k), or simply the habit of showing up. The best comeback is the one you can still be doing in six months.",
        ],
      },
    ],
  },
  {
    slug: "easy-runs-effort-heart-rate",
    metaTitle: "Easy Runs by Effort and Heart Rate for Beginners",
    title: "Easy Runs by Effort and Heart Rate (So Easy Days Stay Easy)",
    excerpt:
      "Pace lies. Heat, stress, and hills make the same 'easy' mile feel different. Learn the talk test, RPE, and simple heart-rate guardrails so most of your training actually builds your base.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-07-25",
    readTime: "8 min",
    relatedSlugs: [
      "earn-hard-runs-by-running-easy",
      "how-to-pace-yourself",
      "run-workouts-hills-intervals-fartlek-track",
      "breathing-while-running",
      "training-first-5k",
      "training-first-10k",
      "building-a-running-habit",
      "train-runners-heart-metrics",
    ],
    closingQuestion:
      "Do you trust effort, heart rate, or pace most on easy days — and which one has lied to you before?",
    sources: [
      SOURCES.heartRateZones,
      SOURCES.acsmExercisePrescription2009,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "What heart rate zone should easy runs be in?",
        answer:
          "Many coaches aim for roughly Zone 2 — often about 60–70% of max heart rate, or a conversational effort. Formulas are estimates; the talk test is more reliable for beginners than a perfect number.",
      },
      {
        question: "Why is my easy-run heart rate so high?",
        answer:
          "Heat, humidity, caffeine, poor sleep, stress, dehydration, hills, and being new to running all raise HR at the same pace. Slow down or walk until breathing feels conversational — don't chase an old pace.",
      },
      {
        question: "Do I need a heart rate watch to train easy?",
        answer:
          "No. The talk test and perceived effort work without gadgets. A watch helps curious runners spot patterns, especially once Strava or a dashboard shows zone time — but effort comes first.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Beginners often do every run at 'kinda hard.' It feels productive. It also stalls aerobic development and loads injury risk onto legs that never get true easy stimulus.",
          "Easy running is the boring superpower: most of your weekly minutes should feel like you could chat, breathe through your nose at times, and finish wanting a little more. Pace is optional. Effort is not.",
          "**Educational only — not medical advice.** Heart-rate formulas are estimates; chest pain, fainting, or concerning breathlessness need clinical care, not a harder easy day.",
        ],
      },
      {
        id: "talk-test",
        heading: "Start with the talk test (no watch required)",
        list: [
          "Easy: full sentences, maybe a short story — this is most training",
          "Steady / moderate: short phrases only — use sparingly",
          "Hard: a few words — save for planned intervals or short race efforts",
          "Too hard for easy day: can't speak without gasping — walk or slow down now",
        ],
        paragraphs: [
          "If you're gasping on 'easy' day, you're not proving fitness — you're turning recovery into junk stress. Slow down. Walking is allowed. See also [how to pace yourself](/blog/how-to-pace-yourself) and [breathing while running](/blog/breathing-while-running).",
        ],
      },
      {
        id: "rpe",
        heading: "RPE: rate of perceived exertion",
        paragraphs: [
          "Rate effort from 1–10. Easy runs live around **3–4**. Long runs stay in that band even when the miles add up. Tempo might be 6–7. Intervals spike higher with full recovery between.",
          "RPE accounts for heat and life stress better than a frozen pace goal. On rough-sleep days, the same RPE 3 might be 60–90 seconds per mile slower — that's correct training, not failure.",
        ],
      },
      {
        id: "heart-rate",
        heading: "Heart rate: useful guardrails, imperfect gospel",
        paragraphs: [
          "Heart rate rises with intensity — and with everything else. Mayo Clinic and similar guides often describe moderate aerobic work around **50–70% of maximum heart rate**, with vigorous work higher. Many running coaches call easy aerobic work **Zone 2** (ballpark 60–70% max for some formulas).",
          "A crude max-HR estimate is 220 − age — fine for ballparks, wrong for individuals. Medications, caffeine, and heat scramble the number further. Use HR as a **check**, not a courtroom.",
          "On LetsRunNow, if you sync activities and add age (and resting HR when you have it), the dashboard can show heart-rate zone context — still pair it with how the run felt.",
        ],
        list: [
          "If talk test says easy but HR is sky-high in heat — believe the talk test; slow down or shorten",
          "If pace feels easy but HR is low — great; don't speed up just to hit a zone",
          "Chest straps are steadier than some wrist optical sensors during arm swing",
          "Give watches 5–10 minutes to settle after you start",
        ],
        cta: { text: "Open your dashboard", href: "/dashboard" },
      },
      {
        id: "pace-vs-effort",
        heading: "When to use pace vs effort vs HR",
        list: [
          "Easy & long runs: effort / talk test first; HR as optional ceiling; pace last",
          "Track intervals or goal-pace work: pace or effort by design; HR will lag",
          "Hills & trails: effort or HR; pace is mostly noise",
          "Races: practiced effort + simple pace plan — don't stare at HR mile one",
        ],
        paragraphs: [
          "Different [run types](/blog/run-workouts-hills-intervals-fartlek-track) need different dials. The mistake is using 5K race pace energy on Tuesday's recovery jog.",
        ],
      },
      {
        id: "why-easy-feels-too-slow",
        heading: "Why easy feels 'too slow' (and why that's the point)",
        paragraphs: [
          "Culture sells suffering. Easy running builds the aerobic engine that makes hard days possible later. If strangers pass you, good — you're training, not auditioning.",
          "A practical rule: **most weeks, the majority of your running minutes should be easy.** One quality session is plenty for beginners. Two is a lot. Seven 'kinda hard' days is a plan for burnout.",
        ],
      },
      {
        id: "troubleshooting",
        heading: "Troubleshooting high heart rate on easy days",
        list: [
          "Hot or humid? Slow down 30–90+ sec/mile or walk more — same effort, different pace",
          "Bad sleep or high stress? Shorten the run; keep it truly easy",
          "New to running? Your HR may sit higher for months; patience beats panic",
          "Caffeine right before? Expect a bump",
          "Watch glitching? Cross-check with breathing; don't surge to 'fix' the graph",
        ],
        paragraphs: [
          "Chest pain, unusual breathlessness, dizziness, or palpitations that feel wrong are not training puzzles — **stop and get medical help.**",
        ],
      },
      {
        id: "practice",
        heading: "A one-week practice plan",
        list: [
          "Run 1: 20–30 min easy by talk test only (leave the pace screen hidden)",
          "Run 2: same, optionally glance at HR afterward — not during",
          "Run 3: long easy — if you can't talk by the end, you started too fast",
          "Note one sentence after each: 'felt easy / okay / too hard' — build your personal dictionary",
        ],
        paragraphs: [
          "Master this and every plan on the site works better — [5K](/blog/training-first-5k), [10K](/blog/training-first-10k), and beyond — because the easy days finally do their job.",
        ],
        cta: { text: "Pick a free plan", href: "/plan" },
      },
    ],
  },
  {
    slug: "shin-splints-running",
    metaTitle: "Shin Splints from Running: Causes, Recovery & Prevention",
    title: "Shin Splints from Running: What Helps, What Doesn't, and When to Worry",
    excerpt:
      "Pain along the inner shin is one of the most common beginner setbacks. Learn what shin splints usually mean, how to calm them down, and how to keep them from returning when you rebuild.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2026-07-18",
    readTime: "8 min",
    relatedSlugs: [
      "avoiding-injuries",
      "runners-knee-running",
      "stress-fracture-running",
      "choosing-running-shoes",
      "bodyweight-strength-for-runners",
      "comeback-after-running-break",
      "plantar-fasciitis-running",
    ],
    closingQuestion:
      "Have shin splints ever sidelined your training — what finally helped you get back?",
    sources: [
      SOURCES.shinSplints,
      SOURCES.stressFracture,
      SOURCES.peaceAndLove,
      SOURCES.strengthForRunners,
    ],
    faq: [
      {
        question: "What do shin splints feel like?",
        answer:
          "Typically a diffuse ache along the inner edge of the shinbone that flares with running or jumping. A single pinpoint spot that worsens or hurts at rest can be a different problem (including stress fracture) and needs evaluation.",
      },
      {
        question: "Can I run through shin splints?",
        answer:
          "Usually no. Continuing the same mileage that caused the pain often prolongs it. Reduce impact, cross-train, address load and strength, then return with walk-run progressions.",
      },
      {
        question: "How long do shin splints take to heal?",
        answer:
          "Mild cases may settle in a couple of weeks with smart load reduction. Stubborn cases take longer. If pain lasts beyond 2–3 weeks despite rest, or walking becomes painful, see a clinician.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Shin splints — clinicians often say **medial tibial stress syndrome** — show up when bone and the tissues along the shin take more repetitive load than they've adapted to. Beginners ramping mileage, runners returning too fast after a break, and sudden surface or shoe changes are classic setups.",
          "**This is general education, not medical advice or a diagnosis.** Persistent, worsening, or pinpoint bone pain needs a professional — stress fractures can mimic or follow ignored shin pain.",
        ],
      },
      {
        id: "symptoms",
        heading: "What it usually feels like",
        list: [
          "Dull or sharp pain along the inner shin (often the lower two-thirds)",
          "Flare during or after running, sometimes with hopping or stairs",
          "Tenderness along a strip of bone rather than one tiny spot",
          "Early on: pain that eases after warm-up (don't take that as permission to pile on miles)",
          "Later: pain that starts earlier, lasts longer, or shows up when walking",
        ],
        paragraphs: [
          "Red flags that are **not** 'just push through': pain at rest or at night, swelling/redness/warmth, inability to walk normally, or pain focused on one fingerprint-sized spot. Get checked — see Mayo Clinic's guidance on [shin splints](https://www.mayoclinic.org/diseases-conditions/shin-splints/symptoms-causes/syc-20354105) and [stress fractures](https://www.mayoclinic.org/diseases-conditions/stress-fractures/symptoms-causes/syc-20354057).",
        ],
      },
      {
        id: "causes",
        heading: "Why runners get them",
        list: [
          "Too much, too soon — mileage or intensity jumps",
          "Mostly hard surfaces (sidewalk only) with no recovery",
          "Worn-out shoes or a sudden switch to a very different pair",
          "Weak calves/hips relative to new running load",
          "Comeback after time off without rebuilding ([comeback guide](/blog/comeback-after-running-break))",
        ],
      },
      {
        id: "calm-down",
        heading: "Calm it down: first 1–2 weeks",
        paragraphs: [
          "Modern soft-tissue thinking favors PEACE & LOVE over 'shut down forever' — protect, elevate when swollen, avoid aggressive anti-inflammatory overuse early if advised by your clinician, compress if helpful, educate yourself, then load optimistically. For shin pain, the practical version looks like:",
        ],
        list: [
          "Cut or pause running impact; switch to bike, swim, or elliptical if pain-free",
          "Short ice bouts (10–15 min) can soothe — they're not a cure",
          "Avoid hills, track repeats, and 'test runs' that re-flare you",
          "Sleep and eat enough — bones remodel with recovery, not grit alone",
          "Gentle calf mobility without forcing into sharp pain",
        ],
        cta: {
          text: "Rest day ideas that aren't guilt trips",
          href: "/blog/what-to-do-on-rest-days",
        },
      },
      {
        id: "rebuild",
        heading: "Rebuild: strength + gradual return",
        paragraphs: [
          "Tissue that got overloaded needs capacity, not just rest. When daily walking is comfortable:",
          "Shoe check: if your pair has hundreds of miles or the midsole feels dead, replace it. A running store gait chat helps some people — comfort and fit beat trendy geometry. See [choosing shoes](/blog/choosing-running-shoes) and [bodyweight strength](/blog/bodyweight-strength-for-runners).",
        ],
        list: [
          "Calf raises (slow): 2–3 sets of 10–15, most days, progressing as tolerated",
          "Hip/glute work: bridges, side-lying leg lifts, clamshells — 2 short sessions/week",
          "Return to run with walk-run intervals on flat ground",
          "Increase running time slowly; repeat a week if soreness spikes the next morning",
          "Soft paths or treadmill mixed with road beats all-concrete heroics",
        ],
      },
      {
        id: "prevention",
        heading: "Keep them from coming back",
        list: [
          "Cap weekly mileage jumps (~10% rule as a guardrail, not a religion)",
          "Keep most runs easy so hard days stay rare",
          "Rotate surfaces when you can",
          "Strength twice a week even when training feels fine",
          "After time off, restart below old volume — every time",
        ],
        paragraphs: [
          "For a wider prevention playbook, see [how to avoid beginner injuries](/blog/avoiding-injuries) and the [injuries hub](/injuries). If pain returns every time you build past the same mileage, a sports PT can look at load, strength, and bone health — especially if under-fueling is in the mix.",
        ],
      },
    ],
  },
  {
    slug: "runners-knee-running",
    metaTitle: "Runner's Knee (PFPS): Symptoms, Fixes & When to See Help",
    title: "Runner's Knee Explained: Patellofemoral Pain Without the Panic",
    excerpt:
      "Dull ache around the kneecap after runs or on stairs isn't a character flaw — it's usually load, strength, and training choices. Here's how runners calm PFPS and rebuild.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2026-07-16",
    readTime: "8 min",
    relatedSlugs: [
      "avoiding-injuries",
      "shin-splints-running",
      "bodyweight-strength-for-runners",
      "running-form-101",
      "importance-of-cross-training",
      "comeback-after-running-break",
      "it-band-syndrome-running",
    ],
    closingQuestion:
      "Has knee pain ever changed how you train — what modifications actually helped?",
    sources: [
      SOURCES.patellofemoralPain,
      SOURCES.itBandSyndrome,
      SOURCES.strengthForRunners,
      SOURCES.peaceAndLove,
    ],
    faq: [
      {
        question: "What is runner's knee?",
        answer:
          "Runner's knee often refers to patellofemoral pain syndrome (PFPS) — discomfort around or behind the kneecap that flares with running, stairs, hills, or prolonged sitting. Other knee problems exist too; get assessed if symptoms are severe or unclear.",
      },
      {
        question: "Should I stop running completely?",
        answer:
          "Reduce aggravating load (hills, speed, long downhill) and keep activity that doesn't flare symptoms — easy flats, shorter sessions, or cross-training. Total rest alone without a strength plan often fails when you return.",
      },
      {
        question: "Do I need new shoes or a knee strap?",
        answer:
          "Comfortable, not-dead shoes help. Straps and braces help some people short-term but don't replace hip/quad strength and smarter training progression. See a clinician if you're unsure.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Runner's knee** is everyday language for pain around the kneecap — frequently **patellofemoral pain syndrome (PFPS)**. It loves sudden hills, mileage spikes, weak hips, and the 'I feel great so I'll add speed and distance' week.",
          "**Educational only — not medical advice.** Locking, giving way, big swelling, or trauma need hands-on evaluation. IT band pain on the outer knee is a cousin problem with a different feel — don't assume every lateral ache is PFPS.",
        ],
      },
      {
        id: "symptoms",
        heading: "Common symptoms",
        list: [
          "Dull ache around or behind the kneecap",
          "Worse on stairs (especially down), after sitting ('movie theater sign'), or on longer runs",
          "Grindy or vague discomfort rather than a single ligament 'pop' story",
          "Often eases with rest, then returns when load jumps again",
        ],
        paragraphs: [
          "Mayo Clinic's overview of [patellofemoral pain](https://www.mayoclinic.org/diseases-conditions/patellofemoral-pain-syndrome/symptoms-causes/syc-20350792) is a solid starting reference — use it to inform questions for your clinician, not to self-diagnose complex knee issues.",
        ],
      },
      {
        id: "triggers",
        heading: "Training triggers (the usual suspects)",
        list: [
          "Ramping hills and speed in the same week",
          "Big weekly volume jumps after a break",
          "Only running — no strength for glutes and quads",
          "Overstriding / heavy braking on downhills",
          "Worn shoes that alter how your knee accepts load",
        ],
      },
      {
        id: "modify",
        heading: "Modify training without quitting forever",
        list: [
          "Cut mileage and skip painful hills/downhills for 1–2+ weeks",
          "Keep easy flat running or walk-run only if pain stays ≤ mild and settles within 24 hours",
          "Swap some days to bike or swim to protect aerobic fitness",
          "Avoid deep painful squats or lunges early; use tolerable ranges",
          "Ice briefly for comfort if it helps — pair with load changes, not as the whole plan",
        ],
        cta: {
          text: "Cross-training ideas",
          href: "/blog/importance-of-cross-training",
        },
      },
      {
        id: "strength",
        heading: "Strength that actually helps many runners",
        paragraphs: [
          "Hip and thigh strength won't fix every knee, but they're among the few levers you control. Start light, stay mostly pain-free during and the day after:",
          "Two short sessions per week beat one heroic gym day. Details live in [bodyweight strength for runners](/blog/bodyweight-strength-for-runners). Form cues like slightly quicker, shorter steps on easy days can reduce braking — see [running form 101](/blog/running-form-101), or ask a coach/PT for gait help if pain persists.",
        ],
        list: [
          "Glute bridges — 2–3 sets of 8–12",
          "Side-lying leg lifts or monster walks with a light band",
          "Clamshells — slow, controlled",
          "Wall sits in a comfortable range (stop before sharp kneecap pain)",
          "Step-ups onto a low step once basics feel easy",
        ],
      },
      {
        id: "return",
        heading: "Return-to-run checklist",
        list: [
          "Stairs and easy walking feel manageable again",
          "Strength work isn't flaring the knee for 48 hours",
          "First runs: flat, short, easy effort — no pace chasing",
          "Add volume before intensity; add hills last",
          "If the same mileage repeatedly reinjures you, get a sports PT assessment",
        ],
        paragraphs: [
          "Coming back from time off? Don't match old peak miles in week one — use the [comeback after a break](/blog/comeback-after-running-break) ramp.",
        ],
      },
      {
        id: "see-help",
        heading: "When to see a specialist",
        list: [
          "Pain persists beyond ~2 weeks of reduced activity and basic strength work",
          "Knee locks, buckles, or swells significantly",
          "Pain changes how you walk day to day",
          "You're unsure whether it's PFPS, IT band, meniscus, or something else",
        ],
        paragraphs: [
          "More beginner injury context: [avoiding injuries](/blog/avoiding-injuries), [shin splints](/blog/shin-splints-running), and the [injuries page](/injuries). Strong knees are built with patience — not with one more 'easy' eight-miler on a cranky joint.",
        ],
      },
    ],
  },
];
