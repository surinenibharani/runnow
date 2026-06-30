export type AuthWelcomeMessage = {
  title: string;
  body: string;
};

export const NEW_RUNNER_WELCOME: AuthWelcomeMessage = {
  title: "Welcome to the Temple of Chafing!",
  body: "You just joined a worldwide cult where the hymns are heavy breathing and the communion is electrolytes. Your training plan is ready. Your legs are not — yet.",
};

export const LOGIN_WELCOME_MESSAGES: AuthWelcomeMessage[] = [
  {
    title: "Your shoes missed you.",
    body: "They're by the door doing that disappointed squeak. Lace up before they file a complaint.",
  },
  {
    title: "Easy pace only. (Seriously.)",
    body: "If you can belt out karaoke mid-run, you're probably going too fast. Save the concert for the finish line.",
  },
  {
    title: "Streak loading…",
    body: "Every champion was once someone who couldn't find their other sock. You're in good company.",
  },
  {
    title: "Rest day? Never heard of her.",
    body: "Just kidding — rest days are sacred. But your dashboard is happy to see you anyway.",
  },
  {
    title: "Packet pickup for your ego.",
    body: "Today's forecast: 100% chance of pretending the last mile didn't happen. We don't judge.",
  },
  {
    title: "The jog is calling.",
    body: "It left a voicemail that just says 'shuffle shuffle shuffle' on repeat. Classic jog behavior.",
  },
  {
    title: "Hydration check!",
    body: "If your water bottle has a name, you're either a serious runner or very lonely. Either way, welcome back.",
  },
  {
    title: "Negative splits, positive vibes.",
    body: "Or positive snacks. We're not picky. Glad you're back on LetsRunNow.",
  },
  {
    title: "Your watch is synced and judging.",
    body: "Garmin people know. Apple Watch people know. Coros people know peace. All are welcome here.",
  },
  {
    title: "One more mile won't hurt.",
    body: "Famous last words before ice on a Tuesday. But hey — you're logged in, and that's a start.",
  },
];

export const AUTH_WELCOME_STORAGE_KEY = "letsrunnow-auth-welcome";

export type AuthWelcomeKind = "new" | "login";

export function pickRandomLoginMessage(): AuthWelcomeMessage {
  const index = Math.floor(Math.random() * LOGIN_WELCOME_MESSAGES.length);
  return LOGIN_WELCOME_MESSAGES[index];
}
