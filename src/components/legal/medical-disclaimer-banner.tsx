"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { STANDARD_MEDICAL_DISCLAIMER } from "@/lib/medical-disclaimer";
import { cn } from "@/lib/utils";

type MedicalDisclaimerBannerProps = {
  /** Optional extra sentence appended after the standard disclaimer. */
  children?: React.ReactNode;
  className?: string;
  /**
   * `compact` (default) shows the one-line disclaimer with a Details toggle.
   * `full` is the long form — use on injury pages.
   */
  variant?: "compact" | "full";
};

const DOCTOR_COPY =
  "Talk to your doctor before starting or changing an exercise program — especially if you have a health condition, are pregnant, are recovering from injury or illness, or have not been active recently.";

function TermsLink() {
  return (
    <Link href="/terms" className="text-primary hover:underline">
      Read our full terms
    </Link>
  );
}

function StandardLine() {
  return (
    <MedicalDisclaimerText>{STANDARD_MEDICAL_DISCLAIMER}</MedicalDisclaimerText>
  );
}

/**
 * Reusable amber medical-disclaimer banner for non-blog surfaces
 * (injury detail pages, plan, gear, tips).
 */
export function MedicalDisclaimerBanner({
  children,
  className,
  variant = "compact",
}: MedicalDisclaimerBannerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 text-sm",
        variant === "full" || open ? "py-4" : "py-2.5",
        className
      )}
    >
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
      {variant === "full" ? (
        <p className="leading-relaxed text-muted-foreground">
          <StandardLine /> {DOCTOR_COPY} {children}
          {children ? " " : null}
          <TermsLink />.
        </p>
      ) : (
        <div className="min-w-0 leading-relaxed text-muted-foreground">
          <p>
            <StandardLine />
            {!open ? (
              <>
                {" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  aria-expanded={false}
                  onClick={() => setOpen(true)}
                >
                  Details
                </button>
              </>
            ) : null}
          </p>
          {open ? (
            <p className="mt-2">
              {DOCTOR_COPY} {children}
              {children ? " " : null}
              <TermsLink />.{" "}
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                aria-expanded
                onClick={() => setOpen(false)}
              >
                Hide
              </button>
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
