import { GENDER_VALUES, type GenderValue } from "@/lib/gender";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export type PasswordRequirement = {
  id: string;
  label: string;
  met: boolean;
};

export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    {
      id: "length",
      label: "At least 8 characters",
      met: password.length >= PASSWORD_MIN_LENGTH,
    },
    {
      id: "upper",
      label: "One uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      id: "lower",
      label: "One lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "One number",
      met: /\d/.test(password),
    },
    {
      id: "special",
      label: "One symbol (e.g. !@#$%)",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
}

export function isValidPassword(password: string): boolean {
  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return false;
  }
  return getPasswordRequirements(password).every((req) => req.met);
}

export function passwordValidationMessage(password: string): string | null {
  const unmet = getPasswordRequirements(password).filter((req) => !req.met);
  if (unmet.length === 0) return null;
  return `Choose a stronger password: ${unmet.map((req) => req.label.toLowerCase()).join(", ")}.`;
}

export function parseAge(age: unknown): number | null {
  if (age === undefined || age === null || age === "") return null;
  const parsed = parseInt(String(age), 10);
  if (Number.isNaN(parsed) || parsed < 13 || parsed > 100) return null;
  return parsed;
}

export function parseWeightKg(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 25 || parsed > 250) return null;
  return Math.round(parsed * 10) / 10;
}

export function parseHeightCm(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 100 || parsed > 260) return null;
  return Math.round(parsed * 10) / 10;
}

export function parseGender(value: unknown): GenderValue | null {
  if (value === undefined || value === null || value === "") return null;
  const normalized = String(value).trim().toLowerCase();
  if ((GENDER_VALUES as readonly string[]).includes(normalized)) {
    return normalized as GenderValue;
  }
  return null;
}

export function isValidPostSlug(slug: string, allowedSlugs: string[]): boolean {
  return allowedSlugs.includes(slug);
}
