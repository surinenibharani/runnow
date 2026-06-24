export const COACH_PLAN_PRICE = {
  amount: 9.99,
  currency: "USD",
  interval: "month" as const,
  label: "$9.99/month",
};

export const COACH_PLAN_BENEFITS = [
  {
    title: "Create and manage teams",
    description: "Set up one or more teams for your training group, club, or clients.",
  },
  {
    title: "Invite athletes with a code",
    description: "Share a unique invite code so runners can request to join your team.",
  },
  {
    title: "Approve who joins",
    description: "Review join requests and approve only the athletes you want on your roster.",
  },
  {
    title: "Team dashboard",
    description: "See every approved athlete's stats, streaks, and recent Strava runs in one place.",
  },
  {
    title: "Training plan alignment",
    description: "Check how well each athlete is following their plan — completed, missed, and upcoming workouts.",
  },
  {
    title: "Cancel anytime",
    description: "Manage or cancel your subscription from the billing portal whenever you need.",
  },
];
