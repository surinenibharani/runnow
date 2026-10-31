import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinishLineBackground, FinishLineTextBackdrop } from "@/components/landing/finish-line-background";
import { HeroVideo } from "@/components/landing/hero-video";

export function Hero() {
  return (
    <>
      <section id="home-hero" className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <FinishLineBackground />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
          <HeroVideo />

          <div className="relative z-10 flex flex-col items-center text-center">
            <Badge
              variant="secondary"
              className="relative z-10 mb-4 mt-14 bg-background/70 px-3.5 py-1.5 text-xs backdrop-blur-sm sm:mb-5 sm:mt-20 sm:px-4 sm:text-sm"
            >
              Free · No sign-up · 5K to Marathon
            </Badge>

            <div className="relative w-full max-w-4xl overflow-x-clip px-1 sm:px-4">
              <FinishLineTextBackdrop />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -inset-y-4 rounded-2xl bg-gradient-to-b from-background/65 via-background/45 to-background/15 backdrop-blur-[2px] sm:-inset-y-6 sm:from-background/60 sm:via-background/35 sm:to-transparent"
              />
              <h1 className="relative z-10 text-display font-bold text-balance drop-shadow-[0_1px_1px_oklch(1_0_0/0.08)] dark:drop-shadow-none">
                Never ran, coming back, or already miles in —{" "}
                <span className="text-gradient">same club</span>
              </h1>
            </div>

            <Button
              nativeButton={false}
              render={<Link href="/start" />}
              size="lg"
              className="relative z-10 mt-8 touch-target h-14 w-full max-w-sm gap-2 px-8 text-lg shadow-lg shadow-primary/25 sm:mt-10"
            >
              Start here
              <ArrowRight className="size-5 shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      <nav
        aria-label="Quick links"
        className="border-b border-border/60 bg-background px-4 py-4 sm:px-6 sm:py-5"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/plan" />}
            variant="outline"
            size="sm"
            className="border-teal-500/30 bg-teal-500/[0.06] text-teal-800 hover:bg-teal-500/10 dark:text-teal-300"
          >
            Browse plans
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/tips" />}
            variant="outline"
            size="sm"
            className="border-sky-500/30 bg-sky-500/[0.06] text-sky-800 hover:bg-sky-500/10 dark:text-sky-300"
          >
            Beginner tips
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/blog/comeback-after-running-break" />}
            variant="outline"
            size="sm"
            className="border-amber-500/30 bg-amber-500/[0.06] text-amber-800 hover:bg-amber-500/10 dark:text-amber-300"
          >
            Coming back
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/blog/running-guide-for-women" />}
            variant="outline"
            size="sm"
            className="border-violet-500/30 bg-background text-violet-700 hover:bg-violet-500/10 dark:text-violet-300"
          >
            Women&apos;s guide
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/blog/running-guide-for-men" />}
            variant="outline"
            size="sm"
            className="border-sky-500/30 bg-background text-sky-700 hover:bg-sky-500/10 dark:text-sky-300"
          >
            Men&apos;s guide
          </Button>
        </div>
        <div className="mx-auto mt-2 flex max-w-6xl flex-wrap items-center justify-center gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/injuries" />}
            variant="outline"
            size="sm"
            className="border-rose-500/30 bg-background text-rose-700 hover:bg-rose-500/10 dark:text-rose-300"
          >
            Injuries
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/gear" />}
            variant="outline"
            size="sm"
            className="border-emerald-500/30 bg-background text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-300"
          >
            Gear
          </Button>
        </div>
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-center">
          <Button
            nativeButton={false}
            render={<Link href="/blog" />}
            variant="outline"
            size="lg"
            className="h-11 min-w-[12rem] gap-2 border-orange-500/40 bg-orange-500/[0.08] px-6 text-base font-semibold text-orange-800 hover:bg-orange-500/15 dark:text-orange-300"
          >
            Blog
            <ArrowRight className="size-4 shrink-0" />
          </Button>
        </div>
      </nav>
    </>
  );
}
