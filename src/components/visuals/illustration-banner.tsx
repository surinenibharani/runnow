import { cn } from "@/lib/utils";

type IllustrationBannerProps = {
  gradient: string;
  className?: string;
  /** Accessible name when the illustration adds meaning beyond adjacent headings. */
  label?: string;
  /** Set true only when a visible heading already describes the graphic. */
  decorative?: boolean;
  children: React.ReactNode;
};

export function IllustrationBanner({
  gradient,
  className,
  label,
  decorative = false,
  children,
}: IllustrationBannerProps) {
  const isDecorative = decorative || !label;

  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
      role={isDecorative ? undefined : "img"}
      aria-label={isDecorative ? undefined : label}
      aria-hidden={isDecorative ? true : undefined}
    >
      <svg
        viewBox="0 0 120 80"
        className="absolute inset-0 h-full w-full px-4 py-2"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        focusable="false"
      >
        <g transform="translate(60 40) scale(0.9) translate(-60 -40)">
          {children}
        </g>
      </svg>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent"
        aria-hidden
      />
    </div>
  );
}
