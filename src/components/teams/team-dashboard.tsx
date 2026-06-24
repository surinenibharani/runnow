"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, ArrowLeft, Flame, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FadeIn } from "@/components/motion/fade-in";
import { formatDistance } from "@/lib/strava";

type TeamDashboard = {
  team: {
    name: string;
    slug: string;
    description: string | null;
    inviteCode?: string;
    coach: { name: string | null };
  };
  isCoach: boolean;
  members: Array<{
    user: { id: string; name: string | null; email: string };
    stravaConnected: boolean;
    streak: { current: number; longest: number };
    totalRuns: number;
    alignment: {
      planName: string;
      currentWeek: number;
      alignmentPercent: number;
      completed: number;
      total: number;
      message: string;
    } | null;
    recentRuns: Array<{
      name: string;
      startDate: string;
      distance: number;
      movingTime: number;
    }>;
  }>;
};

export function TeamDashboardContent({ slug }: { slug: string }) {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<TeamDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch(`/api/teams/${slug}`);
    if (res.status === 401) router.push("/login");
    else if (res.status === 403) router.push("/teams");
    else if (res.ok) setData(await res.json());
    setLoading(false);
  }, [slug, router]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") load();
  }, [status, router, load]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Team not found
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <FadeIn>
          <Link
            href="/teams"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="size-4" />
            All teams
          </Link>
          <h1 className="text-3xl font-bold">{data.team.name}</h1>
          <p className="text-muted-foreground mt-1">
            Coach: {data.team.coach.name ?? "Coach"} · {data.members.length} athletes
          </p>
          {data.team.description && (
            <p className="text-sm text-muted-foreground mt-2">{data.team.description}</p>
          )}
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.members.map((member) => (
            <Card key={member.user.id} className="border-border/60">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">
                    {member.user.name ?? member.user.email.split("@")[0]}
                  </CardTitle>
                  <Badge variant={member.stravaConnected ? "default" : "outline"}>
                    {member.stravaConnected ? "Strava" : "No Strava"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Flame className="size-4 text-orange-500" />
                    <span>{member.streak.current} day streak</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Activity className="size-4 text-primary" />
                    <span>{member.totalRuns} runs</span>
                  </div>
                </div>

                {member.alignment ? (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        {member.alignment.planName} · W{member.alignment.currentWeek}
                      </span>
                      <span className="font-medium">
                        {member.alignment.alignmentPercent}%
                      </span>
                    </div>
                    <Progress value={member.alignment.alignmentPercent} className="h-1.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {member.alignment.completed}/{member.alignment.total} sessions ·{" "}
                      {member.alignment.message}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No plan data</p>
                )}

                {member.recentRuns.length > 0 && (
                  <ul className="text-xs space-y-1 text-muted-foreground border-t pt-3">
                    {member.recentRuns.map((run) => (
                      <li key={run.startDate + run.name}>
                        {new Date(run.startDate).toLocaleDateString()} — {run.name} ·{" "}
                        {formatDistance(run.distance)}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {data.isCoach && (
          <Button nativeButton={false} render={<Link href="/teams" />} variant="outline">
            Manage pending requests on Teams page
          </Button>
        )}
      </div>
    </div>
  );
}
