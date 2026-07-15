/** Tailwind classes for medical disclaimer copy site-wide. */
export const MEDICAL_DISCLAIMER_CLASS = "font-semibold text-foreground";

/**
 * Sentences that state content is educational / not medical advice.
 * Used to auto-bold disclaimer lines in blog copy and other text surfaces.
 *
 * Covers common site patterns:
 * - "… not medical advice …"
 * - "… not medical or dietetic/nutrition advice …"
 * - "Educational only — not medical advice."
 * - "… general education, not a diagnosis …"
 * - "… not pulmonary or medical advice …"
 */
export const MEDICAL_DISCLAIMER_SENTENCE_RE =
  /(?:Important:\s*|Note:\s*)?[^.!?]*(?:isn['’]t|is not|are not|\bnot)\s+medical(?:\s+or(?:\s+\w+)*)?\s+advice[^.!?]*[.!?]|[^.!?]*(?:general (?:fitness )?education|educational(?:\s+only)?|This is education)(?:,|\s*[—–-])?\s*not\s+(?:a\s+)?(?:medical|cardiac|pulmonary|dietetic|nutrition|dermatology|diagnosis)[^.!?]*[.!?]|[^.!?]*Educational only[^.!?]*[.!?]/gi;

export function containsMedicalDisclaimer(text: string): boolean {
  return new RegExp(MEDICAL_DISCLAIMER_SENTENCE_RE.source, "i").test(text);
}

export function isMedicalDisclaimerHeading(heading: string): boolean {
  return /not medical advice/i.test(heading);
}
