"use client";

import { usePathname } from "next/navigation";
import { StartPlanCta } from "@/components/cta/start-plan-cta";

/** Compact start CTA in the footer — skipped on the homepage, which already closes with one. */
export function FooterStartCta() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="mb-10">
      <StartPlanCta
        variant="compact"
        headline="Get a free plan"
        description="A short quiz, then check off workouts in your browser. No app required."
      />
    </div>
  );
}
