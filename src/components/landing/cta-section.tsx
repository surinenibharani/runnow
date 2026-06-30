import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { FadeIn } from "@/components/motion/fade-in";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <StartPlanCta
            headline="Ready to lace up?"
            description="Your future self will thank you. Start the free 8-week plan today — no account, no pressure, just progress."
          />
        </FadeIn>
      </div>
    </section>
  );
}
