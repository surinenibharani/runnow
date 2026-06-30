import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GearIllustration } from "@/components/visuals/gear-scenes";
import { GearSuggestionsList } from "@/components/gear/gear-suggestions-list";
import type { GearCategory } from "@/lib/gear/items";
import type { GearSuggestionPick } from "@/lib/gear/types";
import { cn } from "@/lib/utils";

type GearCategoryCardProps = {
  item: GearCategory;
  suggestions: GearSuggestionPick[];
  womenPicks?: GearSuggestionPick[];
  afterCard?: React.ReactNode;
};

export function GearCategoryCard({
  item,
  suggestions,
  womenPicks,
  afterCard,
}: GearCategoryCardProps) {
  const Icon = item.icon;
  const titleId = `${item.slug}-title`;

  return (
    <div className="space-y-6">
      <Card
        id={item.slug}
        aria-labelledby={titleId}
        className="gap-0 overflow-hidden border-border/60 py-0 transition-shadow duration-300 hover:shadow-md scroll-mt-24"
      >
        <GearIllustration slug={item.slug} title={item.title} decorative />
        <CardHeader className="relative pb-3 pt-9">
          <div
            className={cn(
              "absolute -top-6 left-5 z-10 flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background text-primary shadow-sm"
            )}
            aria-hidden
          >
            <Icon className="size-5" />
          </div>
          <CardTitle id={titleId} className="text-lg">
            {item.title}
          </CardTitle>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs font-medium">
              {item.priceRange}
            </Badge>
            {item.bestFor.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                Best for {tag}
              </Badge>
            ))}
          </div>
          <Badge variant="secondary" className="mt-3 text-xs">
            {item.whenYouNeedIt}
          </Badge>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-muted/40 p-4">
              <h3 className="mb-2 text-sm font-semibold">What to look for</h3>
              <ul className="space-y-1.5">
                {item.whatToLookFor.map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="shrink-0 text-primary">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-muted/40 p-4">
              <h3 className="mb-2 text-sm font-semibold">Suggestions</h3>
              <p className="mb-2 text-xs text-muted-foreground">
                Direct product picks — refreshed weekly from our catalog and
                recent gear coverage.
              </p>
              <GearSuggestionsList picks={suggestions} />
            </div>
          </div>
          {womenPicks && womenPicks.length > 0 && (
            <div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
              <h3 className="mb-2 text-sm font-semibold text-violet-800 dark:text-violet-300">
                Women-specific picks
              </h3>
              <p className="mb-2 text-xs text-muted-foreground">
                Fits, cuts, and products many women runners look for first — try
                what matches your support, size, and comfort needs. Rotates
                weekly with our gear feed.
              </p>
              <GearSuggestionsList picks={womenPicks} />
            </div>
          )}
          {item.pros && item.cons && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <h3 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  Pros
                </h3>
                <ul className="space-y-1.5">
                  {item.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="shrink-0 text-emerald-600 dark:text-emerald-400">
                        +
                      </span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h3 className="mb-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Cons
                </h3>
                <ul className="space-y-1.5">
                  {item.cons.map((con) => (
                    <li
                      key={con}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="shrink-0 text-amber-600 dark:text-amber-400">
                        −
                      </span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {afterCard}
    </div>
  );
}
