import type { PieSlice } from "@/lib/activity-charts";
import { chartDataSummary } from "@/lib/a11y/labels";

type ActivityPieChartProps = {
  title: string;
  subtitle?: string;
  slices: PieSlice[];
  valueLabel?: string;
  emptyMessage?: string;
  /** Show values and percents with up to this many decimal places (e.g. HR zone minutes). */
  maxDecimals?: number;
};

function formatUpToDecimals(value: number, maxDecimals: number): string {
  if (maxDecimals <= 0) return String(value);
  const factor = 10 ** maxDecimals;
  const rounded = Math.round(value * factor) / factor;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(maxDecimals);
}

export function ActivityPieChart({
  title,
  subtitle,
  slices,
  valueLabel = "activities",
  emptyMessage = "No data yet",
  maxDecimals = 0,
}: ActivityPieChartProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);

  if (total === 0) {
    return (
      <div>
        <h3 className="font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
        <p className="text-sm text-muted-foreground mt-6">{emptyMessage}</p>
      </div>
    );
  }

  let cumulative = 0;
  const gradientStops = slices.map((slice) => {
    const start = (cumulative / total) * 100;
    cumulative += slice.value;
    const end = (cumulative / total) * 100;
    return `${slice.color} ${start}% ${end}%`;
  });

  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div
          className="relative size-44 shrink-0 rounded-full shadow-inner ring-1 ring-border/40"
          style={{
            background: `conic-gradient(${gradientStops.join(", ")})`,
          }}
          role="img"
          aria-label={chartDataSummary(
            slices.map((s) => ({
              label: s.label,
              value: s.value,
              percent: s.percent,
            })),
            title
          )}
        >
          <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full bg-background text-center">
            <span className="text-2xl font-bold">
              {formatUpToDecimals(total, maxDecimals)}
            </span>
            <span className="text-xs text-muted-foreground">{valueLabel}</span>
          </div>
        </div>
        <ul className="w-full space-y-2.5 text-sm">
          {slices.map((slice) => (
            <li
              key={slice.label}
              className="flex items-center justify-between gap-3"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                  aria-hidden
                />
                <span className="truncate">{slice.label}</span>
              </span>
              <span className="shrink-0 text-muted-foreground tabular-nums">
                {formatUpToDecimals(slice.value, maxDecimals)} (
                {formatUpToDecimals(slice.percent, maxDecimals)}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
