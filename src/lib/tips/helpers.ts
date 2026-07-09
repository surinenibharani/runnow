import type { BlogFaqItem } from "@/lib/blog/types";
import { runnerTips, type RunnerTip } from "@/lib/tips/tips";
import { situationalTips } from "@/lib/tips/situational";
import { weatherTips } from "@/lib/tips/weather";
import { slugifyTipTitle } from "@/lib/tips/tips";
import { truncateMetaDescription } from "@/lib/seo/metadata";

export function getTipBySlug(slug: string): RunnerTip | undefined {
  return runnerTips.find((tip) => tip.slug === slug);
}

export function getAllTipSlugs(): string[] {
  return runnerTips.map((tip) => tip.slug);
}

export function getTipsForBlogPost(blogSlug: string): RunnerTip[] {
  return runnerTips.filter((tip) => tip.blogSlug === blogSlug);
}

export function tipMetaDescription(tip: RunnerTip): string {
  return truncateMetaDescription(tip.content);
}

export function tipSeoTitle(tip: RunnerTip): string {
  return `${tip.title} — ${tip.category} Tip for Runners`;
}

export function runnerTipsToFaq(): BlogFaqItem[] {
  return runnerTips.map((tip) => ({
    question: tip.title,
    answer: tip.content,
  }));
}

export function weatherTipsToFaq(): BlogFaqItem[] {
  return weatherTips.map((tip) => ({
    question: `How should I run in ${tip.condition.toLowerCase()}?`,
    answer: [
      ...tip.outdoorTips.slice(0, 2),
      tip.skipOutdoor ? `When to skip: ${tip.skipOutdoor}` : "",
    ]
      .filter(Boolean)
      .join(" "),
  }));
}

export function situationalTipsToFaq(): BlogFaqItem[] {
  return situationalTips.map((tip) => ({
    question: tip.title,
    answer: `${tip.tips[0] ?? ""} ${tip.caution}`.trim(),
  }));
}

export function getTipSitemapEntries(): { slug: string; path: string }[] {
  return runnerTips.map((tip) => ({
    slug: tip.slug,
    path: `/tips/${tip.slug}`,
  }));
}

export { slugifyTipTitle };
