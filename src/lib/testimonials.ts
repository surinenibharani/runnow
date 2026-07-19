export type SuccessStory = {
  quote: string;
  name: string;
  detail: string;
  /** Longer narrative for the stories page */
  story?: string;
  milestone?: string;
};

export const successStories: SuccessStory[] = [
  {
    quote:
      "I genuinely thought running wasn't for me. Week 4 and I'm actually looking forward to my runs.",
    name: "Kumar",
    detail: "Age 46 · started from zero",
    milestone: "Finished the 8-week couch to 5K",
    story:
      "Kumar had not run since school. He started with walk-run intervals three days a week and ignored the urge to 'just push through.' By week four the dread was gone — the habit stuck because the plan stayed honest about walking.",
  },
  {
    quote:
      "The walk-run intervals made it feel achievable. No shame in walking — that's the whole point.",
    name: "Venkat",
    detail: "Age 42 · completed the 8-week plan",
    milestone: "Ran a continuous 25 minutes",
    story:
      "Venkat tried apps that made him feel behind by day three. A browser checklist with walk breaks changed that. He finished the plan without a perfect streak — missed days got made up mid-week, not abandoned.",
  },
  {
    quote:
      "Checking off workouts and seeing my streak grow kept me accountable. Simple but it works.",
    name: "Fakruddin",
    detail: "Age 44 · on week 6 and counting",
    milestone: "Six-week training streak",
    story:
      "Accountability mattered more than fancy metrics. Fakruddin checked off sessions on his phone after dinner and used rest days without guilt. The streak was a reminder, not a rule that broke when life got busy.",
  },
  {
    quote:
      "I was scared of looking slow. Easy pace plus a plan meant I stopped comparing myself to strangers.",
    name: "Priya",
    detail: "Age 34 · first 5K finish",
    milestone: "Completed a local 5K walk-run",
    story:
      "Priya trained for twelve weeks after years of on-and-off gym starts. Race day she walked the hills on purpose and finished smiling. The win was showing up trained — not a time on a board.",
  },
  {
    quote:
      "Coming back after kids, I needed permission to start tiny. Tiny worked.",
    name: "Anita",
    detail: "Age 38 · postpartum return",
    milestone: "Back to 3 easy runs per week",
    story:
      "Anita cleared running with her clinician, began with short walks, then walk-run. Strength work for hips and core came before volume. Progress felt slow until week eight — then the easy days finally felt easy again.",
  },
  {
    quote:
      "At 58 I assumed I had missed the window. Turns out the window was just 'start easy.'",
    name: "David",
    detail: "Age 58 · masters beginner",
    milestone: "Ten continuous minutes jogging",
    story:
      "David used the shortest 5K variant and added an extra warm-up walk. Two strength sessions a week kept his knees happier than when he tried to jog every day. He measures progress in minutes, not miles.",
  },
];
