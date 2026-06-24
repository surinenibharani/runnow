import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";

const testimonials = [
  {
    quote:
      "I genuinely thought running wasn't for me. Week 4 and I'm actually looking forward to my runs.",
    name: "Kumar",
    detail: "Age 46 · started from zero",
  },
  {
    quote:
      "The walk-run intervals made it feel achievable. No shame in walking — that's the whole point.",
    name: "Venkat",
    detail: "Age 42 · completed the 8-week plan",
  },
  {
    quote:
      "Checking off workouts and seeing my streak grow kept me accountable. Simple but it works.",
    name: "Fakruddin",
    detail: "Age 44 · on week 6 and counting",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real beginners, real progress
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            You&apos;re not alone on this journey.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <Card className="h-full border-border/60">
                <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                  <p className="text-foreground leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.detail}</p>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
