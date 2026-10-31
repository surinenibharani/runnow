import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { PRINTABLE_MEDICAL_DISCLAIMER } from "@/lib/medical-disclaimer";
import { cn } from "@/lib/utils";

type MedicalDisclaimerNoteProps = {
  children?: React.ReactNode;
  className?: string;
};

/** Compact one-line disclaimer for suggestions, print sheets, and cards. */
export function MedicalDisclaimerNote({
  children,
  className,
}: MedicalDisclaimerNoteProps) {
  return (
    <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>
      <MedicalDisclaimerText>
        {children ?? PRINTABLE_MEDICAL_DISCLAIMER}
      </MedicalDisclaimerText>
    </p>
  );
}
