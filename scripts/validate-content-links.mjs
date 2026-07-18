#!/usr/bin/env node
/**
 * Validates internal content links against app routes, blog slugs, and known anchors.
 * Run: node scripts/validate-content-links.mjs
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const blogDir = path.join(root, "src/lib/blog");

/** Blog posts live across posts.ts + posts-*.ts gap modules — scan all of them. */
function readBlogPostSources() {
  return fs
    .readdirSync(blogDir)
    .filter((name) => /^posts.*\.ts$/.test(name))
    .map((name) => fs.readFileSync(path.join(blogDir, name), "utf8"));
}

const blogSources = readBlogPostSources();
const blogSlugs = new Set();
const blogSectionIds = new Set();
for (const src of blogSources) {
  for (const m of src.matchAll(/slug: "([^"]+)"/g)) blogSlugs.add(m[1]);
  for (const m of src.matchAll(/\bid: "([^"]+)"/g)) blogSectionIds.add(m[1]);
}

const staticRoutes = new Set([
  "",
  "/plan",
  "/blog",
  "/tips",
  "/tips/bad-weather",
  "/tips/specific-situations",
  "/gear",
  "/injuries",
  "/injuries/for-women-runners",
  "/injuries/for-men-runners",
  "/stories",
  "/instagram",
  "/dashboard",
  "/search",
  "/teams",
  "/privacy",
  "/terms",
  "/login",
  "/signup",
]);

const commonInjurySlugs = new Set(
  [...fs.readFileSync(path.join(root, "src/lib/injuries/common-injuries.ts"), "utf8").matchAll(
    /slug: "([^"]+)"/g
  )].map((m) => m[1])
);

const concernIds = new Set(
  [
    ...fs
      .readFileSync(path.join(root, "src/lib/injuries/women-runner-concerns.ts"), "utf8")
      .matchAll(/id: "([^"]+)"/g),
    ...fs
      .readFileSync(path.join(root, "src/lib/injuries/men-runner-concerns.ts"), "utf8")
      .matchAll(/id: "([^"]+)"/g),
  ].map((m) => m[1])
);

const gearSlugs = new Set(
  [...fs.readFileSync(path.join(root, "src/lib/gear/items.ts"), "utf8").matchAll(/slug: "([^"]+)"/g)].map(
    (m) => m[1]
  )
);
gearSlugs.add("start-here");
gearSlugs.add("level-up");

const tipSlugs = new Set();
const tipsSrc = fs.readFileSync(path.join(root, "src/lib/tips/tips.ts"), "utf8");
for (const m of tipsSrc.matchAll(/slug: "([^"]+)"/g)) tipSlugs.add(m[1]);
for (const m of tipsSrc.matchAll(/slugifyTipTitle\("([^"]+)"\)/g)) {
  tipSlugs.add(
    m[1]
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  );
}

function collectFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      collectFiles(full, acc);
    } else if (/\.(tsx?|mdx?)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

const hrefPattern = /(?:href:\s*"(\/[^"]+)"|\]\((\/[^)]+)\))/g;
const issues = [];

for (const file of collectFiles(path.join(root, "src"))) {
  if (file.endsWith("format-blog-text.tsx")) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(hrefPattern)) {
    const raw = match[1] ?? match[2];
    if (!raw || !raw.startsWith("/")) continue;
    const [pathname, hash = ""] = raw.split("#");
    const rel = path.relative(root, file);

    if (pathname.startsWith("/blog/")) {
      const rest = pathname.slice("/blog/".length);
      if (rest.endsWith("/printable/schedule")) {
        const slug = rest.slice(0, -"/printable/schedule".length);
        if (!blogSlugs.has(slug)) {
          issues.push(`${rel}: unknown blog slug ${pathname}`);
        }
        continue;
      }
      if (rest.endsWith("/printable")) {
        const slug = rest.slice(0, -"/printable".length);
        if (!blogSlugs.has(slug)) {
          issues.push(`${rel}: unknown blog slug ${pathname}`);
        }
        continue;
      }
      const slug = rest;
      if (!blogSlugs.has(slug)) {
        issues.push(`${rel}: unknown blog slug ${pathname}`);
      }
      if (hash && !blogSectionIds.has(hash) && hash !== "faq" && hash !== "comments") {
        issues.push(`${rel}: unknown blog anchor ${raw}`);
      }
      continue;
    }

    if (pathname.startsWith("/injuries/for-women-runners")) {
      const sub = pathname.slice("/injuries/for-women-runners".length);
      if (sub && sub !== "/") {
        const slug = sub.replace(/^\//, "");
        if (slug && !concernIds.has(slug)) {
          issues.push(`${rel}: unknown women runner concern ${pathname}`);
        }
      } else if (hash && !concernIds.has(hash)) {
        issues.push(`${rel}: unknown injury anchor ${raw}`);
      }
      continue;
    }

    if (pathname.startsWith("/injuries/for-men-runners")) {
      const sub = pathname.slice("/injuries/for-men-runners".length);
      if (sub && sub !== "/") {
        const slug = sub.replace(/^\//, "");
        if (slug && !concernIds.has(slug)) {
          issues.push(`${rel}: unknown men runner concern ${pathname}`);
        }
      } else if (hash && !concernIds.has(hash)) {
        issues.push(`${rel}: unknown injury anchor ${raw}`);
      }
      continue;
    }

    if (pathname.startsWith("/injuries/")) {
      const slug = pathname.slice("/injuries/".length);
      if (slug && !commonInjurySlugs.has(slug)) {
        issues.push(`${rel}: unknown common injury slug ${pathname}`);
      }
      continue;
    }

    if (pathname === "/injuries" && hash && !commonInjurySlugs.has(hash)) {
      issues.push(`${rel}: unknown injury anchor ${raw}`);
      continue;
    }

    if (pathname === "/gear") {
      if (hash && !gearSlugs.has(hash)) {
        issues.push(`${rel}: unknown gear anchor ${raw}`);
      }
      continue;
    }

    if (pathname.startsWith("/tips/")) {
      const slug = pathname.slice("/tips/".length);
      if (
        slug &&
        slug !== "bad-weather" &&
        slug !== "specific-situations" &&
        !tipSlugs.has(slug)
      ) {
        issues.push(`${rel}: unknown tip slug ${pathname}`);
      }
      continue;
    }

    if (pathname === "/tips" && hash) {
      if (!tipSlugs.has(hash)) {
        issues.push(`${rel}: unknown tips anchor ${raw}`);
      }
      continue;
    }

    if (pathname.startsWith("/plan")) continue;

    if (!staticRoutes.has(pathname) && !pathname.startsWith("/api")) {
      issues.push(`${rel}: unknown route ${pathname}`);
    }
  }
}

if (issues.length) {
  console.error("Link validation issues:\n" + issues.join("\n"));
  process.exit(1);
}

console.log(`OK — ${blogSlugs.size} blog slugs, no broken internal links in src/`);
