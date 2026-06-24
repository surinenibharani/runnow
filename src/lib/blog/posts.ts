import type { BlogPost } from "./types";

export const BLOG_AUTHOR = "B";

export const blogPosts: BlogPost[] = [
  {
    slug: "never-ran-where-to-start",
    title: "I Never Ran in My Life — Where Do I Actually Start?",
    excerpt:
      "Zero running background? No problem. Here's the honest, no-jargon path from your couch to your first confident jog.",
    category: "Getting Started",
    author: BLOG_AUTHOR,
    publishedAt: "2026-01-08",
    readTime: "6 min",
    relatedSlugs: ["training-first-5k", "building-a-running-habit", "choosing-running-shoes"],
    sections: [
      {
        paragraphs: [
          "If you've never run before, the internet can make it feel like everyone else was born doing 10K loops before breakfast. They're not. Every runner started exactly where you are — wondering if they're doing it wrong, too slow, or too out of shape.",
          "The good news: you don't need talent. You need a plan, patience, and permission to walk.",
        ],
      },
      {
        heading: "Step 1: Get medical clearance if you need it",
        paragraphs: [
          "If you have heart conditions, joint issues, or haven't been active in years, a quick check with your doctor is smart. For most healthy adults, walking is a safe place to begin without a formal clearance.",
        ],
      },
      {
        heading: "Step 2: Start with walking, not running",
        paragraphs: [
          "Before you run a single step, build a walking habit. Walk 20–30 minutes, 3–4 times per week for two weeks. This prepares your joints, tendons, and cardiovascular system without shocking your body.",
          "Once you can walk briskly for 30 minutes without feeling wiped out, you're ready to add short run intervals.",
        ],
      },
      {
        heading: "Step 3: Use run-walk intervals",
        list: [
          "Week 1–2: 1 min jog, 2 min walk — repeat for 20–25 min",
          "Week 3–4: 2 min jog, 2 min walk — repeat for 25–30 min",
          "Week 5–6: 3 min jog, 1 min walk — repeat for 25–30 min",
          "Week 7+: Try jogging continuously for 10 min, then build from there",
        ],
      },
      {
        heading: "Step 4: Go embarrassingly slow",
        paragraphs: [
          "Your jog should feel almost too easy. If you're gasping, you're sprinting — and beginners don't need sprints. You should be able to say full sentences out loud. This is the hardest mental shift for new runners.",
        ],
      },
      {
        heading: "Step 5: Pick a plan and stick to it",
        paragraphs: [
          "Structure removes guesswork. LetsRunNow's 8-week 5K plan is built for true beginners — it includes rest days, cross-training, and quirky run names so it doesn't feel like homework.",
          "Put your three run days on the calendar like appointments. Same days each week. Consistency beats heroics.",
        ],
      },
      {
        heading: "What you actually need",
        list: [
          "A pair of running shoes (visit a running store if you can)",
          "Comfortable clothes — no special gear required",
          "Water for longer sessions or hot days",
          "A phone or watch to track time — optional but helpful",
        ],
      },
      {
        heading: "What you don't need (yet)",
        list: [
          "A $400 GPS watch",
          "Compression socks, gels, or race belts",
          "To run every day",
          "To compare yourself to anyone on Strava",
        ],
      },
    ],
  },
  {
    slug: "training-first-5k",
    title: "Training for Your First 5K: A Beginner's Roadmap",
    excerpt:
      "3.1 miles sounds short until you've never run it. Here's how to build up safely and actually enjoy race day.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-01-22",
    readTime: "7 min",
    relatedSlugs: ["never-ran-where-to-start", "race-day-tips", "nutrition-for-runners"],
    sections: [
      {
        paragraphs: [
          "A 5K is the perfect first goal. It's long enough to feel like an achievement, short enough to train for without rearranging your entire life. Most beginners can go from zero to 5K in 6–8 weeks with a structured plan.",
        ],
      },
      {
        heading: "How many days per week?",
        paragraphs: [
          "Three runs per week is the sweet spot for beginners. Add one cross-training day and at least one full rest day. Running four times a week is fine later — but three builds the habit without burning you out.",
        ],
      },
      {
        heading: "What a typical week looks like",
        list: [
          "Easy run — conversational pace, building aerobic base",
          "Cross-training — yoga, cycling, or walking (active recovery)",
          "Rest day — actual rest, not a guilt day",
          "Easy or interval run — short faster segments with recovery jogs",
          "Cross-training or optional easy jog",
          "Long run — your longest run of the week, still at easy pace",
          "Rest day",
        ],
      },
      {
        heading: "The long run matters — even for a 5K",
        paragraphs: [
          "Your long run might only be 2–3 miles at first. That's fine. The point is time on your feet, not speed. By week 6–8, you should be able to cover 3+ miles at an easy pace. Race day adrenaline will carry you the rest of the way.",
        ],
      },
      {
        heading: "When to pick 4, 6, or 8 weeks",
        list: [
          "4 weeks — you can already jog 15–20 minutes continuously",
          "6 weeks — you've done some walk-run training",
          "8 weeks — true beginner, starting from mostly walking",
        ],
      },
      {
        heading: "Tapering before race day",
        paragraphs: [
          "In the final week, cut your volume by about 30%. Keep moving, but don't squeeze in extra miles. Your legs need to arrive fresh, not fried.",
        ],
      },
      {
        heading: "Signs you're ready",
        list: [
          "You can jog 2.5–3 miles without stopping at easy pace",
          "No pain that worsens during runs",
          "You're showing up consistently — even on tired days",
        ],
      },
    ],
  },
  {
    slug: "training-first-half-marathon",
    title: "Training for Your First Half Marathon (13.1 Miles)",
    excerpt:
      "Doubling down from 5K territory? Here's what changes when you train for 13.1 — mileage, pacing, and mindset.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-02-05",
    readTime: "8 min",
    relatedSlugs: ["training-first-5k", "importance-of-cross-training", "nutrition-for-runners"],
    sections: [
      {
        paragraphs: [
          "A half marathon is a serious distance — but it's absolutely achievable for recreational runners who respect the process. You should comfortably run a 5K before starting a half plan. If you can't jog 30 minutes yet, build that base first.",
        ],
      },
      {
        heading: "Timeline: 8 vs 12 weeks",
        list: [
          "8 weeks — you've been running consistently 3–4x/week for 3+ months and can do a 6-mile long run",
          "12 weeks — recommended for most first-timers; builds mileage gradually and includes more recovery",
        ],
      },
      {
        heading: "Weekly structure",
        paragraphs: [
          "Expect 4 runs per week max: one long run, one quality session (tempo or intervals), and two easy runs. Cross-training fills gaps. The long run is the centerpiece — it peaks around 10–12 miles before taper.",
        ],
      },
      {
        heading: "The 10% rule is real",
        paragraphs: [
          "Don't increase total weekly mileage by more than 10% week over week. Half marathon training fails when people jump from 15 miles to 25 miles in one week. Your cardiovascular system adapts faster than your tendons.",
        ],
      },
      {
        heading: "Pacing strategy",
        list: [
          "Easy runs: truly easy — you should feel like you could go much faster",
          "Long runs: 30–90 seconds slower per mile than 5K race pace",
          "Race day: start slower than you think — miles 1–3 should feel almost too comfortable",
        ],
      },
      {
        heading: "Mental preparation",
        paragraphs: [
          "At mile 10, your brain will negotiate quitting. This is normal. Break the race into chunks: 5K + 5K + 5K-ish. You've trained for the distance — trust the plan on race day.",
        ],
      },
      {
        heading: "Recovery becomes non-negotiable",
        paragraphs: [
          "Sleep, nutrition, and rest days aren't optional at this distance. Two rest days per week or one rest + one active recovery is standard. Ignoring recovery is how half plans end in injury.",
        ],
      },
    ],
  },
  {
    slug: "training-first-full-marathon",
    title: "Training for Your First Full Marathon (26.2 Miles)",
    excerpt:
      "The marathon is a different beast. Here's what first-timers need to know about mileage, long runs, and surviving the taper.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-02-19",
    readTime: "9 min",
    relatedSlugs: ["training-first-half-marathon", "nutrition-for-runners", "mental-side-of-running"],
    sections: [
      {
        paragraphs: [
          "26.2 miles has humbled plenty of strong athletes. Respect the distance, follow a plan, and you'll get there. Most coaches recommend completing a half marathon before attempting a full — not because it's required, but because you've learned how your body handles higher mileage.",
        ],
      },
      {
        heading: "Plan length: 12, 14, or 16 weeks",
        list: [
          "12 weeks — experienced runners with a strong half marathon base",
          "14 weeks — solid default for first-time marathoners",
          "16 weeks — best if you're newer to high mileage or want more buffer",
        ],
      },
      {
        heading: "Peak weekly mileage",
        paragraphs: [
          "First-timers typically peak at 35–45 miles per week. Your longest run will likely hit 18–20 miles — you don't need to run 26 in training. The combination of training volume + race-day adrenaline carries you through the final 6 miles.",
        ],
      },
      {
        heading: "The long run",
        paragraphs: [
          "Build long runs gradually: add 1–2 miles per week, then step back every 3–4 weeks (a 'cutback week'). Never jump from 14 to 20 miles. Run long runs slow — 60–90 seconds per mile slower than goal race pace.",
        ],
      },
      {
        heading: "Fuel in training",
        paragraphs: [
          "Practice your race nutrition on long runs. Gut issues on race day usually mean you didn't train your stomach. Start experimenting with gels or chews around the 10-mile mark in training.",
        ],
      },
      {
        heading: "The taper (and why it feels awful)",
        paragraphs: [
          "The final 2–3 weeks reduce volume significantly. Your legs will feel heavy and your brain will scream that you've lost fitness. You haven't. Trust the taper. Don't cram in extra miles.",
        ],
      },
      {
        heading: "Race day reality check",
        list: [
          "Start conservatively — the first half should feel controlled",
          "Walk aid stations if needed — it's a strategy, not a failure",
          "Expect a tough patch between miles 18–22 — have a mantra ready",
          "Finishing is the goal for marathon #1; time goals come later",
        ],
      },
    ],
  },
  {
    slug: "importance-of-cross-training",
    title: "Why Cross-Training Belongs in Every Running Plan",
    excerpt:
      "Running more isn't always the answer. Here's how yoga, cycling, and strength work make you a better, healthier runner.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-03-05",
    readTime: "5 min",
    relatedSlugs: ["what-to-do-on-rest-days", "training-first-5k", "avoiding-injuries"],
    sections: [
      {
        paragraphs: [
          "Beginners often think progress means running every day. It doesn't. Cross-training — intentional non-running exercise — builds fitness while giving your running muscles and joints a break from impact.",
        ],
      },
      {
        heading: "What cross-training actually does",
        list: [
          "Maintains cardiovascular fitness without extra pounding",
          "Strengthens muscles running neglects (glutes, hips, core)",
          "Reduces overuse injury risk",
          "Keeps training fresh so you don't burn out mentally",
        ],
      },
      {
        heading: "Best cross-training for runners",
        subsections: [
          {
            heading: "After hard or long runs",
            list: [
              "Yoga — mobility and gentle stretching",
              "Walking — active recovery, keeps blood flowing",
            ],
          },
          {
            heading: "After easy runs",
            list: [
              "Cycling — leg endurance without impact",
              "Bodyweight circuits — planks, lunges, glute bridges",
            ],
          },
          {
            heading: "After speed or interval days",
            list: [
              "Light weights — focus on form, not max lifting",
              "Swimming — full-body, zero impact",
            ],
          },
        ],
      },
      {
        heading: "How LetsRunNow uses cross-training",
        paragraphs: [
          "Our plans pair cross-training with the previous day's run type. Hard day yesterday? Today might be yoga or walking. Easy day? Maybe cycling or bodyweight work. It's not random — it's recovery with purpose.",
        ],
      },
      {
        heading: "What doesn't count as cross-training",
        list: [
          "A 'easy jog' on your rest day — that's a run",
          "Sitting on the couch all week then hammering a long run",
          "High-intensity bootcamp that leaves you too sore to run",
        ],
      },
    ],
  },
  {
    slug: "what-to-do-on-rest-days",
    title: "What to Do on Rest Days (And What to Avoid)",
    excerpt:
      "Rest days aren't lazy days — they're when your body gets stronger. Here's how to use them without losing momentum.",
    category: "Recovery",
    author: BLOG_AUTHOR,
    publishedAt: "2026-03-19",
    readTime: "5 min",
    relatedSlugs: ["importance-of-cross-training", "building-a-running-habit", "avoiding-injuries"],
    sections: [
      {
        paragraphs: [
          "Rest days are built into every LetsRunNow plan for a reason: adaptation happens when you're not running. Muscles repair, glycogen stores refill, and your nervous system resets. Skip them and you don't get ahead — you get injured or exhausted.",
        ],
      },
      {
        heading: "Full rest vs active recovery",
        paragraphs: [
          "A full rest day means no structured workout. A gentle walk, stretching, or foam rolling is fine. Active recovery (cross-training) is lighter movement — yoga, easy cycling — and belongs on non-rest days in our 6-day schedule.",
        ],
      },
      {
        heading: "Great rest day activities",
        list: [
          "Sleep an extra hour if you can",
          "Foam roll calves, quads, and glutes (5–10 min)",
          "Light stretching or mobility work",
          "Hydrate well — runners often under-drink on off days",
          "Meal prep for the training week ahead",
          "Lay out your running clothes for tomorrow",
        ],
      },
      {
        heading: "What to avoid",
        list: [
          "\"I feel good, I'll just run a few miles\" — classic beginner mistake",
          "Leg day at the gym that destroys your quads before a long run",
          "Staying up late — sleep is recovery",
          "Ignoring nagging pain because it's a rest day anyway",
        ],
      },
      {
        heading: "The mental side of rest",
        paragraphs: [
          "Guilt on rest days is common. Reframe it: you're not doing nothing, you're completing a training session called recovery. Elite runners rest hard. So can you.",
        ],
      },
      {
        heading: "When to take an extra rest day",
        list: [
          "Pain that worsens during a run (not normal soreness)",
          "Illness — especially with fever or chest symptoms",
          "Three or more nights of poor sleep",
          "Dread about running that wasn't there before — possible burnout",
        ],
      },
    ],
  },
  {
    slug: "nutrition-for-runners",
    title: "Runner's Nutrition: Before, During & After (5K, Half & Marathon)",
    excerpt:
      "What to eat and drink at every distance — from your first 5K to 26.2 miles. Practical fueling without the overwhelm.",
    category: "Nutrition",
    author: BLOG_AUTHOR,
    publishedAt: "2026-04-02",
    readTime: "10 min",
    relatedSlugs: ["training-first-5k", "training-first-half-marathon", "training-first-full-marathon"],
    sections: [
      {
        paragraphs: [
          "You don't need a perfect diet to start running. But what you eat — and when — affects how runs feel and how fast you recover. Here's a distance-by-distance guide for everyday runners, not elite athletes.",
        ],
      },
      {
        heading: "Daily basics (all distances)",
        list: [
          "Eat enough — under-fueling leads to fatigue and injury",
          "Include carbs, protein, and healthy fats at most meals",
          "Hydrate throughout the day, not just before runs",
          "Limit heavy alcohol before hard training days",
        ],
      },
      {
        heading: "5K fueling",
        subsections: [
          {
            heading: "Before (1–3 hours prior)",
            list: [
              "Light, familiar meal: toast with peanut butter, oatmeal, or a banana",
              "Avoid high-fiber or greasy foods that upset your stomach",
              "A small snack 30–60 min before is fine if you're hungry: half a banana or a few crackers",
            ],
          },
          {
            heading: "During",
            list: [
              "Water is enough for most 5Ks under 40 minutes",
              "Hot weather? Sip water if available on course",
              "No gels needed at this distance for beginners",
            ],
          },
          {
            heading: "After",
            list: [
              "Eat within 1–2 hours: protein + carbs (eggs on toast, yogurt with fruit, rice and chicken)",
              "Rehydrate with water; sports drinks optional if you sweated heavily",
            ],
          },
        ],
      },
      {
        heading: "Half marathon fueling",
        subsections: [
          {
            heading: "Before",
            list: [
              "Night before: normal dinner, slightly carb-forward (pasta, rice, potatoes) — don't overeat",
              "Race morning (2–3 hrs before): oatmeal, bagel, or toast — tested in training",
              "Race morning (30–60 min before): small top-up if needed — gel or banana",
            ],
          },
          {
            heading: "During",
            list: [
              "Water at most aid stations — sip, don't chug",
              "Consider 1 gel or chews around mile 6–8 if running 2+ hours",
              "Practice this on long runs — never try new fuel on race day",
            ],
          },
          {
            heading: "After",
            list: [
              "Recovery snack within 30 min: chocolate milk, protein shake, or banana + nut butter",
              "Full meal within 2 hours with carbs and protein",
              "Replace fluids gradually over several hours",
            ],
          },
        ],
      },
      {
        heading: "Full marathon fueling",
        subsections: [
          {
            heading: "Before",
            list: [
              "2–3 days out: steady eating, don't carb-load excessively the night before",
              "Race morning: same breakfast you've practiced on long run days",
              "Coffee is fine if it's part of your routine — skip new caffeine experiments",
            ],
          },
          {
            heading: "During",
            list: [
              "30–60g carbs per hour after the first 45–60 minutes (gels, chews, sports drink)",
              "Set a timer — fuel before you feel hungry",
              "Alternate water and electrolyte drink at aid stations",
              "Know what's on the course and practice with those brands if possible",
            ],
          },
          {
            heading: "After",
            list: [
              "Walk, stretch lightly, eat something within 30–60 minutes",
              "Prioritize carbs + protein for 24–48 hours — your muscles are hungry",
              "Electrolytes and salty foods help if you cramp or sweat heavily",
              "Celebrate with food — you've earned it",
            ],
          },
        ],
      },
      {
        heading: "Common mistakes",
        list: [
          "Trying new foods or gels on race day",
          "Skipping breakfast because nerves kill appetite",
          "Drinking only water in hot marathons (hyponatremia risk)",
          "Eating too much the night before and sleeping poorly",
        ],
      },
    ],
  },
  {
    slug: "building-a-running-habit",
    title: "How to Build a Running Habit That Actually Sticks",
    excerpt:
      "Motivation fades. Habits don't. Simple strategies to show up consistently — even when you don't feel like it.",
    category: "Mindset",
    author: BLOG_AUTHOR,
    publishedAt: "2026-04-16",
    readTime: "5 min",
    relatedSlugs: ["never-ran-where-to-start", "what-to-do-on-rest-days", "how-to-pace-yourself"],
    sections: [
      {
        paragraphs: [
          "The runners who improve aren't the ones with the most motivation — they're the ones who kept showing up when motivation was gone. Habits beat inspiration every time.",
        ],
      },
      {
        heading: "Anchor runs to existing routines",
        list: [
          "Run right after work on set days — before you sit down",
          "Morning runners: lay out clothes the night before",
          "Link your run to something you already do: coffee after, podcast during",
        ],
      },
      {
        heading: "Make the first step stupidly small",
        paragraphs: [
          "On terrible days, your only job is to put on shoes and walk out the door. Often you'll run once you're outside. If you only walk, that's still a win — you didn't break the chain.",
        ],
      },
      {
        heading: "Track something simple",
        paragraphs: [
          "Check off completed runs on your LetsRunNow plan. A visible streak — even on paper — makes skipping feel like breaking a promise to yourself.",
        ],
      },
      {
        heading: "Design your environment",
        list: [
          "Keep shoes visible, not buried in a closet",
          "Choose routes from your front door — friction kills habits",
          "Tell one person your plan — social accountability works",
        ],
      },
      {
        heading: "Forgive bad weeks",
        paragraphs: [
          "Missed a run? Don't double up. Don't quit. Just do the next scheduled run. One bad week doesn't erase progress; quitting does.",
        ],
      },
    ],
  },
  {
    slug: "choosing-running-shoes",
    title: "How to Choose Your First Pair of Running Shoes",
    excerpt:
      "The one piece of gear that actually matters. What to look for, where to shop, and when to replace them.",
    category: "Gear",
    author: BLOG_AUTHOR,
    publishedAt: "2026-04-30",
    readTime: "5 min",
    relatedSlugs: ["never-ran-where-to-start", "avoiding-injuries", "training-first-5k"],
    sections: [
      {
        paragraphs: [
          "You can run in old sneakers, but you won't enjoy it. Running shoes are designed for forward motion, impact absorption, and breathability. They're the best investment you'll make as a beginner.",
        ],
      },
      {
        heading: "Visit a running specialty store",
        paragraphs: [
          "Staff can watch you walk and jog, suggest options based on your gait, and let you test on a treadmill. You don't need the most expensive pair — you need the right fit.",
        ],
      },
      {
        heading: "What to look for",
        list: [
          "Thumb's width of space at the toe box",
          "Snug heel — no slipping",
          "Comfortable immediately — don't expect a long 'break-in'",
          "Neutral vs stability — let the fitter guide you unless you have known issues",
        ],
      },
      {
        heading: "When to replace",
        paragraphs: [
          "Every 300–500 miles, or when you feel new aches in knees/shins, or when tread is worn smooth. For a beginner running 15 miles/week, that's roughly every 5–8 months.",
        ],
      },
      {
        heading: "Skip for now",
        list: [
          "Minimalist shoes unless you've researched and progressed slowly",
          "Buying online without trying (unless it's a reorder of the same model)",
          "Using trail shoes on pavement exclusively — different purposes",
        ],
      },
    ],
  },
  {
    slug: "how-to-pace-yourself",
    title: "How to Pace Yourself as a Beginner Runner",
    excerpt:
      "Going out too fast is the #1 beginner mistake. Learn to run easy, run steady, and save speed for when it counts.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-05-14",
    readTime: "6 min",
    relatedSlugs: ["training-first-5k", "race-day-tips", "building-a-running-habit"],
    sections: [
      {
        paragraphs: [
          "Pacing isn't about being slow — it's about being smart. Most beginners run their easy days too hard and their hard days too easy (or skip them). Flip that pattern and you'll improve faster with fewer injuries.",
        ],
      },
      {
        heading: "The talk test",
        paragraphs: [
          "On easy runs, you should speak in full sentences without gasping. If you can only manage a few words, slow down or walk. This single rule fixes 80% of beginner pacing problems.",
        ],
      },
      {
        heading: "Run types and effort",
        list: [
          "Easy runs — 60–70% effort; conversational",
          "Long runs — same as easy, maybe slower",
          "Tempo — 'comfortably hard'; short phrases only",
          "Intervals — hard efforts with walk/jog recovery between",
        ],
      },
      {
        heading: "Negative splits (advanced but useful)",
        paragraphs: [
          "Run the second half of a run slightly faster than the first. Start conservatively. This trains discipline and prevents the crash-and-burn that ruins race day.",
        ],
      },
      {
        heading: "Without a GPS watch",
        list: [
          "Use time instead of distance — run 30 min easy, don't obsess over pace",
          "Run by feel on easy days",
          "Use RPE (rate of perceived exertion): easy = 3–4 out of 10",
        ],
      },
    ],
  },
  {
    slug: "race-day-tips",
    title: "Race Day Tips for First-Time Runners",
    excerpt:
      "Your first race is as much mental as physical. A practical checklist from the night before to the finish line.",
    category: "Racing",
    author: BLOG_AUTHOR,
    publishedAt: "2026-05-28",
    readTime: "6 min",
    relatedSlugs: ["training-first-5k", "nutrition-for-runners", "how-to-pace-yourself"],
    sections: [
      {
        paragraphs: [
          "Race day nerves are normal — they mean you care. A little preparation turns anxiety into excitement.",
        ],
      },
      {
        heading: "The night before",
        list: [
          "Lay out everything: bib, shoes, socks, outfit, safety pins",
          "Set two alarms",
          "Eat a normal dinner — nothing exotic",
          "Charge your phone/watch",
          "Visualize the start, middle, and finish — it helps",
        ],
      },
      {
        heading: "Race morning",
        list: [
          "Eat 2–3 hours before — familiar foods only",
          "Arrive early; bathroom lines are real",
          "Warm up with 5–10 min easy walking",
          "Line up according to your expected pace — don't start at the front",
        ],
      },
      {
        heading: "During the race",
        list: [
          "Start slower than you want to",
          "Run your own race — ignore people passing you early",
          "Use aid stations; walk through them if needed",
          "Break the distance into chunks (mile markers or lamp posts)",
        ],
      },
      {
        heading: "After you finish",
        list: [
          "Keep walking — don't collapse immediately",
          "Grab water and a snack",
          "Stretch lightly, change into dry clothes",
          "Celebrate. You did it.",
        ],
      },
    ],
  },
  {
    slug: "mental-side-of-running",
    title: "The Mental Side of Running: Doubt, Boredom & Breakthroughs",
    excerpt:
          "Your legs get stronger in training. Your head gets stronger on the road. How to handle the psychological side of becoming a runner.",
    category: "Mindset",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-11",
    readTime: "6 min",
    relatedSlugs: ["building-a-running-habit", "training-first-full-marathon", "race-day-tips"],
    sections: [
      {
        paragraphs: [
          "Every runner has a voice that says stop. Beginners hear it loudest. The difference isn't talent — it's practice at not listening, or at least negotiating.",
        ],
      },
      {
        heading: "Boredom is part of the job",
        paragraphs: [
          "Easy runs can feel monotonous. Podcasts, music, running with a friend, or varying routes all help. But some boredom builds mental toughness you'll need on long runs and race day.",
        ],
      },
      {
        heading: "Mantras that work",
        list: [
          "\"One more mile\" — shrink the goal",
          "\"I do hard things\" — identity-based",
          "\"Easy day, easy effort\" — permission to slow down",
          "\"I showed up\" — for days when pace doesn't matter",
        ],
      },
      {
        heading: "Comparison is the thief of joy",
        paragraphs: [
          "Strava, Instagram, and group runs can make you feel slow. You're not running their life. You're building yours. Log off if you need to.",
        ],
      },
      {
        heading: "When to push vs when to stop",
        list: [
          "Push through: mental fatigue, mild discomfort, bad weather",
          "Stop or walk: sharp pain, dizziness, chest pain, pain that changes your gait",
        ],
      },
    ],
  },
  {
    slug: "avoiding-injuries",
    title: "How to Avoid the Injuries That Sideline Beginners",
    excerpt:
      "Most running injuries are preventable. The habits that keep you on your feet — and when to back off before it's too late.",
    category: "Health",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-18",
    readTime: "6 min",
    relatedSlugs: ["importance-of-cross-training", "what-to-do-on-rest-days", "choosing-running-shoes"],
    sections: [
      {
        paragraphs: [
          "Shin splints, knee pain, and plantar fasciitis aren't badges of honor — they're signals. Beginners get hurt when they do too much, too soon, too fast. Here's how to stay on the right side of that line.",
        ],
      },
      {
        heading: "The big three rules",
        list: [
          "Increase weekly mileage by no more than 10%",
          "Keep most runs easy — hard days are few and intentional",
          "Take rest days seriously",
        ],
      },
      {
        heading: "Listen to pain wisely",
        list: [
          "General muscle soreness 24–48 hrs after a hard effort — normal",
          "Pain during a run that fades when you stop — caution, reduce next day",
          "Pain that worsens as you run or persists at rest — stop and assess",
          "Pain that changes how you run — see a professional",
        ],
      },
      {
        heading: "Strength prevents injury",
        paragraphs: [
          "Weak hips and glutes cause knee and IT band issues. Two 15-minute bodyweight sessions per week — glute bridges, clamshells, calf raises — pay enormous dividends.",
        ],
      },
      {
        heading: "Learn more",
        paragraphs: [
          "Our injuries page covers common issues with avoid, recover, and when-to-see-a-specialist guidance for each one.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.relatedSlugs?.length) return [];
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 3);
}
