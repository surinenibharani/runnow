"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinishLineBackground, FinishLineTextBackdrop } from "@/components/landing/finish-line-background";
import { HeroRunningVisual } from "@/components/landing/hero-running-visual";
import { SITE_NAME } from "@/lib/site";

const heroButtonClass =
  "touch-target h-12 w-full gap-2 px-6 text-base sm:w-auto sm:min-w-[11.5rem]";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <FinishLineBackground />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:pb-36">
        <HeroRunningVisual />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <Badge
            variant="secondary"
            className="relative z-10 mb-4 mt-14 bg-background/70 px-3.5 py-1.5 text-xs backdrop-blur-sm sm:mb-5 sm:mt-20 sm:px-4 sm:text-sm"
          >
            Free · No sign-up · 5K to Marathon
          </Badge>

          <div className="relative w-full max-w-4xl px-1 sm:px-4">
            <FinishLineTextBackdrop />
            {/* Soft scrim so headline reads over the scene */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-2 -inset-y-4 rounded-2xl bg-gradient-to-b from-background/65 via-background/45 to-background/15 backdrop-blur-[2px] sm:-inset-x-6 sm:-inset-y-6 sm:from-background/60 sm:via-background/35 sm:to-transparent"
            />
            <h1 className="relative z-10 text-display font-bold text-balance drop-shadow-[0_1px_1px_oklch(1_0_0/0.08)] dark:drop-shadow-none">
              Your first run starts{" "}
              <span className="text-gradient">right here</span>
            </h1>
          </div>

          <p className="text-lead relative z-10 mt-5 max-w-2xl text-muted-foreground text-balance sm:mt-6">
            {SITE_NAME} walks you from couch to marathon with proven plans,
            quirky run names, and progress tracking that keeps you showing up.
          </p>

          <div className="relative z-10 mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center">
            <Button
              nativeButton={false}
              render={<Link href="/plan" />}
              size="lg"
              className={heroButtonClass}
            >
              Start Training
              <ArrowRight className="size-4 shrink-0" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/tips" />}
              variant="outline"
              size="lg"
              className={heroButtonClass}
            >
              <Play className="size-4 shrink-0" />
              Read Beginner Tips
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative z-10 mt-12 grid w-full max-w-3xl grid-cols-3 gap-2.5 sm:mt-16 sm:gap-4"
          >
            {[
              { value: "3", label: "Distance plans" },
              { value: "3–4×", label: "Runs per week (max)" },
              { value: "0", label: "Experience needed" },
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
