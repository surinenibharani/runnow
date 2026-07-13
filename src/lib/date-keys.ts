/** Site-facing calendar dates use US Eastern (matches blog publish schedule). */
export const SITE_TIME_ZONE = "America/New_York";

function readPart(parts: Intl.DateTimeFormatPart[], type: string): string {
  return parts.find((part) => part.type === type)?.value ?? "";
}

/** YYYY-MM-DD in the site time zone (not raw UTC). */
export function toZonedDateKey(
  date: Date = new Date(),
  timeZone: string = SITE_TIME_ZONE
): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  return `${readPart(parts, "year")}-${readPart(parts, "month")}-${readPart(parts, "day")}`;
}

/**
 * A stable Date inside the given calendar day in `timeZone` (local noon).
 * Useful for day-bucket comparisons without UTC date-rollover bugs.
 */
export function parseZonedDateKey(
  key: string,
  timeZone: string = SITE_TIME_ZONE
): Date {
  const [year, month, day] = key.split("-").map(Number);
  // Search a window around the civil date for an instant whose zoned clock is 12:00.
  const center = Date.UTC(year, month - 1, day, 17, 0, 0);
  for (let ms = center - 14 * 60 * 60 * 1000; ms <= center + 14 * 60 * 60 * 1000; ms += 60_000) {
    const d = new Date(ms);
    if (toZonedDateKey(d, timeZone) !== key) continue;
    const hourParts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      hour12: false,
    }).formatToParts(d);
    const hourRaw = readPart(hourParts, "hour");
    const hour = Number(hourRaw === "24" ? "0" : hourRaw);
    if (hour === 12) return d;
  }
  return new Date(Date.UTC(year, month - 1, day, 17, 0, 0));
}

/** Start-of-day boundary: first millisecond of the zoned calendar day. */
export function startOfZonedDayMs(
  date: Date = new Date(),
  timeZone: string = SITE_TIME_ZONE
): number {
  const key = toZonedDateKey(date, timeZone);
  const [year, month, day] = key.split("-").map(Number);
  const center = Date.UTC(year, month - 1, day, 12, 0, 0);
  for (let ms = center - 14 * 60 * 60 * 1000; ms <= center + 14 * 60 * 60 * 1000; ms += 60_000) {
    if (toZonedDateKey(new Date(ms), timeZone) === key) {
      // Walk back to first minute of this zoned day
      let start = ms;
      while (toZonedDateKey(new Date(start - 60_000), timeZone) === key) {
        start -= 60_000;
      }
      return start;
    }
  }
  return Date.UTC(year, month - 1, day, 5, 0, 0);
}

export function startOfZonedDay(
  date: Date = new Date(),
  timeZone: string = SITE_TIME_ZONE
): Date {
  return new Date(startOfZonedDayMs(date, timeZone));
}

/** Calendar day `n` days before `from` in the site time zone (noon). */
export function zonedDaysAgo(
  n: number,
  from: Date = new Date(),
  timeZone: string = SITE_TIME_ZONE
): Date {
  const key = toZonedDateKey(from, timeZone);
  const [year, month, day] = key.split("-").map(Number);
  const civil = new Date(Date.UTC(year, month - 1, day));
  civil.setUTCDate(civil.getUTCDate() - n);
  const y = civil.getUTCFullYear();
  const m = String(civil.getUTCMonth() + 1).padStart(2, "0");
  const d = String(civil.getUTCDate()).padStart(2, "0");
  return parseZonedDateKey(`${y}-${m}-${d}`, timeZone);
}

/** Jan 1 of the zoned year containing `date`. */
export function startOfZonedYear(
  date: Date = new Date(),
  timeZone: string = SITE_TIME_ZONE
): Date {
  const year = toZonedDateKey(date, timeZone).slice(0, 4);
  return startOfZonedDay(parseZonedDateKey(`${year}-01-01`, timeZone), timeZone);
}
