"use client";

import { usePathname } from "next/navigation";
import { StartPlanCta } from "@/components/cta/start-plan-cta";

/** Pages that already close with a Start-here CTA — don't stack another in the footer. */
const SKIP_PREFIXES = [
  "/start",
  "/plan",
  "/tips",
  "/injuries",
  "/gear",
  "/blog",
  "/tools",
  "/stories",
  "/instagram",
  "/search",
  "/login",
  "/signup",
  "/dashboard",
];

function hideFooterCta(pathname: string) {
  if (!pathname || pathname === "/") return true;
  return SKIP_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

/** Compact start CTA in the footer — skipped when the page already has one. */
export function FooterStartCta() {
  const pathname = usePathname() ?? "";
  if (hideFooterCta(pathname)) return null;

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
