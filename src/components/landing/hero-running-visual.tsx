import { cn } from "@/lib/utils";
import { HeroRaceMarkers } from "@/components/landing/hero-race-markers";

type HeroRunningVisualProps = {
  className?: string;
};

/** Wide rectangular trail scene with distance markers along the road. */
export function HeroRunningVisual({ className }: HeroRunningVisualProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-[min(58vw,24rem)] sm:h-[min(48vw,26rem)] lg:h-[min(40vw,28rem)]",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden",
          "[mask-image:radial-gradient(ellipse_98%_100%_at_50%_44%,black_50%,transparent_92%)]"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-orange-400/[0.07] to-transparent dark:from-primary/12 dark:via-orange-400/[0.08]" />

        <svg
          viewBox="0 0 800 220"
          className="absolute inset-0 h-full w-full opacity-[0.62] dark:opacity-[0.5] sm:opacity-[0.68] sm:dark:opacity-[0.55]"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          {/* Sun */}
          <ellipse
            cx="640"
            cy="42"
            rx="56"
            ry="56"
            className="fill-amber-400/35 dark:fill-amber-400/22"
          />
          <ellipse
            cx="640"
            cy="42"
            rx="36"
            ry="36"
            className="fill-amber-300/20 dark:fill-amber-300/12"
          />

          {/* Hills */}
          <path
            d="M0 140 Q160 88 320 118 T640 102 T800 128 L800 220 L0 220 Z"
            className="fill-emerald-500/15 stroke-emerald-600/20"
            strokeWidth="1"
          />
          <path
            d="M0 158 Q200 118 400 138 T800 132 L800 220 L0 220 Z"
            className="fill-primary/10"
          />

          {/* Trail bed + dashed center line */}
          <path
            d="M-20 168 Q180 152 400 158 T820 148"
            className="stroke-muted-foreground/22"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-20 168 Q180 152 400 158 T820 148"
            className="stroke-primary/40"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="12 8"
          />

          <HeroRaceMarkers />

          {/* Trees */}
          <g className="stroke-emerald-700/30" strokeWidth="1.25" fill="none">
            <path d="M28 138 L28 112 M14 124 Q28 96 42 124" />
            <path d="M728 124 L728 98 M714 110 Q728 82 742 110" />
            <path d="M180 132 L180 114 M172 122 Q180 104 188 122" />
          </g>

          {/* Finish line / ribbon */}
          <g transform="translate(700 142)">
            <path
              d="M0 0 V-32 M-8 -32 H8 M-6 -32 L0 -44 L6 -32"
              className="stroke-orange-500/45"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="-12"
              y="-28"
              width="24"
              height="14"
              rx="1.5"
              className="fill-orange-500/18 stroke-orange-500/40"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
