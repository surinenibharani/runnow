/** One-paragraph stakes hook shown at the top of each article. */
export const whyItMattersBySlug: Record<string, string> = {
  "never-ran-where-to-start":
    "Most beginners quit because they start too hard, too fast, with no plan. Getting the first four weeks right is the difference between a lifelong habit and another abandoned resolution.",
  "training-first-5k":
    "A 5K is the most common first goal — and the most common place beginners overtrain or under-recover. Structure now saves you from injury and burnout before race day.",
  "training-first-half-marathon":
    "Half marathon training is where casual joggers become real runners. Mileage jumps and long-run mistakes here cause most overuse injuries — knowing the progression matters.",
  "training-first-full-marathon":
    "The marathon punishes guesswork. Fueling, pacing, and recovery errors that barely matter at 5K can end your race at mile 20. A smart build-up is non-negotiable.",
  "importance-of-cross-training":
    "Running every day feels productive but often leads to breakdown. Cross-training keeps your heart and lungs working while giving bones and tendons the variety they need.",
  "what-to-do-on-rest-days":
    "Rest isn't laziness — it's when your body adapts. What you do (and don't do) on off days often determines whether you show up strong or sidelined next week.",
  "nutrition-for-runners":
    "You can train perfectly and still bonk, cramp, or recover slowly if fueling is off. Nutrition is the lever most beginners ignore until race day goes wrong.",
  "building-a-running-habit":
    "Motivation fades; systems stick. The runners who last aren't the most disciplined — they're the ones who made showing up automatic.",
  "choosing-running-shoes":
    "Wrong shoes cause blisters, shin pain, and knee issues within weeks. One good fit beats a drawer full of trendy pairs you can't run in.",
  "how-to-pace-yourself":
    "Going out too fast is the #1 beginner mistake — it makes every run feel harder than it should and spikes injury risk. Easy days should actually be easy.",
  "race-day-tips":
    "Months of training can unravel in the first mile from new shoes, skipped breakfast, or adrenaline pacing. Race-day habits are worth rehearsing before you pin on a bib.",
  "mental-side-of-running":
    "Your legs adapt faster than your head. Doubt, boredom, and comparison kill more running careers than physical limits — learning to manage them is a skill.",
  "avoiding-injuries":
    "Up to half of beginners get hurt in their first year, usually from doing too much too soon. A few prevention habits now keep you on the road for years.",
  "why-letsrunnow":
    "The wrong app can make running feel like homework. Finding a plan that matches your life — not an influencer's — is what gets you from 'thinking about it' to actually doing it.",
  "breathing-while-running":
    "Gasping on mile one usually means pace, not fitness, is the problem. A simple breathing rhythm fixes most beginner discomfort without gadgets or drills.",
  "running-in-bad-weather":
    "One bad weather week shouldn't end a streak. Knowing when to adapt, when to move indoors, and when to rest keeps consistency alive through every season.",
  "running-with-health-conditions":
    "Running can support health at many ages and with many conditions — but the wrong approach can do harm. Understanding your limits before you start protects you long-term.",
  "performance-goals-over-aesthetics":
    "Aesthetic-only goals feel urgent but progress is hard to measure — and easy to obsess over. Performance targets give you wins you can actually track and celebrate.",
  "why-walking-is-not-cheating":
    "Beginners who refuse to walk often quit within weeks — gasping, sore, and convinced they're 'not cut out for it.' Walk-run is how most people actually become runners.",
  "what-to-do-when-you-miss-a-run":
    "One skipped run feels like failure, so many beginners quit entirely. How you respond in the 48 hours after a miss matters more than the miss itself.",
  "beginner-gear-guide-under-50":
    "You don't need a $200 watch to start. A few smart basics under $50 prevent blisters and keep you comfortable while you build the habit.",
  "how-to-not-hate-hills":
    "Hills feel like punishment until you learn pacing and posture. A few mental and physical tricks turn climbs from dread into honest strength work.",
  "first-run-tips":
    "Run one is where bad habits get baked in — too fast, wrong shoes, no plan. A few simple rules make the difference between 'never again' and 'when's run two?'",
  "what-to-wear-running":
    "Chafing, freezing, or overheating on run one can convince you running isn't for you. The right basics are cheap and mostly already in your closet.",
  "post-run-recovery":
    "What you do in the hour after a run shapes how sore you feel tomorrow — and whether you show up for the next one.",
  "nutrition-basics-for-beginners":
    "Under-eating is one of the fastest ways for new runners to feel exhausted, get hurt, or quit. Simple daily habits beat complicated diets every time.",
  "bodyweight-strength-for-runners":
    "Running alone doesn't build the glute and calf strength that keeps shins and knees happy. Fifteen minutes twice a week is cheap insurance.",
  "running-form-101":
    "Small form fixes — posture, shorter steps, relaxed arms — reduce impact and make easy runs actually feel easy. You don't need a lab analysis on day one.",
  "running-guide-for-women":
    "Women starting out often have questions men-focused guides skip — gear, cycles, bone health, and safe return after pregnancy. Getting those right keeps you on the road.",
  "dumbbell-strength-at-home-for-runners":
    "A single pair of dumbbells at home can build the hip and leg strength running demands — without a gym contract or complicated programs.",
  "advanced-strength-training-for-runners":
    "Experienced runners hit plateaus when they only add miles. Smart lifting and plyometrics support power on hills and protect you when training peaks.",
  "running-vs-biking":
    "Cycling isn't cheating on your run plan — it's how many beginners stay consistent when impact, weather, or soreness would otherwise sideline them.",
  "hiking-instead-of-long-run":
    "A hard hike can build hill strength and hours on your feet — but swap too often and race day on flat pavement surprises you. Knowing when to trade matters.",
  "runner-etiquette-trails-roads-track":
    "Nobody teaches trail yield rules or track lane etiquette on day one — learning them early keeps you safe and welcome on shared paths.",
  "group-running-coach-and-pacer":
    "Group training pays off when you trust the coach's plan — not the loudest runner in the parking lot. Learning how to listen early saves months of junk miles and awkward pace-group mistakes.",
};

export function getWhyItMatters(slug: string): string | undefined {
  return whyItMattersBySlug[slug];
}
