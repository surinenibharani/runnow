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

  {
    slug: "what-marathon-does-to-your-body",
    metaTitle: "What a Marathon Does to Your Body — Men vs Women",
    title:
      "What a Full Marathon Does to Your Body: Heart, Muscle, Gut, Kidneys — and Sex Differences",
    excerpt:
      "What 26.2 miles does inside the body for men and women — transient heart biomarkers, muscle damage, kidney stress, gut barrier hits, and when those lab bumps are expected vs when they need a clinician — from recent medical journals.",
    category: "Health",
    author: AUTHOR,
    publishedAt: "2026-09-05",
    readTime: "14 min",
    relatedSlugs: [
      "training-first-full-marathon",
      "hitting-the-wall-marathon",
      "post-run-recovery",
      "hydration-electrolytes-running",
      "runners-gi-distress",
      "running-guide-for-women",
      "dont-run-a-marathon-in-your-first-year",
      "sleep-recovery-for-runners",
    ],
    closingQuestion:
      "After your last long race, what felt most wrecked first — legs, gut, sleep, or something you didn't expect?",
    sources: [
      SOURCES.marathonHeartAcuteLaily2026,
      SOURCES.marathonTroponinMetaLi2023,
      SOURCES.bostonMarathonOrganStressMcKenna2025,
      SOURCES.marathonAkiBiomarkersMeta2025,
      SOURCES.marathonEahReview2022,
      SOURCES.bostonEahAlmond2005,
      SOURCES.hyponatremia,
      SOURCES.preParticipationScreening,
      SOURCES.heartDiseaseExercise,
      SOURCES.redS,
      SOURCES.menstrualCycleReview,
    ],
    faq: [
      {
        question: "Is an elevated troponin after a marathon a heart attack?",
        answer:
          "Not by itself. Meta-analyses show high-sensitivity troponin and NT-proBNP commonly rise after a marathon and often exceed clinical cutoffs used in hospitals — yet many of these shifts look transient in healthy finishers, and imaging often does not show classic infarct-style damage. Symptoms, ECG, and the time curve matter; chest pain, fainting, or lasting distress still need urgent care — don't diagnose yourself from a finish-line blood draw meme.",
      },
      {
        question: "Do women recover from marathons differently than men?",
        answer:
          "Both sexes absorb large temporary organ stress. Recent Boston Marathon biomarker work found similar post-race rises in markers of kidney stress, gut-barrier injury, and muscle damage when men and women were compared head-to-head. Where patterns diverge more often is in hydration risk (exercise-associated hyponatremia), absolute muscle-enzyme levels linked to lean mass, iron and menstrual-cycle context, and the simple fact that cardiac marathon research still studies far more men than women.",
      },
      {
        question: "How long until kidneys and blood markers settle?",
        answer:
          "Many kidney and muscle-related markers peak around finish and begin falling within about a day, though some stay above baseline longer. A 2025 kidney-biomarker meta-analysis describes several recovery patterns. Feeling wiped for a few days is common; dark urine that won't clear, severe swelling, confusion, or chest symptoms are not 'tough it out' signals.",
      },
      {
        question: "Should I drink as much water as possible on race day?",
        answer:
          "No. Overdrinking relative to sweat loss is the main driver of exercise-associated hyponatremia. Drink to thirst in most conditions, practice your plan, and include sodium with fluids when racing long in heat. Persistent nausea, headache, confusion, or weight gain mid-race is a medical-tent problem — not a 'one more cup' problem.",
      },
      {
        question: "Is a marathon dangerous for a healthy heart?",
        answer:
          "For screened, trained adults, finishing a marathon is usually a large but temporary stress, not automatic permanent damage. Acute biomarker and echo shifts are expected; their long-term meaning is still being studied. People with known heart disease, unexplained symptoms, or sudden family cardiac history should talk with a clinician before building toward 26.2.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** A full marathon is a controlled (if dramatic) physiological stress test. This guide summarizes what recent journals measure in blood, urine, and imaging after 42.195 km — it is not clearance to race, a diagnosis of organ damage, or a substitute for care. Chest pain, fainting, severe vomiting, confusion, seizures, inability to pee, or one-sided swelling need clinical attention.",
          "Finish photo: euphoria. Finish bloodwork (when researchers sample it): often a temporary storm of heart-muscle enzymes, kidney stress markers, gut-barrier proteins, and creatine kinase from battered legs. That gap between how heroic the medal feels and how noisy the lab looks is why this post exists.",
          "We'll walk system by system, then zoom into **men vs women** where the evidence is strongest — and be honest where science still under-samples female runners.",
        ],
      },
      {
        id: "big-picture",
        heading: "The big picture: temporary overload, not instant permanent failure",
        paragraphs: [
          "A marathon stacks hours of high cardiac output, thousands of impact cycles, reduced gut blood flow, sweating, inflammation, and glycogen drain. Lab markers rise because tissue is stressed and membranes leak proteins into blood or urine — not because every finisher is having a silent heart attack or irreversible kidney failure.",
          "In trained runners, many of those spikes trend back toward baseline over hours to a few days. The clinical problem is knowing **your** red flags: symptoms that don't match \"tired and sore,\" rare complications like symptomatic hyponatremia, and people with underlying disease who shouldn't treat social media recovery checklists as medical clearance.",
        ],
        list: [
          "Heart muscle markers and pump-function shifts are common and usually transient in healthy adults",
          "Skeletal muscle damage and soreness often peak 24–72 hours later (DOMS window)",
          "Kidney and gut biomarkers jump post-race; many resolve around 24 hours, some linger",
          "Hydration mistakes go both ways: under-drink in heat vs over-drink into low blood sodium",
        ],
      },
      {
        id: "heart",
        heading: "Heart: biomarkers, temporary pump changes, and what imaging adds",
        paragraphs: [
          "A 2026 systematic review and meta-analysis in *BMJ Open Sport & Exercise Medicine* pooled road-marathon studies of healthy adults (search through April 2025; 69 studies qualitatively, 49 with meta-analysis). Immediately after racing, circulating **troponin T**, **troponin I**, and **NT-proBNP** rose on average by roughly **+42**, **+77**, and **+114 ng/L** respectively — often past cutoffs clinicians use when evaluating possible myocardial injury or heart-failure distress in other settings ([Laily et al., 2026](https://doi.org/10.1136/bmjsem-2026-003201)).",
          "Echo and MRI pieces of that same synthesis showed modest, short-term shifts: left-ventricular filling and some right-ventricular systolic measures can look different post-race, with right-ventricular volumes often larger, while cardiac MRI in the pooled set did **not** paint a picture of classic infarct-style structural injury. Authors are clear: whether these responses are purely adaptive \"extreme exercise physics\" or early warning signs in susceptible people still needs better long-term, more diverse studies.",
          "An earlier marathon-only meta-analysis similarly found high-sensitivity troponin I and T elevated after 42 km, with hs-cTnT typically back near baseline by about **72–96 hours** ([Li et al., 2023](https://pubmed.ncbi.nlm.nih.gov/37248881/)).",
        ],
        subsections: [
          {
            heading: "Men and women — cardiac caveats",
            paragraphs: [
              "Most marathon heart papers still enroll far more men than women (often **>70–80% male** cohorts in pooled analyses). Laily and colleagues' meta-regression found that the size of biomarker and echo responses **varied with age, sex, training status, and marathon finish time** — sex is a real modifier of *how the signal looks*, not proof that women's hearts are \"safer\" or \"weaker.\"",
              "Practical takeaway: don't compare your post-race wearable HR or one random ED troponin to a friend's Strava. Compare symptoms to your usual recovery. Women deserve the same red-flag seriousness for chest pain, syncope, or unexplained breathlessness — under-representation in studies is a research problem, not a reason to shrug off symptoms.",
            ],
          },
        ],
        cta: {
          text: "Heart metrics for runners (plain English)",
          href: "/blog/train-runners-heart-metrics",
        },
      },
      {
        id: "muscle",
        heading: "Muscle and tendons: why you limp on Tuesday",
        paragraphs: [
          "Every landing is an eccentric load on calves, quads, and hips. After a downhill-heavy course, creatine kinase (CK) and myoglobin commonly spike; soreness often lags a day or two. That is microtrauma and inflammation doing their loud job — usually compatible with recovery if you sleep, eat protein and carbs, and don't double your mileage next weekend.",
          "At the 2024 Boston Marathon, researchers sampled nearly even numbers of men and women and saw large post-race rises in CK and other organ-stress markers ([McKenna et al., 2025](https://pubmed.ncbi.nlm.nih.gov/41101781/)). Critically for this post: **biological sex did not meaningfully change** the size of those muscle-damage or organ-stress biomarker jumps in that cohort.",
        ],
        list: [
          "**Men:** often higher absolute lean mass → higher absolute CK ceilings are common in exercise studies generally; compare to *your* baseline, not a lab's \"normal\" for a sedentary desk worker",
          "**Women:** similar relative marathon muscle/organ biomarker stress in the Boston sex-balanced sample; absolute enzyme numbers may look lower when muscle mass is lower — that does not mean \"no damage\"",
          "True rhabdomyolysis with kidney failure risk is uncommon in recreational marathons but more concerning with extreme heat, crush-level soreness, cola-colored urine, and confusion — get checked",
        ],
        closingParagraphs: [
          "Connective tissue still argues for weeks of respect after the race even when blood looks quieter. See [post-run recovery](/blog/post-run-recovery) and [first-full marathon training](/blog/training-first-full-marathon).",
        ],
      },
      {
        id: "kidneys",
        heading: "Kidneys: stress markers shoot up — then usually calm down",
        paragraphs: [
          "Reduced kidney blood flow during prolonged hard effort, heat, NSAIDs, and muscle breakdown byproducts can all stress renal tubules. A 2025 systematic review and meta-analysis of marathon AKI-related biomarkers concluded that most measured markers rise significantly right after the race, with several recovery patterns over the next 24 hours — some still elevated, some falling, a few dipping below baseline ([Leucuța et al., 2025](https://pubmed.ncbi.nlm.nih.gov/41155766/)).",
          "Boston 2024 field data again: AKI-pathway markers rose post-race, and **sex and hydration category did not erase those rises** — staying \"not severely dehydrated\" did not fully cancel the stress signal ([McKenna et al., 2025](https://pubmed.ncbi.nlm.nih.gov/41101781/)).",
        ],
        list: [
          "Rising creatinine or urinary stress markers after a marathon are common research findings — they are not automatic clinical CKD diagnoses",
          "Men often have higher baseline creatinine because of more muscle mass; that affects *interpretation* of a single number",
          "Women can still meet KDIGO-style creatinine *rise* criteria; don't assume \"lower baseline = no stress\"",
          "Skip improvising high-dose NSAIDs for \"race-day inflammation\" — bad combo with kidney stress and gut irritation",
        ],
      },
      {
        id: "gut",
        heading: "Gut: barrier leaks and porta-potty urgency",
        paragraphs: [
          "Blood is preferentially routed to working muscle and skin; the gut can temporarily become a low-priority organ. Markers of intestinal-barrier injury (such as I-FABP) jumped after Boston alongside kidney and muscle markers, again **without a clear male–female split** in that study. Subjective GI symptoms also looked similar across sexes there.",
          "Practice what you'll drink and gel in training. Race-day gut chaos is often fuel novelty + intensity + heat stacking — not mysterious \"weak stomach destiny.\" Details: [runner's GI distress](/blog/runners-gi-distress).",
        ],
      },
      {
        id: "fluids",
        heading: "Fluids and sodium: the sex difference that keeps showing up",
        paragraphs: [
          "Exercise-associated hyponatremia (EAH) — low blood sodium during or soon after long exercise — is the fluid complication that matters most on race weekend. Mayo Clinic's hyponatremia primer covers the general medical picture ([hyponatremia](https://www.mayoclinic.org/diseases-conditions/hyponatremia/symptoms-causes/syc-20373711)); marathon-specific reviews put prevalence of laboratory or symptomatic EAH in a broad ballpark historically cited around **~7–15%** in some race sampling contexts, with severe encephalopathy rare but real ([Klingert et al., 2022](https://pubmed.ncbi.nlm.nih.gov/36431252/)).",
          "A landmark Boston Marathon study found hyponatremia associated with **weight gain** (overdrinking), **slower finish times**, and BMI extremes — and in multivariate analysis **sex dropped out** once race time and body size were accounted for ([Almond et al., 2005](https://pubmed.ncbi.nlm.nih.gov/15814880/)).",
        ],
        subsections: [
          {
            heading: "Why women still get special coaching notes",
            paragraphs: [
              "Field reports and narrative marathon reviews still often list **female sex** among person-related EAH risk signals — partly because smaller body size, longer time on course for many recreational fields, and a tendency (in some samples) to drink more relative to sweat loss can stack the math. Hormones across the menstrual cycle can also influence water handling.",
              "So: women are not \"doomed,\" and men are not \"immune.\" Women (and slower finishers of any sex) should be extra wary of forced gallon-chugging plans. Drink to thirst in typical cool–mild conditions, practice sodium with fluids when sweating hard, and treat weight *gain* during the race as a warning — not a hydration success story. More: [hydration & electrolytes](/blog/hydration-electrolytes-running).",
            ],
          },
          {
            heading: "Men-specific fluid/muscle notes",
            paragraphs: [
              "Men more often finish faster on average and sweat larger absolute volumes when heavier — dehydration and heat illness still matter. Higher absolute muscle mass can also mean louder absolute CK after the same course. Neither makes \"drink until you slosh\" smart.",
            ],
          },
        ],
      },
      {
        id: "women-men-summary",
        heading: "Men vs women: a practical scorecard",
        paragraphs: [
          "Same distance, shared systems — overlapping stress patterns with a few coaching accents.",
        ],
        subsections: [
          {
            heading: "Where sex looked similar (recent field data)",
            list: [
              "Post-Boston rises in kidney stress, gut-barrier, and muscle-damage biomarkers — no clear male/female difference in McKenna et al., 2025",
              "GI symptom reports similar across sexes in that sample",
              "Staying euhydrated did not fully prevent organ-stress biomarker rises for either sex",
            ],
          },
          {
            heading: "Where coaching still differs",
            list: [
              "**Women:** prioritize EAH prevention (don't overdrink); track iron if fatigue is outsized; respect menstrual-cycle/REDs context if cycles vanish in the build ([women's running guide](/blog/running-guide-for-women); [REDs](/blog/reds-low-energy-availability-runners))",
              "**Men:** don't treat higher absolute CK or \"I always crush NSAIDs\" as toughness — kidneys and gut get the bill",
              "**Both:** cardiac research is male-skewed — take symptoms seriously; aged masters of either sex may show different biomarker/echo magnitude per Laily meta-regression",
            ],
          },
        ],
      },
      {
        id: "timeline",
        heading: "A rough recovery timeline (healthy finishers)",
        list: [
          "**0–6 hours:** biomarkers noisy; walk, dry clothes, carbs + protein, sip — don't chug liters for sport",
          "**6–48 hours:** legs peak sore; sleep debt hits; many kidney markers falling in research cohorts",
          "**48–96 hours:** cardiac troponin patterns in marathon meta-analyses often settling toward baseline in the measured window",
          "**1–3 weeks:** gradual return to easy volume; hold off on hammer sessions until sleep and mood feel normal",
        ],
        closingParagraphs: [
          "Hitting the wall mid-race is mostly fuel and pacing — different problem than organ labs, same solution sheet: practice. See [why you hit the wall](/blog/hitting-the-wall-marathon).",
        ],
      },
      {
        id: "red-flags",
        heading: "Red flags — leave the \"it's just a marathon\" cope at home",
        list: [
          "Chest pain, pressure, jaw/arm radiation, fainting, or new irregular heartbeat sensation",
          "Confusion, seizures, severe headache, or vomiting with known big fluid intake (possible EAH emergency)",
          "Cola-colored urine, inability to pee, extreme swelling, or crippling muscle pain out of proportion",
          "Fever, breathlessness at rest, or symptoms that worsen after the first day",
        ],
        paragraphs: [
          "If you have known heart disease, hypertension on complex meds, prior myocarditis, or a scary family cardiac history, get individualized clearance before the build — Mayo's framing on exercise with chronic conditions is a sane starting point for that conversation ([exercise & chronic disease](https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise-and-chronic-disease/art-20046049)).",
        ],
      },
      {
        id: "bottom",
        heading: "Bottom line",
        paragraphs: [
          "A full marathon temporarily turns up biomarkers of heart, muscle, kidney, and gut stress in healthy adults. Newer syntheses (including 2025–2026 heart and kidney metas and sex-balanced Boston sampling) say those rises are expected; imaging usually doesn't show infarct-style injury; and **sex often matters less for lab organ stress than blogs claim** — except where fluid-sodium risk and incomplete female cardiac sampling deserve stronger coaching language.",
          "Train for the distance, practice fuel and drink-to-thirst, recover like the race counted, and treat dramatic symptoms as medicine — not motivational content.",
        ],
        cta: {
          text: "Browse free marathon-capable plans",
          href: "/plan",
        },
      },
    ],
  },
];
