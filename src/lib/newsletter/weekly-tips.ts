import { slugifyTipTitle } from "@/lib/tips/tips";

export type NewsletterTip = {
  slug: string;
  category: string;
  /** Funny hook for email subject and heading */
  headline: string;
  /** Plain summary of the tip */
  title: string;
  content: string;
  blogSlug?: string;
  href?: string;
};

function tip(
  category: string,
  headline: string,
  title: string,
  content: string,
  link?: { blogSlug?: string; href?: string }
): NewsletterTip {
  return {
    slug: slugifyTipTitle(title),
    category,
    headline,
    title,
    content,
    blogSlug: link?.blogSlug,
    href: link?.href,
  };
}

/** Tips used only for weekly subscriber emails — kept separate from the on-site tips page. */
export const newsletterWeeklyTips: NewsletterTip[] = [
  tip(
    "Getting Started",
    "Walking isn't quitting — it's a strategic regroup",
    "Walk breaks are part of the plan",
    "If you need to walk during a run, you're not failing — you're training smart. Couch-to-5K is built on run/walk intervals. The walk is recovery, not quitting.",
    { blogSlug: "how-to-pace-yourself" }
  ),
  tip(
    "Pacing",
    "If you're gasping, you're cosplaying a sprinter",
    "Run slow enough to chat",
    "The talk test is your best free coach: you should be able to say a full sentence without gasping. If you can't, slow down or add a short walk break.",
    { blogSlug: "how-to-pace-yourself" }
  ),
  tip(
    "Pacing",
    "Your snail pace is secretly leveling up",
    "Your easy pace will get faster",
    "Don't chase speed in your first few months. Build the habit at an easy effort first. As your aerobic base grows, the same heart rate will carry you farther and faster.",
    { href: "/plan" }
  ),
  tip(
    "Gear",
    "Your shoes need a day off too",
    "Rotate two pairs of shoes",
    "If you run most days, alternating two pairs lets the foam recover between runs. It can extend shoe life and reduce injury risk from worn-out cushioning.",
    { blogSlug: "choosing-running-shoes" }
  ),
  tip(
    "Gear",
    "Dead shoes are not 'character building'",
    "Replace shoes before they feel dead",
    "Most daily trainers last 300–500 miles. Track rough mileage or watch for flattened cushioning and new aches. Old shoes are a common cause of shin and knee pain.",
    { blogSlug: "choosing-running-shoes" }
  ),
  tip(
    "Gear",
    "You'll regret that puffy coat by mile two",
    "Dress like it's 10°F warmer",
    "You'll heat up within the first 10 minutes. Light layers you can tie around your waist beat a heavy jacket you'll want to ditch halfway through.",
    { href: "/tips/bad-weather" }
  ),
  tip(
    "Hydration",
    "Your water bottle works overtime — not just on run day",
    "Drink through the day, not just on runs",
    "Sip water steadily from morning onward. For runs under an hour in mild weather, plain water before and after is usually enough — no sports drink required.",
    { blogSlug: "nutrition-for-runners" }
  ),
  tip(
    "Hydration",
    "Step on the scale — sweat counts (sort of)",
    "Weigh yourself after hot runs",
    "If you lose more than 2% of body weight on a run, you may be under-hydrating. Rehydrate gradually over the next few hours, not all at once.",
    { blogSlug: "nutrition-basics-for-beginners" }
  ),
  tip(
    "Nutrition",
    "Don't run on fumes and regret",
    "Eat something light 1–2 hours before",
    "A banana, toast, or small bowl of oatmeal gives energy without stomach trouble. Experiment on easy days — race morning is the wrong time to test new foods.",
    { blogSlug: "nutrition-basics-for-beginners" }
  ),
  tip(
    "Nutrition",
    "Chocolate milk: officially a recovery food",
    "Refuel within an hour after harder runs",
    "A mix of carbs and a little protein helps recovery — chocolate milk, yogurt with fruit, or a normal balanced meal all work. You don't need fancy supplements.",
    { blogSlug: "nutrition-for-runners" }
  ),
  tip(
    "Recovery",
    "Naps are cross-training for grown-ups",
    "Sleep is your secret training tool",
    "Most adaptation happens while you rest. Aim for 7–9 hours when you can. A short night after a hard run is when niggles turn into injuries.",
    { blogSlug: "what-to-do-on-rest-days" }
  ),
  tip(
    "Recovery",
    "Couch mode: also part of the program",
    "Rest days are not lazy days",
    "Easy walking, gentle stretching, or yoga on rest days keeps blood flowing without loading your legs. Complete couch days are fine too — listen to your body.",
    { blogSlug: "what-to-do-on-rest-days" }
  ),
  tip(
    "Recovery",
    "Ow vs. OW — learn the alphabet",
    "Soreness vs. pain — know the difference",
    "Muscle soreness 24–48 hours after a run is normal. Sharp pain, limping, or pain that gets worse as you run is a stop sign. When in doubt, rest and reassess.",
    { href: "/injuries" }
  ),
  tip(
    "Form",
    "Gravity is not your personal trainer",
    "Shorten your stride on downhills",
    "Let gravity help without braking hard on your heels. Quick, light steps reduce impact on knees. Think \"controlled fall\" rather than reaching far ahead.",
    { blogSlug: "running-form-101" }
  ),
  tip(
    "Form",
    "Your shoulders are not earrings",
    "Relax your shoulders",
    "Tension creeps up into your neck and wastes energy. Every mile or so, drop your shoulders, unclench your hands, and shake out your arms for a few seconds.",
    { blogSlug: "running-form-101" }
  ),
  tip(
    "Form",
    "Stop reaching for the horizon with your feet",
    "Land under your hips, not in front",
    "Overstriding — feet landing far ahead of your body — increases impact. A slightly quicker cadence often fixes this without thinking about every step.",
    { blogSlug: "running-form-101" }
  ),
  tip(
    "Form",
    "The ground isn't going anywhere — look up",
    "Eyes up, posture tall",
    "Look ahead about 10–20 meters, not at your feet. A gentle forward lean from the ankles (not the waist) helps you move efficiently.",
    { blogSlug: "running-form-101" }
  ),
  tip(
    "Breathing",
    "Breathe like you mean it, not like you're hiding",
    "Exhale on a steady rhythm",
    "Try matching breath to steps — in for 3, out for 3, or 2/2 if that's easier. There's no single perfect pattern; find one that feels calm and sustainable.",
    { blogSlug: "breathing-while-running" }
  ),
  tip(
    "Breathing",
    "That side cramp isn't forever — probably",
    "Side stitches? Slow down and exhale fully",
    "A cramp under your ribs often eases if you reduce pace and take deeper exhales. Pressing gently on the painful side while exhaling can help some runners.",
    { blogSlug: "breathing-while-running" }
  ),
  tip(
    "Mindset",
    "Instagram runners are lying (probably)",
    "Compare you to yesterday's you",
    "Social feeds show everyone's best day. Your only useful comparison is your own consistency over weeks. Showing up three times beats one heroic run.",
    { blogSlug: "mental-side-of-running" }
  ),
  tip(
    "Mindset",
    "That ugly run still counted — sorry",
    "A bad run still counts",
    "Legs heavy, mind elsewhere, walked more than planned — it still builds the habit. The runners who improve are the ones who come back after the rough days.",
    { blogSlug: "mental-side-of-running" }
  ),
  tip(
    "Mindset",
    "Waiting to 'feel like it' is a trap",
    "Motivation follows action",
    "Don't wait to feel like running. Lace up for five minutes — often the hardest part is starting. If you still feel awful after 10 minutes, a walk home is fine.",
    { blogSlug: "building-a-running-habit" }
  ),
  tip(
    "Habits",
    "Future you is lazy — set out the clothes tonight",
    "Lay out clothes the night before",
    "Remove one decision from a groggy morning. Shoes, socks, and kit by the door make the default choice \"go\" instead of \"scroll phone.\"",
    { blogSlug: "building-a-running-habit" }
  ),
  tip(
    "Habits",
    "Make running boring (that's a compliment)",
    "Same days, same times",
    "Running at consistent times — Tuesday/Thursday/Saturday morning, for example — turns training into autopilot. Your brain stops negotiating every session.",
    { blogSlug: "building-a-running-habit" }
  ),
  tip(
    "Habits",
    "Accountability without a coach's whistle",
    "Tell one person your plan",
    "A friend, partner, or online group knowing your schedule adds gentle accountability. You don't need a coach — just someone who asks \"how was the run?\"",
    { href: "/stories" }
  ),
  tip(
    "Weather",
    "You're not the Wicked Witch — run in the rain",
    "Rain won't melt you",
    "A light rain run can be refreshing. Wear a brimmed cap for your face, avoid cotton, and change out of wet clothes quickly afterward. Embrace the badge of honor.",
    { href: "/tips/bad-weather" }
  ),
  tip(
    "Weather",
    "Humidity turns everyone into a beginner",
    "Heat? Start slower than you think",
    "Your heart rate climbs faster in humidity. Run by effort, not pace. Early morning or shaded routes beat midday sun for summer beginners.",
    { href: "/tips/bad-weather" }
  ),
  tip(
    "Weather",
    "Sometimes the treadmill wins — and that's fine",
    "When air quality is poor, move indoors",
    "Smoke, high ozone, or heavy pollen days are good for treadmill, bike, or strength work. Missing one outdoor run beats inflaming your lungs.",
    { href: "/tips/bad-weather" }
  ),
  tip(
    "Safety",
    "Cars are not goalie practice",
    "Face traffic on roads without sidewalks",
    "Run against oncoming cars so you can see what's coming. Bright or reflective gear matters at dawn and dusk. Assume drivers haven't seen you.",
    { blogSlug: "runner-etiquette-trails-roads-track" }
  ),
  tip(
    "Safety",
    "Mom was right — text someone",
    "Tell someone your route",
    "For early morning or trail runs, a quick text — \"5K loop, back by 7\" — takes seconds and matters if something goes wrong. Share live location if you have it.",
    { blogSlug: "first-run-tips" }
  ),
  tip(
    "Safety",
    "Maybe don't die for a podcast",
    "Skip music on busy roads",
    "One earbud out (or none) keeps you aware of cars, bikes, and dogs. Save the playlist for parks, trails, or treadmills.",
    { blogSlug: "first-run-tips" }
  ),
  tip(
    "Warm-up",
    "The couch is not a launchpad",
    "Walk before you run",
    "Five minutes of brisk walking raises heart rate and loosens joints. Jumping straight into a jog from the couch is how pulled muscles happen.",
    { blogSlug: "avoiding-injuries" }
  ),
  tip(
    "Cool-down",
    "Your heart prefers a gentle landing",
    "Don't stop abruptly",
    "End with 3–5 minutes of easy walking. It helps your heart rate come down gradually and can reduce dizziness after harder efforts.",
    { blogSlug: "avoiding-injuries" }
  ),
  tip(
    "Strength",
    "Planks: the joy nobody talks about",
    "Two strength sessions a week go far",
    "Squats, lunges, calf raises, and planks for 15–20 minutes support your running. Strong hips and glutes prevent many common overuse injuries.",
    { blogSlug: "bodyweight-strength-for-runners" }
  ),
  tip(
    "Strength",
    "Brush your teeth like a flamingo",
    "Single-leg balance builds ankle stability",
    "Stand on one foot while brushing your teeth. Simple balance work improves proprioception and helps on uneven trails — no gym required.",
    { blogSlug: "bodyweight-strength-for-runners" }
  ),
  tip(
    "Cross-training",
    "Cardio without the knee drama",
    "Bike and swim count",
    "Cycling and swimming build cardio without pounding your legs. They're great on rest days or when you're nursing a minor ache.",
    { blogSlug: "running-vs-biking" }
  ),
  tip(
    "Cross-training",
    "Mountains: nature's treadmill with better views",
    "Hiking can replace a long run",
    "A hilly 90-minute hike builds endurance and leg strength with less impact. Time on feet matters for marathon prep — the surface can vary.",
    { blogSlug: "hiking-instead-of-long-run" }
  ),
  tip(
    "Progress",
    "Your training diary can be three words",
    "Log something simple",
    "Date, distance or time, and how you felt — that's enough. Patterns emerge over weeks: sleep, stress, and weather all show up in your notes.",
    { href: "/plan" }
  ),
  tip(
    "Progress",
    "Confetti for surviving week one",
    "Celebrate small wins",
    "First continuous mile, first week completed, first run in the rain — mark them. Beginner progress is made of milestones most experienced runners forget.",
    { href: "/stories" }
  ),
  tip(
    "Etiquette",
    "\"On your left\" — use your outdoor voice",
    "Pass on the left, announce yourself",
    "On shared paths, a friendly \"on your left\" gives others time to move. Slower traffic keeps right; look before cutting across lanes.",
    { blogSlug: "runner-etiquette-trails-roads-track" }
  ),
  tip(
    "Etiquette",
    "The track has rules — yes, even for you",
    "Track etiquette: lanes matter",
    "On a running track, faster runners use inner lanes; recovery and warming up stay outer. Check local rules — some tracks rotate direction by day.",
    { blogSlug: "runner-etiquette-trails-roads-track" }
  ),
  tip(
    "Community",
    "Trust the coach, not the parking-lot sprinter",
    "A group run can teach pacing",
    "In a coached club or clinic, easy days stay easy because someone planned them that way. Listen at the briefing and stick with the pace group your coach assigns.",
    { blogSlug: "group-running-coach-and-pacer" }
  ),
  tip(
    "Women's running",
    "Trust weird vibes — they're often right",
    "Safety gear is not optional",
    "Well-lit routes, reflective gear, and sharing your location matter. Trust your instincts — if a situation feels off, change course or head home.",
    { blogSlug: "running-guide-for-women" }
  ),
  tip(
    "Scheduling",
    "Piggyback on coffee — it owes you",
    "Stack runs after something you already do",
    "Coffee brewing, kids on the bus, lunch break — anchor your run to an existing habit. \"After I drop off, I run\" beats vague good intentions.",
    { blogSlug: "building-a-running-habit" }
  ),
  tip(
    "Scheduling",
    "Missed a run? The plan is not your landlord",
    "Missed a run? Just take the next one",
    "Don't double up to \"catch up\" — that spikes injury risk. The plan is a guide, not a contract. Resume with the next scheduled workout.",
    { href: "/plan" }
  ),
  tip(
    "Injury prevention",
    "Your bones file paperwork slower than your lungs",
    "Increase weekly mileage slowly",
    "The classic rule: don't add more than ~10% total volume per week. Your bones and tendons adapt slower than your lungs — respect the lag.",
    { href: "/injuries" }
  ),
  tip(
    "Injury prevention",
    "Ice is not a personality trait",
    "Ice is for acute bumps, not daily soreness",
    "RICE helps fresh twists and swelling. Chronic tightness usually needs rest, gentle movement, and addressing load — not nightly ice packs.",
    { href: "/injuries" }
  ),
  tip(
    "Treadmill",
    "The treadmill lies — cheat with 1% incline",
    "Set the incline to 1% sometimes",
    "A slight incline on the treadmill better mimics outdoor effort without wind resistance. It's optional — any running beats debating settings.",
    { blogSlug: "running-in-bad-weather" }
  ),
  tip(
    "Race day",
    "Race day is not science fair",
    "Nothing new on race morning",
    "Same shoes, same breakfast, same warm-up you've practiced. Race day is for executing habits, not experiments.",
    { blogSlug: "first-run-tips" }
  ),
  tip(
    "Post-run",
    "Wet-shirt chic is not the vibe",
    "Change out of damp clothes quickly",
    "Wet kit against skin causes chafing and chills, especially in cool weather. A dry shirt in your car or by the door is a small luxury you'll appreciate.",
    { blogSlug: "first-run-tips" }
  ),
  tip(
    "Chafing",
    "Lube up before the thighs declare war",
    "Body Glide your hot spots early",
    "Inner thighs, nipples, armpits — apply anti-chafe balm before long runs. Treating it after the fact hurts more than preventing it.",
    { href: "/gear" }
  ),
  tip(
    "Calf care",
    "Two minutes on the stairs beats crying later",
    "Calf raises on stairs take 2 minutes",
    "Stand on a step, lower heels below the edge, rise up. Two sets of 15 a few times a week strengthens calves and Achilles for hillier routes.",
    { blogSlug: "bodyweight-strength-for-runners" }
  ),
  tip(
    "Long runs",
    "The first mile should feel insultingly easy",
    "Start slower than your weekday runs",
    "The first mile of a long run should feel almost too easy. Banking energy early prevents a miserable final third — even for beginners building distance.",
    { blogSlug: "how-to-pace-yourself" }
  ),
  tip(
    "Consistency",
    "One hero run < three boring ones",
    "Three runs beat one epic run",
    "Spreading volume across the week builds durability better than one long slog on Sunday. Frequency teaches your body that running is normal.",
    { href: "/plan" }
  ),
  tip(
    "Beginner myth",
    "More isn't always merrier",
    "You don't need to run every day",
    "Rest and cross-training days are built into good plans for a reason. More running isn't always better — recoverable running is.",
    { href: "/plan" }
  ),
  tip(
    "Beginner myth",
    "Walk-run: the OG interval training",
    "Walking is not cheating",
    "Walk-run methods have helped millions finish 5Ks. The goal is finishing healthy and happy, not proving you never walked.",
    { blogSlug: "how-to-pace-yourself" }
  ),
  tip(
    "Seasonal",
    "Dress like an onion, run like a human",
    "Layer up, peel down",
    "Zippered tops and gloves you can stuff in a pocket beat one heavy coat. Start a little cold — you'll warm up within 10 minutes.",
    { href: "/tips/bad-weather" }
  ),
  tip(
    "Technology",
    "Your phone tracks miles — your wallet thanks you",
    "Your phone is enough to start",
    "Free apps track distance fine for beginners. A GPS watch is nice later — don't let gear shopping delay your first week on the plan.",
    { href: "/plan" }
  ),
  tip(
    "Technology",
    "When Strava says 4 min/mile, you're not that good",
    "Ignore pace on GPS glitches",
    "Tunnels, trees, and tall buildings skew pace readings. Run by feel when the numbers look impossible — your body knows effort better than a bad signal.",
    { href: "/dashboard" }
  ),
  tip(
    "Flexibility",
    "Don't stretch cold like a rubber band",
    "Dynamic stretches before, static after",
    "Leg swings and walking lunges before a run; hold gentle stretches after you're cooled down. Static stretching cold muscles isn't ideal.",
    { blogSlug: "avoiding-injuries" }
  ),
  tip(
    "Evening runs",
    "Don't sprint at bedtime unless you like ceiling staring",
    "Wind down before bed",
    "Hard evening runs can disrupt sleep for some people. Finish intense sessions 2–3 hours before bed, or keep night runs easy and short.",
    { blogSlug: "what-to-do-on-rest-days" }
  ),
  tip(
    "Travel",
    "Shoes fit in the bag — excuses don't",
    "Pack shoes, not excuses",
    "Running shoes take little suitcase space. A 20-minute jog in a new city is one of the best ways to explore safely and shake off travel stiffness.",
    { blogSlug: "building-a-running-habit" }
  ),
  tip(
    "Confidence",
    "Every fast person started exactly where you are",
    "You belong on the path",
    "Every fast runner was once a beginner. You're not too slow, too old, or too out of shape to be here. Showing up is the membership fee.",
    { href: "/stories" }
  ),
];
