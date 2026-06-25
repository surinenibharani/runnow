import {
  cmToFeetInches,
  heightToCm,
  kgToLbs,
  lbsToKg,
} from "@/lib/hr-zones";
import type { GenderFormValue } from "@/lib/gender";

export type WeightUnit = "lbs" | "kg";
export type HeightUnit = "cm" | "ft";

export type BodyMetricsFormValues = {
  gender: GenderFormValue;
  age: string;
  weight: string;
  weightUnit: WeightUnit;
  heightUnit: HeightUnit;
  heightCm: string;
  heightFt: string;
  heightIn: string;
};

export type StoredBodyMetrics = {
  gender: string | null;
  age: number | null;
  weightKg: number | null;
  heightCm: number | null;
};

export const emptyBodyMetricsForm = (): BodyMetricsFormValues => ({
  gender: "",
  age: "",
  weight: "",
  weightUnit: "lbs",
  heightUnit: "ft",
  heightCm: "",
  heightFt: "",
  heightIn: "",
});

export function bodyMetricsFromStored(
  stored: StoredBodyMetrics,
  options?: { weightUnit?: WeightUnit; heightUnit?: HeightUnit }
): BodyMetricsFormValues {
  const weightUnit = options?.weightUnit ?? "lbs";
  const heightUnit = options?.heightUnit ?? "ft";

  const values = emptyBodyMetricsForm();
  values.gender = (stored.gender as GenderFormValue) ?? "";
  values.age = stored.age != null ? String(stored.age) : "";
  values.weightUnit = weightUnit;
  values.heightUnit = heightUnit;

  if (stored.weightKg != null) {
    values.weight =
      weightUnit === "lbs"
        ? String(Math.round(kgToLbs(stored.weightKg)))
        : String(Math.round(stored.weightKg * 10) / 10);
  }

  if (stored.heightCm != null) {
    if (heightUnit === "cm") {
      values.heightCm = String(Math.round(stored.heightCm));
    } else {
      const { feet, inches } = cmToFeetInches(stored.heightCm);
      values.heightFt = String(feet);
      values.heightIn = String(inches);
    }
  }

  return values;
}

export function bodyMetricsToStored(
  values: BodyMetricsFormValues
): StoredBodyMetrics {
  const age = values.age.trim() === "" ? null : parseInt(values.age, 10);

  let weightKg: number | null = null;
  if (values.weight.trim() !== "") {
    const w = parseFloat(values.weight);
    if (!Number.isNaN(w) && w > 0) {
      weightKg =
        values.weightUnit === "lbs"
          ? lbsToKg(w)
          : w;
    }
  }

  let heightCm: number | null = null;
  if (values.heightUnit === "cm") {
    if (values.heightCm.trim() !== "") {
      const cm = parseFloat(values.heightCm);
      if (!Number.isNaN(cm) && cm > 0) heightCm = cm;
    }
  } else if (values.heightFt.trim() !== "" || values.heightIn.trim() !== "") {
    const ft = parseInt(values.heightFt || "0", 10);
    const inches = parseInt(values.heightIn || "0", 10);
    const cm = heightToCm(ft, inches);
    if (cm > 0) heightCm = cm;
  }

  return {
    gender: values.gender || null,
    age: age != null && !Number.isNaN(age) ? age : null,
    weightKg,
    heightCm,
  };
}
