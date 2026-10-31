import { StartPlanCta } from "@/components/cta/start-plan-cta";

export function CtaSection() {
  return (
    <section id="home-closing-cta" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <StartPlanCta
          headline="Ready to lace up?"
          description="A two-minute quiz picks a free beginner-friendly plan. Comebacks and experienced runners are welcome too. No account, no app, no pressure."
          primaryOnly
        />
      </div>
    </section>
  );
}
