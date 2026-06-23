"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,oklch(0.5_0.15_20/0.3)_100%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to lace up?
              </h2>
              <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Your future self will thank you. Start the free 8-week plan today —
                no account, no pressure, just progress.
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/plan" />}
                size="lg"
                variant="secondary"
                className="mt-8 h-12 px-8 text-base"
              >
                Begin Week 1
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
