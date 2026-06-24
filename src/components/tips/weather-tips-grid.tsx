import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { weatherTips } from "@/lib/tips/weather";

export function WeatherTipsGrid() {
  return (
    <StaggerChildren className="grid gap-4 sm:grid-cols-2">
      {weatherTips.map((tip) => (
        <StaggerItem key={tip.title}>
          <Card className="h-full border-border/60">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <tip.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {tip.condition}
                  </Badge>
                  <h2 className="font-semibold text-lg">{tip.title}</h2>

                  <p className="mt-3 text-xs font-medium text-foreground uppercase tracking-wide">
                    If you head out
                  </p>
                  <ul className="mt-1.5 space-y-1.5 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                    {tip.outdoorTips.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <p className="mt-4 text-xs font-medium text-foreground uppercase tracking-wide">
                    Indoor alternatives
                  </p>
                  <ul className="mt-1.5 space-y-1.5 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                    {tip.indoorAlternatives.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {tip.skipOutdoor && (
                    <p className="mt-4 text-xs text-indigo-700 dark:text-indigo-300/90 leading-relaxed border-t border-border/60 pt-3">
                      {tip.skipOutdoor}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
