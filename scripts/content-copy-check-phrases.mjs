#!/usr/bin/env node
/**
 * Prints distinctive phrase search queries to help spot scraped copies.
 * Run: npm run content:copy-check
 *
 * Tip: paste a quoted query into Google. If another site ranks with the
 * same uncommon wording, review it for republication.
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const blogDir = path.join(root, "src/lib/blog");
const tipsPath = path.join(root, "src/lib/tips/tips.ts");

function readBlogSources() {
  return fs
    .readdirSync(blogDir)
    .filter((name) => /^posts.*\.ts$/.test(name))
    .map((name) => fs.readFileSync(path.join(blogDir, name), "utf8"));
}

/** Pull title / excerpt / first long paragraph-ish strings. */
function extractPhrases(src, { max = 40 } = {}) {
  const phrases = [];
  const patterns = [
    /title:\s*"([^"]{28,120})"/g,
    /excerpt:\s*"([^"]{40,160})"/g,
    /metaTitle:\s*"([^"]{28,120})"/g,
  ];

  for (const pattern of patterns) {
    for (const match of src.matchAll(pattern)) {
      const text = match[1]
        .replace(/\\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (text.length >= 28) phrases.push(text);
    }
  }

  // Prefer longer, more distinctive lines
  const unique = [...new Set(phrases)].sort((a, b) => b.length - a.length);
  return unique.slice(0, max);
}

function tipPhrases(src, { max = 20 } = {}) {
  const phrases = [];
  for (const match of src.matchAll(/title:\s*"([^"]{20,100})"/g)) {
    phrases.push(match[1].trim());
  }
  for (const match of src.matchAll(/content:\s*"([^"]{40,140})"/g)) {
    phrases.push(match[1].trim());
  }
  return [...new Set(phrases)].slice(0, max);
}

const blogPhrases = extractPhrases(readBlogSources().join("\n"), { max: 25 });
const tips = fs.existsSync(tipsPath)
  ? tipPhrases(fs.readFileSync(tipsPath, "utf8"), { max: 15 })
  : [];

console.log("LetsRunNow content copy-check phrases");
console.log("Search these in Google with quotes. Review unfamiliar domains.\n");

function printGroup(label, items) {
  console.log(`## ${label}`);
  for (const phrase of items) {
    const q = `"${phrase}"`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    console.log(`- ${q}`);
    console.log(`  ${url}`);
  }
  console.log("");
}

printGroup("Blog titles / excerpts", blogPhrases);
printGroup("Tips", tips);
console.log(
  `Done. ${blogPhrases.length + tips.length} queries. Re-run monthly or after big content drops.`
);
