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
    category: "Tips",
    author: AUTHOR,
    publishedAt: "2026-08-16",
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
    category: "Recovery",
    author: AUTHOR,
    publishedAt: "2026-07-02",
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
    publishedAt: "2026-09-29",
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
    publishedAt: "2026-07-03",
    readTime: "7 min",
    relatedSlugs: [
      "why-sleep-matters-most-runners",
      "post-run-recovery",
      "what-to-do-on-rest-days",
      "avoiding-injuries",
      "building-a-running-habit",
      "easy-runs-effort-heart-rate",
      "nutrition-basics-for-beginners",
    ],
    closingQuestion:
      "What's the first thing that slips when training ramps — bedtime, or the easy pace on tired days?",
    sources: [
      SOURCES.sleepTips,
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.sleepDeprivationEnduranceLopes2023,
      SOURCES.sleepLossPhysicalPerformanceCraven2022,
      SOURCES.sleepDeprivationAthletesGong2024,
      SOURCES.sleepInjuryAdolescentMilewski2014,
      SOURCES.sleepAthleteConsensusBJSM2021,
      SOURCES.sleepInterventionsAthletes2023,
    ],
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
          "Injury risk climbs when you stack fatigue + mileage jumps — adolescent sport data link short sleep with higher injury odds, and endurance meta-analyses show sleep loss hurts longer efforts most ([deeper sleep science](/blog/why-sleep-matters-most-runners))",
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
          "More detail: Mayo Clinic's [sleep tips](https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379). For journal evidence on endurance, injury, and sleep extension, see [why sleep matters most](/blog/why-sleep-matters-most-runners).",
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
    publishedAt: "2026-09-03",
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
          "**Educational only — not medical advice.** This guide is for general education — it is not a diagnosis, treatment plan, or substitute for care from a qualified clinician.",
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
          "Curious about carbon plates and race-day \"super shoes\"? We break down who they help — and who they don't — in [why super shoes are not for everybody](/blog/why-super-shoes-not-for-everybody).",
        ],
      },
    ],
  },
  {
    slug: "why-super-shoes-not-for-everybody",
    metaTitle: "Why Super Shoes Are Not for Everybody",
    title: "Why Super Shoes Are Not for Everybody",
    excerpt:
      "Carbon plates and bouncy foam can shave a few percent off the cost of running for some athletes — and feel unstable, expensive, or risky for others. What the journals and gear desks actually say about who should (and shouldn't) lace them up.",
    category: "Gear",
    author: AUTHOR,
    publishedAt: "2026-10-23",
    readTime: "12 min",
    relatedSlugs: [
      "choosing-running-shoes",
      "running-shoes-without-lab-reviews",
      "beginner-gear-guide-under-50",
      "avoiding-injuries",
      "shin-splints-running",
      "stress-fracture-running",
      "achilles-tendinitis-running",
      "speedwork-after-5k-beginners",
      "first-race-signup-logistics",
    ],
    closingQuestion:
      "Have you tried a carbon-plated shoe — and did it feel like free speed, a wobbly trampoline, or both?",
    sources: [
      SOURCES.vaporflyEconomyHoogkamer2018,
      SOURCES.carbonPlateBiomechanicsHoogkamer2019,
      SOURCES.carbonPlateMetaFrontiers2025,
      SOURCES.bendingStiffnessReview2021,
      SOURCES.carbonPlateNavicularTenforde2023,
      SOURCES.aftEversionFootwearScience2024,
      SOURCES.outsideSuperShoeInjuries,
      SOURCES.runnersWorldWaShoeRules,
      SOURCES.runningWarehouseWhoSuperShoes,
      SOURCES.wirecutterCasualSuperShoes,
      SOURCES.stressFracture,
      SOURCES.shinSplints,
      SOURCES.achillesTendinitis,
    ],
    faq: [
      {
        question: "What counts as a \"super shoe\"?",
        answer:
          "Usually a tall, highly resilient midsole foam plus a stiff carbon (or similar) plate and a rockered shape designed for race pace. Brands market them as advanced footwear technology — not ordinary daily trainers.",
      },
      {
        question: "Do super shoes make everyone ~4% faster?",
        answer:
          "No. Classic lab work on early carbon-plate prototypes found roughly 4% lower energetic cost in high-caliber runners at fast speeds. A 2025 meta-analysis of plated shoes puts typical metabolic savings closer to ~2–3% across studies — and individual responses vary. Beginners jogging easy may feel little \"free speed\" and more instability.",
      },
      {
        question: "Can super shoes cause stress fractures?",
        answer:
          "They are not proven to \"cause\" fractures in everyone. Sports medicine authors have published case series of navicular bone stress injuries in competitive runners using carbon-plate footwear and urge gradual transition plus clinical awareness. Biomechanics papers also note motion changes that have been linked historically to navicular stress risk. Treat focal midfoot pain seriously — see a clinician; don't diagnose from a shoe review.",
      },
      {
        question: "Can the next version of the same race shoe bother my Achilles?",
        answer:
          "Yes — model-year geometry changes (stack, rocker, plate shape, foam) can load the calf–Achilles differently even when the name on the box looks familiar. One runner's \"perfect\" Alphafly 2 is not a guarantee for Alphafly 3. Test new race shoes on shorter efforts; if mid-portion Achilles soreness shows up, stop, rest, and rebuild with a patient progression (air skipping → heel raises → eccentric heel lowers) rather than forcing more plated miles.",
      },
      {
        question: "Should beginners buy super shoes?",
        answer:
          "Usually no — not as a first pair and not for everyday easy miles. Start with a comfortable daily trainer that fits. If you later race and want a plated option, introduce it slowly on a few faster sessions after you have a base.",
      },
      {
        question: "Are \"illegal\" stack-height shoes banned for my local 5K?",
        answer:
          "World Athletics caps competition shoes (for sanctioned elite road racing) at 40 mm stack and one rigid plate. Runner's World and race organizers note those rules matter most for elites and some championship settings; local open fields rarely police midsole height. Comfort and fit still beat rule-chasing for most hobbyists.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** Shoe choice is personal; this is general education, not a diagnosis or prescription. Focal bone pain, swelling, or pain that worsens with every run needs a qualified clinician — especially midfoot pain.",
          "Instagram makes it look mandatory: carbon plate, marshmallow foam, race-day rocket ship. Elites smash records in them. Gear desks call them **super shoes** or **advanced footwear technology (AFT)**.",
          "Here's the beginner-friendly truth: the same tools that help some athletes run more economically can feel unstable, overpriced, or poorly matched to easy training. Individual response varies a lot — and sports medicine writers have flagged foot-loading changes worth respecting.",
          "Want the journal deep-dive? For **advanced reading**, jump to [What the science actually shows (and doesn't)](#what-science-shows) near the end of this post.",
        ],
      },
      {
        id: "what-they-are",
        heading: "What \"super shoes\" actually are",
        paragraphs: [
          "Strip the marketing and you're usually looking at three ideas stacked together:",
        ],
        list: [
          "**Very resilient foam** (often PEBA-family compounds) that returns more energy when compressed than old EVA midsoles",
          "**A stiff plate** (often carbon fiber) that raises longitudinal bending stiffness — how hard the shoe is to bend toe-to-heel",
          "**Geometry** — taller stack and a rocker shape that encourages a rolling stride at speed",
        ],
        closingParagraphs: [
          "A 2021 narrative review in *Sports Medicine* notes that raising bending stiffness alone produces **mixed** running-economy results — from small gains to small losses — because plate shape, placement, foam, and the runner all interact. The \"super\" effect is a **system**, not a magic wafer of carbon. More study detail lives in the [science section](#what-science-shows) below.",
        ],
      },
      {
        id: "injury-caveats",
        heading: "Injury caveats — association, not a morality tale",
        paragraphs: [
          "Performance tech changes how the foot and ankle load. That can be fine. It can also be a problem if you pile on miles too fast in a brand-new geometry.",
          "In a 2023 *Sports Medicine* Current Opinion piece, Tenforde and colleagues described a **case series of five navicular bone stress injuries** in highly competitive runners using carbon-fiber plate footwear. They do **not** claim every plated shoe causes fractures. They do urge clinicians to consider altered foot/ankle demands, recommend a **slow gradual transition**, and call for more research.",
          "Outside's gear reporting walks through that case series and later lab work: a 2024 *Footwear Science* comparison of a Vaporfly-style AFT shoe vs a minimalist shoe found greater **eversion excursion** in the AFT condition — a motion pattern previously observed in runners with a history of navicular stress fracture. That's a mechanistic clue, not a population epidemic proof.",
          "Practical translation for LetsRunNow readers:",
        ],
        list: [
          "Don't make a carbon racer your only shoe from day one of a new plan",
          "Introduce plated shoes on a few strides or short faster pieces before race day",
          "Treat a new model year like a new shoe — even if you loved last year's version",
          "Treat pinpoint midfoot pain that worsens with running as a stop-and-get-checked signal — see our [stress fracture guide](/blog/stress-fracture-running)",
          "Mid-portion Achilles soreness after a shoe change deserves the same respect — see [Achilles tendinitis for runners](/blog/achilles-tendinitis-running)",
          "Sudden shoe swaps plus mileage jumps still feed classic overuse patterns like [shin splints](/blog/shin-splints-running)",
        ],
      },
      {
        id: "same-name-new-geometry",
        heading: "Same name, new geometry: my Alphafly 2 vs Alphafly 3 story",
        paragraphs: [
          "**One person's n=1 — not a lab trial, and not a claim that Alphafly 3 injures everyone.** Still, it is the clearest example I have that \"I already run in Nike's top race shoe\" is not the same as \"this year's update will agree with my Achilles.\"",
          "I raced and trained through a season in the **Nike Alphafly 2** without Achilles trouble. When I switched to the **Alphafly 3**, mid-portion Achilles irritation showed up after only a few runs. Same brand family. Same \"super shoe\" category. Different geometry under the foot — and my tendon noticed.",
          "That first flare was not a \"shake it out and keep racing\" moment. I had to **rest about three weeks**, stay off the Alphafly 3, and deliberately **strengthen the Achilles / calf complex** — starting with **air skipping**, then **heel raises**, then **eccentric heel lowers** — before running felt trustworthy again. Full progression: [Achilles tendinitis for runners](/blog/achilles-tendinitis-running). Super-shoe hype does not outrun tendon biology.",
          "After that break and rehab work, I went on to finish **several half marathons and a full marathon** without that Achilles pattern coming back — still avoiding the Alphafly 3. Later, curious whether it had been a fluke, I put the Alphafly 3 back on for a **9-mile run**. The little mid-portion Achilles soreness returned. That was enough confirmation for me: the shoe was the variable, not random bad luck.",
          "The lesson I want beginners (and experienced racers) to take: **choosing the right shoe still matters inside the supershoe aisle.** A new model can change stack, rocker, plate shape, and foam feel enough to load the calf–Achilles unit differently — even when the box says the same product line. Love last year's racer? Still treat this year's update like a new tool. Short test runs first. Bail early if the mid-Achilles complains — and budget real rest plus strengthening if it flares, instead of hoping the next race will magically adapt your tendon. Mayo Clinic's overview of [Achilles tendinitis](https://www.mayoclinic.org/diseases-conditions/achilles-tendinitis/symptoms-causes/syc-20369020) is a reminder that sudden load changes — including footwear — are a classic setup.",
        ],
      },
      {
        id: "who-should-skip",
        heading: "Who should usually skip them (for now)",
        list: [
          "**New runners** still building consistency — buy fit and comfort first ([shoe guide](/blog/choosing-running-shoes))",
          "**Easy-day specialists** whose weekly volume is mostly conversational jogging — a stable daily trainer usually feels better",
          "**Anyone with recent foot/bone stress history** until a clinician clears the plan (and even then, transition slowly)",
          "**Budget-first beginners** — race foams die faster; see [gear under $50 thinking](/blog/beginner-gear-guide-under-50) for the rest of the kit",
          "**Unstable feeling on a short jog in-store** — if it feels like a trampoline you can't steer, it's not \"you failing the shoe\"",
        ],
        paragraphs: [
          "Skipping super shoes is not anti-progress. It's matching the tool to the job. Most beginners win more fitness from showing up easy than from a plate they fear on wet sidewalks.",
        ],
      },
      {
        id: "who-might-try",
        heading: "Who might reasonably try them",
        list: [
          "Runners with a solid base who race 5K–marathon and want a dedicated race-day pair",
          "Athletes adding limited quality work ([after a first 5K base](/blog/speedwork-after-5k-beginners)) who can afford a second shoe",
          "People who try two models and clearly feel smoother at goal pace — individual response beats brand loyalty",
        ],
        paragraphs: [
          "Even then: break them in. Tenforde et al. explicitly recommend a gradual move from habitual shoes into carbon-plate footwear. Race morning should not be the first time your calves and feet meet that rocker.",
        ],
      },
      {
        id: "rules-hype",
        heading: "Rules, \"illegal\" shoes, and hype control",
        paragraphs: [
          "World Athletics set competition limits (notably **≤40 mm** stack for road racing shoes and **one** rigid plate) to keep elite fields somewhat comparable — covered clearly by Runner's World. Those rules matter most at the championship/elite end. Your neighborhood 5K is rarely a midsole forensics lab.",
          "Don't confuse \"legal for elites\" with \"necessary for me.\" And don't confuse \"taller than 40 mm\" lifestyle trainers with a moral failing. Buy the shoe that fits the run you're actually doing.",
          "For hype-resistant shopping habits, pair this piece with [buying shoes without lab awards](/blog/running-shoes-without-lab-reviews).",
        ],
      },
      {
        id: "practical-plan",
        heading: "A practical plan if you're curious anyway",
        list: [
          "Own one great daily trainer first — the pair you'll actually log 80% of miles in",
          "If you add a plated shoe, wear it for short strides or a tempo segment before any race",
          "When a brand releases \"the next Alphafly / Vaporfly / Adios Pro,\" test it — don't assume last year's fit transfers",
          "Keep easy days in the stable shoe; save the rocket for hard/race efforts if it feels good",
          "Change one variable at a time (new shoe **or** big mileage jump — not both)",
          "Retire race foams when they feel flat; they aren't immortal just because they were expensive",
        ],
        cta: {
          text: "Get fitted the boring, useful way",
          href: "/blog/choosing-running-shoes",
        },
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Super shoes are a real engineering story backed by economy studies — and a poor personality test. Journals support modest average metabolic savings in tested runners; they do not crown carbon as mandatory beginner kit. Sports medicine case series and biomechanics papers are enough reason to transition slowly and take midfoot or Achilles pain seriously — including when the shoe that bothers you is only one model year newer than a pair you loved.",
          "If your goal is loving the next easy run, a shoe that disappears on your foot beats a plate that wins Instagram. Lace up what fits. Train the engine. Let the foam be optional.",
        ],
        cta: { text: "Start a free training plan", href: "/plan" },
      },
      {
        id: "what-science-shows",
        heading: "What the science actually shows (and doesn't)",
        paragraphs: [
          "This section is the **advanced reading** pass — economy studies, biomechanics, and what those numbers do *not* promise a beginner on easy miles.",
        ],
        subsections: [
          {
            heading: "They can lower the metabolic cost of running — for some people, at some speeds",
            paragraphs: [
              "The landmark Hoogkamer et al. (2018) study in *Sports Medicine* compared a prototype carbon-plate marathon shoe with established racers in high-caliber athletes. Energetic cost dropped on the order of **~4%** across the speeds they tested — a big deal at the pointy end of the sport.",
              "Follow-up biomechanics work (Hoogkamer, Kipp & Kram, 2019) pointed less at \"the plate bouncing you forward like a spring\" and more at a combo: foam energy return, altered ankle/MTP joint mechanics, and how the stiff forefoot changes leverage.",
              "A 2025 systematic review and meta-analysis in *Frontiers in Sports and Active Living* pooled plated vs non-plated crossover trials and found plated shoes lowered metabolic demand by roughly **~2–3%** across outcomes (certainty moderate for several endpoints). Useful. Not \"everyone gets elite Nike ads.\"",
            ],
          },
          {
            heading: "Response is individual — and study cohorts aren't beginner joggers",
            paragraphs: [
              "Most economy studies recruit competitive or well-trained runners moving at controlled lab paces. That's the right design for measuring oxygen cost. It's a weak design for promising a couch-to-5K runner that a $250 race shoe will make easy miles feel easier.",
              "Gear desks make the same point in plain English. Running Warehouse summarizes clinician and lab voices: the people who respond best in testing are often already fast; tall, bouncy stacks can feel **wobbly** when you're on the ground longer at easy pace — more \"Swiss ball\" than \"free speed.\" Wirecutter's casual-runner explainer echoes the common coaching line: these shoes are built for **harder efforts**, not every recovery shuffle.",
            ],
          },
        ],
      },
    ],
  },
];
