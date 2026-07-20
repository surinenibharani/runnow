import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    title: "Start here",
    description:
      "Not sure which plan fits? Answer a few questions and we'll recommend a free beginner plan.",
  },
  {
    step: "02",
    title: "Follow the walk-run intervals",
    description:
      "Each workout tells you exactly when to walk and when to jog. Start slow, stay consistent.",
  },
  {
    step: "03",
    title: "Check off and come back",
    description:
      "Mark workouts complete, build your streak, and get an adaptive coach that reads recovery, plan alignment, and pace — without an app subscription.",
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

        <FadeIn className="mt-12 text-center">
          <p className="text-sm text-muted-foreground sm:text-base">
            Don&apos;t know where to start?
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/start" />}
            size="lg"
            className="mt-3 gap-2"
          >
            Start here
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
