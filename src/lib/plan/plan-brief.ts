import type { CrossTrainSuggestion } from "@/lib/plan/cross-train-guidance";
import type { FitnessLevel } from "@/lib/plan-personalization";
import type { HealthPlanMode } from "@/lib/schedule-builder";

export const PLAN_BRIEF_STORAGE_KEY = "letsrunnow-plan-brief";

export type PlanAdjustment = {
  title: string;
  detail: string;
};

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
  /** Concrete plan changes driven by quiz / health answers */
  adjustments?: PlanAdjustment[];
  runDaysPerWeek?: 3 | 4;
  age?: number | null;
  fitnessLevel?: FitnessLevel;
  healthMode?: HealthPlanMode;
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

export function peekPlanBrief(): PlanBrief | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PLAN_BRIEF_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlanBrief;
  } catch {
    return null;
  }
}

export function readPlanBrief(planId: string): PlanBrief | null {
  const parsed = peekPlanBrief();
  if (!parsed || parsed.planId !== planId) return null;
  return parsed;
}

export function clearPlanBrief(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PLAN_BRIEF_STORAGE_KEY);
  } catch {
    // ignore
  }
}
