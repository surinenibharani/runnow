import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Sleep-first marathon recovery: park extra sports, keep runner-specific strength.
 * Live at 7:00 AM Eastern on publishedAt.
 */
export const marathonSleepRecoveryPosts: BlogPost[] = [
  {
    slug: "marathon-sleep-before-other-sports",
    metaTitle: "Marathon Recovery: Sleep First, Pause Extra Sports",
    title:
      "Before a Full Marathon, Put Sleep First — and Park the Extra Sports",
    excerpt:
      "Marathon weeks already spend your recovery budget. Journals show sleep loss hits long endurance hardest, while HIIT, pickup games, and heavy gym sessions compete for the same repair. Here's what to pause, what to keep, and what to do instead.",
    category: "Recovery",
    author: AUTHOR,
    publishedAt: "2026-09-27",
    readTime: "12 min",
    relatedSlugs: [
      "prioritize-running-marathon-training",
      "why-sleep-matters-most-runners",
      "sleep-recovery-for-runners",
      "training-first-full-marathon",
      "what-to-do-on-rest-days",
      "importance-of-cross-training",
      "bodyweight-strength-for-runners",
      "advanced-strength-training-for-runners",
      "post-run-recovery",
    ],
    closingQuestion:
      "In your last marathon block, what was hardest to put on the bench — pickup sports, gym classes, or a late bedtime?",
    sources: [
      SOURCES.sleepDeprivationEnduranceLopes2023,
      SOURCES.sleepDeprivationSportsKong2025,
      SOURCES.sleepLossPhysicalPerformanceCraven2022,
      SOURCES.sleepAthleteConsensusBJSM2021,
      SOURCES.sleepInterventionsAthletes2023,
      SOURCES.overreachingSleepMurphy2024,
      SOURCES.overreachingSleepHausswirth2014,
      SOURCES.concurrentTrainingSexStatusHuiberts2024,
      SOURCES.strengthTrainingRunningEconomyLlanos2024,
      SOURCES.strengthTrainingRunnerPerformanceLlanos2024,
      SOURCES.strengthTrainingEnduranceUmbrella2025,
      SOURCES.taperingEnduranceWang2023,
      SOURCES.badmintonLungeLoadYu2020,
      SOURCES.sleepTips,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "Should I stop all other sports during marathon training?",
        answer:
          "You don't have to quit moving. Journals don't ban cycling, easy swimming, or runner-specific strength. They do show that extra high-intensity work — HIIT classes, pickup basketball or soccer, volleyball, pickleball, sweaty badminton, boxing, heavy leg days, plyometrics — spends the same recovery budget as your long run. During peak weeks and the taper, park those and protect sleep.",
      },
      {
        question: "Do medical journals say to avoid HIIT and hard gym work before a marathon?",
        answer:
          "They don't publish a single 'never HIIT' rule for marathoners. What they show is that sleep loss and extra concurrent intensity raise perceived effort and blunt adaptations. Heavy lower-body lifting plus high running volume can interfere with strength gains. Practical translation: keep short runner strength; drop boot camps, max-effort legs, and jumping sports when mileage is high.",
      },
      {
        question: "Is sleep really more important than another workout?",
        answer:
          "For a marathon, often yes. A 2023 meta-analysis found sleep deprivation moderately impairs endurance, more so when efforts last longer than 30 minutes. A 2025 review found sleep loss also hurts explosive power, max force, speed, and makes the same work feel harder. An extra class on a short night rarely buys fitness you can use at mile 20.",
      },
      {
        question: "What gym work is still useful in a marathon block?",
        answer:
          "Two short sessions a week of hips, calves, core, and simple single-leg strength — not to failure, not after the long run. Reviews in 2024–2025 still support runner-specific strength for economy. Drop hypertrophy 'leg days,' Olympic lifts, box jumps, and CrossFit-style metcons in peak and taper weeks.",
      },
      {
        question: "Can I keep pickleball, volleyball, badminton, or boxing during marathon training?",
        answer:
          "In peak weeks and the taper, park competitive or sweaty sessions like badminton, pickleball, padel, squash, volleyball, flag football, rec soccer, or boxing. After the race, they can come back. If you keep a social hit in early base weeks, treat it like an unplanned interval day: not the day before the long run, and skip it if legs or sleep are already taxed. Easy bike, walk, or short hip/calf strength is the better substitute.",
      },
      {
        question: "What should I do instead of my usual extra sports?",
        answer:
          "Sleep 7–9 hours with a consistent bedtime, optional 20-minute nap, easy walking, gentle yoga or mobility, easy cycling or swimming that doesn't leave you sore, and the runner strength above. Full rest still counts as training.",
      },
    ],
    howTo: {
      name: "How to put sleep and recovery first in marathon training",
      description:
        "Protect a sleep window, park high-intensity extras in peak weeks, keep short runner strength, and taper volume without inventing new hard sports.",
      steps: [
        {
          name: "Treat bedtime like a workout",
          text: "Most adults need at least 7 hours; many marathoners feel better closer to 7–9 in heavy weeks. Keep a consistent window.",
          url: "/blog/sleep-recovery-for-runners",
        },
        {
          name: "Park high-intensity extras in peak weeks",
          text: "HIIT, pickup basketball or soccer, volleyball, pickleball, badminton, boxing, heavy legs, and plyos compete with the long run. Save them for after the race.",
          url: "/blog/prioritize-running-marathon-training",
        },
        {
          name: "Keep short runner-specific strength",
          text: "Hips, calves, and core twice a week — not to failure, not after the long run.",
          url: "/blog/bodyweight-strength-for-runners",
        },
        {
          name: "Taper volume, not common sense",
          text: "Cut running volume, keep a little race-pace sharpness, and do not add new sports to 'stay sharp.'",
          url: "/plan",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** Chronic insomnia, loud snoring with daytime sleepiness, chest pain, or new concerning symptoms deserve a clinician — not a harder gym class.",
          "Marathon training is already a second job for your tendons, sleep, and immune system. Then Tuesday pickup basketball, a 6 a.m. HIIT class, and a heavy squat session show up like they still fit. They don't — not because movement is bad, but because **recovery is a budget**, and 26.2 already spent most of it.",
          "The useful move for most recreational marathoners is simple: **put sleep first, keep easy supporting work, and park high-intensity extras until after the finish line.** What to pause, what to keep, and a peak-week filter are next. The journal receipts are at the bottom.",
        ],
      },
      {
        id: "park-these",
        heading: "High-intensity extras to put in the back seat",
        paragraphs: [
          "During peak marathon weeks (roughly the last 6–8 weeks before the taper, then the taper itself), most recreational runners should **reduce or pause**:",
        ],
        subsections: [
          {
            heading: "High-intensity classes and 'fitness' sports",
            list: [
              "HIIT / boot camps / spin-to-failure classes the day before a quality run or long run",
              "CrossFit-style metcons, high-rep Olympic lifting, and benchmark grinders that leave you sore for 48 hours",
              "Indoor cycling races or group rides you have to hang onto at someone else's pace",
            ],
          },
          {
            heading: "Court, field, and rec-league sports",
            list: [
              "Basketball, volleyball, and beach volleyball — repeated jumping and hard landings on the same knees, Achilles, and calves that have to absorb the long run",
              "Soccer, flag or touch football, rugby, rec hockey, lacrosse, ultimate — cutting, unplanned sprints, and (for contact versions) collisions that do not show up as quality work on your watch",
              "Tennis, badminton, pickleball, padel, squash, racquetball — split-steps, lunges, and stop-start footwork. Pickleball looks social; it still loads the calves and Achilles",
              "These are not 'active recovery.' They are unplanned interval sessions plus ankle- and tendon-risk",
              "The interference idea is the same as stacking extra gym intensity: extra neuromuscular and eccentric load on legs that still have to absorb 16-mile Sundays",
            ],
          },
          {
            heading: "Combat, obstacles, and mountain days",
            list: [
              "Boxing, kickboxing, Muay Thai — extra interval days with calf and hip load, often in late classes that steal sleep",
              "BJJ, wrestling, MMA — grinding isometric and eccentric work plus contact; park in peak and taper",
              "Obstacle-course races (Spartan-style) stacked on a long-run week — you already have a race",
              "A full downhill ski or snowboard day is an eccentric quad session, not a rest day before Sunday's long run",
            ],
          },
          {
            heading: "Gym sessions that fight the long run",
            list: [
              "Heavy bilateral squats, deadlifts, or leg press to failure — especially within 48 hours of the long run",
              "High-volume plyometrics (box jumps, bounding, depth jumps) in peak mileage weeks — useful in a strength block, costly when long runs are already long",
              "New machines, new PRs, or 'leg day because I missed the gym all month'",
            ],
          },
        ],
        closingParagraphs: [
          "**In peak weeks and the taper, park competitive or sweaty sessions like badminton, pickleball, volleyball, flag football, or boxing.** After the race, they can come back. If you keep a social hit in early base weeks, treat it like an unplanned interval day: not the day before the long run, and skip it if legs or sleep are already taxed. Easy bike, walk, or short hip/calf strength is the better substitute.",
          "Guideline you can use without a lab: **if it leaves your legs heavy or sore the next morning, it took money from the marathon account.** See the shorter version in [how to prioritize marathon training](/blog/prioritize-running-marathon-training).",
        ],
      },
      {
        id: "keep-these",
        heading: "What you can usually keep — the alternatives",
        paragraphs: [
          "Parking extras is not the same as sitting still until October. Keep **low-damage supporting work**:",
        ],
        subsections: [
          {
            heading: "Sleep and true rest (highest ROI)",
            list: [
              "A consistent 7–9 hour window — most adults need **at least seven hours**",
              "Optional short nap (about 20 minutes) after a rough night",
              "One full rest day a week with no 'hidden' workout",
              "Earlier caffeine cutoff if evenings get wired",
            ],
          },
          {
            heading: "Easy aerobic that is not another race",
            list: [
              "Easy cycling or swimming at conversation effort — [cycling between runs](/blog/cycling-between-runs) and [swim / elliptical / aqua-jog](/blog/cross-training-swim-elliptical-aqua-jog)",
              "Walking. It counts. It is not a character test",
              "Keep these shorter than your easy run, and never the day before the long run if they make you stiff",
            ],
          },
          {
            heading: "Runner-specific strength (not bodybuilding)",
            list: [
              "Two sessions of 20–30 minutes: calf raises, glute bridges or hip thrusts, split squats or step-ups, side planks, calf/hip stability",
              "Stop 2–3 reps before failure; no ego loading",
              "Place them on easy-run days or after a short easy jog — not after the long run",
              "In the last 7–10 days before the race, most people should drop even this to mobility only — last-week lifting is not worth residual soreness",
            ],
          },
          {
            heading: "Mobility without a second workout",
            list: [
              "Gentle yoga or 10 minutes of hips/calves — [yoga between runs](/blog/yoga-between-runs)",
              "Skip hot yoga, power yoga, and 'yoga plus burpees'",
            ],
          },
        ],
        closingParagraphs: [
          "If you want one map for lift / yoga / bike, use [weight, yoga, and cycling between runs](/blog/weight-yoga-cycling-between-runs). The marathon tweak is **volume and intensity down** as the long run goes up.",
        ],
      },
      {
        id: "taper-is-not-a-new-sport",
        heading: "Taper weeks: cut volume — do not invent a new sport",
        paragraphs: [
          "Taper weeks are for absorbing the work — not for inventing a new sport so you 'still feel trained.'",
          "What that means on a first-marathon calendar:",
        ],
        list: [
          "Run less total mileage; keep a little marathon-pace or easy-strides sharpness if it was already in the plan",
          "Do **not** replace dropped miles with HIIT, pickup basketball, pickleball, volleyball, sweaty badminton, boxing, or a PR squat so you 'still feel trained'",
          "Sleep more, not less — taper restlessness is real; protect bedtime anyway",
          "Strength: reduce sets, then usually stop heavy work 7–10 days out",
        ],
        closingParagraphs: [
          "Do not donate that window to rec-league finals. Sleep more in the taper, not less.",
        ],
      },
      {
        id: "sample-week",
        heading: "A simple peak-week filter",
        paragraphs: [
          "When you are unsure whether an extra activity belongs this week, run this filter:",
        ],
        list: [
          "Will I still hit 7+ hours of sleep if I do it? If no, skip it",
          "Will my legs feel fresh for the long run or the week's quality session? If no, skip it",
          "Is it easy conversation effort, or does it include jumping, cutting, fighting, or going to failure? Jumping/cutting/fighting/failure → park it",
          "Is it already on the marathon plan? If not, it needs a better reason than 'I always go to this class'",
        ],
        closingParagraphs: [
          "A peak week that works for many first-timers: 3–4 runs from the plan, one full rest day, one easy bike or walk, two short strength sessions, and a boring bedtime. That is not undertraining. That is how the long run actually lands.",
        ],
        cta: {
          text: "Use a marathon plan with rest built in",
          href: "/plan",
        },
      },
      {
        id: "finish-line",
        heading: "The finish-line version",
        paragraphs: [
          "Before a full marathon, the high-ROI choice is almost always: sleep, easy supporting movement, short runner strength — and a polite season off from HIIT, heavy legs, rec-league sports, and combat classes. You can have those back in week two after the race. Mile 20 does not care that you won Tuesday night pickleball.",
        ],
      },
      {
        id: "the-research",
        heading: "What the research says",
        paragraphs: [
          "The lists above are the coaching translation. The journals below are why we are not guessing. Sports-medicine reviews do not say 'never lift' or 'never bike.' They do say sleep loss bluntly hurts long endurance, extra concurrent intensity can interfere with adaptations, and a proper taper cuts **volume**, not common sense.",
        ],
      },
      {
        id: "sleep-is-the-workout",
        heading: "Sleep is not a lifestyle bonus — it is marathon training",
        paragraphs: [
          "A 2023 systematic review and meta-analysis by Lopes and colleagues found that sleep deprivation has a **moderate negative effect on endurance**, and that longer efforts (over about 30 minutes) were hit harder than short ones. A marathon is the long effort. You cannot 'tough-guy' a sleep debt at mile 20.",
          "A 2025 systematic review and meta-analysis (Kong et al., *Frontiers in Physiology*) pooled randomized and crossover trials and found sleep deprivation impaired **aerobic endurance, explosive power, maximal force, speed, and skill control**, and **raised ratings of perceived exertion**. The same easy run feels like a tempo. That is not a character flaw — it is physiology.",
          "Craven and colleagues (2022, *Sports Medicine*) similarly found acute sleep loss reduced performance across exercise types, with more consistent harm after late-night restriction and for afternoon tests. Walsh and the 2021 BJSM expert consensus treat sleep as a performance and health variable, not a soft wellness extra.",
          "For habit-level sleep (bedtime, caffeine, naps), see [Sleep Is Recovery](/blog/sleep-recovery-for-runners). For the broader journal case, see [why sleep matters most](/blog/why-sleep-matters-most-runners). This post is the marathon-specific rule: **protect the night before you protect the extra sport.**",
        ],
      },
      {
        id: "overreaching-steals-sleep",
        heading: "Stacking load can steal sleep even when you 'feel fine'",
        paragraphs: [
          "Here is the trap: you add a boot camp 'because recovery days should still be productive,' then sleep gets worse, then easy runs feel harder, so you add *more* intensity to 'fix fitness.'",
          "Hausswirth et al. (2014) overloaded trained triathletes and found those who became functionally overreached slept **less efficiently and for shorter duration** — and reported more upper-respiratory illness — compared with athletes who handled the same block. Sleep then rebounded in the taper.",
          "A 2024 PLOS ONE systematic review and meta-analysis (Murphy et al.) found endurance overreaching reduced **objective sleep efficiency** (about 2 percentage points on actigraphy) **without a matching change in how people rated their sleep**. You can be sleeping worse and not notice. That is a terrible time to add pickup soccer.",
          "Practical read: if mileage is climbing, treat extra hard sessions as **overreaching on purpose** — usually a bad trade for a first marathon. More on [overtraining warning signs](/blog/overtraining-recognition-runners).",
        ],
      },
      {
        id: "what-journals-do-not-say",
        heading: "What the journals actually say about other sports",
        paragraphs: [
          "There is no large randomized trial titled 'Don't play basketball in week 14 of a marathon plan.' Honest medical writing has to say that out loud.",
          "What *does* exist:",
        ],
        list: [
          "Sleep-loss meta-analyses (above): extra fatigue and higher perceived effort on endurance work — the quality your long run needs",
          "Concurrent-training research: stacking high running volume with demanding strength can blunt some adaptations, especially lower-body strength in males (Huiberts, Wüst & van der Zwaard, 2024, *Sports Medicine*)",
          "Runner-specific strength reviews (Llanos-Lagos et al., 2024; Ramos-Campo et al., 2025 umbrella review): **heavy, well-timed strength and plyometrics can help running economy** — they are not junk when they are programmed as *support*, not as a second sport",
          "Tapering: a 2023 PLOS ONE meta-analysis (Wang et al.) found endurance tapers that **reduced training volume by about 41–60%**, lasted up to about three weeks, and **kept intensity and frequency** improved time-trial performance. 'Keep intensity' means some of the sport's race-relevant intensity (shorter marathon-pace work), not a CrossFit Open workout so you don't get stale",
          "Racquet and jump sports: badminton lunge research describes stop-start footwork with impact around **2.5× body weight** on the same calves, Achilles, and knees that absorb the long run (Yu et al., 2020). Pickleball, padel, squash, tennis, and volleyball share that overlap even when the court looks casual",
        ],
        closingParagraphs: [
          "So the evidence is not 'all gym is bad.' It is: **high running volume plus extra high-intensity or high-damage sessions compete.** Recreational marathoners usually already have enough intensity in the plan. Pickup games, metcons, and max leg days are the extras that do not show up on Strava as 'intensity' but still trash the next long run. Medical journals will not parent you off the basketball court. They will tell you that **sleep loss makes long endurance worse and the same work feel harder**, that **stacking endurance load can quietly worsen sleep**, and that **extra concurrent intensity is a trade**, not a free bonus.",
        ],
      },
    ],
  },
];
