import type { BlogFaqItem } from "@/lib/blog/types";
import { runnerTips, type RunnerTip } from "@/lib/tips/tips";
import {
  situationalTips,
  type SituationalTip,
} from "@/lib/tips/situational";
import { weatherTips, type WeatherTip } from "@/lib/tips/weather";
import { slugifyTipTitle } from "@/lib/tips/tips";
import { truncateMetaDescription } from "@/lib/seo/metadata";

export function getTipBySlug(slug: string): RunnerTip | undefined {
  return runnerTips.find((tip) => tip.slug === slug);
}

export function getWeatherTipBySlug(slug: string): WeatherTip | undefined {
  return weatherTips.find((tip) => tip.slug === slug);
}

export function getSituationalTipBySlug(
  slug: string
): SituationalTip | undefined {
  return situationalTips.find((tip) => tip.slug === slug);
}

export function getAllTipSlugs(): string[] {
  return runnerTips.map((tip) => tip.slug);
}

export function getAllWeatherTipSlugs(): string[] {
  return weatherTips.map((tip) => tip.slug);
}

export function getAllSituationalTipSlugs(): string[] {
  return situationalTips.map((tip) => tip.slug);
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

export function weatherTipMetaDescription(tip: WeatherTip): string {
  return truncateMetaDescription(
    [
      ...tip.outdoorTips.slice(0, 2),
      tip.skipOutdoor ? `When to skip: ${tip.skipOutdoor}` : "",
    ]
      .filter(Boolean)
      .join(" ")
  );
}

export function weatherTipSeoTitle(tip: WeatherTip): string {
  return `${tip.title} — Bad Weather Running Tips`;
}

export function situationalTipMetaDescription(tip: SituationalTip): string {
  return truncateMetaDescription(
    `${tip.tips[0] ?? ""} ${tip.caution}`.trim()
  );
}

export function situationalTipSeoTitle(tip: SituationalTip): string {
  return `${tip.title} — Running Tips for ${tip.audience}`;
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
  return [
    ...runnerTips.map((tip) => ({
      slug: tip.slug,
      path: `/tips/${tip.slug}`,
    })),
    ...weatherTips.map((tip) => ({
      slug: tip.slug,
      path: `/tips/bad-weather/${tip.slug}`,
    })),
    ...situationalTips.map((tip) => ({
      slug: tip.slug,
      path: `/tips/specific-situations/${tip.slug}`,
    })),
  ];
}

export { slugifyTipTitle };
