export const DEFAULT_AGE = 35;

export type AthleteProfile = {
  age: number | null;
  gender: string | null;
  weightKg: number | null;
  heightCm: number | null;
  restingHeartRate: number | null;
};

export function buildAthleteProfile(
  user: {
    age: number | null;
    gender?: string | null;
    weightKg?: number | null;
    heightCm?: number | null;
  },
  restingHeartRate: number | null = null
): AthleteProfile {
  return {
    age: user.age,
    gender: user.gender ?? null,
    weightKg: user.weightKg ?? null,
    heightCm: user.heightCm ?? null,
    restingHeartRate,
  };
}

export function resolveAge(profile: Pick<AthleteProfile, "age">): number {
  return profile.age ?? DEFAULT_AGE;
}

export function getBmi(profile: AthleteProfile): number | null {
  if (!profile.weightKg || !profile.heightCm) return null;
  if (profile.weightKg <= 0 || profile.heightCm <= 0) return null;
  const heightM = profile.heightCm / 100;
  return Math.round((profile.weightKg / (heightM * heightM)) * 10) / 10;
}

/**
 * Gulati for women; Tanaka for men and unspecified/other.
 * @see Gulati et al. 2010; Tanaka et al. 2001
 */
export function estimateMaxHeartRate(
  profile: Pick<AthleteProfile, "age" | "gender">
): number {
  const age = resolveAge(profile);
  if (profile.gender === "female") {
    return Math.round(209.3 - 0.804 * age);
  }
  return Math.round(208 - 0.7 * age);
}

export function maxHrFormulaLabel(
  profile: Pick<AthleteProfile, "gender">
): string {
  if (profile.gender === "female") return "Gulati formula (female)";
  if (profile.gender === "male") return "Tanaka formula (male)";
  return "Tanaka formula";
}

/** Population-typical resting HR adjusted for sex and age when no personal baseline exists. */
export function estimateExpectedRestingHr(
  profile: Pick<AthleteProfile, "age" | "gender">
): number {
  const age = resolveAge(profile);
  let base = 70;
  if (profile.gender === "female") base = 74;
  else if (profile.gender === "male") base = 68;
  if (age > 35) base += (age - 35) * 0.25;
  if (age < 25) base += 2;
  return Math.round(base);
}

export type SleepTarget = {
  minHours: number;
  maxHours: number;
  optimalHours: number;
};

export function getSleepTarget(profile: Pick<AthleteProfile, "age">): SleepTarget {
  const age = resolveAge(profile);
  if (age >= 65) {
    return { minHours: 7, maxHours: 8, optimalHours: 7.5 };
  }
  if (age < 18) {
    return { minHours: 8, maxHours: 10, optimalHours: 9 };
  }
  return { minHours: 7, maxHours: 9, optimalHours: 8 };
}

/** Heavier runners accumulate more musculoskeletal stress per minute. */
export function getTrainingLoadMultiplier(profile: AthleteProfile): number {
  if (!profile.weightKg || profile.weightKg <= 0) return 1;
  const referenceKg = profile.gender === "female" ? 62 : 72;
  return Math.min(1.35, Math.max(0.85, profile.weightKg / referenceKg));
}

export function getWeeklyMileageCaps(profile: AthleteProfile): {
  softCap: number;
  hardCap: number;
} {
  const age = resolveAge(profile);
  let softCap = 45;
  let hardCap = 55;

  if (age >= 55) {
    softCap = 32;
    hardCap = 40;
  } else if (age >= 45) {
    softCap = 38;
    hardCap = 48;
  } else if (age >= 35) {
    softCap = 42;
    hardCap = 52;
  }

  const bmi = getBmi(profile);
  if (bmi != null) {
    if (bmi >= 30) {
      softCap *= 0.85;
      hardCap *= 0.85;
    } else if (bmi < 18.5) {
      softCap *= 0.9;
      hardCap *= 0.9;
    }
  }

  return {
    softCap: Math.round(softCap),
    hardCap: Math.round(hardCap),
  };
}

export function getEasyHeartRateRange(profile: AthleteProfile): {
  min: number;
  max: number;
  method: "karvonen" | "percent_max";
} {
  const maxHr = estimateMaxHeartRate(profile);

  if (
    profile.restingHeartRate != null &&
    profile.restingHeartRate > 0 &&
    profile.restingHeartRate < maxHr
  ) {
    const hrr = maxHr - profile.restingHeartRate;
    return {
      min: Math.round(profile.restingHeartRate + hrr * 0.59),
      max: Math.round(profile.restingHeartRate + hrr * 0.74),
      method: "karvonen",
    };
  }

  return {
    min: Math.round(maxHr * 0.59),
    max: Math.round(maxHr * 0.74),
    method: "percent_max",
  };
}

export function hasPersonalizationData(profile: AthleteProfile): boolean {
  return (
    profile.age != null ||
    profile.gender != null ||
    profile.weightKg != null ||
    profile.heightCm != null
  );
}

export function formatProfileContext(profile: AthleteProfile): string[] {
  const parts: string[] = [];
  const maxHr = estimateMaxHeartRate(profile);

  if (profile.restingHeartRate != null && profile.restingHeartRate > 0) {
    parts.push(
      `HR reserve · resting ${Math.round(profile.restingHeartRate)} bpm · max ${maxHr} bpm`
    );
  } else if (profile.age != null || profile.gender != null) {
    parts.push(`Max ${maxHr} bpm (${maxHrFormulaLabel(profile)})`);
  } else {
    parts.push(`Default age ${DEFAULT_AGE} · max ${maxHr} bpm`);
  }

  const bmi = getBmi(profile);
  if (bmi != null) parts.push(`BMI ${bmi}`);

  if (profile.gender) {
    const label =
      profile.gender === "male"
        ? "Male"
        : profile.gender === "female"
          ? "Female"
          : null;
    if (label) parts.push(label);
  }

  return parts;
}
