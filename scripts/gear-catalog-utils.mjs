import { GEAR_CATEGORY_MAP } from "./gear-category-map.mjs";

export const GEAR_CATEGORY_SLUGS = GEAR_CATEGORY_MAP.map((category) => category.slug);

const MAX_SUGGESTIONS_PER_CATEGORY = 4;
const MAX_FEATURED_PER_CATEGORY = 2;

export function normalizeCatalogEntry(value) {
  if (Array.isArray(value)) {
    return { suggestions: value, womenSuggestions: [] };
  }
  return {
    suggestions: value.suggestions ?? [],
    womenSuggestions: value.womenSuggestions ?? [],
  };
}

export function normalizeCatalog(raw) {
  const normalized = {};
  for (const [slug, value] of Object.entries(raw)) {
    normalized[slug] = normalizeCatalogEntry(value);
  }
  return normalized;
}

export function validateGearCatalog(catalog) {
  const normalized = normalizeCatalog(catalog);
  const missing = [];
  const emptySuggestions = [];

  for (const { slug } of GEAR_CATEGORY_MAP) {
    if (!normalized[slug]) {
      missing.push(slug);
      continue;
    }
    if (!normalized[slug].suggestions.length) {
      emptySuggestions.push(slug);
    }
  }

  return { missing, emptySuggestions, normalized };
}

export function getWeekIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.floor((date.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

export function productMentioned(product, text) {
  const lower = text.toLowerCase();
  const name = product.name.toLowerCase();
  if (lower.includes(name)) return true;

  const tokens = name
    .split(/[\s/()]+/)
    .map((part) => part.replace(/[^a-z0-9]/g, ""))
    .filter((part) => part.length > 3);

  const hits = tokens.filter((token) => lower.includes(token));
  return hits.length >= Math.min(2, tokens.length);
}

export function buildPicksForProducts(products, categorizedItems, categorySlug) {
  const weekIndex = getWeekIndex();
  const mentioned = new Set();

  for (const item of categorizedItems) {
    if (item.categorySlug !== categorySlug) continue;
    const text = `${item.title} ${item.contentSnippet ?? ""}`;
    for (const product of products) {
      if (productMentioned(product, text)) {
        mentioned.add(product.name);
      }
    }
  }

  const featured = products
    .filter((product) => mentioned.has(product.name))
    .slice(0, MAX_FEATURED_PER_CATEGORY)
    .map((product) => ({
      name: product.name,
      note: product.note,
      weekly: true,
    }));

  const offset = products.length ? weekIndex % products.length : 0;
  const rotated = [...products.slice(offset), ...products.slice(0, offset)];
  const seen = new Set(featured.map((pick) => pick.name));
  const picks = [...featured];

  for (const product of rotated) {
    if (picks.length >= MAX_SUGGESTIONS_PER_CATEGORY) break;
    if (seen.has(product.name)) continue;
    picks.push({ name: product.name, note: product.note, weekly: false });
    seen.add(product.name);
  }

  return picks;
}

export function buildSuggestionsMaps(categorizedItems, catalog) {
  const validation = validateGearCatalog(catalog);
  const { normalized } = validation;
  const suggestionsByCategory = {};
  const womenSuggestionsByCategory = {};

  for (const { slug } of GEAR_CATEGORY_MAP) {
    const entry = normalized[slug] ?? { suggestions: [], womenSuggestions: [] };
    suggestionsByCategory[slug] = buildPicksForProducts(
      entry.suggestions,
      categorizedItems,
      slug
    );

    if (entry.womenSuggestions.length) {
      womenSuggestionsByCategory[slug] = buildPicksForProducts(
        entry.womenSuggestions,
        categorizedItems,
        slug
      );
    }
  }

  return {
    suggestionsByCategory,
    womenSuggestionsByCategory,
    validation,
  };
}

export function countSuggestionPicks(suggestionsByCategory) {
  return Object.values(suggestionsByCategory).reduce(
    (total, picks) => total + picks.length,
    0
  );
}
