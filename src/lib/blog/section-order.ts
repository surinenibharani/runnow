import type { BlogSection } from "./types";

/** Headings that are citation dumps, not the "what to do" pass. */
const RESEARCH_HEADING_RE = [
  /what medical journals/i,
  /what the journals actually (say|show)/i,
  /what the journals show/i,
  /what journals (actually )?(show|say|suggest)/i,
  /journals suggest next/i,
  /\(what the journals show\)/i,
  /what the research says/i,
  /what cadence research actually says/i,
  /what the science actually shows/i,
  /what the running meta-analysis suggests/i,
  /what acsm recommends/i,
  /what the evidence supports/i,
  /^sleep is not a lifestyle bonus/i,
  /^stacking load can steal sleep/i,
];

const RESEARCH_IDS = new Set([
  "the-research",
  "sleep-is-the-workout",
  "overreaching-steals-sleep",
  "what-journals-do-not-say",
  "myth-vs-journals",
  "what-research-shows",
  "what-journals-show",
  "what-science-shows",
  "proven-benefits",
  "cadence-research",
  "running-meta",
]);

/** True when a section is journal/evidence write-up rather than practical guidance. */
export function isResearchBlogSection(section: BlogSection): boolean {
  if (section.id && RESEARCH_IDS.has(section.id)) return true;
  const heading = section.heading ?? "";
  if (!heading) return false;
  return RESEARCH_HEADING_RE.some((pattern) => pattern.test(heading));
}

/**
 * Lead with the intro and what-to-do sections; park research/reference
 * sections just before FAQ and Sources (which PostContent already renders last).
 */
export function orderBlogSectionsForReading(
  sections: BlogSection[]
): BlogSection[] {
  if (sections.length < 2) return sections;

  const intro: BlogSection[] = [];
  const practical: BlogSection[] = [];
  const research: BlogSection[] = [];

  sections.forEach((section, index) => {
    if (index === 0 && !section.heading) {
      intro.push(section);
      return;
    }
    if (isResearchBlogSection(section)) {
      research.push(section);
      return;
    }
    practical.push(section);
  });

  if (research.length === 0) return sections;

  const next = [...intro, ...practical, ...research];
  const unchanged = next.every((section, index) => section === sections[index]);
  return unchanged ? sections : next;
}
