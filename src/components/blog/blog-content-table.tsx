import { FormatBlogText } from "@/components/blog/format-blog-text";
import type { BlogTable } from "@/lib/blog/types";

function cellText(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : "—";
}

export function BlogContentTable({ table }: { table: BlogTable }) {
  const otherColumns = table.columns.slice(1);

  return (
    <div className="space-y-3">
      {table.caption && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          <FormatBlogText text={table.caption} />
        </p>
      )}

      <div className="divide-y divide-border/60 md:hidden">
        {table.rows.map((row, rowIndex) => (
          <div
            key={`${row[0] ?? "row"}-${rowIndex}`}
            className="space-y-1.5 py-3 first:pt-0 last:pb-0"
          >
            <p className="text-sm font-semibold text-foreground">
              <FormatBlogText text={cellText(row[0])} />
            </p>
            {otherColumns.map((column, columnIndex) => (
              <p
                key={column}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                <span className="font-medium text-foreground/80">
                  {column}:{" "}
                </span>
                <FormatBlogText text={cellText(row[columnIndex + 1])} />
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-border/60 md:block">
        <table className="w-full min-w-[42rem] table-fixed text-left text-sm">
          <caption className="sr-only">Gear shortlist</caption>
          {table.columns.length === 4 ? (
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[28%]" />
              <col className="w-[34%]" />
              <col className="w-[20%]" />
            </colgroup>
          ) : null}
          <thead>
            <tr className="border-b border-border/80 bg-background/70">
              {table.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-3 py-2.5 font-semibold text-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={`${row[0] ?? "row"}-${rowIndex}`}
                className="border-b border-border/50 last:border-b-0 even:bg-background/40"
              >
                {table.columns.map((column, columnIndex) => (
                  <td
                    key={column}
                    className={
                      columnIndex === 0
                        ? "px-3 py-2.5 align-top font-semibold text-foreground"
                        : "px-3 py-2.5 align-top leading-snug text-muted-foreground"
                    }
                  >
                    <FormatBlogText text={cellText(row[columnIndex])} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
