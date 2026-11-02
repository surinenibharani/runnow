import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * First-person race report: second full marathon, Atlantic City, Oct 18, 2026.
 * Live at 7:00 AM Eastern on publishedAt.
 */
export const atlanticCityMarathonPosts: BlogPost[] = [
  {
    slug: "atlantic-city-marathon-2026",
    metaTitle: "Atlantic City Marathon 2026: My Second Full Marathon Race Report",
    title:
      "Atlantic City Marathon 2026: My Second 26.2, a Talking Calf, and Walking It In",
    excerpt:
      "Four months of clean training, a group half four weeks earlier, practiced gels — and still a calf, a headwind, and two walking miles at the end. What actually happened, and what I'd change.",
    category: "Racing",
    author: AUTHOR,
    publishedAt: "2026-11-02",
    readTime: "11 min",
    relatedSlugs: [
      "training-half-and-full-marathon-same-season",
      "training-first-full-marathon",
      "hitting-the-wall-marathon",
      "race-day-tips",
      "race-fueling-gels-carb-load-beginners",
      "hamstring-calf-hip-flexor-runners",
      "warm-up-cool-down-running",
      "cold-weather-running-hub",
      "mental-side-of-running",
      "dns-dnf-stopping-a-race",
    ],
    closingQuestion:
      "If your marathon rewrote itself after mile 18, what would you keep from the build — and what would you never skip again on race morning?",
    sources: [
      SOURCES.preParticipationScreening,
      SOURCES.runningNutrition,
      SOURCES.nutritionAthleticPerformanceACSM2016,
      SOURCES.carbsTrainingCompetitionBurke2011,
      SOURCES.issnNutrientTiming2017,
      SOURCES.marathonWallRapoport2010,
      SOURCES.dehydration,
      SOURCES.hyponatremia,
      SOURCES.marathonEahReview2022,
      SOURCES.mayoMuscleCramps,
      SOURCES.mayoMuscleCrampTreatment,
      SOURCES.muscleStrainMayo,
      SOURCES.stretchingMayo,
      SOURCES.nwsWindChill,
      SOURCES.cdcHypothermiaFrostbite,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "Is walking the last two miles of a marathon quitting?",
        answer:
          "No. Finishing on your feet with a calf that is pulsing is a different decision than sitting down. A DNF is sometimes the safer call — see [DNS and DNF](/blog/dns-dnf-stopping-a-race) — but walking to protect a muscle that is threatening a full cramp is still completing the race. The medal is for 26.2, not for never walking.",
      },
      {
        question: "Should you stretch a calf cramp during a race?",
        answer:
          "Mayo Clinic's muscle-cramp guidance is gentle stretch of the cramped muscle, plus fluids — not a heroic yoga pose in the wind. If you have never practiced that stretch on tired legs in training, race mile 19 is a bad first lesson. Sudden pop, inability to walk, or swelling is a strain or worse, not a cramp — that needs care, not a Google search. More on [calf and hamstring load](/blog/hamstring-calf-hip-flexor-runners).",
      },
      {
        question: "Can you run a group half and a full marathon four weeks apart?",
        answer:
          "Yes if the marathon is the A race and the half is a tune-up, not an all-out PR. Four weeks is the spacing we used and matches what we wrote in [half + full in one season](/blog/training-half-and-full-marathon-same-season). The half should feel like a long dress rehearsal, not a second peak.",
      },
      {
        question: "If you fuel on schedule, why can mile 18 still fall apart?",
        answer:
          "Classic 'the wall' is often carbohydrate depletion — see [hitting the wall](/blog/hitting-the-wall-marathon). Calf tightness, cold, ocean wind, a skipped warm-up, and a heavy dinner are separate problems. Fueling still matters. It is not a shield against every race-day factor.",
      },
      {
        question: "Is cheese the night before a marathon a bad idea?",
        answer:
          "A little cheese in a meal you already tolerate is not a crime. A rich Italian dinner plus cream-cheese bagels the next morning is a lot of fat sitting on top of the carbs you actually wanted. Sports-nutrition position stands favor familiar, easier-to-digest carbohydrate before long events — not a food coma. Practice the dinner on a long-run weekend.",
      },
    ],
    howTo: {
      name: "How I'd race-week a second marathon after Atlantic City",
      description:
        "Keep the honest build. Tighten race morning, wind, and a practiced calf plan.",
      steps: [
        {
          name: "Treat the group half as a tune-up",
          text: "If a half sits four weeks before the marathon, run it as dress rehearsal — not a second A race.",
          url: "/blog/training-half-and-full-marathon-same-season",
        },
        {
          name: "Practice the exact breakfast and warm-up",
          text: "Bagels, fruit, cat-cow, and the same mobility you used all block. Race morning is copy-paste, not improvisation.",
          url: "/blog/warm-up-cool-down-running",
        },
        {
          name: "Bring the fuel you trained with",
          text: "Gels, chews, and salt tablets from long runs — not the surprise brand on the course.",
          url: "/blog/race-fueling-gels-carb-load-beginners",
        },
        {
          name: "Respect cold and ocean wind",
          text: "Dress for the start, have a throwaway layer, and expect headwinds to raise effort at the same pace.",
          url: "/blog/cold-weather-running-hub",
        },
        {
          name: "Have a calf script before you need it",
          text: "Walk early. If the calf starts pulsing, use a stretch you already practiced — or take a minute to look up a trusted page instead of skipping it out of fear.",
          url: "/blog/hamstring-calf-hip-flexor-runners",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** This is one race report, not a protocol. Sudden muscle pop, inability to walk, chest pain, confusion, or swelling needs clinical care — not a finish-line pep talk.",
          "This was my **second full marathon**: the Atlantic City Marathon on Sunday, October 18, 2026. It sat exactly four weeks after the annual half marathon our larger group runs. On paper, the build was the cleanest I have done. On the course, mile 18 still got a vote.",
          "I am writing this while the tightness is gone and the lessons are not. If you are lining up for a first or second 26.2, I want you to steal the parts we got right — and not repeat the small race-morning leaks that showed up as a pulsing calf in a headwind.",
        ],
      },
      {
        id: "two-races-one-group",
        heading: "We ran the half and the full as one season",
        paragraphs: [
          "The clever part was not two separate plans. We **integrated** the group half and the full-marathon build so that as long-run distance grew, a small subset of four of us started earlier, covered the extra miles, then **retooled into the larger half-marathon pack**. Same roads. Same people. Different alarm clocks.",
          "That is how you keep a social long run when four people need 18–20 and everyone else needs 11–13. It also kept the marathon group honest: we were not heroes out there alone inventing a secret workout.",
          "Four weeks between the half and the full is the spacing we used on purpose. It matches what we tell people in [half + full marathon in one season](/blog/training-half-and-full-marathon-same-season): one A race, the other a tune-up. The half went fine. The 20-miler went fine, with the usual fatigue toward the end — not a crisis, just the honest tired you are supposed to feel when the work is real.",
        ],
      },
      {
        id: "the-build",
        heading: "Four months of mostly doing the boring things",
        paragraphs: [
          "We followed the plan religiously. We cut down the bad food and drink choices for four months (mostly ;)). Weekdays we mixed **upper-body strength** and **yoga between runs** instead of stacking junk miles. That is the supporting work we already argue for in [weight, yoga, and cycling between runs](/blog/weight-yoga-cycling-between-runs) and [yoga between runs](/blog/yoga-between-runs) — keep it, don't turn it into a second sport.",
          "Fueling was not left to race-day luck. The course was handing out a different brand than we had used all block. We packed **our own gels, salt tablets, and energy chews** — the ones the gut already knew. That is the whole point of [practice your gels before race day](/blog/race-fueling-gels-carb-load-beginners): nothing new at mile 16.",
          "Everything was going well. That sentence is doing a lot of work. A clean build is not a contract with race day. It is only the best odds you can buy.",
        ],
      },
      {
        id: "day-before",
        heading: "Atlantic City the day before: packets, rooms, and too much cheese",
        paragraphs: [
          "We travelled the day before, picked up race packets, and got to the Airbnb we had booked. We planned **one bedroom each** so sleep would actually happen. That was one of the smarter logistics calls of the weekend. A marathon does not care that you split a sofa with a snorer.",
          "Then we went to a fancy Italian restaurant and carb-loaded — **cheese too**. I know. High-fat, heavy, excellent, and not the textbook night-before plate. Sports-nutrition position stands still point at familiar, easier carbohydrate before long events, not a food coma. A little cheese in a meal you already tolerate is fine. A rich dinner plus cream cheese the next morning is two votes for slow digestion.",
          "I am not going to pretend that dinner 'caused' the calf. I am going to say it was one more variable we did not need, stacked on a 26.2 we did need.",
        ],
      },
      {
        id: "race-morning",
        heading: "Race morning: bagels, forgotten bananas, skipped warm-up",
        paragraphs: [
          "Start was 8:00 a.m. on the water. Breakfast was bagels with cream cheese. There was a **bunch of bananas on the table**. Everyone forgot them. Easy carbohydrate, sitting there, losing the argument to cream cheese.",
          "Warm-up: I did a basic cat-cow. That was it. All the stretches and the actual warm-up we had been doing through training — I missed them. If you want the short version of what we usually recommend, it is in [warm-up and cool-down](/blog/warm-up-cool-down-running). Race morning is supposed to be copy-paste. I improvised a yoga pose and called it done.",
          "It **felt like 30°F** at the start on the water, with ocean headwinds that came in punches. Inland, Atlantic City Airport logged a 36°F overnight low and gusts around 25 mph. On the course, facing the Atlantic, it felt colder and meaner — the kind of wind that makes a 12-minute mile feel like work. Cold plus wind is not a vibe. It is extra cost at the same pace. See [cold-weather running](/blog/cold-weather-running-hub) and [running in bad weather](/blog/running-in-bad-weather) if you are lining up on a shoreline in October.",
        ],
      },
      {
        id: "miles-1-18",
        heading: "Miles 1–18: the 12-minute pacer, the flag, and the conversations",
        paragraphs: [
          "The plan with my friend was simple: **stick to the 12-minute-per-mile pacer** and stay with her. Until about 18, I was there — more like 11s and 12s — having great conversations, carrying the pacer flag a few times, listening to her and the people around us talk about their races.",
          "That stretch is what I will remember when the calf story fades. A marathon can be a moving classroom. Other people's 26.2 stories are better entertainment than staring at your watch.",
          "I was taking **energy gels, salt tablets, and chews on a regular interval**, the same way we had on long runs. The body was being supported. This is the part of the report where the plan was working.",
          "Carrying the flag felt like helping. In 30-degree wind, it was also extra isometric work for shoulders that had not been warmed up. I would still help. I would not make it a hobby for miles.",
        ],
      },
      {
        id: "mile-18",
        heading: "Mile 18: the calf, the shoulders, the wind",
        paragraphs: [
          "Around 18, it hit. My **calf throbbed**. I told myself it was a one-off and kept going, just a little slower. Then the **shoulders locked up** — like rock. The calf kept pulsing. I slowly moved to walk-run.",
          "I wanted to stop and stretch the calf. I was afraid that if I stretched wrong I would cramp for real, and I knew a full cramp would be disastrous, so I **gave up on the stretch**. That fear is not stupid. Aggressive stretching into a threatening cramp is a common way to make it worse. The missing piece was not courage. It was a **practiced, gentle script** from training so I was not inventing technique in a headwind.",
          "The ocean headwinds got stronger. Walk-run for the next six miles, through 24. After 24, even a few seconds of running made the calf pulse continuously. I did not want a full cramp. I know how that story ends on a course with no shortcut home.",
          "The last two miles I walked. Except for the pulsing calf, I did not have the empty-legs fog of a classic [wall](/blog/hitting-the-wall-marathon). I was not bonking so much as **protecting a muscle that had started to shout**. I finished. Medal on the neck. General tightness everywhere. Fine — and very ready to sit down.",
        ],
      },
      {
        id: "what-went-right",
        heading: "What we actually got right",
        list: [
          "One A race. The group half was a dress rehearsal four weeks out, not a second peak",
          "The four of us started long runs early and rejoined the pack — community without pretending everyone needed 20 miles",
          "Four months of cleaner food and drink, with room for 'mostly'",
          "Upper-body strength and yoga on weekdays instead of extra pounding",
          "Gels, salt, and chews we had already used — not the surprise brand on the course",
          "Separate bedrooms the night before. Sleep is training. Split sofas are not",
          "A pacer and a friend for 18 miles. Conversation is a legal performance aid",
          "Walking when the calf started to pulse, instead of 'toughing' a full cramp for a prettier split",
        ],
      },
      {
        id: "what-id-change",
        heading: "What I would change next time",
        list: [
          "Eat the bananas. They were already paid for and sitting on the table",
          "Keep the Italian if you want — skip making cheese the main character the night before a 26.2",
          "Copy the weekday warm-up onto race morning. Cat-cow is not the whole routine",
          "Rehearse a 30-second calf protocol on tired long runs: walk, gentle stretch you already know, then decide. Do not debut it at mile 19",
          "I had a phone. When the calf started pulsing I should have stopped for a minute and looked up a trusted way to ease a cramp — not skipped the stretch because I was afraid of making it worse",
          "Dress the start for wind on water, not for the airport screenshot. Throwaway layer until you are actually warm",
          "Write the mental script before the wall: walk is allowed, finish is still a finish",
        ],
        paragraphs: [
          "None of that requires a new personality. It requires treating race week like the last week of the plan, not a vacation from the plan.",
        ],
      },
      {
        id: "if-the-calf-talks",
        heading: "If your calf starts talking mid-race",
        paragraphs: [
          "This is the section I wish I had memorized, not searched.",
        ],
        list: [
          "A **throb that stays in one spot** is not the same as 'I am tired.' Treat it as a warning, not a personality test",
          "Slow down before you have to. Walk-run is a tool. It is also in [why walking is not cheating](/blog/why-walking-is-not-cheating)",
          "Mayo Clinic's cramp pages point to **gentle stretch of the cramped muscle** and fluids — not bouncing, not forcing the toes into a new shape in the wind",
          "If you have never done that stretch on tired legs, do not make mile 20 the seminar. Practice it after a long run once or twice in the block. [Stretching between and after runs](/blog/stretching-between-and-after-runs) is the calmer version",
          "A sudden pop, a hole in the stride, swelling, or not being able to walk is a [strain](/blog/hamstring-calf-hip-flexor-runners) (or worse), not a cramp. That is medical care, not 'one more mile'",
          "Salt tablets are not magic. I took them on schedule and still had a pulsing calf. Electrolytes matter; so do cold, fatigue, and a skipped warm-up. Don't chug water to 'fix' a cramp either — [hyponatremia](/blog/hydration-electrolytes-running) is a real marathon problem",
        ],
        closingParagraphs: [
          "I still think looking up a trusted page for two minutes would have been better than freezing in indecision. I also think the better move is to **arrive with the two minutes already done** in training.",
        ],
      },
      {
        id: "mental",
        heading: "The wall is also a conversation in your head",
        paragraphs: [
          "Even when you do almost everything right, you never fully know how the body will vote on race day. Food, sleep, leftover fatigue from a half four weeks earlier, wind, a missed warm-up — it adds up in ways a spreadsheet cannot see.",
          "After it hits, **mental toughness** is not screaming. It is deciding, over and over, that walking still counts while every cell in your brain files a motion to stop. That is closer to [the mental side of running](/blog/mental-side-of-running) than to a movie sprint.",
          "There is a difference between 'my calf is about to cramp' and 'I am uncomfortable.' The first one deserves respect. The second one is the marathon. I used walking for the first. I would not use it as an excuse for the second next time either.",
        ],
      },
      {
        id: "what-journals-show",
        heading: "What the journals actually say",
        paragraphs: [
          "A marathon is long enough for **glycogen** to become the story — Rapoport's 2010 analysis is still the clean explanation of why so many people 'hit the wall,' and ACSM / Burke-style carbohydrate guidance (often roughly 30–60 g per hour, more if the gut is trained) is why we practice gels. My 18-mile problem did not feel like an empty tank. It felt like a calf and a wind. Both can be true in the same race.",
          "Mayo Clinic treats **muscle cramps** as common, usually harmless, and multifactorial — fatigue and strain show up alongside the old 'just drink more salt' story. Treatment pages emphasize gentle stretch and fluids, not aggressive yanking. Cold and wind raise physiological cost; NWS wind-chill charts and CDC cold guidance exist because exposed skin and wet layers are not a fashion choice on a shoreline.",
          "None of that literature promised me a smooth 12-minute mile if I ate well for four months. It promised better odds. Atlantic City paid out the odds, then collected a calf tax anyway.",
        ],
      },
      {
        id: "conclusion",
        heading: "The medal still happened",
        paragraphs: [
          "I wanted a cleaner last 8 miles. I got a story I will actually use. The build was honest. The group half-plus-full experiment worked. The 20-miler told the truth. The pacer and the conversations through 18 were the joy. The calf, the rock-shoulders, the ocean wind, the forgotten bananas, the skipped warm-up, and the cheese — those are the leaks.",
          "Second marathons teach a different lesson than first ones. The first one proves you can cover the distance. The second one asks whether you can **adapt when the plan is no longer the day you are having**. Walking it in with a pulsing calf was not the movie. It was still 26.2. The tightness faded. The medal did not require a pretty split to be real.",
          "If you are in a marathon block right now: keep the religious parts. Keep the practiced fuel. Keep the extra bedroom. Then treat race morning like it is still training — bananas, warm-up, wind, and a calf script you already know. The course will still get a vote. Show up with fewer unpaid bills.",
        ],
        cta: {
          text: "See the marathon plan",
          href: "/plan",
        },
      },
    ],
  },
];
