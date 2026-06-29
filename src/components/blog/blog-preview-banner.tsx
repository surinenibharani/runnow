type BlogPreviewBannerProps = {
  /** When set, banner copy refers to the index with N scheduled posts. */
  scheduledCount?: number;
  /** When set, banner copy refers to a single post's go-live time. */
  publishSchedule?: string;
};

export function BlogPreviewBanner({
  scheduledCount,
  publishSchedule,
}: BlogPreviewBannerProps) {
  const detail =
    publishSchedule != null
      ? `This post is scheduled for ${publishSchedule}.`
      : scheduledCount != null && scheduledCount > 0
        ? `Showing ${scheduledCount} scheduled post${scheduledCount === 1 ? "" : "s"} that ${scheduledCount === 1 ? "is" : "are"} not public yet.`
        : "You are viewing posts that are not public yet.";

  return (
    <div
      className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm"
      role="status"
    >
      <p className="font-semibold text-foreground">Preview mode</p>
      <p className="mt-1 leading-relaxed text-muted-foreground">
        {detail} Scheduled posts go live at 7:00 AM US Eastern on their publish
        date. This preview is not indexed by search engines.
      </p>
    </div>
  );
}
