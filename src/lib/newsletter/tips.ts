import {
  newsletterWeeklyTips,
  type NewsletterTip,
} from "@/lib/newsletter/weekly-tips";

export function pickRandomNewsletterTip(
  excludeSlugs: string[] = []
): NewsletterTip {
  const exclude = new Set(excludeSlugs);
  const pool = newsletterWeeklyTips.filter((tip) => !exclude.has(tip.slug));
  const choices = pool.length > 0 ? pool : newsletterWeeklyTips;
  return choices[Math.floor(Math.random() * choices.length)];
}

/** @deprecated Use pickRandomNewsletterTip */
export const pickRandomTip = pickRandomNewsletterTip;
