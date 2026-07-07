import { AlertTriangle } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { TipDetailCard } from "@/components/tips/tip-detail-card";
import { situationalTips } from "@/lib/tips/situational";

export function SituationalTipsGrid() {
  return (
    <>
      <FadeIn className="mb-8">
        <div className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-4 text-sm">
          <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <p className="text-muted-foreground leading-relaxed">
            <MedicalDisclaimerText>
              Medical disclaimer: LetsRunNow provides general fitness education,
              not medical advice. Talk to your physician, OB-GYN, or specialist
              before starting or changing exercise — especially during pregnancy,
              after illness, or when managing a chronic condition.
            </MedicalDisclaimerText>
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="grid gap-5 sm:grid-cols-2">
        {situationalTips.map((tip) => (
          <StaggerItem key={tip.title}>
            <TipDetailCard
              illustration={tip.illustration}
              icon={tip.icon}
              iconClassName="bg-sky-500/10 text-sky-600 dark:text-sky-400"
              badge={tip.audience}
              title={tip.title}
              footer={tip.caution}
            >
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
                {tip.tips.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TipDetailCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </>
  );
}
