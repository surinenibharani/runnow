import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinishLineBackground, FinishLineTextBackdrop } from "@/components/landing/finish-line-background";
import { HeroVideo } from "@/components/landing/hero-video";

export function Hero() {
  return (
    <section id="home-hero" className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <FinishLineBackground />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:pb-36">
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
              Run with us — whatever{" "}
              <span className="text-gradient">your starting line</span>
            </h1>
          </div>

          <p className="text-lead relative z-10 mt-5 max-w-xl text-muted-foreground text-balance sm:mt-6">
            Never ran? Start here — walk-run is allowed. Coming back or already
            logging miles? You&apos;re in too. Free beginner-friendly plans,
            tips, and injury guides — in your browser.
          </p>

          <div className="relative z-10 mt-7 flex w-full max-w-md flex-col items-center gap-3 sm:mt-8">
            <Button
              nativeButton={false}
              render={<Link href="/start" />}
              size="lg"
              className="touch-target h-14 w-full max-w-sm gap-2 px-8 text-lg shadow-lg shadow-primary/25 sm:h-14"
            >
              Start here
              <ArrowRight className="size-5 shrink-0" />
            </Button>
            <p className="rounded-lg border border-primary/30 bg-primary/[0.08] px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              Two-minute quiz · no account required
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                nativeButton={false}
                render={<Link href="/plan" />}
                variant="outline"
                size="sm"
                className="border-teal-500/30 bg-teal-500/[0.06] text-teal-800 backdrop-blur-sm hover:bg-teal-500/10 dark:text-teal-300"
              >
                Browse plans
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/tips" />}
                variant="outline"
                size="sm"
                className="border-sky-500/30 bg-sky-500/[0.06] text-sky-800 backdrop-blur-sm hover:bg-sky-500/10 dark:text-sky-300"
              >
                Beginner tips
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/blog/comeback-after-running-break" />}
                variant="outline"
                size="sm"
                className="border-amber-500/30 bg-amber-500/[0.06] text-amber-800 backdrop-blur-sm hover:bg-amber-500/10 dark:text-amber-300"
              >
                Coming back
              </Button>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-2">
            <Button
              nativeButton={false}
              render={<Link href="/blog/running-guide-for-women" />}
              variant="outline"
              size="sm"
              className="border-violet-500/30 bg-background/70 text-violet-700 backdrop-blur-sm hover:bg-violet-500/10 dark:text-violet-300"
            >
              Women&apos;s guide
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/blog/running-guide-for-men" />}
              variant="outline"
              size="sm"
              className="border-sky-500/30 bg-background/70 text-sky-700 backdrop-blur-sm hover:bg-sky-500/10 dark:text-sky-300"
            >
              Men&apos;s guide
            </Button>
          </div>

          <div className="relative z-10 mt-12 grid w-full max-w-3xl grid-cols-3 gap-2.5 sm:mt-16 sm:gap-4">
            {[
              { value: "4", label: "Distance plans" },
              { value: "All", label: "Ages & levels" },
              { value: "0", label: "Experience required" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/60 bg-card/60 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-5"
              >
                <div className="text-stat-value font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[0.6875rem] leading-snug text-muted-foreground sm:mt-1 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
