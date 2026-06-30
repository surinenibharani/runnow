import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { successStories } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real beginners, real progress
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            You&apos;re not alone on this journey.{" "}
            <Link href="/stories" className="text-primary hover:underline">
              Read success stories
            </Link>
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {successStories.map((t) => (
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
