export type PathwayKind =
  | "tip"
  | "blog"
  | "plan"
  | "injury"
  | "gear"
  | "stories";

export type PathwayLink = {
  kind: PathwayKind;
  href: string;
  label: string;
  detail: string;
};

export type ContentPathway = {
  title: string;
  links: PathwayLink[];
};

/** Shared CTA — promote /stories from Start here and tips pathways. */
export const storiesPathwayLink: PathwayLink = {
  kind: "stories",
  href: "/stories",
  label: "Success stories",
  detail: "Real beginners who started scared and kept showing up.",
};

const injuryPathways: Record<string, PathwayLink[]> = {
  "shin-splints": [
    {
      kind: "tip",
      href: "/tips/strength-twice-a-week-beats-more-junk-miles",
      label: "Strength twice a week",
      detail: "Calves and hips take load off the shin.",
    },
    {
      kind: "blog",
      href: "/blog/shin-splints-running",
      label: "Shin splints guide",
      detail: "Why they show up and how to come back.",
    },
    {
      kind: "plan",
      href: "/tips/missed-a-week-dont-double-up",
      label: "Ease the plan — don’t catch up",
      detail: "Cut volume; don’t stack missed runs.",
    },
  ],
  "runners-knee": [
    {
      kind: "tip",
      href: "/tips/strength-twice-a-week-beats-more-junk-miles",
      label: "Hip and quad strength",
      detail: "Weak hips often show up as knee pain.",
    },
    {
      kind: "tip",
      href: "/tips/mobility-in-minutes-not-marathons",
      label: "Short mobility",
      detail: "A few minutes beats a heroic foam-roll session.",
    },
    {
      kind: "blog",
      href: "/blog/runners-knee-running",
      label: "Runner’s knee guide",
      detail: "Stairs, hills, and how to rebuild.",
    },
    {
      kind: "plan",
      href: "/plan/5k-8w",
      label: "Stay on an easy plan",
      detail: "Skip hills and speed until stairs feel calm.",
    },
  ],
  "it-band-syndrome": [
    {
      kind: "tip",
      href: "/tips/strength-twice-a-week-beats-more-junk-miles",
      label: "Glute strength",
      detail: "Side steps and single-leg work beat more miles.",
    },
    {
      kind: "blog",
      href: "/blog/it-band-syndrome-running",
      label: "IT band guide",
      detail: "Why hills and cambered roads flare it.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Flatten the routes",
      detail: "Use rest and cross-train days already in the plan.",
    },
  ],
  "plantar-fasciitis": [
    {
      kind: "tip",
      href: "/tips/shoes-matter-more-than-gadgets",
      label: "Shoes before gadgets",
      detail: "Worn-out foam is a classic plantar trigger.",
    },
    {
      kind: "gear",
      href: "/gear#shoes",
      label: "Shoe guide",
      detail: "When to replace and what to look for.",
    },
    {
      kind: "blog",
      href: "/blog/plantar-fasciitis-running",
      label: "Plantar fasciitis guide",
      detail: "Morning pain, load, and the slow return.",
    },
  ],
  "achilles-tendinitis": [
    {
      kind: "tip",
      href: "/tips/rest-days-are-training-days",
      label: "Rest days are training",
      detail: "Achilles hates stacked hard days.",
    },
    {
      kind: "blog",
      href: "/blog/achilles-tendinitis-running",
      label: "Achilles guide",
      detail: "Loading, hills, and when to stop.",
    },
    {
      kind: "plan",
      href: "/tips/if-easy-days-arent-easy-slow-down-now",
      label: "If easy isn’t easy, back off",
      detail: "Stiffness that warms up still counts as a warning.",
    },
  ],
  "stress-fractures": [
    {
      kind: "tip",
      href: "/tips/fuel-the-miles-under-eating-isnt-toughness",
      label: "Fuel the miles",
      detail: "Under-eating raises bone-stress risk.",
    },
    {
      kind: "blog",
      href: "/blog/stress-fracture-running",
      label: "Stress fracture guide",
      detail: "Stop running and get imaging — this is not a push-through.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Pause the plan",
      detail: "Cross-train only with clinician clearance.",
    },
  ],
};

const tipPathways: Record<string, PathwayLink[]> = {
  "slow-down-seriously": [
    {
      kind: "blog",
      href: "/blog/how-to-pace-yourself",
      label: "How to pace yourself",
      detail: "Conversational effort, walk breaks, and why slow works.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Start with a walk–run plan",
      detail: "The quiz picks a free beginner schedule.",
    },
    storiesPathwayLink,
  ],
  "lost-where-to-start-one-beginner-map": [
    {
      kind: "plan",
      href: "/start",
      label: "Start here",
      detail: "Two-minute quiz → free beginner plan.",
    },
    {
      kind: "blog",
      href: "/blog/never-ran-where-to-start",
      label: "Never ran? Where to start",
      detail: "The full beginner map in one guide.",
    },
    storiesPathwayLink,
  ],
  "bad-runs-happen-to-everyone": [
    storiesPathwayLink,
    {
      kind: "blog",
      href: "/blog/mental-side-of-running",
      label: "The mental side",
      detail: "Why bad days don’t erase the habit.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Keep the plan boring",
      detail: "A calendar beats waiting to feel motivated.",
    },
  ],
  "family-runs-are-for-fun-first": [
    storiesPathwayLink,
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "Conversational pace keeps family loops joyful.",
    },
    {
      kind: "plan",
      href: "/plan/5k-gentle-16w",
      label: "Walk-first plan",
      detail: "Room for walk breaks when kids join.",
    },
  ],
  "shoes-matter-more-than-gadgets": [
    {
      kind: "blog",
      href: "/blog/choosing-running-shoes",
      label: "Choosing running shoes",
      detail: "Fit first — ignore the hype.",
    },
    {
      kind: "gear",
      href: "/gear#shoes",
      label: "Gear: shoes",
      detail: "What to look for and when to replace.",
    },
    {
      kind: "injury",
      href: "/injuries/plantar-fasciitis",
      label: "Plantar fasciitis",
      detail: "Worn shoes are a common trigger.",
    },
  ],
  "rest-days-are-training-days": [
    {
      kind: "injury",
      href: "/injuries",
      label: "Injury prevention",
      detail: "Most beginner injuries start with skipped rest.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Plans with rest built in",
      detail: "3–4 run days max — the empty days are load management.",
    },
  ],
  "missed-a-week-dont-double-up": [
    {
      kind: "plan",
      href: "/plan",
      label: "Resume the next scheduled run",
      detail: "Catch-up mileage is how shin splints start.",
    },
    {
      kind: "injury",
      href: "/injuries/shin-splints",
      label: "Shin splints",
      detail: "A classic result of stacking missed work.",
    },
  ],
  "strength-twice-a-week-beats-more-junk-miles": [
    {
      kind: "injury",
      href: "/injuries/runners-knee",
      label: "Runner’s knee",
      detail: "Hips and quads take pressure off the kneecap.",
    },
    {
      kind: "injury",
      href: "/injuries/shin-splints",
      label: "Shin splints",
      detail: "Calf and hip strength are part of prevention.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Use the cross-train days",
      detail: "Strength belongs on the days already on the calendar.",
    },
  ],
  "walk-only-weeks-still-count": [
    {
      kind: "blog",
      href: "/blog/walking-for-fitness-without-running",
      label: "Walking for fitness",
      detail: "Brisk walking hits the health target.",
    },
    {
      kind: "plan",
      href: "/plan/5k-gentle-16w",
      label: "16-week walk-first plan",
      detail: "Four weeks of walking, then tiny jogs.",
    },
    storiesPathwayLink,
  ],
  "fuel-the-miles-under-eating-isnt-toughness": [
    {
      kind: "injury",
      href: "/injuries/stress-fractures",
      label: "Stress fractures",
      detail: "Low energy availability raises bone-stress risk.",
    },
    {
      kind: "blog",
      href: "/blog/stress-fracture-running",
      label: "Stress fracture guide",
      detail: "Fueling, load, and when to get imaging.",
    },
  ],
  "twisted-ankle-protect-then-load-dont-ice-forever": [
    {
      kind: "blog",
      href: "/blog/ankle-sprain-return-to-run",
      label: "Ankle sprain return-to-run",
      detail: "PEACE & LOVE, balance, and when to jog.",
    },
    {
      kind: "injury",
      href: "/injuries",
      label: "Injury hub",
      detail: "When pain means stop and get help.",
    },
  ],
  "practice-the-gel-on-a-long-run-never-race-day": [
    {
      kind: "blog",
      href: "/blog/race-fueling-gels-carb-load-beginners",
      label: "Gels & carb-load guide",
      detail: "Practice before race morning.",
    },
    {
      kind: "blog",
      href: "/blog/runners-gi-distress",
      label: "Runner's gut",
      detail: "When fueling goes sideways.",
    },
  ],
  "parkrun-is-free-treat-it-like-a-dress-rehearsal": [
    {
      kind: "blog",
      href: "/blog/first-parkrun-community-5k",
      label: "First Parkrun guide",
      detail: "Register, start easy, thank volunteers.",
    },
    {
      kind: "blog",
      href: "/blog/finding-running-community",
      label: "Find running people",
      detail: "Low-pressure groups beyond race day.",
    },
  ],
  "heat-day-hard-work-is-optional": [
    {
      kind: "blog",
      href: "/blog/hot-weather-running-hub",
      label: "Hot-weather hub",
      detail: "Heat illness signs and safer swaps.",
    },
    {
      kind: "tip",
      href: "/tips/bad-weather",
      label: "Bad-weather tips",
      detail: "Indoor and weather alternatives.",
    },
  ],
  "carry-ice-contact-on-night-routes": [
    {
      kind: "blog",
      href: "/blog/night-running-safety",
      label: "Night running safety",
      detail: "Visibility, routes, and awareness.",
    },
    {
      kind: "blog",
      href: "/blog/headphones-safety-running",
      label: "Headphones safety",
      detail: "Keep one ear for the world.",
    },
  ],
  "put-runs-on-your-calendar": [
    {
      kind: "blog",
      href: "/blog/building-a-running-habit",
      label: "Build a running habit",
      detail: "Treat runs like appointments — three days, protected.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Start here",
      detail: "A free plan puts the next run on your calendar.",
    },
    storiesPathwayLink,
  ],
  "drink-water-not-just-during-runs": [
    {
      kind: "blog",
      href: "/blog/nutrition-for-runners",
      label: "Runner's nutrition guide",
      detail: "Daily hydration beats chugging mid-run.",
    },
    {
      kind: "blog",
      href: "/blog/hydration-electrolytes-running",
      label: "Hydration & electrolytes",
      detail: "When water is enough vs when to add salt.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Match fuel to the plan",
      detail: "Long days need more than short loops.",
    },
  ],
  "find-a-breathing-rhythm": [
    {
      kind: "blog",
      href: "/blog/breathing-while-running",
      label: "Breathing while running",
      detail: "3-in-3-out rhythm and when to slow down.",
    },
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "If breathing is frantic, pace is too fast.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Easy-effort plans",
      detail: "Conversational pace is the whole beginner game.",
    },
  ],
  "warm-up-and-cool-down": [
    {
      kind: "blog",
      href: "/blog/avoiding-injuries",
      label: "Avoiding injuries",
      detail: "Warm-up walks and cool-downs protect knees.",
    },
    {
      kind: "blog",
      href: "/blog/warm-up-cool-down-running",
      label: "Warm-up & cool-down guide",
      detail: "Five minutes each side of every session.",
    },
    {
      kind: "injury",
      href: "/injuries",
      label: "Injury hub",
      detail: "When a niggle means stop, not stretch harder.",
    },
  ],
  "be-seen-after-dark": [
    {
      kind: "blog",
      href: "/blog/night-running-safety",
      label: "Night running safety",
      detail: "Lights, reflective gear, and safer routes.",
    },
    {
      kind: "tip",
      href: "/tips/carry-ice-contact-on-night-routes",
      label: "Carry ICE on night routes",
      detail: "Emergency contact beats invisible kits.",
    },
    {
      kind: "gear",
      href: "/gear",
      label: "Visibility gear",
      detail: "Light colors and a small blinker beat black kits.",
    },
  ],
  "layer-for-cold-then-unzip": [
    {
      kind: "blog",
      href: "/blog/cold-weather-running-hub",
      label: "Cold-weather hub",
      detail: "Dress warmer than you think — you'll heat up.",
    },
    {
      kind: "blog",
      href: "/blog/what-to-wear-running",
      label: "What to wear",
      detail: "Layers, hands, ears, and when to bail on ice.",
    },
    {
      kind: "tip",
      href: "/tips/bad-weather",
      label: "Bad-weather tips",
      detail: "Indoor swaps when wind chill wins.",
    },
  ],
  "lube-the-hotspots-before-you-leave": [
    {
      kind: "blog",
      href: "/blog/chafing-blisters-running",
      label: "Chafing & blisters guide",
      detail: "Friction plus sweat — prevent before you run.",
    },
    {
      kind: "gear",
      href: "/gear#chafing-creams",
      label: "Anti-chafe gear",
      detail: "Balm beats mid-run tape scrambles.",
    },
    {
      kind: "blog",
      href: "/blog/beginner-gear-guide-under-50",
      label: "Gear under $50",
      detail: "Anti-chafe belongs in the starter kit.",
    },
  ],
  "blisters-love-new-shoes-on-race-day": [
    {
      kind: "blog",
      href: "/blog/chafing-blisters-running",
      label: "Chafing & blisters guide",
      detail: "Break in shoes and socks on training runs first.",
    },
    {
      kind: "blog",
      href: "/blog/choosing-running-shoes",
      label: "Choosing running shoes",
      detail: "Fit and sock choice prevent most blisters.",
    },
    {
      kind: "blog",
      href: "/blog/race-day-tips",
      label: "Race day tips",
      detail: "Nothing new on race morning — especially shoes.",
    },
  ],
  "outer-lanes-are-for-warming-up": [
    {
      kind: "blog",
      href: "/blog/first-track-workout-beginners",
      label: "First track workout",
      detail: "Lane etiquette and when to use the oval.",
    },
    {
      kind: "blog",
      href: "/blog/runner-etiquette-trails-roads-track",
      label: "Runner's etiquette",
      detail: "Who yields, where to warm up, and passing rules.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Speed comes later",
      detail: "Track days belong after an easy base is built.",
    },
  ],
  "trail-pace-is-supposed-to-look-slow": [
    {
      kind: "blog",
      href: "/blog/trail-ultra-intro-beginners",
      label: "Trail running intro",
      detail: "Effort and time on feet beat road pace.",
    },
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "Hiking steep bits is normal, not failure.",
    },
    {
      kind: "blog",
      href: "/blog/how-to-not-hate-hills",
      label: "How to run hills",
      detail: "Climbs and descents on dirt need different ego.",
    },
  ],
  "nudge-cadence-dont-chase-180": [
    {
      kind: "blog",
      href: "/blog/cadence-drills-runners",
      label: "Cadence drills",
      detail: "A 5–10% nudge — not a forced 180 target.",
    },
    {
      kind: "blog",
      href: "/blog/running-form-101",
      label: "Running form 101",
      detail: "Quiet, shorter steps beat celebrity numbers.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Easy miles first",
      detail: "Form tweaks come after the habit sticks.",
    },
  ],
  "mobility-in-minutes-not-marathons": [
    {
      kind: "blog",
      href: "/blog/foam-rolling-mobility-runners",
      label: "Foam rolling & mobility",
      detail: "A few minutes beats a flow you'll abandon.",
    },
    {
      kind: "tip",
      href: "/tips/warm-up-and-cool-down",
      label: "Warm up and cool down",
      detail: "Leg swings after easy walking — that's enough.",
    },
    {
      kind: "injury",
      href: "/injuries/runners-knee",
      label: "Runner's knee",
      detail: "Short hip work often beats heroic rolling.",
    },
  ],
  "pack-a-lunch-run-kit-under-your-desk": [
    {
      kind: "blog",
      href: "/blog/workplace-lunch-run",
      label: "Workplace lunch run",
      detail: "Kit, timing, and returning human for meetings.",
    },
    {
      kind: "tip",
      href: "/tips/put-runs-on-your-calendar",
      label: "Put runs on your calendar",
      detail: "Midday slots need the same protection as mornings.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Keep lunch runs easy",
      detail: "Short easy days fit busy schedules best.",
    },
  ],
  "arrive-early-for-altitude-races": [
    {
      kind: "blog",
      href: "/blog/altitude-travel-race-running",
      label: "Altitude & travel races",
      detail: "First 48 hours easy — race by effort, not sea-level pace.",
    },
    {
      kind: "blog",
      href: "/blog/race-day-tips",
      label: "Race day tips",
      detail: "Destination races need logistics, not just fitness.",
    },
    {
      kind: "blog",
      href: "/blog/easy-runs-effort-heart-rate",
      label: "Easy runs by effort",
      detail: "Thin air makes pace targets lie.",
    },
  ],
  "if-easy-days-arent-easy-slow-down-now": [
    {
      kind: "blog",
      href: "/blog/easy-runs-effort-heart-rate",
      label: "Easy runs by effort",
      detail: "Conversational pace builds the aerobic base.",
    },
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "Gasping on recovery days means dial back now.",
    },
    {
      kind: "blog",
      href: "/blog/overtraining-recognition-runners",
      label: "Overtraining signs",
      detail: "Stacking hard 'easy' days leads to burnout.",
    },
  ],
  "skip-the-first-year-marathon-climb-the-ladder": [
    {
      kind: "blog",
      href: "/blog/dont-run-a-marathon-in-your-first-year",
      label: "Skip the first-year marathon",
      detail: "5K → 10K → half seasons before 26.2.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Start with a 5K plan",
      detail: "Climb the distance ladder — tendons need time.",
    },
    storiesPathwayLink,
  ],
  "trust-the-coach-theyre-not-trying-to-end-you": [
    {
      kind: "blog",
      href: "/blog/trust-your-coach-and-pacer",
      label: "Trust your coach & pacer",
      detail: "Easy days and cutbacks are load management.",
    },
    {
      kind: "blog",
      href: "/blog/group-running-coach-and-pacer",
      label: "Group running guide",
      detail: "Pace groups and when to speak up about pain.",
    },
    {
      kind: "injury",
      href: "/injuries",
      label: "Pain? Stop early",
      detail: "Coaches can't feel your shin — you have to say it.",
    },
  ],
  "running-doesnt-ruin-knees-spikes-do": [
    {
      kind: "blog",
      href: "/blog/running-does-not-ruin-your-knees",
      label: "Running & knee health",
      detail: "Recreational running often looks protective in studies.",
    },
    {
      kind: "tip",
      href: "/tips/strength-twice-a-week-beats-more-junk-miles",
      label: "Strength twice a week",
      detail: "Hips and quads support happy knees.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Gradual volume",
      detail: "Spikes — not jogging — cause most overuse flares.",
    },
  ],
  "side-stitch-slow-down-exhale-longer": [
    {
      kind: "blog",
      href: "/blog/side-stitch-running",
      label: "Side stitch guide",
      detail: "Ease pace, long exhale, and fuel timing.",
    },
    {
      kind: "blog",
      href: "/blog/runners-gi-distress",
      label: "Runner's gut",
      detail: "Practice race fuel on easy long runs.",
    },
    {
      kind: "tip",
      href: "/tips/find-a-breathing-rhythm",
      label: "Find a breathing rhythm",
      detail: "Frantic breathing often means pace is too fast.",
    },
  ],
  "resting-hr-up-for-days-back-off-early": [
    {
      kind: "blog",
      href: "/blog/overtraining-recognition-runners",
      label: "Overtraining signs",
      detail: "Sustained HR jumps plus stale legs mean ease off.",
    },
    {
      kind: "blog",
      href: "/blog/resting-heart-rate-runners",
      label: "Resting heart rate guide",
      detail: "What morning HR trends actually mean.",
    },
    {
      kind: "plan",
      href: "/plan",
      label: "Rest is in the plan",
      detail: "Empty days are load management — use them.",
    },
  ],
  "check-aqi-before-hard-outdoor-miles": [
    {
      kind: "blog",
      href: "/blog/air-quality-pollution-running",
      label: "Air quality & running",
      detail: "Orange AQI days call for easy effort or indoors.",
    },
    {
      kind: "tip",
      href: "/tips/heat-day-hard-work-is-optional",
      label: "Heat day: hard work optional",
      detail: "Bad air days deserve the same humility as heat.",
    },
    {
      kind: "blog",
      href: "/blog/treadmill-indoor-winter-running",
      label: "Treadmill & indoor running",
      detail: "Swap hard outdoor work when smoke wins.",
    },
  ],
  "sports-bra-pass-the-jump-test": [
    {
      kind: "blog",
      href: "/blog/sports-bra-guide-runners",
      label: "Sports bra guide",
      detail: "Jump test, band fit, and less exercise pain.",
    },
    {
      kind: "blog",
      href: "/blog/what-to-wear-running",
      label: "What to wear",
      detail: "Support gear belongs in the starter kit.",
    },
    {
      kind: "gear",
      href: "/gear",
      label: "Gear hub",
      detail: "Fix the bra before you fix your pace.",
    },
  ],
  "run-when-youll-actually-show-up": [
    {
      kind: "blog",
      href: "/blog/morning-vs-evening-running",
      label: "Morning vs evening runs",
      detail: "Calendar honesty beats lab debates.",
    },
    {
      kind: "tip",
      href: "/tips/put-runs-on-your-calendar",
      label: "Put runs on your calendar",
      detail: "Three slots you reliably keep — protect them.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Start here",
      detail: "Pick a plan that fits your real life schedule.",
    },
  ],
  "one-earbud-out-on-shared-roads": [
    {
      kind: "blog",
      href: "/blog/headphones-safety-running",
      label: "Headphones safety",
      detail: "One bud out or transparency mode on shared roads.",
    },
    {
      kind: "blog",
      href: "/blog/night-running-safety",
      label: "Night running safety",
      detail: "Ears matter as much as lights after dark.",
    },
    {
      kind: "tip",
      href: "/tips/be-seen-after-dark",
      label: "Be seen after dark",
      detail: "Assume drivers and cyclists don't see you.",
    },
  ],
  "coming-back-after-a-cold-wait-until-fever-free": [
    {
      kind: "blog",
      href: "/blog/return-to-run-after-illness",
      label: "Return after illness",
      detail: "Fever-free first — then easy days, not tempo.",
    },
    {
      kind: "tip",
      href: "/tips/rest-days-are-training-days",
      label: "Rest days are training",
      detail: "Sick days are rest days — not guilt days.",
    },
    {
      kind: "injury",
      href: "/injuries",
      label: "Chest symptoms?",
      detail: "Stop for chest pain or undue breathlessness.",
    },
  ],
  "shoe-life-about-300500-miles-not-vibes": [
    {
      kind: "blog",
      href: "/blog/choosing-running-shoes",
      label: "Choosing running shoes",
      detail: "Retire trainers around 300–500 miles.",
    },
    {
      kind: "tip",
      href: "/tips/shoes-matter-more-than-gadgets",
      label: "Shoes before gadgets",
      detail: "Dead foam beats torn mesh as a retirement sign.",
    },
    {
      kind: "injury",
      href: "/injuries/shin-splints",
      label: "Shin splints",
      detail: "Beat-up legs on easy days? Check shoe age.",
    },
  ],
  "downhill-shorten-stride-dont-brake": [
    {
      kind: "blog",
      href: "/blog/how-to-not-hate-hills",
      label: "How to run hills",
      detail: "Short quick steps on descents — don't sit back and brake.",
    },
    {
      kind: "blog",
      href: "/blog/trail-ultra-intro-beginners",
      label: "Trail running intro",
      detail: "Practice gentle downhills before race day.",
    },
    {
      kind: "tip",
      href: "/tips/nudge-cadence-dont-chase-180",
      label: "Nudge cadence",
      detail: "Quick cadence helps control downhill pounding.",
    },
  ],
};

const blogPathways: Record<string, PathwayLink[]> = {
  "shin-splints-running": injuryPathways["shin-splints"] ?? [],
  "runners-knee-running": injuryPathways["runners-knee"] ?? [],
  "it-band-syndrome-running": injuryPathways["it-band-syndrome"] ?? [],
  "plantar-fasciitis-running": injuryPathways["plantar-fasciitis"] ?? [],
  "achilles-tendinitis-running": injuryPathways["achilles-tendinitis"] ?? [],
  "stress-fracture-running": injuryPathways["stress-fractures"] ?? [],
  "choosing-running-shoes": tipPathways["shoes-matter-more-than-gadgets"] ?? [],
  "never-ran-where-to-start": [
    {
      kind: "plan",
      href: "/start",
      label: "Start here",
      detail: "A two-minute quiz picks a free plan.",
    },
    {
      kind: "plan",
      href: "/plan/5k-gentle-16w",
      label: "Walk-to-5K plan",
      detail: "If jogging still feels like too much.",
    },
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "Conversational pace is the whole point.",
    },
    storiesPathwayLink,
  ],
  "first-run-tips": [
    {
      kind: "tip",
      href: "/tips/slow-down-seriously",
      label: "Slow down — seriously",
      detail: "If you can’t talk, you’re racing week one.",
    },
    {
      kind: "gear",
      href: "/gear#shoes",
      label: "Shoes only",
      detail: "Everything else can wait.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Get a plan",
      detail: "So the second run is already on the calendar.",
    },
    storiesPathwayLink,
  ],
  "none-to-run-gentle-beginners": [
    {
      kind: "plan",
      href: "/plan/5k-gentle-16w",
      label: "16-week walk-first plan",
      detail: "Walking weeks, then micro-jogs.",
    },
    {
      kind: "tip",
      href: "/tips/walk-only-weeks-still-count",
      label: "Walk-only weeks still count",
      detail: "Impact can wait until the habit is real.",
    },
    storiesPathwayLink,
  ],
  "running-apps-compared-beginner-plans": [
    {
      kind: "blog",
      href: "/blog/why-letsrunnow",
      label: "Why LetsRunNow?",
      detail: "Free plans, tips, injuries — one beginner home base.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Start here",
      detail: "Two-minute quiz → free walk–run plan.",
    },
    {
      kind: "blog",
      href: "/blog/none-to-run-gentle-beginners",
      label: "None to Run gentle path",
      detail: "Ultra-slow progression if jogging still feels scary.",
    },
    storiesPathwayLink,
  ],
  "why-letsrunnow": [
    {
      kind: "blog",
      href: "/blog/running-apps-compared-beginner-plans",
      label: "Running apps compared",
      detail: "LetsRunNow vs NRC, Runna & Higdon — fair beginner guide.",
    },
    {
      kind: "plan",
      href: "/start",
      label: "Start here",
      detail: "Free couch-to-marathon plans on your calendar.",
    },
    storiesPathwayLink,
  ],
};

/** Next steps under the Tips hub — Start here + stories sit first. */
export const tipsHubNextSteps: PathwayLink[] = [
  {
    kind: "plan",
    href: "/start",
    label: "Start here",
    detail: "A two-minute quiz picks a free beginner plan.",
  },
  storiesPathwayLink,
  {
    kind: "injury",
    href: "/injuries",
    label: "Pain or niggles?",
    detail: "Prevention, recovery, and when to get help.",
  },
  {
    kind: "gear",
    href: "/gear",
    label: "Gear without the hype",
    detail: "Shoes first. Everything else can wait.",
  },
];

const gearPathways: Record<string, PathwayLink[]> = {
  shoes: [
    {
      kind: "tip",
      href: "/tips/shoes-matter-more-than-gadgets",
      label: "Shoes before gadgets",
      detail: "The only gear that matters on day one.",
    },
    {
      kind: "blog",
      href: "/blog/choosing-running-shoes",
      label: "Shoe guide",
      detail: "Fit, drop, and when to replace.",
    },
    {
      kind: "injury",
      href: "/injuries/plantar-fasciitis",
      label: "Plantar fasciitis",
      detail: "Dead foam is a common cause.",
    },
  ],
  "chafing-creams": [
    {
      kind: "tip",
      href: "/tips/lube-the-hotspots-before-you-leave",
      label: "Lube the hotspots",
      detail: "Before the run, not after it burns.",
    },
    {
      kind: "blog",
      href: "/blog/what-to-wear-running",
      label: "What to wear",
      detail: "Seams, sports bras, and weather.",
    },
  ],
  "strava-app": [
    {
      kind: "plan",
      href: "/start",
      label: "Get a plan first",
      detail: "Track the workout after you know what it is.",
    },
    {
      kind: "blog",
      href: "/blog/beginner-gear-guide-under-50",
      label: "Gear under $50",
      detail: "Your phone is enough for a long time.",
    },
  ],
};

function pathway(title: string, links: PathwayLink[]): ContentPathway | null {
  if (links.length === 0) return null;
  return { title, links };
}

export function getInjuryPathway(slug: string): ContentPathway | null {
  return pathway("Next steps for this injury", injuryPathways[slug] ?? []);
}

export function getTipPathway(slug: string): ContentPathway | null {
  return pathway("Related reading and next steps", tipPathways[slug] ?? []);
}

export function getBlogPathway(slug: string): ContentPathway | null {
  const links = blogPathways[slug];
  if (links?.length) {
    return pathway("Related tips, gear, and plans", links);
  }
  return null;
}

export function getGearPathway(slug: string): ContentPathway | null {
  return pathway("Related tips and guides", gearPathways[slug] ?? []);
}

export const gearHubReads: PathwayLink[] = [
  {
    kind: "blog",
    href: "/blog/choosing-running-shoes",
    label: "Choosing running shoes",
    detail: "Fit first. Lab awards can wait.",
  },
  {
    kind: "blog",
    href: "/blog/beginner-gear-guide-under-50",
    label: "Gear under $50",
    detail: "Socks, anti-chafe, and what actually helps.",
  },
  {
    kind: "blog",
    href: "/blog/what-to-wear-running",
    label: "What to wear",
    detail: "Weather, sports bras, and skip-the-cotton basics.",
  },
  {
    kind: "tip",
    href: "/tips/shoes-matter-more-than-gadgets",
    label: "Shoes before gadgets",
    detail: "A watch is optional. A decent shoe is not.",
  },
];

export const gearHubNextSteps: PathwayLink[] = [
  {
    kind: "plan",
    href: "/start",
    label: "Start here",
    detail: "Get a free plan, then buy shoes if you need them.",
  },
  {
    kind: "tip",
    href: "/tips",
    label: "Beginner tips",
    detail: "Pace, rest, and how not to overdo week one.",
  },
  {
    kind: "injury",
    href: "/injuries",
    label: "If something hurts",
    detail: "Most beginner niggles are load, not the wrong gadget.",
  },
];
