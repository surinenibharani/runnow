import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Medium + low priority gap-fill posts from content analysis.
 * Medium: treadmill/winter indoor, warm-up/cool-down, hydration, sleep.
 * Low: speedwork after 5K (brand-fit), shoes without lab awards (differentiation).
 */
export const mediumLowGapPosts: BlogPost[] = [
  {
    slug: "treadmill-indoor-winter-running",
    metaTitle: "Treadmill & Indoor Running for Beginners in Winter",
    title: "Treadmill and Indoor Running: How to Keep Training When Winter Wins",
    excerpt:
      "Ice, dark, and wind don't have to end your streak. How to use the treadmill (or indoor swaps) without boredom, blown knees, or fake 'easy' paces.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-09-29",
    readTime: "8 min",
    relatedSlugs: [
      "running-in-bad-weather",
      "easy-runs-effort-heart-rate",
      "what-to-wear-running",
      "bodyweight-strength-for-runners",
      "building-a-running-habit",
      "importance-of-cross-training",
    ],
    closingQuestion:
      "Are you team treadmill, team bundle-up, or team cross-train when winter hits?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.heartRateZones,
      SOURCES.heatSafety,
    ],
    faq: [
      {
        question: "Is treadmill running 'cheating'?",
        answer:
          "No. It's legitimate training with steadier footing and controlled effort. Outdoor skills still matter for race day, so mix outside when sidewalks are safe.",
      },
      {
        question: "Should I set incline to 1%?",
        answer:
          "A slight incline can offset the belt's assistance for some runners, but it's optional. Comfort and sustainable effort matter more than copying a forum rule.",
      },
      {
        question: "What if I don't have a treadmill?",
        answer:
          "Use indoor tracks, mall walking, stairs carefully, bike/elliptical, or strength days. Consistency beats forcing dangerous outdoor ice runs.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** Stop for chest pain, fainting, or unusual breathlessness, and get clinical guidance if you have chronic conditions before hard sessions.",
          "Winter ends more beginner streaks than hard workouts do. Black ice, early dark, and windchill that steals your face aren't character tests — they're logistics.",
          "A treadmill (or a smart indoor swap) keeps the habit alive. Pair it with [bad-weather decision rules](/blog/running-in-bad-weather) so you know when to stay in versus layer up.",
        ],
      },
      {
        id: "when-indoor",
        heading: "When indoor is the smart call",
        list: [
          "Sidewalks are ice sheets or shoveled into ankle traps",
          "Windchill or storm warnings make falls or frostnip likely",
          "Air quality or ice storm alerts",
          "You're new and confidence is fragile — one scary slip can quit the habit",
          "You only have a short window and setup time beats gearing for Arctic conditions",
        ],
      },
      {
        id: "treadmill-basics",
        heading: "Treadmill basics that save beginners",
        list: [
          "Start with a walking warm-up — never jump on at goal pace from cold",
          "Clip the safety key; learn the emergency stop",
          "Use effort / talk test — belt pace feels different than outdoor pace",
          "Keep most sessions easy; boredom is not a reason to hammer every day",
          "Look ahead, not at your feet; short, quick steps beat overstriding",
          "Slight incline (0–1%) is optional; don't crank hills every easy day",
        ],
        paragraphs: [
          "Heart rate often runs a bit different indoors (heat, no wind cooling). Trust [effort and HR](/blog/easy-runs-effort-heart-rate) over matching last October's outdoor splits.",
        ],
      },
      {
        id: "beat-boredom",
        heading: "Beat treadmill boredom without wrecking recovery",
        list: [
          "Podcasts or playlists reserved only for indoor runs",
          "Fartlek lite: 1 min slightly quicker, 2 min easy — still conversational overall",
          "Break a 30-min run into 3×10 with posture resets",
          "Face a window or TV you actually enjoy — guilt-free",
          "Save hard intervals for days you feel fresh; easy days stay easy",
        ],
      },
      {
        id: "no-treadmill",
        heading: "No treadmill? Indoor swaps that still count",
        list: [
          "Indoor track or long hallway/mall loops for walk-run",
          "Stationary bike or elliptical for aerobic days",
          "Strength + mobility when impact needs a break",
          "Stairs only in short, controlled sets — not endless lung-busting punishment",
        ],
        cta: {
          text: "Cross-training ideas",
          href: "/blog/importance-of-cross-training",
        },
      },
      {
        id: "outdoor-return",
        heading: "Stay race-ready for outdoor days",
        paragraphs: [
          "Treadmills remove wind, camber, and cold-air breathing. When pavement is clear, do some easy outdoor runs so race day doesn't feel foreign. Keep one skill sharp: dressing for cold without overheating — see [what to wear](/blog/what-to-wear-running).",
          "Winter plan: protect the streak indoors, celebrate every safe outdoor easy run, and skip hero miles on black ice. Spring-you will thank January-you.",
        ],
        cta: { text: "Keep your free plan going", href: "/plan" },
      },
    ],
  },
  {
    slug: "warm-up-cool-down-running",
    metaTitle: "How to Warm Up and Cool Down for Running",
    title: "Warm-Up and Cool-Down for Beginners (Skip the 20-Minute Circus)",
    excerpt:
      "You don't need a 40-minute mobility flow before every jog. A short warm-up and simple cool-down make easy runs feel better and hard days safer — without eating your whole evening.",
    category: "Getting Started",
    author: AUTHOR,
    publishedAt: "2026-07-25",
    readTime: "7 min",
    relatedSlugs: [
      "first-run-tips",
      "running-form-101",
      "post-run-recovery",
      "avoiding-injuries",
      "bodyweight-strength-for-runners",
      "easy-runs-effort-heart-rate",
    ],
    closingQuestion:
      "Do you actually warm up — or start cold and hope for the best?",
    sources: [SOURCES.acsmExercisePrescription2009, SOURCES.strengthForRunners],
    faq: [
      {
        question: "How long should a beginner warm up?",
        answer:
          "About 5–10 minutes is enough for most easy runs: brisk walk plus a few gentle drills or easy jog minutes. Longer before harder sessions or in cold weather.",
      },
      {
        question: "Should I stretch before running?",
        answer:
          "Skip long static holds before you run. Prefer easy movement (walk, leg swings, marching) first. Save longer stretching for after, if it feels good.",
      },
      {
        question: "Is a cool-down required?",
        answer:
          "A few minutes of easy walking helps your heart rate and breathing come down gradually and can reduce that post-run dizzy feeling. It doesn't need to be elaborate.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Social media warm-ups look like part-time jobs. Real beginners need something they'll actually do: raise temperature, wake up coordination, then run — then ease out.",
          "**Educational only — not medical advice.** Sharp pain during warm-up is a stop signal, not a cue to stretch harder.",
          "Think **5–10 minutes in, 3–5 minutes out** for most easy days. Harder workouts and cold mornings get a little more.",
        ],
      },
      {
        id: "why",
        heading: "Why bother?",
        list: [
          "Cold muscles and tendons dislike sudden hard efforts",
          "Your breathing and heart rate ramp smoother after movement",
          "A short ritual marks 'run time' — helpful for habit building",
          "Cool-downs reduce the abrupt stop that leaves some people lightheaded",
        ],
      },
      {
        id: "warm-up",
        heading: "A warm-up you'll actually finish",
        list: [
          "3–5 min brisk walk (or easy bike)",
          "Optional: 5–8 leg swings each side, marching with high knees gently, 2×20 sec easy skipping or butt kicks",
          "2–3 min very easy jog before any 'real' pace",
          "Cold day: extend the walk; start indoors if you can",
          "Hard day: add 2–4 short strides (15–20 sec relaxed quicker, full easy recoveries) after you're warm",
        ],
        paragraphs: [
          "No long static toe-touches before the run. Save deep stretching for later. If something sharp hurts during drills, stop — warm-ups shouldn't create injuries.",
        ],
      },
      {
        id: "during",
        heading: "The first mile is still part of the warm-up",
        paragraphs: [
          "Even after drills, mile one (or minutes 1–8) should feel easier than the middle. Beginners who blast the start pay for it later. Use the [talk test](/blog/easy-runs-effort-heart-rate).",
        ],
      },
      {
        id: "cool-down",
        heading: "Cool-down without the spa appointment",
        list: [
          "3–5 min easy walk after you stop jogging",
          "Optional: gentle calf/hip flexor stretch 20–30 sec if it feels good",
          "Water, a light snack if it was long or hot, and dry clothes soon in cold weather",
          "Save foam rolling for later if you're wiped — consistency beats perfection",
        ],
        cta: {
          text: "What to do after the run",
          href: "/blog/post-run-recovery",
        },
      },
      {
        id: "skip",
        heading: "When you can shorten it",
        paragraphs: [
          "Already warm from a walk to the trail? You've started. Short on time? Never skip the easy first minutes of the run itself — that *is* the warm-up. Skip the Instagram flow before you skip safety.",
          "Pair this with [first-run tips](/blog/first-run-tips) and [form basics](/blog/running-form-101) and you've covered the unsexy habits that keep beginners showing up.",
        ],
      },
    ],
  },
  {
    slug: "hydration-electrolytes-running",
    metaTitle: "Hydration and Electrolytes for Beginner Runners",
    title: "Hydration and Electrolytes for Runners (Without Overthinking It)",
    excerpt:
      "Water vs sports drinks, when salt matters, and how to avoid both dehydration and overdrinking. Practical rules for easy runs, long days, and heat.",
    category: "Nutrition",
    author: AUTHOR,
    publishedAt: "2026-10-19",
    readTime: "8 min",
    relatedSlugs: [
      "nutrition-for-runners",
      "nutrition-for-training-by-run-type",
      "running-in-bad-weather",
      "race-day-tips",
      "nutrition-basics-for-beginners",
      "post-run-recovery",
      "running-myths-debunked",
    ],
    closingQuestion:
      "Are you more likely to under-drink on easy days or overdo fluids because a bottle feels 'serious'?",
    sources: [
      SOURCES.dehydration,
      SOURCES.hyponatremia,
      SOURCES.heatSafety,
      SOURCES.runningNutrition,
    ],
    faq: [
      {
        question: "Do I need a sports drink for a 30-minute easy run?",
        answer:
          "Usually no. Water and normal meals cover most short easy runs. Sports drinks help more in longer, hotter, or very sweaty sessions.",
      },
      {
        question: "How much should I drink while running?",
        answer:
          "Drink to thirst as a starting point for many healthy adults. In heat or long efforts, plan small sips rather than gulping. Overdrinking only water can dilute sodium — a real risk in long events.",
      },
      {
        question: "What are electrolytes?",
        answer:
          "Minerals like sodium, potassium, and magnesium that help nerves and muscles work. You lose them in sweat — sodium is the big one runners replace with sports drinks or salty foods.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Hydration advice online swings between 'gallon a day' and 'never carry water.' Reality sits in the middle: **most short easy runs need ordinary drinking habits; heat, humidity, and longer efforts need a plan.**",
          "**General education, not medical advice.** Kidney disease, heart conditions, or meds that affect fluid balance need personalized guidance. Know the warning signs of [dehydration](https://www.mayoclinic.org/diseases-conditions/dehydration/symptoms-causes/syc-20354086) and [low sodium (hyponatremia)](https://www.mayoclinic.org/diseases-conditions/hyponatremia/symptoms-causes/syc-20373711).",
        ],
      },
      {
        id: "daily",
        heading: "Daily hydration (the boring foundation)",
        list: [
          "Drink through the day — pale straw urine is a rough cue for many people",
          "Don't chug a liter right before you lace up (sloshing ≠ hydration)",
          "Caffeine is fine for most in moderation; it isn't a free pass to skip water",
          "Alcohol the night before a long run is a double hit: sleep + fluid",
        ],
      },
      {
        id: "during-runs",
        heading: "During runs: water vs sports drink",
        list: [
          "Under ~45–60 min easy, cool weather: water as needed, often none mid-run",
          "Longer than ~60–75 min, or heavy sweat: consider fluid with sodium + some carbs",
          "Heat / humidity: start sipping earlier; slow the pace ([heat safety](/blog/running-in-bad-weather))",
          "Practice race fluids on long runs — never debut a new gel strategy at the start line",
        ],
        paragraphs: [
          "Sports drinks exist because sweat isn't just water. For everyday 5K training, food with salt at meals often covers electrolytes. Save fancy powders for long/hot days if you want them.",
        ],
      },
      {
        id: "electrolytes",
        heading: "Electrolytes without the influencer kit",
        paragraphs: [
          "Sodium is the headline mineral in sweat. If you finish salty-crusted in summer, you likely need more than plain water on long efforts — sports drink, electrolyte tablets, or salty snacks around training.",
          "More is not always better. **Overdrinking dilute fluids** in long races can contribute to hyponatremia — confusion, nausea, headache, swelling. Thirst + sensible intake beats forced gallon challenges.",
        ],
        list: [
          "Salty sweaters: prioritize sodium on long/hot days",
          "Short cool easy runs: normal meals usually enough",
          "Cramps: multifactorial (fitness, pacing, electrolytes, fatigue) — don't assume one tablet fixes form",
        ],
      },
      {
        id: "after",
        heading: "After the run",
        list: [
          "Water + a meal with some salt and carbs",
          "If the run was long/hot, keep sipping over the next few hours",
          "Weigh-before/after is optional nerd mode — big acute weight drops mean you under-replaced fluid",
        ],
        cta: {
          text: "Fuel by run type",
          href: "/blog/nutrition-for-training-by-run-type",
        },
      },
      {
        id: "red-flags",
        heading: "Red flags — stop and get help",
        list: [
          "Dizziness, confusion, vomiting, or severe headache during/after long efforts",
          "No sweating in extreme heat when you should be soaked",
          "Chest pain or fainting",
          "Swelling and feeling waterlogged after drinking large volumes",
        ],
        paragraphs: [
          "For everyday menus and race-week fueling, see [nutrition for runners](/blog/nutrition-for-runners) and [beginner nutrition basics](/blog/nutrition-basics-for-beginners).",
        ],
      },
    ],
  },
  {
    slug: "sleep-recovery-for-runners",
    metaTitle: "Sleep for Runners: Recovery That Actually Matters",
    title: "Sleep Is Recovery: The Beginner Runner's Guide to Rest That Works",
    excerpt:
      "You can't out-train a chronic sleep deficit. How much sleep runners need, how training messes with bedtime, and simple habits that make easy days and long runs pay off.",
    category: "Recovery",
    author: AUTHOR,
    publishedAt: "2026-10-21",
    readTime: "7 min",
    relatedSlugs: [
      "post-run-recovery",
      "what-to-do-on-rest-days",
      "avoiding-injuries",
      "building-a-running-habit",
      "easy-runs-effort-heart-rate",
      "nutrition-basics-for-beginners",
    ],
    closingQuestion:
      "What's the first thing that slips when training ramps — bedtime, or the easy pace on tired days?",
    sources: [SOURCES.sleepTips, SOURCES.physicalActivityGuidelinesUS],
    faq: [
      {
        question: "How much sleep do runners need?",
        answer:
          "Most healthy adults do best with at least 7 hours; many runners feel better closer to 7–9, especially in heavier training weeks. Quality and consistency matter as much as a perfect number.",
      },
      {
        question: "Can I run if I slept badly?",
        answer:
          "Yes — keep it easy or shorten it. Skip the hard workout. One bad night isn't an emergency; a week of short sleep means reduce intensity and protect bedtime.",
      },
      {
        question: "Does evening running ruin sleep?",
        answer:
          "It depends on the person. Hard late sessions can leave some people wired. Easy evening jogs are fine for many — finish with a wind-down buffer if you notice restless nights.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Training stress + life stress only adapt when you recover. Sleep is the highest-ROI recovery tool beginners skip while buying massage guns.",
          "**Educational only — not medical advice.** Chronic insomnia, loud snoring with daytime sleepiness, or new serious symptoms deserve clinical care — not just caffeine and stubborn early alarms.",
          "Mayo Clinic notes most adults need **at least seven hours**, with steady schedules helping more than occasional catch-up marathons. Aim for enough that you don't need heroic caffeine to feel human — often **7–9 hours** in build weeks.",
        ],
      },
      {
        id: "why-runners",
        heading: "Why runners feel sleep debt faster",
        list: [
          "Tissue repair and hormone signals lean on overnight recovery",
          "Poor sleep raises perceived effort — easy runs feel strangely hard",
          "Injury risk climbs when you stack fatigue + mileage jumps",
          "Mood and habit discipline drop — the streak dies psychologically first",
        ],
      },
      {
        id: "habits",
        heading: "Sleep habits that survive a training plan",
        list: [
          "Consistent wake time (even weekends, within reason)",
          "Dim screens and bright light in the hour before bed",
          "Caffeine cutoff early afternoon if you're sensitive",
          "Finish hard workouts with time to unwind — not straight into doomscrolling",
          "Keep the room cool, dark, and boring",
          "If you're not asleep ~20 minutes, get up and do something quiet, then retry",
        ],
        paragraphs: [
          "More detail: Mayo Clinic's [sleep tips](https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379).",
        ],
      },
      {
        id: "training-adjust",
        heading: "Adjust training when sleep tanks",
        list: [
          "One rough night: easy run or walk-run only; no intervals",
          "Several short nights: cut volume or intensity; protect bedtime like a workout",
          "Race week: prioritize sleep over secret fitness breakthroughs",
          "Track mood + RPE — if everything feels heavy, believe it",
        ],
        cta: {
          text: "Keep easy days easy",
          href: "/blog/easy-runs-effort-heart-rate",
        },
      },
      {
        id: "naps-rest",
        heading: "Naps, rest days, and guilt",
        paragraphs: [
          "Short naps (≤20–30 min) can help some people; long late naps can steal night sleep. Rest days aren't lazy — they're when adaptation happens. See [rest days](/blog/what-to-do-on-rest-days) and [post-run recovery](/blog/post-run-recovery).",
          "You can't PR your way out of a sleep deficit. Protect the night, and the miles finally count.",
        ],
      },
    ],
  },
  {
    slug: "speedwork-after-5k-beginners",
    metaTitle: "Beginner Speedwork After Your First 5K",
    title: "Speedwork After Your First 5K (Without Turning Every Run Into a Race)",
    excerpt:
      "Ready for something spicier than easy miles? How to add strides, gentle intervals, and simple VO₂-style work after a 5K — once a week, with full recovery, and no junk intensity.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-10-17",
    readTime: "8 min",
    relatedSlugs: [
      "training-first-5k",
      "training-first-10k",
      "run-workouts-hills-intervals-fartlek-track",
      "easy-runs-effort-heart-rate",
      "how-to-pace-yourself",
      "avoiding-injuries",
      "first-track-workout-beginners",
    ],
    closingQuestion:
      "Have you added speedwork yet — or are easy miles still doing all the heavy lifting?",
    sources: [
      SOURCES.intervalTrainingVO2max2024,
      SOURCES.intervalTrainingVO2maxRunners2021,
      SOURCES.acsmExercisePrescription2009,
    ],
    faq: [
      {
        question: "When can beginners start speedwork?",
        answer:
          "After you can finish a 5K (or jog ~30 minutes) consistently for several weeks without lingering pain. Keep one quality session per week at first; the rest stays easy.",
      },
      {
        question: "What is VO₂max work in plain English?",
        answer:
          "Short harder efforts that challenge your aerobic power, with recoveries in between. Beginners can touch this with short repeats — not all-out lung-searing every Tuesday.",
      },
      {
        question: "Can speedwork cause injury?",
        answer:
          "Yes if you add it on top of big mileage jumps, skip warm-ups, or make every day hard. Progress slowly and keep most runs easy.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "You don't need elite track sessions to get faster. After a first [5K](/blog/training-first-5k), a little controlled spice once a week teaches your legs quicker turnover while easy days still build the engine.",
          "**Educational only — not medical advice.** Skip hard sessions if you're injured, febrile, or newly symptomatic — intensity is optional; staying healthy is not.",
          "If you're still gasping on every jog, fix [easy effort](/blog/easy-runs-effort-heart-rate) first. Speedwork on a broken base is how shin and knee pain show up.",
        ],
      },
      {
        id: "prereqs",
        heading: "Prerequisites before you add speed",
        list: [
          "3+ weeks of consistent easy running without lingering injury",
          "You can finish easy runs conversationally",
          "Willingness to keep other days truly easy",
          "A warm-up habit ([warm-up guide](/blog/warm-up-cool-down-running))",
        ],
      },
      {
        id: "progression",
        heading: "A gentle progression (one quality day)",
        list: [
          "Weeks 1–2: strides — 4–6×15–20 sec relaxed quicker on flat, full walk/jog recoveries, after an easy run",
          "Weeks 3–4: 6–8×1 min 'comfortably hard,' 1–2 min easy jog between",
          "Weeks 5–6: 4–5×2 min steady-hard, equal or slightly longer easy jog recoveries",
          "Optional later: short VO₂-style repeats (e.g. 6×90 sec hard, 2–3 min easy) only if recovery feels solid",
        ],
        paragraphs: [
          "Hard means controlled — not vomiting. Recoveries are not optional. Read [run types explained](/blog/run-workouts-hills-intervals-fartlek-track) so intervals, tempo, and hills don't all blur into 'suffer.'",
        ],
      },
      {
        id: "rules",
        heading: "Rules that keep speedwork useful",
        list: [
          "One quality session per week for beginners (two only much later)",
          "Never stack a huge long run jump + first interval week",
          "Stop for sharp pain or form collapse",
          "Hills can replace some flat speed — don't do both maxed out",
          "Race week: reduce or skip intensity",
        ],
      },
      {
        id: "goals",
        heading: "Where this fits your next goal",
        paragraphs: [
          "Chasing a [first 10K](/blog/training-first-10k)? Keep speed short and let the long run lead. Chasing a faster 5K? Strides + short repeats help once easy volume is steady.",
          "Research on interval training and aerobic fitness is promising for trained athletes — beginners still win biggest by showing up easy most days. Spice is the garnish.",
        ],
        cta: { text: "Pick a free plan", href: "/plan" },
      },
    ],
  },
  {
    slug: "running-shoes-without-lab-reviews",
    metaTitle: "How to Buy Running Shoes Without Lab Reviews",
    title: "You Don't Need Shoe Awards: How to Buy Runners Without the Hype",
    excerpt:
      "Lab tests and yearly award roundups sell magazines — not necessarily your next pain-free mile. A practical buying process for beginners that prioritizes fit, comfort, and honest replacement.",
    category: "Gear",
    author: AUTHOR,
    publishedAt: "2026-07-13",
    readTime: "7 min",
    relatedSlugs: [
      "choosing-running-shoes",
      "beginner-gear-guide-under-50",
      "what-to-wear-running",
      "avoiding-injuries",
      "shin-splints-running",
      "first-run-tips",
    ],
    closingQuestion:
      "Did you buy your current shoes for fit — or because a roundup said they won?",
    sources: [SOURCES.shinSplints, SOURCES.patellofemoralPain],
    faq: [
      {
        question: "Are Runner's World shoe awards useless?",
        answer:
          "They're one data point from testers who aren't your feet. Use reviews for shortlists, then buy based on in-person fit and comfort on a short jog.",
      },
      {
        question: "Do I need a gait analysis?",
        answer:
          "A good running store assessment can help, but comfort and gradual mileage matter more than a perfect pronation label. Be wary of hard sells.",
      },
      {
        question: "How often should I replace running shoes?",
        answer:
          "Often around 300–500 miles, or sooner if the midsole feels dead, uneven, or pain shows up when mileage hasn't changed. There's no universal odometer.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Big sites publish lab graphs and gold medals every season. Useful for curiosity. Terrible as a substitute for **your** feet on **your** sidewalks.",
          "LetsRunNow's take: skip the arms race. Use a simple process, spend what you can ([under $50 kit thinking](/blog/beginner-gear-guide-under-50) still applies to the *rest* of gear), and replace shoes when they stop protecting you.",
        ],
      },
      {
        id: "process",
        heading: "A no-hype buying process",
        list: [
          "Shop later in the day when feet are slightly larger",
          "Bring the socks you'll actually run in",
          "Fit: thumbnail of room in the toe box; midfoot secure; heel not frying",
          "Try 2–3 models in your budget; jog in-store or on a treadmill if allowed",
          "Pick the pair that disappears on your foot — not the one with the best Instagram story",
          "Be suspicious of 'you must buy stability/motion control' scripts without a clear why",
        ],
        cta: {
          text: "Full shoe fitting guide",
          href: "/blog/choosing-running-shoes",
        },
      },
      {
        id: "reviews",
        heading: "How to use reviews without obeying them",
        list: [
          "Shortlist 2–3 shoes in your price range",
          "Ignore carbon-plated race toys for easy beginner miles",
          "Read comfort notes, not just 'fastest' claims",
          "Remember testers often run different mileage and paces than you",
        ],
        paragraphs: [
          "Awards answer 'what did our testers like?' Your job is 'what can I run easy in three days a week?' Those overlap sometimes — not always.",
        ],
      },
      {
        id: "rotate-replace",
        heading: "Rotate and replace like an adult",
        list: [
          "One solid daily trainer is enough to start",
          "A second pair later can split wet/dry or long/easy — optional",
          "Retire shoes that feel flat, slanted, or suddenly coincide with new niggles",
          "Don't jump from max-cushion marshmallow to minimal spikes overnight",
        ],
        paragraphs: [
          "Sudden shoe changes plus mileage jumps are a classic [shin splints](/blog/shin-splints-running) setup. Change one variable at a time.",
        ],
      },
      {
        id: "budget",
        heading: "Budget truths",
        paragraphs: [
          "The best shoe is the one you'll wear because it feels good — not the $180 pair collecting dust while you dread blisters. Outlet models and last-season colors are fair game if fit is right.",
          "Hype is optional. Fit is not. Lace up, take the boring easy run, and save the award ceremonies for someone else's marketing calendar.",
        ],
      },
    ],
  },
];
