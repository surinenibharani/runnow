import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Bone,
  CalendarDays,
  HeartPulse,
  MoreHorizontal,
  Pill,
  Shirt,
} from "lucide-react";

export type WomenRunnerIllustrationId =
  | "bone-health"
  | "pelvic-floor"
  | "pregnancy"
  | "menstrual-cycle"
  | "breast-support";

export type WomenRunnerConcernSection = {
  heading: string;
  items: string[];
};

export type WomenRunnerConcernLink = {
  label: string;
  href: string;
};

export type WomenRunnerConcern = {
  id: string;
  navLabel: string;
  icon: LucideIcon;
  area: string;
  title: string;
  intro?: string;
  symptoms: string;
  symptomsList?: string[];
  avoid: string[];
  fix: string[];
  extraSections?: WomenRunnerConcernSection[];
  seeSpecialist: string[];
  quote?: string;
  callout?: string;
  illustration?: WomenRunnerIllustrationId;
  readMore?: WomenRunnerConcernLink[];
};

export const womenRunnerPageIntro = {
  whyUnique:
    "Women runners face distinct risks tied to hormonal fluctuations, lower peak bone density on average, pelvic anatomy, and pregnancy or postpartum history — not because you're fragile, but because training advice written for a generic body often skips these realities.",
  disclaimer:
    "This page is educational, not medical advice. See your doctor, OB-GYN, or a women's health / sports physiotherapist when symptoms persist or you're unsure.",
};

export const womenRunnerNavSections = [
  { id: "red-s-bone-health", label: "RED-S & Bone Health" },
  { id: "pelvic-floor", label: "Pelvic Floor" },
  { id: "pregnancy-postpartum", label: "Pregnancy & Postpartum" },
  { id: "menstrual-cycle", label: "Menstrual Cycle" },
  { id: "osteoporosis-risk", label: "Bone Health (Perimenopause+)" },
  { id: "breast-health", label: "Breast Health & Support" },
  { id: "hormonal-contraceptives", label: "Hormonal Contraceptives" },
  { id: "other-common-issues", label: "Other Common Issues" },
] as const;

export const womenRunnerConcerns: WomenRunnerConcern[] = [
  {
    id: "red-s-bone-health",
    navLabel: "RED-S & Bone Health",
    icon: Bone,
    area: "Bone health / energy",
    title: "RED-S and stress fractures",
    intro:
      "Relative Energy Deficiency in Sport (RED-S) happens when training outpaces fueling — intentionally or not. The older term Female Athlete Triad (low energy, menstrual dysfunction, low bone density) describes part of the same picture and is still used in some medical settings.",
    symptoms:
      "Lost or irregular periods, persistent fatigue, frequent illness, or recurring bone pain — often alongside training hard and eating too little.",
    symptomsList: [
      "Hair thinning or increased shedding",
      "Feeling cold when others don't (cold intolerance)",
      "Mood changes, irritability, or low motivation",
      "Poor sleep quality despite being exhausted",
      "Slow recovery between runs — legs feel heavy for days",
      "Stress fractures or bone pain that worsens with impact",
    ],
    avoid: [
      "Cutting calories while adding mileage — intentional or accidental under-fueling drives RED-S",
      "Treating a missed period as proof you're training hard enough — it's often the opposite",
      "Stacking hard weeks back-to-back without recovery",
      "Ignoring bone pain because your pace is improving — stress fractures can build silently",
    ],
    fix: [
      "Eat enough to fuel runs and daily life — not just on workout days; rest days need full meals",
      "Track period changes when mileage or intensity jumps",
      "Reduce training load and prioritize nutrition before pushing mileage again",
      "See a doctor if your period stops or becomes irregular while training hard — don't wait months to ask",
      "Address iron levels if you're tired despite sleep (common with heavy periods)",
      "Cross-train while bone pain heals — see stress fractures on the main injuries page",
      "A sports dietitian can help if under-fueling is hard to spot on your own",
    ],
    extraSections: [
      {
        heading: "Practical fueling awareness",
        items: [
          "Most active women need roughly 1,800–2,400+ kcal/day depending on size and training — under-eating by even 300–500 kcal daily adds up over weeks",
          "Pre-run (60–90 min before): banana + peanut butter, toast with jam, or yogurt with granola",
          "Post-run (within 1–2 hours): protein + carbs — chocolate milk, eggs on toast, or a balanced meal with rice/pasta and vegetables",
          "Rest days still need full meals — this is when your body repairs bone and tissue",
        ],
      },
      {
        heading: "Estrogen and bone loss",
        items: [
          "Estrogen helps maintain bone density — when periods stop or become irregular from low energy, bone turnover can outpace rebuilding",
          "Young runners with RED-S can lose bone density that takes years to recover even after eating enough again",
          "This is why a missed period plus bone pain is a red flag, not something to push through",
        ],
      },
    ],
    seeSpecialist: [
      "Missed periods, stress fracture suspicion, or unexplained fatigue — see your GP or sports medicine doctor",
      "Pinpoint bone pain that worsens with running — imaging may be needed",
      "History of disordered eating or repeated stress injuries — ask about a full RED-S workup",
    ],
    illustration: "bone-health",
    readMore: [
      {
        label: "REDs & underfueling deep dive",
        href: "/blog/reds-low-energy-availability-runners",
      },
      { label: "Stress fracture deep dive", href: "/blog/stress-fracture-running" },
      { label: "Women's running guide", href: "/blog/running-guide-for-women" },
    ],
  },
  {
    id: "pelvic-floor",
    navLabel: "Pelvic Floor",
    icon: HeartPulse,
    area: "Pelvic floor",
    title: "Pelvic floor dysfunction",
    intro:
      "Many women experience some leakage when they first return to running. This is common but not something you have to accept long-term. Most improve significantly with 8–12 weeks of guided pelvic floor physical therapy.",
    symptoms:
      "Urinary leakage, pelvic pressure, or discomfort when you run — especially on downhills, speed work, or after pregnancy. More common than most people admit, and often improvable.",
    symptomsList: [
      "Pain during or after running (pelvic, lower back, or hip)",
      "Incomplete emptying of bladder or bowels",
      "Constipation or straining that worsens symptoms",
      "Lower back pain linked to core or pelvic weakness",
      "Heaviness or bulging sensation in the vaginal area",
    ],
    avoid: [
      'Skip the "just run through it" mindset — leaking is a signal, not a badge of effort',
      "Build volume gradually after pregnancy — cardio fitness returns faster than pelvic support",
      "Stay hydrated, but don't chug right before a hard interval session",
      "During perimenopause and menopause, lower estrogen can thin pelvic tissue — gradual loading matters more",
    ],
    fix: [
      "Book a pelvic floor physiotherapist — gold standard for runners",
      "Reduce bounce-heavy days (long downhills, sprint repeats) until symptoms improve",
      "Core and breath work from a physio often beats random Kegel apps",
      "Wear a high-support sports bra and consider compression shorts for extra core/pelvic feedback on impact days",
    ],
    extraSections: [
      {
        heading: "At-home awareness (while waiting for physio)",
        items: [
          "Elevator breathing: inhale and let the belly relax; exhale slowly and gently lift the pelvic floor (like stopping gas, not squeezing hard)",
          "Gentle pelvic tilts lying on your back — 10 slow reps, focus on breath not force",
          "Notice when you leak — coughing, landing, or fatigue at end of run — share this pattern with your physio",
          "Avoid constant gripping — over-tight pelvic floors can cause pain too",
        ],
      },
      {
        heading: "Gear that helps",
        items: [
          "High-support sports bra — less upper-body bounce reduces downward pressure (see our gear guide for shirts & bras)",
          "Compression shorts or leggings for mild support and chafing prevention",
          "Light liners on impact days if needed — temporary, not a long-term fix",
        ],
      },
    ],
    seeSpecialist: [
      "Leakage on most runs, pelvic heaviness, or bulging sensation — pelvic floor physio",
      "Symptoms started or worsened after childbirth — get clearance before high mileage",
      "Pain with intercourse, bowel changes, or prolapse symptoms — GP or women's health physio",
      "No improvement after 8–12 weeks of guided exercises — ask for reassessment",
    ],
    quote:
      "I leaked for months until I saw a pelvic physio — I thought it was just part of being a mom who runs. It wasn't. Eight weeks of proper rehab changed everything.",
    illustration: "pelvic-floor",
    readMore: [
      { label: "Women's running guide", href: "/blog/running-guide-for-women" },
      { label: "Sports bras & apparel", href: "/gear#shirts" },
      { label: "Chafing prevention", href: "/gear#chafing-creams" },
    ],
  },
  {
    id: "pregnancy-postpartum",
    navLabel: "Pregnancy & Postpartum",
    icon: Baby,
    area: "Pregnancy / postpartum",
    title: "Pregnancy and postpartum return to run",
    intro:
      "Your body needs a different timeline than your Strava history. Clearance from your OB or midwife comes first — then rebuild impact gradually.",
    symptoms:
      'Pubic or pelvic girdle pain, calf swelling, dizziness, diastasis recti (abdominal separation), or feeling "not ready" despite old fitness levels.',
    avoid: [
      "Get OB or midwife clearance before running during pregnancy or postpartum",
      "Don't compare your comeback pace to pre-pregnancy PRs in month one",
      "Stop for contractions, bleeding, dizziness, calf swelling, or sharp pelvic pain",
      "Avoid long periods flat on your back after the first trimester — use incline treadmill or side-lying strength instead",
    ],
    fix: [
      "Use the talk test — most easy running stays conversational if cleared to run",
      "Shorter, flatter runs; walk-run is fine and smart",
      "Postpartum: rebuild walk-run before continuous miles; hills come later",
      "Cross-train (swim, bike) if impact symptoms flare",
    ],
    extraSections: [
      {
        heading: "During pregnancy",
        items: [
          "Many active women run into the second trimester with clearance — intensity and duration usually decrease",
          "Monitor heart rate with the talk test rather than a fixed number (unless your provider gives specific limits)",
          "Hydrate before, during (if long), and after — blood volume increases and overheating risk rises",
          "Modify core work: avoid heavy crunches and long supine exercises after the first trimester",
        ],
      },
      {
        heading: "Postpartum timeline",
        items: [
          "Minimum 6 weeks before any impact — often 8–12+ weeks depending on delivery type and healing",
          "Vaginal birth: pelvic floor assessment before high mileage; start with walking, then run-walk",
          "C-section: longer recovery for abdominal incision — core healing before speed or hills; ask when scar tissue is safe for impact",
          "A good rule of thumb: walk 30–45 minutes comfortably and do basic core exercises without pain or bulging before run-walk intervals",
        ],
      },
      {
        heading: "Diastasis recti",
        items: [
          "Abdominal separation is common after pregnancy — a doming or bulge along the midline during core work is a warning sign",
          "Avoid sit-ups, planks, and heavy lifting until assessed — many women need specific rehab before returning to impact",
          "A women's health physio can check gap width and guide safe progression",
        ],
      },
      {
        heading: "Breastfeeding considerations",
        items: [
          "Feed or pump before running if full breasts are uncomfortable — high-support, adjustable sports bras are essential",
          "Extra fluid and calories: breastfeeding adds roughly 300–500 kcal/day — under-fueling affects energy and milk supply",
          "Hydrate consistently; some women notice softer tissue and need bra adjustment as supply stabilizes",
        ],
      },
    ],
    seeSpecialist: [
      "Any pregnancy red flags — contact your provider immediately",
      "Pubic symphysis pain (SPD) that limits walking — physio with pregnancy experience",
      "Postpartum leakage, heaviness, or diastasis concerns — pelvic floor physio before ramping mileage",
      "C-section incision pain, redness, or separation after 6 weeks — see your provider",
    ],
    callout:
      "A good rule of thumb: You should be able to walk for 30–45 minutes comfortably and do basic core exercises without pain or bulging before progressing to run-walk intervals.",
    illustration: "pregnancy",
    readMore: [
      { label: "Pregnancy & health conditions tips", href: "/tips/specific-situations" },
      { label: "Running with health conditions", href: "/blog/running-with-health-conditions" },
    ],
  },
  {
    id: "menstrual-cycle",
    navLabel: "Menstrual Cycle",
    icon: CalendarDays,
    area: "Cycle & training",
    title: "Menstrual cycle and training",
    intro:
      "Energy, recovery, and motivation can shift across your cycle. Tracking how you feel for 2–3 months beats fighting every sluggish day or forcing hard sessions when your body wants rest.",
    symptoms:
      "Some women feel strongest mid-cycle (follicular phase); others feel sluggish, crampy, or bloated before and during menstruation. Both patterns are normal — the goal is adjustment, not cancellation.",
    avoid: [
      "Assuming every bad run means you're unfit — check where you are in your cycle",
      "Skipping fuel on heavy flow days — iron loss can add to fatigue",
      "Ignoring severe pain, flooding, or cycles shorter than 21 or longer than 35 days without medical review",
    ],
    fix: [
      "Menstruation (days 1–5): favor easy runs, walk-run, or rest; heat pads and hydration help cramps",
      "Follicular phase (after period): often a good window for intervals, tempo, or strength focus",
      "Luteal phase (before next period): reduce intensity if needed; prioritize sleep and protein",
      "Keep a simple log: cycle day + how the run felt — patterns emerge quickly",
    ],
    extraSections: [
      {
        heading: "Practical adjustments",
        items: [
          "Plan key workouts for mid-cycle if that's when you consistently feel best",
          "Use extra rest days without guilt during menstruation — consistency over months matters more than one week",
          "Consider iron-rich foods (lean red meat, lentils, spinach) if periods are heavy",
        ],
      },
    ],
    seeSpecialist: [
      "Severe cramps that don't respond to basic care or stop you from daily activities",
      "Very heavy bleeding (soaking through hourly) or cycles that suddenly change",
      "Missing periods while not pregnant — see RED-S section above",
    ],
    illustration: "menstrual-cycle",
    readMore: [
      { label: "Women's running guide — cycle section", href: "/blog/running-guide-for-women#menstrual-cycle" },
    ],
  },
  {
    id: "osteoporosis-risk",
    navLabel: "Bone Health (Perimenopause+)",
    icon: Bone,
    area: "Perimenopause / menopause",
    title: "Bone health and osteoporosis risk",
    intro:
      "Especially relevant for perimenopausal and menopausal runners: estrogen decline accelerates bone loss. Running helps only when impact is appropriate for your bone density.",
    symptoms:
      "Fractures from minor falls, height loss, back pain, or a known low bone density (osteopenia/osteoporosis) diagnosis.",
    avoid: [
      "Assuming running alone prevents osteoporosis — nutrition and strength training matter equally",
      "High-impact jumping or uneven trails if you've been told you have low bone density",
      "Ignoring recurrent stress fractures after 40 — may signal bone health needs assessment",
    ],
    fix: [
      "Ask your doctor about a DEXA scan if you're perimenopausal, postmenopausal, or have fracture history",
      "Calcium from food (dairy, fortified plant milks, leafy greens) — supplements only if recommended",
      "Vitamin D — many adults are deficient; blood test before megadosing",
      "Strength training 2× per week: squats, lunges, deadlifts (loaded) build bone as well as muscle",
      "Balance work reduces fall risk on trails",
    ],
    seeSpecialist: [
      "Diagnosed osteopenia or osteoporosis — ask whether running impact is safe for your T-score",
      "Fracture from a fall that seemed minor",
      "HRT or bone medication questions — endocrinologist or GP with menopause expertise",
    ],
    readMore: [
      {
        label: "Bone health for masters runners",
        href: "/blog/bone-health-masters-runners",
      },
      {
        label: "Running through menopause",
        href: "/blog/running-through-menopause",
      },
      { label: "RED-S & bone health (above)", href: "#red-s-bone-health" },
    ],
  },
  {
    id: "breast-health",
    navLabel: "Breast Health & Support",
    icon: Shirt,
    area: "Breast health / support",
    title: "Breast health and support",
    intro:
      "Proper support reduces pain, bounce-related fatigue, and chafing — and lets you focus on the run instead of adjusting straps every kilometre.",
    symptoms:
      "Breast pain during or after runs, skin irritation under bands or straps, or concern about new lumps or persistent pain unrelated to exercise.",
    avoid: [
      "Running in a low-support bra for long or fast sessions — ligament strain (Cooper's ligaments) can cause lasting discomfort",
      "Cotton bras that hold sweat and cause chafing under the band",
      "Ignoring a new lump, skin change, or nipple discharge — unrelated to normal running soreness",
    ],
    fix: [
      "Get fitted or use brand sizing guides — encapsulation bras for larger cup sizes, compression for smaller",
      "Replace sports bras when elasticity fades (often every 6–12 months of regular use)",
      "Apply anti-chafe balm to band lines, underarms, and nipples on long runs",
      "Rinse or change out of wet bras quickly to prevent skin irritation",
    ],
    extraSections: [
      {
        heading: "When to worry (not just chafing)",
        items: [
          "New lump that doesn't go away after your period",
          "Persistent one-sided pain not linked to exercise intensity",
          "Skin dimpling, nipple inversion, or discharge — see your GP promptly",
          "Routine screening follows national guidelines for your age — running doesn't replace mammograms",
        ],
      },
    ],
    seeSpecialist: [
      "Any breast change that concerns you — GP first; don't wait for it to 'settle'",
      "Chronic breast pain despite proper bra fit — women's health clinic",
    ],
    illustration: "breast-support",
    readMore: [
      { label: "Sports bras & apparel", href: "/gear#shirts" },
      { label: "Chafing creams", href: "/gear#chafing-creams" },
      { label: "Women's running guide", href: "/blog/running-guide-for-women" },
    ],
  },
  {
    id: "hormonal-contraceptives",
    navLabel: "Hormonal Contraceptives",
    icon: Pill,
    area: "Hormones / contraception",
    title: "Hormonal contraceptives and training",
    intro:
      "Birth control affects hormones differently — some women notice no change; others see shifts in energy, weight, or bleeding patterns that affect training.",
    symptoms:
      "Unexpected fatigue, breakthrough bleeding on run days, mood changes after starting a new method, or loss of period on certain pills (not always a concern — but worth discussing).",
    avoid: [
      "Assuming all methods affect you the same — track how you feel for 2–3 months after any change",
      "Ignoring heavy breakthrough bleeding or severe mood changes without talking to your prescriber",
    ],
    fix: [
      "Combined pill: some women feel bloated or sluggish on active pills — adjust hard workout timing if needed",
      "Progestin-only (mini-pill, implant, hormonal IUD): irregular bleeding is common early on; usually stabilizes",
      "Depo injection: may affect bone density with long-term use — discuss with doctor if you're a high-mileage runner",
      "Copper IUD: no hormones — cycle patterns usually stay natural; heavier periods possible",
    ],
    seeSpecialist: [
      "Side effects that affect quality of life or training after 3 months on a new method",
      "Questions about bone health and long-term hormonal contraception — GP or gynecologist",
    ],
    readMore: [
      { label: "Women's running guide", href: "/blog/running-guide-for-women" },
      { label: "RED-S & periods", href: "#red-s-bone-health" },
    ],
  },
  {
    id: "other-common-issues",
    navLabel: "Other Common Issues",
    icon: MoreHorizontal,
    area: "General",
    title: "Other issues women runners ask about",
    intro:
      "Not every ache is gender-specific — but these come up often alongside the sections above.",
    symptoms:
      "IT band pain, runner's knee, shin splints, or feeling overwhelmed by conflicting advice online.",
    avoid: [
      "Blaming 'being a woman' for every injury — many issues are load-management problems anyone can get",
      "Stacking fixes from five different Instagram accounts without professional guidance",
    ],
    fix: [
      "See the main injuries page for shin splints, runner's knee, IT band, plantar fasciitis, and Achilles issues",
      "If multiple symptoms overlap (fatigue + missed period + bone pain), prioritize RED-S assessment first",
      "One trusted provider beats a dozen unverified tips — start with GP, sports physio, or women's health specialist",
    ],
    seeSpecialist: [
      "Pain that changes your gait, worsens over days, or keeps returning at the same mileage",
      "Multiple overlapping symptoms — ask for a coordinated workup rather than treating each in isolation",
    ],
    readMore: [
      { label: "All running injuries", href: "/injuries" },
      { label: "Beginner tips", href: "/tips" },
      { label: "Bad weather alternatives", href: "/tips/bad-weather" },
    ],
  },
];

export const womenRunnerOverwhelmedBox = {
  title: "When everything feels overwhelming",
  body: "Pick one step: book a GP or physio appointment, pause mileage increases for two weeks, and use a simple walk-run plan until you have answers. You don't need to fix RED-S, pelvic floor, and postpartum recovery all at once.",
  links: [
    { label: "Start a gentle plan", href: "/plan/5k-8w" },
    { label: "Talk to your doctor first", href: "/tips/specific-situations" },
  ],
};

export function getWomenRunnerConcernBySlug(slug: string) {
  return womenRunnerConcerns.find((concern) => concern.id === slug);
}

export const womenRunnerConcernSlugs = womenRunnerConcerns.map((c) => c.id);
