import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { successStories } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real beginners, real progress
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You&apos;re not alone.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {successStories.slice(0, 3).map((t) => (
            <Card key={t.name} className="h-full border-border/60">
              <CardContent className="flex h-full flex-col p-6 sm:p-8">
                <p className="flex-1 leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/stories"
            className="text-sm font-medium text-primary hover:underline"
          >
            More stories →
          </Link>
        </p>
      </div>
    </section>
  );
}
