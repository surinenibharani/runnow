#!/usr/bin/env node
/**
 * Guards against known medical-accuracy regressions in content.
 * Run: npm run validate:medical
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

const scanDirs = [
  path.join(root, "src/lib/blog"),
  path.join(root, "src/lib/tips"),
  path.join(root, "src/lib/injuries"),
  path.join(root, "src/lib/newsletter"),
];

/** @type {{ pattern: RegExp; message: string; allow?: RegExp }[]} */
const forbidden = [
  {
    pattern: /Minimum 6 weeks before any impact/i,
    message: "Postpartum copy must not treat 6 weeks as impact clearance",
  },
  {
    pattern: /6 weeks minimum.*(?:run|impact)/i,
    message: "Postpartum FAQ must clarify clearance ≠ ready to run",
  },
  {
    pattern: /\bRICE helps\b/i,
    message: "Use PEACE & LOVE framing instead of endorsing RICE",
  },
  {
    pattern: /symptoms above the neck only is the usual green light/i,
    message: "Illness return must caveat the above-the-neck rule",
  },
];

/** Files allowed to mention RICE in historical/educational contrast. */
const riceContrastAllow = /PEACE|old-school RICE|RICE taught|not endless RICE/i;

function collectFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(full, acc);
    else if (/\.(tsx?|mdx?)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

const files = scanDirs.flatMap((dir) => collectFiles(dir));
const issues = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);

  for (const rule of forbidden) {
    if (rule.pattern.test(text) && !(rule.allow && rule.allow.test(text))) {
      issues.push(`${rel}: ${rule.message}`);
    }
  }

  if (/\bRICE\b/.test(text) && !riceContrastAllow.test(text)) {
    issues.push(`${rel}: bare RICE mention — use PEACE & LOVE or historical contrast`);
  }
}

// Situational tips must ship authority links (audit P1).
const situationalPath = path.join(root, "src/lib/tips/situational.ts");
if (fs.existsSync(situationalPath)) {
  const situational = fs.readFileSync(situationalPath, "utf8");
  const tipBlocks = situational.split(/slug: slugifyTipTitle\(/).slice(1);
  for (const block of tipBlocks) {
    const titleMatch = block.match(/^"([^"]+)"/);
    if (!titleMatch) continue;
    if (!block.includes("learnMore:")) {
      issues.push(`situational.ts: missing learnMore on "${titleMatch[1]}"`);
    }
  }
}

// Newsletter ice tip should link ankle-sprain PEACE post.
const newsletterPath = path.join(root, "src/lib/newsletter/weekly-tips.ts");
if (fs.existsSync(newsletterPath)) {
  const newsletter = fs.readFileSync(newsletterPath, "utf8");
  if (
    newsletter.includes("Ice is not a personality trait") &&
    !newsletter.includes('blogSlug: "ankle-sprain-return-to-run"')
  ) {
    issues.push("weekly-tips.ts: ice/PEACE tip should link ankle-sprain-return-to-run");
  }
}

// nutrition-basics-for-beginners needs ACSM + REDs sources.
const postsPath = path.join(root, "src/lib/blog/posts.ts");
if (fs.existsSync(postsPath)) {
  const posts = fs.readFileSync(postsPath, "utf8");
  const nutritionBlock = posts.match(
    /slug: "nutrition-basics-for-beginners"[\s\S]*?sections: \[/m
  );
  if (nutritionBlock) {
    const block = nutritionBlock[0];
    if (!block.includes("nutritionAthleticPerformanceACSM2016")) {
      issues.push("posts.ts: nutrition-basics-for-beginners missing ACSM 2016 source");
    }
    if (!block.includes("redS")) {
      issues.push("posts.ts: nutrition-basics-for-beginners missing RED-S source");
    }
  }
}

// 2027 stub posts linked from live tips/newsletter must meet minimum depth before publish.
const aug23Path = path.join(root, "src/lib/blog/posts-aug23-gaps.ts");
const linkedStubSlugs = [
  "ankle-sprain-return-to-run",
  "race-fueling-gels-carb-load-beginners",
  "orthotics-when-runners-need-them",
  "metatarsalgia-running",
  "creatine-protein-masters-runners",
];
if (fs.existsSync(aug23Path)) {
  const aug23 = fs.readFileSync(aug23Path, "utf8");
  for (const slug of linkedStubSlugs) {
    const block = aug23.match(
      new RegExp(`slug: "${slug}"[\\s\\S]*?(?=\\n  \\},\\n  \\{|\\n\\];)`)
    );
    if (!block) {
      issues.push(`posts-aug23-gaps.ts: missing stub post ${slug}`);
      continue;
    }
    const text = block[0];
    const sectionCount = (text.match(/heading:/g) ?? []).length;
    const faqCount = (text.match(/question:/g) ?? []).length;
    const sourceCount = (text.match(/SOURCES\./g) ?? []).length;
    if (sectionCount < 4) {
      issues.push(
        `posts-aug23-gaps.ts: ${slug} needs ≥4 sections before publish (has ${sectionCount})`
      );
    }
    if (faqCount < 4) {
      issues.push(
        `posts-aug23-gaps.ts: ${slug} needs ≥4 FAQ items before publish (has ${faqCount})`
      );
    }
    if (sourceCount < 4) {
      issues.push(
        `posts-aug23-gaps.ts: ${slug} needs ≥4 sources before publish (has ${sourceCount})`
      );
    }
    if (!text.includes("Educational only")) {
      issues.push(`posts-aug23-gaps.ts: ${slug} missing medical disclaimer`);
    }
  }
}

// Injury hub fix steps should cite PEACE for soft-tissue entries.
const injuriesPath = path.join(root, "src/lib/injuries/common-injuries.ts");
if (fs.existsSync(injuriesPath)) {
  const injuries = fs.readFileSync(injuriesPath, "utf8");
  for (const slug of ["shin-splints", "runners-knee", "it-band-syndrome", "plantar-fasciitis", "achilles-tendinitis"]) {
    const block = injuries.match(
      new RegExp(`slug: "${slug}"[\\s\\S]*?seeSpecialist:`)
    );
    if (block && !block[0].includes("PEACE")) {
      issues.push(`common-injuries.ts: ${slug} fix steps missing PEACE framing`);
    }
  }
}

if (issues.length) {
  console.error("Medical content validation failed:\n" + issues.map((i) => `- ${i}`).join("\n"));
  process.exit(1);
}

console.log(`OK — medical content checks passed (${files.length} files scanned)`);
