import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Aug 23, 2026 gap-analysis batch — P1/P2/P3 topics still missing vs popular sites.
 * Scheduled every 3rd day after how-long-to-wait-after-eating-to-run (2027-01-18).
 */
export const aug23GapPosts: BlogPost[] = [
  // —— P1 ——
  {
    slug: "ankle-sprain-return-to-run",
    metaTitle: "Ankle Sprain Return to Run: PEACE & LOVE for Beginners",
    title: "Ankle Sprain Return to Run: Protect, Then Load (Not Ice Forever)",
    excerpt:
      "Modern soft-tissue guidance is PEACE & LOVE — not endless RICE. How beginners protect a twisted ankle, load it early within pain limits, rebuild balance, and decide when the first jog is earned.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2027-01-21",
    readTime: "9 min",
    relatedSlugs: [
      "avoiding-injuries",
      "return-to-run-after-illness",
      "black-toenails-runners",
      "importance-of-cross-training",
      "comeback-after-running-break",
    ],
    closingQuestion:
      "What return test did you use after a sprain — hop, balance, or a physio clearance?",
    sources: [
      SOURCES.peaceAndLove,
      SOURCES.ankleSprainMayo,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "Should I ice an ankle sprain for days?",
        answer:
          "Short ice for comfort in the first day or two is fine for some people. Modern PEACE & LOVE guidance de-emphasizes prolonged icing and anti-inflammatories as the main plan — protection, elevation, and early gentle loading matter more.",
      },
      {
        question: "When can I run after a mild sprain?",
        answer:
          "Usually after walking is normal, single-leg balance feels stable, and a gentle hop doesn't spike pain. Many Grade 1 sprains need 1–3 weeks before a walk-jog. Grade 2+ needs clinician guidance — don't copy a calendar from the internet.",
      },
      {
        question: "Why do ankles keep re-spraining?",
        answer:
          "Proprioception lags behind how 'fine' the ankle feels. Balance work for months after the sprain cuts re-injury risk more than another week of pure rest.",
      },
    ],
    howTo: {
      name: "How to return to running after an ankle sprain",
      description:
        "Protect early, load within pain limits, rebuild balance, then walk-jog flat.",
      steps: [
        {
          name: "First days: PEACE",
          text: "Protect painful moves, elevate, compress if swelling is big, avoid alcohol and unnecessary anti-inflammatories that can blunt healing — educational, not a prescription.",
        },
        {
          name: "Then LOVE: load and optimism",
          text: "Pain-free walking, ankle alphabet, and isometric holds beat total shutdown for most mild sprains.",
          url: "/injuries",
        },
        {
          name: "Earn the first jog",
          text: "Normal walk, stable single-leg stand, calm hop test — then flat walk-jog only. No trails or speed until weeks of easy pavement stay quiet.",
          url: "/tips/twisted-ankle-protect-then-load-dont-ice-forever",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** A deformed ankle, inability to bear weight, numbness, or a pop with immediate collapse needs urgent care — not a blog protocol.",
          "RICE taught a generation to ice and rest forever. Soft-tissue research shifted: **PEACE & LOVE** (BJSM) keeps early protection, then asks for **early loading** so ligaments remodel under controlled stress.",
          "Beginners re-sprain when they return to hills the week the swelling vanishes. Feeling better is not the same as balance returning.",
        ],
      },
      {
        id: "peace-love",
        heading: "PEACE first, LOVE next",
        list: [
          "PEACE: Protect, Elevate, Avoid anti-inflammatories as default, Compress, Educate",
          "LOVE: Load, Optimism, Vascularisation (easy movement), Exercise",
          "Pool walk or bike keeps fitness without twisting on trails",
          "Single-leg balance eyes-open → eyes-closed is homework, not optional fluff",
        ],
      },
      {
        id: "return",
        heading: "Return-to-run checkpoints",
        list: [
          "Walk normally for several days without limp",
          "Single-leg stand 20–30 seconds without grabbing a wall",
          "Gentle hop in place without sharp pain or swelling rebound the next day",
          "First jog: short, flat, conversational — stop if gait changes",
        ],
        cta: { text: "Injury hub — when to get help", href: "/injuries" },
      },
    ],
  },
  {
    slug: "piriformis-deep-gluteal-pain-runners",
    metaTitle: "Piriformis Pain in Runners: Deep Glute vs Sciatica Red Flags",
    title: "Piriformis and Deep Gluteal Pain: What Beginners Should Try First",
    excerpt:
      "Butt and deep-hip pain that lights up on hills or after sitting is often a load and hip-stability problem — not a destiny of endless stretching. How to ease mileage, strengthen the chain, and when butt pain is a stop-and-see signal.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2027-01-24",
    readTime: "9 min",
    relatedSlugs: [
      "it-band-syndrome-running",
      "hamstring-calf-hip-flexor-runners",
      "bodyweight-strength-for-runners",
      "avoiding-injuries",
      "importance-of-cross-training",
    ],
    closingQuestion:
      "Did hip strength or cutting hills fix your deep glute pain first?",
    sources: [
      SOURCES.piriformisCleveland,
      SOURCES.peaceAndLove,
      SOURCES.patellofemoralPain,
    ],
    faq: [
      {
        question: "Is piriformis syndrome the same as a herniated disc?",
        answer:
          "No. Piriformis and deep-glute irritation can mimic sciatica-like feelings, but true nerve-root problems from the spine need different evaluation. Numbness in a saddle pattern, progressive weakness, or bowel/bladder changes are emergency red flags.",
      },
      {
        question: "Should I stretch the piriformis hard every day?",
        answer:
          "Gentle mobility can help early. Aggressive daily stretching without fixing weak hips and sudden mileage often fails. Strength and load management usually matter more than a deeper stretch.",
      },
      {
        question: "Can I keep running through it?",
        answer:
          "Only if easy flat running stays conversational and pain does not climb mid-run. Cut hills and speed. If gait changes or sitting becomes miserable, stop running and get assessed.",
      },
    ],
    howTo: {
      name: "How to calm piriformis-type pain as a beginner",
      steps: [
        {
          name: "Cut hills and speed for 1–2 weeks",
          text: "Keep short easy flats or cross-train if even flats aggravate.",
          url: "/tips/missed-a-week-dont-double-up",
        },
        {
          name: "Build hip and single-leg strength",
          text: "Side steps, bridges, and single-leg deadlifts beat another foam-roll marathon.",
          url: "/blog/bodyweight-strength-for-runners",
        },
        {
          name: "Watch red flags",
          text: "Progressive weakness, saddle numbness, or night pain that wakes you needs a clinician, not a deeper pigeon pose.",
          url: "/injuries",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only.** Deep butt pain has many owners: tendon, muscle, referred back pain, or true nerve issues. This page is a beginner map, not a diagnosis.",
          "Cleveland Clinic describes piriformis syndrome as irritation where the piriformis can affect the nearby sciatic nerve — often with sitting, climbing, or sudden volume. In coaching reality, **weak hips + desk sitting + a mileage jump** show up more often than a mysterious cursed muscle.",
        ],
      },
      {
        id: "try",
        heading: "What usually helps first",
        list: [
          "Drop hills, track bends, and speed for a short block",
          "Shorten stride slightly; avoid overstriding downhill",
          "Hip abductor and glute work 2–3× weekly",
          "Stand breaks if you sit all day — the piriformis hates eight hours of chair",
          "Don't chase 'release' videos that leave you sorer for three days",
        ],
        cta: { text: "Strength without junk miles", href: "/tips/strength-twice-a-week-beats-more-junk-miles" },
      },
    ],
  },
  {
    slug: "race-fueling-gels-carb-load-beginners",
    metaTitle: "Race Fueling for Beginners: Gels, Chews & First Carb-Load",
    title: "Gels, Chews, and Your First Carb-Load: Practice Before Race Day",
    excerpt:
      "Most first half and marathon guts fail because race day was the first gel experiment. How much carbohydrate beginners actually need, how to practice fueling on long runs, and a simple carb-load that isn't a pasta penalty.",
    category: "Nutrition",
    author: AUTHOR,
    publishedAt: "2027-01-27",
    readTime: "10 min",
    relatedSlugs: [
      "nutrition-for-training-by-run-type",
      "hitting-the-wall-marathon",
      "runners-gi-distress",
      "hydration-electrolytes-running",
      "how-long-to-wait-after-eating-to-run",
      "race-day-tips",
    ],
    closingQuestion:
      "What gel or chew actually sat well for you — or did you learn the hard way on race day?",
    sources: [
      SOURCES.carbsTrainingCompetitionBurke2011,
      SOURCES.nutritionAthleticPerformanceACSM2016,
      SOURCES.runningNutrition,
      SOURCES.marathonWallRapoport2010,
    ],
    faq: [
      {
        question: "Do I need gels for a 5K?",
        answer:
          "Usually no. A normal meal earlier and water are enough for most beginners. Practice fueling when runs stretch toward 75–90+ minutes or you're training for a half or longer.",
      },
      {
        question: "How many carbs per hour on long runs?",
        answer:
          "Sports nutrition position stands often target roughly 30–60 g of carbohydrate per hour for prolonged efforts, sometimes more for trained guts. Start low, practice, and never debut a new product on race morning.",
      },
      {
        question: "What is a beginner carb-load?",
        answer:
          "For events ~90+ minutes, shifting toward easier carbs for 1–3 days before the race while slightly tapering miles — not stuffing yourself until you feel sick. Mayo-style eating-and-exercise guidance still favors foods you already tolerate.",
      },
    ],
    howTo: {
      name: "How to practice race fueling before race day",
      steps: [
        {
          name: "Pick one product and stick to it",
          text: "One gel or chew brand for training. Same flavor you will race with.",
        },
        {
          name: "Use it on long runs",
          text: "Start early (often by 45–60 minutes), sip water, and note gut comfort.",
          url: "/tips/practice-the-gel-on-a-long-run-never-race-day",
        },
        {
          name: "Carb-load simply in the last days",
          text: "Familiar pasta, rice, bread, fruit — not a buffet of new spicy foods.",
          url: "/blog/hitting-the-wall-marathon",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "The wall is partly math: glycogen is finite. Rapoport's modeling and decades of sports nutrition agree that **carbohydrate availability** decides late-race fate for longer events.",
          "Beginners skip the boring part — **practice**. Race day becomes the first time a gel hits a nervous stomach at mile 10. That is a gut experiment, not a fueling plan.",
        ],
      },
      {
        id: "practice",
        heading: "Practice rules that prevent bathroom drama",
        list: [
          "Never debut a gel, chew, or drink on race morning",
          "Start fueling before you feel empty — waiting until bonk is late",
          "Pair carbs with water; sticky gels without fluid are a common stitch recipe",
          "If your stomach hates gels, try chews or diluted sports drink in training",
          "5K and short 10Ks rarely need mid-race carbs — don't overcomplicate",
        ],
        cta: { text: "Nutrition by run type", href: "/blog/nutrition-for-training-by-run-type" },
      },
    ],
  },
  // —— P2 ——
  {
    slug: "orthotics-when-runners-need-them",
    metaTitle: "Running Orthotics: When Inserts Help vs When to See a Podiatrist",
    title: "Orthotics for Runners: DIY Inserts vs When You Need a Pro",
    excerpt:
      "Shoe inserts are not magic. When a simple OTC insert is a fair trial, when custom orthotics make sense, and when pain means you need a clinician — not another Amazon insole.",
    category: "Gear",
    author: AUTHOR,
    publishedAt: "2027-01-30",
    readTime: "8 min",
    relatedSlugs: [
      "choosing-running-shoes",
      "plantar-fasciitis-running",
      "mortons-neuroma-running",
      "runners-knee-running",
      "beginner-gear-guide-under-50",
    ],
    closingQuestion: "Did an insert help, or did a shoe change fix it first?",
    sources: [
      SOURCES.plantarFasciitis,
      SOURCES.mortonsNeuroma,
      SOURCES.patellofemoralPain,
    ],
    faq: [
      {
        question: "Should every beginner buy orthotics?",
        answer:
          "No. Start with well-fitted running shoes. Orthotics are a tool for a specific problem — not a required upgrade.",
      },
      {
        question: "Are drugstore inserts useless?",
        answer:
          "A simple cushioned or arch-support insert can be a reasonable short trial for mild plantar or fatigue complaints. Persistent pinpoint pain still needs assessment.",
      },
      {
        question: "When do I need custom orthotics?",
        answer:
          "Often after a clinician finds a clear mechanical issue, prior injury pattern, or when OTC options fail. Custom devices are not a personality upgrade.",
      },
    ],
    howTo: {
      name: "How to decide on running orthotics",
      steps: [
        {
          name: "Fit the shoe first",
          text: "Wrong size or dead foam fools people into buying inserts.",
          url: "/blog/choosing-running-shoes",
        },
        {
          name: "Trial a simple insert if symptoms are mild",
          text: "2–3 weeks on easy miles. Stop if pain sharpens.",
        },
        {
          name: "See a podiatrist or sports physio if it persists",
          text: "Especially for neuroma-type burning, stress-injury worry, or one-sided bone pain.",
          url: "/injuries",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "Inserts rearrange load. They do not forgive a 40% mileage jump. Beginners often buy orthotics because an ad promised knee salvation — then keep training like the insert erased physics.",
          "Start with **shoes that fit**, then treat inserts as an experiment with an exit plan.",
        ],
      },
      {
        id: "when",
        heading: "Fair reasons to try support",
        list: [
          "Mild plantar morning pain after a shoe check",
          "Fatigue ache on hard pavement in a thin trainer",
          "Clinician-recommended temporary offloading while rehabbing",
          "Not: 'I pronate so I must buy motion control and custom plates on day one'",
        ],
        cta: { text: "Shoe fit guide", href: "/blog/choosing-running-shoes" },
      },
    ],
  },
  {
    slug: "metatarsalgia-running",
    metaTitle: "Metatarsalgia in Runners: Ball-of-Foot Pain Explained",
    title: "Metatarsalgia: Ball-of-Foot Pain That Isn't Always Morton's Neuroma",
    excerpt:
      "Burning or bruise-like pain under the ball of the foot has several owners. How beginners separate overload metatarsalgia from neuroma patterns, what load changes help, and when to get imaging advice.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2027-02-02",
    readTime: "8 min",
    relatedSlugs: [
      "mortons-neuroma-running",
      "plantar-fasciitis-running",
      "black-toenails-runners",
      "choosing-running-shoes",
      "stress-fracture-running",
    ],
    closingQuestion: "Was it shoes, speedwork, or a sudden long run that lit up the ball of your foot?",
    sources: [SOURCES.mortonsNeuroma, SOURCES.plantarFasciitis, SOURCES.peaceAndLove],
    faq: [
      {
        question: "Is metatarsalgia the same as Morton's neuroma?",
        answer:
          "Not always. Neuroma often feels like a pebble with electric toes. Metatarsalgia is broader forefoot overload pain. Both hate narrow toe boxes and sudden speed.",
      },
      {
        question: "Can I run through ball-of-foot pain?",
        answer:
          "Not if it sharpens mid-run or changes your gait. Cut intensity, widen the toe box, and get checked if pain is pinpoint on bone or night pain appears.",
      },
    ],
    howTo: {
      name: "How to ease beginner metatarsalgia",
      steps: [
        {
          name: "Check the toe box",
          text: "Narrow race shoes and taped toes on downhills are common triggers.",
          url: "/blog/choosing-running-shoes",
        },
        {
          name: "Drop speed and hills briefly",
          text: "Easy flats only until walking is calm.",
        },
        {
          name: "Rule out stress injury patterns",
          text: "Pinpoint bone pain or night pain → clinician, not another metatarsal pad guess.",
          url: "/blog/stress-fracture-running",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only.** Forefoot pain can be soft tissue, nerve, or bone. Persistent one-spot pain deserves a professional exam.",
          "Metatarsalgia is the umbrella word for pain under the metatarsal heads — the 'ball' that takes landing force. Speedwork, stiff plates, and shoes that pinch toes stack the odds.",
        ],
      },
      {
        id: "fixes",
        heading: "First fixes that are usually sane",
        list: [
          "Wider toe box; skip the carbon racer until pain is history",
          "Shorter easy runs; no downhill repeats for a bit",
          "Metatarsal pad only if a clinician or fitter shows you placement",
          "Compare notes with [Morton's neuroma](/blog/mortons-neuroma-running) if toes buzz",
        ],
        cta: { text: "Morton's neuroma guide", href: "/blog/mortons-neuroma-running" },
      },
    ],
  },
  {
    slug: "tempo-vs-intervals-vs-fartlek-beginners",
    metaTitle: "Tempo vs Intervals vs Fartlek: Beginner Chooser Guide",
    title: "Tempo, Intervals, or Fartlek? Pick One Hard Session — Not All Three",
    excerpt:
      "Beginners collect workout names like trading cards. One plain map: what tempo, intervals, and fartlek actually are, which to try after your first 5K, and why stacking them in the same week is how niggles start.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2027-02-05",
    readTime: "8 min",
    relatedSlugs: [
      "speedwork-after-5k-beginners",
      "run-workouts-hills-intervals-fartlek-track",
      "easy-runs-effort-heart-rate",
      "earn-hard-runs-by-running-easy",
      "periodization-beginners-base-build-peak-taper",
    ],
    closingQuestion: "Which hard session actually stuck for you — tempo, repeats, or playful fartlek?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.physicalActivityGuidelines,
    ],
    faq: [
      {
        question: "What should I try first after a 5K?",
        answer:
          "Usually a short fartlek or gentle strides inside an easy run — not a full tempo and a track session in one week. Earn hard work with easy volume first.",
      },
      {
        question: "Is tempo the same as threshold?",
        answer:
          "Close enough for beginners: a sustained 'comfortably hard' effort you could hold with focus, not a sprint. If you can't speak a few words, it's too hot.",
      },
    ],
    howTo: {
      name: "How to choose your first hard session type",
      steps: [
        {
          name: "Keep 80% of runs easy",
          text: "Talk test. Hard sessions fail when easy days aren't easy.",
          url: "/blog/easy-runs-effort-heart-rate",
        },
        {
          name: "Pick one flavor per week",
          text: "Fartlek for play, short intervals for speed practice, or a short tempo block — not all three.",
          url: "/blog/speedwork-after-5k-beginners",
        },
        {
          name: "Stop if form collapses",
          text: "Sloppy reps train sloppy tissue. Cut the session and walk it in.",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Tempo:** sustained hard-but-controlled. **Intervals:** work / rest repeats. **Fartlek:** playful speed changes inside a run. Same family — different stress shapes.",
          "Beginners get hurt collecting all three before easy miles feel boring. One hard day. Recover. Repeat.",
        ],
      },
      {
        id: "chooser",
        heading: "Quick chooser",
        list: [
          "New to speed → fartlek or strides",
          "Want race-pace practice → short tempo segments",
          "Want to learn recovery between efforts → simple intervals (e.g. 1 min hard / 2 min easy)",
          "Sore, sick, or sleep-deprived → zero hard sessions that week",
        ],
        cta: { text: "Speedwork after your first 5K", href: "/blog/speedwork-after-5k-beginners" },
      },
    ],
  },
  {
    slug: "first-parkrun-community-5k",
    metaTitle: "First Parkrun Guide: Free Community 5K for Beginners",
    title: "Your First Parkrun: A Free 5K Dress Rehearsal (Walk-Run Welcome)",
    excerpt:
      "Parkrun is a free, timed community 5K — not a championship. How to register, what to expect, why it's perfect practice before a paid race, and how walk-run still counts.",
    category: "Racing",
    author: AUTHOR,
    publishedAt: "2027-02-08",
    readTime: "7 min",
    relatedSlugs: [
      "finding-running-community",
      "is-walking-during-a-5k-ok",
      "first-race-signup-logistics",
      "race-day-tips",
      "training-first-5k",
    ],
    closingQuestion: "Was your first Parkrun a race, a social loop, or both?",
    sources: [SOURCES.physicalActivityGuidelinesUS],
    faq: [
      {
        question: "Do I have to run the whole Parkrun?",
        answer:
          "No. Walk-run is normal. Treat it as a dress rehearsal for pacing and crowds, not a purity test.",
      },
      {
        question: "Is Parkrun a race?",
        answer:
          "It's timed and community-run, but the culture is inclusive. Check your local event's guidance, register beforehand where required, and thank the volunteers.",
      },
    ],
    howTo: {
      name: "How to do your first Parkrun",
      steps: [
        {
          name: "Register and bring your barcode",
          text: "Most events need pre-registration. Screenshot or print what they ask for.",
        },
        {
          name: "Start easy at the back",
          text: "Let faster people go. Your goal is finish feeling like next Saturday is possible.",
          url: "/tips/parkrun-is-free-treat-it-like-a-dress-rehearsal",
        },
        {
          name: "Use it as practice",
          text: "Try race shoes only if you've trained in them. Practice fueling only if you'll need it later.",
          url: "/blog/finding-running-community",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "Paid 5Ks are great. **Parkrun** (where available) removes the entry-fee anxiety and gives weekly community structure — barcodes, volunteers, and a course you can learn.",
          "Beginners should treat it like a **dress rehearsal**: start line nerves, other humans, a clock that doesn't define your worth.",
        ],
      },
      {
        id: "expect",
        heading: "What to expect",
        list: [
          "Arrive early; first-timers often need a briefing",
          "Start toward the back if you're walk-running",
          "Thank volunteers — they make the free event possible",
          "Don't debut brand-new shoes or a huge breakfast experiment",
        ],
        cta: { text: "Find running people", href: "/blog/finding-running-community" },
      },
    ],
  },
  {
    slug: "dns-dnf-stopping-a-race",
    metaTitle: "DNS and DNF: Stopping a Race Without Shame",
    title: "DNS, DNF, and Stopping Mid-Race: When Quitting Is the Smart Call",
    excerpt:
      "Did not start and did not finish are not moral failures. How to decide before the gun, when to step off the course, and how to rebuild confidence without revenge mileage.",
    category: "Mindset",
    author: AUTHOR,
    publishedAt: "2027-02-11",
    readTime: "8 min",
    relatedSlugs: [
      "race-anxiety-nerves",
      "running-burnout-overtraining-mental-health",
      "race-day-tips",
      "return-to-run-after-illness",
      "avoiding-injuries",
    ],
    closingQuestion: "Have you DNS'd or DNF'd — and what did you learn for the next start line?",
    sources: [SOURCES.physicalActivityGuidelinesUS, SOURCES.peaceAndLove],
    faq: [
      {
        question: "Is a DNF quitting?",
        answer:
          "It's ending an event early. Sometimes that's wisdom (injury, heat, illness). Sometimes it's a pacing mistake you learn from. It is not a character judgment.",
      },
      {
        question: "When should I DNS?",
        answer:
          "Fever, chest symptoms, acute injury that changes gait, or heat illness risk your clinician would call unsafe. Entry fees are cheaper than months off.",
      },
    ],
    howTo: {
      name: "How to decide whether to start or stop",
      steps: [
        {
          name: "Night-before honesty",
          text: "Fever, chest pain, or a limp that is already there → DNS and re-enter later.",
          url: "/blog/return-to-run-after-illness",
        },
        {
          name: "On course: three strikes",
          text: "Form collapse, pain that sharpens, or heat/dizziness that doesn't clear with a walk → step off and get help.",
        },
        {
          name: "Afterward: no revenge week",
          text: "Resume the next easy session as written. Don't stack 'make-up' intensity.",
          url: "/tips/missed-a-week-dont-double-up",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**DNS** = did not start. **DNF** = did not finish. Social media turns both into shame. Sports medicine turns both into **risk management**.",
          "Finishing injured so you can post a medal is how beginners earn stress fractures and months of bitterness.",
        ],
      },
      {
        id: "rebuild",
        heading: "After a DNS/DNF",
        list: [
          "Write one sentence: body reason vs pacing reason",
          "Take the rest your body asked for",
          "Pick a smaller rehearsal (Parkrun, time trial) before the next A-race",
          "Talk to someone if the shame spiral is bigger than the event — burnout posts exist for a reason",
        ],
        cta: { text: "Race-day nerves guide", href: "/blog/race-anxiety-nerves" },
      },
    ],
  },
  {
    slug: "road-to-trail-first-trail-5k",
    metaTitle: "First Trail 5K: Road Runner's Transition Guide",
    title: "Road to Trail: How to Run Your First Trail 5K Without Twisting Everything",
    excerpt:
      "Trail running isn't 'road but prettier.' Slower pace, shorter strides, and different shoes. How road beginners pick a first trail 5K, manage expectations, and stay upright.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2027-02-14",
    readTime: "8 min",
    relatedSlugs: [
      "trail-ultra-intro-beginners",
      "runner-etiquette-trails-roads-track",
      "night-running-safety",
      "ankle-sprain-return-to-run",
      "how-to-not-hate-hills",
    ],
    closingQuestion: "What surprised you most on your first trail — pace, rocks, or how quiet it felt?",
    sources: [SOURCES.physicalActivityGuidelinesUS, SOURCES.ankleSprainMayo],
    faq: [
      {
        question: "Do I need trail shoes for a first easy trail?",
        answer:
          "Grippy trail shoes help on mud and rock. For a dry fire road, road shoes can work once — but wet roots forgive less. Err toward trail rubber if the course is technical.",
      },
      {
        question: "Why is my trail pace so slow?",
        answer:
          "Because the ground is uneven. Effort matters more than GPS pace. Walk the steep bits without apology.",
      },
    ],
    howTo: {
      name: "How to attempt your first trail 5K",
      steps: [
        {
          name: "Pick a forgiving course",
          text: "Fire roads or 'beginner' loops beat mountain races with scrambling.",
        },
        {
          name: "Shorten the stride",
          text: "Quick feet, eyes ahead, hike the steep climbs.",
          url: "/tips/downhill-shorten-stride-dont-brake",
        },
        {
          name: "Carry more than ego",
          text: "Water, phone, and a simple plan to turn around if weather turns.",
          url: "/blog/night-running-safety",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "You already have [trail ultra intro](/blog/trail-ultra-intro-beginners) for longer ambitions. This post is the **first trail 5K**: still a beginner distance, new surface skills.",
          "Expect to hike. Expect the watch to lie. Expect ankles to work harder — which is why sprains belong in your prevention brain before race day.",
        ],
      },
      {
        id: "skills",
        heading: "Skills to practice on easy dirt first",
        list: [
          "Look 3–5 meters ahead, not at your toes",
          "Power-hike climbs you'd force on road",
          "Keep cadence quick on technical bits",
          "Yield politely; trails are shared",
        ],
        cta: { text: "Trail & road etiquette", href: "/blog/runner-etiquette-trails-roads-track" },
      },
    ],
  },
  // —— P3 ——
  {
    slug: "pilates-for-runners",
    metaTitle: "Pilates for Runners: Myths and a 15-Minute Starter",
    title: "Pilates for Runners: Useful Core Work — Not a Magic Injury Shield",
    excerpt:
      "Pilates can build control and calm between easy days. What it does and doesn't replace, myths to ignore, and a simple 15-minute beginner sequence that won't trash tomorrow's run.",
    category: "Recovery",
    author: AUTHOR,
    publishedAt: "2027-02-17",
    readTime: "7 min",
    relatedSlugs: [
      "yoga-between-runs",
      "bodyweight-strength-for-runners",
      "foam-rolling-mobility-runners",
      "what-to-do-on-rest-days",
      "avoiding-injuries",
    ],
    closingQuestion: "Do you use Pilates as recovery, strength, or mostly for calm?",
    sources: [SOURCES.physicalActivityGuidelinesUS, SOURCES.acsmPhysicalActivityBoneHealth2004],
    faq: [
      {
        question: "Can Pilates replace strength training?",
        answer:
          "Not fully. Runners still benefit from loading hips, calves, and single-leg patterns. Pilates is a useful complement for control and trunk endurance.",
      },
      {
        question: "Will Pilates fix my injuries?",
        answer:
          "It can help capacity and awareness. It does not erase overload from too many hard days. Pair it with sane mileage.",
      },
    ],
    howTo: {
      name: "How to add beginner Pilates between runs",
      steps: [
        {
          name: "Keep sessions short",
          text: "10–20 minutes on easy or rest days — not after a hard workout until you're used to it.",
        },
        {
          name: "Focus on control, not sweat",
          text: "Breathing and slow reps beat bouncing through a class exhausted.",
          url: "/blog/yoga-between-runs",
        },
        {
          name: "Still lift or do runner strength twice weekly",
          text: "Pilates complements; it doesn't replace hip and calf loading.",
          url: "/tips/strength-twice-a-week-beats-more-junk-miles",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "Yoga already has a home on this site. **Pilates** earns its own page because beginners hear it sold as the cure for every IT band. It isn't. It is excellent for **controlled core and hip awareness** when you keep ego out of the studio.",
        ],
      },
      {
        id: "starter",
        heading: "15-minute starter themes",
        list: [
          "Breath + pelvic neutral awareness",
          "Glute bridge variations, slow",
          "Side-lying hip work (clams / lifts)",
          "Dead bug or bird-dog for trunk control",
          "Skip advanced reformer stunts until a teacher coaches you",
        ],
        cta: { text: "Yoga between runs", href: "/blog/yoga-between-runs" },
      },
    ],
  },
  {
    slug: "compression-socks-runners",
    metaTitle: "Compression Socks for Runners: When They Help",
    title: "Compression Socks: Recovery Tool, Not a Free Speed Upgrade",
    excerpt:
      "Compression can feel good for travel and post-run swelling. What the evidence roughly supports, what it doesn't, and how beginners should buy without falling for race-day magic claims.",
    category: "Gear",
    author: AUTHOR,
    publishedAt: "2027-02-20",
    readTime: "7 min",
    relatedSlugs: [
      "post-run-recovery",
      "vacation-travel-training-runners",
      "beginner-gear-guide-under-50",
      "choosing-running-shoes",
      "shin-splints-running",
    ],
    closingQuestion: "Do you wear compression during runs, after, or only on flights?",
    sources: [SOURCES.runningNutrition, SOURCES.physicalActivityGuidelinesUS],
    faq: [
      {
        question: "Do compression socks make me faster?",
        answer:
          "Don't count on it. Any performance effect is small and inconsistent for recreational runners. Comfort and perceived recovery are the honest reasons to try them.",
      },
      {
        question: "Can they fix shin splints?",
        answer:
          "No. Shin pain needs load management and strength. Compression might feel supportive; it is not a treatment plan.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Buy compression for **comfort on flights**, **post-long-run legs**, or **personal preference** — not because an ad promised a PR.",
          "If you have vascular disease, clotting history, or numbness, ask a clinician before tight garments. Educational only.",
        ],
      },
      {
        id: "buy",
        heading: "Buying without regret",
        list: [
          "Correct size chart — too tight is not 'more recovery'",
          "Try after easy runs before racing in them",
          "Don't skip shoes, sleep, and easy days because socks exist",
        ],
        cta: { text: "Post-run recovery basics", href: "/blog/post-run-recovery" },
      },
    ],
  },
  {
    slug: "hip-bursitis-gluteal-tendinopathy-runners",
    metaTitle: "Hip Bursitis & Gluteal Tendinopathy for Runners",
    title: "Outer-Hip Pain: Bursitis vs Gluteal Tendinopathy for Beginners",
    excerpt:
      "Side-hip pain that hates sleeping on that side or climbing stairs is often tendon load — sometimes labeled bursitis. How to ease irritation, what strength helps, and when to get imaging advice.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2027-02-23",
    readTime: "9 min",
    relatedSlugs: [
      "piriformis-deep-gluteal-pain-runners",
      "it-band-syndrome-running",
      "runners-knee-running",
      "bodyweight-strength-for-runners",
      "avoiding-injuries",
    ],
    closingQuestion: "Did side-hip pain show up more from sitting, hills, or speedwork?",
    sources: [
      SOURCES.trochantericBursitisMayo,
      SOURCES.peaceAndLove,
      SOURCES.patellofemoralPain,
    ],
    faq: [
      {
        question: "Is it always bursitis?",
        answer:
          "Often the tendon where glute medius inserts is the main player; 'bursitis' gets used loosely. A clinician can sort tendon vs other causes.",
      },
      {
        question: "Should I stretch the IT band aggressively?",
        answer:
          "Usually no. Outer-hip issues often need load management and glute medius strength more than aggressive band stretches.",
      },
    ],
    howTo: {
      name: "How to calm outer-hip pain as a beginner",
      steps: [
        {
          name: "Reduce hills and cambered roads",
          text: "Flat easy surfaces while irritability settles.",
        },
        {
          name: "Start gentle glute medius work",
          text: "Side steps and sidelying lifts in a pain-free range.",
          url: "/blog/bodyweight-strength-for-runners",
        },
        {
          name: "Sleep smarter",
          text: "Pillow between knees; avoid always sleeping hard on the angry side.",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only.** Night pain, fever, or inability to walk needs care. Mayo's bursitis pages describe inflammation of bursae; runners often have overlapping **gluteal tendinopathy** patterns.",
          "Stretching the side of the hip into oblivion is a popular mistake. Controlled loading usually wins.",
        ],
      },
      {
        id: "flags",
        heading: "See someone sooner if…",
        list: [
          "Pain shoots with back symptoms or progressive weakness",
          "Trauma, redness, warmth, or fever",
          "No improvement after 2–3 weeks of load cuts and gentle strength",
        ],
        cta: { text: "IT band deep dive", href: "/blog/it-band-syndrome-running" },
      },
    ],
  },
  {
    slug: "creatine-protein-masters-runners",
    metaTitle: "Creatine & Protein for Masters Beginner Runners",
    title: "Creatine and Protein Timing for Masters Beginners (Educational)",
    excerpt:
      "Masters runners lose muscle faster when under-fueled. What NIH-level creatine summaries actually say, how protein supports training, and what this is not — a supplement sales pitch.",
    category: "Nutrition",
    author: AUTHOR,
    publishedAt: "2027-02-26",
    readTime: "8 min",
    relatedSlugs: [
      "running-over-50-beginners",
      "bone-health-masters-runners",
      "nutrition-basics-for-beginners",
      "weight-training-bone-structure-runners",
      "advanced-strength-training-for-runners",
    ],
    closingQuestion: "Have you tried creatine as a masters runner — or do you prefer food-first?",
    sources: [
      SOURCES.creatineNIH,
      SOURCES.nutritionAthleticPerformanceACSM2016,
      SOURCES.runningNutrition,
    ],
    faq: [
      {
        question: "Is creatine safe for older beginners?",
        answer:
          "NIH ODS summarizes creatine as well-studied for many healthy adults at common doses, with caveats for kidney disease and medication interactions. Ask your clinician if you have kidney issues or take relevant meds — this is not clearance.",
      },
      {
        question: "Will creatine make me bulky for running?",
        answer:
          "Unlikely at standard doses. Some water weight in muscle is common early. It does not replace easy miles or strength work.",
      },
      {
        question: "How much protein do masters runners need?",
        answer:
          "Athletes often benefit from higher protein than sedentary guidelines, spread across meals. Exact targets vary — food first, then discuss supplements with a professional if appetite is low.",
      },
    ],
    howTo: {
      name: "How to approach creatine and protein as a masters beginner",
      steps: [
        {
          name: "Fix food and strength first",
          text: "Protein at meals + twice-weekly strength beats powder without a plan.",
          url: "/blog/weight-training-bone-structure-runners",
        },
        {
          name: "Ask a clinician if you have kidney or medication concerns",
          text: "Then consider creatine only as an optional add-on.",
          url: "https://ods.od.nih.gov/factsheets/Creatine-HealthProfessional/",
        },
        {
          name: "Track how you feel for a few weeks",
          text: "Drop it if bloating, cramps, or anxiety about supplements isn't worth it.",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical or dietetic advice.** Supplements are optional. Food, sleep, and progressive strength remain the base for masters beginners.",
          "NIH's creatine fact sheet is the sober reference: researched, not mystical. Pair curiosity with a clinician if you have kidney disease or complex meds.",
        ],
      },
      {
        id: "food-first",
        heading: "Food-first checklist",
        list: [
          "Protein source at each meal",
          "Strength 2× weekly for muscle and bone",
          "Creatine only after the basics are boringly consistent",
          "Ignore 'dirty bulk for runners' social media",
        ],
        cta: { text: "Running after 50", href: "/blog/running-over-50-beginners" },
      },
    ],
  },
];
