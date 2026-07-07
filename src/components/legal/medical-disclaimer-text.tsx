import { cn } from "@/lib/utils";
import { MEDICAL_DISCLAIMER_CLASS } from "@/lib/medical-disclaimer";

type MedicalDisclaimerTextProps = {
  children: React.ReactNode;
  className?: string;
};

/** Bold medical disclaimer copy for non-blog surfaces. */
export function MedicalDisclaimerText({
  children,
  className,
}: MedicalDisclaimerTextProps) {
  return (
    <strong className={cn(MEDICAL_DISCLAIMER_CLASS, className)}>{children}</strong>
  );
}
