import Link from "next/link";
import { StrideMark } from "@/components/brand/stride-mark";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  href?: string;
};

export function Logo({ className, showWordmark = true, href = "/" }: LogoProps) {
  const content = (
    <>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <StrideMark className="size-4" />
      </span>
      {showWordmark && (
        <span className="text-base sm:text-lg tracking-tight">
          Lets<span className="text-primary">RunNow</span>
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <span className={cn("flex items-center gap-2 font-bold text-lg", className)}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={cn("flex items-center gap-2 font-bold text-lg", className)}>
      {content}
    </Link>
  );
}
