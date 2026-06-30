#!/usr/bin/env node
/**
 * Fetches running-gear RSS feeds and writes src/data/gear-updates.json.
 * Run locally: npm run gear:update
 * Scheduled: .github/workflows/update-gear-weekly.yml (Fridays)
 */

import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Parser from "rss-parser";
import { categorizeGearText, GEAR_CATEGORY_MAP } from "./gear-category-map.mjs";
import {
  buildSuggestionsMaps,
  countSuggestionPicks,
  validateGearCatalog,
} from "./gear-catalog-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "../src/data/gear-updates.json");
const CATALOG_PATH = join(__dirname, "../src/data/gear-catalog.json");
const MAX_AGE_DAYS = 14;
const MAX_NEWS_ITEMS = 16;
const MAX_SCAN_ITEMS = 80;

const FEEDS = [
  { name: "Believe in the Run", url: "https://believeintherun.com/feed/" },
  { name: "Runner's World", url: "https://www.runnersworld.com/rss/all.xml/" },
  { name: "DC Rainmaker", url: "https://www.dcrainmaker.com/feed" },
  { name: "iRunFar", url: "https://www.irunfar.com/feed/" },
  { name: "Road Trail Run", url: "https://www.roadtrailrun.com/feeds/posts/default" },
];

const GEAR_SIGNAL =
  /\b(run|runner|running|marathon|trail|shoe|watch|garmin|coros|hydration|gear|apparel|trainer|sneaker|shorts|tights|fuel|gel|electrolyte|strava)\b/i;

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "LetsRunNow-GearUpdater/1.0" },
});

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isRecent(date) {
  if (!date) return true;
  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  return date.getTime() >= cutoff;
}

function isGearRelated(title, content) {
  const text = `${title} ${content}`;
  return GEAR_SIGNAL.test(text);
}

function loadCatalog() {
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  const { missing, emptySuggestions } = validateGearCatalog(catalog);
  if (missing.length) {
    throw new Error(`gear-catalog.json missing categories: ${missing.join(", ")}`);
  }
  if (emptySuggestions.length) {
    throw new Error(
      `gear-catalog.json has empty suggestions for: ${emptySuggestions.join(", ")}`
    );
  }
  return catalog;
}

async function fetchFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    return (parsed.items ?? []).map((item) => ({
      title: (item.title ?? "").trim(),
      url: (item.link ?? item.guid ?? "").trim(),
      source: feed.name,
      publishedAt:
        parseDate(item.isoDate ?? item.pubDate)?.toISOString() ?? new Date().toISOString(),
      contentSnippet: (item.contentSnippet ?? item.content ?? "").slice(0, 500),
    }));
  } catch (error) {
    console.warn(`Feed failed (${feed.name}):`, error.message);
    return [];
  }
}

async function main() {
  const rawItems = [];
  let sourcesChecked = 0;

  for (const feed of FEEDS) {
    const items = await fetchFeed(feed);
    sourcesChecked += 1;
    rawItems.push(...items);
  }

  const seen = new Set();
  const categorizedItems = [];

  for (const item of rawItems.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )) {
    if (!item.title || !item.url || seen.has(item.url)) continue;
    if (!isGearRelated(item.title, item.contentSnippet)) continue;
    if (!isRecent(parseDate(item.publishedAt))) continue;

    const category = categorizeGearText(
      `${item.title} ${item.contentSnippet}`
    );

    seen.add(item.url);
    categorizedItems.push({
      title: item.title,
      url: item.url,
      source: item.source,
      publishedAt: item.publishedAt,
      categorySlug: category.slug,
      categoryTitle: category.title,
    });

    if (categorizedItems.length >= MAX_SCAN_ITEMS) break;
  }

  const items = categorizedItems.slice(0, MAX_NEWS_ITEMS);
  const catalog = loadCatalog();
  const { suggestionsByCategory, womenSuggestionsByCategory } = buildSuggestionsMaps(
    categorizedItems,
    catalog
  );
  const weeklySuggestionCount =
    countSuggestionPicks(suggestionsByCategory) +
    countSuggestionPicks(womenSuggestionsByCategory);

  const payload = {
    updatedAt: new Date().toISOString(),
    sourcesChecked,
    feedCount: FEEDS.length,
    categories: GEAR_CATEGORY_MAP.map((c) => ({ slug: c.slug, title: c.title })),
    items,
    suggestionsByCategory,
    womenSuggestionsByCategory,
  };

  writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${items.length} headline(s), ${weeklySuggestionCount} weekly suggestion(s) from ${sourcesChecked}/${FEEDS.length} feeds → ${OUTPUT}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
