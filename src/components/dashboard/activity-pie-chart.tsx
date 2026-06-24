import type { PieSlice } from "@/lib/activity-charts";

type ActivityPieChartProps = {
  title: string;
  subtitle?: string;
  slices: PieSlice[];
  valueLabel?: string;
  emptyMessage?: string;
};

export function ActivityPieChart({
  title,
  subtitle,
  slices,
  valueLabel = "activities",
  emptyMessage = "No data yet",
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
          aria-label={`${title} pie chart`}
        >
          <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full bg-background text-center">
            <span className="text-2xl font-bold">{total}</span>
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
                />
                <span className="truncate">{slice.label}</span>
              </span>
              <span className="shrink-0 text-muted-foreground tabular-nums">
                {slice.value} ({slice.percent}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
