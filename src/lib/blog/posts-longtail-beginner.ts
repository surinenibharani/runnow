import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Long-tail beginner questions that still leak search traffic
 * even with the broader hubs already on the site.
 */
export const longtailBeginnerPosts: BlogPost[] = [
  {
    slug: "how-many-days-a-week-should-beginners-run",
    metaTitle: "How Many Days a Week Should a Beginner Run?",
    title: "How Many Days a Week Should Beginners Run?",
    excerpt:
      "Three days is the default that actually sticks. Why daily running backfires for new runners, how rest days fit the CDC activity target, and when a fourth day is earned — not assumed.",
    category: "Getting Started",
    author: AUTHOR,
    publishedAt: "2027-01-06",
    readTime: "8 min",
    relatedSlugs: [
      "never-ran-where-to-start",
      "what-to-do-on-rest-days",
      "easy-runs-effort-heart-rate",
      "avoiding-injuries",
      "building-a-running-habit",
    ],
    closingQuestion:
      "What weekly rhythm actually survived your calendar — three days, four, or something messier?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.physicalActivityGuidelines,
      SOURCES.peaceAndLove,
    ],
    faq: [
      {
        question: "Can a beginner run every day?",
        answer:
          "Usually no. Everyday running stacks impact before tendons and bone have adapted. Three run days with rest or walking between them builds the habit without the classic week-three shin splint.",
      },
      {
        question: "Is three days enough for health?",
        answer:
          "Yes if the sessions add toward 150 minutes a week of moderate activity — the CDC adult target. Brisk walking on off days counts. You do not need seven run days to meet the guideline.",
      },
      {
        question: "When can I add a fourth day?",
        answer:
          "After several weeks of three easy days that still feel easy the next morning. Add a short easy run, not a long one and a workout in the same jump.",
      },
    ],
    howTo: {
      name: "How to set a beginner running week",
      description:
        "Pick three days, protect rest, and only add a fourth when easy still feels easy.",
      steps: [
        {
          name: "Choose three non-stacked days",
          text: "Example: Monday, Wednesday, Saturday. Avoid back-to-back until you're months in.",
          url: "/start",
        },
        {
          name: "Keep every run conversational",
          text: "If you cannot talk, you are not ready for extra days — you are ready to slow down.",
          url: "/blog/easy-runs-effort-heart-rate",
        },
        {
          name: "Use off days on purpose",
          text: "Walk, easy cycle, or rest. Do not 'make up' a missed run the next morning.",
          url: "/blog/what-to-do-on-rest-days",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "The internet loves a streak. Beginner bodies love a gap. **Three run days a week** is the boring answer that keeps people running in month three instead of icing shins in week three.",
          "CDC adult guidelines target **150 minutes a week** of moderate-intensity activity — not seven jogging sessions. Walk–run intervals and brisk walks both count. Frequency is a tool; impact is the tax.",
        ],
      },
      {
        id: "why-three",
        heading: "Why three beats seven",
        list: [
          "Tendons and bone remodel slower than lungs — daily pounding arrives before they catch up",
          "Easy days stay easy when they are not squeezed between two other runs",
          "A missed day is a shrug, not a broken streak identity",
          "Strength work fits on the gaps instead of competing with a fourth jog",
        ],
      },
      {
        id: "fourth",
        heading: "Earning a fourth day",
        paragraphs: [
          "Add it only when three days feel routine, sleep is fine, and niggles are not multiplying. The fourth run should be the **shortest and slowest**, not a long run you were proud of inventing.",
        ],
        cta: { text: "Get a plan with rest built in", href: "/start" },
      },
    ],
  },
  {
    slug: "is-walking-during-a-5k-ok",
    metaTitle: "Is It OK to Walk During a 5K? Yes — Here's Why",
    title: "Is Walking During a 5K Cheating? No — and Here's How to Use It",
    excerpt:
      "Walk breaks are how most first 5Ks get finished. How to plan them on purpose, when to ignore the clock, and why 'run the whole thing' is a later goal — not a moral test.",
    category: "Racing",
    author: AUTHOR,
    publishedAt: "2027-01-09",
    readTime: "7 min",
    relatedSlugs: [
      "why-walking-is-not-cheating",
      "training-first-5k",
      "race-day-tips",
      "none-to-run-gentle-beginners",
      "how-to-pace-yourself",
    ],
    closingQuestion:
      "Did you walk your first 5K — and did anyone at the finish actually care?",
    sources: [SOURCES.physicalActivityGuidelinesUS, SOURCES.physicalActivityGuidelines],
    faq: [
      {
        question: "Will walking in a 5K get me in trouble?",
        answer:
          "No. Road 5Ks are not track meets. Stay right, don't block, and keep moving. Officials care about course rules, not your run-walk ratio.",
      },
      {
        question: "Should I walk only when I'm dying?",
        answer:
          "Better to schedule breaks from the start. Panic-walking after a too-fast first kilometer is harder than planned walk-run from the gun.",
      },
      {
        question: "When should I try to run the whole 5K?",
        answer:
          "When training already includes a continuous easy 5K that still feels conversational — not as a surprise on race day.",
      },
    ],
    howTo: {
      name: "How to use walk breaks in a first 5K",
      description:
        "Decide the pattern before the gun, start slow, and walk tall so you can jog again on purpose.",
      steps: [
        {
          name: "Decide the pattern before the start",
          text: "Example: jog 2 minutes, walk 1 minute, repeat. Write it on your hand if you need to.",
          url: "/plan/5k-8w",
        },
        {
          name: "Start slower than your ego wants",
          text: "The first kilometer should feel too easy. That's the point.",
        },
        {
          name: "Walk tall, then jog again on purpose",
          text: "Don't collapse at aid stations. Take the break, then restart the pattern.",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "A 5K is 3.1 miles. Nobody at the finish line is auditing your purity. **Walk breaks are a pacing tool**, the same way shifting gears is a cycling tool.",
          "Couch-to-5K programs exist because continuous jogging is a later skill. Finishing with a pattern you practiced is smarter than exploding at 2K and shuffling home ashamed.",
        ],
      },
      {
        id: "how",
        heading: "Make the walks boring and planned",
        list: [
          "Practice the same run-walk at least twice in training",
          "Start the pattern immediately — waiting until you 'need' it is usually too late",
          "Stay to the side so faster runners can pass",
          "Ignore anyone who treats walking as a personality flaw",
        ],
        cta: { text: "Walk-to-5K plan", href: "/plan/5k-gentle-16w" },
      },
    ],
  },
  {
    slug: "can-i-run-with-sore-legs",
    metaTitle: "Can I Run With Sore Legs? DOMS vs Injury",
    title: "Can I Run on Sore Legs? How to Tell DOMS From a Problem",
    excerpt:
      "Next-day stiffness after a new workout is common. Pain that sharpens, pinpoints, or changes your walk is not. A simple check so beginners don't rest every ache — or run through the wrong ones.",
    category: "Recovery",
    author: AUTHOR,
    publishedAt: "2027-01-12",
    readTime: "8 min",
    relatedSlugs: [
      "post-run-recovery",
      "avoiding-injuries",
      "what-to-do-on-rest-days",
      "shin-splints-running",
      "easy-runs-effort-heart-rate",
    ],
    closingQuestion:
      "What rule do you use — walk test, 48-hour fade, or something a physio told you?",
    sources: [SOURCES.delayedOnsetMuscleSoreness, SOURCES.peaceAndLove, SOURCES.shinSplints],
    faq: [
      {
        question: "Is it OK to run with DOMS?",
        answer:
          "Often yes, easier than yesterday, if walking is normal and the soreness is broad muscle stiffness that warmed up last time. Keep it short and conversational. If gait changes, stop.",
      },
      {
        question: "How long should DOMS last?",
        answer:
          "Cleveland Clinic notes delayed-onset soreness typically peaks 24–72 hours after unaccustomed work and then fades. Pain that is still climbing after that, or sitting on one bone spot, is not classic DOMS.",
      },
      {
        question: "Should I stretch hard when I'm sore?",
        answer:
          "Gentle movement beats aggressive stretching on very sore days. Walking and an easy cycle usually help more than forcing a long static stretch session.",
      },
    ],
    howTo: {
      name: "How to decide whether to run on sore legs",
      steps: [
        {
          name: "Walk five minutes first",
          text: "If walking already limps or sharpens, skip the run.",
        },
        {
          name: "Name the feeling",
          text: "Broad, two-sided muscle stiffness that eases as you warm up is usually DOMS. Pinpoint bone pain or worsening as you go is a stop.",
          url: "/injuries",
        },
        {
          name: "If you go, cut it down",
          text: "Shorter, slower, no hills. Never use a sore day to 'catch up' missed mileage.",
          url: "/tips/missed-a-week-dont-double-up",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Delayed-onset muscle soreness (DOMS)** is the stiff, two-sided, 'I did something new' feeling that shows up a day later. It is annoying. It is not automatically an injury.",
          "Injury patterns are pickier: one spot, sharper as the run continues, swelling, or a limp that rest doesn't explain. Shin-bone pinpoint pain is a different conversation than tired quads.",
          "**Educational only.** Night pain, numbness, or inability to hop on one foot needs a clinician, not a blog flowchart.",
        ],
      },
      {
        id: "rules",
        heading: "A beginner rule of thumb",
        list: [
          "Soreness that warms up and stays conversational → easy run or walk-run is reasonable",
          "Soreness that stays ugly after 10 minutes of easy jogging → walk home",
          "Pain on a bone, tendon insertion, or that alters your stride → no run; see the injury hub",
          "Never stack a long run on the back of leftover DOMS from a 'breakthrough' workout",
        ],
        cta: { text: "Injury hub — sore vs hurt", href: "/injuries" },
      },
    ],
  },
  {
    slug: "treadmill-vs-outside-beginner",
    metaTitle: "Treadmill vs Outside Running for Beginners",
    title: "Treadmill or Outside: What's Better When You're Starting?",
    excerpt:
      "Neither is morally superior. How beginners can use the treadmill for weather and control, the outdoor path for the real race, and a 1% incline trick so the belt doesn't lie about effort.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2027-01-15",
    readTime: "7 min",
    relatedSlugs: [
      "treadmill-indoor-winter-running",
      "running-in-bad-weather",
      "how-to-pace-yourself",
      "first-run-tips",
      "training-first-5k",
    ],
    closingQuestion:
      "Where did your habit actually stick — the belt, the block, or a mix?",
    sources: [SOURCES.physicalActivityGuidelinesUS, SOURCES.acsmAirQualityOutdoorExercise],
    faq: [
      {
        question: "Is treadmill running 'cheating'?",
        answer:
          "No. The belt removes some of the work of moving over ground, which is why a slight incline is often used. The fitness still counts. Outdoor skills still need outdoor practice before a road 5K.",
      },
      {
        question: "Should I set the treadmill to 1% incline?",
        answer:
          "A small incline is a common way to offset the moving belt so effort feels closer to flat outdoor running. It is a heuristic, not a law — comfort and a conversational pace matter more than copying a forum setting.",
      },
      {
        question: "Can I train for a 5K entirely indoors?",
        answer:
          "You can get fit indoors. At least a few outdoor runs help with wind, footing, and the boredom of looking at the same tree. If air quality or ice is bad, indoors wins that day.",
      },
    ],
    howTo: {
      name: "How to mix treadmill and outdoor running as a beginner",
      steps: [
        {
          name: "Default to wherever you'll actually go",
          text: "The better workout is the one that happens. Weather and safety decide more than purity.",
          url: "/tips/bad-weather",
        },
        {
          name: "Keep the same easy effort",
          text: "Talk test on the belt and the path. Don't chase a treadmill pace your outdoor legs don't own.",
          url: "/blog/easy-runs-effort-heart-rate",
        },
        {
          name: "Practice outside before race day",
          text: "If the 5K is on roads, do some training on roads so the first kilometer isn't a surprise.",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "Beginners argue treadmill vs pavement like it's a values test. It isn't. **The better run is the one you do.** The belt is a weather machine, a safety rail, and a pace teacher. The path is wind, curbs, and the event you signed up for.",
          "A moving belt slightly changes the work of running. Many coaches nudge a **small incline** so easy effort doesn't feel suspiciously cheap. Use it if it feels natural; skip it if your calves hate it.",
        ],
      },
      {
        id: "when",
        heading: "When to pick which",
        list: [
          "Treadmill: ice, heat warnings, bad AQI, dark unsafe streets, or a tightly timed lunch break",
          "Outside: learning to pace without a screen, practicing race surfaces, vitamin D and boredom insurance",
          "Both: the weekly plan still only needs three sessions — don't double up because the gym was 'extra'",
        ],
        cta: { text: "Bad-weather swaps", href: "/tips/bad-weather" },
      },
    ],
  },
  {
    slug: "how-long-to-wait-after-eating-to-run",
    metaTitle: "How Long After Eating Should You Wait to Run?",
    title: "How Long Should You Wait After Eating Before a Run?",
    excerpt:
      "A full meal usually wants 2–3 hours; a small snack can be 30–60 minutes. Why beginners get stitches and GI distress, what to eat when you run at dawn, and when to ignore the stopwatch.",
    category: "Nutrition",
    author: AUTHOR,
    publishedAt: "2027-01-18",
    readTime: "8 min",
    relatedSlugs: [
      "nutrition-basics-for-beginners",
      "side-stitch-running",
      "runners-gi-distress",
      "morning-vs-evening-running",
      "nutrition-for-runners",
    ],
    closingQuestion:
      "What pre-run snack actually sits well for you — or do you run fasted by accident?",
    sources: [SOURCES.runningNutrition, SOURCES.exerciseRelatedTransientAbdominalPain2014],
    faq: [
      {
        question: "Can I run right after breakfast?",
        answer:
          "A large breakfast usually needs a couple of hours. A small, low-fiber carb snack — banana, toast, applesauce — is often fine 30–60 minutes before an easy run. Test it on a weekday, not race morning.",
      },
      {
        question: "Is fasted running better for beginners?",
        answer:
          "Not as a rule. Easy morning jogs without food are fine for some people; others get lightheaded or stitchy. Fuel if the run is longer or you feel better with a snack. Weight-loss magic is oversold.",
      },
      {
        question: "What should I avoid right before a run?",
        answer:
          "Big high-fat, high-fiber, or spicy meals are the usual GI villains. Mayo Clinic's eating-and-exercise guidance favors easily digested carbs when time is short.",
      },
    ],
    howTo: {
      name: "How to time food before a beginner run",
      steps: [
        {
          name: "If you ate a full meal, wait about 2–3 hours",
          text: "That's the usual window for digestion before moderate exercise.",
          url: "/blog/nutrition-basics-for-beginners",
        },
        {
          name: "If you have under an hour, keep the snack small",
          text: "Low fiber, a little carb, sip water — not a burrito.",
        },
        {
          name: "Repeat what you practiced",
          text: "Race-morning food should be a copy of a training morning, not a new experiment.",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "There isn't one stopwatch number for every stomach. Mayo Clinic's eating-and-exercise guidance still gives beginners a usable map: **larger meals need more time**; **small snacks can sit closer to the start**.",
          "Side stitches and sloshy guts are often a timing problem, not a fitness problem. Slow the first ten minutes anyway — food plus a sprint is a classic stitch recipe.",
        ],
      },
      {
        id: "windows",
        heading: "Practical windows",
        list: [
          "Big meal: often 2–3 hours before a run",
          "Small snack: often 30–60 minutes (banana, toast, yogurt if it agrees with you)",
          "Dawn run with zero appetite: sip water; carry a backup snack if you bonk easily",
          "Never debut a new gel or breakfast on race day",
        ],
        cta: { text: "Beginner nutrition basics", href: "/blog/nutrition-basics-for-beginners" },
      },
    ],
  },
];
