import type { BlogPost } from "./types";
import { getWhyItMatters } from "./why-it-matters";

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
    relatedSlugs: ["training-first-5k", "race-day-tips", "nutrition-for-runners"],
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
    relatedSlugs: ["training-first-half-marathon", "race-day-tips", "mental-side-of-running"],
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
    title: "Race Day: What to Do and What Not to Do (5K, Half & Marathon)",
    excerpt:
      "The right race-day habits can make or break months of training. Universal do's and don'ts — plus specific advice for 5K, half marathon, and full marathon.",
    category: "Racing",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-23",
    readTime: "10 min",
    relatedSlugs: [
      "training-first-5k",
      "training-first-half-marathon",
      "training-first-full-marathon",
      "nutrition-for-runners",
    ],
    sections: [
      {
        paragraphs: [
          "You've done the hard part — the early mornings, the long runs, the days you didn't feel like lacing up. Race day is where it all comes together. It's also where small mistakes (new shoes, skipping breakfast, going out too fast) can undo weeks of work.",
          "The good news: most race-day errors are preventable. Below are universal rules that apply to every distance, followed by specific recommendations for 5K, half marathon, and full marathon.",
        ],
      },
      {
        heading: "Universal do's (every distance)",
        list: [
          "Lay out your kit the night before — bib, pins, shoes, socks, outfit, watch, gels if needed",
          "Eat familiar foods only — nothing new on race morning",
          "Arrive 60–90 minutes early for bigger races (bathroom lines and bag drop take time)",
          "Pin your bib on the front of your shirt, not your jacket you'll shed",
          "Do a 5–10 minute warm-up: easy jog or brisk walk plus dynamic stretches",
          "Line up at your realistic pace — not at the front with the fast crowd",
          "Start slower than you think you should; adrenaline lies to everyone",
          "Run your own race — ignore early passers and negative splits from strangers",
          "Thank volunteers at aid stations; grab water even on cool days",
          "Keep walking after you cross the finish line — don't stop cold",
        ],
      },
      {
        heading: "Universal don'ts (every distance)",
        list: [
          "Don't wear new shoes, socks, or an untested race outfit",
          "Don't try a new breakfast, gel, or sports drink for the first time",
          "Don't cram extra miles or a hard workout the week of the race",
          "Don't start in the wrong corral or sprint the first mile",
          "Don't skip the warm-up because you're nervous or it's a short race",
          "Don't go out with people faster than your training pace",
          "Don't forget sunscreen on exposed skin for morning races",
          "Don't stop immediately at the finish — blood can pool and you'll feel faint",
          "Don't skip the post-race snack and hydration",
          "Don't beat yourself up if the day doesn't go perfectly — you still finished",
        ],
      },
      {
        heading: "5K (3.1 miles)",
        paragraphs: [
          "A 5K is short enough that mistakes hurt fast — there's no time to recover from a bad start. It's also forgiving enough that smart pacing and a calm morning go a long way.",
        ],
        subsections: [
          {
            heading: "What to do",
            list: [
              "Eat a light breakfast 1.5–2 hours before if you're used to eating before runs",
              "Warm up with 10 minutes easy jogging plus 2–3 short strides (20–30 sec pickups)",
              "Start in the middle of the pack if you're unsure of your pace",
              "Run the first mile 10–15 seconds slower than goal pace — you'll thank yourself at mile 2",
              "Use the final 0.5–1 mile to push if you have gas left",
              "Have a post-race plan: water, a banana or bar, and a light cool-down walk",
            ],
          },
          {
            heading: "What not to do",
            list: [
              "Don't treat a 5K like a sprint from the gun — you'll blow up by mile 1.5",
              "Don't skip the warm-up because \"it's only 3 miles\" — cold legs feel terrible",
              "Don't carb-load like it's a marathon — a normal dinner and light breakfast are enough",
              "Don't wear headphones if the race discourages them — stay aware at crowded starts",
              "Don't plan a hard workout the next day — easy walk or rest",
            ],
          },
        ],
      },
      {
        heading: "Half marathon (13.1 miles)",
        paragraphs: [
          "The half is the distance where pacing discipline really matters. Go out too fast and miles 10–13 become a long, painful lesson. Fueling and hydration start mattering here too.",
        ],
        subsections: [
          {
            heading: "What to do",
            list: [
              "Eat a carb-focused dinner the night before — pasta, rice, or potatoes you've eaten before",
              "Breakfast 2–3 hours before: oatmeal, toast, banana, or your usual long-run meal",
              "Carry or plan for fuel: a gel or chews around miles 6–8 if your long runs included them",
              "Drink at most aid stations — small sips, don't chug",
              "Run miles 1–3 at easy effort; settle into goal pace by mile 4–5",
              "Break the race into thirds: easy start, steady middle, strong finish if you can",
              "Know the course — hills, turns, and where the tough miles fall",
              "Have friends or family at one or two spots on course for a mental boost",
            ],
          },
          {
            heading: "What not to do",
            list: [
              "Don't chase the 5K crowd at the start — half marathon pacing is a different game",
              "Don't try gels for the first time on race day — practice on long runs",
              "Don't skip aid stations because you feel fine at mile 5 — dehydration hits later",
              "Don't wear cotton socks or a brand-new singlet",
              "Don't negative-split your first half by running miles 1–6 too fast",
              "Don't walk off course immediately after finishing — keep moving 5–10 minutes",
            ],
          },
        ],
      },
      {
        heading: "Full marathon (26.2 miles)",
        paragraphs: [
          "The marathon rewards patience and punishes arrogance. Your goal is to arrive at mile 20 with legs that still work. Everything before that is setup.",
        ],
        subsections: [
          {
            heading: "What to do",
            list: [
              "Taper properly the final 2–3 weeks — trust the training on your legs",
              "Eat familiar carbs the night before; eat breakfast 3 hours before the start",
              "Plan fueling: gel or chews every 4–6 miles starting around mile 6–8",
              "Alternate water and sports drink at aid stations — don't rely on one only",
              "Run the first 10K 30–60 seconds per mile slower than goal pace if you're a first-timer",
              "Walk through aid stations if needed — 10 seconds of walking saves energy",
              "Mentally rehearse miles 18–22 — that's where the race actually happens",
              "Wear what you trained in for your longest runs, including socks and anti-chafe",
              "Set multiple goals: A (perfect day), B (solid finish), C (just finish strong)",
              "Have a post-race bag with dry clothes, flip-flops, and a real meal planned",
            ],
          },
          {
            heading: "What not to do",
            list: [
              "Don't run 26 miles in training to \"prove\" you're ready — 18–20 is enough",
              "Don't start with the 3:30 pace group if you trained at 4:30",
              "Don't try new shoes, socks, shorts, or anti-chafe products on race morning",
              "Don't skip breakfast because you're nervous — you'll pay by mile 16",
              "Don't take every gel offered on course — stick to your practiced plan",
              "Don't surge on hills early — save climbing strength for the second half",
              "Don't let a bad mile spiral — reset at the next mile marker",
              "Don't sign up for a hard race the next weekend — respect recovery",
            ],
          },
        ],
      },
      {
        heading: "The night before & race morning checklist",
        list: [
          "Bib pinned, timing chip checked, bag packed",
          "Two alarms set; know how you'll get to the start",
          "Weather-appropriate layers you can toss at the start if allowed",
          "Phone charged; watch synced if you use one",
          "Bathroom stop 15–30 minutes before your corral closes",
          "Positive self-talk: you trained for this — execute the plan",
        ],
      },
      {
        heading: "After you finish",
        paragraphs: [
          "Walk for at least 5–10 minutes. Grab water and something with carbs and protein within 30–60 minutes. Stretch lightly — don't force deep stretches on exhausted muscles. Change out of wet clothes. Celebrate: you earned it.",
          "For half and full marathons, take easy days or full rest the week after. Your body did something significant. Recovery is part of racing, not weakness.",
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
  {
    slug: "why-letsrunnow",
    title: "Why LetsRunNow?",
    excerpt:
      "Tired of overwhelming running apps? LetsRunNow is the simple, free, no-signup Couch to 5K and marathon training site for real beginners.",
    category: "Getting Started",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-23",
    readTime: "5 min",
    relatedSlugs: [
      "never-ran-where-to-start",
      "training-first-5k",
      "building-a-running-habit",
    ],
    sections: [
      {
        paragraphs: [
          "“The anti-app app for new runners” — the one you use when big flashy apps feel like too much.",
          "You’ve decided to start running. That’s awesome.",
          "Then you open the app store and suddenly you’re drowning in features: GPS tracking, heart rate zones, AI coaching, social challenges, premium subscriptions, and leaderboards full of people who look like they were born running.",
          "Overwhelming, right?",
          "That’s exactly why we built LetsRunNow.",
        ],
      },
      {
        heading: "We're Not Trying to Be Another Fancy Running App",
        paragraphs: [
          "Most running apps are designed for people who already run. We built ours for people who are still thinking about running — the ones who get out of breath walking up stairs, who feel intimidated by the sport, or who have tried and quit before.",
          "Here's the difference:",
        ],
        list: [
          "No account required — Start today. No email, no password, no data collection.",
          "No pressure, no judgment — Walking is not cheating. It's smart training.",
          "Dead simple — Three runs a week. Clear walk-run intervals. Check it off and you're done.",
          "Actually free — Forever. No hidden paywalls or “upgrade to continue” nonsense.",
        ],
      },
      {
        heading: "What You Actually Get",
        list: [
          "Proven plans from Couch to 5K all the way to full marathon",
          "Quirky run names that make you smile when your alarm goes off (yes, this helps)",
          "Browser-based progress tracking — streaks, check-offs, and milestones that live in your browser",
          "Realistic pacing advice — “Slow is fast” isn't just a slogan here. It's the whole philosophy.",
        ],
        paragraphs: [
          "You don't need fancy gear. You don't need to be fast. You just need to show up.",
        ],
      },
      {
        heading: "Why Beginners Love It",
        paragraphs: ["Real people, real words from our users:"],
        subsections: [
          {
            heading: "— Kumar, 46, started from zero",
            variant: "quote",
            paragraphs: [
              "I genuinely thought running wasn't for me. Week 4 and I'm actually looking forward to my runs.",
            ],
          },
          {
            heading: "— Venkat, 42",
            variant: "quote",
            paragraphs: [
              "The walk-run intervals made it feel achievable. No shame in walking — that's the whole point.",
            ],
          },
          {
            heading: "— Fakruddin, on week 6",
            variant: "quote",
            paragraphs: [
              "Checking off workouts and seeing my streak grow kept me accountable. Simple but it works.",
            ],
          },
        ],
      },
      {
        heading: "When Big Apps Feel Like Too Much",
        list: [
          "You don't want to carry your phone and track every second",
          "You don't want guilt-tripping notifications",
          "You just want a clear, encouraging plan that respects your life and your current fitness level",
        ],
        paragraphs: [
          "That's where LetsRunNow shines. We're the calm, friendly voice in a sea of intense fitness content.",
        ],
      },
      {
        heading: "Ready to Give It a Try?",
        paragraphs: [
          "Your future self will thank you.",
          "No risk. No commitment. Just lace up and begin.",
        ],
        cta: { text: "Start the free Training Plan Now!", href: "/plan" },
      },
    ],
  },
  {
    slug: "breathing-while-running",
    title: "How to Breathe While Running (Without Overthinking It)",
    excerpt:
      "Gasping on mile one? A simple rhythm, slower pace, and a few posture cues fix most beginner breathing problems.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-28",
    readTime: "5 min",
    relatedSlugs: ["how-to-pace-yourself", "mental-side-of-running", "avoiding-injuries"],
    sections: [
      {
        paragraphs: [
          "New runners often worry they're breathing wrong. You're not broken — your body is just asking for an easier effort. Fix the pace first; breathing usually follows.",
        ],
      },
      {
        heading: "The 3:3 rhythm",
        paragraphs: [
          "Try inhaling for three foot strikes and exhaling for three. On easy runs, 3:3 or 4:4 feels natural. Faster efforts might drop to 2:2. If you can't maintain a rhythm, slow down or walk until it returns.",
        ],
      },
      {
        heading: "Nose vs mouth",
        paragraphs: [
          "Mouth breathing during exercise is normal and efficient — don't force nasal-only breathing on hard efforts. In cold, dry air, a buff over your mouth can warm and humidify air before it hits your lungs.",
        ],
      },
      {
        heading: "Posture and tension",
        list: [
          "Relax your shoulders — tension steals oxygen",
          "Stand tall; slouching compresses your diaphragm",
          "Shake out your hands on easy days if you grip too tight",
          "Breathe into your belly, not just your chest",
        ],
      },
      {
        heading: "When to see a doctor",
        paragraphs: [
          "Chest pain, dizziness, or wheezing that doesn't improve with rest needs medical attention — especially if you have asthma or heart risk factors. Exercise-induced breathing issues are common and often manageable with a plan from your doctor.",
        ],
      },
    ],
  },
  {
    slug: "running-in-bad-weather",
    title: "Running in Bad Weather: When to Go Out and When to Stay In",
    excerpt:
      "Rain, heat, ice, storms, wind, and poor air quality — practical rules for staying safe without losing your training habit.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-28",
    readTime: "7 min",
    relatedSlugs: ["what-to-do-on-rest-days", "importance-of-cross-training", "avoiding-injuries"],
    sections: [
      {
        paragraphs: [
          "Perfect weather is rare. Beginners who learn to adapt — or swap to smart indoor options — stick with running longer than those who quit after one rainy week.",
        ],
      },
      {
        heading: "Rain",
        paragraphs: [
          "Light rain is fine with a brimmed hat and a thin water-resistant layer. Shorten the run on slick footing. Change out of wet clothes quickly afterward. Never run in thunderstorms, flooded paths, or when visibility is dangerously low.",
        ],
        list: [
          "Indoor swap: treadmill, stairs, or elliptical for the same duration",
          "Match effort, not pace — weather days aren't PR days",
        ],
      },
      {
        heading: "Heat and humidity",
        paragraphs: [
          "Run early or near sunset. Slow 30–90 seconds per mile. Pre-hydrate and carry water on sessions over 30 minutes. Heat advisories mean treadmill or rest — overheating is not toughness.",
        ],
      },
      {
        heading: "Cold, ice, and snow",
        paragraphs: [
          "Layer with moisture-wicking base, insulating mid, and wind shell. Warm up indoors first. Traction helps on packed snow. When sidewalks are pure ice, treadmill or bike beats a fall.",
        ],
      },
      {
        heading: "Storms and lightning",
        paragraphs: [
          "If you hear thunder, you're close enough to be at risk. Head inside immediately. Wait 30 minutes after the last thunderclap before going back out. Rescheduling one run does not ruin your plan.",
        ],
      },
      {
        heading: "Wind and air quality",
        paragraphs: [
          "Start into the wind so the return leg is easier. Check local AQI — above 150, move indoors. Wildfire smoke and hazardous air mean rest or filtered indoor cardio, not heroics outside.",
        ],
      },
      {
        heading: "The habit matters more than the venue",
        paragraphs: [
          "Twenty minutes indoors counts as showing up. Open your training plan, match today's intended effort (easy, cross-train, or rest), and log it. Consistency beats perfection.",
        ],
        cta: { text: "See weather tips with indoor swaps", href: "/tips/bad-weather" },
      },
    ],
  },
  {
    slug: "running-with-health-conditions",
    title: "Running With Health Conditions: What to Know Before You Start",
    excerpt:
      "Pregnancy, age 55+, diabetes, asthma, arthritis, heart issues, and osteoporosis — general guidance and when to get medical clearance first.",
    category: "Health",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-28",
    readTime: "8 min",
    relatedSlugs: ["never-ran-where-to-start", "avoiding-injuries", "what-to-do-on-rest-days"],
    sections: [
      {
        paragraphs: [
          "Running can support health at many ages and with many conditions — but the right approach is individual. This article is general education, not medical advice. Your doctor's guidance always wins over any training plan.",
        ],
      },
      {
        heading: "Pregnancy",
        paragraphs: [
          "Get OB or midwife clearance first. Many active people run into the second trimester if they ran before pregnancy, but intensity and duration usually decrease. Use the talk test. Stop for pain, dizziness, contractions, or calf swelling. Return postpartum gradually — pelvic floor recovery matters.",
        ],
      },
      {
        heading: "Runners 55 and beyond",
        paragraphs: [
          "You can build fitness at any age. Prioritize easy pace, extra recovery, and strength work 2× per week for hips, glutes, and calves. Walk-run plans are excellent entry points. Fall prevention matters — even surfaces, good lighting, and balance work support confident running.",
        ],
      },
      {
        heading: "Diabetes",
        list: [
          "Discuss exercise timing with your care team, especially on insulin",
          "Check glucose before and after until patterns are clear",
          "Carry fast-acting carbs on every run",
          "Foot care and proper shoes reduce blister and ulcer risk",
        ],
        paragraphs: [
          "Do not run with very high or very low blood sugar. Your diabetes plan overrides any generic schedule.",
        ],
      },
      {
        heading: "Asthma",
        paragraphs: [
          "Confirm an action plan with your doctor. Cold, dry air and poor air quality trigger many people — treadmill days beat pushing through bad air. Start slower than you think. Stop for chest tightness or wheezing that doesn't ease with your plan.",
        ],
      },
      {
        heading: "Arthritis and joint pain",
        paragraphs: [
          "Mild osteoarthritis doesn't always mean stopping — softer surfaces and lower volume help many people. Rheumatoid flares may require rest instead of impact. Pain lasting more than 48 hours after a run is a signal to reduce load. Strength work for quads and hips often helps knees more than stretching alone.",
        ],
      },
      {
        heading: "Heart disease and hypertension",
        paragraphs: [
          "Cardiac clearance is essential after heart attack, stent, arrhythmia, or uncontrolled blood pressure. Easy, conversational pace is the default until a cardiologist says otherwise. Some medications affect heart rate — perceived effort may not match watch zones. Stop for chest pressure, arm or jaw pain, or unusual shortness of breath.",
        ],
      },
      {
        heading: "Osteoporosis",
        paragraphs: [
          "Weight-bearing activity can help bone health, but high-impact running may not suit everyone with low bone density or fracture history. Ask whether impact is safe for your T-score. If cleared, stay on predictable surfaces. Balance training reduces fall risk.",
        ],
        cta: { text: "Browse situation-specific tips", href: "/tips/specific-situations" },
      },
    ],
  },
  {
    slug: "performance-goals-over-aesthetics",
    title: "Why Performance Goals Beat 'Looking Better' for Lasting Fitness",
    excerpt:
      "Chasing aesthetics alone can backfire. Performance goals — a faster 5K, a longer run, showing up on hard days — build motivation and confidence that last.",
    category: "Mindset",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-30",
    readTime: "6 min",
    relatedSlugs: [
      "building-a-running-habit",
      "mental-side-of-running",
      "training-first-5k",
    ],
    sections: [
      {
        paragraphs: [
          "In fitness, aesthetic goals — losing fat, building muscle, achieving a certain look — are incredibly common and completely valid. Many of us start wanting to feel more confident in our bodies or fit into certain clothes. That's human.",
          "But as many runners learn the hard way, relying solely on how you look can quickly lead to frustration, obsession, and a sense that you're never quite enough.",
        ],
      },
      {
        heading: "When aesthetics are your only metric",
        paragraphs: [
          "Progress feels elusive. Your body might change slower than expected — or once you hit one milestone, another perceived flaw appears. Compliments provide temporary highs, but the goalpost keeps shifting: leaner, more toned, better.",
          "Over time, fitness stops feeling empowering and starts breeding anxiety. The mirror becomes a judge, not a friend.",
        ],
      },
      {
        heading: "The power of performance goals",
        paragraphs: [
          "Performance goals shift the focus from how you look to what your body can do. For runners, that might mean finishing a 5K, running a mile without walking, or simply showing up three times this week. This simple change makes progress tangible and worth celebrating.",
        ],
        list: [
          "Small wins are easier to notice: running a little longer, holding a faster pace on your easy loop, recovering faster, or showing up on a tough day",
          "The goalpost moves in an exciting way: your first 5K leads to wanting to run it faster; consistency builds into a streak you don't want to break",
          "Aesthetics often follow naturally: when you prioritize endurance or strength, physical changes often happen as a byproduct — without constant mirror scrutiny",
          "It builds transferable confidence: the discipline of showing up and keeping promises to yourself spills into work, relationships, and everything else hard",
        ],
      },
      {
        heading: "How to get started",
        paragraphs: [
          "You don't have to abandon aesthetic aspirations if they motivate you. Layer in performance goals instead — especially ones you can measure without a scale.",
        ],
        list: [
          "Set specific, measurable targets (e.g. \"Run 5K without walking\" or \"Complete three runs this week\")",
          "Track non-scale victories: energy levels, how you feel on stairs, pace at the same heart rate, or clothes fitting differently from stronger legs",
          "Celebrate consistency as much as outcomes — showing up when you don't feel like it is a huge win",
          "Use a plan so progress is visible: checking off runs on a calendar beats guessing whether you're \"doing enough\"",
        ],
      },
      {
        heading: "Fitness should make you feel capable",
        paragraphs: [
          "The point isn't to ignore how you look forever. It's to build a relationship with movement where you feel resilient and proud — not anxious or never-enough.",
          "By balancing (or prioritizing) performance goals, you create a sustainable journey filled with small, motivating victories that compound into real transformation.",
          "What performance goal are you setting for yourself? Share it in the comments — let's cheer each other on.",
        ],
        cta: { text: "Pick a training plan and set your first goal", href: "/plan" },
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return {
    ...post,
    whyItMatters: post.whyItMatters ?? getWhyItMatters(slug),
  };
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const fromSlugs = (post.relatedSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== undefined);

  if (fromSlugs.length >= 3) return fromSlugs.slice(0, 3);

  const seen = new Set([post.slug, ...fromSlugs.map((p) => p.slug)]);
  const sameCategory = blogPosts
    .filter((p) => p.category === post.category && !seen.has(p.slug))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return [...fromSlugs, ...sameCategory.map((p) => getPostBySlug(p.slug)!)]
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 3);
}
