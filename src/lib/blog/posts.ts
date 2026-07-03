import type { BlogPost } from "./types";
import { getWhyItMatters } from "./why-it-matters";
import { isBlogPostVisible } from "./preview";
import { isBlogPostPublishedAt } from "./publish-schedule";

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
    relatedSlugs: ["what-to-do-on-rest-days", "training-first-5k", "avoiding-injuries", "running-vs-biking"],
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
      "Tired of overwhelming running apps? LetsRunNow is your one stop for couch-to-marathon plans, running tips, gear picks, injury guidance, and progress tracking — free and beginner-friendly.",
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
        paragraphs: [
          "LetsRunNow is your one stop for couch-to-marathon plans, running tips, gear picks, injury guidance, and progress tracking — with quirky run names so it never feels like homework.",
          "You don't need fancy gear. You don't need to be fast. You just need to show up.",
        ],
        list: [
          "Proven plans from Couch to 5K all the way to full marathon",
          "Running tips for pacing, breathing, bad weather, and real-life situations",
          "Weekly gear picks — honest recommendations without the affiliate noise",
          "Injury guidance for prevention, recovery, and women-specific concerns",
          "Browser-based progress tracking — streaks, check-offs, and milestones",
          "Quirky run names that make you smile when your alarm goes off (yes, this helps)",
          "Realistic pacing advice — \"Slow is fast\" isn't just a slogan here. It's the whole philosophy.",
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
          "Running can support health at many ages and with many conditions — but the right approach is individual. **This article is general education, not medical advice. Your doctor's guidance always wins over any training plan.**",
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
  {
    slug: "why-walking-is-not-cheating",
    title: "Why Walking Is Not Cheating — How the Walk-Run Method Builds Real Fitness",
    excerpt:
      "How the walk-run method builds real fitness — and why your ego is lying to you when it says walking doesn't count.",
    category: "Getting Started",
    author: BLOG_AUTHOR,
    publishedAt: "2026-07-02",
    readTime: "6 min",
    relatedSlugs: [
      "never-ran-where-to-start",
      "how-to-pace-yourself",
      "training-first-5k",
    ],
    sections: [
      {
        paragraphs: [
          "Somewhere along the way, beginners internalized a toxic rule: if you're walking, you're failing. Social media clips of nonstop sprints don't help. Neither does the voice in your head that treats every walk break like a confession.",
          "Here's the truth elite coaches have known for decades: walk-run intervals are not a shortcut. They're a proven on-ramp to aerobic fitness — and for most new runners, they're the smartest way to start.",
        ],
      },
      {
        heading: "Your ego is not a coach",
        paragraphs: [
          "Ego wants you to suffer loudly so you feel like you \"really worked.\" Fitness wants you to repeat sessions often enough that your heart, lungs, and tendons adapt. Those goals conflict on day one.",
          "When you refuse to walk, you usually run too fast, cut sessions short, and wake up dreading the next one. Walking keeps effort in a zone where you can finish the workout, show up again, and actually get better.",
        ],
      },
      {
        heading: "What walk-run actually builds",
        list: [
          "Aerobic base — your engine learns to use oxygen efficiently",
          "Tendon and joint tolerance — tissues adapt gradually instead of revolting",
          "Confidence — finishing a session matters more than how it looks on paper",
          "Pacing sense — you learn what sustainable effort feels like before you need it on race day",
        ],
      },
      {
        heading: "A simple progression",
        paragraphs: [
          "You don't need a gadget or a PhD. Alternate short jogs with walk breaks from the first session. Keep jogs slow enough to talk. Add one minute of running per week, not one mile of pride per run.",
        ],
        list: [
          "Weeks 1–2: 1 min jog / 2 min walk, repeat 20–25 min",
          "Weeks 3–4: 2 min jog / 2 min walk, repeat 25–30 min",
          "Weeks 5–6: 3 min jog / 1 min walk, repeat 25–30 min",
          "Week 7+: experiment with longer continuous jogs — still slow",
        ],
      },
      {
        heading: "When walking on a run day is still a win",
        paragraphs: [
          "Bad sleep, heat, stress, or soreness? A brisk walk keeps your habit alive without digging a recovery hole. That's not cheating — that's training like someone who plans to still be running six months from now.",
        ],
        cta: { text: "Start the free 8-week 5K plan", href: "/plan" },
      },
    ],
  },
  {
    slug: "what-to-do-when-you-miss-a-run",
    title: "What to Do When You Miss a Run",
    excerpt:
      "Spoiler: don't quit. Here's how to get back on track without guilt — and without the 'make-up' mileage trap.",
    category: "Mindset",
    author: BLOG_AUTHOR,
    publishedAt: "2026-07-06",
    readTime: "5 min",
    relatedSlugs: [
      "building-a-running-habit",
      "what-to-do-on-rest-days",
      "performance-goals-over-aesthetics",
    ],
    sections: [
      {
        paragraphs: [
          "You missed a run. Maybe work exploded, the kids were sick, or you simply didn't want to. The shame spiral arrives fast: \"I've ruined everything. Might as well stop.\"",
          "Spoiler: you haven't ruined anything. One missed run is a blip. Quitting because of one missed run is the actual problem — and it's optional.",
        ],
      },
      {
        heading: "Step 1: Drop the guilt, keep the habit",
        paragraphs: [
          "Guilt feels productive but rarely gets you out the door. Replace \"I'm bad at this\" with \"I'm someone who runs on Tuesdays and Thursdays — and today wasn't that day.\" Identity survives a single miss.",
        ],
      },
      {
        heading: "Step 2: Don't \"make up\" the run",
        list: [
          "No doubling tomorrow's mileage to \"balance the ledger\"",
          "No squeezing two runs into one day unless your plan explicitly allows it",
          "No punishing speed work because you feel behind",
        ],
        paragraphs: [
          "Make-up mileage is how beginners get shin splints. The plan assumes life happens. Just do the next scheduled run as written — usually at easy pace.",
        ],
      },
      {
        heading: "Step 3: Ask why you missed it (briefly)",
        list: [
          "Schedule conflict → block the next run on your calendar like a meeting",
          "Fatigue or illness → rest was correct; return when symptoms improve",
          "Motivation dip → shrink the goal to shoes-on and five minutes out the door",
          "Pain → treat as a body signal, not a character flaw; adjust or rest",
        ],
      },
      {
        heading: "Step 4: Show up for the next one",
        paragraphs: [
          "The comeback run should feel almost easy. You're rebuilding trust with yourself, not proving a point. Check off the next workout on your plan and move on.",
          "Missed a whole week? Don't restart at week one unless you were injured. Repeat the current week or drop back one week — then keep going. Consistency over perfection, always.",
        ],
        cta: { text: "Open your training plan", href: "/plan" },
      },
    ],
  },
  {
    slug: "beginner-gear-guide-under-50",
    title: "Beginner Gear Guide Under $50",
    excerpt:
      "Shoes, socks, and the one app you actually need — a sensible starter kit that won't drain your wallet before your first 5K.",
    category: "Gear",
    author: BLOG_AUTHOR,
    publishedAt: "2026-07-10",
    readTime: "5 min",
    relatedSlugs: [
      "choosing-running-shoes",
      "never-ran-where-to-start",
      "why-letsrunnow",
    ],
    sections: [
      {
        paragraphs: [
          "Running Instagram wants you to believe you need carbon plates, compression everything, and a watch that predicts the weather. You don't — not yet.",
          "Here's a honest under-$50 starter kit that covers what actually matters for your first few months. Shoes are the big ticket; everything else is cheap insurance against blisters and boredom.",
        ],
      },
      {
        heading: "Shoes: spend here first",
        paragraphs: [
          "This is the one place where \"under $50\" might mean last-season sales or outlet deals — not random fashion sneakers. Running shoes protect your joints and make jogging feel possible.",
          "Visit a running store if you can and ask for last year's model on clearance. Online outlets work if you know your size from a prior fitting. Prioritize comfort and room in the toe box over brand hype.",
        ],
      },
      {
        heading: "Socks: the underrated upgrade ($10–15)",
        paragraphs: [
          "Cotton gym socks hold sweat and cause hot spots. A pair of running-specific socks with moisture-wicking fabric prevents blisters better than almost any gadget.",
          "You don't need a drawer full — two or three pairs you rotate through the week are enough.",
        ],
      },
      {
        heading: "What you already own",
        list: [
          "T-shirt and shorts or leggings — no cotton is nice, not required on day one",
          "Phone for time tracking — the clock app works fine",
          "Water bottle for longer sessions or hot days",
          "Reflective gear or bright colors if you run near traffic at dawn or dusk",
        ],
      },
      {
        heading: "The one app you actually need: free",
        paragraphs: [
          "Strava (or any simple tracker) helps you log runs, see progress, and stay honest about consistency. The free tier is plenty for beginners — GPS, pace, distance, and history.",
          "Pair it with a structured plan so you're not guessing each week. LetsRunNow gives you the schedule; Strava (optional) gives you the receipts.",
        ],
        list: [
          "Skip for now: $400 watches, heart-rate chest straps, gels, and race belts",
          "Skip for now: multiple shoe rotations before you've worn out pair one",
          "Skip for now: gadgets that measure everything except whether you showed up",
        ],
        cta: { text: "Browse the full gear guide", href: "/gear" },
      },
    ],
  },
  {
    slug: "how-to-not-hate-hills",
    title: "How to Not Hate Hills",
    excerpt:
      "Climbs don't have to wreck your mood or your pace. Posture, effort, and a few mental tricks make hills your secret strength session.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-07-14",
    readTime: "6 min",
    relatedSlugs: [
      "how-to-pace-yourself",
      "breathing-while-running",
      "training-first-5k",
    ],
    sections: [
      {
        paragraphs: [
          "Hills are where beginner dreams go to die — or so it feels the first time your neighborhood turns upward and your legs turn to concrete. Everyone else seems to float; you seem to stop.",
          "Good news: hills aren't a test of worthiness. They're a skill. And with a few adjustments, they become short strength sessions that make flat ground feel like a gift.",
        ],
      },
      {
        heading: "Slow down before the hill slows you down",
        paragraphs: [
          "The #1 hill mistake is charging the bottom at the same pace as flat ground. By halfway up, you're in oxygen debt and mentally checked out.",
          "Ease off at the base. Aim for the same effort — not the same speed. Your pace will drop; that's correct. Think \"jogging in place up an escalator\" rather than \"sprinting the stairs at work.\"",
        ],
      },
      {
        heading: "Posture and form on the climb",
        list: [
          "Lean slightly from the ankles, not the waist — don't fold over",
          "Shorten your stride; quick, light steps beat long lunges uphill",
          "Drive arms a little more — they set rhythm when legs burn",
          "Look ahead a few meters, not at your feet — chest open, breathing easier",
        ],
      },
      {
        heading: "Breathing and walk breaks",
        paragraphs: [
          "Power-hiking a steep section is not failure — trail runners do it on purpose. Walk with purpose: tall posture, brisk steps, keep moving.",
          "Exhale on a steady rhythm. If you can't speak a short phrase, slow down or walk until you can. The top of the hill is not going anywhere.",
        ],
      },
      {
        heading: "Mental tricks that actually work",
        list: [
          "\"One more mailbox\" — shrink the climb into tiny finish lines",
          "\"This is making flat runs free speed later\" — hills build leg strength and cardio",
          "Celebrate the descent — easy reward on the way down, but control speed so knees stay happy",
          "Repeat the same hill weekly — familiarity kills dread faster than avoidance",
        ],
      },
      {
        heading: "Put hills in your plan on purpose",
        paragraphs: [
          "Once a week, finish an easy run with a short uphill repeat or a hilly loop at conversational effort. You're not racing the hill — you're teaching your body it survives them.",
        ],
        cta: { text: "See pacing tips for easy runs", href: "/blog/how-to-pace-yourself" },
      },
    ],
  },
  {
    slug: "first-run-tips",
    title: "First Run Tips: What to Know Before You Head Out the Door",
    excerpt:
      "Nervous about run one? Pace, route, shoes, and what to expect — the essentials that keep your first jog from becoming your last.",
    category: "Getting Started",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-29",
    readTime: "6 min",
    relatedSlugs: [
      "never-ran-where-to-start",
      "why-walking-is-not-cheating",
      "how-to-pace-yourself",
    ],
    sections: [
      {
        paragraphs: [
          "Your first run doesn't need to be heroic. It needs to be repeatable. The goal isn't to prove fitness — it's to finish feeling like you could do it again within a few days.",
          "These tips apply whether you're doing walk-run intervals or jogging the whole way. Get these right and run two gets much easier.",
        ],
      },
      {
        heading: "Before you leave the house",
        list: [
          "Eat something light 1–2 hours ahead if you're hungry — a banana or toast is plenty",
          "Use the bathroom; you'll thank yourself at minute eight",
          "Tie shoes snugly with room in the toe box — blisters start on run one",
          "Tell someone where you're going or stick to a familiar loop if running alone",
          "Charge your phone or wear a watch if you're tracking time",
        ],
      },
      {
        heading: "Pace: slow enough to talk",
        paragraphs: [
          "If you can't speak in short sentences, you're going too fast. Walk breaks are not failure — they're part of the workout for most beginners.",
          "Ignore other runners on the path. Your pace is your pace. Comparison on day one is useless and discouraging.",
        ],
      },
      {
        heading: "Pick a simple route",
        list: [
          "Flat or gently rolling — save hills for later",
          "Out-and-back so you know exactly how far you've gone",
          "Well-lit and low-traffic if you're running near roads",
          "Avoid trails with roots and rocks until you're confident on pavement",
        ],
      },
      {
        heading: "During the run",
        list: [
          "Start with 5 minutes of brisk walking to warm up",
          "Check in at 10 minutes: still okay? keep going. Miserable? walk home without guilt",
          "Breathe naturally — don't hold your breath on uphills",
          "Carry water on hot days or runs longer than 30 minutes",
        ],
      },
      {
        heading: "Right after you finish",
        paragraphs: [
          "Walk 3–5 minutes to cool down. Stretch only if it feels good — gentle calf and quad stretches, nothing aggressive.",
          "Note how you feel and what worked. That's data for run two, not a grade on your worth as a human.",
        ],
        cta: { text: "Start the free 8-week 5K plan", href: "/plan" },
      },
    ],
  },
  {
    slug: "what-to-wear-running",
    title: "What to Wear for Running (Without Overthinking It)",
    excerpt:
      "You don't need a race kit on day one. Here's what to wear in heat, cold, and everything in between — plus what to skip.",
    category: "Gear",
    author: BLOG_AUTHOR,
    publishedAt: "2026-07-24",
    readTime: "5 min",
    relatedSlugs: [
      "beginner-gear-guide-under-50",
      "choosing-running-shoes",
      "running-in-bad-weather",
    ],
    sections: [
      {
        paragraphs: [
          "Running clothes don't need to be expensive or branded. They need to keep you comfortable, visible, and blister-free. Most beginners overbuy gadgets and underthink fabric and fit.",
        ],
      },
      {
        heading: "The non-negotiables",
        list: [
          "Running shoes that fit — not old court sneakers or stiff fashion trainers",
          "Moisture-wicking socks — cotton holds sweat and causes hot spots",
          "Top and bottoms that don't rub — seams and tags matter on longer runs",
        ],
      },
      {
        heading: "Warm weather (above 65°F / 18°C)",
        list: [
          "Light synthetic or merino tee — avoid heavy cotton",
          "Shorts or light leggings — whatever you won't adjust every mile",
          "Hat or visor and sunscreen on exposed skin",
          "Sunglasses if glare bothers you",
          "Light-colored or reflective gear if you're near traffic",
        ],
      },
      {
        heading: "Cool weather (45–65°F / 7–18°C)",
        paragraphs: [
          "Dress like it's 10–15°F warmer than the thermometer says — you'll heat up within 10 minutes.",
        ],
        list: [
          "Long sleeve tech tee or thin base layer",
          "Shorts or tights depending on leg preference",
          "Light gloves and ear cover optional below 50°F",
          "Zip-up you can tie around your waist if you over-layer",
        ],
      },
      {
        heading: "Cold or wet weather",
        list: [
          "Base layer + wind-resistant outer shell — avoid cotton entirely",
          "Tights or lined pants below 40°F",
          "Brimmed cap or beanie — pick one, not both unless truly freezing",
          "Reflective vest or bright jacket when it's dim or rainy",
        ],
        paragraphs: [
          "See our bad-weather tips for when to run outside vs swap to an indoor cross-training day.",
        ],
      },
      {
        heading: "What you can skip for now",
        list: [
          "Compression sleeves, belts, and hydration packs for short beginner runs",
          "Brand-new outfit every season — rotate two tops and two bottoms",
          "Cotton hoodies and sweatpants — they get heavy and cold when wet",
        ],
        cta: { text: "Browse the gear guide", href: "/gear" },
      },
    ],
  },
  {
    slug: "post-run-recovery",
    title: "Post-Run Recovery: What Actually Helps After a Run",
    excerpt:
      "Cool-down, fuel, sleep, and soreness — the simple recovery habits that keep beginners showing up three times a week.",
    category: "Recovery",
    author: BLOG_AUTHOR,
    publishedAt: "2026-07-29",
    readTime: "6 min",
    relatedSlugs: [
      "what-to-do-on-rest-days",
      "nutrition-for-runners",
      "avoiding-injuries",
    ],
    sections: [
      {
        paragraphs: [
          "Recovery isn't just for elites with ice baths and massage guns. Beginners need it more — your muscles, tendons, and joints are adapting to impact they haven't handled before.",
          "Good post-run habits reduce soreness, prevent injury, and make the next run feel possible instead of dreaded.",
        ],
      },
      {
        heading: "The first 10 minutes after you stop",
        list: [
          "Keep moving — walk 3–5 minutes instead of collapsing on the couch",
          "Gentle calf, quad, and hip stretches if tight — 20–30 seconds each, no bouncing",
          "Change out of damp clothes quickly in cold weather",
          "Rehydrate — water first; sports drink only after long or very sweaty runs",
        ],
      },
      {
        heading: "Fuel within 1–2 hours",
        paragraphs: [
          "You don't need a protein shake ritual. Eat a normal balanced meal or snack with carbs and some protein — yogurt and fruit, eggs and toast, or whatever you'd eat after a workout.",
          "Skimping on food after hard efforts slows recovery and can leave you wiped out the next day.",
        ],
      },
      {
        heading: "Soreness: normal vs warning signs",
        list: [
          "Normal: general leg stiffness 24–48 hours after a harder or longer run",
          "Normal: calves and quads feel tired walking downstairs",
          "Caution: sharp pain in one spot that changes your gait",
          "Stop and rest: pain that worsens during a run or keeps you up at night",
        ],
        paragraphs: [
          "Light walking or easy cross-training on sore days is fine. Running through sharp pain is not.",
        ],
      },
      {
        heading: "Sleep and rest days",
        paragraphs: [
          "Most adaptation happens while you sleep. Shortchanging sleep while adding running stress is a common beginner mistake.",
          "Rest days in your plan are workouts too — they're when your body rebuilds. Don't fill every rest day with extra miles to \"get ahead.\"",
        ],
      },
      {
        heading: "Simple extras that help (optional)",
        list: [
          "Foam rolling tight calves and quads — 2–3 minutes, not a torture session",
          "Elevating legs for 10 minutes after a long run",
          "Ice on a specific hot spot for 10–15 minutes if something feels inflamed",
          "Two short strength sessions per week — glutes, calves, core",
        ],
        cta: { text: "Read what to do on rest days", href: "/blog/what-to-do-on-rest-days" },
      },
    ],
  },
  {
    slug: "nutrition-basics-for-beginners",
    title: "Nutrition Basics for Beginners: What to Eat When You Start Running",
    excerpt:
      "You don't need a perfect diet to start running. Simple daily habits, easy pre-run snacks, and post-run meals that support energy without overwhelm.",
    category: "Nutrition",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-24",
    readTime: "7 min",
    relatedSlugs: [
      "nutrition-for-runners",
      "training-first-5k",
      "post-run-recovery",
    ],
    sections: [
      {
        paragraphs: [
          "Nutrition advice online sounds like a chemistry exam — macros, timing windows, supplement stacks. Beginners need something simpler: eat enough, hydrate, and don't experiment on race day.",
          "This guide covers daily basics. For distance-specific fueling (5K vs half vs marathon), see our [full runner's nutrition guide](/blog/nutrition-for-runners).",
        ],
      },
      {
        heading: "The three rules that matter most",
        list: [
          "Eat regular meals — skipping lunch then wondering why evening runs feel awful is a pattern, not a mystery",
          "Include carbs, protein, and some healthy fat at most meals — you need fuel and recovery building blocks",
          "Drink water through the day — chugging right before a run often leads to sloshing, not hydration",
        ],
      },
      {
        heading: "Before a run (30–90 minutes out)",
        list: [
          "Small, familiar snack if hungry: banana, toast with peanut butter, or yogurt",
          "Avoid heavy, greasy, or high-fiber meals right before you head out",
          "Coffee is fine if it's your normal — don't try espresso for the first time pre-run",
          "Short easy runs under 45 minutes rarely need special fuel beyond normal eating",
        ],
      },
      {
        heading: "After a run",
        list: [
          "Eat within 1–2 hours — carbs plus protein (eggs and toast, rice bowl, smoothie with fruit)",
          "Rehydrate with water; sports drinks are optional after sweaty or long efforts",
          "You don't need a recovery shake — real food works fine",
        ],
      },
      {
        heading: "What beginners can ignore (for now)",
        list: [
          "Exact macro tracking and calorie apps",
          "Gels and chews for runs under an hour",
          "Keto, fasted running, or cutting carbs while building mileage",
          "Expensive supplements marketed to runners",
        ],
      },
      {
        heading: "Red flags worth paying attention to",
        list: [
          "Dizziness or heavy fatigue on easy runs — could be under-fueling or dehydration",
          "Frequent stomach issues — log what you ate and adjust timing or fiber",
          "Lost period or persistent low energy — talk to a doctor; under-fueling affects health, not just pace",
        ],
        cta: {
          text: "Read distance-specific fueling guide",
          href: "/blog/nutrition-for-runners",
        },
      },
    ],
  },
  {
    slug: "bodyweight-strength-for-runners",
    title: "Simple Bodyweight Strength Routines for Runners",
    excerpt:
      "Two short sessions per week — no gym required. Glutes, calves, and core work that keeps beginners injury-free and climbing hills with less dread.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-24",
    readTime: "8 min",
    relatedSlugs: [
      "importance-of-cross-training",
      "avoiding-injuries",
      "how-to-not-hate-hills",
      "dumbbell-strength-at-home-for-runners",
    ],
    sections: [
      {
        paragraphs: [
          "Running builds endurance, not balanced strength. Weak glutes and calves are behind many beginner shin and knee issues — and they make hills feel harder than they need to be.",
          "The good news: you don't need a gym membership. Two 15–20 minute bodyweight sessions per week on non-running days (or after easy runs) is enough to start.",
        ],
      },
      {
        heading: "Session A — Glutes & hips (15–20 min)",
        paragraphs: [
          "Do 2 rounds. Rest 30–45 seconds between exercises. Move with control — sloppy reps don't help.",
        ],
        list: [
          "Glute bridges — 12 reps. Squeeze at the top for 2 seconds",
          "Clamshells — 10 each side. Keep hips stacked, don't roll back",
          "Reverse lunges — 8 each leg. Short steps, torso tall",
          "Side plank — 20–30 seconds each side",
          "Calf raises — 15 slow reps. Pause at the top, lower slowly",
        ],
      },
      {
        heading: "Session B — Core & stability (15–20 min)",
        list: [
          "Dead bug — 8 each side. Lower back pressed to floor",
          "Bird dog — 8 each side. Reach long, don't wobble",
          "Plank — 20–40 seconds. Hips level, don't sag",
          "Single-leg Romanian deadlift (bodyweight) — 8 each leg. Soft knee, hinge at hip",
          "Wall sit — 30–45 seconds. Thighs parallel if comfortable",
        ],
      },
      {
        heading: "When to schedule strength",
        list: [
          "After easy runs or on rest days — not right before intervals or long runs",
          "Same two days each week beats random 'when I remember'",
          "If you're sore for 2+ days after strength, reduce reps or skip a round",
        ],
      },
      {
        heading: "Progression without complexity",
        paragraphs: [
          "After 3–4 weeks, add a third round or slow down each rep for more time under tension. That's enough for months of beginner training.",
          "Our plans already include cross-training days — treat one of those as your strength session.",
        ],
        cta: {
          text: "See why cross-training matters",
          href: "/blog/importance-of-cross-training",
        },
      },
    ],
  },
  {
    slug: "running-form-101",
    title: "Running Form 101: Posture, Footstrike & Cadence for Beginners",
    excerpt:
      "You don't need a coach on day one. A few visual cues for posture, where your feet land, arm swing, and step rate make running feel smoother and safer.",
    category: "Getting Started",
    author: BLOG_AUTHOR,
    publishedAt: "2026-08-10",
    readTime: "7 min",
    relatedSlugs: [
      "breathing-while-running",
      "how-to-pace-yourself",
      "first-run-tips",
    ],
    sections: [
      {
        paragraphs: [
          "Beginners often worry they're running 'wrong.' Most form fixes are simple: stand tall, don't overstride, and keep arms relaxed. You don't need to obsess — small adjustments beat a complete overhaul mid-run.",
        ],
      },
      {
        heading: "Posture: tall and slightly forward",
        paragraphs: [
          "Imagine a string pulling the top of your head up. Lean slightly from the ankles — not bending at the waist. Look ahead about 10–20 feet, not at your shoes.",
        ],
        figures: [
          {
            src: "/blog/running-form/posture.svg",
            alt: "Diagram showing tall running posture with a slight forward lean from the ankles",
            caption: "Stay tall through the chest. Lean comes from the ankles, not a hunched waist.",
          },
        ],
      },
      {
        heading: "Where your feet land",
        paragraphs: [
          "Land with your foot roughly under your hips — not way out in front. Overstriding acts like a brake and increases impact on knees and shins.",
          "Heel, midfoot, or forefoot matters less than not reaching. Quicker, shorter steps usually fix overstriding automatically.",
        ],
        figures: [
          {
            src: "/blog/running-form/footstrike.svg",
            alt: "Diagram comparing landing under the hips versus overstriding with the foot landing far in front",
            caption: "Shorter steps help you land under your body instead of reaching forward.",
          },
        ],
      },
      {
        heading: "Arms and shoulders",
        paragraphs: [
          "Keep shoulders low and loose. Arms bend about 90° and swing forward and back — not across your chest like you're twisting a towel.",
        ],
        figures: [
          {
            src: "/blog/running-form/arms.svg",
            alt: "Diagram showing relaxed arm swing with elbows bent near 90 degrees",
            caption: "Relaxed shoulders, elbows bent, arms driving forward and back.",
          },
        ],
      },
      {
        heading: "Cadence: steps per minute",
        paragraphs: [
          "Many beginners run around 150–160 steps per minute. A slightly quicker cadence — often 170–180 for easy running — can reduce overstriding and feel smoother.",
          "Count one foot for 30 seconds and double it, or use a free metronome app at 170 bpm for a few minutes during an easy run.",
        ],
        figures: [
          {
            src: "/blog/running-form/cadence.svg",
            alt: "Diagram illustrating quicker shorter running steps and a target cadence around 170 to 180 steps per minute",
            caption: "Quicker, shorter steps — not sprinting. Aim for roughly 170–180 steps per minute on easy runs.",
          },
        ],
      },
      {
        heading: "What not to fix on run one",
        list: [
          "Don't force a forefoot strike if it feels unnatural — fix overstriding first",
          "Don't stare at the ground — it collapses posture",
          "Don't tense your jaw and fists — relaxation saves energy",
          "Film yourself only if curious; feeling smooth matters more than looking Olympic",
        ],
        cta: { text: "Read breathing basics", href: "/blog/breathing-while-running" },
      },
    ],
  },
  {
    slug: "running-guide-for-women",
    title: "A Beginner Running Guide for Women",
    metaTitle:
      "Beginner Running Guide for Women: Bras, Cycle, Pregnancy & More",
    excerpt:
      "Sports bras, training through your cycle, bone health, pregnancy return, and confidence on the road — practical advice for women starting a running habit.",
    category: "Health",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-23",
    readTime: "18 min",
    relatedSlugs: [
      "running-with-health-conditions",
      "nutrition-basics-for-beginners",
      "avoiding-injuries",
      "choosing-running-shoes",
      "bodyweight-strength-for-runners",
    ],
    closingQuestion:
      "What's your biggest question about running as a woman? Share below — your experience might help another beginner.",
    faq: [
      {
        question: "Can I run on my period?",
        answer:
          "Yes for most women — easy runs or walk-run are fine if cramps aren't severe. Hydrate well and don't force intervals on heavy-flow days. See our [menstrual cycle section](#menstrual-cycle) for phase-based adjustments.",
      },
      {
        question: "How do I know if my sports bra fits correctly?",
        answer:
          "The band should stay level around your ribcage without riding up; cups contain tissue without spillage; and you can take a deep breath without the band digging. Jump in place — minimal bounce means good support for running.",
      },
      {
        question: "Is it normal to leak a little when I run after having kids?",
        answer:
          "Common, but not something you have to accept long-term. Many women improve with pelvic floor physio. Read our [women runner injuries guide](/injuries/for-women-runners#pelvic-floor) before ramping mileage.",
      },
      {
        question: "When can I start running again after giving birth?",
        answer:
          "Usually not before 6 weeks minimum — often 8–12+ depending on delivery type and clearance. You should walk 30–45 minutes comfortably and do basic core work without pain or bulging before run-walk. Always get provider clearance first.",
      },
      {
        question: "Can running cause me to lose my period?",
        answer:
          "Training hard without eating enough can disrupt cycles (RED-S). A missed period while mileage increases is a medical signal, not a badge of discipline. See a clinician and review fueling before adding more miles.",
      },
      {
        question: "Do I need special shoes as a woman?",
        answer:
          "You need shoes that fit **your** feet — not a gender label. Read our [choosing running shoes](/blog/choosing-running-shoes) guide and get fitted if possible.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Most beginner running advice is written as if every body responds the same. Women starting out often have specific questions — about gear, energy shifts across the month, bone health, pregnancy, and feeling like they belong on the path.",
          "Hormonal fluctuations, pelvic anatomy, lower average peak bone density, and pregnancy or postpartum history all shape how training feels. That doesn't mean running isn't for you — it means smart setup beats generic advice.",
          "Guidelines vary by country — follow your national screening advice for breast, prostate, and heart checks.",
          "**This isn't medical advice. When in doubt, talk to your doctor or a women's health specialist.** What follows are practical starting points that help many women run consistently and safely.",
        ],
      },
      {
        id: "gear",
        heading: "Gear that actually matters for women",
        paragraphs: [
          "You don't need a closet full of tech wear. A few pieces chosen for **your** body make the first months much more comfortable.",
        ],
        subsections: [
          {
            heading: "Sports bras: high-impact vs everyday",
            paragraphs: [
              "Running is high-impact. A yoga bra or low-support crop top won't cut it for most women once you progress past walk-run.",
            ],
            list: [
              "**Encapsulation** — separate cups support each breast; best for larger cup sizes and long runs",
              "**Compression** — presses tissue against the chest; works for smaller sizes or as a layer under encapsulation bras",
              "**High-impact rating** — look for running-specific bras, not 'medium support' training bras",
              "**Measure the band** — under bust, snug but breathable; cup size follows brand charts (sizes vary wildly)",
              "Replace when elasticity fades — usually every 6–12 months of regular use",
            ],
          },
          {
            heading: "Chafing prevention",
            paragraphs: [
              "Friction hits thighs, sports bra bands, nipples, and underarms. Prevention beats treating bloody hot spots later.",
            ],
            list: [
              "Anti-chafe balm (Body Glide, Squirrel's Nut Butter, or similar) on bra lines and inner thighs before long runs",
              "Technical fabric tops and bottoms — skip cotton for anything longer than 20 minutes",
              "Seamless or flat-seam leggings reduce inner-thigh rub",
              "See our [gear guide](/gear#chafing-creams) for chafing creams and apparel picks",
            ],
          },
          {
            heading: "Period-friendly gear",
            list: [
              "Dark-colored shorts or leggings if you're anxious about visibility — most runners are focused on their own pace, not you",
              "Leak-proof period underwear or a backup liner on heavy days can ease mental load",
              "High-waist leggings that don't dig into a bloated belly on luteal-phase days",
            ],
          },
          {
            heading: "Modest and practical options",
            list: [
              "Longer running skirts or looser tunics over leggings if coverage matters for your comfort or culture",
              "Layer a light zip jacket for easy temperature control — you can tie it around your waist once warm",
              "A cap or visor plus sunglasses if you prefer less attention on bad-hair days",
            ],
          },
        ],
        cta: {
          text: "Browse the gear guide",
          href: "/gear",
        },
      },
      {
        id: "menstrual-cycle",
        heading: "Training with your menstrual cycle",
        paragraphs: [
          "Energy and recovery shift across the month. Tracking how you feel for 2–3 cycles beats fighting every sluggish day — or forcing PR attempts when your body wants rest.",
        ],
        subsections: [
          {
            heading: "The four phases (simplified)",
            list: [
              "**Menstrual (days 1–5)** — often lower energy; cramps possible. Easy runs, walk-run, or rest are all valid",
              "**Follicular (after period → ovulation)** — rising estrogen; many women feel strongest here. Good window for intervals or strength",
              "**Ovulation (~mid-cycle)** — peak energy for some; some women feel less stable on max efforts — ease in if joints feel off",
              "**Luteal (after ovulation → next period)** — progesterone rises; you may need more recovery time, carbs, and sleep. Back off hero workouts if RPE feels high",
            ],
          },
          {
            heading: "Practical adjustments",
            list: [
              "Luteal phase: add an extra rest day or swap intervals for easy miles — consistency over months beats one hard week",
              "Heavy flow days: shorter loops near home; pack a liner if it helps your confidence",
              "Track with Clue, Flo, or a simple journal: cycle day + run quality. Patterns emerge fast",
            ],
          },
          {
            heading: "Iron deficiency — very common",
            paragraphs: [
              "Heavy periods plus running can drain iron stores. Fatigue that doesn't match training load deserves a blood test — not another coffee.",
            ],
            list: [
              "Symptoms: breathlessness on easy runs, restless legs, pale skin, brain fog",
              "Food sources: lean red meat, lentils, spinach, fortified cereals — pair plant iron with vitamin C",
              "Don't supplement iron without testing — excess iron causes problems too",
            ],
          },
          {
            heading: "Hormonal contraceptives and training",
            list: [
              "Combined pill: some women feel bloated or sluggish on active pills — adjust hard workout timing if needed",
              "Progestin-only (mini-pill, implant, hormonal IUD): irregular bleeding is common early on; usually stabilizes",
              "Depo injection: long-term use may affect bone density — discuss with your doctor if you're high-mileage",
              "Copper IUD: no hormones — cycles often stay natural; heavier periods possible",
              "Track 2–3 months after any method change before judging energy on runs",
            ],
          },
        ],
        cta: {
          text: "Women runner health topics",
          href: "/injuries/for-women-runners#menstrual-cycle",
        },
      },
      {
        id: "bone-health",
        heading: "Bone health and nutrition",
        paragraphs: [
          "Running can build bone when progressed gradually — but under-fueling, missed periods, and too much too soon work against you. The link between **RED-S**, **amenorrhea**, and **stress fractures** is well documented.",
        ],
        subsections: [
          {
            heading: "RED-S and the Female Athlete Triad",
            paragraphs: [
              "Relative Energy Deficiency in Sport (RED-S) means training outpaces fueling. The older term **Female Athlete Triad** — low energy, menstrual dysfunction, low bone density — describes the same risk pattern many clinicians still use.",
            ],
            list: [
              "Missed or irregular periods while mileage climbs = stop adding miles; see a clinician",
              "Low estrogen from under-fueling accelerates bone loss — even in your 20s",
              "Full guide: [RED-S & bone health for women runners](/injuries/for-women-runners#red-s-bone-health)",
            ],
          },
          {
            heading: "Nutrition basics",
            list: [
              "**Calcium** — yogurt, cheese, fortified plant milks, leafy greens, sardines with bones",
              "**Vitamin D** — sunlight, fatty fish, fortified foods; test before high-dose supplements",
              "**Protein** — roughly 1.2–1.6 g/kg body weight for active women; spread across meals",
              "Pre-run snack (60–90 min before): banana + peanut butter or toast with jam",
              "Post-run: protein + carbs within 1–2 hours — recovery drives bone repair too",
              "More detail: [nutrition basics for beginners](/blog/nutrition-basics-for-beginners)",
            ],
          },
          {
            heading: "Strength training for bone",
            list: [
              "2× per week, non-consecutive days: squats, lunges, hip thrusts/glute bridges, planks",
              "Bodyweight is enough to start — see [bodyweight strength for runners](/blog/bodyweight-strength-for-runners)",
              "Add dumbbells when form is solid: [home dumbbell routine](/blog/dumbbell-strength-at-home-for-runners)",
              "Increase running mileage slowly — the 10% weekly rule is a reasonable guardrail",
            ],
          },
        ],
      },
      {
        id: "pregnancy-postpartum",
        heading: "Pregnancy and postpartum return",
        paragraphs: [
          "Many women run during pregnancy with medical clearance. Postpartum return needs more patience than your pre-baby Strava stats suggest — pelvic floor recovery often matters more than cardio fitness.",
        ],
        subsections: [
          {
            heading: "During pregnancy (by trimester)",
            list: [
              "**First trimester** — nausea and fatigue are real; walk-run counts. Get OB/midwife clearance before starting or continuing",
              "**Second trimester** — many women run longest here with modified intensity; use the talk test",
              "**Third trimester** — shorter, flatter routes; avoid long supine core work; stop for contractions, bleeding, dizziness, or calf swelling",
              "Hydrate more than pre-pregnancy; overheating risk rises — run cooler times of day",
            ],
          },
          {
            heading: "Postpartum timeline",
            list: [
              "**4–6 week check-up** — ask explicitly about return to impact, not just 'exercise'",
              "**6–12+ weeks** — typical minimum before running; C-section often needs longer for core healing",
              "Walk 30–45 minutes comfortably before run-walk intervals",
              "Rebuild walk-run before continuous miles; hills and speed come later",
              "Detailed guide: [pregnancy & postpartum injuries section](/injuries/for-women-runners#pregnancy-postpartum)",
            ],
          },
          {
            heading: "Diastasis recti — quick self-check",
            list: [
              "Lie on your back, knees bent. Lift head slightly and feel along your midline above the navel",
              "A gap or doming/bulging during core work is a warning sign — avoid sit-ups and planks until assessed",
              "A women's health physio can measure the gap and guide safe return to impact",
            ],
          },
          {
            heading: "Breastfeeding and running",
            list: [
              "Feed or pump before running if full breasts are uncomfortable — high-support, adjustable bras essential",
              "Extra 300–500 kcal/day while breastfeeding — under-fueling tanks energy and milk supply",
              "Hydrate consistently; keep loops short until you know how your body responds",
            ],
          },
          {
            heading: "C-section vs vaginal birth",
            list: [
              "**Vaginal** — pelvic floor assessment before high mileage; tearing or episiotomy may need extra rehab",
              "**C-section** — abdominal incision healing before hills and speed; scar tissue mobility matters; ask when impact is safe",
            ],
          },
        ],
        cta: {
          text: "Pregnancy & health situation tips",
          href: "/tips/specific-situations",
        },
      },
      {
        id: "menopause",
        heading: "Menopause and perimenopause",
        paragraphs: [
          "Hormonal shifts in your 40s and 50s change recovery, sleep, joint comfort, and bone density. Running still helps — but the setup may need adjusting.",
        ],
        list: [
          "Joint aches and longer warm-ups — easy miles and mobility before intensity",
          "Hot flashes: dress in layers; carry water; morning runs may feel easier than midday heat",
          "Bone density: ask about DEXA scans; strength training and adequate calcium/vitamin D matter more",
          "Recovery takes longer — space hard days further apart",
          "See [bone health (perimenopause+)](/injuries/for-women-runners#osteoporosis-risk) on our injuries guide",
        ],
      },
      {
        id: "injuries",
        heading: "Common injuries women face",
        paragraphs: [
          "RED-S, pelvic floor symptoms, and pregnancy return questions dominate women's training searches. They're not inevitable — early signs and the right specialist beat pushing through.",
        ],
        list: [
          "Lost or irregular periods while training hard — possible under-fueling (RED-S); see a clinician",
          "Leakage or heaviness on impact — [pelvic floor guide](/injuries/for-women-runners#pelvic-floor)",
          "Bone pain that worsens with mileage — don't run through it; imaging may be needed",
          "General injury prevention: [avoiding injuries](/blog/avoiding-injuries) and [full injuries index](/injuries)",
        ],
        cta: {
          text: "Women runner injuries guide",
          href: "/injuries/for-women-runners",
        },
      },
      {
        id: "mental-health",
        heading: "Mental health and body image",
        paragraphs: [
          "Social media shows fast, lean runners with perfect gear. Real beginners walk, jog, and restart weekly — that still counts.",
        ],
        subsections: [
          {
            heading: "Comparison and pressure",
            list: [
              "You don't need to 'look like a runner' — if you're moving, you are one",
              "Walk breaks aren't failure; they're how most couch-to-5K plans work",
              "Unfollow accounts that make you feel behind; follow people at your stage",
            ],
          },
          {
            variant: "quote",
            heading: "Anonymous beginner",
            paragraphs: [
              "I almost quit because everyone on Instagram looked effortless. Then I ran my first 20 minutes without stopping — in old leggings and a hand-me-down bra. Nobody cared what I looked like. I wish I'd started sooner.",
            ],
          },
        ],
        cta: {
          text: "Read beginner success stories",
          href: "/stories",
        },
      },
      {
        id: "hydration-nutrition",
        heading: "Hydration and nutrition specifics for women",
        paragraphs: [
          "Women often have higher iron needs and smaller average body size — generic 'drink when thirsty' advice skips nuance.",
        ],
        list: [
          "Hydrate through the day, not just on run days — pale yellow urine is a rough guide",
          "Electrolytes on hot runs over 45–60 minutes, especially if you're a heavy sweater",
          "Iron: heavy periods + running = monitor ferritin with your doctor if fatigue persists",
          "Don't stack aggressive dieting with a new marathon block — fuel the work",
          "Deep dive: [nutrition basics for beginners](/blog/nutrition-basics-for-beginners)",
        ],
      },
      {
        id: "safety",
        heading: "Safety and running confidence",
        list: [
          "Tell someone your route or share live location if running alone",
          "Bright or reflective gear in low light; vary routes when possible",
          "Headphones low enough to hear traffic — or one earbud out",
          "Trust your gut if a path feels unsafe — treadmill, loop, or daylight run instead",
          "You belong on the path as much as anyone — pace and walk breaks don't make you less of a runner",
        ],
      },
      {
        id: "checklist",
        heading: "Quick checklist for your first month",
        paragraphs: [
          "Print this mentally and tick items off as you go — no rush to finish in week one.",
        ],
        list: [
          "☐ High-impact sports bra that passes the jump test",
          "☐ Shoes that fit your feet — [fitting guide](/blog/choosing-running-shoes)",
          "☐ Anti-chafe balm in your kit bag",
          "☐ Pick a beginner plan and stick to easy days — [start a free plan](/plan?plan=5k-8w)",
          "☐ Track cycle day + run feel for 2–3 months (app or notebook)",
          "☐ Strength 2× per week — even 15 minutes counts",
          "☐ Know red flags: missed period, bone pain, leakage, dizziness — when to call a pro",
          "☐ Join the community — [success stories](/stories) from real beginners",
        ],
      },
      {
        id: "encouragement",
        heading: "Final encouragement",
        paragraphs: [
          "The best running guide for women is the one that keeps you coming back. Gear, cycle awareness, and bone health aren't extras — they're how you stay on the road for years, not weeks.",
          "Start where you are. Walk-run is real running. And when questions get medical — periods stopping, pain that worsens, postpartum heaviness — a clinician beats a blog every time.",
        ],
        subsections: [
          {
            variant: "quote",
            heading: "Return runner, age 34",
            paragraphs: [
              "After my second kid I thought my running days were over because I leaked on every jog. Pelvic physio plus a slower build got me to my first 5K in a year. I'm slower than before — and I don't care.",
            ],
          },
        ],
        cta: {
          text: "Start your free training plan",
          href: "/plan?plan=5k-8w",
        },
      },
    ],
  },
  {
    slug: "running-guide-for-men",
    title: "A Beginner Running Guide for Men",
    metaTitle:
      "Beginner Running Guide for Men: Gear, Fueling, Heart Health & More",
    excerpt:
      "Shoes, anti-chafe gear, fueling and RED-S, heart awareness, groin prevention, training load, and confidence on the road — practical advice for men starting a running habit.",
    category: "Health",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-24",
    readTime: "14 min",
    relatedSlugs: [
      "running-guide-for-women",
      "running-with-health-conditions",
      "nutrition-basics-for-beginners",
      "avoiding-injuries",
      "choosing-running-shoes",
      "bodyweight-strength-for-runners",
    ],
    closingQuestion:
      "What's your biggest question about running as a man? Share below — your experience might help another beginner.",
    faq: [
      {
        question: "Do men get RED-S too?",
        answer:
          "Yes. Low energy availability affects bone health, immunity, libido, and performance in men — there's just no period to flag it. Fatigue plus recurring bone pain while mileage climbs deserves a [RED-S workup](/injuries/for-men-runners#red-s-fueling).",
      },
      {
        question: "Should I see a doctor before starting to run?",
        answer:
          "If you're sedentary and over 40, or have heart disease risk factors, a pre-participation check is smart. If you feel healthy and start with walk-run, most men under 40 can begin gradually — but **new chest pain during exercise always means stop and get checked.**",
      },
      {
        question: "How do I stop nipple chafing on long runs?",
        answer:
          "Nipple guards, medical tape, or anti-chafe balm before runs over 45–60 minutes. Technical shirts beat cotton. It's common and preventable — not something to push through.",
      },
      {
        question: "Is it normal to need the bathroom every mile when I'm older?",
        answer:
          "Urinary frequency on runs becomes common for many men in their 50s and beyond. Plan loops with restrooms and discuss symptoms with your GP — don't just dehydrate yourself. See our [prostate & urinary section](/injuries/for-men-runners#prostate-urinary).",
      },
      {
        question: "How fast should I increase mileage?",
        answer:
          "Many men do best adding **5–10% per week** at most, with a recovery week every 3–4 weeks. Ego miles and Strava comparisons cause more injuries than slow progression.",
      },
      {
        question: "Do I need different shoes as a man?",
        answer:
          "You need shoes that fit **your** feet — not a gender label. Read our [choosing running shoes](/blog/choosing-running-shoes) guide and get fitted if possible.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Most beginner running content assumes one generic body and a willingness to push through discomfort. Men starting out often have specific questions — about gear, eating enough, chest symptoms, groin pain, and whether it's weak to take a rest day.",
          "Higher average cardiovascular risk in middle age, greater sweat rates, sports hernia risk with sudden speed work, and RED-S that hides without period tracking all shape how training feels. That doesn't mean running isn't for you — it means smart setup beats bravado.",
          "Guidelines vary by country — follow your national screening advice for breast, prostate, and heart checks.",
          "**This isn't medical advice. When in doubt, talk to your doctor, cardiologist, or sports medicine specialist.** What follows are practical starting points that help many men run consistently and safely.",
        ],
      },
      {
        id: "gear",
        heading: "Gear that actually matters for men",
        paragraphs: [
          "You don't need the most expensive kit. A few choices reduce friction and keep you showing up.",
        ],
        subsections: [
          {
            heading: "Shoes and socks",
            list: [
              "Get fitted if possible — width and arch matter more than brand hype",
              "Rotate two pairs if you run 4+ days per week — foam recovers between sessions",
              "Moisture-wicking socks reduce blister risk — skip cotton for long runs",
              "More detail: [choosing running shoes](/blog/choosing-running-shoes)",
            ],
          },
          {
            heading: "Shorts, support, and chafing",
            list: [
              "Liner shorts or supportive briefs if bouncing causes discomfort",
              "Anti-chafe balm on inner thighs, waistband, and nipples before long runs",
              "Nipple guards or tape for runs over an hour — bloody shirts are preventable",
              "Technical fabric tops — cotton holds sweat and rubs",
              "See our [gear guide](/gear#chafing-creams) for anti-chafe picks",
            ],
          },
          {
            heading: "Safety basics",
            list: [
              "ID bracelet or phone with emergency contact if you run roads alone",
              "Reflective gear or light for dawn/dusk",
              "Tell someone your route on trail or remote runs",
            ],
          },
        ],
        cta: {
          text: "Browse the gear guide",
          href: "/gear",
        },
      },
      {
        id: "fueling",
        heading: "Fueling and RED-S in men",
        paragraphs: [
          "Under-eating while training hard doesn't build discipline — it breaks bone, hormones, and consistency. RED-S in men is under-diagnosed because there's no missed period waving a red flag.",
        ],
        subsections: [
          {
            heading: "Signs you might be under-fueling",
            list: [
              "Recurring stress fractures or shin pain at similar mileage",
              "Low libido, irritability, or flat mood during hard blocks",
              "Getting sick every time you add intensity",
              "Easy runs feel heavy despite 'doing everything right'",
            ],
          },
          {
            heading: "Practical eating",
            list: [
              "Many active men need 2,400–3,200+ kcal/day — under-eating by 300–500 kcal daily adds up",
              "Pre-run snack 60–90 min before: toast with peanut butter, banana, or oatmeal",
              "Post-run within 1–2 hours: protein + carbs — eggs on toast, chicken and rice, recovery shake",
              "Rest days need full meals — repair happens off the road",
              "Full guide: [RED-S & fueling for men](/injuries/for-men-runners#red-s-fueling)",
            ],
          },
        ],
        cta: {
          text: "Nutrition basics for beginners",
          href: "/blog/nutrition-basics-for-beginners",
        },
      },
      {
        id: "heart-health",
        heading: "Heart health and chest symptoms",
        paragraphs: [
          "Running strengthens the heart for most people — but new chest symptoms during exercise need immediate attention, not a faster finish.",
        ],
        subsections: [
          {
            heading: "Stop and seek care if you notice",
            list: [
              "Chest pressure, tightness, or pain during or after runs",
              "Unusual breathlessness for the pace",
              "Dizziness, palpitations, or pain radiating to jaw or arm",
              "Fainting or near-fainting in heat or on hills",
            ],
          },
          {
            heading: "Before big training jumps (especially 40+)",
            list: [
              "Discuss blood pressure, lipids, and family history with your GP",
              "Build aerobic base gradually — sedentary-to-sprint is higher risk than slow progression",
              "Treat sleep apnea if you snore and wake tired — it affects heart and recovery",
              "Deep dive: [heart & chest for men runners](/injuries/for-men-runners#heart-chest)",
            ],
          },
        ],
      },
      {
        id: "groin-core",
        heading: "Groin, core, and sports hernia prevention",
        paragraphs: [
          "Hills and speed work load the groin and lower abdominal wall. Weak deep core muscles and sudden mileage spikes are common setup for adductor strains and athletic pubalgia.",
        ],
        subsections: [
          {
            heading: "Reduce risk",
            list: [
              "Build easy base before intervals and hill repeats",
              "Planks, dead bugs, and Copenhagen side planks 2× per week",
              "Adductor strengthening — side lunges, banded abduction",
              "Don't run through sharp groin pain — cross-train and rehab first",
            ],
          },
          {
            heading: "Testicular pain",
            paragraphs: [
              "Sudden severe testicular pain or swelling is urgent — don't wait until after the run. Most groin aches are strains, but some conditions need emergency care.",
            ],
          },
        ],
        cta: {
          text: "Groin & core injury guide",
          href: "/injuries/for-men-runners#groin-core",
        },
      },
      {
        id: "training-load",
        heading: "Training load, recovery, and ego miles",
        paragraphs: [
          "Strava makes it easy to compare. Your job is to build a habit that survives six months — not win Tuesday's segment.",
        ],
        subsections: [
          {
            heading: "Smarter progression",
            list: [
              "5–10% weekly mileage increase max — many men do better at the low end",
              "Recovery week every 3–4 weeks: cut volume 30–40%",
              "One full rest day per week minimum",
              "Most miles easy — hard days only 1–2× per week when structured",
            ],
          },
          {
            heading: "Overtraining signals",
            list: [
              "Resting heart rate up 5–10 bpm for a week",
              "Dreading runs you used to enjoy",
              "Stacking minor injuries without a clear cause",
              "More: [overtraining & hormones](/injuries/for-men-runners#overtraining-hormones)",
            ],
          },
        ],
        cta: {
          text: "Start a structured plan",
          href: "/plan?plan=5k-8w",
        },
      },
      {
        id: "age-and-return",
        heading: "Returning at 40+ and urinary planning",
        paragraphs: [
          "Many men come back to running in their 40s and 50s after years off. Cardiovascular screening, realistic pace expectations, and route planning for restrooms all matter.",
        ],
        subsections: [
          {
            heading: "Coming back after time off",
            list: [
              "Walk-run for the first weeks — tendons adapt slower than lungs",
              "See your GP before marathon training if you have heart disease risk factors",
              "Strength train — muscle mass supports joints and bone",
              "Tips for older runners: [specific situations](/tips/specific-situations)",
            ],
          },
          {
            heading: "Urinary frequency on long runs",
            list: [
              "Plan loops past restrooms — don't severely restrict fluids",
              "Discuss new urinary symptoms with your GP or urologist",
              "Full guide: [prostate & urinary for runners](/injuries/for-men-runners#prostate-urinary)",
            ],
          },
        ],
      },
      {
        id: "heat",
        heading: "Heat, sweat, and hydration",
        paragraphs: [
          "Men often sweat heavily — which helps cooling but increases fluid and sodium losses. Acclimate to heat gradually.",
        ],
        list: [
          "Shorten pace and distance the first week of hot weather",
          "Use electrolytes on runs over 90 minutes in heat",
          "Drink to thirst — over-drinking plain water can cause hyponatremia",
          "More: [heat & hydration for men](/injuries/for-men-runners#heat-hydration)",
        ],
      },
      {
        id: "mental-health",
        heading: "Performance pressure and mental health",
        paragraphs: [
          "Running helps mood for many men — but using mileage to punish yourself or prove toughness can backfire. Rest isn't weakness; it's part of training.",
        ],
        list: [
          "Keep one run per week watch-free — no pace target",
          "Talk to a GP or therapist if low mood lasts 2+ weeks",
          "A bad run is data, not a verdict on your character",
          "Read: [mental health for men runners](/injuries/for-men-runners#mental-health)",
        ],
      },
      {
        heading: "Pre-run checklist for men",
        list: [
          "Shoes in good shape; anti-chafe applied if needed",
          "Ate something if it's been 3+ hours since last meal",
          "Route planned — restrooms if you're prone to urgency",
          "No new chest symptoms at rest before heading out",
          "Phone charged; someone knows your route if remote",
        ],
      },
      {
        heading: "You've got this",
        paragraphs: [
          "Starting smart — fueling enough, respecting chest symptoms, building core strength, and ignoring ego miles — keeps you on the road longer than any single heroic week.",
          "For injury-specific prevention and when to see a specialist, bookmark our [men runner health guide](/injuries/for-men-runners). Women runners have a parallel guide at [for women runners](/injuries/for-women-runners) and [women's running guide](/blog/running-guide-for-women).",
        ],
        cta: {
          text: "Men runner health topics",
          href: "/injuries/for-men-runners",
        },
      },
    ],
  },
  {
    slug: "dumbbell-strength-at-home-for-runners",
    title: "Basic Dumbbell Workouts at Home for Runners",
    excerpt:
      "One pair of dumbbells, two short sessions per week. Simple at-home lifts that build leg drive, posture, and injury resistance without a gym membership.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-28",
    readTime: "8 min",
    relatedSlugs: [
      "bodyweight-strength-for-runners",
      "full-body-dumbbell-workout-at-home",
      "importance-of-cross-training",
      "avoiding-injuries",
    ],
    sections: [
      {
        paragraphs: [
          "Bodyweight work gets you far. Once you can hold a plank, lunge, and glute bridge with good form, light dumbbells add load without complexity — perfect for a living room or garage setup.",
          "This is beginner-friendly strength, not bodybuilding. The goal is stronger hips, legs, and core so running feels smoother and injuries stay rare.",
          "Want a longer full-body session twice a week? See [the 60–90 minute home dumbbell routine](/blog/full-body-dumbbell-workout-at-home) — what worked when I picked up weights for the first time at 45.",
        ],
      },
      {
        heading: "What you need",
        list: [
          "One pair of dumbbells — adjustable 5–25 lb (2–12 kg) sets work well for most beginners",
          "Or fixed pairs: many women start with 8–15 lb; many men with 15–25 lb for lower-body moves",
          "Exercise mat or carpet for floor work",
          "15–20 minutes, twice per week, on rest days or after easy runs",
        ],
      },
      {
        heading: "Session A — Lower body & glutes (2 rounds)",
        paragraphs: [
          "Rest 45–60 seconds between exercises. Choose a weight where the last 2 reps feel challenging but your form stays clean.",
        ],
        list: [
          "Goblet squat — 10 reps. Hold one dumbbell at your chest, sit back, knees track over toes",
          "Romanian deadlift — 10 reps. Soft knees, hinge at hips, dumbbells slide down your thighs",
          "Reverse lunges — 8 each leg. Hold dumbbells at your sides, short controlled steps",
          "Calf raises — 15 reps. Hold dumbbells, pause at the top, lower slowly",
          "Glute bridge (dumbbell on hips) — 12 reps. Squeeze 2 seconds at the top",
        ],
      },
      {
        heading: "Session B — Upper body & core (2 rounds)",
        list: [
          "Dumbbell row — 10 each arm. Hinge forward, flat back, pull elbow to hip",
          "Floor press or bench press — 10 reps. Lie on floor, press dumbbells up without flaring elbows wildly",
          "Farmer carry — 30–40 seconds. Walk tall holding dumbbells at your sides",
          "Dead bug — 8 each side. Press lower back into floor while moving opposite arm and leg",
          "Side plank — 20–30 seconds each side. Optional: hold light dumbbell on top hip",
        ],
      },
      {
        heading: "How heavy should you go?",
        list: [
          "Last 2 reps of each set should feel hard — not sloppy",
          "If you can't finish with good form, drop weight or reps",
          "Lower body usually tolerates more load than shoulders — that's normal",
          "Add 2–5 lb every few weeks only if form stays solid",
        ],
      },
      {
        heading: "Common mistakes",
        list: [
          "Lifting the day before intervals or a long run — schedule strength after easy days",
          "Rushing reps — slow eccentrics (lowering phase) build strength safely",
          "Skipping warm-up — 3 minutes of marching, leg swings, and arm circles is enough",
          "Chasing soreness — mild next-day stiffness is fine; limping is not",
        ],
        cta: {
          text: "Start with bodyweight first",
          href: "/blog/bodyweight-strength-for-runners",
        },
      },
    ],
  },
  {
    slug: "full-body-dumbbell-workout-at-home",
    title:
      "The Covers Came Off After Five Years. Then Muscles Showed Up.",
    metaTitle:
      "Full-Body Dumbbell Workout at Home (60–90 Min) — Started Lifting at 45",
    excerpt:
      "I never touched weights in 45 years. A dumbbell set I'd bought five years back — covers still on until a few months ago — two full-body sessions per week, and slow consistency. Here's the routine that finally made strength stick.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-23",
    readTime: "16 min",
    relatedSlugs: [
      "dumbbell-strength-at-home-for-runners",
      "bodyweight-strength-for-runners",
      "importance-of-cross-training",
      "running-guide-for-women",
      "running-guide-for-men",
    ],
    closingQuestion:
      "When did you start lifting — and what surprised you most in the first few months?",
    faq: [
      {
        question: "Is 60–90 minutes too long for a beginner?",
        answer:
          "It can be if you rush or use too much weight. This workout is built around controlled sets and honest rest — you're not trying to collapse at the end. If you're wiped after 60 minutes, stop there. Add the optional finisher only when recovery feels good the next day.",
      },
      {
        question: "How often should I do this full-body session?",
        answer:
          "Twice per week — same full-body workout both days, on non-consecutive days (e.g. Tuesday and Friday). That spacing lets muscles recover while you still build strength fast enough to notice. If week one leaves you very sore, do one session that week, then commit to two from week two. Skip the second session the day before a long run or hard intervals.",
      },
      {
        question: "What dumbbell weight should a complete beginner buy?",
        answer:
          "Adjustable dumbbells (roughly 5–50 lb per hand) are the best long-term buy — you add 2.5–5 lb as you get stronger without cluttering the garage. A fixed set works too: start with 8, 15, and 25 lb pairs, or a 5–30 lb hex set. Most beginners go heavier on squats and deadlifts than on shoulder press, so adjustables or multiple fixed pairs matter more than one heavy pair alone.",
      },
      {
        question: "Adjustable dumbbells or a fixed dumbbell set?",
        answer:
          "Adjustables win on space and long-term value — one dial or pin change between exercises. Fixed hex or rubber sets win on simplicity, no moving parts, and often a lower upfront cost if you only buy 2–3 pairs. Either works; gradual progression depends on having light, medium, and heavy options for different moves, not on which style you pick.",
      },
      {
        question: "Will lifting make me too sore to run?",
        answer:
          "Some soreness is normal the first few weeks. Schedule this workout after an easy run or on a rest day — not the day before intervals or a long run. If soreness changes your running form or lasts more than 48 hours, cut one set per exercise next time.",
      },
      {
        question: "What weights should women start with?",
        answer:
          "Same exercises and schedule as men — usually lighter starting bells. In the [workout list](#workout), each exercise shows men and women ranges on the same line (e.g. goblet squat 15–25 lb men · 10–15 lb women). Most women new to lifting do well with a 5–40 lb adjustable set or fixed pairs at 5, 8, and 12 lb plus one 15–20 lb bell for goblet squats. Progress 2.5–5 lb when 3×15 feels smooth two weeks in a row.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "I ran. I biked. I hiked. I walked. But weights? Never. Not in school, not in my twenties, not in my thirties. By 45 I figured my body was basically done accepting new tricks.",
          "Then I peeled the covers off a dumbbell set I'd bought five years back — it had been sitting there while I told myself I'd start \"next month.\" The gym felt like a project anyway — commute, crowds, mirrors, the whole performance. I wanted something I could do in the basement at my own random convenient time, with no audience and no plan to become a \"gym person.\"",
          "Six months later, something unexpected happened: muscles started showing up. Not bodybuilder showing up — I'm not posting shirtless transformation photos. But shoulders looked a little rounder. Arms stopped being purely decorative.",
          "This is the full-body dumbbell workout I actually stuck with — 13 exercises in order, same session twice a week, 60 to 90 minutes each time, on non-consecutive days. Big muscles first (1–3 legs, 4–5 back, 6–7 chest/shoulders), small muscles last (8–13). Every exercise: 3 sets of 15 reps. No fancy equipment. No jargon you need a YouTube degree to decode.",
        ],
      },
      {
        heading: "Why this worked when other fitness phases didn't",
        list: [
          "Two sessions per week felt doable alongside running — enough stimulus to change, not a daily grind",
          "The dumbbell set I'd already owned meant I could start tonight — no shopping trip, no excuses left",
          "Full-body both days — legs and back first while you're fresh, arms and core last, every time",
          "Longer sessions let me rest properly between sets instead of rushing like a HIIT video",
          "Visible changes came from consistency over months, not heroic single workouts",
        ],
        paragraphs: [
          "The mental shift mattered as much as the exercises. I wasn't trying to punish myself. I was trying to teach my body a new skill slowly enough that it would stay.",
        ],
      },
      {
        heading: "Adjustable dumbbells vs a fixed dumbbell set",
        paragraphs: [
          "You don't need a full gym rack. You need enough weight spread across light, medium, and heavy so every exercise isn't the same pair of dumbbells. I used adjustables; a friend used three fixed pairs and got the same results — what mattered was progressing slowly, not the brand on the handle.",
          "If you only own one pair today, start light and earn heavier weight. Exercise-by-exercise starting ranges for men and women are in the [workout list](#workout) — each line shows both (e.g. overhead press 8–15 lb/hand men · 5–8 lb/hand women).",
          "Everything else: exercise mat or carpet, water, a towel, and a phone timer. A sturdy bench or ottoman is nice for press; the floor works fine for months.",
        ],
        subsections: [
          {
            heading: "Option A — Adjustable dumbbells",
            list: [
              "Look for roughly 5–50 lb per hand (2.5–25 kg) — enough for a year or more of beginner progression",
              "Dial, pin, or plate-loaded styles all work; pick what you'll actually twist at 9 PM when you're tired",
              "One pair replaces 10–15 fixed pairs — huge win for a garage or spare room",
              "Easy to jump 2.5–5 lb per exercise when you're ready — that's the heart of gradual progression",
              "Downside: upfront cost, and some models feel loose or wide at heavy settings — try reviews before buying",
            ],
          },
          {
            heading: "Option B — Fixed dumbbell set (hex or rubber)",
            list: [
              "General starter trio: 8 lb, 15 lb, and 25 lb pairs (3.5, 7, and 11 kg)",
              "Women starting from zero: 5 lb, 8 lb, and 12 lb pairs, plus one 15–20 lb single bell for goblet squats",
              "Or a small set: 5, 10, 15, 20, 25 lb pairs if you have space and budget",
              "Pros: grab-and-go, no adjustment between sets, often cheaper to start",
              "Cons: you'll outgrow the light pair on legs while shoulders still need it — that's normal; use different pairs per exercise",
              "When you max out a weight, buy the next pair up (usually 2.5–5 lb jumps for upper body, 5 lb for legs) rather than skipping ahead",
            ],
          },
          {
            heading: "Which exercises need which weight?",
            list: [
              "Light (3–8 lb per hand): reverse fly, tricep extensions, curls when starting, overhead press for many women",
              "Medium (8–15 lb per hand): floor press, rows, hammer curls as you progress",
              "Heavy (one bell 15–25 lb, or 10–20 lb per hand): goblet squat, Romanian deadlift, lunges, farmer carry",
              "Rule of thumb: pick a weight where reps 13–15 feel hard but form stays clean for 3 sets — then progress",
            ],
          },
        ],
      },
      {
        id: "schedule",
        heading: "Twice-a-week schedule",
        paragraphs: [
          "Same full-body workout both days. Space sessions with at least one rest day between — muscles grow on recovery, not on back-to-back hammering.",
        ],
        list: [
          "Example A: lift Tuesday + Friday (easy runs or rest those evenings)",
          "Example B: lift Monday + Thursday (long run Saturday, speed work Wednesday if your plan has it)",
          "Never stack both lifts before a long run or interval day — protect running quality first",
          "Week 1 only: if you're very sore after session one, wait until the next scheduled day for session two; don't force back-to-back days",
          "Optional finisher: add on one day per week at first, both days once recovery feels solid",
        ],
      },
      {
        heading: "Before you start: medical clearance",
        paragraphs: [
          "If you have heart conditions, uncontrolled blood pressure, joint replacements, or haven't been active in years, check with your doctor before starting resistance training. This article is what worked for me — not a prescription for you.",
        ],
      },
      {
        id: "progression",
        heading: "Gradual progression — 12-week roadmap",
        paragraphs: [
          "Muscle showing up at 45 wasn't from one killer workout. It was from showing up every week and nudging weight or reps when the last session felt almost easy. Use this roadmap whether you have adjustables or a fixed set — swap in the next pair up when a column says \"add weight.\"",
          "The golden rule: hit 3 sets of 15 reps with clean form in two workouts (same week at the same weight) → then add a little weight. One great day is not a reason to jump 10 lb.",
          "How to progress when you can't finish 15 reps: drop weight until 3×15 is doable, then stay there until it feels almost easy. Example: 3×15 goblet squats at 25 lb feel smooth for two sessions → next week use 30 lb and work back to 3×15 (even if that means 30 lb for 3×12 at first). Never sacrifice form to chase rep 15.",
        ],
        subsections: [
          {
            heading: "Weeks 1–2 — Learn the movements",
            list: [
              "Frequency: 2 full-body sessions per week, non-consecutive days — see [twice-a-week schedule](#schedule)",
              "Sets × reps: 2 × 15 per exercise (not 3 yet) — big muscles first, same order as the workout",
              "Weight: use starting ranges in the [workout list](#workout) — men and women on each line (weeks 1–2: 2×15 at those weights)",
              "If week 1 is brutal: one session only, then 2× from week 2",
              "Skip the optional finisher entirely",
              "Goal: memorize form and the big-to-small exercise order, not impress the garage wall",
            ],
          },
          {
            heading: "Weeks 3–4 — Full 3 × 15",
            list: [
              "Frequency: 2× per week, same days each week",
              "Sets × reps: 3 × 15 on every weighted exercise — legs and back first, arms and core last",
              "Weight: same as weeks 1–2 unless both sessions in week 4 felt easy — then goblet squat men 20–25 lb · women 15–20 lb; RDL men 25–30 lb total · women 15–20 lb total",
              "Optional finisher: still skip",
            ],
          },
          {
            heading: "Weeks 5–8 — First real weight jumps",
            list: [
              "Frequency: 2× per week — same workout both days",
              "Sets × reps: stay at 3 × 15 — don't drop reps to go heavier",
              "Weight: add 2.5–5 lb every 1–2 weeks on lower body first, then rows, then press — shoulders progress slowest",
              "Typical week 8 targets (3×15): 1) Goblet squat — men 20–30 lb · women 15–25 lb",
              "2) RDL — men 25–35 lb total · women 15–25 lb total · 3) Lunges — men 15–20 lb/hand · women 8–10 lb/hand",
              "4–5) Rows — men 20–25 lb/arm · women 12–15 lb/arm · 6) Floor press — men 12–18 lb/hand · women 10–12 lb/hand",
              "7) Overhead press — men 10–15 lb/hand · women 8–10 lb/hand · 8–9) Curls & triceps — men 12–15 lb · women 8 lb",
              "10) Reverse fly — men 8–10 lb · women 5–8 lb · 11) Calf raises — men 20–25 lb held · women 15–20 lb · 13) Farmer carry — men 20–25 lb/hand · women 15–20 lb/hand",
              "Fixed set: swap from 15s to 25s on legs when both weekly sessions hit 3×15; keep 15s for press until the same bar is met",
              "Optional finisher: add on one day in week 7, both days in week 8 if recovery is good",
            ],
          },
          {
            heading: "Weeks 9–12 — Small jumps, same 3 × 15",
            list: [
              "Frequency: 2 full-body sessions per week — this is the long-term rhythm",
              "Sets × reps: 3 × 15 on every exercise — consistency beats mixing rep schemes",
              "Weight: 2.5–5 lb bumps only when both sessions in a week complete 3×15 with clean form",
              "Week 12: deload — 2 × 15 per exercise, one lift day that week only",
              "By here, most consistent beginners see visible arm/shoulder changes and feel stronger on hills",
            ],
          },
        ],
      },
      {
        id: "warmup",
        heading: "Warm-up (10 minutes) — don't skip this",
        paragraphs: [
          "Cold muscles and heavy dumbbells are a bad combination. I learned this the boring way (tight hamstrings for three days). Move through this once, unweighted, before touching the bells.",
        ],
        list: [
          "2 min — march in place or easy step-ups on the bottom stair",
          "10 arm circles forward + 10 backward",
          "10 bodyweight good-mornings (hands on hips, hinge at hips)",
          "10 bodyweight squats — slow, full range if comfortable",
          "10 hip hinges — hands slide down thighs, feel hamstrings",
          "10 walking lunges — no weight, short steps",
          "30 sec plank + 30 sec dead bug",
        ],
      },
      {
        id: "workout",
        heading: "The full-body workout (about 60–75 minutes)",
        paragraphs: [
          "Do exercises 1 through 13 in order — finish all sets of one move before starting the next. Always train big muscles first, small muscles last. That order matters when you're 45 and fresh. Do this same session twice per week (see [schedule](#schedule)). Every weighted exercise is 3 sets × 15 reps (weeks 1–2: 2 × 15 while you learn — see [gradual progression](#progression)).",
          "Rest 60–90 seconds between sets — set a timer so you don't rush. Rest 2 minutes before the next exercise if you're still breathing hard.",
          "Starting weights and week 8 targets for men and women are on the same line in the list below and in the [12-week roadmap](#progression).",
          "Position matters most on a handful of moves — see [where form counts](#form) before you add weight.",
        ],
        list: [
          "1. Goblet squat — 3 × 15. Hold one dumbbell at your chest, elbows inside knees, sit between your hips. Start: 15–25 lb (men) · 10–15 lb (women)",
          "2. Romanian deadlift — 3 × 15. Soft knees, push hips back, dumbbells trace your thighs. Start: 20–35 lb total (men) · 10–15 lb total (women)",
          "3. Walking lunges — 3 × 15 each leg. Dumbbells at sides, torso tall. Start: 10–20 lb/hand (men) · 5–8 lb/hand (women)",
          "4. Bent-over dumbbell row — 3 × 15 each arm. Hinge forward, flat back, pull elbow to hip. Start: 15–25 lb (men) · 8–12 lb (women)",
          "5. Single-arm row — 3 × 15 each arm. Squeeze shoulder blade at the top. Start: 15–25 lb (men) · 8–12 lb (women)",
          "6. Dumbbell floor press — 3 × 15. Lie on floor, press up, elbows at ~45°. Start: 10–20 lb/hand (men) · 8–12 lb/hand (women)",
          "7. Standing overhead press — 3 × 15. Core tight, don't lean back. Start: 8–15 lb/hand (men) · 5–8 lb/hand (women)",
          "8. Hammer curls — 3 × 15. Neutral grip, elbows pinned to sides. Start: 10–15 lb (men) · 5–8 lb (women)",
          "9. Overhead tricep extension — 3 × 15. One or two dumbbells, elbows stay narrow. Start: 10–15 lb (men) · 5–8 lb (women)",
          "10. Reverse fly — 3 × 15. Light weight, slight hinge. Start: 5–10 lb (men) · 3–5 lb (women)",
          "11. Calf raises — 3 × 15. Pause 1 sec at top. Start: hold 15–25 lb (men) · 10–12 lb (women)",
          "12. Dead bug — 3 × 15 each side. Lower back glued to floor. Bodyweight",
          "13. Farmer carry — 3 × 15 steps each hand. Start: 15–25 lb/hand (men) · 10–15 lb/hand (women)",
        ],
      },
      {
        id: "printable-sheet",
        heading: "Printable sheets (save as PDF)",
        paragraphs: [
          "Tape these to the basement wall or pull them up on your phone between sets. Use your browser's print dialog and choose \"Save as PDF.\"",
          "[Workout sheet with all 13 exercises and form diagrams](/blog/full-body-dumbbell-workout-at-home/printable) — one shared form sheet plus a men/women weight chart · [12-week schedule with progression table, weight charts, and weekly tracker](/blog/full-body-dumbbell-workout-at-home/printable/schedule)",
        ],
        cta: {
          text: "Open printable workout sheet",
          href: "/blog/full-body-dumbbell-workout-at-home/printable",
        },
      },
      {
        id: "form",
        heading: "Where position matters most (and what to watch)",
        paragraphs: [
          "You don't need a mirror maze or a coach yelling cues. You do need to know which exercises punish sloppy alignment — especially at 45 when warm-up isn't automatic and the basement lighting is whatever the bulb survived.",
          "Film yourself on your phone for one set of anything in the \"take the most care\" list. I thought my RDLs looked fine until video showed me folding like a lawn chair.",
          "Red flags to stop mid-set: sharp joint pain (knee, shoulder, lower back), tingling, or form that only works if you hold your breath and pray. Drop weight, fix position, or skip the exercise that day. Sore muscles tomorrow are fine; something \"catching\" in a joint is not.",
        ],
        subsections: [
          {
            heading: "Take the most care here — exercises 1–7 (back and shoulders on the line)",
            list: [
              "1. Goblet squat — elbows inside knees, sit between hips (not straight down onto toes). Heels stay down, chest up. Knees follow toes — if they cave in, go lighter and pause at the bottom to reset.",
              "2. Romanian deadlift — #1 priority for spine safety. Soft knees, hips push back (not down), dumbbells skim your thighs, chest proud. Lower back stays flat — if it rounds, drop weight. You should feel hamstrings, not a pinch in your spine.",
              "3. Walking lunges — short-ish steps, front knee tracks over mid-foot (not collapsing inward), torso tall. Back knee drops toward floor — don't slam it.",
              "4. Bent-over row — hinge at hips until torso is roughly 45° or flatter, neck neutral, core braced. Pull elbow to hip pocket; don't yank with a rounded back.",
              "7. Standing overhead press — ribs down, glutes tight, no leaning back to cheat the weight up. Bell path stays close to your face; lockout overhead without shrugging into your ears.",
            ],
          },
          {
            heading: "Important — exercises 5–6 and 9–13 (brace and control)",
            list: [
              "5. Single-arm row — support hand firm on bench/knee, pull without twisting your torso open. Shoulder blade squeezes toward spine at the top.",
              "6. Dumbbell floor press — shoulders pinned to floor, elbows ~45° from ribs (not flared straight out). Stop at the floor — don't bounce.",
              "9. Overhead tricep extension — elbows stay narrow and point at the ceiling; only forearms move. Go light before your elbows complain.",
              "12. Dead bug — lower back pressed into floor the whole rep; if it arches off, shorten range or slow down.",
              "13. Farmer carry — stand tall, shoulders packed down and back, walk smooth steps. Don't let bells pull you into a shrug or lean.",
            ],
          },
          {
            heading: "Lower risk — exercises 8, 10, and 11 (still use control, not momentum)",
            list: [
              "8. Hammer curls — elbows fixed at sides, no swinging hips to hoist the bell",
              "10. Reverse fly — slight hinge, soft elbows, lift with rear delts not traps",
              "11. Calf raises — full range, pause at top, lower slowly — bounce cheats the rep",
            ],
          },
        ],
      },
      {
        id: "finisher",
        heading: "Optional finisher (+10–15 min → 90 minutes total)",
        paragraphs: [
          "Only add this when the main workout feels manageable — not when you're already destroyed. This is gravy, not homework.",
        ],
        list: [
          "Goblet squat hold — 3 × 15 sec at bottom of squat (light weight)",
          "Push-up (bodyweight) — 3 × 15 (knees down if needed)",
          "Glute bridge with dumbbell on hips — 3 × 15, 2-sec squeeze at top",
        ],
      },
      {
        heading: "Cool-down (5–8 minutes)",
        list: [
          "Slow walking around the room — 2 min",
          "Quad stretch — 30 sec each leg",
          "Figure-4 glute stretch — 30 sec each side",
          "Chest doorway stretch — 30 sec",
          "Child's pose or gentle cat-cow — 1 min",
        ],
        paragraphs: [
          "You don't need to turn into a yoga influencer. Just don't sit on the couch stiff as a board thirty seconds after your last set.",
        ],
      },
      {
        heading: "How to fit this with running",
        paragraphs: [
          "I do this on a rest day or after a very easy run — never the day before speed work or a long run. Strength and running share legs; respect that negotiation.",
          "If LetsRunNow has you on a 6-day schedule, treat this as cross-training with purpose: you're building the hips, calves, and core that keep running sustainable. See [cross-training for runners](/blog/importance-of-cross-training) for where it slots in.",
        ],
        list: [
          "Twice per week, non-consecutive days — e.g. Tuesday + Friday",
          "Week 1–2: 2× per week at 2 × 15; week 3+: 2× per week at 3 × 15",
          "Place lifts after easy runs or on rest days — never the day before speed work or a long run",
          "Week 5–8: add weight slowly; both sessions in a week should feel solid before you bump bells",
          "Race week: one short session or skip — freshness beats vanity",
        ],
      },
      {
        heading: "Progression without getting hurt",
        list: [
          "Two workouts in the same week completing 3 × 15 with clean form → then add 2.5–5 lb (adjustable) or grab the next fixed pair up",
          "Can't hit 15 reps? Drop weight until 3 × 15 is doable — then progress weight, not reps below 15",
          "Big muscles first every session, in order: 1–3 legs → 4–5 back → 6–7 chest/shoulders → 8–13 arms/calves/core",
          "Lower body usually progresses fastest; shoulders and triceps slowest — that's normal, not failure",
          "If lower back complains on deadlifts, drop weight and film yourself — you're probably bending, not hinging",
          "Soreness at 24 hours: normal early on. Pain at 48+ hours or sharp joint pain: repeat last week's weights",
          "Sleep and protein matter more after 40 than they did at 25 — I won't lecture you on macros, just don't skip dinner",
          "Deload every 6–8 weeks: 2 × 15 per exercise, same or 5–10% lighter weight",
        ],
        paragraphs: [
          "With a fixed set, progression looks like rotating pairs while staying at 3×15: weeks on 15s for press, then 20s when 3×15 is easy twice, while legs move from 25s to 30s. With adjustables, it's smaller clicks — same 15-rep target every time. Either way, gradual beats heroic.",
        ],
      },
      {
        heading: "What changed for me (besides the mirror)",
        paragraphs: [
          "Hills on runs felt less like personal attacks. I'd never done a single push-up in my life — until a few weeks back, mid-conversation with a friend, I dropped and knocked out five. That was proof the weight training was actually working.",
          "I didn't become a different person. I became someone who lifts twice a week, every week, without negotiating with myself. That identity shift mattered more than any single PR.",
          "If you've never touched a weight and you're north of 40: you're not too late. You're just early enough to be smart about it.",
        ],
        cta: { text: "Build your running plan", href: "/plan" },
      },
    ],
  },
  {
    slug: "advanced-strength-training-for-runners",
    title: "Advanced Strength Training for Runners: Build Power Without Burning Out",
    excerpt:
      "For experienced runners with a solid base: periodized lifting, single-leg power, and plyometrics that support half-marathon and marathon training — not replace it.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-08-22",
    readTime: "9 min",
    relatedSlugs: [
      "dumbbell-strength-at-home-for-runners",
      "training-first-half-marathon",
      "training-first-full-marathon",
      "importance-of-cross-training",
    ],
    sections: [
      {
        paragraphs: [
          "If you've been running consistently for a year or more — and you've done basic strength work — you can layer in harder training that improves hill power, finishing kick, and injury resilience.",
          "This is not about becoming a weightlifter. It's about targeted overload during base and early build phases, then maintaining strength as mileage peaks.",
        ],
      },
      {
        heading: "Who this is for (and who should wait)",
        list: [
          "Good fit: runners logging 20+ miles per week with no current injury flare-up",
          "Good fit: you've completed 8+ weeks of bodyweight or dumbbell strength already",
          "Wait if: you're in your first 6 months of running or returning from injury",
          "Wait if: strength sessions leave you too sore to hit prescribed easy runs",
        ],
      },
      {
        heading: "Weekly structure (3 sessions)",
        paragraphs: [
          "Place the heavy day after an easy run or rest day. Keep plyometrics fresh — not the day after a long run. During peak race weeks, cut to one maintenance session.",
        ],
        subsections: [
          {
            heading: "Day 1 — Heavy strength",
            list: [
              "Back or goblet squat — 4×6 at RPE 7–8 (2 reps left in the tank)",
              "Romanian deadlift — 4×8",
              "Bulgarian split squat — 3×8 each leg",
              "Standing calf raise (weighted) — 3×12 slow",
            ],
          },
          {
            heading: "Day 2 — Power & plyometrics",
            list: [
              "Box step-ups (explosive) — 3×6 each leg",
              "Jump squats or squat jumps — 3×5, land softly",
              "Single-leg hops in place — 3×8 each leg",
              "Medicine ball or dumbbell push press — 3×8 (optional)",
            ],
          },
          {
            heading: "Day 3 — Posterior chain & core",
            list: [
              "Single-leg Romanian deadlift — 3×10 each leg",
              "Hip thrust or glute bridge (barbell or heavy dumbbell) — 4×10",
              "Pallof press or band anti-rotation — 3×12 each side",
              "Copenhagen plank or side plank with row — 3×30 sec each side",
            ],
          },
        ],
      },
      {
        heading: "Periodize with your running plan",
        list: [
          "Base phase (8–12 weeks out): full 3-day strength, progressive load",
          "Build phase (4–8 weeks out): keep heavy day, trim plyo volume by 30%",
          "Peak / taper (2–3 weeks out): one maintenance session — squats, RDL, core only",
          "Race week: skip lifting or do 15 minutes of mobility and activation",
        ],
      },
      {
        heading: "At home vs gym",
        paragraphs: [
          "A home setup can work with adjustable dumbbells, a bench, and resistance bands. A gym helps for barbell squats, trap-bar deadlifts, and heavier hip thrusts — but isn't mandatory.",
          "Prioritize single-leg work and hip extension. Those transfer directly to uphill running and late-race form.",
        ],
      },
      {
        heading: "Recovery rules advanced runners break",
        list: [
          "Lifting legs to failure the day before tempo — schedule around quality runs",
          "Adding plyometrics during an injury flare — back off to isometrics and PT",
          "Chasing gym PRs during marathon peak — maintain, don't max out",
          "Skipping sleep and protein while stacking mileage and lifting — recovery is the limiter",
        ],
        cta: {
          text: "Basic dumbbell routines at home",
          href: "/blog/dumbbell-strength-at-home-for-runners",
        },
      },
    ],
  },
  {
    slug: "running-vs-biking",
    title: "Running vs Biking: Why You Don't Have to Choose",
    excerpt:
      "Running builds impact tolerance and race-specific fitness. Cycling builds aerobic engine without pounding. Here's how to use both — especially as a beginner.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-08-26",
    readTime: "7 min",
    relatedSlugs: [
      "importance-of-cross-training",
      "what-to-do-on-rest-days",
      "avoiding-injuries",
      "training-first-5k",
    ],
    sections: [
      {
        paragraphs: [
          "Runners and cyclists love a friendly rivalry: knees vs quads, pavement vs pedals, 5K PRs vs century rides. The better question isn't which sport wins — it's how each one makes you fitter for the other.",
          "For beginners especially, pairing easy cycling with a run plan can keep you consistent when joints need a break, weather turns ugly, or motivation dips.",
        ],
      },
      {
        heading: "What running does better",
        list: [
          "Builds bone density and connective-tissue strength through impact (when progressed gradually)",
          "Trains the exact muscles and movement patterns you'll use on race day",
          "Teaches pacing by feel — breathing, footstrike, fatigue cues",
          "Requires minimal gear — shoes and a route beat a bike tune-up for spontaneity",
        ],
      },
      {
        heading: "What cycling does better",
        list: [
          "Cardiovascular training with almost zero impact on knees and shins",
          "Long aerobic sessions with less muscle soreness the next day",
          "Controlled resistance — hills on the bike build leg strength without a run's pounding",
          "A backup option when you're nursing a minor niggle or the sidewalks are icy",
        ],
      },
      {
        heading: "How they complement each other",
        subsections: [
          {
            heading: "Extra aerobic work without extra miles",
            paragraphs: [
              "Heart and lungs don't know whether you're running or pedaling. An easy 30–45 minute bike ride after a hard run day adds fitness while your legs recover from impact.",
            ],
          },
          {
            heading: "Active recovery that still feels like training",
            paragraphs: [
              "Spinning easy on a rest day keeps blood moving through sore muscles better than the couch — without turning recovery into another run.",
            ],
          },
          {
            heading: "Injury prevention and comeback tool",
            paragraphs: [
              "Shin or knee acting up? Easy cycling maintains fitness while you reduce run volume. Many runners return stronger by swapping one or two runs for rides until symptoms settle — with a physio's input when pain persists.",
            ],
          },
          {
            heading: "Mental freshness",
            paragraphs: [
              "Doing the same thing every day breeds boredom. A bike day can reset your head so the next run feels like a choice, not a chore.",
            ],
          },
        ],
      },
      {
        heading: "A simple week for beginners",
        paragraphs: [
          "You don't need a triathlon setup. Two or three runs plus one easy bike session is plenty when you're building a habit.",
        ],
        list: [
          "Mon — easy run",
          "Tue — rest or gentle walk",
          "Wed — run (intervals or walk-run)",
          "Thu — easy cycling 30–40 min, conversational effort",
          "Fri — rest",
          "Sat — long run (or long easy walk-run)",
          "Sun — optional yoga, walk, or easy spin",
        ],
      },
      {
        heading: "How hard should the bike be?",
        list: [
          "Most bike cross-training should feel easy — you could hold a conversation",
          "If your legs are trashed from a long run, flat spinning beats hill repeats",
          "Save hard cycling intervals for when you're not also building run mileage fast",
          "Outdoor ride or stationary bike both count — consistency matters more than equipment",
        ],
      },
      {
        heading: "What cycling won't replace",
        paragraphs: [
          "You can't bike your way to a 5K PR without running. Impact tolerance, running economy, and race-day pacing come from time on your feet. Use the bike to support running — not substitute for every session on your plan.",
        ],
        list: [
          "Don't swap your long run for a long ride every week and expect the same race readiness",
          "Don't hammer bike intervals the day before a quality run",
          "Don't ignore pain that returns the moment you're back on the road — get it checked",
        ],
        cta: {
          text: "See how our plans use cross-training",
          href: "/blog/importance-of-cross-training",
        },
      },
    ],
  },
  {
    slug: "hiking-instead-of-long-run",
    title: "Can a Hard Hike Replace Your Long Run?",
    excerpt:
      "A tough trail day can build endurance, hill strength, and time on your feet — but it isn't a perfect swap. Here's when hiking helps training and when to lace up instead.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-08-30",
    readTime: "7 min",
    relatedSlugs: [
      "how-to-not-hate-hills",
      "running-vs-biking",
      "importance-of-cross-training",
      "training-first-half-marathon",
    ],
    sections: [
      {
        paragraphs: [
          "Your training plan says long run. The forecast is perfect and your friend texts about a ridge trail three towns over. Can you swap the pavement for peaks and still move your fitness forward?",
          "Sometimes yes — especially if you treat the hike with the same respect you'd give a long run. Sometimes no — if the hike is so brutal it wrecks your legs for days or you never run on roads before race day.",
        ],
      },
      {
        heading: "What a difficult hike gives runners",
        list: [
          "Hours on your feet — mental and muscular endurance similar to a long easy run",
          "Hill work disguised as scenery — quads, glutes, and calves under load",
          "Lower impact than asphalt for many people — joints often thank you",
          "A motivation boost when another loop of the same neighborhood feels stale",
          "Balance and proprioception on uneven ground — useful for trail races, handy on cambered roads",
        ],
      },
      {
        heading: "What hiking doesn't fully replace",
        list: [
          "Running-specific impact — bones and tendons adapt to pounding by, well, pounding (gradually)",
          "Road-race pacing and cadence on flat, smooth surfaces",
          "The exact muscle firing pattern of a steady jog — hiking uses different stride mechanics",
          "Confidence that you can hold a target pace for 13.1 or 26.2 on race morning",
        ],
      },
      {
        heading: "When swapping makes sense",
        subsections: [
          {
            heading: "You're building base fitness",
            paragraphs: [
              "Early in a plan, a 2–3 hour moderate hike with hills can substitute for an easy long run if your legs feel good the next day. You're banking aerobic time without another day of repetitive impact.",
            ],
          },
          {
            heading: "You need a mental reset",
            paragraphs: [
              "Burnout is real. One scenic hike can refill the tank better than forcing another grim lap — as long as you return to scheduled runs that week.",
            ],
          },
          {
            heading: "You're easing a minor ache",
            paragraphs: [
              "A dull shin or tight Achilles might tolerate hiking when running feels sharp. That's a temporary tool, not a diagnosis — persistent pain still deserves a professional look.",
            ],
          },
          {
            heading: "Your goal race has serious hills",
            paragraphs: [
              "Trail half or hilly road marathon? Hard hikes are sport-specific prep. Flat 5K in eight weeks? Keep most long work as running.",
            ],
          },
        ],
      },
      {
        heading: "How to plan a hike that actually helps",
        list: [
          "Match duration, not just distance — 2 hours hiking often equals 90 minutes of easy running for fatigue",
          "Keep most of the hike conversational; save one sustained climb as your 'work' segment",
          "Use poles if steep descents trash your knees — no bonus points for suffering",
          "Wear broken-in trail shoes or runners with grip; blisters don't count as cross-training",
          "Pack water and snacks like a long run — bonking on a mountain is worse than on a bike path",
          "Log how your legs feel 24–48 hours later — that's your feedback for next time",
        ],
      },
      {
        heading: "When not to swap",
        list: [
          "Within 3–4 weeks of a goal race — prioritize run-specific long efforts",
          "If the hike leaves you too sore to complete easy runs that week",
          "If you've already cut runs all month for adventures — consistency beats peak bagging",
          "If elevation or heat on the trail is far harder than anything your plan prescribes",
        ],
      },
      {
        heading: "A practical rule of thumb",
        paragraphs: [
          "One hard hike every 2–4 weeks in place of a long run? Often fine for beginners building general fitness. Every weekend on trails with zero road long runs before a road race? You'll feel strong uphill and uncertain on flat mile 10.",
          "Use hikes to complement your plan — not quietly replace the work that makes race day predictable.",
        ],
        cta: {
          text: "Read our hill-running tips",
          href: "/blog/how-to-not-hate-hills",
        },
      },
    ],
  },
  {
    slug: "runner-etiquette-trails-roads-track",
    title: "Runner's Etiquette: Roads, Trails (Paved & Dirt), and the Track",
    excerpt:
      "Where to run, who yields to whom, and how not to be That Runner — a practical guide to sharing roads, multi-use paths, singletrack, and track lanes.",
    category: "Getting Started",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-30",
    readTime: "8 min",
    relatedSlugs: [
      "first-run-tips",
      "running-form-101",
      "hiking-instead-of-long-run",
      "how-to-not-hate-hills",
      "group-running-coach-and-pacer",
    ],
    sections: [
      {
        paragraphs: [
          "Nobody gives you a handbook when you become a runner. You learn that sidewalks end, cyclists appear from nowhere, and track lanes have rules — usually by almost colliding with someone.",
          "Good etiquette isn't about being perfect. It's about keeping everyone safe, reducing awkward moments, and making the running community somewhere you'd want to belong on day one.",
        ],
      },
      {
        heading: "Universal basics (every surface)",
        list: [
          "Pass on the left when you can — announce with \"On your left\" or a friendly \"Behind you\"",
          "Don't block the full width — run single file when others are around",
          "Headphones low enough to hear bikes, cars, and other runners",
          "Leash dogs unless local rules say otherwise; short leash near crowds",
          "If you spit or blow your nose, check nobody is in the blast zone",
          "A nod, wave, or quick \"morning\" costs nothing and builds goodwill",
        ],
      },
      {
        heading: "Running on roads and sidewalks",
        paragraphs: [
          "Road running is where most beginners start. A few habits keep you and drivers on predictable terms.",
        ],
        list: [
          "Use sidewalks when they exist — that's what they're for",
          "No sidewalk? Run facing traffic so you see what's coming",
          "Cross at crosswalks; make eye contact with drivers before stepping out",
          "Wear bright or reflective gear at dawn, dusk, and night",
          "Assume drivers don't see you — even with the right of way",
          "Run behind a friend when in a group; don't fan across the whole shoulder",
          "Skip busy highways without shoulders — find a quieter loop",
        ],
      },
      {
        heading: "Paved trails and multi-use paths",
        paragraphs: [
          "Rail-trails, river paths, and park loops are beginner-friendly — and shared with walkers, strollers, skaters, and fast cyclists.",
        ],
        list: [
          "Stay to the right, pass on the left — same as slow traffic on a road",
          "Call out before passing — a bike bell or verbal warning prevents heart attacks",
          "Slower traffic has the right of way; faster traffic passes safely",
          "Don't stop suddenly in the middle of the path — step to the side",
          "Leash pets and keep kids close when faster users approach",
          "Easy pace days are perfect here; save sprint repeats for the track or empty roads",
        ],
      },
      {
        heading: "Unpaved trails (dirt, gravel, singletrack)",
        paragraphs: [
          "Natural trails add roots, mud, and hikers. Etiquette here protects the trail and the people on it.",
        ],
        list: [
          "Hikers generally have right of way — step aside on the downhill side when safe",
          "Uphill runners often yield to downhill on narrow singletrack (momentum is harder to stop) — when in doubt, communicate",
          "Stay on the trail — cutting switchbacks erodes paths and annoys land managers",
          "Muddy trail? Run through the puddle or choose a different route — widening the trail kills vegetation",
          "Downhill runners: control speed around blind corners — announce before passing",
          "Pack out wrappers; gel tabs belong in your pocket, not the forest",
          "Headphones off or one earbud out — you need to hear bikes and wildlife",
        ],
      },
      {
        heading: "Running on a track",
        paragraphs: [
          "A standard 400 m track is great for intervals — but it's a shared, measured space with unwritten rules.",
        ],
        list: [
          "Lane 1 is for the fastest workout traffic — don't jog laps in the inside lane during a club session",
          "Warm-up and cool-down counterclockwise in outer lanes unless everyone agrees otherwise",
          "Before stepping onto the track, look both directions — sprinters move fast",
          "Never stop on a curve — pull to the infield or outer straightaway",
          "Respect school or facility hours; some tracks lock outside public times",
          "One full lap is ~400 m — useful for beginners learning distance without GPS",
        ],
      },
      {
        heading: "Etiquette mistakes beginners regret",
        list: [
          "Sprinting intervals on a crowded family path",
          "Running three abreast on a narrow sidewalk",
          "Passing without warning and startling someone hard of hearing",
          "Blasting music and missing a cyclist's \"on your left\"",
          "Using a muddy trail the day after rain when rangers ask people to stay off",
        ],
      },
      {
        heading: "Pick the right surface for the workout",
        paragraphs: [
          "Easy runs and walk-run intervals work almost anywhere. Hard efforts belong where you won't endanger or annoy others — track, quiet road loop, or empty trail section.",
          "When you're new, a paved path or neighborhood loop beats learning etiquette and navigation on technical singletrack at the same time.",
        ],
        cta: {
          text: "First run tips",
          href: "/blog/first-run-tips",
        },
      },
    ],
  },
  {
    slug: "group-running-coach-and-pacer",
    title: "Group Running: How to Follow Your Coach",
    excerpt:
      "Club runs and couch-to-5K clinics work when you listen to the coach — effort, pace groups, and recovery are all part of the plan, not suggestions to negotiate on the fly.",
    category: "Training",
    author: BLOG_AUTHOR,
    publishedAt: "2026-06-30",
    readTime: "8 min",
    relatedSlugs: [
      "runner-etiquette-trails-roads-track",
      "how-to-pace-yourself",
      "building-a-running-habit",
      "importance-of-cross-training",
    ],
    sections: [
      {
        paragraphs: [
          "Solo runs build discipline. Coach-led group training builds consistency — if you actually follow the plan someone designed for you. Tuesday track night, Saturday long-run crew, couch-to-5K clinic at the park: there's usually a coach (or coach-trained leader) explaining what today's session is for and how hard it should feel.",
          "This post is about training, not race morning. A race pacer is a different job. Here we're talking about the person who sets the week's structure, briefs the group before the run, and sometimes assigns workout pacers to hold specific efforts on the road or track.",
        ],
      },
      {
        heading: "What your running coach is actually doing",
        paragraphs: [
          "Beginners sometimes picture a coach as someone yelling \"faster!\" from a bike. Real coaching in a club or clinic is quieter and more structural.",
        ],
        list: [
          "Designing the week — easy days easy, hard days purposeful, rest days protected",
          "Explaining each session before you start — effort, distance, reps, and where to regroup",
          "Placing you in the right pace group so you finish the workout, not just survive the first mile",
          "Adjusting on the fly when heat, injury, or fatigue means the written plan needs a tweak",
          "Teaching form, fueling, and race strategy over months — not just one Tuesday",
          "Delegating to workout pacers who execute the coach's targets during long runs, tempos, or track sets",
        ],
      },
      {
        heading: "Coach vs workout pacer — who leads what?",
        paragraphs: [
          "The coach owns the plan. The workout pacer carries it out for a specific session. Don't confuse the two.",
        ],
        list: [
          "Coach — sets the training block, gives the pre-run briefing, answers \"should I run today?\" and moves you between groups",
          "Workout pacer — holds target pace or effort during one run so the group doesn't drift too fast on easy days or sandbag intervals",
          "Run captain / route leader — may not be a certified coach but knows the course and club rules; still defers to the coach's session plan",
          "When the coach speaks, that's the plan — even if a faster runner in the group has other ideas",
        ],
      },
      {
        heading: "Why a coach beats guessing on your own",
        list: [
          "Accountability — someone expects you at 6 a.m. and notices when you skip",
          "Pacing discipline — coaches keep easy runs easy; beginners almost never do that alone",
          "Fewer injuries — backing off when something hurts is part of the job, not weakness",
          "Real-time feedback — stride, breathing, and effort cues you won't get from an app",
          "Belonging — proof that every pace and body type has a place in the sport",
          "Long-term progression — a coach thinks in weeks and months, not just today's Strava segment",
        ],
      },
      {
        heading: "Before your first coached session",
        list: [
          "Read the club or clinic info — know meet-up time, distance options, and pace group descriptions",
          "Arrive early for the coach's briefing; missing it is how people end up in the wrong group",
          "Pick the pace group you'll finish with, not the one that flatters your ego",
          "Tell the coach if you're new, returning from injury, or need to leave early",
          "Leave headphones at home — you need to hear instructions, traffic, and other runners",
          "Bring water if the route has no fountains; ask the coach where stops are planned",
        ],
      },
      {
        heading: "How to listen to your coach during training",
        paragraphs: [
          "A coach's job is the whole season — not validating today's urge to sprint. Group programs work because easy days stay easy and hard days have structure. Your job is to be coachable.",
        ],
        list: [
          "Treat the pre-workout briefing as required — effort, reps, rest, regroup points, and today's purpose",
          "Understand why each session exists — easy runs build base; they're not optional \"junk\" you can race through",
          "Do the prescribed reps and full recoveries — shortening rest turns intervals into random fast running",
          "When the coach says walk or slow down, do it — ego jogging on recovery is how groups get injured",
          "Ask form and strategy questions after the set or at designated Q&A — not mid-rep while they're watching twelve people",
          "Report pain early — a good coach shortens or swaps the workout; hiding a shin issue helps nobody",
          "Don't negotiate every workout in front of the group — trust the block, then give feedback privately if it's not working",
          "If the coach moves you down a pace group for a day, it's training intelligence — not a punishment",
          "Follow route and regroup instructions exactly — shortcuts break the coach's plan and lose people",
        ],
      },
      {
        heading: "Being coachable — what good group runners do",
        list: [
          "Show up in the right pace group consistently — suffering two bands too fast slows everyone and teaches bad habits",
          "Repeat instructions back if you're unsure — \"So we turn left at the bridge?\" beats getting lost",
          "Stay for the cool-down or mobility the coach leads — it's part of the session, not optional social time",
          "Give honest feedback after — \"That tempo felt too hot\" helps next week's plan",
          "Thank volunteer coaches; many clubs run on donated time and certification costs",
          "Move up a group only when the coach agrees — not when you feel spiky one morning",
        ],
      },
      {
        heading: "Workout pacers: your coach's plan on the road",
        paragraphs: [
          "Workout pacers aren't there to race you. They're the runner (or coach on a bike) holding the effort your coach prescribed — usually the same person week after week so the group learns trust and rhythm.",
        ],
        list: [
          "Start beside or slightly behind the pacer — the coach chose that effort for a reason",
          "Ask the plan at the start: even effort? Negative split? Walk breaks at mile markers?",
          "Hold conversation pace on coach-assigned easy days — if you can't talk, tell the coach, don't silently sprint ahead",
          "On tempo or interval days, hit the pacer's targets and full recoveries the coach called out",
          "Stay through regroups — pacers pause to count heads and pass along the coach's next instruction",
          "Tell the pacer early if you're struggling — \"I may drop at the water stop\" lets them adjust without losing the group",
        ],
      },
      {
        heading: "When to speak up to your coach",
        list: [
          "Sharp pain, dizziness, or chest discomfort — stop and find the coach or pacer immediately",
          "You're lost or the group missed a turn",
          "A car, cyclist, or hazard the leader hasn't seen",
          "You need to drop off — say so at a regroup so nobody searches later",
          "The pace feels wrong for the effort the coach described — speak up early, not after you're wrecked",
          "Life stress, poor sleep, or illness — coaches often adjust volume when they know",
        ],
      },
      {
        heading: "Mistakes that frustrate coaches (and slow your progress)",
        list: [
          "Joining a faster group \"just to see\" every week",
          "Racing the warm-up before the coach starts the workout",
          "Ignoring pace-group assignments to chase a Strava segment",
          "Showing up late and missing the briefing",
          "Treating the coach's easy-day effort as a suggestion",
          "Arguing with the plan in front of newcomers — it undermines the whole group",
        ],
        paragraphs: [
          "Race-day pacing is its own skill — we'll cover that separately. In training, the win is showing up, listening to your coach, and finishing the session as prescribed. The best group runners are coachable week after week, not just flashy on one rep.",
        ],
        cta: {
          text: "Read road and trail etiquette",
          href: "/blog/runner-etiquette-trails-roads-track",
        },
      },
    ],
  },
  {
    slug: "mortons-neuroma-running",
    title: "Morton's Neuroma and Running: Symptoms, Treatments, and What Actually Helped",
    excerpt:
      "Burning or numbness between your toes isn't normal — Morton's neuroma is common in runners. One friend's story: injections and acupuncture didn't fix it; a metatarsal pad helped a little; wider toe-box shoes (like Topo) finally did.",
    category: "Health",
    author: BLOG_AUTHOR,
    publishedAt: "2026-09-03",
    readTime: "8 min",
    relatedSlugs: [
      "choosing-running-shoes",
      "avoiding-injuries",
      "first-run-tips",
      "what-to-wear-running",
    ],
    sections: [
      {
        paragraphs: [
          "You're three miles in and feel like there's a wrinkle in your sock — or a small pebble under the ball of your foot. You stop, shake out your shoe, keep running, and the feeling comes back. Sometimes it's burning. Sometimes it's numbness between the third and fourth toes. That pattern is worth paying attention to.",
          "Morton's neuroma is a thickening of tissue around a nerve in the forefoot — often between the third and fourth toes. It's not a tumor, and it's not rare in runners. Tight shoes, high impact, and lots of miles can irritate the nerve until every step stings.",
          "**This article is practical context for beginners, not medical advice. If your foot hurts, see a podiatrist or sports medicine clinician.** What follows is what the condition is, what treatments people try, and a real story from a close friend who dealt with it while still wanting to run.",
        ],
      },
      {
        heading: "Symptoms runners notice",
        list: [
          "Burning, tingling, or numbness in the ball of the foot — often between the third and fourth toes",
          "Feeling like you're stepping on a pebble or folded sock when there isn't one",
          "Pain that gets worse in tight shoes or toward the end of a run",
          "Relief when you take shoes off, massage the forefoot, or spread your toes",
          "Occasional sharp zaps when the nerve is really irritated",
          "Symptoms that may ease on softer surfaces and flare on hard pavement or downhill",
        ],
        paragraphs: [
          "Not every forefoot ache is a neuroma — stress reactions, metatarsalgia, and tendon issues can feel similar. That's why a professional exam matters if pain lasts more than a week or two.",
        ],
      },
      {
        heading: "Why runners get it",
        list: [
          "Shoes that squeeze the forefoot — narrow toe boxes, pointed shapes, or sizes too small",
          "High heels or stiff work shoes all day, then running in snug trainers",
          "Sudden mileage or intensity jumps without recovery",
          "Repetitive impact on hard surfaces",
          "Foot mechanics that load the front of the foot heavily (every body is different)",
        ],
      },
      {
        heading: "What doctors often suggest",
        paragraphs: [
          "Treatment usually starts conservative and escalates only if needed. Most runners want the fastest fix; the sustainable one is often boring shoe and load changes.",
        ],
        list: [
          "Reduce or pause running briefly while the nerve calms down",
          "Wider shoes with a roomy toe box — toes should splay, not overlap",
          "Metatarsal pads or domes to offload pressure from the irritated spot",
          "Corticosteroid injections to reduce inflammation around the nerve",
          "Physical therapy, toe spacers, and gait adjustments",
          "Acupuncture or other complementary approaches some clinics offer",
          "Surgery in persistent cases — usually a last resort after months of failed conservative care",
        ],
      },
      {
        heading: "A friend's story: injections, acupuncture, pad, then shoes",
        paragraphs: [
          "A close friend of mine developed classic neuroma symptoms mid training block — burning between the toes, that phantom-pebble feeling, and dread lacing up for easy runs. They did the right thing first: saw a podiatrist and got a clear diagnosis.",
          "They tried corticosteroid injections. Relief was partial and temporary; the burning came back within a few weeks. They also tried acupuncture over several sessions. They liked the appointments, felt looser afterward, but the neuroma pain was still there on runs.",
          "A metatarsal pad (sometimes called a metatarsal dome or met dorsal pad) helped a little — enough to finish some shorter runs with less sting, but not enough to feel \"fixed.\" It offloaded the hot spot, which confirmed the problem was pressure and irritation in that exact zone.",
          "What finally moved the needle was switching to wider toe-box shoes. They landed on Topo Athletic models with a genuinely roomy forefoot — toes could spread on the ground instead of being squeezed together. Combined with slightly looser lacing in the forefoot and keeping easy days truly easy, symptoms faded over several weeks. They're not preaching one brand for everyone; the lesson was toe box width and shape, not a magic logo.",
          "Your feet aren't their feet. Their story isn't a treatment plan — it's a reminder that if injections and adjunct therapies only help briefly, the shoe may still be the main problem.",
        ],
      },
      {
        heading: "Shoe changes that help neuroma-prone feet",
        list: [
          "Look for \"wide\" or \"foot-shaped\" toe boxes — brands like Topo, Altra, and some wide versions of mainstream trainers",
          "Size up half a size if your toes touch the front when standing",
          "Try on shoes in the afternoon when feet are slightly swollen, like on a run",
          "Lace to secure the heel and midfoot while leaving the forefoot less compressed — skip the tight top-eyelet pull if it pinches",
          "Rotate two pairs if you run most days so foam can rebound",
          "Avoid zero-drop overnight if you're not used to it — transition gradually if you change stack or drop",
        ],
        cta: {
          text: "Read our shoe guide",
          href: "/blog/choosing-running-shoes",
        },
      },
      {
        heading: "Metatarsal pads — how they help (a little or a lot)",
        paragraphs: [
          "A metatarsal pad sits behind the ball of the foot and lifts the metatarsal heads slightly, spreading pressure away from the irritated nerve. For my friend, it was a useful experiment: modest relief meant the diagnosis made sense and footwear was still the bigger lever.",
        ],
        list: [
          "Start with a reusable gel pad or a podiatrist-fitted orthotic — placement matters",
          "Too far forward and it hurts more; too far back and it does nothing",
          "Combine with wider shoes — pads alone rarely fix a narrow toe box",
          "If a pad helps even slightly, that's data — not a reason to skip professional follow-up",
        ],
      },
      {
        heading: "When to back off running",
        list: [
          "Sharp or worsening pain that changes your gait",
          "Numbness that doesn't resolve after rest",
          "Pain that spikes at night or at rest — not just on runs",
          "No improvement after 2–3 weeks of shoe changes and reduced volume",
          "Any foot issue if you have diabetes or circulation concerns — get seen sooner",
        ],
        paragraphs: [
          "A short pause beats a long injury. Cross-train on the bike or in the pool if your clinician says it's OK. Come back with easier pace, softer surfaces, and better shoes.",
        ],
      },
      {
        heading: "Returning to running after symptoms ease",
        list: [
          "Walk-run for a week before straight jogging — re-test toe space and pad placement",
          "Keep early runs short and flat; save hills until forefoot stays quiet",
          "Log shoes and symptoms — if the old pair brings burning back in 10 minutes, retire it for daily training",
          "Stay on top of mileage increases — neuromas love revenge when you spike volume",
          "Keep follow-up with your podiatrist if symptoms flicker again",
        ],
        paragraphs: [
          "Most runners who respect toe space and load come back stronger. The ones who struggle usually repeat the same tight shoe in a new color and wonder why the burning returned.",
        ],
        cta: {
          text: "Injury prevention basics",
          href: "/blog/avoiding-injuries",
        },
      },
    ],
  },
  {
    slug: "achilles-tendinitis-running",
    title: "Achilles Tendinitis for Runners: How a Mileage Spike Got Me — and What Fixed It",
    excerpt:
      "Achilles pain isn't just a beginner injury. I spiked mileage as a seasoned runner and paid for it. Slow calf raises, then isometric holds, then air skipping — that progression is what finally got me back.",
    category: "Health",
    author: BLOG_AUTHOR,
    publishedAt: "2026-09-06",
    readTime: "9 min",
    relatedSlugs: [
      "avoiding-injuries",
      "bodyweight-strength-for-runners",
      "post-run-recovery",
      "mortons-neuroma-running",
    ],
    sections: [
      {
        paragraphs: [
          "The first steps out of bed felt wrong — stiff, tight, a dull ache low on the back of my leg. I told myself it was normal soreness. I'd been running for years. I knew my body. I was wrong.",
          "Within a week, every easy run started with a wince. The pain sat right on the Achilles — sometimes at the heel, sometimes a few inches above it. Classic Achilles tendinitis (doctors often say tendinopathy when it's been hanging around). And it didn't care that I wasn't a couch-to-5K beginner.",
          "This article is what I learned from my own flare-up: how it happened, what didn't help, and the slow rehab path that actually worked — calf raises, then isometric calf raises, then air skipping. **It's not medical advice. If your Achilles hurts, see a sports medicine doctor or physical therapist.** But if you're a runner trying to understand the pattern, this might save you a few frustrated months.",
        ],
      },
      {
        heading: "How it happened — even as a seasoned runner",
        paragraphs: [
          "I didn't trip, fall, or twist anything. I just added too much, too fast. A good stretch of weather, a race on the calendar, and the confidence that comes from years of consistent miles — I stacked an extra long run, bumped weekday volume, and kept the pace honest on tired legs.",
          "The 10% weekly mileage rule is for beginners, I thought. Experienced runners bend rules all the time. Tendons don't read Strava comments. They respond to load, and mine had crossed the line from challenged to irritated.",
          "The warning signs were there if I'd listened: morning stiffness that eased after 10 minutes of walking, tenderness when I squeezed the tendon, and pain that warmed up during runs but bit harder the next morning. I kept running through it for another week. That week cost me more than the extra miles were worth.",
        ],
        list: [
          "Sudden mileage jump — not a gradual build over several weeks",
          "More intensity on top of more volume (long runs + faster weekdays)",
          "Insufficient recovery between hard days",
          "Ignoring stiffness because \"I've handled worse\"",
          "Old shoes with slightly compressed heel foam — a smaller factor, but real",
        ],
      },
      {
        heading: "Symptoms to take seriously",
        list: [
          "Pain and stiffness at the back of the heel or along the Achilles, especially first thing in the morning",
          "Tenderness when you pinch or press the tendon",
          "Pain at the start of a run that may ease mid-run but returns afterward",
          "Swelling or thickening along the tendon",
          "Pain that worsens week over week instead of settling",
          "Sharp or sudden pop — stop and get evaluated immediately (rupture is different from tendinitis)",
        ],
        paragraphs: [
          "Achilles issues can overlap with plantar fasciitis, ankle impingement, or calf strain. If you're unsure, get it checked. Imaging isn't always needed, but a good exam beats guessing.",
        ],
      },
      {
        heading: "What I tried first (and what didn't work)",
        list: [
          "Running through it — made mornings worse",
          "Aggressive static stretching into pain — felt good for five minutes, angry by evening",
          "Complete rest for two weeks — pain calmed, then returned on the first run back",
          "Ice after runs — soothing, not a fix on its own",
          "Random YouTube exercises with no progression — busy work without a plan",
        ],
        paragraphs: [
          "Rest alone doesn't rebuild a tendon that's lost tolerance to load. You need to reduce running volume while deliberately strengthening the calf-Achilles unit — slowly, with a progression that respects pain levels.",
        ],
      },
      {
        heading: "Phase 1: Slow calf raises",
        paragraphs: [
          "I started with both feet on flat ground, hands on a wall for balance, rising onto my toes and lowering over a full three-count. No bouncing. No heroics. The goal was to wake up the calf and tendon without provoking sharp pain — mild discomfort at the tight spot was OK; wincing was not.",
          "After a few days, I moved to a step: balls of both feet on the edge, heels hanging off, rising up and lowering slowly below parallel on the injured side (both legs up, injured leg down on the eccentric). That's the classic heavy-slow loading idea — tendons respond to controlled tension, not panic stretching.",
        ],
        list: [
          "Week 1: 2 sets of 12–15 slow raises, both legs, flat ground, every other day",
          "Week 2: 3 sets on a step with slow lowering on the affected leg",
          "Pain rule: no worse pain during the set; no spike in morning stiffness the next day",
          "If a session flares you up, repeat the previous level — progression isn't linear",
        ],
      },
      {
        heading: "Phase 2: Isometric calf raises",
        paragraphs: [
          "Once basic raises felt manageable, I shifted to isometrics — holding a raised position without moving up and down. Research and rehab clinics use these to calm tendon pain while still loading the tissue. For me, it was the bridge between \"I can do reps\" and \"I can run again.\"",
          "I'd rise onto both toes on a step, hold the top position for 30–45 seconds, rest, and repeat. Some days I held at mid-range instead of full height if the top position stirred things up. The hold should feel like work, not agony.",
        ],
        list: [
          "3–5 holds of 30–45 seconds, once or twice daily",
          "Hold at the height that produces mild tension in the tendon, not sharp pain",
          "Breathe normally — no white-knuckle gripping",
          "Combine with reduced running: shorter, flatter, slower until morning stiffness fades",
          "Progress to single-leg isometric holds only when double-leg feels boring, not painful",
        ],
        cta: {
          text: "Bodyweight strength for runners",
          href: "/blog/bodyweight-strength-for-runners",
        },
      },
      {
        heading: "Phase 3: Air skipping",
        paragraphs: [
          "This was the piece that made running feel possible again. Air skipping is exactly what it sounds like — the motion of jumping rope without a rope, or very small hops in place with minimal ground contact. It's a gentle plyometric: the Achilles stores and releases elastic energy without the full impact of bounding or sprinting.",
          "I started with 20–30 seconds on a soft surface, focusing on quick light feet and staying tall. Not max height. Not racing a clock. Over two weeks I built to a few sets of 45 seconds with rest between. The tendon started tolerating spring again instead of just surviving slow raises.",
          "When air skipping stayed quiet — no next-morning revenge stiffness — I added easy jog intervals. Walk-run came back before straight continuous miles. The skipping didn't replace running; it proved the tendon could handle load faster than running alone would have allowed.",
        ],
        list: [
          "Start on grass, track infield, or gym mat — not concrete",
          "20–30 seconds per set, 3–4 sets, every other day at first",
          "Land softly; think \"quiet feet,\" not \"highest jump\"",
          "Stop the set if pain shifts from dull work to sharp pull",
          "Graduate to easy running only after skipping and isometrics stay symptom-stable for a week",
        ],
      },
      {
        heading: "Returning to running without repeating the mistake",
        list: [
          "Cap weekly mileage increase at 10% — yes, even for veterans",
          "Keep one truly easy day between harder efforts",
          "Avoid back-to-back hilly or fast sessions while the tendon is rebuilding trust",
          "Replace worn shoes before the heel stack is dead",
          "Keep calf raises and isometrics in maintenance — 2× per week even when healthy",
          "Treat morning stiffness as data, not something to run off",
        ],
        paragraphs: [
          "I got back to normal training, but I didn't forget the lesson. Experience doesn't grant immunity from load errors. Tendons are patient creditors — they always collect.",
        ],
        cta: {
          text: "Injury prevention basics",
          href: "/blog/avoiding-injuries",
        },
      },
      {
        heading: "When to see a professional",
        list: [
          "Pain lasting more than 2–3 weeks despite reducing mileage",
          "Swelling, redness, or warmth along the tendon",
          "Inability to walk without a limp",
          "Night pain that wakes you up",
          "Any sudden pop, gap, or inability to push off the foot",
          "Diabetes, blood flow issues, or prior Achilles rupture — don't self-treat",
        ],
        paragraphs: [
          "A good physical therapist can tailor loading progressions, check gait, and rule out other issues. Corticosteroid injections near the Achilles are controversial and often avoided — ask questions before any quick fix.",
        ],
        cta: {
          text: "Post-run recovery habits",
          href: "/blog/post-run-recovery",
        },
      },
    ],
  },
];

function withWhyItMatters(post: BlogPost): BlogPost {
  return {
    ...post,
    whyItMatters: post.whyItMatters ?? getWhyItMatters(post.slug),
  };
}

/** Posts are visible from 7:00 AM US Eastern on their publish date. */
export function isBlogPostPublished(
  publishedAt: string,
  now: Date = new Date()
): boolean {
  return isBlogPostPublishedAt(publishedAt, now);
}

/** Newest publish date first; same-day posts keep newest-added order. */
export function compareBlogPostsNewestFirst(a: BlogPost, b: BlogPost): number {
  const dateCompare = b.publishedAt.localeCompare(a.publishedAt);
  if (dateCompare !== 0) return dateCompare;
  return blogPosts.indexOf(b) - blogPosts.indexOf(a);
}

export function getVisibleBlogPosts(
  preview = false,
  now: Date = new Date()
): BlogPost[] {
  return blogPosts
    .filter((post) => isBlogPostVisible(post.publishedAt, preview, now))
    .map(withWhyItMatters)
    .sort(compareBlogPostsNewestFirst);
}

export function getPublishedBlogPosts(now: Date = new Date()): BlogPost[] {
  return getVisibleBlogPosts(false, now);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return withWhyItMatters(post);
}

export function getVisiblePostBySlug(
  slug: string,
  preview = false,
  now: Date = new Date()
): BlogPost | undefined {
  const post = getPostBySlug(slug);
  if (!post || !isBlogPostVisible(post.publishedAt, preview, now)) return undefined;
  return post;
}

export function getPublishedPostBySlug(
  slug: string,
  now: Date = new Date()
): BlogPost | undefined {
  return getVisiblePostBySlug(slug, false, now);
}

export function resolveBlogPreview(_previewToken?: string | null): boolean {
  return process.env.NODE_ENV === "development";
}

export function getRelatedPosts(
  post: BlogPost,
  preview = false,
  now: Date = new Date()
): BlogPost[] {
  const isVisible = (publishedAt: string) =>
    isBlogPostVisible(publishedAt, preview, now);

  const fromSlugs = (post.relatedSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter(
      (p): p is BlogPost => p !== undefined && isVisible(p.publishedAt)
    );

  if (fromSlugs.length >= 3) return fromSlugs.slice(0, 3);

  const seen = new Set([post.slug, ...fromSlugs.map((p) => p.slug)]);
  const sameCategory = blogPosts
    .filter(
      (p) =>
        p.category === post.category &&
        !seen.has(p.slug) &&
        isVisible(p.publishedAt)
    )
    .sort(compareBlogPostsNewestFirst);

  return [...fromSlugs, ...sameCategory.map((p) => getPostBySlug(p.slug)!)]
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 3);
}
