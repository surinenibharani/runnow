"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_ID = "home-hero";
const CLOSING_CTA_ID = "home-closing-cta";

/** Mobile-only conversion bar after the hero; hides when the closing CTA is on screen. */
export function StickyStartHere() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    const closing = document.getElementById(CLOSING_CTA_ID);
    if (!hero) return;

    let heroInView = true;
    let closingInView = false;

    const update = () => {
      setVisible(!heroInView && !closingInView);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === HERO_ID) {
            heroInView = entry.isIntersecting;
          }
          if (entry.target.id === CLOSING_CTA_ID) {
            closingInView = entry.isIntersecting;
          }
        }
        update();
      },
      { threshold: 0.08 }
    );

    observer.observe(hero);
    if (closing) observer.observe(closing);

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 p-3 shadow-[0_-8px_24px_oklch(0.2_0.04_260/0.12)] backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <Button
        nativeButton={false}
        render={<Link href="/start" />}
        size="lg"
        className="touch-target h-12 w-full gap-2 text-base"
      >
        Start here
        <ArrowRight className="size-4 shrink-0" aria-hidden />
      </Button>
    </div>
  );
}
