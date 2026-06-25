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
};

export function getWhyItMatters(slug: string): string | undefined {
  return whyItMattersBySlug[slug];
}
