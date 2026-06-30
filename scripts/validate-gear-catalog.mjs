#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GEAR_CATEGORY_SLUGS } from "./gear-category-map.mjs";
import {
  countSuggestionPicks,
  buildSuggestionsMaps,
  validateGearCatalog,
} from "./gear-catalog-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(__dirname, "../src/data/gear-catalog.json");
const UPDATES_PATH = join(__dirname, "../src/data/gear-updates.json");

function main() {
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  const updates = JSON.parse(readFileSync(UPDATES_PATH, "utf8"));
  const { missing, emptySuggestions } = validateGearCatalog(catalog);

  let failed = false;

  if (missing.length) {
    failed = true;
    console.error("Missing catalog entries:", missing.join(", "));
  }

  if (emptySuggestions.length) {
    failed = true;
    console.error("Categories with empty suggestions:", emptySuggestions.join(", "));
  }

  const missingWeekly = GEAR_CATEGORY_SLUGS.filter(
    (slug) => !updates.suggestionsByCategory?.[slug]?.length
  );
  if (missingWeekly.length) {
    failed = true;
    console.error(
      "gear-updates.json missing suggestionsByCategory for:",
      missingWeekly.join(", ")
    );
  }

  const missingWomenWeekly = GEAR_CATEGORY_SLUGS.filter((slug) => {
    const entry = validateGearCatalog(catalog).normalized[slug];
    return entry?.womenSuggestions?.length && !updates.womenSuggestionsByCategory?.[slug]?.length;
  });
  if (missingWomenWeekly.length) {
    failed = true;
    console.error(
      "gear-updates.json missing womenSuggestionsByCategory for:",
      missingWomenWeekly.join(", ")
    );
  }

  const { suggestionsByCategory, womenSuggestionsByCategory } = buildSuggestionsMaps(
    updates.items ?? [],
    catalog
  );

  console.log(
    `Catalog OK for ${GEAR_CATEGORY_SLUGS.length} categories — ${countSuggestionPicks(suggestionsByCategory)} main picks, ${countSuggestionPicks(womenSuggestionsByCategory)} women picks (rebuilt from catalog + RSS items).`
  );

  if (failed) {
    process.exit(1);
  }
}

main();
