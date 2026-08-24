#!/usr/bin/env node
/**
 * Ensures published blog posts have metaTitle, FAQ, and HowTo (explicit or derived).
 * Run: npm run validate:seo
 */
import { execFileSync } from "child_process";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

const check = execFileSync(
  "npx",
  [
    "tsx",
    "-e",
    `
import { getPublishedBlogPosts } from "./src/lib/blog/posts.ts";

const now = new Date("2026-12-31T12:00:00-05:00");
const published = getPublishedBlogPosts(now);
const issues = [];

for (const post of published) {
  if (!post.metaTitle) issues.push(\`\${post.slug}: missing metaTitle\`);
  if (!post.faq?.length) issues.push(\`\${post.slug}: missing FAQ\`);
  if (!post.howTo) issues.push(\`\${post.slug}: missing howTo\`);
}

if (issues.length) {
  console.error(issues.join("\\n"));
  process.exit(1);
}
console.log(\`OK — \${published.length} published posts have metaTitle, FAQ, and HowTo\`);
`,
  ],
  { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
);

process.stdout.write(check);
