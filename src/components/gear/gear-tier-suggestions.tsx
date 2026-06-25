import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { GearTier, GearTierSuggestion } from "@/lib/gear/items";
import { cn } from "@/lib/utils";

type GearTierSuggestionsProps = {
  tier: GearTier;
  intro: string;
  suggestions: GearTierSuggestion[];
};

export function GearTierSuggestions({
  tier,
  intro,
  suggestions,
}: GearTierSuggestionsProps) {
  return (
    <div
      className={cn(
        "mb-8 rounded-xl border p-4 sm:p-5",
        tier === "start-here"
          ? "border-emerald-500/15 bg-background"
          : "border-violet-500/15 bg-background"
      )}
    >
      <h3 className="text-sm font-semibold">Our suggestions</h3>
      <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
      <ul className="mt-4 space-y-3">
        {suggestions.map((pick) => (
          <li
            key={`${pick.categorySlug}-${pick.name}`}
            className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <div className="min-w-0 text-sm">
              <span className="font-medium text-foreground">{pick.name}</span>
              <span className="text-muted-foreground"> — {pick.note}</span>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs font-normal">
                {pick.price}
              </Badge>
              <Link
                href={`#${pick.categorySlug}`}
                className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
              >
                Details
                <ArrowRight className="size-3" aria-hidden />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
