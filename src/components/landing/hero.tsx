"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-28 sm:px-6 sm:pt-28 sm:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
            Free · No sign-up · 5K to Marathon
          </Badge>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Your first run starts{" "}
            <span className="text-gradient">right here</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            RunNow walks you from couch to marathon with proven plans,
            quirky run names, and progress tracking that keeps you showing up.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button nativeButton={false} render={<Link href="/plan" />} size="lg" className="h-12 px-8 text-base">
              Start Training
              <ArrowRight className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/tips" />}
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <Play className="size-4" />
              Read Beginner Tips
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-8"
          >
            {[
              { value: "3", label: "Distance plans" },
              { value: "4×", label: "Runs per week (max)" },
              { value: "0", label: "Experience needed" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 sm:p-6"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
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
