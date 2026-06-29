/** Blog posts go live at 7:00 AM US Eastern (America/New_York, handles EST/EDT). */
const PUBLISH_TIME_ZONE = "America/New_York";
const PUBLISH_HOUR = 7;
const PUBLISH_MINUTE = 0;

const easternDateTimeParts = new Intl.DateTimeFormat("en-US", {
  timeZone: PUBLISH_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function readPart(parts: Intl.DateTimeFormatPart[], type: string): string {
  return parts.find((part) => part.type === type)?.value ?? "";
}

/** UTC timestamp when a post becomes visible on its `publishedAt` calendar day. */
export function getBlogPostPublishInstant(publishedAt: string): number {
  const dateKey = publishedAt.slice(0, 10);
  const [year, month, day] = dateKey.split("-").map(Number);

  const searchStart = Date.UTC(year, month - 1, day, 10, 0, 0);
  const searchEnd = Date.UTC(year, month - 1, day + 1, 14, 0, 0);

  for (let ms = searchStart; ms <= searchEnd; ms += 60_000) {
    const parts = easternDateTimeParts.formatToParts(new Date(ms));
    const hourRaw = readPart(parts, "hour");
    const hour = Number(hourRaw === "24" ? "0" : hourRaw);

    if (
      Number(readPart(parts, "year")) === year &&
      Number(readPart(parts, "month")) === month &&
      Number(readPart(parts, "day")) === day &&
      hour === PUBLISH_HOUR &&
      Number(readPart(parts, "minute")) === PUBLISH_MINUTE
    ) {
      return ms;
    }
  }

  throw new Error(
    `Could not resolve 7:00 AM Eastern publish time for ${dateKey}`
  );
}

export function isBlogPostPublishedAt(
  publishedAt: string,
  now: Date = new Date()
): boolean {
  return now.getTime() >= getBlogPostPublishInstant(publishedAt);
}
