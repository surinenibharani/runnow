import type { GearSuggestionPick } from "@/lib/gear/types";
import { Badge } from "@/components/ui/badge";

type GearSuggestionsListProps = {
  picks: GearSuggestionPick[];
};

export function GearSuggestionsList({ picks }: GearSuggestionsListProps) {
  return (
    <ul className="space-y-2">
      {picks.map((pick) => (
        <li key={pick.name} className="text-sm">
          {pick.weekly && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 mr-1.5 align-middle">
              This week
            </Badge>
          )}
          <span className="font-medium text-foreground">{pick.name}</span>
          <span className="text-muted-foreground"> — {pick.note}</span>
        </li>
      ))}
    </ul>
  );
}
