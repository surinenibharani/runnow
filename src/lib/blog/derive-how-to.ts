import type { BlogPost } from "./types";

/** Strip markdown links for HowTo step text. */
function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
}

/**
 * Derive HowTo schema from section headings when a post has no explicit howTo.
 * Used for published pillars that predate structured howTo blocks.
 */
export function deriveHowToFromPost(
  post: BlogPost
): BlogPost["howTo"] | undefined {
  if (post.howTo) return post.howTo;

  const steps: { name: string; text: string }[] = [];

  for (const section of post.sections) {
    const name = section.heading ?? section.id?.replace(/-/g, " ");
    if (!name) continue;

    const raw =
      section.paragraphs?.[0] ??
      section.list?.[0] ??
      section.subsections?.[0]?.list?.[0] ??
      section.subsections?.[0]?.paragraphs?.[0];

    if (!raw) continue;

    steps.push({
      name: plainText(name).slice(0, 120),
      text: plainText(raw).slice(0, 500),
    });

    if (steps.length >= 4) break;
  }

  if (steps.length < 2) return undefined;

  const title = post.title.replace(/^how to /i, "");
  return {
    name: `How to ${title.charAt(0).toLowerCase()}${title.slice(1)}`.slice(0, 120),
    description: post.excerpt,
    steps,
  };
}
