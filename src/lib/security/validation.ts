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

export function isValidPostSlug(slug: string, allowedSlugs: string[]): boolean {
  return allowedSlugs.includes(slug);
}
