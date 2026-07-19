export type MileageBand = "under-10" | "10-25" | "25-40" | "over-40";
export type RunningSurface = "road" | "trail" | "mixed";
export type CushionPreference = "soft" | "moderate" | "firm";
export type InjuryHistory = "none" | "past" | "current";

export type ShoeQuizAnswers = {
  mileage: MileageBand;
  surface: RunningSurface;
  cushion: CushionPreference;
  injury: InjuryHistory;
};

export type ShoeRecommendation = {
  /** Short category label, e.g. "Daily trainer — cushioned" */
  category: string;
  summary: string;
  /** Plain-language tips — not medical advice */
  tips: string[];
  /** Deep link into the gear guide shoes section */
  gearHref: "/gear#shoes";
};

const GEAR_SHOES_HREF = "/gear#shoes" as const;

/**
 * Map quiz answers to beginner-friendly shoe category guidance.
 * Guidance only — not a diagnosis or prescription.
 */
export function recommendShoeCategory(
  answers: ShoeQuizAnswers
): ShoeRecommendation {
  const { mileage, surface, cushion, injury } = answers;

  const tips: string[] = [
    "Get fitted late in the day when feet are a bit swollen, and leave a thumb's width at the toe.",
    "Replace shoes when the midsole feels flat or you notice new aches that line up with worn-out foam — mileage varies by shoe and runner.",
  ];

  if (injury === "current") {
    tips.unshift(
      "If something hurts now, pause the quiz outcome and check in with a clinician or physical therapist before buying a new pair — shoes help comfort, they don’t treat injuries."
    );
  } else if (injury === "past") {
    tips.unshift(
      "Past niggles often mean prioritizing comfort and a gradual return — consider a gait check at a running store, not a drastic shoe change overnight."
    );
  }

  if (surface === "trail") {
    return {
      category: "Trail shoe",
      summary:
        "Look for a trail shoe with reliable grip and a bit of protection underfoot. Road foam on dirt often feels slippery.",
      tips: [
        ...tips,
        "Match lug depth to your usual trails — deeper for mud and roots, milder for dry fire roads.",
        cushion === "firm"
          ? "A firmer trail ride can feel stable on technical ground; still try them on — ‘firm’ is personal."
          : "A cushioned trail shoe can take the edge off rocky miles without needing max-stack road foam.",
      ],
      gearHref: GEAR_SHOES_HREF,
    };
  }

  if (surface === "mixed") {
    tips.push(
      "If you mostly run pavement with occasional easy trails, a road daily trainer is usually enough; save dedicated trail shoes for frequent off-road."
    );
  }

  let category = "Daily trainer";
  let summary =
    "A versatile road daily trainer is the right first (or next) shoe for most beginners — comfortable, durable, and easy to find in stores.";

  if (cushion === "soft") {
    category = "Daily trainer — cushioned";
    summary =
      "Lean toward a cushioned daily trainer with a soft landing. Great for easy miles and longer efforts as volume builds.";
  } else if (cushion === "firm") {
    category = "Daily trainer — firmer ride";
    summary =
      "A firmer daily trainer can feel more connected to the road. Try a few on — firmness is preference, not performance magic.";
  } else {
    category = "Daily trainer — balanced";
    summary =
      "A middle-of-the-road daily trainer suits most new runners: enough cushion for comfort, not so soft that it feels unstable.";
  }

  if (mileage === "over-40" || mileage === "25-40") {
    tips.push(
      "Higher weekly mileage means rotating two pairs can help each midsole recover between hard weeks — optional, not required on day one."
    );
  } else if (mileage === "under-10") {
    tips.push(
      "At low weekly mileage, one well-fitted pair is plenty — spend on fit, not on racing plates or carbon."
    );
  }

  if (injury !== "none" && cushion !== "soft") {
    tips.push(
      "Many runners with a history of impact-related aches prefer a bit more cushion on easy days — still a preference, not a cure."
    );
  }

  return {
    category,
    summary,
    tips,
    gearHref: GEAR_SHOES_HREF,
  };
}
