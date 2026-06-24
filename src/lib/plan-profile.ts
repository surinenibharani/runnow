import type { PlanPersonalization } from "@/lib/plan-personalization";
import {
  DEFAULT_PERSONALIZATION,
  parseAge,
  parseFitnessLevel,
} from "@/lib/plan-personalization";

const STORAGE_KEY = "letsrunnow-plan-profile";

export function getPlanProfile(): PlanPersonalization {
  if (typeof window === "undefined") return DEFAULT_PERSONALIZATION;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PERSONALIZATION;
    const parsed = JSON.parse(raw) as Partial<PlanPersonalization>;
    return {
      age: parseAge(parsed.age),
      fitnessLevel: parseFitnessLevel(parsed.fitnessLevel),
      goalRaceDate:
        typeof parsed.goalRaceDate === "string" ? parsed.goalRaceDate : null,
    };
  } catch {
    return DEFAULT_PERSONALIZATION;
  }
}

export function savePlanProfile(profile: PlanPersonalization): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
