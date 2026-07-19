import type { CrossTrainSuggestion } from "@/lib/plan/cross-train-guidance";

export const PLAN_BRIEF_STORAGE_KEY = "letsrunnow-plan-brief";

export type PlanBrief = {
  planId: string;
  /** Why this plan was suggested */
  rationale: string;
  note?: string;
  caution?: string;
  injuryHref?: string;
  /** Health focus label e.g. "knee comfort" */
  healthFocus?: string | null;
  crossTrain: CrossTrainSuggestion[];
  fromQuiz: boolean;
  savedAt: string;
};

export function savePlanBrief(brief: PlanBrief): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PLAN_BRIEF_STORAGE_KEY, JSON.stringify(brief));
  } catch {
    // ignore quota / private mode
  }
}

export function readPlanBrief(planId: string): PlanBrief | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PLAN_BRIEF_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlanBrief;
    if (parsed.planId !== planId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPlanBrief(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PLAN_BRIEF_STORAGE_KEY);
  } catch {
    // ignore
  }
}
