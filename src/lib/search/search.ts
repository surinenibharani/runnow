import { getSiteSearchIndex } from "./build-index";
import type { SiteSearchResult } from "./types";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/['']/g, "'");
}

function scoreItem(item: SiteSearchResult, terms: string[]): number {
  const title = normalize(item.title);
  const body = normalize(
    [item.title, item.description, item.category].filter(Boolean).join(" ")
  );

  let score = 0;

  for (const term of terms) {
    if (title === term) score += 30;
    else if (title.startsWith(term)) score += 18;
    else if (title.includes(term)) score += 12;

    if (body.includes(term)) score += 4;
  }

  return score;
}

export function searchSite(
  query: string,
  limit = 12
): SiteSearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const terms = normalize(trimmed).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return getSiteSearchIndex()
    .map((item) => ({ item, score: scoreItem(item, terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((entry) => entry.item);
}
