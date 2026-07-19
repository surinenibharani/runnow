import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Bone,
  HeartPulse,
  Shield,
  User,
  Users,
  Wind,
  Activity,
} from "lucide-react";
import { slugifyTipTitle, type TipIllustrationId } from "@/lib/tips/tips";

export type SituationalTip = {
  slug: string;
  icon: LucideIcon;
  illustration: TipIllustrationId;
  audience: string;
  title: string;
  tips: string[];
  caution: string;
};

export const situationalTips: SituationalTip[] = [
  {
    slug: slugifyTipTitle("Running while pregnant"),
    icon: Baby,
    illustration: "pregnancy",
    audience: "Pregnancy",
    title: "Running while pregnant",
    tips: [
      "Get clearance from your OB or midwife before running — especially if you have a high-risk pregnancy, placenta issues, or bleeding.",
      "Many active people can keep running into the second trimester if they already ran before pregnancy; intensity and duration usually decrease over time.",
      "Use the talk test: you should be able to hold a conversation. Stop if you feel pain, dizziness, chest tightness, calf swelling, or contractions.",
      "Stay cool and hydrated. Overheating is a real risk — prefer morning runs, shade, and breathable layers.",
      "After delivery, return gradually. Pelvic floor recovery matters; walking and strength work often come before running again.",
    ],
    caution:
      "Pregnancy is highly individual. What felt fine last week may not be appropriate this week — follow medical guidance over any training plan.",
  },
  {
    slug: slugifyTipTitle("Starting or continuing in your 50s and beyond"),
    icon: User,
    illustration: "senior",
    audience: "Age 55+",
    title: "Starting or continuing in your 50s and beyond",
    tips: [
      "You can build fitness at any age. Progress may be slower than in your 20s, but consistency still wins.",
      "Prioritize easy pace and extra recovery — many runners 55+ do best on 3 run days with walk breaks when needed.",
      "Strength training 2× per week (glutes, hips, calves, core) protects joints and improves balance.",
      "Warm up longer: 8–10 minutes of brisk walking before jogging reduces injury risk.",
      "Invest in well-cushioned shoes and replace them before they feel dead (often every 300–400 miles).",
    ],
    caution:
      "If you have not been active recently, or you have heart disease risk factors, ask your doctor before starting a new program.",
  },
  {
    slug: slugifyTipTitle("Running safely in your 60s and beyond"),
    icon: Users,
    illustration: "senior",
    audience: "Age 65+",
    title: "Running safely in your 60s and beyond",
    tips: [
      "Walking-first or walk-run plans are excellent entry points — there is no shame in building slowly.",
      "Fall prevention matters: run on even surfaces, good lighting, and consider routes with fewer trip hazards.",
      "Keep most effort easy. Hard intervals and big mileage jumps are rarely necessary for health benefits.",
      "Balance and mobility work (single-leg stands, ankle circles, gentle yoga) support confident running.",
      "Listen to joint feedback the next day, not just during the run. Persistent pain means back off and get assessed.",
    ],
    caution:
      "Bone density, balance, and medications can change how your body responds to exercise. Medical clearance is wise before a new running routine.",
  },
  {
    slug: slugifyTipTitle("Running with type 1 or type 2 diabetes"),
    icon: Activity,
    illustration: "health",
    audience: "Diabetes",
    title: "Running with type 1 or type 2 diabetes",
    tips: [
      "Talk to your care team about exercise timing, especially if you use insulin or sulfonylureas — hypoglycemia risk rises with activity.",
      "Check blood glucose before and after runs until you learn your patterns. Carry fast-acting carbs (glucose tabs, juice).",
      "Morning runs before breakfast affect glucose differently than post-meal runs — note what works for you.",
      "Wear medical ID and tell someone your route on longer sessions.",
      "Foot care matters: inspect feet after runs; moisture-wicking socks and proper shoes reduce blister and ulcer risk.",
    ],
    caution:
      "Do not run with very high or very low blood sugar. Your diabetes plan should override any generic training schedule.",
  },
  {
    slug: slugifyTipTitle("Running with asthma"),
    icon: Wind,
    illustration: "breathing",
    audience: "Asthma",
    title: "Running with asthma",
    tips: [
      "Confirm an action plan with your doctor — know when to use a rescue inhaler and whether to pre-treat before exercise.",
      "Cold, dry air triggers many people. Breathe through a buff or mask in winter; warm up indoors when possible.",
      "Pollen and air-quality alerts matter. Treadmill or indoor days beat pushing through bad air.",
      "Start runs slower than you think you need; many asthma flares come from going out too fast.",
      "Stop immediately for chest tightness, wheezing that does not ease with your plan, or lightheadedness.",
    ],
    caution:
      "Exercise-induced bronchospasm is manageable for many runners, but uncontrolled asthma needs medical treatment first.",
  },
  {
    slug: slugifyTipTitle("Running with arthritis or chronic joint issues"),
    icon: Bone,
    illustration: "health",
    audience: "Arthritis & joint pain",
    title: "Running with arthritis or chronic joint issues",
    tips: [
      "Osteoarthritis does not always mean you must stop running — many people run with mild OA on softer surfaces and lower volume.",
      "Rheumatoid arthritis and active flares may require rest or cross-training instead of impact — follow rheumatology advice.",
      "Avoid big weekly mileage jumps. Pain that lingers more than 48 hours after a run is a signal to reduce load.",
      "Strength work for hips and quads often improves knee comfort more than stretching alone.",
      "Consider run-walk intervals, trails, or a track with consistent surface instead of cambered roads.",
    ],
    caution:
      "Sharp pain, swelling, or locking joints need evaluation — do not run through structural injury symptoms.",
  },
  {
    slug: slugifyTipTitle("Running with heart disease or hypertension"),
    icon: HeartPulse,
    illustration: "health",
    audience: "Heart & blood pressure",
    title: "Running with heart disease or hypertension",
    tips: [
      "Cardiac clearance is essential if you have had a heart attack, stent, arrhythmia, heart failure, or uncontrolled high blood pressure.",
      "Easy, conversational pace is usually the right default until a cardiologist or rehab program says otherwise.",
      "Some blood pressure medications affect heart rate — perceived effort and watch zones may not match generic formulas.",
      "Stop for chest pressure, arm or jaw pain, unusual shortness of breath, or irregular heartbeat.",
      "Build volume slowly. Many cardiac rehab graduates return to running with walk-run progressions over months.",
    ],
    caution:
      "This is general education, not cardiac rehab. Follow your physician's exercise prescription if you have one.",
  },
  {
    slug: slugifyTipTitle("Running with low bone density"),
    icon: Shield,
    illustration: "health",
    audience: "Osteoporosis",
    title: "Running with low bone density",
    tips: [
      "Weight-bearing activity can help bone health, but high-impact running may not suit everyone with osteoporosis or prior fractures.",
      "Ask your doctor whether impact is safe for your T-score and fracture history — brisk walking or hiking may be better options.",
      "If cleared to run, stay on predictable surfaces; trail roots and ice increase fall and fracture risk.",
      "Balance training and hip strength reduce fall risk, which matters more than pace.",
      "Ensure adequate calcium, vitamin D, and protein as part of your overall bone-health plan.",
    ],
    caution:
      "Vertebral or hip fracture history usually requires individualized guidance before returning to impact sports.",
  },
];
