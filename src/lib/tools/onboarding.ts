import {
  getCrossTrainGuidanceForAnswers,
  healthFocusLabel,
  type CrossTrainSuggestion,
} from "@/lib/plan/cross-train-guidance";
import { getPlanById, getPlansForFamily, type TrainingPlan } from "@/lib/plans";

export type OnboardingExperience =
  | "never"
  | "walk-run"
  | "jog-20"
  | "consistent";

/** Longest continuous easy jog you can do today (not walking). */
export type OnboardingLongestRun =
  | "none"
  | "under-10"
  | "10-20"
  | "20-30"
  | "30-plus";

export type OnboardingGoal =
  | "get-started"
  | "5k"
  | "10k"
  | "half"
  | "marathon";

/** Rough timeline until you want to be race-ready / finish the plan. */
export type OnboardingTimeline =
  | "no-rush"
  | "4-6"
  | "8-12"
  | "12-plus";

export type OnboardingDays = 3 | 4;

export type OnboardingAgeBand = "under-40" | "40-54" | "55-plus";

export type OnboardingSetback =
  | "none"
  | "time-off"
  | "niggle";

/** Follow-ups when coming back after time off. */
export type OnboardingTimeOffDuration =
  | "under-4w"
  | "1-3mo"
  | "3-plus-mo";

export type OnboardingTimeOffReason =
  | "life"
  | "illness"
  | "injury"
  | "other";

/** Follow-ups when the runner reports a lingering niggle. */
export type OnboardingNiggleArea =
  | "knee"
  | "shin"
  | "foot-ankle"
  | "hip"
  | "calf-achilles"
  | "other";

export type OnboardingNiggleSeverity =
  | "mild-after"
  | "during-runs"
  | "daily"
  | "sharp-worsening";

export type OnboardingAnswers = {
  experience: OnboardingExperience;
  longestRun: OnboardingLongestRun;
  goal: OnboardingGoal;
  timeline: OnboardingTimeline;
  days: OnboardingDays;
  ageBand: OnboardingAgeBand;
  setback: OnboardingSetback;
  timeOffDuration?: OnboardingTimeOffDuration;
  timeOffReason?: OnboardingTimeOffReason;
  niggleArea?: OnboardingNiggleArea;
  niggleSeverity?: OnboardingNiggleSeverity;
};

export type OnboardingFollowUpId =
  | "timeOffDuration"
  | "timeOffReason"
  | "niggleArea"
  | "niggleSeverity";

export type OnboardingStepId =
  | "experience"
  | "longestRun"
  | "goal"
  | "timeline"
  | "days"
  | "ageBand"
  | "setback";

export type OnboardingFieldId = OnboardingStepId | OnboardingFollowUpId;

export type PlanRecommendation = {
  planId: string;
  plan: TrainingPlan;
  rationale: string;
  /** Extra note when days/goal don’t perfectly match plan structure */
  note?: string;
  /** Soft caution for health / recovery context */
  caution?: string;
  /** Alternate plan id the runner might prefer */
  alternate?: { planId: string; label: string };
  /** Link to injury education when a niggle area was chosen */
  injuryHref?: string;
  /** Short label for the health focus, if any */
  healthFocus?: string | null;
  /** Cross-training tailored to section 7 answers */
  crossTrain: CrossTrainSuggestion[];
};

export const ONBOARDING_STEPS: { id: OnboardingStepId; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "longestRun", label: "Fitness" },
  { id: "goal", label: "Goal" },
  { id: "timeline", label: "Timeline" },
  { id: "days", label: "Schedule" },
  { id: "ageBand", label: "Age" },
  { id: "setback", label: "Health" },
];

export const ONBOARDING_HEALTH_DISCLAIMER =
  "LetsRunNow provides general fitness education, not medical advice. Talk to a clinician before starting or changing a program — especially if you are returning from illness, injury, or have pain that is sharp, worsening, or changing how you walk.";

/** Ordered quiz fields, including conditional Health follow-ups. */
export function getOnboardingFields(
  answers: Partial<OnboardingAnswers>
): OnboardingFieldId[] {
  const fields: OnboardingFieldId[] = ONBOARDING_STEPS.map((s) => s.id);
  if (answers.setback === "time-off") {
    fields.push("timeOffDuration", "timeOffReason");
  }
  if (answers.setback === "niggle") {
    fields.push("niggleArea", "niggleSeverity");
  }
  return fields;
}

export function isHealthField(field: OnboardingFieldId): boolean {
  return (
    field === "setback" ||
    field === "timeOffDuration" ||
    field === "timeOffReason" ||
    field === "niggleArea" ||
    field === "niggleSeverity"
  );
}

export function clearHealthFollowUps(
  answers: Partial<OnboardingAnswers>
): Partial<OnboardingAnswers> {
  const next = { ...answers };
  delete next.timeOffDuration;
  delete next.timeOffReason;
  delete next.niggleArea;
  delete next.niggleSeverity;
  return next;
}

function niggleInjuryHref(area: OnboardingNiggleArea | undefined): string | undefined {
  switch (area) {
    case "knee":
      return "/injuries/runners-knee";
    case "shin":
      return "/injuries/shin-splints";
    case "foot-ankle":
      return "/injuries/plantar-fasciitis";
    case "calf-achilles":
      return "/injuries/achilles-tendinitis";
    case "hip":
      return "/injuries/it-band-syndrome";
    default:
      return "/injuries";
  }
}

function requirePlan(id: string): TrainingPlan {
  const plan = getPlanById(id);
  if (!plan) {
    throw new Error(`Unknown plan id: ${id}`);
  }
  return plan;
}

function longestRunScore(longest: OnboardingLongestRun): number {
  switch (longest) {
    case "none":
      return 0;
    case "under-10":
      return 1;
    case "10-20":
      return 2;
    case "20-30":
      return 3;
    case "30-plus":
      return 4;
  }
}

function experienceScore(experience: OnboardingExperience): number {
  switch (experience) {
    case "never":
      return 0;
    case "walk-run":
      return 1;
    case "jog-20":
      return 2;
    case "consistent":
      return 3;
  }
}

/** Combined fitness 0–7 for variant picking. */
export function fitnessScore(answers: OnboardingAnswers): number {
  return experienceScore(answers.experience) + longestRunScore(answers.longestRun);
}

function wantsGentle(answers: OnboardingAnswers): boolean {
  return (
    answers.ageBand === "55-plus" ||
    answers.setback === "niggle" ||
    answers.setback === "time-off" ||
    answers.experience === "never" ||
    answers.longestRun === "none" ||
    answers.longestRun === "under-10" ||
    answers.niggleSeverity === "during-runs" ||
    answers.niggleSeverity === "daily" ||
    answers.niggleSeverity === "sharp-worsening" ||
    answers.timeOffDuration === "3-plus-mo" ||
    answers.timeOffReason === "injury" ||
    answers.timeOffReason === "illness"
  );
}

function timelineWeeks(timeline: OnboardingTimeline): number | null {
  switch (timeline) {
    case "no-rush":
      return null;
    case "4-6":
      return 6;
    case "8-12":
      return 12;
    case "12-plus":
      return 16;
  }
}

/**
 * Pick a duration variant within a family.
 * Gentle runners get longer plans; fit runners + tight timeline get shorter.
 */
function pickVariant(
  familyId: string,
  answers: OnboardingAnswers
): { planId: string; tightTimeline: boolean } {
  const variants = getPlansForFamily(familyId).sort(
    (a, b) => a.durationWeeks - b.durationWeeks
  );
  if (variants.length === 0) {
    throw new Error(`No plans for family ${familyId}`);
  }

  const weeks = timelineWeeks(answers.timeline);
  let fitting = variants;
  let tightTimeline = false;

  if (weeks !== null) {
    const fits = variants.filter((v) => v.durationWeeks <= weeks);
    if (fits.length > 0) {
      fitting = fits;
    } else {
      tightTimeline = true;
      fitting = [variants[0]];
    }
  }

  const score = fitnessScore(answers);
  const gentle = wantsGentle(answers);

  let pick: TrainingPlan;
  if (gentle || score <= 2) {
    pick = fitting[fitting.length - 1];
  } else if (score >= 5) {
    pick = fitting[0];
  } else {
    pick = fitting[Math.floor(fitting.length / 2)] ?? fitting[0];
  }

  return { planId: pick.id, tightTimeline };
}

function familyForGoal(
  goal: OnboardingGoal,
  readyForDistance: boolean
): { familyId: string; redirected: boolean } {
  if (goal === "get-started" || goal === "5k") {
    return { familyId: "5k", redirected: false };
  }
  if (goal === "10k") {
    return readyForDistance
      ? { familyId: "10k", redirected: false }
      : { familyId: "5k", redirected: true };
  }
  if (goal === "half") {
    return readyForDistance
      ? { familyId: "half-marathon", redirected: false }
      : { familyId: "5k", redirected: true };
  }
  return readyForDistance
    ? { familyId: "full-marathon", redirected: false }
    : { familyId: "5k", redirected: true };
}

/**
 * Ready for 10K+ only with continuous jog base and some experience.
 * Half/marathon also need higher fitness score.
 */
function readyForGoal(answers: OnboardingAnswers): boolean {
  const score = fitnessScore(answers);
  if (answers.goal === "10k") {
    return (
      score >= 4 &&
      answers.longestRun !== "none" &&
      answers.longestRun !== "under-10" &&
      answers.experience !== "never"
    );
  }
  if (answers.goal === "half") {
    return (
      score >= 5 &&
      (answers.longestRun === "20-30" || answers.longestRun === "30-plus") &&
      (answers.experience === "jog-20" || answers.experience === "consistent")
    );
  }
  if (answers.goal === "marathon") {
    return (
      score >= 6 &&
      answers.longestRun === "30-plus" &&
      answers.experience === "consistent" &&
      answers.setback === "none"
    );
  }
  return true;
}

/** Severe niggles should not jump into long-distance plans. */
function forceGentleStart(answers: OnboardingAnswers): boolean {
  return (
    answers.niggleSeverity === "sharp-worsening" ||
    answers.niggleSeverity === "daily" ||
    (answers.setback === "time-off" &&
      (answers.timeOffReason === "injury" ||
        answers.timeOffDuration === "3-plus-mo"))
  );
}

function buildRationale(
  answers: OnboardingAnswers,
  plan: TrainingPlan,
  redirected: boolean
): string {
  const focus = healthFocusLabel(
    answers.setback,
    answers.niggleArea,
    answers.timeOffReason
  );
  const healthClause = focus
    ? ` It also leaves room for recovery and cross-training aimed at ${focus}.`
    : "";

  if (redirected) {
    if (answers.goal === "10k") {
      return `A 10K is easier once continuous easy running feels boring. Start with ${plan.name} (${plan.duration}) to build that base first.${healthClause}`;
    }
    if (answers.goal === "half") {
      return `Half marathon training needs a real running base. ${plan.name} (${plan.duration}) is the safer first step — then 10K, then the half.${healthClause}`;
    }
    return `Marathon training is a long runway. ${plan.name} (${plan.duration}) builds the habit and injury buffer before bigger distances.${healthClause}`;
  }

  if (plan.familyId === "5k") {
    if (answers.experience === "never" || answers.longestRun === "none") {
      return `${plan.name} (${plan.duration}) uses short walk-run intervals so you can start from the couch without forcing continuous jogging.${healthClause}`;
    }
    if (answers.experience === "walk-run") {
      return `You’re already mixing walking and jogging — ${plan.name} (${plan.duration}) lengthens those intervals without rushing.${healthClause}`;
    }
    return `With a jog base already, ${plan.name} (${plan.duration}) is a focused block toward a comfortable 5K.${healthClause}`;
  }

  if (plan.familyId === "10k") {
    return `${plan.name} (${plan.duration}) grows your long run toward 6.2 miles while keeping most days easy.${healthClause}`;
  }
  if (plan.familyId === "half-marathon") {
    return `${plan.name} (${plan.duration}) is the gentler half build — better than compressing the peak into too few weeks.${healthClause}`;
  }
  return `${plan.name} (${plan.duration}) adds base weeks and a longer peak — a better first-marathon path than a rushed block.${healthClause}`;
}

function buildNotes(
  answers: OnboardingAnswers,
  plan: TrainingPlan,
  redirected: boolean,
  tightTimeline: boolean
): {
  note?: string;
  caution?: string;
  alternate?: PlanRecommendation["alternate"];
  injuryHref?: string;
} {
  const notes: string[] = [];
  let caution: string | undefined;

  if (tightTimeline) {
    notes.push(
      `Your timeline is tighter than the gentlest full build — this is the shortest ${plan.shortName} plan we offer. If anything hurts, stretch the timeline instead of forcing volume.`
    );
  }

  if (redirected && answers.goal === "10k") {
    notes.push("After this 5K plan, try our 8- or 10-week 10K schedules.");
  }
  if (redirected && answers.goal === "half") {
    notes.push("Path: finish 5K → 10K → half marathon plans when easy runs feel repeatable.");
  }
  if (redirected && answers.goal === "marathon") {
    notes.push("Path: 5K → 10K → half → then our 16-week marathon plan.");
  }

  if (answers.days === 4 && plan.runsPerWeek === 3) {
    notes.push(
      "This plan uses 3 run days — use the fourth for rest, walking, or easy cross-training."
    );
  }
  if (answers.days === 3 && plan.runsPerWeek === 4) {
    notes.push(
      "This plan is written for 4 run days. With 3 days free, keep the longest run and drop the easiest midweek session when life gets busy — or finish a shorter-distance plan first."
    );
  }

  if (answers.ageBand === "55-plus") {
    notes.push(
      "At 55+, favor easy effort and an extra recovery day whenever legs feel heavy."
    );
  }

  if (answers.setback === "niggle") {
    if (answers.niggleSeverity === "sharp-worsening") {
      caution =
        "Sharp, worsening, or one-spot pain that changes how you walk needs a clinician — not another training week. Plans are educational, not medical advice.";
    } else if (answers.niggleSeverity === "daily") {
      caution =
        "Pain that shows up in daily walking is a stop sign for building mileage. Get it checked, then restart easier than you think you need. This is education, not medical advice.";
    } else {
      caution =
        "Lingering pain is a reason to keep volume low and see a clinician if it worsens — plans are educational, not medical advice.";
    }
    if (answers.niggleArea) {
      notes.push(
        "Use easy effort only, skip anything that reproduces the niggle, and prefer walk-run over forcing continuous jogging. On cross-train days, use the suggested low-impact options for your niggle instead of stacking more running."
      );
    }
  }
  if (answers.setback === "time-off") {
    if (answers.timeOffDuration === "3-plus-mo") {
      notes.push(
        "After 3+ months off, treat week 1–2 like a brand-new restart — almost too easy is the goal. Lean on the suggested cross-training to rebuild fitness without rushing run volume."
      );
    } else if (answers.timeOffReason === "illness" || answers.timeOffReason === "injury") {
      notes.push(
        "Coming back after illness or injury: rebuild the habit before the ego. The first two weeks should feel boringly easy — use the suggested cross-training on non-run days."
      );
    } else {
      notes.push(
        "Coming back after time off: the first 2 weeks should feel almost too easy. Use suggested cross-training to stay consistent between easy runs."
      );
    }
  }

  let alternate: PlanRecommendation["alternate"] | undefined;
  if (!redirected && plan.familyId === "5k" && plan.id !== "5k-8w" && wantsGentle(answers)) {
    alternate = { planId: "5k-8w", label: "Prefer the full 8-week couch to 5K?" };
  }
  if (!redirected && plan.familyId === "10k" && plan.id === "10k-6w") {
    alternate = { planId: "10k-8w", label: "Want a slightly gentler 8-week 10K?" };
  }
  if (!redirected && plan.familyId === "half-marathon" && plan.id === "half-8w") {
    alternate = { planId: "half-12w", label: "Prefer the fuller 12-week half?" };
  }
  if (!redirected && plan.familyId === "full-marathon" && plan.id !== "full-16w") {
    alternate = { planId: "full-16w", label: "Prefer the fullest 16-week marathon?" };
  }

  const injuryHref =
    answers.setback === "niggle"
      ? niggleInjuryHref(answers.niggleArea)
      : undefined;

  return {
    note: notes.length ? notes.join(" ") : undefined,
    caution,
    alternate,
    injuryHref,
  };
}

/**
 * Recommend a plan from PLANS based on a fuller onboarding profile.
 */
export function recommendOnboardingPlan(
  answers: OnboardingAnswers
): PlanRecommendation {
  const gentleStart = forceGentleStart(answers);
  const ready = readyForGoal(answers) && !gentleStart;
  const { familyId, redirected } = familyForGoal(answers.goal, ready);
  const targetFamily = gentleStart ? "5k" : familyId;
  const { planId, tightTimeline } = pickVariant(targetFamily, answers);
  const plan = requirePlan(planId);
  const wasRedirected = redirected || gentleStart;
  const extras = buildNotes(answers, plan, wasRedirected, tightTimeline);

  const healthFocus = healthFocusLabel(
    answers.setback,
    answers.niggleArea,
    answers.timeOffReason
  );

  return {
    planId: plan.id,
    plan,
    rationale: buildRationale(answers, plan, wasRedirected),
    healthFocus,
    crossTrain: getCrossTrainGuidanceForAnswers(answers),
    ...extras,
  };
}

export function isOnboardingComplete(
  answers: Partial<OnboardingAnswers>
): answers is OnboardingAnswers {
  if (
    answers.experience == null ||
    answers.longestRun == null ||
    answers.goal == null ||
    answers.timeline == null ||
    answers.days == null ||
    answers.ageBand == null ||
    answers.setback == null
  ) {
    return false;
  }
  if (answers.setback === "time-off") {
    return answers.timeOffDuration != null && answers.timeOffReason != null;
  }
  if (answers.setback === "niggle") {
    return answers.niggleArea != null && answers.niggleSeverity != null;
  }
  return true;
}
