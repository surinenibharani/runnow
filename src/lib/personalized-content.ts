import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { runnerTips } from "@/lib/tips/tips";
import type { FitnessLevel } from "@/lib/plan-personalization";
import type { RecoveryReadiness } from "@/lib/recovery-readiness";

export type PersonalizedTipItem = {
  kind: "tip";
  slug: string;
  title: string;
  href: string;
  reason: string;
  score: number;
};

export type PersonalizedBlogItem = {
  kind: "blog";
  slug: string;
  title: string;
  href: string;
  excerpt: string;
  reason: string;
  score: number;
};

export type PersonalizedContent = {
  tips: PersonalizedTipItem[];
  posts: PersonalizedBlogItem[];
};

type ContentContext = {
  fitnessLevel?: FitnessLevel | null;
  planFamilyId?: string | null;
  age?: number | null;
  recovery?: RecoveryReadiness | null;
  stravaConnected?: boolean;
  hasTrainingPlan?: boolean;
  month?: number; // 1–12
};

function monthNow(): number {
  return new Date().getMonth() + 1;
}

function tipKeywords(slug: string, title: string, category: string): string {
  return `${slug} ${title} ${category}`.toLowerCase();
}

function scoreTip(
  tip: (typeof runnerTips)[number],
  ctx: ContentContext
): { score: number; reason: string } {
  const text = tipKeywords(tip.slug, tip.title, tip.category);
  let score = 1;
  let reason = "Evergreen beginner tip";

  const recovery = ctx.recovery;
  if (recovery?.score != null && recovery.score < 55) {
    if (text.includes("rest") || text.includes("recovery") || text.includes("missed")) {
      score += 8;
      reason = "Matches low readiness — prioritize recovery";
    }
  }

  if (ctx.month && (ctx.month <= 2 || ctx.month === 12)) {
    if (text.includes("cold") || text.includes("layer") || text.includes("dark") || text.includes("seen")) {
      score += 7;
      reason = "Seasonal — cold / dark running";
    }
  }
  if (ctx.month && ctx.month >= 6 && ctx.month <= 8) {
    if (text.includes("water") || text.includes("hydrat") || text.includes("heat")) {
      score += 6;
      reason = "Seasonal — hot-weather habits";
    }
  }

  if (!ctx.stravaConnected && (text.includes("shoes") || text.includes("slow") || text.includes("calendar"))) {
    score += 4;
    reason = "Strong start without gadgets";
  }

  if (ctx.fitnessLevel === "beginner" || !ctx.hasTrainingPlan) {
    if (text.includes("slow") || text.includes("walk") || text.includes("calendar") || text.includes("shoes")) {
      score += 5;
      reason = "Beginner foundation";
    }
  }

  if (ctx.fitnessLevel === "intermediate" || ctx.fitnessLevel === "advanced") {
    if (text.includes("track") || text.includes("trail") || text.includes("lane")) {
      score += 4;
      reason = "Next-level skills";
    }
  }

  if (ctx.age != null && ctx.age >= 55 && text.includes("family")) {
    score += 2;
  }

  if (ctx.planFamilyId?.includes("half") || ctx.planFamilyId?.includes("marathon")) {
    if (text.includes("blister") || text.includes("chafe") || text.includes("lube") || text.includes("hydrat")) {
      score += 5;
      reason = "Longer-distance friction & fueling";
    }
  }

  return { score, reason };
}

function scorePost(
  slug: string,
  title: string,
  category: string,
  excerpt: string,
  ctx: ContentContext
): { score: number; reason: string } {
  const text = `${slug} ${title} ${category} ${excerpt}`.toLowerCase();
  let score = 1;
  let reason = "Popular beginner guide";

  if (recoveryBoost(ctx) && (text.includes("rest") || text.includes("recovery") || text.includes("sleep") || text.includes("injury"))) {
    score += 7;
    reason = "Supports recovery / staying healthy";
  }

  if (ctx.month && (ctx.month <= 2 || ctx.month === 12)) {
    if (text.includes("cold") || text.includes("winter") || text.includes("night") || text.includes("weather")) {
      score += 8;
      reason = "Seasonal safety";
    }
  }

  if (!ctx.hasTrainingPlan && (text.includes("never-ran") || text.includes("first-5k") || text.includes("habit") || text.includes("where-to-start"))) {
    score += 9;
    reason = "Getting started path";
  }

  if (ctx.planFamilyId) {
    const fam = ctx.planFamilyId.toLowerCase();
    if (fam.includes("5k") && text.includes("5k")) {
      score += 6;
      reason = "Matches your 5K plan";
    }
    if (fam.includes("10k") && text.includes("10k")) {
      score += 6;
      reason = "Matches your 10K plan";
    }
    if (fam.includes("half") && text.includes("half")) {
      score += 6;
      reason = "Matches your half plan";
    }
    if (fam.includes("full") || fam.includes("marathon")) {
      if (text.includes("marathon") || text.includes("taper") || text.includes("long-run")) {
        score += 6;
        reason = "Matches marathon training";
      }
    }
  }

  if (ctx.fitnessLevel === "beginner" && (text.includes("beginner") || text.includes("first") || text.includes("walk"))) {
    score += 3;
  }

  if (text.includes("chafing") || text.includes("blister")) {
    score += 2;
  }

  return { score, reason };
}

function recoveryBoost(ctx: ContentContext): boolean {
  return ctx.recovery?.score != null && ctx.recovery.score < 55;
}

/**
 * Ranks tips and published posts for the signed-in athlete's context.
 * Pure ranking — no LLM required.
 */
export function getPersonalizedContent(
  ctx: ContentContext,
  limits = { tips: 4, posts: 3 }
): PersonalizedContent {
  const month = ctx.month ?? monthNow();
  const fullCtx = { ...ctx, month };

  const tips = runnerTips
    .map((tip) => {
      const { score, reason } = scoreTip(tip, fullCtx);
      return {
        kind: "tip" as const,
        slug: tip.slug,
        title: tip.title,
        href: `/tips/${tip.slug}`,
        reason,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limits.tips);

  const posts = getPublishedBlogPosts()
    .map((post) => {
      const { score, reason } = scorePost(
        post.slug,
        post.title,
        post.category,
        post.excerpt,
        fullCtx
      );
      return {
        kind: "blog" as const,
        slug: post.slug,
        title: post.title,
        href: `/blog/${post.slug}`,
        excerpt: post.excerpt,
        reason,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limits.posts);

  return { tips, posts };
}
