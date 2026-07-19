import { StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { TipDetailCard } from "@/components/tips/tip-detail-card";
import { weatherTips } from "@/lib/tips/weather";

export function WeatherTipsGrid() {
  return (
    <StaggerChildren className="grid gap-5 sm:grid-cols-2">
      {weatherTips.map((tip) => (
        <StaggerItem key={tip.slug}>
          <TipDetailCard
            illustration={tip.illustration}
            icon={tip.icon}
            iconClassName="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
            badge={tip.condition}
            title={tip.title}
            tipHref={`/tips/bad-weather/${tip.slug}`}
            footer={tip.skipOutdoor}
            footerClassName="text-indigo-700 dark:text-indigo-300/90"
          >
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-foreground">
              If you head out
            </p>
            <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
              {tip.outdoorTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-foreground">
              Indoor alternatives
            </p>
            <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
              {tip.indoorAlternatives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TipDetailCard>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
