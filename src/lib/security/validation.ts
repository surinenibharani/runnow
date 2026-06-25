import { GENDER_VALUES, type GenderValue } from "@/lib/gender";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8 && password.length <= 128;
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
