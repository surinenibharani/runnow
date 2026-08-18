import type { BlogFaqItem } from "@/lib/blog/types";

export type HubEditorial = {
  intro: string[];
  faqs: BlogFaqItem[];
  howTo: {
    name: string;
    description: string;
    steps: { name: string; text: string; url?: string }[];
  };
};

export const tipsHubEditorial: HubEditorial = {
  intro: [
    "Most beginner running advice is either a 40-minute lecture or a slogan. This hub is the middle: one idea per card, grouped by what you're actually stuck on — pace, shoes, rest, weather, or the voice that says you're behind.",
    "Start with Getting started if you have never jogged on purpose. Use Scheduling when life keeps eating the run. Open Recovery before you add a fourth day. Bad-weather and health-situation guides live in their own sections because those answers are longer than a card.",
    "Nothing here replaces a clinician. If pain is sharp, one-sided, or changing how you walk, skip the tip and use the injury hub.",
  ],
  faqs: [
    {
      question: "Where should a complete beginner start on this page?",
      answer:
        "Open Getting started, then take the Start here quiz. The walk-first 16-week plan is the right ramp if jogging still feels like too much. Tips are reminders — the plan is the calendar.",
    },
    {
      question: "Do I need to read every tip before I run?",
      answer:
        "No. Read Slow down, Rest days, and Shoes before gadgets. Come back when a specific problem shows up: stitches, missed weeks, dark roads, or sore legs.",
    },
    {
      question: "How is this different from the blog?",
      answer:
        "Tips are short and scannable. Blog posts are the full argument with sources. Many tips link to the matching article when you want the why, not just the what.",
    },
  ],
  howTo: {
    name: "How to use LetsRunNow tips as a beginner",
    description:
      "Pick the topic you're stuck on, read one card, then put the next run on a plan.",
    steps: [
      {
        name: "Name the problem",
        text: "Pace, shoes, rest, weather, or motivation — jump to that group instead of scrolling everything.",
        url: "/tips#getting-started",
      },
      {
        name: "Read one card",
        text: "Each tip is a single action. If you want the research or a longer walkthrough, open the linked article.",
      },
      {
        name: "Put it on a plan",
        text: "Tips don't schedule themselves. Use Start here so the next run is already on your week.",
        url: "/start",
      },
    ],
  },
};

export const gearHubEditorial: HubEditorial = {
  intro: [
    "You do not need a kit. You need shoes that fit and a reason to leave the house. Everything else on this page is optional until a real problem shows up: heat, chafing, dark roads, or a watch you actually want.",
    "We list products as examples of a category, not as a store. Prices move. Fit matters more than a model name. If a running shop can watch you jog in the hallway, that beats any list on the internet — including this one.",
    "Start Here is the honest beginner kit. Level Up is for people who already run and are solving a specific annoyance. Skip the upgrade aisle until the habit survives a month.",
  ],
  faqs: [
    {
      question: "What gear do I actually need for week one?",
      answer:
        "A pair of running shoes that don't hot-spot in the first mile, and clothes you can sweat in. A phone with a free tracking app is enough. Skip the watch, vest, and carbon plate.",
    },
    {
      question: "When should I replace running shoes?",
      answer:
        "Often between 300 and 500 miles, or sooner if the midsole feels dead, the outsole is worn smooth under the ball of the foot, or old niggles return after a shoe change you didn't make. Miles beat calendar age.",
    },
    {
      question: "Are these affiliate rankings?",
      answer:
        "No. Suggestions are examples of what to look for in a category. We are not paid to rank a brand here. Confirm current models in a store or on the maker's site.",
    },
  ],
  howTo: {
    name: "How to buy beginner running gear without overspending",
    description:
      "Buy shoes first, add the rest only when a real need shows up.",
    steps: [
      {
        name: "Fit the shoes",
        text: "Shop late in the day, leave a thumb of toe room, and jog in the store if they'll let you. Comfort in the first mile beats a lab award.",
        url: "/gear#shoes",
      },
      {
        name: "Wear what you already own",
        text: "Skip cotton if it soaks and chafes. A cheap synthetic shirt and shorts are enough for couch-to-5K weather.",
        url: "/blog/what-to-wear-running",
      },
      {
        name: "Add one thing at a time",
        text: "Anti-chafe, a cap, or a vest only after the problem appears. Don't kit out for a marathon you haven't signed up for.",
        url: "/gear#start-here",
      },
    ],
  },
};

export const injuriesHubEditorial: HubEditorial = {
  intro: [
    "Beginner injuries are usually a load error: too much, too soon, too little rest, or shoes that should have been retired. This hub names the common ones, shows what they feel like, and points to a strength tip plus how to ease the plan — not a diagnosis.",
    "Open a condition for prevention, recovery, and red flags. Women- and men-specific concerns (pelvic floor, REDs, heart symptoms, groin pain) live on their own pages because the advice is not one-size.",
    "Educational only. Sharp pain, swelling, numbness, night pain, or a limp that lasts more than a few days belongs with a clinician or sports physiotherapist — not another internet checklist.",
  ],
  faqs: [
    {
      question: "Sore vs injured — how do I tell?",
      answer:
        "Muscle soreness that eases as you warm up and fades in 48–72 hours is common after new work. Pain that is sharp, pinpoint on bone, worse as the run goes on, or that changes your walk is a stop-and-assess signal. When unsure, skip the run and get checked.",
    },
    {
      question: "Should I rest completely or cross-train?",
      answer:
        "If walking is calm, cycling or swimming can keep the habit without the same impact. If walking hurts, rest the tissue and see someone. Don't replace missed runs with extra jogging later in the week.",
    },
    {
      question: "What's the fastest way to prevent beginner injuries?",
      answer:
        "Three run days, easy pace you can talk through, rest days that stay rest, and strength twice a week for hips and calves. Most shin and knee niggles start when those four slip.",
    },
  ],
  howTo: {
    name: "What to do when something hurts while running",
    description:
      "A simple sequence for beginners: stop the damage, name the pattern, ease the plan, get help if red flags show.",
    steps: [
      {
        name: "Stop if it's sharp or changing your gait",
        text: "Walk it in. Don't finish the interval. Pain that makes you limp is not a toughness test.",
      },
      {
        name: "Match the feeling to a condition",
        text: "Use the cards below for shin, knee, IT band, plantar, Achilles, or bone-stress patterns — then open the full guide.",
        url: "/injuries#shin-splints",
      },
      {
        name: "Ease the plan, add strength, don't catch up",
        text: "Cut volume. Keep rest days. Do the related strength tip. Resume the next scheduled easy run — never stacked missed miles.",
        url: "/tips/missed-a-week-dont-double-up",
      },
    ],
  },
};

export const womenInjuriesHubEditorial: HubEditorial = {
  intro: [
    "Training advice written for a generic body often skips what changes for women: energy availability, bone, pelvic floor, pregnancy and postpartum, cycle, and support. This hub is the map — each topic has prevention, recovery, and specialist red flags.",
    "Start with RED-S and bone if periods have gone missing or fatigue is out of proportion to the plan. Open pelvic floor if you leak, heave, or feel pressure. Pregnancy and postpartum is a medical conversation first, then a graded return.",
    "Educational only. Missed periods, pelvic-floor symptoms, or pregnancy questions belong with a clinician — not another internet checklist.",
  ],
  faqs: [
    {
      question: "Why is there a separate injuries hub for women?",
      answer:
        "Not because women are fragile — because generic plans skip energy availability, bone, pelvic floor, pregnancy, and breast support. Those change training decisions.",
    },
    {
      question: "Is a missed period a sign I'm training well?",
      answer:
        "Usually the opposite. Lost or irregular periods with hard training can signal low energy availability and higher bone-stress risk. Get it checked; don't treat it as a badge.",
    },
    {
      question: "Can I keep running with light pelvic-floor leaking?",
      answer:
        "Leaking is a signal to get assessed, not a reason to push hills and speed. A pelvic-floor physio can often help. Don't assume it's 'just what happens after kids' forever.",
    },
  ],
  howTo: {
    name: "How to use the women runner injury hub",
    description:
      "Match the symptom to a topic, ease the plan, and get help when red flags show.",
    steps: [
      {
        name: "Name the pattern",
        text: "Energy and bone, pelvic floor, pregnancy or postpartum, cycle, or support — open that card instead of scrolling every condition.",
        url: "/injuries/for-women-runners",
      },
      {
        name: "Ease load before you add miles",
        text: "Most of these issues worsen when you stack hard weeks. Rest days and enough food are treatment, not optional extras.",
        url: "/start",
      },
      {
        name: "Use the specialist list",
        text: "If a red flag matches, book the visit. This hub is education, not a diagnosis.",
      },
    ],
  },
};

export const menInjuriesHubEditorial: HubEditorial = {
  intro: [
    "Men's beginner injuries get sold as toughness problems. Often they are load, fueling, or a heart-and-groin pattern that generic 'just run more' advice misses. This hub covers RED-S without periods as a clue, chest symptoms, groin and core, overtraining, and heat.",
    "Chest pain, fainting, or new palpitations while running are stop-and-get-checked — not a hydration tweak. Groin pain that you cannot cough without noticing is not a hip flexor stretch night.",
    "Educational only. New chest symptoms, blood in urine, or pain that changes how you walk belongs with a clinician.",
  ],
  faqs: [
    {
      question: "Do men get RED-S?",
      answer:
        "Yes. Low energy availability happens without a missed period to advertise it. Persistent fatigue, low libido, repeated bone niggles, and 'disciplined' under-eating while mileage climbs are the usual tells.",
    },
    {
      question: "When is chest discomfort an emergency?",
      answer:
        "New chest pain, pressure, fainting, or unexplained breathlessness during or after a run needs urgent medical care. Don't diagnose it as fitness on the internet.",
    },
    {
      question: "Can I run through groin pain?",
      answer:
        "Not if coughing, sitting up, or changing direction lights it up. That's a physio or sports-medicine visit, not another easy jog to 'loosen it.'",
    },
  ],
  howTo: {
    name: "How to use the men runner injury hub",
    description:
      "Match the symptom, stop for red flags, and ease the plan instead of stacking missed miles.",
    steps: [
      {
        name: "Rule out emergencies first",
        text: "Chest pain, fainting, or sudden severe symptoms are a medical visit, not a foam-roll session.",
        url: "/injuries/for-men-runners",
      },
      {
        name: "Match the topic",
        text: "Fueling, heart, groin, overtraining, or heat — open that guide for prevention and recovery, not a generic rest-forever slogan.",
      },
      {
        name: "Keep rest days as rest",
        text: "Don't catch up missed runs. Resume the next easy day as written.",
        url: "/tips/missed-a-week-dont-double-up",
      },
    ],
  },
};
