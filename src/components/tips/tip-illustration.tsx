import { cn } from "@/lib/utils";
import type { TipIllustrationId } from "@/lib/tips/tips";
import { tipIllustrationLabel } from "@/lib/a11y/labels";
import { IllustrationBanner } from "@/components/visuals/illustration-banner";

type TipIllustrationProps = {
  id: TipIllustrationId;
  className?: string;
  title?: string;
  decorative?: boolean;
};

const GRADIENTS: Record<TipIllustrationId, string> = {
  "easy-pace": "from-orange-500/20 via-amber-400/10 to-card",
  shoes: "from-violet-500/20 via-purple-400/10 to-card",
  calendar: "from-blue-500/20 via-sky-400/10 to-card",
  hydration: "from-cyan-500/20 via-teal-400/10 to-card",
  recovery: "from-indigo-500/20 via-violet-400/10 to-card",
  breathing: "from-sky-500/20 via-blue-400/10 to-card",
  mindset: "from-rose-500/20 via-pink-400/10 to-card",
  warmup: "from-amber-500/20 via-yellow-400/10 to-card",
  rain: "from-slate-500/20 via-indigo-400/10 to-card",
  heat: "from-orange-500/25 via-red-400/10 to-card",
  cold: "from-sky-400/20 via-blue-300/10 to-card",
  storm: "from-slate-600/25 via-violet-500/10 to-card",
  wind: "from-teal-500/20 via-emerald-400/10 to-card",
  "air-quality": "from-amber-600/20 via-orange-400/10 to-card",
  indoor: "from-emerald-500/20 via-green-400/10 to-card",
  pregnancy: "from-pink-500/20 via-rose-400/10 to-card",
  senior: "from-blue-500/20 via-indigo-400/10 to-card",
  health: "from-red-500/15 via-rose-400/10 to-card",
};

function IllustrationScene({ id }: { id: TipIllustrationId }) {
  switch (id) {
    case "easy-pace":
      return (
        <>
          <circle cx="72" cy="28" r="14" className="fill-amber-400/40" />
          <path d="M20 52 Q40 44 58 52 T96 52" className="stroke-primary/30" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="58" cy="52" r="3" className="fill-primary/60" />
          <path d="M58 55 L52 68 M58 55 L64 68 M58 55 L58 62" className="stroke-primary/70" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "shoes":
      return (
        <>
          <path d="M28 58 C28 50 36 44 48 44 H72 C84 44 92 50 92 58 V62 H28 Z" className="fill-primary/25 stroke-primary/40" strokeWidth="1.5" />
          <path d="M32 58 H88" className="stroke-primary/50" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 50 H56 M64 50 H76" className="stroke-primary/35" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="30" y="36" width="60" height="48" rx="6" className="fill-primary/15 stroke-primary/35" strokeWidth="1.5" />
          <path d="M30 46 H90" className="stroke-primary/35" strokeWidth="1.5" />
          <path d="M44 36 V30 M76 36 V30" className="stroke-primary/50" strokeWidth="2" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={42 + (i % 3) * 16} cy={58 + Math.floor(i / 3) * 14} r="3" className={i === 2 ? "fill-primary/70" : "fill-primary/25"} />
          ))}
        </>
      );
    case "hydration":
      return (
        <>
          <path d="M60 30 C52 42 48 50 48 58 C48 68 54 74 60 74 C66 74 72 68 72 58 C72 50 68 42 60 30Z" className="fill-cyan-500/25 stroke-cyan-600/40" strokeWidth="1.5" />
          <path d="M54 58 H66" className="stroke-cyan-600/50" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 68 Q36 62 48 68 T72 68 T96 68" className="stroke-cyan-500/30" strokeWidth="2" fill="none" />
        </>
      );
    case "recovery":
      return (
        <>
          <path d="M30 58 C30 48 42 40 60 40 C78 40 90 48 90 58" className="stroke-indigo-500/35" strokeWidth="2" fill="none" />
          <path d="M36 58 L44 52 L52 58 L60 46 L68 58 L76 52 L84 58" className="stroke-indigo-500/50" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="78" cy="30" r="3" className="fill-indigo-400/50" />
          <circle cx="86" cy="34" r="2" className="fill-indigo-400/35" />
        </>
      );
    case "breathing":
      return (
        <>
          <path d="M30 56 Q45 44 60 56 T90 56" className="stroke-sky-500/40" strokeWidth="2" fill="none" />
          <path d="M30 64 Q45 52 60 64 T90 64" className="stroke-sky-500/25" strokeWidth="2" fill="none" />
          <circle cx="60" cy="48" r="8" className="fill-sky-500/20 stroke-sky-500/40" strokeWidth="1.5" />
        </>
      );
    case "mindset":
      return (
        <>
          <path d="M60 34 C48 34 40 42 40 52 C40 64 48 72 60 72 C72 72 80 64 80 52 C80 42 72 34 60 34Z" className="fill-rose-500/15 stroke-rose-500/35" strokeWidth="1.5" />
          <path d="M48 50 C50 54 54 56 60 56 C66 56 70 54 72 50" className="stroke-rose-500/50" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      );
    case "warmup":
      return (
        <>
          <circle cx="72" cy="28" r="12" className="fill-amber-400/45" />
          <path d="M44 58 L52 46 L60 58 L68 50 L76 58" className="stroke-amber-600/45" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "rain":
      return (
        <>
          <ellipse cx="60" cy="38" rx="28" ry="12" className="fill-slate-500/30" />
          <ellipse cx="48" cy="42" rx="20" ry="10" className="fill-slate-500/20" />
          {[36, 48, 60, 72, 84].map((x) => (
            <path key={x} d={`M${x} 54 L${x - 2} 68`} className="stroke-indigo-500/40" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </>
      );
    case "heat":
      return (
        <>
          <circle cx="72" cy="30" r="14" className="fill-orange-400/50" />
          <path d="M72 12 V18 M72 42 V48 M58 30 H64 M80 30 H86 M62 18 L66 22 M78 38 L82 42 M62 42 L66 38 M78 22 L82 18" className="stroke-orange-500/50" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 68 Q50 58 70 68 T110 68" className="stroke-orange-500/25" strokeWidth="2" fill="none" />
        </>
      );
    case "cold":
      return (
        <>
          <path d="M60 28 L60 48 M52 32 L68 44 M68 32 L52 44 M56 36 H64 M56 40 H64" className="stroke-sky-500/50" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 62 Q40 54 56 62 T88 62" className="stroke-sky-400/30" strokeWidth="2" fill="none" />
        </>
      );
    case "storm":
      return (
        <>
          <ellipse cx="60" cy="36" rx="32" ry="14" className="fill-slate-600/35" />
          <path d="M54 50 L48 66 H58 L52 78 L68 58 H58 L64 50Z" className="fill-violet-500/40 stroke-violet-600/50" strokeWidth="1" />
        </>
      );
    case "wind":
      return (
        <>
          {[32, 48, 64].map((y, i) => (
            <path key={y} d={`M24 ${y} Q44 ${y - 6} 64 ${y} T104 ${y}`} className="stroke-teal-500/40" strokeWidth="2" fill="none" strokeLinecap="round" style={{ opacity: 0.5 + i * 0.2 }} />
          ))}
        </>
      );
    case "air-quality":
      return (
        <>
          <circle cx="60" cy="52" r="20" className="fill-amber-500/15 stroke-amber-600/35" strokeWidth="1.5" />
          <path d="M48 52 H72 M60 40 V64" className="stroke-amber-600/40" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 30 Q40 24 50 30" className="stroke-amber-600/25" strokeWidth="2" fill="none" />
        </>
      );
    case "indoor":
      return (
        <>
          <rect x="34" y="38" width="52" height="40" rx="4" className="fill-emerald-500/15 stroke-emerald-600/35" strokeWidth="1.5" />
          <path d="M34 50 H86" className="stroke-emerald-600/30" strokeWidth="1.5" />
          <circle cx="60" cy="62" r="6" className="fill-emerald-500/30" />
        </>
      );
    case "pregnancy":
      return (
        <>
          <circle cx="60" cy="38" r="10" className="fill-pink-500/25" />
          <path d="M48 50 C48 44 54 40 60 40 C66 40 72 44 72 50 V72 H48 Z" className="fill-pink-500/15 stroke-pink-500/35" strokeWidth="1.5" />
          <circle cx="64" cy="58" r="6" className="fill-pink-400/25" />
        </>
      );
    case "senior":
      return (
        <>
          <circle cx="60" cy="36" r="9" className="fill-blue-500/25" />
          <path d="M48 48 C48 44 54 42 60 42 C66 42 72 44 72 48 V70 H48 Z" className="fill-blue-500/15 stroke-blue-500/35" strokeWidth="1.5" />
          <path d="M52 70 L56 78 M68 70 L64 78" className="stroke-blue-500/50" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "health":
      return (
        <>
          <path d="M60 32 C52 32 46 38 46 46 C46 58 60 70 60 70 C60 70 74 58 74 46 C74 38 68 32 60 32Z" className="fill-rose-500/20 stroke-rose-500/40" strokeWidth="1.5" />
          <path d="M60 42 V54 M54 48 H66" className="stroke-rose-600/50" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    default:
      return null;
  }
}

export function TipIllustration({
  id,
  className,
  title,
  decorative = true,
}: TipIllustrationProps) {
  return (
    <IllustrationBanner
      gradient={GRADIENTS[id]}
      className={cn("h-28", className)}
      label={decorative ? undefined : tipIllustrationLabel(id, title)}
      decorative={decorative}
    >
      <IllustrationScene id={id} />
    </IllustrationBanner>
  );
}
