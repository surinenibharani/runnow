#!/usr/bin/env node
/**
 * Fetches running-gear RSS feeds and writes src/data/gear-updates.json.
 * Run locally: npm run gear:update
 * Scheduled: .github/workflows/update-gear-weekly.yml (Tuesdays and Fridays)
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

const FEEDS = [
  { name: "Believe in the Run", url: "https://believeintherun.com/feed/" },
  { name: "Runner's World", url: "https://www.runnersworld.com/rss/all.xml/" },
  { name: "DC Rainmaker", url: "https://www.dcrainmaker.com/feed" },
  { name: "iRunFar", url: "https://www.irunfar.com/feed/" },
  { name: "Road Trail Run", url: "https://www.roadtrailrun.com/feeds/posts/default" },
];

const GEAR_SIGNAL =
  /\b(shoe|shoes|trainer|trainers|sneaker|sneakers|footwear|garmin|coros|forerunner|fenix|apple watch|gps watch|hydration|vest|apparel|shorts|tights|leggings|gel|gels|electrolyte|strava|hoka|saucony|asics|brooks|adidas|adizero|goodr|nuun|maurten|salomon|lululemon|sunglasses|spf|chafe|socks?|headwear|beanie)\b/i;

const GEAR_URL_SIGNAL = /\/(shoe-reviews?|gear|gear-review|reviews?)\b/i;

const SKIP_SIGNAL =
  /\b(leash|leashes|dog|storage|entryway|playlist|broadcast|how to watch|treadmill|underwear)\b/i;

const parser = new Parser({
  timeout: 15000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; LetsRunNowGearBot/1.0; +https://www.letsrunnow.com/gear)",
  },
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

function isGearRelated(title, content, url) {
  const text = `${title} ${content}`;
  if (SKIP_SIGNAL.test(text) || SKIP_SIGNAL.test(url)) return false;
  if (GEAR_URL_SIGNAL.test(url)) return true;
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
    return {
      ok: true,
      items: (parsed.items ?? []).map((item) => ({
        title: (item.title ?? "").trim(),
        url: (item.link ?? item.guid ?? "").trim(),
        source: feed.name,
        publishedAt:
          parseDate(item.isoDate ?? item.pubDate)?.toISOString() ?? new Date().toISOString(),
        contentSnippet: (item.contentSnippet ?? item.content ?? "").slice(0, 500),
      })),
    };
  } catch (error) {
    console.warn(`Feed failed (${feed.name}):`, error.message);
    return { ok: false, items: [] };
  }
}

async function main() {
  const rawItems = [];
  let sourcesChecked = 0;

  for (const feed of FEEDS) {
    const { ok, items } = await fetchFeed(feed);
    if (ok) sourcesChecked += 1;
    rawItems.push(...items);
  }

  const seen = new Set();
  const categorizedItems = [];

  for (const item of rawItems.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )) {
    if (!item.title || !item.url || seen.has(item.url)) continue;
    if (!isGearRelated(item.title, item.contentSnippet, item.url)) continue;
    if (!isRecent(parseDate(item.publishedAt))) continue;

    const category = categorizeGearText(
      `${item.title} ${item.contentSnippet} ${item.url}`
    );
    if (!category) continue;

    seen.add(item.url);
    categorizedItems.push({
      title: item.title,
      url: item.url,
      source: item.source,
      publishedAt: item.publishedAt,
      categorySlug: category.slug,
      categoryTitle: category.title,
      contentSnippet: item.contentSnippet,
    });
  }

  const items = categorizedItems.slice(0, MAX_NEWS_ITEMS).map((item) => ({
    title: item.title,
    url: item.url,
    source: item.source,
    publishedAt: item.publishedAt,
    categorySlug: item.categorySlug,
    categoryTitle: item.categoryTitle,
  }));
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

  if (sourcesChecked === 0) {
    console.warn(
      "All RSS feeds failed — catalog picks still rotated by week. Next scheduled run will retry."
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
