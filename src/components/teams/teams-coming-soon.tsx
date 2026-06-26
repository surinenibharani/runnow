import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { TeamsCoachPreview } from "@/components/teams/teams-coach-preview";

export function TeamsComingSoon() {
  return (
    <FadeIn className="relative mt-8 grid overflow-hidden rounded-2xl border border-border/60">
      <div
        className="col-start-1 row-start-1 saturate-[0.85] pointer-events-none select-none"
        aria-hidden
      >
        <TeamsCoachPreview />
      </div>

      <div className="relative z-10 col-start-1 row-start-1 self-start p-4 sm:p-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/70 bg-background p-6 shadow-lg sm:p-8">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="size-6" aria-hidden />
            </div>
            <div>
              <Badge variant="secondary" className="mb-3 uppercase tracking-wide">
                Coming soon
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Teams isn&apos;t live yet
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Behind this message is a preview of what coaches can expect: team
                creation, invite codes, athlete approvals, and a shared dashboard
                with Strava stats and plan alignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
