import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * P0 medical / physiology content gaps from the Jul 2026 gap analysis.
 * Scheduled weekly after workplace-lunch-run (2027-07-26).
 */
export const p0MedicalGapPosts: BlogPost[] = [
  {
    slug: "running-through-menopause",
    metaTitle: "Running Through Perimenopause & Menopause: Training That Fits",
    title:
      "Running Through Perimenopause & Menopause: Keep the Miles Without Ignoring the Shift",
    excerpt:
      "How estrogen decline changes recovery, hot flashes, pelvic floor, and bone load — plus how to keep easy running, strength, and sleep as the real plan, not heroics.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2026-07-04",
    readTime: "14 min",
    relatedSlugs: [
      "running-guide-for-women",
      "running-over-50-beginners",
      "bone-health-masters-runners",
      "reds-low-energy-availability-runners",
      "bodyweight-strength-for-runners",
      "postpartum-return-to-run",
      "easy-runs-effort-heart-rate",
    ],
    closingQuestion:
      "What changed first for you in perimenopause — sleep, heat, recovery, or something else?",
    sources: [
      SOURCES.menopauseFitnessMayo,
      SOURCES.menopauseWeightliftingBoneMayo,
      SOURCES.osteoporosis,
      SOURCES.exerciseWithOsteoporosis,
      SOURCES.strengthForRunners,
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.sleepTips,
      SOURCES.redS,
    ],
    faq: [
      {
        question: "Is it safe to keep running through menopause?",
        answer:
          "For many healthy runners, yes — moderate running and walking remain excellent options. Personal history (bone density, pelvic floor symptoms, heart risk, joint pain) can change what 'safe' looks like. Ask your clinician if you're unsure, especially with diagnosed osteoporosis or new chest symptoms.",
      },
      {
        question: "Why do easy runs suddenly feel harder?",
        answer:
          "Sleep disruption, hot flashes, iron status, under-fueling, and loss of recovery capacity all raise perceived effort. Treat effort as truth: slow down, insert walk breaks, and protect easy days instead of chasing old paces.",
      },
      {
        question: "Do I need hormone therapy to keep running?",
        answer:
          "Hormone therapy is a medical decision between you and a qualified clinician — not a training requirement. This guide covers training, strength, sleep, and fueling you can use whether or not you pursue treatment.",
      },
      {
        question: "Should I stop hills and intervals?",
        answer:
          "Not automatically. Many runners keep light hills and short strides. High-impact jumps, aggressive speed blocks, and rapid mileage spikes deserve more caution if bone density is low or recovery is poor. Strength and easy volume usually matter more than hero intervals.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Perimenopause and menopause aren't a reason to quit running. They *are* a reason to stop pretending your thirties training template still fits without edits.",
          "Estrogen isn't only about periods. It influences temperature regulation, connective tissue feel, mood, sleep, and bone remodeling. When levels fluctuate and then settle lower, many runners notice: hotter nights, crabby recovery, stiff tendons, and paces that used to feel easy now feel stubborn.",
          "**Educational only — not medical advice.** Menopause care, hormone therapy, bone medications, and pelvic symptoms belong with your clinician. Use this as a training literacy guide — not a prescription.",
        ],
      },
      {
        id: "what-changes",
        heading: "What often changes in the body (and the run)",
        list: [
          "Hot flashes / night sweats → sleep debt → higher next-day effort",
          "Recovery feels slower after the same workout",
          "Weight distribution and muscle retention shift without strength work",
          "Pelvic floor symptoms can appear or return (leakage, heaviness)",
          "Bone remodeling accelerates loss risk — impact alone isn't a full plan",
          "Mood / motivation dips that look like 'lost fitness' but are physiology + sleep",
        ],
        paragraphs: [
          "None of these make you fragile. They make **load management and strength** non-negotiable — the same principles beginners need, with less margin for stubborn ego.",
        ],
      },
      {
        id: "training-edits",
        heading: "Training edits that actually help",
        list: [
          "Keep most runs truly easy — conversation pace, walk breaks welcome ([easy-run guide](/blog/easy-runs-effort-heart-rate))",
          "Progress weekly volume slowly; skip stacking hills + speed + long run in one week",
          "Protect one full rest or gentle cross-train day; sleep is the real recovery session",
          "Shorten or soften hard days when night sweats wreck sleep — fitness isn't lost in one week",
          "Use effort, not old race splits, as the governor for a season",
        ],
        paragraphs: [
          "If you're returning after a break or starting after 50, pair this with our [over-50 beginner guide](/blog/running-over-50-beginners). The women's overview also covers cycle-related training in [running for women](/blog/running-guide-for-women).",
        ],
      },
      {
        id: "strength-bone",
        heading: "Strength + bone: the non-optional second sport",
        paragraphs: [
          "Mayo Clinic clinicians emphasize resistance work in perimenopause and after menopause because bones respond to load. Running is weight-bearing, but it mainly stresses the same pattern — legs in one plane. Strength training loads spine, hips, and upper body differently.",
          "Aim for **2 sessions per week** of progressive resistance: squats or sit-to-stands, hip hinges / deadlift pattern, rows, pushes, calf raises, and a little balance. Start with bodyweight or bands ([bodyweight strength](/blog/bodyweight-strength-for-runners)); add load gradually when form is solid.",
          "If you already have low bone density, ask whether high-impact running or jumps are appropriate for *your* T-score — see [exercising with osteoporosis](https://www.mayoclinic.org/diseases-conditions/osteoporosis/in-depth/osteoporosis/art-20044989) framing and our [masters bone health deep dive](/blog/bone-health-masters-runners).",
        ],
      },
      {
        id: "fuel-sleep",
        heading: "Fuel and sleep beat another tempo",
        paragraphs: [
          "Chronically under-eating while 'trying to outrun midlife weight' is a common trap — and it raises injury and bone risk. Fuel the training you do; protein at meals and enough total energy matter. If periods were already irregular before menopause, or you've had stress fractures, learn the [REDs / low energy availability](/blog/reds-low-energy-availability-runners) picture.",
          "Sleep tips from boring clinical lists still win: cool room if night sweats allow, consistent schedule, caffeine cutoff, and treating insomnia as a medical issue when lifestyle tweaks fail. A wiped runner who forces intervals rarely 'toughens up' — they get injured.",
        ],
      },
      {
        id: "pelvic",
        heading: "Pelvic floor without embarrassment",
        paragraphs: [
          "Leakage on downhills or after speed is common and addressable. It is not a required side effect of being a runner. Pelvic floor physiotherapy is the gold standard when symptoms stick around. Reduce bounce-heavy days while you rehab — see the [women's injury hub](/injuries/for-women-runners#pelvic-floor) for symptoms and next steps.",
        ],
      },
      {
        id: "hrt-boundary",
        heading: "Where training advice stops (and clinical care starts)",
        list: [
          "Hormone therapy, vaginal estrogen, and bone medications — clinician + you",
          "Chest pain, new severe shortness of breath, or syncope — urgent care, not a blog",
          "Diagnosed osteoporosis + desire to keep racing — get individualized impact guidance",
          "Disordered eating history — work with appropriate clinical support alongside training changes",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Keep running if you enjoy it. Edit the plan: easier easy days, honest recovery, strength twice a week, enough food, and medical partners for hormones and bone. Midlife fitness isn't a faded photocopy of your old PBs — it's a stronger operating system.",
        ],
        cta: { text: "Build a sustainable plan", href: "/plan" },
      },
    ],
  },
  {
    slug: "reds-low-energy-availability-runners",
    metaTitle: "REDs & Low Energy Availability for Runners: Signs & Fix",
    title:
      "REDs & Underfueling for Runners: When 'Toughness' Is Just Low Energy Availability",
    excerpt:
      "What Relative Energy Deficiency in Sport (REDs) means for runners of any gender, warning signs beyond missed periods, how underfueling fuels injuries, and the practical fix: eat enough for the work you do.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2026-07-05",
    readTime: "13 min",
    relatedSlugs: [
      "running-guide-for-women",
      "stress-fracture-running",
      "bone-health-masters-runners",
      "nutrition-for-runners",
      "nutrition-basics-for-beginners",
      "running-through-menopause",
      "post-run-recovery",
    ],
    closingQuestion:
      "Have you ever treated hunger on hard weeks as a character test — and what would 'fuel the miles' look like instead?",
    sources: [
      SOURCES.redS,
      SOURCES.femaleAthleteTriad,
      SOURCES.ironDeficiency,
      SOURCES.osteoporosis,
      SOURCES.strengthForRunners,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "Is REDs only a women's issue?",
        answer:
          "No. The 2023 IOC consensus frames Relative Energy Deficiency in Sport as a syndrome that can affect any athlete when energy intake doesn't meet the demands of training and daily life. Menstrual disruption is one visible signal in people who menstruate — not the whole definition.",
      },
      {
        question: "What's the difference between REDs and the Female Athlete Triad?",
        answer:
          "The Triad (low energy availability, menstrual dysfunction, low bone density) describes an important subset of the problem. REDs is the broader umbrella: underfueling can impair bone, endocrine, immune, cardiovascular, and psychological systems even when the classic Triad triad isn't fully present.",
      },
      {
        question: "Can recreational runners get REDs?",
        answer:
          "Yes. You don't need an elite mileage log. Combining high training load with diet culture, long fasted runs, or chronic 'eating clean' calorie cuts is enough. Beginners ramping up for a first half while dieting hard are classic at-risk patterns.",
      },
      {
        question: "If I suspect REDs, what do I do first?",
        answer:
          "Increase total energy intake (especially around training), reduce training load if injuries or red-flag symptoms are present, and see a clinician experienced with sports / metabolic health. Stress fracture pain needs imaging pathway, not another easy run 'to stay loose.'",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Run culture still romanticizes light weights, skipped snacks, and 'I forgot to eat.' Physiology doesn't. When the energy you take in chronically fails to cover training + life, systems trade off — hormones, bone remodeling, immunity, mood, and performance.",
          "That pattern is what sports medicine calls **low energy availability**, and when it becomes a syndrome of impaired function, **Relative Energy Deficiency in Sport (REDs)**.",
          "**Educational only — not medical advice.** This is literacy for runners and coaches, not a diagnosis tool. Persistent fatigue, bone pain, menstrual changes, or disordered eating need clinical care.",
        ],
      },
      {
        id: "what-it-is",
        heading: "Plain-language definition",
        paragraphs: [
          "Energy availability is roughly: energy eaten minus energy spent in exercise, relative to fat-free mass. You don't need a lab calculator to act wisely. If you train hard and eat like someone on rest week forever, availability drops.",
          "The [2023 IOC consensus on REDs](https://doi.org/10.1136/bjsports-2023-106994) describes multi-system consequences. OrthoInfo's overview of [REDs and the Female Athlete Triad](https://orthoinfo.aaos.org/en/diseases--conditions/relative-energy-deficiency-in-sport-reds/) is a readable clinical companion for athletes and parents.",
        ],
      },
      {
        id: "signs",
        heading: "Warning signs runners actually notice",
        list: [
          "Irregular or missed periods (when pregnancy is excluded) — take seriously",
          "Libido drop, persistent cold sensitivity, hair thinning",
          "Resting heart rate or perceived effort drifting up for the same paces",
          "Frequent niggles: stress reactions, recurrent bone pain, stubborn tendon pain",
          "Getting sick often; mood that feels flat or irritable beyond normal life stress",
          "GI issues, preoccupation with food rules, or pride in never feeling hungry",
          "In any gender: stalled progress despite 'perfect' compliance with volume",
        ],
        paragraphs: [
          "One sign alone isn't proof. Clusters of signs plus a calorie-restricted lifestyle while mileage rises deserve a real check — see also our [stress fracture](/blog/stress-fracture-running) and [women's RED-S injury page](/injuries/for-women-runners#red-s-bone-health).",
        ],
      },
      {
        id: "causes",
        heading: "How runners slide into underfueling (often without meaning to)",
        list: [
          "Adding mileage while keeping a weight-loss deficit",
          "Long fasted runs stacked every week",
          "Cutting whole food groups without replacing calories",
          "Comparing body size to social-media elites",
          "Coach or peer praise for being 'disciplined' around food",
          "Fear that fueling will 'undo' the workout",
        ],
        paragraphs: [
          "Beginner [nutrition basics](/blog/nutrition-basics-for-beginners) and [runner nutrition](/blog/nutrition-for-runners) cover the positive habits. This article is about recognizing when those habits are actively missing.",
        ],
      },
      {
        id: "fix",
        heading: "The practical fix (not another punishment plan)",
        list: [
          "Eat enough total food for training days — snacks before/after long or hard sessions",
          "Include carbs around runs; they are fuel, not moral failure",
          "Prioritize protein across meals to support repair",
          "If body weight goals exist, slow them and separate from race build peaks",
          "Cut training load when bone pain, illness cluster, or menstrual red flags appear — then rebuild",
          "Work with GP / sports medicine / registered dietitian when symptoms persist",
        ],
        paragraphs: [
          "Iron deficiency can coexist and amplify fatigue — see Mayo's [iron deficiency anemia](https://www.mayoclinic.org/diseases-conditions/iron-deficiency-anemia/symptoms-causes/syc-20355034) overview and get labs through a clinician rather than megadosing blindly.",
        ],
      },
      {
        id: "return",
        heading: "Returning to training after underfueling",
        paragraphs: [
          "Think months, not a heroic week. Bone and endocrine recovery lag behind how fast you *feel* hungry again. Rebuild easy aerobic volume first; delay intervals and racing until medical green lights and pain-free loading are back.",
          "Masters and postmenopausal runners: underfueling plus estrogen decline is a particularly hard combination for bone — pair this with [bone health for masters](/blog/bone-health-masters-runners) and [running through menopause](/blog/running-through-menopause).",
        ],
        cta: { text: "Train with gradual plans, not crash builds", href: "/plan" },
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Under-eating isn't toughness. Enough food is a performance and longevity tool. If your body is whispering with fatigue, missed periods, or bone niggles, listen before it shouts with a stress fracture.",
        ],
      },
    ],
  },
  {
    slug: "bone-health-masters-runners",
    metaTitle: "Bone Health for Masters & Postmenopausal Runners",
    title:
      "Bone Health for Masters & Postmenopausal Runners: Load, Food, and When to Image",
    excerpt:
      "Why estrogen decline and aging change fracture risk, how running + strength + calcium/vitamin D fit together, DEXA timing in plain language, and when impact should be modified — not mythologized.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2026-07-06",
    readTime: "13 min",
    relatedSlugs: [
      "running-over-50-beginners",
      "running-through-menopause",
      "reds-low-energy-availability-runners",
      "stress-fracture-running",
      "bodyweight-strength-for-runners",
      "advanced-strength-training-for-runners",
      "avoiding-injuries",
    ],
    closingQuestion:
      "Have you talked with a clinician about bone density — or is running still doing all the 'bone work' in your head?",
    sources: [
      SOURCES.osteoporosis,
      SOURCES.exerciseWithOsteoporosis,
      SOURCES.menopauseWeightliftingBoneMayo,
      SOURCES.menopauseFitnessMayo,
      SOURCES.strengthForRunners,
      SOURCES.redS,
      SOURCES.physicalActivityGuidelinesUS,
    ],
    faq: [
      {
        question: "Does running alone prevent osteoporosis?",
        answer:
          "No. Running is useful weight-bearing work for many people, but bone health also depends on strength training, nutrition (including calcium and vitamin D status), hormones, genetics, and fall risk. Treating the long run as complete bone insurance is a myth.",
      },
      {
        question: "Should everyone over 50 get a DEXA scan?",
        answer:
          "Screening guidelines vary by country and risk factors. In the U.S., average-risk women are often discussed for screening around 65, earlier with risk factors (early menopause, prior fractures, steroid use, etc.). Ask your clinician what's appropriate for you — not a blog.",
      },
      {
        question: "Can I keep running with osteopenia or osteoporosis?",
        answer:
          "Sometimes yes, sometimes with modifications. Mayo Clinic notes that high-impact activities like running can pose fracture risk in weakened bone for some people, while strength, walking, and balance work are central. Get individualized advice based on your imaging and fracture history.",
      },
      {
        question: "What's the single best training add for bone?",
        answer:
          "Progressive resistance training 2× per week, done consistently for months. Pair with enough calories and protein. Avoid rapid extreme weight loss — bones dislike crash deficits.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "Masters runners love the idea that miles = strong bones. Miles help. They aren't magic.",
          "Bone is living tissue that remodels under load, nutrition, and hormones. After menopause — and with aging in any sex — the remodeling balance can tip toward loss. Recurrent stress injuries, height loss, or fractures from low-energy falls are signals to get curious clinically, not to quietly add another easy 10K.",
          "**Educational only — not medical advice.** Bone density testing, medications, and clearance for impact sports belong with your clinician.",
        ],
      },
      {
        id: "why",
        heading: "Why masters bone risk isn't 'just aging'",
        list: [
          "Estrogen decline after menopause accelerates bone loss for many women",
          "Low energy availability / REDs further suppresses bone remodeling ([REDs hub](/blog/reds-low-energy-availability-runners))",
          "Prior amenorrhea or underfueling in younger years can leave a thinner reserve",
          "Medications (e.g., long-term glucocorticoids) and some medical conditions raise risk",
          "Falls plus low density = the fracture combination strength and balance help prevent",
        ],
        paragraphs: [
          "Mayo's [osteoporosis overview](https://www.mayoclinic.org/diseases-conditions/osteoporosis/symptoms-causes/syc-20351968) and [exercising with osteoporosis](https://www.mayoclinic.org/diseases-conditions/osteoporosis/in-depth/osteoporosis/art-20044989) pages are clear: activity helps, and the *type* of activity should match bone status.",
        ],
      },
      {
        id: "training",
        heading: "A bone-smart training mix",
        list: [
          "Weight-bearing aerobic work you tolerate: walking, easy running, hiking on stable ground",
          "Strength 2× weekly: hips, legs, back, and upper body — progressive overload over months",
          "Balance/stability: single-leg stands, careful step-ups — fall prevention is bone prevention",
          "Avoid sudden spikes in impact (races, plyometrics, trail chaos) if density is unknown and risk is high",
          "If osteoporotic, ask before continuing aggressive running, jumping, or loaded spinal flexion/twist moves",
        ],
        paragraphs: [
          "Start simple with [bodyweight strength](/blog/bodyweight-strength-for-runners); progress toward [advanced strength](/blog/advanced-strength-training-for-runners) when ready. For the midlife hormonal context, see [running through menopause](/blog/running-through-menopause).",
        ],
      },
      {
        id: "nutrition",
        heading: "Food that supports remodeling",
        paragraphs: [
          "Calcium from food first (dairy or fortified alternatives, leafy greens, tofu set with calcium) — supplements only when your clinician recommends them. Vitamin D status is often checked with a blood test before high-dose self-experimentation.",
          "Protein at each meal supports muscle — which supports the mechanical loading bones feel. Chronic dieting during marathon blocks is a bone tax; fuel the work ([nutrition for runners](/blog/nutrition-for-runners)).",
        ],
      },
      {
        id: "red-flags",
        heading: "Red flags and imaging conversations",
        list: [
          "Pinpoint bone pain that worsens with running — stop and get assessed ([stress fractures](/blog/stress-fracture-running))",
          "Fracture from a minor fall or coughing / sneezing trauma",
          "Height loss, stooped posture, or known osteopenia/osteoporosis",
          "Early menopause, amenorrhea history, celiac/endocrine disease, or chronic steroid use — ask about earlier screening",
        ],
        paragraphs: [
          "Women-specific bone and RED-S context also lives on our [injuries hub for women](/injuries/for-women-runners#osteoporosis-risk). Beginners over 50 can start gently with the [over-50 guide](/blog/running-over-50-beginners).",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "Strong masters running careers are built on muscles and bones that are deliberately trained and fed — not on mileage bravado. Lift, fuel, sleep, and partner with a clinician on density questions early rather than after the second stress injury.",
        ],
        cta: { text: "Start a gradual training plan", href: "/plan" },
      },
    ],
  },
];
