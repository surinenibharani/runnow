import type { LucideIcon } from "lucide-react";
import {
  Bone,
  Brain,
  Droplets,
  Flame,
  HeartPulse,
  MoreHorizontal,
  Shield,
  Sun,
} from "lucide-react";

export type MenRunnerConcernSection = {
  heading: string;
  items: string[];
};

export type MenRunnerConcernLink = {
  label: string;
  href: string;
};

export type MenRunnerConcern = {
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
  extraSections?: MenRunnerConcernSection[];
  seeSpecialist: string[];
  quote?: string;
  callout?: string;
  readMore?: MenRunnerConcernLink[];
};

export const menRunnerPageIntro = {
  whyUnique:
    "Men starting or returning to running face distinct risks too — higher average cardiovascular burden in middle age, groin and core issues from weak abdominals, RED-S that often goes unrecognized without period tracking, and a culture that rewards pushing through pain. None of that makes you fragile; it means generic advice can miss what matters for your body.",
  disclaimer:
    "This page is educational, not medical advice. See your doctor, cardiologist, urologist, or sports physiotherapist when symptoms persist or you're unsure.",
};

export const menRunnerNavSections = [
  { id: "red-s-fueling", label: "RED-S & Fueling" },
  { id: "heart-chest", label: "Heart & Chest" },
  { id: "groin-core", label: "Groin & Core" },
  { id: "overtraining-hormones", label: "Overtraining & Hormones" },
  { id: "prostate-urinary", label: "Prostate & Urinary (40+)" },
  { id: "heat-hydration", label: "Heat & Hydration" },
  { id: "mental-health", label: "Mental Health" },
  { id: "other-common-issues", label: "Other Common Issues" },
] as const;

export const menRunnerConcerns: MenRunnerConcern[] = [
  {
    id: "red-s-fueling",
    navLabel: "RED-S & Fueling",
    icon: Bone,
    area: "Energy / bone health",
    title: "RED-S and under-fueling in men",
    intro:
      "Relative Energy Deficiency in Sport (RED-S) isn't only a women's issue. When training outpaces calories and recovery, men can develop low energy availability (LEA) — with stress fractures, illness, and hormonal suppression even though there's no period to track.",
    symptoms:
      "Unexplained fatigue, frequent colds, plateau or drop in performance, recurring bone pain, low libido, or irritability — often alongside eating less to 'lean out' for racing.",
    symptomsList: [
      "Stress fractures or shin pain that keeps returning at similar mileage",
      "Low morning energy despite sleeping 7–8 hours",
      "Loss of sex drive or erectile changes during heavy training blocks",
      "Mood swings, anxiety, or feeling flat between runs",
      "Getting sick every time you add a hard week",
      "Dizziness or lightheadedness on easy runs",
    ],
    avoid: [
      "Cutting calories aggressively while mileage climbs — 'race weight' goals often backfire",
      "Skipping post-run meals because you're 'not hungry yet'",
      "Assuming fatigue is weakness — RED-S in men is under-diagnosed because there's no obvious cycle signal",
      "Stacking two hard weeks without a recovery week",
    ],
    fix: [
      "Eat enough on rest days — repair happens when you're not running",
      "Add a recovery week (30–40% less volume) every 3–4 weeks when building mileage",
      "See a sports medicine doctor if bone pain, libido changes, and fatigue cluster together",
      "A sports dietitian can quantify energy needs if you're unsure you're eating enough",
    ],
    extraSections: [
      {
        heading: "Practical fueling for men",
        items: [
          "Many active men need 2,400–3,200+ kcal/day depending on size and training — under-eating by 500 kcal daily adds up fast",
          "Pre-run (60–90 min): toast with peanut butter, banana, or a small bowl of oatmeal",
          "Post-run (within 1–2 hours): protein + carbs — eggs on toast, chicken and rice, or a recovery shake",
          "Don't rely on coffee to replace breakfast before morning runs",
        ],
      },
      {
        heading: "Bone health without estrogen cues",
        items: [
          "Men don't lose periods as a warning sign — stress fractures may be the first red flag",
          "Vitamin D, calcium, and adequate protein support bone remodeling during high-mileage blocks",
          "Strength training 2× per week loads bone in ways running alone doesn't",
        ],
      },
    ],
    seeSpecialist: [
      "Recurring stress fractures or bone pain that worsens with impact",
      "Cluster of fatigue, low libido, and performance drop — ask about RED-S / LEA workup",
      "History of disordered eating or compulsive weight cutting for racing",
    ],
    quote:
      "I thought I was just getting old at 28. Turns out I was under-fueling by about 800 calories a day. Once I ate like an athlete, my shin pain cleared and my easy pace dropped 30 seconds.",
    readMore: [
      { label: "Men's running guide", href: "/blog/running-guide-for-men" },
      { label: "Nutrition basics", href: "/blog/nutrition-basics-for-beginners" },
    ],
  },
  {
    id: "heart-chest",
    navLabel: "Heart & Chest",
    icon: HeartPulse,
    area: "Cardiovascular",
    title: "Chest pain and heart symptoms while running",
    intro:
      "Running is one of the best things you can do for heart health — but new or unusual chest symptoms during exercise deserve immediate attention. Men have higher average cardiovascular risk in middle age, and 'tough it out' culture delays care.",
    symptoms:
      "Chest pressure, tightness, or pain during or after runs; unusual shortness of breath for the pace; dizziness; palpitations; or pain radiating to jaw, arm, or back.",
    symptomsList: [
      "Chest discomfort that starts during exertion and eases with rest",
      "Feeling like you can't get a full breath on easy pace",
      "Heart racing or skipping beats that feel new",
      "Lightheadedness or near-fainting, especially in heat",
      "Family history of early heart attack (before 55 in men) — know your numbers even if you feel fine",
    ],
    avoid: [
      "Running through new chest pain to 'see if it passes'",
      "Starting high-intensity training after years off without a check-up if you're 40+ or have risk factors",
      "Ignoring blood pressure — hypertension is common and silent",
      "Assuming you're too young — inherited conditions and stimulant use can affect younger runners too",
    ],
    fix: [
      "Stop immediately if chest pain is new, severe, or paired with nausea or arm pain — call emergency services",
      "Book a pre-participation check with your GP if you're 40+, have diabetes, smoke, or have family history",
      "Build aerobic base gradually — most cardiac events in runners involve sudden intensity spikes in deconditioned people",
      "Know resting heart rate trends — a sustained jump can signal illness or overtraining",
    ],
    extraSections: [
      {
        heading: "Risk factors worth discussing with your doctor",
        items: [
          "High blood pressure, high LDL cholesterol, or type 2 diabetes",
          "Smoking or vaping — even occasional use affects vascular health",
          "Obstructive sleep apnea — snoring, daytime sleepiness, and hard training don't mix well untreated",
          "Stimulant pre-workouts or high caffeine before hard efforts if you have palpitations",
        ],
      },
      {
        heading: "Screening for men 40+ returning to running",
        items: [
          "Blood pressure, lipids, and fasting glucose — baseline before big mileage jumps",
          "Discuss family history and whether an exercise stress test is appropriate",
          "Waist circumference and weight trends — metabolic health matters for endurance",
        ],
      },
    ],
    seeSpecialist: [
      "Any new chest pain during exercise — emergency care first, then cardiology follow-up",
      "Unexplained breathlessness at easy pace after you've been running consistently",
      "Palpitations with dizziness, fainting, or chest tightness",
      "Strong family history — ask about screening before marathon training",
    ],
    callout:
      "Sudden cardiac death in runners is rare but real. Most events involve undiagnosed heart disease, inherited conditions (even in fit-looking runners), or jumping from sedentary to maximal effort too fast.",
    readMore: [
      { label: "Men's running guide — heart section", href: "/blog/running-guide-for-men#heart-health" },
      { label: "Health conditions tips", href: "/tips/specific-situations" },
    ],
  },
  {
    id: "groin-core",
    navLabel: "Groin & Core",
    icon: Shield,
    area: "Groin / abdomen",
    title: "Groin strains, sports hernia, and core weakness",
    intro:
      "Sudden sprints, hills, and weak deep core muscles load the groin and lower abdominal wall. Sports hernia (athletic pubalgia) and adductor strains are common in men returning to sport or ramping speed work too fast.",
    symptoms:
      "Sharp groin pain with acceleration or cutting motions; dull ache in lower abs after runs; pain coughing or sneezing; or one-sided testicular ache that doesn't improve with rest.",
    symptomsList: [
      "Pain at the pubic bone or inner thigh when pushing off",
      "Tenderness in lower abs — not just the groin itself",
      "Pain that worsens with sit-ups or coughing",
      "Testicular pain or swelling — always get this checked promptly",
      "Nipple chafing or bleeding on long runs (common, preventable)",
    ],
    avoid: [
      "Sprinting or hill repeats before your easy base feels solid",
      "Only running for 'core work' — planks and dead bugs protect the groin chain",
      "Ignoring testicular pain or swelling — torsion is rare but urgent",
      "Running in cotton shirts on long runs without nipple protection",
    ],
    fix: [
      "Relative rest: cross-train (bike, pool) while groin pain settles — don't test it every run",
      "Gradual return: walk-run, then flat easy miles, then hills last",
      "Adductor and hip strengthening — Copenhagen planks, side lunges, banded abduction",
      "For nipple chafing: tape, nipple guards, or anti-chafe balm before long runs",
    ],
    extraSections: [
      {
        heading: "Supportive gear",
        items: [
          "Supportive briefs or compression shorts if bouncing causes discomfort",
          "Well-fitted running shorts — seams that rub the inner thigh cause groin-adjacent issues",
          "See the gear guide for anti-chafe products and shirt fabrics",
        ],
      },
      {
        heading: "When it's not just a strain",
        items: [
          "Sports hernia often doesn't show on standard imaging — sports medicine or pelvic specialist assessment helps",
          "Inguinal hernia: visible bulge in groin with lifting or straining — surgeon consult before heavy training",
          "Chronic groin pain beyond 6–8 weeks needs structured rehab, not repeated cortisone shots alone",
        ],
      },
    ],
    seeSpecialist: [
      "Sudden severe testicular pain or swelling — emergency evaluation",
      "Groin pain lasting more than 2–3 weeks despite rest",
      "Visible bulge in groin or scrotum when standing or straining",
      "Pain that returns every time you add speed — sports physio or sports medicine doctor",
    ],
    readMore: [
      { label: "Men's running guide — gear", href: "/blog/running-guide-for-men#gear" },
      { label: "Bodyweight strength", href: "/blog/bodyweight-strength-for-runners" },
    ],
  },
  {
    id: "overtraining-hormones",
    navLabel: "Overtraining & Hormones",
    icon: Flame,
    area: "Recovery / hormones",
    title: "Overtraining, low testosterone, and ego miles",
    intro:
      "Men often measure progress in weekly mileage and pace — but chronic overload suppresses testosterone, raises cortisol, and breaks sleep before you notice a formal 'injury.'",
    symptoms:
      "Persistent heaviness on easy runs, needing more sleep but waking unrested, loss of motivation, irritability, or libido drop during peak training.",
    symptomsList: [
      "Resting heart rate elevated 5–10 bpm above your normal for a week+",
      "Easy pace feels hard despite consistent training",
      "Night sweats or broken sleep during heavy blocks",
      "Loss of morning erections or reduced libido (non-specific but worth noting with other signs)",
      "Minor injuries stacking — calf, Achilles, knee — without a single clear cause",
    ],
    avoid: [
      "Adding miles because a training partner runs more than you",
      "Skipping rest days to 'make up' for a bad week",
      "Racing every weekend while also building base mileage",
      "Using soreness as a badge — chronic soreness is a load problem",
    ],
    fix: [
      "Schedule recovery weeks before you feel broken — every 3–4 weeks, cut volume 30–40%",
      "One full rest day per week minimum; two if you're over 40 and new to running",
      "Sleep 7–9 hours — poor sleep disrupts testosterone and recovery hormones",
      "If symptoms persist 3+ weeks after a deload, see sports medicine for blood work (testosterone, ferritin, thyroid)",
    ],
    extraSections: [
      {
        heading: "Smarter progression",
        items: [
          "10% weekly mileage increase is a ceiling, not a target — many men do better at 5%",
          "Hard days hard, easy days truly easy — most miles should feel conversational",
          "Strength train 2× per week — it supports hormones and injury resilience",
        ],
      },
    ],
    seeSpecialist: [
      "Libido loss, erectile dysfunction, and fatigue together during training — GP or endocrinology",
      "Overtraining symptoms that don't improve after 2 weeks of reduced load",
      "Repeated illness or injury every time you peak — sports medicine review",
    ],
    quote:
      "I kept adding Sunday long runs because Strava said I was 'behind.' My doctor ran labs — ferritin was tanked and testosterone was low-normal. A deload month fixed more than any new shoe.",
    readMore: [
      { label: "Avoiding injuries", href: "/blog/avoiding-injuries" },
      { label: "Training plans", href: "/plan" },
    ],
  },
  {
    id: "prostate-urinary",
    navLabel: "Prostate & Urinary (40+)",
    icon: Droplets,
    area: "Urinary / prostate",
    title: "Prostate issues and urinary symptoms for runners",
    intro:
      "Benign prostatic hyperplasia (BPH) becomes common in men over 50 — but urinary frequency and urgency can affect runners earlier. Planning routes with bathroom access beats suffering through long runs.",
    symptoms:
      "Needing to urinate frequently or urgently on runs; weak stream; feeling you can't fully empty; or getting up multiple times at night — then feeling dehydrated because you cut fluids.",
    symptomsList: [
      "Stopping every mile to pee on a route you used to complete uninterrupted",
      "Hesitancy at the start of urination",
      "Dribbling after finishing",
      "Blood in urine — always urgent medical evaluation",
      "Pelvic pain with urination — infection or other cause needs assessment",
    ],
    avoid: [
      "Severely restricting fluids before runs — dehydration hurts performance and kidneys",
      "Ignoring blood in urine or sudden inability to urinate",
      "Assuming it's 'just age' without a GP visit — treatable conditions exist",
      "Heavy caffeine before long runs if it triggers urgency",
    ],
    fix: [
      "Plan loops past restrooms for long runs until symptoms are managed",
      "Void before you leave; avoid chugging a liter right before heading out",
      "Discuss symptoms with your GP — medications and lifestyle changes help many men",
      "Evening fluid timing: taper large drinks 2–3 hours before bed if nocturia disrupts sleep and recovery",
    ],
    extraSections: [
      {
        heading: "Running with managed symptoms",
        items: [
          "Many men run marathons with treated BPH — work with your urologist on timing of meds",
          "Trail runners: know your route — woods options aren't always available",
          "Winter layers make quick stops harder — plan shorter loops in cold months if needed",
        ],
      },
    ],
    seeSpecialist: [
      "Blood in urine, fever with urinary symptoms, or severe pain",
      "Complete inability to urinate — emergency care",
      "New urinary symptoms in your 40s–50s — GP or urologist for prostate exam and discussion",
      "Family history of prostate cancer — discuss screening timing with your doctor",
    ],
    readMore: [
      { label: "Men's running guide — 40+", href: "/blog/running-guide-for-men#age-and-return" },
      { label: "Specific situation tips", href: "/tips/specific-situations" },
    ],
  },
  {
    id: "heat-hydration",
    navLabel: "Heat & Hydration",
    icon: Sun,
    area: "Heat / fluids",
    title: "Heat, sweat rate, and hydration mistakes",
    intro:
      "On average, men have higher muscle mass and sweat rates than women — which helps cooling but increases fluid and sodium losses. Hyponatremia from over-drinking plain water is a real race-day risk too.",
    symptoms:
      "Headache, nausea, confusion, or muscle cramps in hot weather; weighing much less after long runs; or bloated feeling from chugging water without electrolytes.",
    symptomsList: [
      "Salt crust on skin or stinging eyes from sweat",
      "Cramping in calves or hamstrings late in hot runs",
      "Dark urine or minimal urination despite drinking",
      "Swelling in hands or fingers from over-hydration",
      "Performance cliff in heat that doesn't match fitness",
    ],
    avoid: [
      "First hot-weather long run at full winter pace — heat acclimation takes 1–2 weeks",
      "Only drinking water on runs over 90 minutes — sodium matters",
      "Alcohol the night before a summer long run",
      "Running midday in peak heat when you're new — go early or late",
    ],
    fix: [
      "Acclimate: shorten pace and distance for the first week of real heat",
      "Drink to thirst on most runs — for 90+ min in heat, use electrolytes or sports drink",
      "Weigh yourself before/after occasional long runs to estimate sweat loss (rough guide only)",
      "Cool down with shade, cold towel on neck, and fluids with sodium after hot efforts",
    ],
    extraSections: [
      {
        heading: "Practical hydration",
        items: [
          "Pre-run: 400–600 ml water in the 2 hours before; stop if you're sloshing",
          "During: 150–250 ml every 15–20 min in heat on runs over an hour — adjust to thirst",
          "Post-run: rehydrate over hours, not minutes — include sodium from food or electrolyte mix",
        ],
      },
    ],
    seeSpecialist: [
      "Confusion, fainting, or vomiting during or after hot runs — emergency care (heat stroke)",
      "Recurrent cramping despite electrolytes — discuss with sports medicine or GP",
    ],
    readMore: [
      { label: "Bad weather tips", href: "/tips/bad-weather" },
      { label: "Nutrition basics", href: "/blog/nutrition-basics-for-beginners" },
    ],
  },
  {
    id: "mental-health",
    navLabel: "Mental Health",
    icon: Brain,
    area: "Mental health",
    title: "Performance pressure and 'push through' culture",
    intro:
      "Men are less likely to seek help for anxiety, depression, and burnout — but running can both help and hide problems when every bad day becomes a willpower test.",
    symptoms:
      "Dreading runs you used to enjoy; comparing yourself constantly on apps; mood crashes after missed workouts; or using mileage to punish yourself for work or life stress.",
    symptomsList: [
      "Irritability when a run is cancelled — disproportionate to the event",
      "Secretly running through pain to hit weekly totals",
      "Social isolation — skipping friends/family to log miles",
      "Identity fully tied to pace or race results",
      "Sleep or appetite changes alongside training stress",
    ],
    avoid: [
      "Using alcohol to 'recover' from hard weeks — it disrupts sleep and mood",
      "Letting Strava segments define self-worth",
      "Treating rest as failure",
      "Ignoring persistent low mood because 'exercise is supposed to fix it'",
    ],
    fix: [
      "Run with a group sometimes — accountability without comparison",
      "Take planned off-weeks after goal races — mental reset matters",
      "Talk to a GP or therapist if low mood lasts 2+ weeks — exercise helps but isn't always enough",
      "Keep one run per week purely for joy — no watch, no pace target",
    ],
    extraSections: [
      {
        heading: "Healthy relationship with training",
        items: [
          "A bad run is data, not a verdict on your character",
          "Consistency over years beats hero weeks — the tortoise wins",
          "Build the habit first — see beginner tips for walk-run structure without obsessing over pace",
        ],
      },
    ],
    seeSpecialist: [
      "Persistent depression, anxiety, or thoughts of self-harm — crisis lines and mental health services",
      "Disordered eating or compulsive exercise patterns — specialized support helps",
      "Burnout that doesn't improve after 2 weeks off — sports psychologist or therapist",
    ],
    quote:
      "I thought quitting the track workout made me soft. Taking a walk-run week actually got me to the start line — the all-or-nothing thing was the problem, not my legs.",
    readMore: [
      { label: "Men's running guide", href: "/blog/running-guide-for-men" },
      { label: "Beginner tips", href: "/tips" },
    ],
  },
  {
    id: "other-common-issues",
    navLabel: "Other Common Issues",
    icon: MoreHorizontal,
    area: "General",
    title: "Other issues men runners ask about",
    intro:
      "Not every ache is gender-specific — but these stack often with the sections above, especially when load jumps too fast.",
    symptoms:
      "Achilles pain, plantar fasciitis, shin splints, or knee pain that flares when ego miles meet weak calves.",
    avoid: [
      "Blaming age for every niggle at 35 — load management fixes many issues",
      "Buying a new shoe for every pain without addressing cadence and strength",
      "Copying a 20-year-old's plan from Reddit",
    ],
    fix: [
      "See the main injuries page for Achilles, plantar fasciitis, shin splints, runner's knee, and IT band",
      "If chest symptoms plus fatigue cluster, prioritize heart assessment before adding miles",
      "Calf raises and hip strength 2× weekly — cheap insurance for Achilles and knees",
    ],
    seeSpecialist: [
      "Pain that changes your gait or worsens over consecutive runs",
      "Multiple overlapping issues — ask for coordinated assessment rather than treating each alone",
    ],
    readMore: [
      { label: "All running injuries", href: "/injuries" },
      { label: "Women runner health", href: "/injuries/for-women-runners" },
      { label: "Men's running guide", href: "/blog/running-guide-for-men" },
    ],
  },
];

export const menRunnerOverwhelmedBox = {
  title: "When everything feels overwhelming",
  body: "Pick one step: book a GP or physio visit, pause mileage increases for two weeks, and use a simple walk-run plan until you have answers. You don't need to fix heart worries, groin pain, and hydration all at once.",
  links: [
    { label: "Start a gentle plan", href: "/plan?plan=5k-8w" },
    { label: "Health & situation tips", href: "/tips/specific-situations" },
  ],
};

export function getMenRunnerConcernBySlug(slug: string) {
  return menRunnerConcerns.find((concern) => concern.id === slug);
}

export const menRunnerConcernSlugs = menRunnerConcerns.map((c) => c.id);
