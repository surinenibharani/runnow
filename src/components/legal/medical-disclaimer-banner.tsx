import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { cn } from "@/lib/utils";

type MedicalDisclaimerBannerProps = {
  /** Optional extra sentence appended after the standard disclaimer. */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Reusable amber medical-disclaimer banner for non-blog surfaces
 * (injury detail pages, plan, gear, tips).
 */
export function MedicalDisclaimerBanner({
  children,
  className,
}: MedicalDisclaimerBannerProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-4 text-sm",
        className
      )}
    >
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
      <p className="leading-relaxed text-muted-foreground">
        <MedicalDisclaimerText>
          LetsRunNow provides general fitness education, not medical advice.
        </MedicalDisclaimerText>{" "}
        Talk to your doctor before starting or changing an exercise program —
        especially if you have a health condition, are pregnant, are recovering
        from injury or illness, or have not been active recently.{" "}
        {children}
        <Link href="/terms" className="text-primary hover:underline">
          Read our full terms
        </Link>
        .
      </p>
    </div>
  );
}
