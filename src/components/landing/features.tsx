import { Calendar, Heart, TrendingUp, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

const features = [
  {
    icon: Calendar,
    title: "Plans for every distance",
    description:
      "5K, 10K, half, and marathon — named workouts so showing up feels like a game, not homework.",
  },
  {
    icon: TrendingUp,
    title: "Check off. Come back.",
    description:
      "Mark runs done, watch your streak grow, and pick up next week — saved in your browser.",
  },
  {
    icon: Heart,
    title: "Built for day one",
    description:
      "Walk-run intervals, rest days, and no shame if you have never jogged a step.",
  },
  {
    icon: Trophy,
    title: "Celebrate the small stuff",
    description:
      "Every session has a quirky name and a purpose — from first 5K to 26.2.",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to start
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            No app download. No gear list. A clear week at a time.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Card className="group h-full border-border/60 bg-card/50 transition-all duration-300 hover:bg-card hover:shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
