/** Tailwind classes for medical disclaimer copy site-wide. */
export const MEDICAL_DISCLAIMER_CLASS = "font-semibold text-foreground";

/**
 * Sentences that state content is educational / not medical advice.
 * Used to auto-bold disclaimer lines in blog copy and other text surfaces.
 */
export const MEDICAL_DISCLAIMER_SENTENCE_RE =
  /(?:Important:\s*)?[^.!?]*(?:isn't|is not|are not|not) medical advice[^.!?]*[.!?]|[^.!?]*(?:general education|general fitness education|educational), not (?:medical|cardiac)[^.!?]*[.!?]/gi;

export function containsMedicalDisclaimer(text: string): boolean {
  return new RegExp(MEDICAL_DISCLAIMER_SENTENCE_RE.source, "i").test(text);
}

export function isMedicalDisclaimerHeading(heading: string): boolean {
  return /not medical advice/i.test(heading);
}
