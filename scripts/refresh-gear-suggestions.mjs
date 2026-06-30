#!/usr/bin/env node
/**
 * Rebuilds suggestion rotations from gear-catalog.json without fetching RSS.
 * Run: npm run gear:refresh-suggestions
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GEAR_CATEGORY_MAP } from "./gear-category-map.mjs";
import {
  buildSuggestionsMaps,
  countSuggestionPicks,
  validateGearCatalog,
} from "./gear-catalog-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(__dirname, "../src/data/gear-catalog.json");
const UPDATES_PATH = join(__dirname, "../src/data/gear-updates.json");

function main() {
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  const existing = JSON.parse(readFileSync(UPDATES_PATH, "utf8"));
  const { missing, emptySuggestions } = validateGearCatalog(catalog);

  if (missing.length || emptySuggestions.length) {
    console.error("Invalid gear catalog.");
    if (missing.length) console.error("Missing:", missing.join(", "));
    if (emptySuggestions.length) {
      console.error("Empty suggestions:", emptySuggestions.join(", "));
    }
    process.exit(1);
  }

  const { suggestionsByCategory, womenSuggestionsByCategory } = buildSuggestionsMaps(
    existing.items ?? [],
    catalog
  );

  const payload = {
    ...existing,
    updatedAt: existing.updatedAt ?? new Date().toISOString(),
    categories: GEAR_CATEGORY_MAP.map((category) => ({
      slug: category.slug,
      title: category.title,
    })),
    suggestionsByCategory,
    womenSuggestionsByCategory,
  };

  writeFileSync(UPDATES_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    `Refreshed ${countSuggestionPicks(suggestionsByCategory)} main + ${countSuggestionPicks(womenSuggestionsByCategory)} women suggestion(s) → ${UPDATES_PATH}`
  );
}

main();
