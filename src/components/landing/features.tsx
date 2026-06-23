import { Calendar, Heart, TrendingUp, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

const features = [
  {
    icon: Calendar,
    title: "Structured 8-Week Plan",
    description:
      "Three runs per week with walk-run intervals that gradually build your endurance. No guesswork.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Check off workouts, watch your streak grow, and see how far you've come — all saved in your browser.",
  },
  {
    icon: Heart,
    title: "Beginner-Friendly",
    description:
      "Designed for people who've never run before. Slow is fast. Rest days matter. You've got this.",
  },
  {
    icon: Trophy,
    title: "Celebrate Milestones",
    description:
      "From your first minute of running to crossing a 5K finish line — every win counts.",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to start
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            No expensive gear, no complicated apps. Just a clear path forward.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Card className="h-full border-border/60 bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
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
