export type ChartTimeRange =
  | "week"
  | "month"
  | "3months"
  | "6months"
  | "year"
  | "all";

export const CHART_TIME_RANGE_OPTIONS: {
  value: ChartTimeRange;
  label: string;
}[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "3months", label: "3 months" },
  { value: "6months", label: "6 months" },
  { value: "year", label: "Year" },
  { value: "all", label: "All time" },
];

const RANGE_DAYS: Record<Exclude<ChartTimeRange, "all">, number> = {
  week: 7,
  month: 30,
  "3months": 90,
  "6months": 180,
  year: 365,
};

export function parseChartTimeRange(value: string | null): ChartTimeRange {
  if (value && CHART_TIME_RANGE_OPTIONS.some((o) => o.value === value)) {
    return value as ChartTimeRange;
  }
  return "month";
}

export function getChartRangeStart(range: ChartTimeRange): Date | null {
  if (range === "all") return null;

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - RANGE_DAYS[range]);
  return start;
}

export function getChartTimeRangeLabel(range: ChartTimeRange): string {
  return (
    CHART_TIME_RANGE_OPTIONS.find((o) => o.value === range)?.label ?? "All time"
  );
}
