import { cn } from "@/lib/utils";

type FinishLineBackdropProps = {
  className?: string;
};

export function FinishLineTextBackdrop({ className }: FinishLineBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden sm:-inset-x-4 sm:-inset-y-3",
        className
      )}
    >
      <div className="absolute inset-0 finish-line-checker opacity-[0.055] dark:opacity-[0.095] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,black_20%,transparent_72%)]" />
      <div className="absolute inset-x-[6%] top-[44%] h-px bg-gradient-to-r from-transparent via-primary/22 to-transparent" />
      <div className="absolute inset-x-[10%] top-[50%] h-px border-t border-dashed border-primary/14" />
    </div>
  );
}

export function FinishLineBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-52 overflow-hidden"
    >
      <div className="absolute left-1/2 bottom-0 h-[85%] w-[130%] -translate-x-1/2 origin-bottom finish-line-checker opacity-[0.045] dark:opacity-[0.08] [transform:perspective(480px)_rotateX(58deg)] [mask-image:linear-gradient(to_top,black_35%,transparent)]" />
      <div className="absolute inset-x-[12%] bottom-[18%] sm:bottom-[20%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute inset-x-[18%] bottom-[22%] sm:bottom-[24%] h-px border-t border-dashed border-primary/15" />
    </div>
  );
}
