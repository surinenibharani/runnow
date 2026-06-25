import { IllustrationBanner } from "@/components/visuals/illustration-banner";
import {
  gearIllustrationLabel,
  GEAR_GROUP_LABELS,
} from "@/lib/a11y/labels";
import { cn } from "@/lib/utils";

const GEAR_GRADIENTS: Record<string, string> = {
  shoes: "from-violet-500/20 via-purple-400/10 to-card",
  shirts: "from-sky-500/20 via-blue-400/10 to-card",
  bottoms: "from-indigo-500/20 via-violet-400/10 to-card",
  tights: "from-slate-500/20 via-indigo-400/10 to-card",
  cap: "from-amber-500/20 via-orange-400/10 to-card",
  goggles: "from-cyan-500/20 via-teal-400/10 to-card",
  sunscreen: "from-yellow-500/20 via-amber-400/10 to-card",
  "chafing-creams": "from-rose-500/20 via-pink-400/10 to-card",
  "hydration-tablets": "from-cyan-500/20 via-sky-400/10 to-card",
  gels: "from-orange-500/20 via-amber-400/10 to-card",
  "hydration-packs": "from-blue-500/20 via-cyan-400/10 to-card",
  "apple-watch": "from-slate-500/20 via-zinc-400/10 to-card",
  garmin: "from-emerald-500/20 via-green-400/10 to-card",
  coros: "from-teal-500/20 via-emerald-400/10 to-card",
  "strava-app": "from-orange-500/25 via-red-400/10 to-card",
};

const GROUP_GRADIENTS: Record<string, string> = {
  Apparel: "from-violet-500/15 via-sky-400/10 to-card",
  "Tracking & Apps": "from-emerald-500/15 via-teal-400/10 to-card",
  Accessories: "from-amber-500/15 via-orange-400/10 to-card",
  "Hydration & Fuel": "from-cyan-500/15 via-blue-400/10 to-card",
};

function GearScene({ slug }: { slug: string }) {
  switch (slug) {
    case "shoes":
      return (
        <>
          <path d="M28 58 C28 50 36 44 48 44 H72 C84 44 92 50 92 58 V62 H28 Z" className="fill-primary/25 stroke-primary/40" strokeWidth="1.5" />
          <path d="M40 50 H56 M64 50 H76" className="stroke-primary/35" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "shirts":
      return (
        <>
          <path d="M48 36 L40 44 V72 H80 V44 L72 36 H62 L60 40 H60 Z" className="fill-sky-500/20 stroke-sky-600/40" strokeWidth="1.5" />
          <path d="M48 36 L60 44 L72 36" className="stroke-sky-600/40" strokeWidth="1.5" fill="none" />
        </>
      );
    case "bottoms":
    case "tights":
      return (
        <>
          <path d="M46 38 H74 V48 H68 L64 72 H56 L52 48 H46 Z" className="fill-indigo-500/20 stroke-indigo-600/40" strokeWidth="1.5" />
          <path d="M52 48 V58 M68 48 V58" className="stroke-indigo-600/35" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "cap":
      return (
        <>
          <path d="M34 50 Q60 34 86 50 L82 56 Q60 44 38 56 Z" className="fill-amber-500/25 stroke-amber-600/40" strokeWidth="1.5" />
          <ellipse cx="60" cy="56" rx="28" ry="6" className="fill-amber-600/15" />
        </>
      );
    case "goggles":
      return (
        <>
          <circle cx="48" cy="50" r="12" className="fill-cyan-500/15 stroke-cyan-600/40" strokeWidth="1.5" />
          <circle cx="72" cy="50" r="12" className="fill-cyan-500/15 stroke-cyan-600/40" strokeWidth="1.5" />
          <path d="M60 50 H60" className="stroke-cyan-600/40" strokeWidth="2" />
          <path d="M36 48 C42 42 44 42 48 50 M84 48 C78 42 76 42 72 50" className="stroke-cyan-600/35" strokeWidth="1.5" fill="none" />
        </>
      );
    case "sunscreen":
      return (
        <>
          <rect x="50" y="34" width="20" height="40" rx="4" className="fill-amber-400/25 stroke-amber-600/40" strokeWidth="1.5" />
          <circle cx="72" cy="28" r="10" className="fill-yellow-400/40" />
          <path d="M72 16 V22 M72 34 V40 M62 28 H68 M76 28 H82" className="stroke-yellow-600/50" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case "chafing-creams":
      return (
        <>
          <rect x="46" y="40" width="28" height="32" rx="6" className="fill-rose-500/15 stroke-rose-500/35" strokeWidth="1.5" />
          <path d="M52 40 V34 C52 30 68 30 68 34 V40" className="stroke-rose-500/35" strokeWidth="1.5" fill="none" />
        </>
      );
    case "hydration-tablets":
      return (
        <>
          <path d="M58 30 C50 42 48 52 48 60 C48 70 54 74 60 74 C66 74 72 70 72 60 C72 50 68 40 60 30Z" className="fill-cyan-500/20 stroke-cyan-600/40" strokeWidth="1.5" />
          <circle cx="78" cy="54" r="8" className="fill-cyan-400/25 stroke-cyan-600/35" strokeWidth="1.5" />
        </>
      );
    case "gels":
      return (
        <>
          <path d="M54 34 L50 68 H70 L66 34 Z" className="fill-orange-500/20 stroke-orange-600/40" strokeWidth="1.5" />
          <path d="M54 42 H66 M54 50 H66 M54 58 H66" className="stroke-orange-600/30" strokeWidth="1.5" />
        </>
      );
    case "hydration-packs":
      return (
        <>
          <rect x="48" y="32" width="24" height="40" rx="6" className="fill-blue-500/15 stroke-blue-600/35" strokeWidth="1.5" />
          <path d="M54 32 V26 H66 V32" className="stroke-blue-600/35" strokeWidth="1.5" fill="none" />
          <path d="M42 40 H48 M72 40 H78" className="stroke-blue-600/35" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "apple-watch":
      return (
        <>
          <rect x="46" y="30" width="28" height="36" rx="8" className="fill-slate-500/20 stroke-slate-600/40" strokeWidth="1.5" />
          <rect x="50" y="36" width="20" height="20" rx="4" className="fill-slate-600/15" />
          <path d="M42 38 H46 M74 38 H78 M42 58 H46 M74 58 H78" className="stroke-slate-600/35" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "garmin":
    case "coros":
      return (
        <>
          <circle cx="60" cy="48" r="18" className="fill-emerald-500/15 stroke-emerald-600/40" strokeWidth="1.5" />
          <circle cx="60" cy="48" r="10" className="stroke-emerald-600/30" strokeWidth="1.5" fill="none" />
          <path d="M60 48 L68 40" className="stroke-emerald-600/50" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "strava-app":
      return (
        <>
          <rect x="42" y="34" width="36" height="36" rx="8" className="fill-orange-500/20 stroke-orange-600/40" strokeWidth="1.5" />
          <path d="M48 58 L56 46 L64 52 L72 38" className="stroke-orange-600/50" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    default:
      return <circle cx="60" cy="48" r="14" className="fill-primary/15 stroke-primary/30" strokeWidth="1.5" />;
  }
}

function GroupScene({ group }: { group: string }) {
  switch (group) {
    case "Apparel":
      return (
        <>
          <path d="M30 58 C30 50 38 44 50 44 H70 C82 44 90 50 90 58 V62 H30 Z" className="fill-violet-500/20 stroke-violet-600/35" strokeWidth="1.5" />
          <path d="M44 38 L38 46 V68 H50 L52 48 H68 L70 68 H82 V46 L76 38 H66 L60 44 H54 Z" className="fill-sky-500/15 stroke-sky-600/30" strokeWidth="1.5" />
        </>
      );
    case "Tracking & Apps":
      return (
        <>
          <circle cx="60" cy="48" r="18" className="fill-emerald-500/15 stroke-emerald-600/35" strokeWidth="1.5" />
          <rect x="78" y="36" width="22" height="32" rx="5" className="fill-orange-500/15 stroke-orange-600/30" strokeWidth="1.5" />
        </>
      );
    case "Accessories":
      return (
        <>
          <path d="M34 50 Q60 34 86 50 L82 56 Q60 44 38 56 Z" className="fill-amber-500/20 stroke-amber-600/35" strokeWidth="1.5" />
          <circle cx="48" cy="50" r="10" className="fill-cyan-500/15 stroke-cyan-600/30" strokeWidth="1.5" />
        </>
      );
  }
  return (
    <>
      <path d="M58 30 C50 42 48 52 48 60 C48 70 54 74 60 74 C66 74 72 70 72 60 C72 50 68 40 60 30Z" className="fill-cyan-500/20 stroke-cyan-600/35" strokeWidth="1.5" />
      <rect x="74" y="44" width="16" height="24" rx="3" className="fill-orange-500/15 stroke-orange-600/30" strokeWidth="1.5" />
    </>
  );
}

type GearIllustrationProps = {
  slug: string;
  className?: string;
  title?: string;
  /** Pass false when no visible title follows immediately. */
  decorative?: boolean;
};

export function GearIllustration({
  slug,
  className,
  title,
  decorative = true,
}: GearIllustrationProps) {
  return (
    <IllustrationBanner
      gradient={GEAR_GRADIENTS[slug] ?? "from-primary/15 via-primary/5 to-card"}
      className={cn("h-24", className)}
      label={decorative ? undefined : gearIllustrationLabel(slug, title)}
      decorative={decorative}
    >
      <GearScene slug={slug} />
    </IllustrationBanner>
  );
}

type GearGroupVisualProps = {
  group: string;
  className?: string;
};

export function GearGroupVisual({ group, className }: GearGroupVisualProps) {
  return (
    <IllustrationBanner
      gradient={GROUP_GRADIENTS[group] ?? "from-primary/15 via-primary/5 to-card"}
      className={cn("h-20 rounded-xl", className)}
      label={GEAR_GROUP_LABELS[group]}
      decorative
    >
      <GroupScene group={group} />
    </IllustrationBanner>
  );
}

type GearPageHeroProps = {
  className?: string;
};

export function GearPageHero({ className }: GearPageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-violet-500/20 via-orange-400/10 to-card"
      className={cn("h-32 rounded-2xl", className)}
      label="Running gear guide illustration"
      decorative
    >
      <>
        <path d="M20 58 Q40 50 60 58 T100 58" className="stroke-primary/25" strokeWidth="2" fill="none" />
        <path d="M28 58 C28 50 36 44 48 44 H72 C84 44 92 50 92 58 V62 H28 Z" className="fill-violet-500/20 stroke-violet-600/35" strokeWidth="1.5" />
        <path d="M54 38 L46 46 V66 H58 L60 50 H72 L74 66 H86 V46 L78 38 H68 L60 44 H54 Z" className="fill-sky-500/15 stroke-sky-600/30" strokeWidth="1.5" />
        <circle cx="72" cy="48" r="10" className="fill-emerald-500/15 stroke-emerald-600/30" strokeWidth="1.5" />
      </>
    </IllustrationBanner>
  );
}
