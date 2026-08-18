import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { FadeIn } from "@/components/motion/fade-in";

export function CtaSection() {
  return (
    <section id="home-closing-cta" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <StartPlanCta
            headline="Ready to lace up?"
            description="A two-minute quiz picks a free beginner plan. No account, no app, no pressure."
          />
        </FadeIn>
      </div>
    </section>
  );
}
