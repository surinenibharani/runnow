import { PlanCheckoffDemo } from "@/components/landing/plan-checkoff-demo";

const steps = [
  {
    step: "01",
    title: "Get a plan",
    description: "A short quiz picks a free beginner-friendly schedule that fits your fitness.",
  },
  {
    step: "02",
    title: "Follow the day",
    description: "Each workout says when to walk and when to jog. Slow is the point.",
  },
  {
    step: "03",
    title: "Check it off",
    description: "Tap the circle when you finish. Your streak lives in the browser — no app.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick a plan. Check off workouts. Come back.
          </p>
        </div>

        <div className="mb-12">
          <PlanCheckoffDemo />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center md:text-left">
              <div className="mb-4 text-5xl font-bold text-primary/20">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
