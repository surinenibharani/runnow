"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  Flame,
  Heart,
  LogOut,
  MapPin,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/motion/fade-in";
import { formatDistance, formatDuration, formatPace } from "@/lib/strava";
import type { RouteComparison, RunSuggestion } from "@/lib/run-analysis";

interface DashboardData {
  user: { id: string; name: string | null; email: string; age: number | null };
  stravaConnected: boolean;
  streak: { current: number; longest: number; lastRunDate: string | null };
  suggestions: RunSuggestion[];
  routeComparisons: RouteComparison[];
  recentRuns: Array<{
    id: string;
    name: string;
    type: string;
    distance: number;
    movingTime: number;
    averageHeartrate: number | null;
    startDate: string;
  }>;
  totalRuns: number;
}

export function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    const res = await fetch("/api/dashboard");
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    const json = await res.json();
    setData(json);
    setAge(json.user?.age ? String(json.user.age) : "");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      loadDashboard();
    }
  }, [status, router, loadDashboard]);

  useEffect(() => {
    const connected = searchParams.get("connected");
    const error = searchParams.get("error");
    if (connected === "strava") setMessage("Strava connected! Sync your runs below.");
    if (error?.startsWith("strava")) setMessage("Strava connection failed. Try again.");
  }, [searchParams]);

  async function handleSync() {
    setSyncing(true);
    setMessage("");
    const res = await fetch("/api/strava/sync", { method: "POST" });
    const json = await res.json();
    setSyncing(false);
    if (res.ok) {
      setMessage(json.message);
      loadDashboard();
    } else {
      setMessage(json.error || "Sync failed");
    }
  }

  async function saveAge() {
    await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age: age ? parseInt(age, 10) : null }),
    });
    setMessage("Profile updated");
    loadDashboard();
  }

  if (status === "loading" || loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading your dashboard…
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Hey{data.user.name ? `, ${data.user.name.split(" ")[0]}` : ""}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your Strava-powered running insights
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.stravaConnected ? (
                <Button onClick={handleSync} disabled={syncing} size="sm">
                  <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "Syncing…" : "Sync Strava"}
                </Button>
              ) : (
                <Button nativeButton={false} render={<a href="/api/strava/connect" />} size="sm">
                  <Activity className="size-4" />
                  Connect Strava
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          </div>
          {message && (
            <p className="text-sm text-primary mt-3">{message}</p>
          )}
        </FadeIn>

        {!data.stravaConnected && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg">Connect Strava to get started</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Link your Strava account to import runs, track streaks, compare routes,
                and get coaching tips based on heart rate and run type.
              </p>
              <Button
                nativeButton={false}
                render={<a href="/api/strava/connect" />}
                className="mt-4"
              >
                Connect Strava
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border/60">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Flame className="size-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.streak.current}</p>
                <p className="text-sm text-muted-foreground">Day streak</p>
                <p className="text-xs text-muted-foreground">
                  Best: {data.streak.longest}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Activity className="size-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.totalRuns}</p>
                <p className="text-sm text-muted-foreground">Runs synced</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6">
              <Label htmlFor="dash-age" className="text-sm text-muted-foreground">
                Your age (HR zones)
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="dash-age"
                  type="number"
                  min={13}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="h-8"
                />
                <Button size="sm" variant="secondary" onClick={saveAge}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {data.suggestions.length > 0 && (
          <FadeIn>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="size-5 text-primary" />
              Coaching suggestions
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.suggestions.map((s) => (
                <Card key={s.title} className="border-border/60">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-2">
                      <Badge
                        variant={
                          s.priority === "high"
                            ? "default"
                            : s.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs shrink-0"
                      >
                        {s.priority}
                      </Badge>
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {s.detail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        )}

        {data.routeComparisons.length > 0 && (
          <FadeIn>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              Same route comparisons
            </h2>
            <div className="space-y-4">
              {data.routeComparisons.map((cmp) => (
                <Card key={cmp.routeKey} className="border-border/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{cmp.routeLabel}</CardTitle>
                    {cmp.delta && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="size-4" />
                        {cmp.delta.summary}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="rounded-lg bg-primary/5 p-4">
                        <p className="font-medium text-xs text-muted-foreground mb-2">
                          Latest — {new Date(cmp.current.date).toLocaleDateString()}
                        </p>
                        <p>{cmp.current.distance} · {cmp.current.duration}</p>
                        <p>Pace: {cmp.current.pace}</p>
                        {cmp.current.avgHr && (
                          <p>HR: {Math.round(cmp.current.avgHr)} bpm avg</p>
                        )}
                      </div>
                      {cmp.previous && (
                        <div className="rounded-lg bg-muted/50 p-4">
                          <p className="font-medium text-xs text-muted-foreground mb-2">
                            Previous — {new Date(cmp.previous.date).toLocaleDateString()}
                          </p>
                          <p>{cmp.previous.distance} · {cmp.previous.duration}</p>
                          <p>Pace: {cmp.previous.pace}</p>
                          {cmp.previous.avgHr && (
                            <p>HR: {Math.round(cmp.previous.avgHr)} bpm avg</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        )}

        {data.recentRuns.length > 0 && (
          <FadeIn>
            <h2 className="text-xl font-bold mb-4">Recent runs</h2>
            <div className="space-y-2">
              {data.recentRuns.map((run) => (
                <Card key={run.id} className="border-border/60">
                  <CardContent className="p-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{run.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(run.startDate).toLocaleDateString()} · {run.type}
                      </p>
                    </div>
                    <div className="text-sm text-right">
                      <p>
                        {formatDistance(run.distance)} · {formatDuration(run.movingTime)}
                      </p>
                      <p className="text-muted-foreground">
                        {formatPace(run.distance / run.movingTime)}
                        {run.averageHeartrate &&
                          ` · ${Math.round(run.averageHeartrate)} bpm`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        )}

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/plan" className="text-primary hover:underline">
            View training plans
          </Link>
          {" · "}
          Training plan checkboxes are separate from Strava sync
        </p>
      </div>
    </div>
  );
}
