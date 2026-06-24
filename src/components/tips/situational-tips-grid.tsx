import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { situationalTips } from "@/lib/tips/situational";

export function SituationalTipsGrid() {
  return (
    <>
      <FadeIn className="mb-8">
        <div className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-4 text-sm">
          <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <p className="text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Medical disclaimer: </span>
            LetsRunNow provides general fitness education, not medical advice.
            Talk to your physician, OB-GYN, or specialist before starting or
            changing exercise — especially during pregnancy, after illness, or
            when managing a chronic condition.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="grid gap-4 sm:grid-cols-2">
        {situationalTips.map((tip) => (
          <StaggerItem key={tip.title}>
            <Card className="h-full border-border/60">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <tip.icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {tip.audience}
                    </Badge>
                    <h2 className="font-semibold text-lg">{tip.title}</h2>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                      {tip.tips.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-amber-700 dark:text-amber-400/90 leading-relaxed border-t border-border/60 pt-3">
                      {tip.caution}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </>
  );
}
