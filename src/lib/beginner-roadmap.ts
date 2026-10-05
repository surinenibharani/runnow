export type RoadmapStep = {
  id: string;
  stage: string;
  title: string;
  summary: string;
  href: string;
  hrefLabel: string;
};

/** First-week through first 5K, then the next honest distance or a comeback. */
export const beginnerRoadmap: RoadmapStep[] = [
  {
    id: "week-1",
    stage: "Week 1",
    title: "Show up three times",
    summary:
      "Walk–jog intervals, conversational effort. Finishing is the workout.",
    href: "/start",
    hrefLabel: "Get a plan",
  },
  {
    id: "habit",
    stage: "Weeks 2–4",
    title: "Protect the habit",
    summary:
      "Easy days stay easy. Rest is training. Missed runs stay missed — no doubling up.",
    href: "/tips/missed-a-week-dont-double-up",
    hrefLabel: "Missed-week tip",
  },
  {
    id: "continuous",
    stage: "First continuous run",
    title: "Jog without a walk break",
    summary:
      "Still slow enough to talk. One unbroken jog, then walk it in proud.",
    href: "/blog/first-run-tips",
    hrefLabel: "First-run guide",
  },
  {
    id: "5k",
    stage: "First 5K",
    title: "Finish, don't race",
    summary:
      "Walk–jog is allowed. The goal is crossing the line wanting to come back.",
    href: "/plan/5k-gentle-16w",
    hrefLabel: "Walk-to-5K plan",
  },
  {
    id: "next",
    stage: "Already running or coming back",
    title: "Pick the next honest distance",
    summary:
      "10K, half, marathon, or a comeback block. Same idea: easy days, rest, and a plan that matches the body you have this season.",
    href: "/blog/comeback-after-running-break",
    hrefLabel: "Comeback guide",
  },
];

export function beginnerRoadmapHowToSteps(): {
  name: string;
  text: string;
  url: string;
}[] {
  return beginnerRoadmap.map((step) => ({
    name: `${step.stage}: ${step.title}`,
    text: step.summary,
    url: step.href,
  }));
}
