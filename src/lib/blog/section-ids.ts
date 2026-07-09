/** Stable anchor id from a section heading (for TOC and deep links). */
export function slugifySectionHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Prefer explicit section.id; otherwise derive from heading. */
export function resolveSectionId(
  id: string | undefined,
  heading: string | undefined,
  fallbackIndex: number
): string | undefined {
  if (id) return id;
  if (heading) return slugifySectionHeading(heading);
  return `section-${fallbackIndex + 1}`;
}
