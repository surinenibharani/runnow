import { IllustrationBanner } from "@/components/visuals/illustration-banner";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  className?: string;
};

export function TipsPageHero({ className }: PageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-sky-500/20 via-primary/10 to-card"
      className={cn("h-36 rounded-2xl", className)}
      label="Beginner running tips illustration"
      decorative
    >
      <>
        <path
          d="M10 58 Q35 44 60 56 T110 52"
          className="stroke-primary/25"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="60" cy="52" r="4" className="fill-primary/75" />
        <path
          d="M60 56 L54 68 M60 56 L66 68 M60 56 L60 64"
          className="stroke-primary/70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M78 28 L78 44 L90 44 L82 52 L86 68 L78 60 L70 68 L74 52 L66 44 L78 44 Z"
          className="fill-amber-400/35 stroke-amber-500/45"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect
          x="22"
          y="36"
          width="20"
          height="24"
          rx="3"
          className="fill-sky-500/15 stroke-sky-600/30"
          strokeWidth="1.5"
        />
        <path
          d="M28 44 H36 M28 50 H36 M28 56 H34"
          className="stroke-sky-600/35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}

export function BlogPageHero({ className }: PageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-indigo-500/20 via-violet-400/10 to-card"
      className={cn("h-36 rounded-2xl", className)}
      label="Running blog illustration"
      decorative
    >
      <>
        <rect
          x="34"
          y="28"
          width="36"
          height="44"
          rx="4"
          className="fill-indigo-500/15 stroke-indigo-600/35"
          strokeWidth="1.5"
        />
        <rect
          x="42"
          y="22"
          width="36"
          height="44"
          rx="4"
          className="fill-violet-500/12 stroke-violet-600/30"
          strokeWidth="1.5"
        />
        <rect
          x="50"
          y="16"
          width="36"
          height="44"
          rx="4"
          className="fill-card stroke-indigo-600/40"
          strokeWidth="1.5"
        />
        <path
          d="M58 28 H78 M58 36 H76 M58 44 H72 M58 52 H74"
          className="stroke-indigo-600/35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M86 48 L94 56 L86 64"
          className="fill-primary/20 stroke-primary/40"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="48" r="10" className="fill-primary/15 stroke-primary/30" strokeWidth="1.5" />
        <path
          d="M24 48 H32 M28 44 V52"
          className="stroke-primary/45"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}

export function InjuriesPageHero({ className }: PageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-rose-500/20 via-amber-400/10 to-card"
      className={cn("h-36 rounded-2xl", className)}
      label="Running injury prevention illustration"
      decorative
    >
      <>
        <path
          d="M60 22 L72 30 V46 C72 58 66 66 60 66 C54 66 48 58 48 46 V30 Z"
          className="fill-emerald-500/15 stroke-emerald-600/40"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M60 34 V50 M52 42 H68"
          className="stroke-emerald-600/45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="76"
          y="38"
          width="22"
          height="10"
          rx="2"
          className="fill-rose-500/20 stroke-rose-600/35"
          strokeWidth="1.5"
        />
        <path
          d="M76 43 H98"
          className="stroke-rose-600/30"
          strokeWidth="1"
        />
        <circle cx="38" cy="54" r="12" className="fill-amber-400/20 stroke-amber-500/35" strokeWidth="1.5" />
        <path
          d="M32 54 H44 M38 48 V60"
          className="stroke-amber-600/40"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M28 58 C28 50 36 44 48 44 H72 C84 44 92 50 92 58"
          className="stroke-primary/20"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}

export function WomenRunnersInjuriesPageHero({ className }: PageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-violet-500/20 via-rose-400/10 to-card"
      className={cn("h-36 rounded-2xl", className)}
      label="Women runners injury and health illustration"
      decorative
    >
      <>
        <path
          d="M58 26 C58 26 62 34 60 42 C58 50 54 54 54 58 C54 62 58 66 62 62 C66 58 66 50 64 42 C62 34 58 26 58 26 Z"
          className="fill-violet-500/15 stroke-violet-600/40"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="60" cy="22" r="6" className="fill-violet-500/20 stroke-violet-600/35" strokeWidth="1.5" />
        <path
          d="M54 58 L50 70 M66 58 L70 70 M58 58 L60 66"
          className="stroke-violet-600/45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M60 34 C64 38 68 42 72 40 C76 38 74 34 70 32"
          className="stroke-rose-500/35"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M88 28 L96 32 V44 C96 52 92 58 88 60 C84 58 80 52 80 44 V32 Z"
          className="fill-emerald-500/10 stroke-emerald-600/30"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect
          x="20"
          y="40"
          width="18"
          height="22"
          rx="3"
          className="fill-rose-500/12 stroke-rose-600/30"
          strokeWidth="1.5"
        />
        <path
          d="M26 48 H32 M26 54 H32"
          className="stroke-rose-600/35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}

export function MenRunnersInjuriesPageHero({ className }: PageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-sky-500/20 via-blue-400/10 to-card"
      className={cn("h-36 rounded-2xl", className)}
      label="Men runners injury and health illustration"
      decorative
    >
      <>
        <path
          d="M58 26 C58 26 62 34 60 42 C58 50 54 54 54 58 C54 62 58 66 62 62 C66 58 66 50 64 42 C62 34 58 26 58 26 Z"
          className="fill-sky-500/15 stroke-sky-600/40"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="60" cy="22" r="6" className="fill-sky-500/20 stroke-sky-600/35" strokeWidth="1.5" />
        <path
          d="M54 58 L50 70 M66 58 L70 70 M58 58 L60 66"
          className="stroke-sky-600/45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M72 38 C76 42 80 44 84 42 C88 40 86 36 82 34"
          className="stroke-blue-500/35"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M88 28 L96 32 V44 C96 52 92 58 88 60 C84 58 80 52 80 44 V32 Z"
          className="fill-emerald-500/10 stroke-emerald-600/30"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="28"
          cy="48"
          r="10"
          className="fill-rose-500/12 stroke-rose-600/30"
          strokeWidth="1.5"
        />
        <path
          d="M28 44 C28 44 26 48 28 52 C30 48 28 44 28 44 Z"
          className="fill-rose-500/25 stroke-rose-600/35"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </>
    </IllustrationBanner>
  );
}

export function BadWeatherTipsPageHero({ className }: PageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-indigo-500/20 via-slate-400/10 to-card"
      className={cn("h-36 rounded-2xl", className)}
      label="Bad weather running tips illustration"
      decorative
    >
      <>
        <path
          d="M24 42 C24 34 32 28 42 28 C46 22 54 20 62 24 C72 24 80 32 80 42 C88 42 94 48 94 56 C94 64 88 70 80 70 H32 C24 70 18 64 18 56 C18 48 24 42 32 42 Z"
          className="fill-indigo-500/15 stroke-indigo-600/35"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M34 52 L38 60 M48 50 L46 62 M58 52 L54 60 M68 50 L70 62 M78 54 L74 64"
          className="stroke-indigo-600/40"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="82" cy="30" r="10" className="fill-amber-400/25 stroke-amber-500/35" strokeWidth="1.5" />
        <path
          d="M76 30 H88 M82 24 V36"
          className="stroke-amber-600/40"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 58 Q35 44 60 56 T110 52"
          className="stroke-primary/20"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="88"
          y="48"
          width="16"
          height="20"
          rx="2"
          className="fill-sky-500/12 stroke-sky-600/30"
          strokeWidth="1.5"
        />
        <path
          d="M92 54 H100 M92 58 H100 M92 62 H98"
          className="stroke-sky-600/35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}

export function SpecificSituationsTipsPageHero({ className }: PageHeroProps) {
  return (
    <IllustrationBanner
      gradient="from-sky-500/20 via-teal-400/10 to-card"
      className={cn("h-36 rounded-2xl", className)}
      label="Running for specific situations illustration"
      decorative
    >
      <>
        <circle cx="42" cy="44" r="10" className="fill-sky-500/15 stroke-sky-600/35" strokeWidth="1.5" />
        <path
          d="M38 54 L36 68 M46 54 L48 68 M40 54 L42 62"
          className="stroke-sky-600/45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="60" cy="40" r="11" className="fill-teal-500/15 stroke-teal-600/35" strokeWidth="1.5" />
        <path
          d="M54 52 L52 68 M66 52 L68 68 M58 52 L60 60"
          className="stroke-teal-600/45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="78" cy="46" r="9" className="fill-primary/15 stroke-primary/35" strokeWidth="1.5" />
        <path
          d="M74 56 L72 68 M82 56 L84 68 M76 56 L78 64"
          className="stroke-primary/45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M28 58 Q50 48 72 54 T104 50"
          className="stroke-primary/20"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="18"
          y="32"
          width="16"
          height="20"
          rx="3"
          className="fill-emerald-500/12 stroke-emerald-600/30"
          strokeWidth="1.5"
        />
        <path
          d="M24 38 H28 M24 42 H28 M24 46 H26"
          className="stroke-emerald-600/40"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    </IllustrationBanner>
  );
}
