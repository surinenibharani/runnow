import type { ComponentType } from "react";
import { IllustrationBanner } from "@/components/visuals/illustration-banner";
import { cn } from "@/lib/utils";
import type { WomenRunnerIllustrationId } from "@/lib/injuries/women-runner-concerns";

type IllustrationProps = {
  className?: string;
};

function BoneHealthIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationBanner
      gradient="from-amber-500/15 via-rose-400/10 to-card"
      className={cn("h-24 rounded-xl", className)}
      label="Bone health and energy cycle diagram"
      decorative
    >
      <>
        <path
          d="M20 52 L28 36 L36 52 L44 36 L52 52"
          className="stroke-amber-600/40"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="68" cy="44" r="14" className="fill-rose-500/12 stroke-rose-600/35" strokeWidth="1.5" />
        <path
          d="M62 44 H74 M68 38 V50"
          className="stroke-rose-600/40"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="82"
          y="38"
          width="18"
          height="22"
          rx="3"
          className="fill-amber-500/15 stroke-amber-600/30"
          strokeWidth="1.5"
        />
        <path
          d="M88 44 H94 M88 50 H94"
          className="stroke-amber-600/35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}

function PelvicFloorIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationBanner
      gradient="from-violet-500/15 via-rose-400/10 to-card"
      className={cn("h-24 rounded-xl", className)}
      label="Pelvic floor engagement diagram"
      decorative
    >
      <>
        <path
          d="M48 28 C48 28 54 36 60 36 C66 36 72 28 72 28 L76 52 C76 58 70 64 60 64 C50 64 44 58 44 52 Z"
          className="fill-violet-500/12 stroke-violet-600/35"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M52 44 Q60 50 68 44"
          className="stroke-violet-600/40"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M84 32 L84 48 L96 48 L88 56 L92 68 L84 60 L76 68 L80 56 L72 48 L84 48 Z"
          className="fill-amber-400/25 stroke-amber-500/35"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M28 58 Q48 50 68 58"
          className="stroke-primary/20"
          strokeWidth="1.5"
          fill="none"
        />
      </>
    </IllustrationBanner>
  );
}

function PregnancyIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationBanner
      gradient="from-rose-500/15 via-violet-400/10 to-card"
      className={cn("h-24 rounded-xl", className)}
      label="Pregnancy and postpartum timeline diagram"
      decorative
    >
      <>
        <path
          d="M18 58 H102"
          className="stroke-primary/25"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="30" cy="58" r="4" className="fill-violet-500/40" />
        <circle cx="54" cy="58" r="4" className="fill-rose-500/40" />
        <circle cx="78" cy="58" r="4" className="fill-emerald-500/40" />
        <circle cx="98" cy="58" r="4" className="fill-primary/50" />
        <path
          d="M54 42 C54 42 58 34 60 30 C62 34 66 42 66 42 C66 48 62 52 60 52 C58 52 54 48 54 42 Z"
          className="fill-rose-500/15 stroke-rose-600/35"
          strokeWidth="1.5"
        />
        <circle cx="60" cy="26" r="5" className="fill-rose-500/20 stroke-rose-600/30" strokeWidth="1.5" />
      </>
    </IllustrationBanner>
  );
}

function MenstrualCycleIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationBanner
      gradient="from-sky-500/15 via-violet-400/10 to-card"
      className={cn("h-24 rounded-xl", className)}
      label="Menstrual cycle and training diagram"
      decorative
    >
      <>
        <circle cx="60" cy="44" r="22" className="fill-none stroke-sky-600/30" strokeWidth="1.5" />
        <circle cx="60" cy="22" r="4" className="fill-sky-500/40" />
        <circle cx="78" cy="32" r="4" className="fill-violet-500/35" />
        <circle cx="82" cy="52" r="4" className="fill-primary/40" />
        <circle cx="60" cy="66" r="4" className="fill-rose-500/35" />
        <circle cx="38" cy="52" r="4" className="fill-amber-500/35" />
        <path
          d="M60 44 L78 32"
          className="stroke-sky-600/25"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      </>
    </IllustrationBanner>
  );
}

function BreastSupportIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationBanner
      gradient="from-rose-500/15 via-sky-400/10 to-card"
      className={cn("h-24 rounded-xl", className)}
      label="Sports bra support diagram"
      decorative
    >
      <>
        <path
          d="M48 36 L40 44 V68 H50 L52 48 H68 L70 68 H80 V44 L72 36 H62 L60 40 H58 Z"
          className="fill-sky-500/15 stroke-sky-600/35"
          strokeWidth="1.5"
        />
        <path
          d="M48 36 L60 44 L72 36"
          className="stroke-sky-600/35"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M52 48 V58 M68 48 V58"
          className="stroke-sky-600/30"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}

const ILLUSTRATIONS: Record<
  WomenRunnerIllustrationId,
  ComponentType<IllustrationProps>
> = {
  "bone-health": BoneHealthIllustration,
  "pelvic-floor": PelvicFloorIllustration,
  pregnancy: PregnancyIllustration,
  "menstrual-cycle": MenstrualCycleIllustration,
  "breast-support": BreastSupportIllustration,
};

export function WomenRunnerIllustration({
  id,
  className,
}: {
  id: WomenRunnerIllustrationId;
  className?: string;
}) {
  const Component = ILLUSTRATIONS[id];
  return <Component className={className} />;
}
