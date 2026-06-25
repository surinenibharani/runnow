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
          <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-12 text-center sm:rounded-3xl sm:px-16 sm:py-20">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,oklch(0.5_0.15_20/0.3)_100%)]" />
            <div className="relative">
              <h2 className="text-[clamp(1.625rem,4vw+0.5rem,2.25rem)] font-bold tracking-tight text-primary-foreground text-balance">
                Ready to lace up?
              </h2>
              <p className="text-lead mt-4 max-w-xl mx-auto text-primary-foreground/85 text-balance">
                Your future self will thank you. Start the free 8-week plan today —
                no account, no pressure, just progress.
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/plan" />}
                size="lg"
                variant="secondary"
                className="touch-target mt-8 h-12 w-full max-w-xs gap-2 px-8 text-base sm:w-auto sm:min-w-[11.5rem]"
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
