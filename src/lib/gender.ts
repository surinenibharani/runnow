export const GENDER_VALUES = [
  "male",
  "female",
  "prefer_not_to_say",
  "other",
] as const;

export type GenderValue = (typeof GENDER_VALUES)[number];

export type GenderFormValue = GenderValue | "";

export const GENDER_OPTIONS: { value: GenderValue; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
  { value: "other", label: "Other" },
];

export function formatGenderLabel(gender: string | null | undefined): string | null {
  if (!gender) return null;
  return GENDER_OPTIONS.find((o) => o.value === gender)?.label ?? null;
}
