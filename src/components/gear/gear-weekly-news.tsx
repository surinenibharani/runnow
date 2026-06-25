import Link from "next/link";
import { ExternalLink, Newspaper, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GearUpdates } from "@/lib/gear/types";
import { formatGearUpdatedAt } from "@/lib/gear/updates";

type GearWeeklyNewsProps = {
  updates: GearUpdates;
};

export function GearWeeklyNews({ updates }: GearWeeklyNewsProps) {
  const updatedLabel = formatGearUpdatedAt(updates.updatedAt);

  return (
    <section aria-labelledby="gear-weekly-heading" className="scroll-mt-24">
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Newspaper className="size-5 text-primary shrink-0" aria-hidden />
              <CardTitle id="gear-weekly-heading" className="text-lg">
                This week in running gear
              </CardTitle>
            </div>
            <Badge variant="secondary" className="gap-1.5 font-normal">
              <RefreshCw className="size-3" aria-hidden />
              Updated {updatedLabel}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Headlines and top suggestions refresh from trusted running gear
            RSS feeds every Friday.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {updates.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Fresh gear news will appear here after the next Friday update.
            </p>
          ) : (
            <ul className="space-y-3">
              {updates.items.map((item) => (
                <li
                  key={item.url}
                  className="rounded-xl border border-border/60 bg-muted/20 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Badge variant="outline" className="text-xs">
                      {item.categoryTitle}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.source}
                      {" · "}
                      <time dateTime={item.publishedAt}>
                        {new Date(item.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.title}
                    <ExternalLink
                      className="size-3.5 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                  <p className="mt-2 text-xs">
                    <Link
                      href={`#${item.categorySlug}`}
                      className="text-primary hover:underline"
                    >
                      Jump to {item.categoryTitle} picks
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
