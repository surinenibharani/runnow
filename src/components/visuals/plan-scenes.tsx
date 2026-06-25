import { IllustrationBanner } from "@/components/visuals/illustration-banner";
import { planFamilyIllustrationLabel } from "@/lib/a11y/labels";
import { cn } from "@/lib/utils";

const PLAN_GRADIENTS: Record<string, string> = {
  "5k": "from-orange-500/20 via-amber-400/10 to-card",
  "half-marathon": "from-blue-500/20 via-indigo-400/10 to-card",
  "full-marathon": "from-violet-500/20 via-purple-400/10 to-card",
  hero: "from-primary/20 via-orange-400/10 to-card",
};

function PlanFamilyScene({ familyId }: { familyId: string }) {
  switch (familyId) {
    case "5k":
      return (
        <>
          <path d="M16 58 Q38 46 60 58 T104 58" className="stroke-orange-500/35" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="60" cy="52" r="4" className="fill-primary/70" />
          <path d="M60 56 L54 68 M60 56 L66 68 M60 56 L60 64" className="stroke-primary/70" strokeWidth="2" strokeLinecap="round" />
          <rect x="84" y="36" width="14" height="10" rx="2" className="fill-orange-500/15 stroke-orange-600/30" strokeWidth="1" />
          <circle cx="72" cy="28" r="10" className="fill-amber-400/40" />
        </>
      );
    case "half-marathon":
      return (
        <>
          <path d="M12 58 Q30 42 48 50 T72 46 T108 58" className="stroke-blue-500/35" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
          <circle cx="48" cy="50" r="3" className="fill-blue-500/50" />
          <circle cx="72" cy="46" r="3" className="fill-blue-500/50" />
          <path d="M72 46 L68 58 M72 46 L76 58" className="stroke-blue-600/50" strokeWidth="2" strokeLinecap="round" />
          <rect x="82" y="32" width="18" height="10" rx="2" className="fill-blue-500/15 stroke-blue-600/30" strokeWidth="1" />
        </>
      );
    case "full-marathon":
      return (
        <>
          <path d="M8 58 Q24 38 40 48 T56 44 T72 50 T88 42 T112 58" className="stroke-violet-500/35" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
          {[40, 56, 72, 88].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 === 0 ? 48 : 44} r="2.5" className="fill-violet-500/45" />
          ))}
          <path d="M88 42 L84 56 M88 42 L92 56" className="stroke-violet-600/50" strokeWidth="2" strokeLinecap="round" />
          <rect x="78" y="30" width="20" height="10" rx="2" className="fill-violet-500/15 stroke-violet-600/30" strokeWidth="1" />
        </>
      );
    default:
      return null;
  }
}

type PlanFamilyIllustrationProps = {
  familyId: string;
  className?: string;
  familyName?: string;
  /** Set false when no visible heading follows the illustration. */
  decorative?: boolean;
};

export function PlanFamilyIllustration({
  familyId,
  className,
  familyName,
  decorative = true,
}: PlanFamilyIllustrationProps) {
  return (
    <IllustrationBanner
      gradient={PLAN_GRADIENTS[familyId] ?? PLAN_GRADIENTS.hero}
      className={cn("h-28 rounded-xl", className)}
      label={decorative ? undefined : planFamilyIllustrationLabel(familyId, familyName)}
      decorative={decorative}
    >
      <PlanFamilyScene familyId={familyId} />
    </IllustrationBanner>
  );
}

export function PlanPageHero({ className }: { className?: string }) {
  return (
    <IllustrationBanner
      gradient={PLAN_GRADIENTS.hero}
      className={cn("h-36 rounded-2xl", className)}
      label="Training plan progress illustration"
      decorative
    >
      <>
        <path d="M10 60 Q35 44 60 56 T110 52" className="stroke-primary/30" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M10 60 Q35 44 60 56 T110 52" className="stroke-orange-500/20" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="54" r="4" className="fill-primary/80" />
        <path d="M60 58 L54 70 M60 58 L66 70 M60 58 L60 66" className="stroke-primary/75" strokeWidth="2" strokeLinecap="round" />
        <rect x="18" y="34" width="14" height="18" rx="3" className="fill-primary/10 stroke-primary/25" strokeWidth="1.5" />
        <rect x="36" y="30" width="14" height="22" rx="3" className="fill-primary/15 stroke-primary/30" strokeWidth="1.5" />
        <rect x="54" y="26" width="14" height="26" rx="3" className="fill-primary/20 stroke-primary/35" strokeWidth="1.5" />
        <rect x="72" y="22" width="14" height="30" rx="3" className="fill-primary/25 stroke-primary/40" strokeWidth="1.5" />
      </>
    </IllustrationBanner>
  );
}

type WorkoutKind = "run" | "cross-train" | "rest";

const WORKOUT_ACCENTS: Record<WorkoutKind, string> = {
  run: "from-orange-500/15 to-transparent",
  "cross-train": "from-sky-500/15 to-transparent",
  rest: "from-slate-500/10 to-transparent",
};

export function WorkoutKindAccent({
  kind,
  className,
}: {
  kind: WorkoutKind;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-xl bg-gradient-to-b",
        WORKOUT_ACCENTS[kind],
        className
      )}
      aria-hidden
    />
  );
}
