import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Next-round gap posts: plantar fasciitis, IT band, first-race logistics,
 * off-season / between plans, masters 50+ beginner guide.
 */
export const nextGapPosts: BlogPost[] = [
  {
    slug: "plantar-fasciitis-running",
    metaTitle: "Plantar Fasciitis from Running: Causes, Recovery & Prevention",
    title: "Plantar Fasciitis for Runners: Heel Pain That Shows Up in the Morning",
    excerpt:
      "That first-step stab in the heel isn't 'just tightness.' What plantar fasciitis usually feels like, how runners calm it down, and how to keep it from returning when you rebuild mileage.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2026-07-22",
    readTime: "8 min",
    relatedSlugs: [
      "shin-splints-running",
      "runners-knee-running",
      "achilles-tendinitis-running",
      "choosing-running-shoes",
      "avoiding-injuries",
      "bodyweight-strength-for-runners",
    ],
    closingQuestion:
      "Has heel pain ever changed your training — what finally helped you get back?",
    sources: [
      SOURCES.plantarFasciitis,
      SOURCES.achillesTendinitis,
      SOURCES.peaceAndLove,
      SOURCES.strengthForRunners,
    ],
    faq: [
      {
        question: "What does plantar fasciitis feel like?",
        answer:
          "Often a sharp or stabbing pain under the heel (sometimes mid-arch), worst with the first steps in the morning or after sitting. It may ease as you warm up, then return after longer runs.",
      },
      {
        question: "Can I keep running with plantar fasciitis?",
        answer:
          "Usually you need to reduce impact load. Continuing the same mileage that caused it often prolongs recovery. Cross-train, address calf/foot strength, and return gradually.",
      },
      {
        question: "How long does plantar fasciitis take to heal?",
        answer:
          "Mild cases can improve over weeks with smart load changes; stubborn cases take months. See a clinician if pain worsens, you limp day-to-day, or home care isn't helping after a few weeks.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Plantar fasciitis is irritation of the thick band of tissue under your foot that supports the arch — the **plantar fascia**. Runners meet it after mileage jumps, hard surfaces, dead shoes, tight calves, or coming back too fast from time off.",
          "**This is general education, not medical advice or a diagnosis.** Persistent heel pain needs a professional. Stress fractures, nerve issues, and Achilles problems can mimic it.",
        ],
      },
      {
        id: "symptoms",
        heading: "What it usually feels like",
        list: [
          "Sharp or burning pain under the heel (or along the arch)",
          "Worst with first steps in the morning or after sitting",
          "May warm up during a run, then stiffen afterward",
          "Tenderness when you press the bottom of the heel",
          "Worse barefoot on hard floors or in flimsy flats",
        ],
        paragraphs: [
          "Mayo Clinic's overview of [plantar fasciitis](https://www.mayoclinic.org/diseases-conditions/plantar-fasciitis/symptoms-causes/syc-20354846) is a solid reference for questions to bring to a clinician.",
        ],
      },
      {
        id: "triggers",
        heading: "Why runners get it",
        list: [
          "Sudden mileage or intensity jumps",
          "Worn-out shoes or a big midsole drop change overnight",
          "Mostly concrete with no recovery",
          "Tight calves / limited ankle mobility relative to new load",
          "Long days on feet at work plus evening runs",
          "Comebacks that skip the rebuild ([comeback guide](/blog/comeback-after-running-break))",
        ],
      },
      {
        id: "calm",
        heading: "Calm it down (first weeks)",
        list: [
          "Cut or pause painful running; bike/swim/elliptical if pain-free",
          "Avoid barefoot on hard floors in the morning — supportive shoes or sandals",
          "Short ice bouts for comfort (10–15 min) — not a cure alone",
          "Gentle calf stretches without forcing into sharp pain",
          "Roll a frozen water bottle under the arch lightly if it soothes",
          "Sleep and protein matter — tissue remodeling isn't optional",
        ],
        paragraphs: [
          "Aggressive stretching into sharp pain and 'running it off' are common ways people dig a deeper hole. Protect load first, then rebuild capacity.",
        ],
      },
      {
        id: "rebuild",
        heading: "Rebuild: strength + gradual return",
        paragraphs: [
          "When daily walking is manageable, add capacity work many clinicians use for the calf–foot complex — progress only if next-morning pain isn't spiking:",
        ],
        list: [
          "Slow calf raises (double-leg → single-leg as tolerated)",
          "Towel scrunches or short-foot drills for the arch — mild effort, not cramping",
          "Hip/glute work so the chain shares load ([bodyweight strength](/blog/bodyweight-strength-for-runners))",
          "Return with walk-run on flat, soft paths when possible",
          "Replace dead shoes — see [shoe fitting](/blog/choosing-running-shoes) and [anti-hype buying](/blog/running-shoes-without-lab-reviews)",
        ],
      },
      {
        id: "see-help",
        heading: "When to see a specialist",
        list: [
          "Pain lasts beyond a few weeks of load reduction",
          "You limp during normal walking",
          "Night pain, swelling, redness, or fever",
          "Numbness/tingling that suggests nerve involvement",
          "You're unsure it's plantar fasciitis vs Achilles vs stress injury",
        ],
        paragraphs: [
          "More injury context: [avoiding injuries](/blog/avoiding-injuries), [shin splints](/blog/shin-splints-running), [Achilles](/blog/achilles-tendinitis-running), and the [injuries hub](/injuries).",
        ],
      },
    ],
  },
  {
    slug: "it-band-syndrome-running",
    metaTitle: "IT Band Syndrome for Runners: Outer Knee Pain Explained",
    title: "IT Band Syndrome: The Outer-Knee Pain That Loves Hills and Camber",
    excerpt:
      "Sharp or burning pain on the outside of the knee after a few miles isn't mysterious toughness — it's often IT band irritation. How to calm it, what strength actually helps, and when to get checked.",
    category: "Injuries",
    author: AUTHOR,
    publishedAt: "2026-07-26",
    readTime: "8 min",
    relatedSlugs: [
      "runners-knee-running",
      "shin-splints-running",
      "how-to-not-hate-hills",
      "bodyweight-strength-for-runners",
      "avoiding-injuries",
      "running-form-101",
    ],
    closingQuestion:
      "Have hills or banked roads ever lit up the outside of your knee — what fixed it?",
    sources: [
      SOURCES.itBandSyndrome,
      SOURCES.patellofemoralPain,
      SOURCES.strengthForRunners,
      SOURCES.peaceAndLove,
    ],
    faq: [
      {
        question: "Where is IT band pain?",
        answer:
          "Typically on the outside of the knee (sometimes along the outer thigh). It often shows up after a predictable distance and can make downhill or cambered roads feel worse.",
      },
      {
        question: "Is foam rolling the IT band the cure?",
        answer:
          "Rolling may feel good briefly, but lasting change usually comes from load management plus hip strength — not punishing the band for 20 minutes a day.",
      },
      {
        question: "Is IT band the same as runner's knee?",
        answer:
          "No. Runner's knee (PFPS) is usually around/behind the kneecap. IT band irritation is more lateral. Both can coexist; get assessed if you're unsure.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Iliotibial (IT) band syndrome is irritation where the thick connective tissue along the outer thigh rubs or compresses near the outside of the knee. Runners bump into it after **hills, speed, banked roads, sudden volume**, or weak hips that let the knee cave under fatigue.",
          "**Not medical advice.** Locking, big swelling, trauma, or pain that changes your walk needs hands-on care. Cleveland Clinic's overview of [IT band syndrome](https://my.clevelandclinic.org/health/diseases/21967-iliotibial-band-syndrome) is a useful starting reference.",
        ],
      },
      {
        id: "symptoms",
        heading: "Common symptoms",
        list: [
          "Sharp, burning, or stabbing pain on the outer knee",
          "Often starts after a few miles and worsens if you continue",
          "Downhills, stairs, or roads that slope one way can flare it",
          "May feel okay walking at first, then angry after running",
          "Tenderness on the outer knee when pressed",
        ],
      },
      {
        id: "triggers",
        heading: "Training triggers",
        list: [
          "Adding hills and speed in the same week",
          "Always running the same side of a cambered road",
          "Big mileage jumps after time off",
          "Weak glutes / poor single-leg control when tired",
          "Sudden jump into track or downhill repeats",
        ],
        paragraphs: [
          "If hills are the spark, read [how to not hate hills](/blog/how-to-not-hate-hills) — effort and progression matter as much as bravery.",
        ],
      },
      {
        id: "modify",
        heading: "Modify training without quitting forever",
        list: [
          "Cut mileage; skip painful hills and downhills for 1–2+ weeks",
          "Flat easy runs or walk-run only if pain stays mild and settles within 24 hours",
          "Swap some days to bike or swim",
          "Alternate sides of the road when you return to outdoor routes",
          "Skip aggressive deep lateral lunges that reproduce the outer-knee bite",
        ],
        cta: {
          text: "Cross-training ideas",
          href: "/blog/importance-of-cross-training",
        },
      },
      {
        id: "strength",
        heading: "Strength that helps many runners",
        paragraphs: [
          "Hip abductors and glutes are the usual levers. Keep work mostly pain-free during and the next day:",
          "Two short sessions beat one brutal session. Details: [bodyweight strength](/blog/bodyweight-strength-for-runners). Foam rolling the outer thigh can be a comfort tool — not the whole rehab.",
        ],
        list: [
          "Side-lying leg lifts — slow, controlled",
          "Clamshells or banded side steps",
          "Single-leg glute bridges when double-leg feels easy",
          "Step-downs from a low step with knee tracking over mid-foot",
          "Calf work so the lower leg shares load",
        ],
      },
      {
        id: "return",
        heading: "Return-to-run checklist",
        list: [
          "Daily walking and stairs feel manageable",
          "Strength work isn't flaring the outer knee for 48 hours",
          "First runs: flat, short, easy — no hero hills",
          "Add volume before intensity; reintroduce hills last",
          "If the same mileage reinjures you repeatedly, see a sports PT",
        ],
        paragraphs: [
          "Related knee pain around the kneecap? See [runner's knee](/blog/runners-knee-running). Broader prevention: [avoiding injuries](/blog/avoiding-injuries) and [/injuries](/injuries).",
        ],
      },
    ],
  },
  {
    slug: "first-race-signup-logistics",
    metaTitle: "How to Sign Up for Your First Running Race",
    title: "How to Pick and Sign Up for Your First Race (Without the Panic)",
    excerpt:
      "Choosing a distance, reading the event page, bib pickup, waves, parking, and what to pack — the unsexy logistics that make race morning feel doable instead of chaotic.",
    category: "Racing",
    author: AUTHOR,
    publishedAt: "2026-10-27",
    readTime: "8 min",
    relatedSlugs: [
      "race-day-tips",
      "training-first-5k",
      "training-first-10k",
      "first-run-tips",
      "runner-etiquette-trails-roads-track",
      "what-to-wear-running",
    ],
    closingQuestion:
      "What surprised you most about your first race signup or race morning?",
    sources: [SOURCES.physicalActivityGuidelinesUS],
    faq: [
      {
        question: "What distance should my first race be?",
        answer:
          "A local 5K is the best default. Choose a 10K only if you can already finish close to that distance in training. Skip your first event as a marathon unless you truly have the base.",
      },
      {
        question: "When should I sign up?",
        answer:
          "Early enough to get a shirt size and avoid sell-outs — often 4–10 weeks out for popular local races. Don't sign up so early that you panic-train before your base exists.",
      },
      {
        question: "Do I need a fancy GPS watch?",
        answer:
          "No. A phone, a simple watch, or mile markers work. Focus on familiar shoes, breakfast, and starting slower than adrenaline suggests.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** This guide is for general education — it is not a diagnosis, treatment plan, or substitute for care from a qualified clinician.",
          "Training gets the glory. **Signup logistics** decide whether race morning feels exciting or like a scavenger hunt in spandex.",
          "This guide covers picking an event, reading the fine print, and showing up prepared. For pacing and race-day do's/don'ts, pair it with [race day tips](/blog/race-day-tips).",
        ],
      },
      {
        id: "pick-distance",
        heading: "Pick a realistic first distance",
        list: [
          "5K — best first race for most beginners ([5K guide](/blog/training-first-5k))",
          "10K — after you can handle ~5–6 easy miles ([10K guide](/blog/training-first-10k))",
          "Half / full — only with a real build; not a dare",
          "Prefer local, flat-ish courses for race one",
          "Trail or huge destination races can wait until you know the sport",
        ],
      },
      {
        id: "read-page",
        heading: "Read the event page like a contract",
        list: [
          "Date, start time, and time zone (sunrise matters in winter)",
          "Course map and elevation — hills change everything",
          "Bib pickup windows (expo vs race morning)",
          "Packet contents, shirt cutoff dates, refund/deferral rules",
          "Wave or corral system and how seed times work",
          "Bag drop, parking, transit, and road closures",
          "Weather plan / cancellation policy",
        ],
        paragraphs: [
          "Screenshot the important bits. Event sites reshuffle the night before when you're trying to find parking addresses on 3% battery.",
        ],
      },
      {
        id: "signup",
        heading: "Signup checklist",
        list: [
          "Use the email you actually check — confirmation + course updates land there",
          "Emergency contact that answers the phone",
          "Honest estimated finish time so you seed in the right wave",
          "Shirt size for *running*, not vanity (damp fabric clings)",
          "Add calendar holds for bib pickup and race morning leave-time",
          "Tell one supportive person your plan — logistics buddy optional but golden",
        ],
        cta: { text: "Start a free training plan", href: "/plan" },
      },
      {
        id: "week-of",
        heading: "Week-of logistics",
        list: [
          "Confirm bib pickup hours; bring ID if required",
          "Lay out kit the night before — shoes, socks, bib + pins, weather layers",
          "Plan breakfast you've already tested on a long-run morning",
          "Know bathroom strategy (lines are real)",
          "Set two alarms; leave earlier than pride suggests",
          "No new shoes, socks, or gel experiments",
        ],
        paragraphs: [
          "Etiquette refresher for shared courses: [runner etiquette](/blog/runner-etiquette-trails-roads-track). Clothing: [what to wear](/blog/what-to-wear-running).",
        ],
      },
      {
        id: "morning",
        heading: "Race morning flow",
        list: [
          "Eat on schedule; sip water — don't chug a liter at the start line",
          "Arrive early enough for parking, bathrooms, and a short warm-up",
          "Pin bib on the shirt you'll finish in (not the throwaway layer)",
          "Line up by pace — starting too far forward is chaos and wasted adrenaline",
          "Start slower than you feel; high-five volunteers; enjoy the weird joy of a finish chute",
        ],
        paragraphs: [
          "First races are about finishing with a story, not a Strava funeral. Logistics done early buys you calm when the gun goes off.",
        ],
      },
    ],
  },
  {
    slug: "off-season-between-training-plans",
    metaTitle: "What to Do Between Running Training Plans",
    title: "Off-Season and Between Plans: How to Keep Running Without Burning Out",
    excerpt:
      "You finished a 5K or half — now what? How to recover, rebuild base, and stay consistent between training cycles without losing fitness or getting hurt.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-10-13",
    readTime: "8 min",
    relatedSlugs: [
      "what-to-do-on-rest-days",
      "comeback-after-running-break",
      "building-a-running-habit",
      "easy-runs-effort-heart-rate",
      "importance-of-cross-training",
      "sleep-recovery-for-runners",
    ],
    closingQuestion:
      "What do you usually do after a race block — time off, random miles, or a deliberate base phase?",
    sources: [
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.acsmExercisePrescription2009,
      SOURCES.strengthForRunners,
    ],
    faq: [
      {
        question: "Should I take time off after a race?",
        answer:
          "Yes — at least a few easy days after a 5K/10K, and a longer downshift after a half or marathon. Easy movement beats total couch lockdown for most people, unless you're injured.",
      },
      {
        question: "How long should an off-season last?",
        answer:
          "Often 1–4 weeks of reduced structure after a goal race, then several weeks of easy base before the next build. Exact length depends on distance, fatigue, and life stress.",
      },
      {
        question: "Will I lose all my fitness?",
        answer:
          "Aerobic fitness fades gradually — not overnight. A few easy weeks protect you for the next cycle. Panic-mileage between plans is how injuries show up.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** Stop for chest pain, fainting, or unusual breathlessness, and get clinical guidance if you have chronic conditions before hard sessions.",
          "Training plans have a finish line. Life doesn't. The gap **between cycles** is where many beginners either quit… or pile on random hard miles because structure disappeared.",
          "Off-season isn't laziness. It's how you turn one race into a multi-year habit.",
        ],
      },
      {
        id: "after-race",
        heading: "Right after the goal race",
        list: [
          "5K / 10K: 3–7 days of easy only (or full rest if wrecked)",
          "Half: ~1–2 easy weeks before anything spicy",
          "Marathon: longer — often 1–3+ weeks of serious downshift",
          "Celebrate; sleep; eat; don't sign up for another race the next morning out of adrenaline",
          "If something hurts beyond normal soreness, treat it — don't 'train through' into the next block",
        ],
        cta: {
          text: "Post-run recovery basics",
          href: "/blog/post-run-recovery",
        },
      },
      {
        id: "base",
        heading: "A simple between-plans base phase",
        paragraphs: [
          "Goal: keep the habit, lower stress, refill motivation. Most runs easy by [talk test](/blog/easy-runs-effort-heart-rate).",
        ],
        list: [
          "2–4 easy runs per week — shorter than peak training",
          "Optional long run that stays conversational and below race-peak distance",
          "1–2 strength sessions (hips, calves, core)",
          "One cross-train day if joints need variety",
          "No more than one gentle quality touch (strides) per week — optional",
          "Protect sleep like it's a workout ([sleep guide](/blog/sleep-recovery-for-runners))",
        ],
      },
      {
        id: "mistakes",
        heading: "Common between-plan mistakes",
        list: [
          "Immediate restart of the same peak mileage",
          "Every run becomes a secret time trial",
          "Signing up for back-to-back A races without recovery",
          "Total stop for months, then a heroic comeback (use [comeback guide](/blog/comeback-after-running-break))",
          "Dropping strength the second the plan ends",
        ],
      },
      {
        id: "next-goal",
        heading: "Choosing the next goal",
        list: [
          "Repeat the distance smarter (faster or happier)",
          "Step up: 5K → 10K → half when base feels easy",
          "Step sideways: trail event, team race, or fun run with zero pressure",
          "Maintenance season: no race — just consistency for 6–8 weeks",
        ],
        paragraphs: [
          "Open [/plan](/plan) when you're ready for structure again — start an earlier week than ego suggests if the last block fried you.",
        ],
        cta: { text: "Browse free plans", href: "/plan" },
      },
      {
        id: "mindset",
        heading: "Mindset: identity over calendar",
        paragraphs: [
          "You are a runner on easy Tuesdays in January, not only on race weekends. Between-plan seasons test that identity. Keep the streak of showing up — shrink the intensity, not the person.",
          "Habit tools: [building a running habit](/blog/building-a-running-habit) and [rest days](/blog/what-to-do-on-rest-days).",
        ],
      },
    ],
  },
  {
    slug: "running-over-50-beginners",
    metaTitle: "Beginner Running Guide for Ages 50+",
    title: "Starting (or Restarting) Running After 50: A Practical Beginner Guide",
    excerpt:
      "You're not behind — you're experienced at life. How to start running after 50 with smarter recovery, strength, medical common sense, and plans that respect tendons as much as motivation.",
    category: "Getting Started",
    author: AUTHOR,
    publishedAt: "2026-08-10",
    readTime: "9 min",
    relatedSlugs: [
      "never-ran-where-to-start",
      "running-with-health-conditions",
      "why-walking-is-not-cheating",
      "comeback-after-running-break",
      "bodyweight-strength-for-runners",
      "avoiding-injuries",
    ],
    closingQuestion:
      "Did you start running after 50 — or come back later in life — and what do you wish you'd known in week one?",
    sources: [
      SOURCES.preParticipationScreening,
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.osteoporosis,
      SOURCES.strengthForRunners,
      SOURCES.heartRateZones,
    ],
    faq: [
      {
        question: "Is it safe to start running after 50?",
        answer:
          "Many adults can, especially with a walk-run approach and medical clearance when needed. If you have heart disease, uncontrolled blood pressure, joint replacements, or other conditions, talk with your clinician first.",
      },
      {
        question: "Should I walk or run first?",
        answer:
          "Walk first if you're new or returning. Build to brisk 20–30 minute walks, then add short jog intervals. Walking is training — not a demotion.",
      },
      {
        question: "How many days per week?",
        answer:
          "Two to three run/walk days is plenty at the start, with at least one full rest day between impact sessions. Strength twice a week helps tendons and bone.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** This guide is for general education — it is not a diagnosis, treatment plan, or substitute for care from a qualified clinician.",
          "Starting to run after 50 isn't a nostalgia project — it's one of the best investments you can make in energy, mood, and long-term health. The rules are mostly the same as any beginner… with **more respect for recovery, strength, and medical context.**",
          "**Get clearance if you need it** — especially with heart symptoms, major joint issues, or long inactivity. Mayo Clinic and CDC-style guidance still apply: move more, progress gradually, stop for warning signs. See also [running with health conditions](/blog/running-with-health-conditions).",
        ],
      },
      {
        id: "mindset",
        heading: "Mindset shifts that help after 50",
        list: [
          "Compare to your last month, not a 25-year-old on Strava",
          "Walk-run is smart tissue loading — read [walking isn't cheating](/blog/why-walking-is-not-cheating)",
          "Consistency beats hero weeks",
          "Sleep and protein are training tools, not optional extras",
          "Strength is not optional if you want to keep running for years",
        ],
      },
      {
        id: "start",
        heading: "A safer start progression",
        list: [
          "Weeks 1–2: brisk walking 20–30 min, 3–4 days/week",
          "Weeks 3–4: 1 min jog / 2 min walk × 15–25 min",
          "Weeks 5–6: lengthen jog bits gradually as long as next-day joints feel okay",
          "Keep most effort conversational ([effort / HR](/blog/easy-runs-effort-heart-rate))",
          "If returning from months off, use the [comeback guide](/blog/comeback-after-running-break)",
        ],
        cta: {
          text: "Start the free 8-week 5K plan when ready",
          href: "/plan?plan=5k-8w",
        },
      },
      {
        id: "recovery",
        heading: "Recovery realities",
        paragraphs: [
          "Tendons and bone adapt slower than motivation. Double rest days after hard efforts aren't weakness. Heat, hills, and speed all count as stress — add one at a time.",
        ],
        list: [
          "Prioritize 7+ hours sleep when you can",
          "Easy days must feel easy — ego miles create calf/Achilles/knee trouble",
          "Replace shoes before they're hockey pucks",
          "Surface variety helps — endless cambered sidewalks add up",
        ],
      },
      {
        id: "strength-bone",
        heading: "Strength and bone health",
        paragraphs: [
          "Two short strength sessions weekly (hips, calves, sit-to-stand, rows) support running economy and resilience. For bone density concerns, ask your clinician about impact + resistance — see Mayo Clinic on [osteoporosis](https://www.mayoclinic.org/diseases-conditions/osteoporosis/symptoms-causes/syc-20351968).",
        ],
        list: [
          "Glute bridges, calf raises, sit-to-stands or squats to a chair",
          "Side steps / clamshells for hips",
          "Light upper-back work for posture on longer walks/runs",
          "Progress slowly; joint-friendly ranges beat max loads",
        ],
        cta: {
          text: "Bodyweight routines for runners",
          href: "/blog/bodyweight-strength-for-runners",
        },
      },
      {
        id: "red-flags",
        heading: "Red flags — stop and get help",
        list: [
          "Chest pain, pressure, or pain radiating to jaw/arm",
          "Unusual breathlessness, dizziness, or fainting",
          "Sudden severe joint pain or inability to bear weight",
          "Pain that worsens week to week instead of settling",
        ],
        paragraphs: [
          "Women and men both deserve tailored notes — see [women's](/blog/running-guide-for-women) and [men's](/blog/running-guide-for-men) beginner guides for gear, fueling, and health specifics. Age is a variable, not a veto. Start easier than pride suggests, and you can still be running years from now.",
        ],
      },
    ],
  },
];
