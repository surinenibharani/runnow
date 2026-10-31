import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { TipDetailCard } from "@/components/tips/tip-detail-card";
import { situationalTips } from "@/lib/tips/situational";

export function SituationalTipsGrid() {
  return (
    <>
      <FadeIn className="mb-8">
        <MedicalDisclaimerBanner>
          Talk to your physician, OB-GYN, or specialist before starting or
          changing exercise — especially during pregnancy, after illness, or
          when managing a chronic condition.{" "}
        </MedicalDisclaimerBanner>
      </FadeIn>

      <StaggerChildren className="grid gap-5 sm:grid-cols-2">
        {situationalTips.map((tip) => (
          <StaggerItem key={tip.slug}>
            <TipDetailCard
              illustration={tip.illustration}
              icon={tip.icon}
              iconClassName="bg-sky-500/10 text-sky-600 dark:text-sky-400"
              badge={tip.audience}
              title={tip.title}
              tipHref={`/tips/specific-situations/${tip.slug}`}
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
