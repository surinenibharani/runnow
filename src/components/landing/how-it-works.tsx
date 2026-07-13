import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

const steps = [
  {
    step: "01",
    title: "Pick your start day",
    description: "Choose any day to begin. The plan runs three days a week with rest in between.",
  },
  {
    step: "02",
    title: "Follow the walk-run intervals",
    description: "Each workout tells you exactly when to walk and when to jog. Start slow, stay consistent.",
  },
  {
    step: "03",
    title: "Check off and come back",
    description: "Mark workouts complete, build your streak, and get an adaptive coach that reads recovery, plan alignment, and pace — without an app subscription.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Three simple steps from hesitant to hooked.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <StaggerItem key={item.step} className="relative text-center md:text-left">
              <div className="text-5xl font-bold text-primary/20 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
