import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Remaining "Missing on LetsRunNow vs popular sites" content gaps
 * from the Jul 2026 competitive analysis (product items excluded).
 * Scheduled weekly after training-lungs-for-running (2027-06-21).
 */
export const competitiveGapPosts: BlogPost[] = [
  {
    slug: "altitude-travel-race-running",
    metaTitle: "Running Destination Races at Altitude: Acclimation & Travel Tips",
    title:
      "Altitude & Travel Races: How to Race Away From Home Without Blowing Up",
    excerpt:
      "Flying into a mountain 5K or destination half? How altitude changes effort, what the first 48 hours should look like, travel logistics for race weekend, and when symptoms mean descend — not dig in.",
    category: "Racing",
    author: AUTHOR,
    publishedAt: "2026-08-22",
    readTime: "12 min",
    relatedSlugs: [
      "first-race-signup-logistics",
      "race-day-tips",
      "race-taper-guide",
      "hydration-electrolytes-running",
      "easy-runs-effort-heart-rate",
      "hot-weather-running-hub",
      "how-to-pace-yourself",
    ],
    closingQuestion:
      "Have you raced at altitude or just vacation-jogged — what surprised you most about how hard the air felt?",
    sources: [
      SOURCES.altitudeSicknessCleveland,
      SOURCES.cdcHighAltitudeTravel,
      SOURCES.mayoTravelHealth,
      SOURCES.heartRateZones,
      SOURCES.heatSafety,
      SOURCES.preParticipationScreening,
    ],
    faq: [
      {
        question: "At what elevation does altitude start affecting runners?",
        answer:
          "Many people notice harder breathing and slower paces above roughly 5,000–8,000 ft (1,500–2,400 m), with altitude illness risk rising more above ~8,000 ft. Sensitivity varies — don't judge yourself by a training partner from Denver.",
      },
      {
        question: "Should I race hard the day I land at altitude?",
        answer:
          "Usually no. Cleveland Clinic and travel-medicine guidance emphasize slow ascent and limiting intense exercise early. For destination races, arrive early when you can, keep the first 24–48 hours easy, and race by effort — not sea-level pace.",
      },
      {
        question: "What are altitude sickness red flags?",
        answer:
          "Headache plus nausea, unusual fatigue, dizziness, or poor sleep after gaining altitude can signal acute mountain sickness. Worsening confusion, inability to walk straight, or severe breathlessness at rest need urgent descent and care — never 'run through' those.",
      },
      {
        question: "Do I need special altitude training before a mountain race?",
        answer:
          "Most recreational destination runners don't need a hypoxic tent. Arrive early if possible, sleep enough, stay hydrated (without overdrinking), and dial expectations. Serious high-altitude mountaineering is a different sport.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Destination races sell the photo. Altitude sells the reality check: the same pace suddenly costs more oxygen, the watch screams, and your ego wants a PR that the air won't fund.",
          "This guide covers **travel + altitude** for recreational runners — city races at moderate elevation, mountain destination 5Ks/halfs, and vacation jogs that shouldn't ruin the trip. Pair with [first-race logistics](/blog/first-race-signup-logistics) and [race-day tips](/blog/race-day-tips).",
          "**Educational only — not medical advice.** Heart or lung disease, prior severe altitude illness, pregnancy, or concerning symptoms need a clinician before high-altitude travel.",
        ],
      },
      {
        id: "what-changes",
        heading: "What altitude actually changes",
        list: [
          "Less available oxygen → higher heart rate and breathing at the same pace",
          "Pace targets from sea level usually need to slow down — run by [talk test / effort](/blog/easy-runs-effort-heart-rate)",
          "Sleep can worsen the first nights; fatigue stacks fast",
          "Dehydration risk rises (dry air, more ventilation) — sip, don't chug liters for sport",
          "Max performance stays reduced vs sea level even after partial acclimation",
        ],
      },
      {
        id: "illness",
        heading: "Altitude illness in plain English",
        paragraphs: [
          "Altitude sickness happens when you go up faster than your body can adjust ([Cleveland Clinic overview](https://my.clevelandclinic.org/health/diseases/15111-altitude-sickness)). CDC travel guidance stresses gradual ascent, mild activity early, and treating descent as medicine when symptoms worsen ([Yellow Book](https://wwwnc.cdc.gov/travel/yellowbook/2024/environmental-hazards-risks/high-altitude-travel-and-altitude-illness)).",
        ],
        list: [
          "Common early: headache, nausea, poor sleep, unusual tiredness",
          "Do not ascend further with clear AMS symptoms",
          "Severe: confusion, inability to walk normally, extreme breathlessness at rest — emergency / descend",
          "Mayo travel tips also flag avoiding alcohol and prolonged hard exercise for ~two days after jumping to higher altitudes",
        ],
      },
      {
        id: "playbook",
        heading: "Destination-race playbook",
        subsections: [
          {
            heading: "Timing",
            paragraphs: [
              "Ideal: arrive 2–5+ days early for races above ~5,000–7,000 ft when your schedule and budget allow. Minimum: land, sleep, easy shakeout — don't stack airport chaos + hard shakeout + race next dawn.",
            ],
          },
          {
            heading: "First 48 hours",
            list: [
              "Walk, short easy jog, or skip — no hero intervals",
              "Skip the celebratory alcohol binge and epic hike double",
              "Hydrate with meals; keep electrolytes available in dry heat",
              "Nap if sleep collapses — race day needs a brain",
            ],
          },
          {
            heading: "Race-day pacing",
            paragraphs: [
              "Scrap sea-level goal pace. Start slower than pride allows. Hills hurt more; walk breaks are strategy ([walking isn't cheating](/blog/why-walking-is-not-cheating)). Heat + altitude is a double tax — see [hot weather hub](/blog/hot-weather-running-hub).",
            ],
          },
          {
            heading: "Travel logistics (non-altitude)",
            list: [
              "Shoes in carry-on; pin pickup plan; packet day buffer",
              "Know packet location vs Airbnb distance",
              "Practice [race taper](/blog/race-taper-guide) — new cities aren't for secret long runs",
              "Timezone: shift sleep a few days early if crossing multiple zones",
            ],
          },
        ],
        cta: { text: "Browse free race-ready plans", href: "/plan" },
      },
      {
        id: "vacation",
        heading: "Vacation jogs without wrecking the week",
        paragraphs: [
          "Want one run for the Instagram overlook? Keep it short and conversational. Save the epic ridge for hiking if you've just arrived. Destination FOMO is how people turn a fun trip into a clinic visit.",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Altitude isn't a character test. Arrive when you can, keep the first days gentle, race by feel, and treat worsening altitude symptoms as a descent emergency — not a toughness opportunity.",
        ],
      },
    ],
  },
  {
    slug: "foam-rolling-mobility-runners",
    metaTitle: "Foam Rolling & Mobility for Runners: What's Worth It",
    title:
      "Foam Rolling & Mobility for Runners: Reality Check (Not a 40-Minute Circus)",
    excerpt:
      "What foam rolling can and can't do, why static stretching cold muscles is overrated before easy runs, a short mobility menu that actually fits a beginner week, and when 'tight' needs strength — not more rolling.",
    category: "Recovery",
    author: AUTHOR,
    publishedAt: "2026-08-30",
    readTime: "11 min",
    relatedSlugs: [
      "warm-up-cool-down-running",
      "post-run-recovery",
      "bodyweight-strength-for-runners",
      "avoiding-injuries",
      "shin-splints-running",
      "runners-knee-running",
      "what-to-do-on-rest-days",
    ],
    closingQuestion:
      "Are you a foam-roll every night person — or do you only remember the roller when something hurts?",
    sources: [
      SOURCES.stretchingMayo,
      SOURCES.foamRollingBehm2015,
      SOURCES.strengthForRunners,
      SOURCES.peaceAndLove,
      SOURCES.acsmExercisePrescription2009,
    ],
    faq: [
      {
        question: "Does foam rolling prevent running injuries?",
        answer:
          "Evidence is mixed and modest. Rolling may temporarily increase comfort and range of motion for some people. It doesn't replace gradual mileage, strength work, or sleep. Treat it as optional recovery, not armor.",
      },
      {
        question: "Should I stretch before every run?",
        answer:
          "Long held static stretches on cold muscles aren't required for most easy runs. Prefer a short walk + easy movement first ([warm-up guide](/blog/warm-up-cool-down-running)). Save longer flexibility work for after or as its own session.",
      },
      {
        question: "How long should I foam roll?",
        answer:
          "2–10 minutes on sore spots is enough for most beginners. If you're grinding the same hotspot for 30 minutes nightly while mileage keeps climbing, fix the training load instead.",
      },
      {
        question: "When is 'tight' actually a strength problem?",
        answer:
          "Often. Calves, hips, and glutes that feel locked frequently improve more with 2×/week strength than with endless rolling. Pair mobility with [bodyweight strength](/blog/bodyweight-strength-for-runners).",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Influencer mobility flows look like a second job. Beginners need something they'll repeat: **raise temperature, move joints through useful ranges, then run** — optional short rolling when something feels sticky.",
          "Mayo’s stretching guidance emphasizes warming tissue first and controlled flexibility work as part of fitness — not as a magic pre-run ritual ([stretching overview](https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/stretching/art-20047931)). Foam-rolling research generally finds short-term range-of-motion benefits with limited performance magic ([related literature](https://pubmed.ncbi.nlm.nih.gov/27614883/)).",
          "**Educational only — not medical advice.** Sharp pain, suspected stress injuries, or tingling need a clinician — not deeper pressure on the roller.",
        ],
      },
      {
        id: "myths",
        heading: "Mobility myths that waste evenings",
        list: [
          "Myth: 40 minutes of yoga before every easy jog — Reality: 5–10 min warm-up beats abandonment",
          "Myth: Foam rolling 'breaks up scar tissue' daily — Reality: temporary comfort ≠ remodeling your IT band with PVC",
          "Myth: More stretch = fewer injuries — Reality: load management and strength usually win",
          "Myth: If it hurts to press, press harder — Reality: back off; pain is data",
        ],
      },
      {
        id: "foam",
        heading: "Foam rolling that fits real life",
        list: [
          "Calves, quads, glutes — slow passes, 30–60 sec per area",
          "Avoid rolling directly on bone or the front of the knee joint",
          "Breathe; don't bounce or clamp your jaw",
          "After hard sessions or on rest days — optional before easy runs if it helps you feel ready",
          "If a roller session leaves you worse, skip it for a week",
        ],
      },
      {
        id: "menu",
        heading: "A 8-minute mobility menu (post-run or rest day)",
        list: [
          "Ankle rocks / circles — 30 sec each",
          "Leg swings forward-back & side — 8 each",
          "World's-greatest-stretch lite or half-kneeling hip flexor — 30 sec each side",
          "Figure-4 / glute stretch — 30 sec each",
          "Optional: 2 min calf + quad rolling",
        ],
        paragraphs: [
          "That's it. Consistency beats the circus. Longer mobility belongs on [rest days](/blog/what-to-do-on-rest-days) if you enjoy it.",
        ],
        cta: { text: "Add strength 2×/week", href: "/blog/bodyweight-strength-for-runners" },
      },
      {
        id: "when-not",
        heading: "When to stop rolling and get help",
        list: [
          "Pinpoint bone pain that worsens with impact",
          "Numbness, radiating nerve pain, sudden swelling",
          "Pain that changes your gait for days",
        ],
        paragraphs: [
          "Mobility tools complement [injury prevention](/blog/avoiding-injuries). They don't diagnose shin, knee, or plantar problems.",
        ],
      },
    ],
  },
  {
    slug: "cadence-drills-runners",
    metaTitle: "Running Cadence Drills for Beginners (No Magic 180)",
    title:
      "Cadence Drills for Runners: Quicker Steps Without the Instagram Form Panic",
    excerpt:
      "What cadence actually is, why '180 SPM' isn't a universal law, simple drills and metronome tricks to nudge step rate, and how to use research-backed small changes without wrecking your easy days.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-10-09",
    readTime: "11 min",
    relatedSlugs: [
      "running-form-101",
      "how-to-pace-yourself",
      "easy-runs-effort-heart-rate",
      "avoiding-injuries",
      "runners-knee-running",
      "shin-splints-running",
      "speedwork-after-5k-beginners",
      "first-track-workout-beginners",
    ],
    closingQuestion:
      "Have you ever chased 180 steps per minute — did it help, annoy you, or both?",
    sources: [
      SOURCES.cadenceResearch,
      SOURCES.strengthForRunners,
      SOURCES.acsmExercisePrescription2009,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "What is a good running cadence for beginners?",
        answer:
          "Natural cadence varies with height, speed, and terrain. Many recreational runners sit roughly in the 150–170+ steps/min range at easy pace. The useful goal is often a small increase from *your* baseline — not forcing a celebrity number.",
      },
      {
        question: "Is 180 steps per minute required?",
        answer:
          "No. That figure floated out of elite observations and coaching lore. Lab work shows modest step-rate increases can reduce some joint loads for some runners — not that everyone must hit 180.",
      },
      {
        question: "How do I measure cadence?",
        answer:
          "Count steps for 30 seconds and double, or use a watch/phone with cadence. Measure mid-run after you're warm, on flat ground, at easy pace.",
      },
      {
        question: "Will cadence drills fix my knee pain?",
        answer:
          "Sometimes a slightly quicker, shorter step helps load. It is not a diagnosis. Persistent pain needs load changes and often strength — see our knee and injury guides.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Cadence is steps per minute (both feet). Coaches care because overstriding — long, brakey steps — often pairs with lower step rates and crankier knees. Research on step-rate manipulation (classically [Heiderscheit et al.](https://pubmed.ncbi.nlm.nih.gov/21131861/)) found that small increases can alter joint loading patterns.",
          "You do **not** need a personality transplant to 180 SPM. You need a gentle nudge, soft landings, and easy days that stay easy.",
          "**Educational only — not medical advice.** Form experiments shouldn't continue through sharp pain.",
        ],
      },
      {
        id: "baseline",
        heading: "Find your baseline (2 minutes)",
        list: [
          "Warm up 5–10 minutes easy",
          "On flat ground, count every footstrike for 30 seconds × 2 = SPM",
          "Repeat once; average the two",
          "Note the pace/effort — cadence rises naturally when you speed up",
        ],
      },
      {
        id: "nudge",
        heading: "The smart nudge: +5–10%",
        paragraphs: [
          "If you're curious, try a metronome or playlist near **about 5–10% above** your easy-pace cadence — not a leap to 180 overnight. Slightly quicker steps often mean slightly shorter ones. Stay conversational.",
        ],
      },
      {
        id: "drills",
        heading: "Cadence drills that take <10 minutes",
        list: [
          "Metronome easy minutes: 2–4 × 1–2 min at target tick, jog easy between",
          "Quick-feet striders: 4–6 × 15–20 sec light fast feet after an easy run (not all-out)",
          "Soft-quiet game: 1 minute focusing on quiet landings under hips",
          "Hill micro-steps: short hill, quick light steps, walk down",
          "Skip rope or easy pogo hops (if joints tolerate) 2 × 20–30 sec on strength days",
        ],
        paragraphs: [
          "Do drills once or twice a week after a base exists. Don't invent a cadence-only program while mileage is climbing. Form context: [running form 101](/blog/running-form-101).",
        ],
        cta: { text: "Keep easy days easy", href: "/blog/easy-runs-effort-heart-rate" },
      },
      {
        id: "mistakes",
        heading: "Cadence mistakes",
        list: [
          "Forcing 180 on day one until calves riot",
          "Confusing cadence work with interval training — keep easy runs easy",
          "Ignoring shoes, strength, and mileage spikes",
          "Judging trail cadence by road numbers",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Cadence is a tunable dial, not a moral score. Measure your easy baseline, nudge gently with drills, and keep strength + smart volume as the real injury firewall.",
        ],
      },
    ],
  },
  {
    slug: "none-to-run-gentle-beginners",
    metaTitle: "None to Run: Ultra-Gentle Couch to 5K for Nervous Beginners",
    title:
      "None-to-Run Style: An Ultra-Gentle Path When Even 'Couch to 5K' Feels Fast",
    excerpt:
      "High BMI, long layoff, fear of jogging, or joints that hate surprise impact? A 12–16 week walk-first progression, mindset rules, and when to graduate into a standard beginner 5K plan — without shame.",
    category: "Getting Started",
    author: AUTHOR,
    publishedAt: "2026-08-24",
    readTime: "13 min",
    relatedSlugs: [
      "never-ran-where-to-start",
      "why-walking-is-not-cheating",
      "training-first-5k",
      "building-a-running-habit",
      "running-with-health-conditions",
      "avoiding-injuries",
      "easy-runs-effort-heart-rate",
      "first-run-tips",
    ],
    closingQuestion:
      "If you built a gentler on-ramp, what would week one look like — pure walking, or tiny jog dashes?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.preParticipationScreening,
      SOURCES.acsmExercisePrescription2009,
      SOURCES.heartDiseaseExercise,
      SOURCES.weightLoss,
    ],
    faq: [
      {
        question: "Who is this gentler plan for?",
        answer:
          "People who find standard couch-to-5K jump scare: long time sedentary, higher body weight, joint caution, exercise anxiety, or previous failed starts. Walking counts as training.",
      },
      {
        question: "How long until I jog continuously?",
        answer:
          "Maybe months — and that's fine. The goal is a habit and resilient tissues, not matching someone else's 8-week timeline.",
      },
      {
        question: "When should I see a doctor first?",
        answer:
          "If you have heart disease, uncontrolled blood pressure, diabetes complications, chest pain history, or you're unsure about exercise safety — get clearance before starting. This post is education, not medical clearance.",
      },
      {
        question: "Can I use LetsRunNow's 5K plan with this?",
        answer:
          "Yes as a later stage. Use this article for weeks of walk-dominant prep, then enter the free [Couch to 5K](/plan?plan=5k-8w) (or longer variant) when short jogs feel boringly doable.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Some beginners don't need motivation. They need a **slower door**. Popular couch-to-5K plans assume jogging intervals feel okay by week two. For many bodies — higher weight, long sedentary stretches, fear of impact — that's still a cliff.",
          "This is a none-to-run **spirit** guide: walk first, tiny jog dashes later, graduate when ready. Walking is not cheating — see [why walking counts](/blog/why-walking-is-not-cheating).",
          "**Educational only — not medical advice.** Get clinical guidance before starting if you have chronic conditions or concerning symptoms. Stop for chest pain, fainting, or unusual breathlessness.",
        ],
      },
      {
        id: "rules",
        heading: "Rules that keep you in the game",
        list: [
          "Talk test always — if you can't chat, slow down",
          "Soreness okay; limping and sharp pain are not",
          "Miss a week → repeat, don't double",
          "Strength 1–2×/week light (sit-to-stands, calf raises, glute bridges) when cleared",
          "Shoes that don't hurt — awards optional ([fit tips](/blog/choosing-running-shoes))",
          "Celebrate showing up, not GPS pace",
        ],
      },
      {
        id: "phase-a",
        heading: "Phase A — Walk foundation (weeks 1–4)",
        paragraphs: [
          "3 sessions/week. Goal: leave the house on schedule.",
        ],
        list: [
          "Week 1–2: 20–30 min brisk walk (comfortable conversation)",
          "Week 3–4: 30–40 min walk; optional very short hills if pain-free",
          "Optional 4th day: easy stroll or mobility — not a grind",
        ],
      },
      {
        id: "phase-b",
        heading: "Phase B — Micro-jogs (weeks 5–8)",
        list: [
          "Warm up walk 5–10 min",
          "Insert (Jog 10–20 sec, Walk 2–3 min) × 4–6 — jog = shuffle, not sprint",
          "Cool-down walk 5 min",
          "If joints complain for >48 hours, drop back to Phase A for a week",
        ],
      },
      {
        id: "phase-c",
        heading: "Phase C — Longer jogs (weeks 9–12)",
        list: [
          "Build toward (Jog 1 min, Walk 2 min) × 5–6",
          "Then (Jog 2 min, Walk 2 min) when ready",
          "Keep total session ~25–40 min",
        ],
        paragraphs: [
          "When 1–2 minute jogs feel boringly controllable, you're ready for a standard beginner structure like [never ran / where to start](/blog/never-ran-where-to-start) and the free [5K plan](/plan?plan=5k-8w).",
        ],
        cta: { text: "Open the free Couch to 5K plan", href: "/plan?plan=5k-8w" },
      },
      {
        id: "phase-d",
        heading: "Phase D — Optional stretch (weeks 13–16)",
        paragraphs: [
          "Still nervous? Repeat Phase C intensity while adding 5 minutes of total time, or insert a 4th easy walk day. There is no prize for suffering early.",
        ],
      },
      {
        id: "mindset",
        heading: "Mindset for the long on-ramp",
        list: [
          "You are not behind — you are on a longer runway",
          "Social media timelines are not physiology",
          "If weight loss is a goal, patience + consistency beat crash plans ([facts & myths](/blog/running-for-weight-loss-facts-and-myths))",
          "Ask for medical clearance when health flags exist ([running with conditions](/blog/running-with-health-conditions))",
        ],
      },
    ],
  },
  {
    slug: "workplace-lunch-run",
    metaTitle: "Lunch Run at Work: How to Run on a Busy Schedule",
    title:
      "The Workplace Lunch Run: Fit Training Into a Real Job Without Shower Drama",
    excerpt:
      "How to make a 30–45 minute midday run work: packing kit, sweat strategy, route design near the office, manager-safe timing, and when to swap for a walk so your job — and your plan — both survive.",
    category: "Tips",
    author: AUTHOR,
    publishedAt: "2026-10-25",
    readTime: "10 min",
    relatedSlugs: [
      "building-a-running-habit",
      "what-to-wear-running",
      "how-to-pace-yourself",
      "beginner-gear-guide-under-50",
      "warm-up-cool-down-running",
      "post-run-recovery",
      "what-to-do-when-you-miss-a-run",
    ],
    closingQuestion:
      "Would a lunch run save your schedule — or would mornings/evenings still win for you?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.acsmExercisePrescription2009,
      SOURCES.heatSafety,
      SOURCES.sleepTips,
    ],
    faq: [
      {
        question: "How long does a lunch run need to be?",
        answer:
          "Even 20–30 minutes of easy running or walk-run counts. Consistency beats a heroic 10K that makes you late to every 1 p.m. meeting.",
      },
      {
        question: "What if there's no shower at work?",
        answer:
          "Keep the run easy (less sweat), use body wipes, a spare shirt, deodorant, and a cool-down walk. Some people rinse at a gym nearby. Hard intervals at lunch without a shower are optional pain.",
      },
      {
        question: "Is it okay to run instead of eating lunch?",
        answer:
          "Don't skip fueling entirely. Have a small snack before if needed and eat afterward. Chronically underfueling midday sessions ends in afternoon crashes.",
      },
      {
        question: "What about summer heat at noon?",
        answer:
          "Midday can be brutal. Shorten, slow down, choose shade, or swap to treadmill/early walk. Heat is physiology — see our hot-weather hub.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Morning alarms fail. Evening energy fails. The **lunch window** is the secret third option for people with real jobs: a protected slot when your calendar already expects you to disappear.",
          "Popular apps rarely teach the unsexy logistics — tote bag Tetris, boss optics, and sweat without a locker room. This does.",
          "**Educational only — not medical advice.** Hot midday efforts and known heart conditions deserve clinical common sense — stop for red-flag symptoms.",
        ],
      },
      {
        id: "kit",
        heading: "The desk-drawer kit",
        list: [
          "Shoes + socks (leave under desk permanently)",
          "Shorts/tights + tech tee in a packable pouch",
          "Sports bra / base layers as needed",
          "Body wipes, deodorant, small towel",
          "Spare work shirt or blouse",
          "Hair tie / cap; sunscreen if outdoors",
          "Phone + keys pouch; office badge",
        ],
        paragraphs: [
          "Gear doesn't need to be fancy — [under $50 kit](/blog/beginner-gear-guide-under-50) covers most of it.",
        ],
      },
      {
        id: "timing",
        heading: "Timing that respects your calendar",
        list: [
          "Block 45–60 minutes: 5 change + 25–35 move + 10 reset",
          "Tell teammates you have a midday appointment with yourself (optional honesty)",
          "Start 5 minutes earlier than ego wants — buffers beat apologies",
          "Hard workouts at lunch only if showers and recovery exist; otherwise keep [easy](/blog/easy-runs-effort-heart-rate)",
        ],
      },
      {
        id: "routes",
        heading: "Route design near work",
        list: [
          "Out-and-back you can abort if a meeting moves up",
          "Shade loops in summer; well-lit blocks if winter sun is weak",
          "Avoid skirting warehouse districts alone if safety feels off — loops with people beat PR alleys",
          "Treadmill in building gym = weather-proof lunch streak",
        ],
      },
      {
        id: "sweat",
        heading: "Sweat strategy without a shower",
        list: [
          "Easy effort only on no-shower days",
          "Cool-down walk until heart rate settles ([warm-up/cool-down](/blog/warm-up-cool-down-running))",
          "Wipe + fresh shirt + deodorant; rinse face",
          "Eat a real lunch after — yogurt, sandwich, leftovers",
          "Skip garlic-heavy victory meals before close-quarters meetings (learned the hard way by millions)",
        ],
      },
      {
        id: "culture",
        heading: "Workplace culture notes",
        paragraphs: [
          "You don't owe coworkers a TED talk about VO₂max. A simple 'I'm taking a walk break' covers walk-run days. If your workplace is hostile to any midday movement, mornings/evenings or [missed-run strategy](/blog/what-to-do-when-you-miss-a-run) matter more than martyrdom.",
        ],
        cta: { text: "Build a 3-day habit with a free plan", href: "/plan" },
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Lunch runs win when they're boringly easy, logistically packed the night before, and short enough to return human. Habit > heroics — same as every other beginner rule on LetsRunNow.",
        ],
      },
    ],
  },
];
