"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  ChevronDown,
  ExternalLink,
  Flame,
  Heart,
  LogOut,
  MapPin,
  RefreshCw,
  TrendingUp,
  Timer,
  Unplug,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/motion/fade-in";
import { formatDistance, formatDuration, formatPace } from "@/lib/strava";
import type { PlanAlignmentSummary } from "@/lib/plan-alignment";
import { PlanAlignmentCard } from "@/components/dashboard/plan-alignment";
import { TrainingPlanEditorCard } from "@/components/dashboard/training-plan-editor-card";
import { TrainingPlanSignupCard } from "@/components/dashboard/training-plan-signup-card";
import { RecoveryReadinessCard } from "@/components/dashboard/recovery-readiness-card";
import { useProfileModal } from "@/components/profile/profile-modal";
import { ActivityPieChart } from "@/components/dashboard/activity-pie-chart";
import { PaceInsightsPanel } from "@/components/dashboard/pace-insights-panel";
import { ActivityDetailPanel } from "@/components/dashboard/activity-detail-panel";
import type { RouteComparison, RunSuggestion } from "@/lib/run-analysis";
import type { PieSlice } from "@/lib/activity-charts";
import type { PaceInsights } from "@/lib/pace-analysis";
import { TEAMS_ROLLOUT_ENABLED } from "@/lib/teams/rollout";
import {
  CHART_TIME_RANGE_OPTIONS,
  getChartTimeRangeLabel,
  type ChartTimeRange,
} from "@/lib/chart-time-range";
import type { RecoveryReadiness } from "@/lib/recovery-readiness";
import type { TrainingPlanDisplay } from "@/lib/training-plan-display";
import type { PlanDeletedMessage } from "@/lib/plan-messages";
import { formatGenderLabel } from "@/lib/gender";
import { formatBmiWithCategory, getBmi } from "@/lib/athlete-profile";
import {
  cmToFeetInches,
  formatHrZoneSubtitle,
  kgToLbs,
  type HrProfile,
} from "@/lib/hr-zones";
import { cn } from "@/lib/utils";

const DASHBOARD_LIST_PREVIEW_COUNT = 2;

interface DashboardData {
  user: {
    id: string;
    name: string | null;
    email: string;
    age: number | null;
    gender: string | null;
    weightKg: number | null;
    heightCm: number | null;
    role?: string;
    subscriptionTier?: string;
  };
  stravaConnected: boolean;
  stravaLastSyncedAt: string | null;
  stravaProfileUrl: string | null;
  alignment: PlanAlignmentSummary | null;
  hasTrainingPlan: boolean;
  trainingPlan: TrainingPlanDisplay | null;
  streak: { current: number; longest: number; lastRunDate: string | null };
  suggestions: RunSuggestion[];
  routeComparisons: RouteComparison[];
  chartTimeRange: ChartTimeRange;
  activityBreakdown: PieSlice[];
  heartRateZones: PieSlice[];
  hrZoneMethod?: "karvonen" | "percent_max";
  hrActivities: Array<{
    id: string;
    name: string;
    type: string;
    activityLabel: string;
    startDate: string;
    averageHeartrate: number | null;
    movingTime: number;
  }>;
  activityList: Array<{
    id: string;
    name: string;
    type: string;
    activityLabel: string;
    startDate: string;
    movingTime: number;
    distance: number;
  }>;
  paceInsights: PaceInsights;
  recentRuns: Array<{
    id: string;
    name: string;
    type: string;
    distance: number;
    movingTime: number;
    averageHeartrate: number | null;
    elevationGain?: number | null;
    averageCadence?: number | null;
    sufferScore?: number | null;
    workoutType?: number | null;
    startDate: string;
  }>;
  totalRuns: number;
  recovery: RecoveryReadiness;
}

export function DashboardContent() {
  const { status } = useSession();
  const { openProfile } = useProfileModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");
  const [disconnecting, setDisconnecting] = useState(false);
  const [chartRange, setChartRange] = useState<ChartTimeRange>("month");
  const [chartsLoading, setChartsLoading] = useState(false);
  const [selectedHrActivityId, setSelectedHrActivityId] = useState("all");
  const [activityHrZones, setActivityHrZones] = useState<PieSlice[] | null>(
    null
  );
  const [activityHrZonesLoading, setActivityHrZonesLoading] = useState(false);
  const [routeComparisonsExpanded, setRouteComparisonsExpanded] = useState(false);
  const [recentWorkoutsExpanded, setRecentWorkoutsExpanded] = useState(false);
  const [planDeletedNotice, setPlanDeletedNotice] =
    useState<PlanDeletedMessage | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  const loadDashboard = useCallback(
    async (range: ChartTimeRange = chartRange) => {
      const res = await fetch(`/api/dashboard?range=${range}`);
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const json = await res.json();
      setData(json);
      setChartRange(json.chartTimeRange ?? range);
      setLoading(false);
      setChartsLoading(false);
    },
    [router, chartRange]
  );

  const refreshCharts = useCallback(
    async (range: ChartTimeRange) => {
      setChartsLoading(true);
      const res = await fetch(`/api/dashboard?range=${range}`);
      if (!res.ok) {
        setChartsLoading(false);
        return;
      }
      const json = await res.json();
      setData((prev) =>
        prev
          ? {
              ...prev,
              chartTimeRange: json.chartTimeRange,
              activityBreakdown: json.activityBreakdown,
              heartRateZones: json.heartRateZones,
              hrActivities: json.hrActivities,
              activityList: json.activityList,
            }
          : json
      );
      setChartsLoading(false);
    },
    []
  );

  function handleChartRangeChange(value: ChartTimeRange) {
    setChartRange(value);
    setSelectedHrActivityId("all");
    setActivityHrZones(null);
    refreshCharts(value);
  }

  useEffect(() => {
    if (!data || selectedHrActivityId === "all") {
      setActivityHrZones(null);
      setActivityHrZonesLoading(false);
      return;
    }

    let cancelled = false;
    setActivityHrZonesLoading(true);
    setActivityHrZones(null);

    fetch(`/api/activities/${selectedHrActivityId}/heart-rate-zones`)
      .then(async (res) => {
        const json = await res.json();
        if (cancelled) return;
        setActivityHrZones(json.zones ?? []);
        setActivityHrZonesLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setActivityHrZones([]);
          setActivityHrZonesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [data, selectedHrActivityId]);

  const displayedHeartRateZones = useMemo(() => {
    if (!data) return [];
    if (selectedHrActivityId === "all") return data.heartRateZones;
    if (activityHrZonesLoading) return [];
    return activityHrZones ?? [];
  }, [data, selectedHrActivityId, activityHrZones, activityHrZonesLoading]);

  const hrProfile = useMemo((): HrProfile | null => {
    if (!data) return null;
    return {
      age: data.user.age,
      gender: data.user.gender,
      restingHeartRate: data.recovery.todayRestingHeartRate,
      weightKg: data.user.weightKg,
      heightCm: data.user.heightCm,
    };
  }, [data]);

  const heartRateSubtitle = useMemo(() => {
    if (!data || !hrProfile) return "";
    const rangeLabel = getChartTimeRangeLabel(chartRange);

    if (selectedHrActivityId === "all") {
      return formatHrZoneSubtitle(hrProfile, `All activities · ${rangeLabel}`);
    }

    const activity = data.hrActivities.find((a) => a.id === selectedHrActivityId);
    if (!activity) return rangeLabel;

    const date = new Date(activity.startDate).toLocaleDateString();
    if (!activity.averageHeartrate) {
      return `${activity.name} · ${date} · no heart rate recorded`;
    }

    return formatHrZoneSubtitle(
      hrProfile,
      `${activity.name} · ${date} · time in each zone`
    );
  }, [data, hrProfile, selectedHrActivityId, chartRange]);

  useEffect(() => {
    function onProfileUpdated() {
      loadDashboard();
    }
    window.addEventListener("profile-updated", onProfileUpdated);
    return () => window.removeEventListener("profile-updated", onProfileUpdated);
  }, [loadDashboard]);

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
    const synced = searchParams.get("synced");
    const planMatched = searchParams.get("planMatched");

    if (connected === "strava") {
      if (synced) {
        const parts = [`Imported ${synced} run${synced === "1" ? "" : "s"} from Strava`];
        if (planMatched && planMatched !== "0") {
          parts.push(`${planMatched} matched your training plan`);
        }
        setMessage(parts.join(" · ") + ".");
      } else {
        setMessage("Strava connected! Your runs will sync automatically.");
      }
    }

    if (error === "strava_denied") setMessage("Strava authorization was cancelled.");
    if (error === "strava_invalid") setMessage("Strava connection expired. Please try again.");
    if (error === "strava_failed") setMessage("Strava connection failed. Check your app settings and try again.");
    if (error === "strava_not_configured") {
      setMessage("Strava is not configured on this server. Add STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET.");
    }
  }, [searchParams]);

  async function handleDisconnect() {
    if (!confirm("Disconnect Strava? Your synced runs will stay on your dashboard.")) return;
    setDisconnecting(true);
    const res = await fetch("/api/strava/disconnect", { method: "POST" });
    setDisconnecting(false);
    if (res.ok) {
      setMessage("Strava disconnected.");
      loadDashboard();
    }
  }

  function formatLastSynced(iso: string | null): string {
    if (!iso) return "Never synced";
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "Synced just now";
    if (mins < 60) return `Synced ${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Synced ${hours}h ago`;
    return `Synced ${date.toLocaleDateString()}`;
  }

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

  if (status === "loading" || loading) {
    return (
      <div
        className="py-20 text-center text-muted-foreground"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        Loading your dashboard…
      </div>
    );
  }

  if (!data) return null;

  const bmiValue = hrProfile ? getBmi(hrProfile) : null;

  return (
    <div className="space-y-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Hey{data.user.name ? `, ${data.user.name.split(" ")[0]}` : ""}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your Strava-powered running insights
                {data.stravaConnected && (
                  <span className="block text-xs mt-1">
                    {formatLastSynced(data.stravaLastSyncedAt)}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.stravaConnected ? (
                <>
                  <Button onClick={handleSync} disabled={syncing} size="sm">
                    <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} />
                    {syncing ? "Syncing…" : "Sync Strava"}
                  </Button>
                  {data.stravaProfileUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={
                        <a
                          href={data.stravaProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <ExternalLink className="size-4" />
                      Strava profile
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnect}
                    disabled={disconnecting}
                  >
                    <Unplug className="size-4" />
                    Disconnect
                  </Button>
                </>
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

        <FadeIn>
          {data.hasTrainingPlan && data.trainingPlan ? (
            <TrainingPlanEditorCard
              plan={data.trainingPlan}
              onPlanUpdated={(plan) => {
                setPlanDeletedNotice(null);
                setData((prev) =>
                  prev ? { ...prev, hasTrainingPlan: true, trainingPlan: plan } : prev
                );
                void loadDashboard();
              }}
              onPlanRemoved={(notice) => {
                setPlanDeletedNotice(notice ?? null);
                setData((prev) =>
                  prev
                    ? {
                        ...prev,
                        hasTrainingPlan: false,
                        trainingPlan: null,
                        alignment: null,
                      }
                    : prev
                );
              }}
            />
          ) : (
            <TrainingPlanSignupCard deletedNotice={planDeletedNotice} />
          )}
        </FadeIn>

        {!data.stravaConnected && (
          <Card className="border-[#fc4c02]/30 bg-[#fc4c02]/5">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg">Connect Strava to get started</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Link your Strava account to import runs, track streaks, compare routes,
                auto-match your training plan, and get coaching tips based on heart rate.
              </p>
              <ul className="text-sm text-muted-foreground mt-3 space-y-1 list-disc list-inside">
                <li>Automatic plan alignment when you sync runs</li>
                <li>Streak tracking and route comparisons</li>
                <li>Heart rate coaching suggestions</li>
              </ul>
              <Button
                nativeButton={false}
                render={<a href="/api/strava/connect" />}
                className="mt-4 bg-[#fc4c02] hover:bg-[#e34402] text-white"
              >
                Connect Strava
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>

        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Heart className="size-4 text-primary" />
                  Heart rate zone profile
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Age drives max HR (Tanaka). Log resting HR in recovery for
                  Karvonen zones. Weight and height add BMI context.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-muted-foreground shrink-0"
                onClick={openProfile}
              >
                <Pencil className="size-3.5 mr-1" />
                Edit profile
              </Button>
            </div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Gender</dt>
                <dd className="font-semibold text-lg">
                  {formatGenderLabel(data.user.gender) ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Age</dt>
                <dd className="font-semibold text-lg">
                  {data.user.age ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Weight</dt>
                <dd className="font-semibold text-lg">
                  {data.user.weightKg != null
                    ? `${Math.round(kgToLbs(data.user.weightKg))} lbs`
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Height</dt>
                <dd className="font-semibold text-lg">
                  {data.user.heightCm != null
                    ? (() => {
                        const { feet, inches } = cmToFeetInches(
                          data.user.heightCm!
                        );
                        return `${feet}' ${inches}"`;
                      })()
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">BMI</dt>
                <dd className="font-semibold text-lg">
                  {bmiValue != null ? formatBmiWithCategory(bmiValue) : "—"}
                </dd>
              </div>
            </dl>

            {hrProfile && (
              <p className="text-xs text-muted-foreground mt-4 border-t border-border/60 pt-3">
                {formatHrZoneSubtitle(hrProfile)}
                {data.hrZoneMethod === "karvonen"
                  ? " · Karvonen zones active"
                  : data.recovery.todayRestingHeartRate == null
                    ? " · Log resting HR for personalized zones"
                    : ""}
              </p>
            )}
          </CardContent>
        </Card>

        <FadeIn>
          <RecoveryReadinessCard
            recovery={data.recovery}
            onSaved={() => loadDashboard()}
          />
        </FadeIn>

        {data.stravaConnected && (
          <FadeIn>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Timer className="size-5 text-primary" />
              Pace & training zones
            </h2>
            <PaceInsightsPanel insights={data.paceInsights} />
          </FadeIn>
        )}

        {data.stravaConnected && (
          <FadeIn>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold">Activity insights</h2>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="chart-range"
                  className="text-sm text-muted-foreground shrink-0"
                >
                  Time frame
                </Label>
                <select
                  id="chart-range"
                  value={chartRange}
                  onChange={(e) =>
                    handleChartRangeChange(e.target.value as ChartTimeRange)
                  }
                  disabled={chartsLoading}
                  className={cn(
                    "h-8 min-w-[9rem] rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                  )}
                >
                  {CHART_TIME_RANGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className={cn(
                "mt-4 grid gap-4 lg:grid-cols-2 transition-opacity",
                (chartsLoading || activityHrZonesLoading) &&
                  "opacity-50 pointer-events-none"
              )}
              aria-busy={chartsLoading || activityHrZonesLoading}
              aria-live="polite"
            >
              <Card className="border-border/60">
                <CardContent className="p-6">
                  <ActivityPieChart
                    title="Activity mix"
                    subtitle={`All synced Strava activities · ${getChartTimeRangeLabel(chartRange)}`}
                    slices={data.activityBreakdown}
                    valueLabel="total"
                  />
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardContent className="p-6">
                  {data.hrActivities.length > 0 && (
                    <div className="mb-4 flex items-center gap-2">
                      <Label
                        htmlFor="hr-activity"
                        className="text-sm text-muted-foreground shrink-0"
                      >
                        Activity
                      </Label>
                      <select
                        id="hr-activity"
                        value={selectedHrActivityId}
                        onChange={(e) => setSelectedHrActivityId(e.target.value)}
                        disabled={chartsLoading}
                        className={cn(
                          "h-8 min-w-0 flex-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                          "disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                        )}
                      >
                        <option value="all">All activities</option>
                        {data.hrActivities.map((activity) => {
                          const date = new Date(
                            activity.startDate
                          ).toLocaleDateString();
                          const hrLabel = activity.averageHeartrate
                            ? ` · ${Math.round(activity.averageHeartrate)} bpm`
                            : "";
                          return (
                            <option key={activity.id} value={activity.id}>
                              {date} · {activity.activityLabel} · {activity.name}
                              {hrLabel}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                  <ActivityPieChart
                    title="Heart rate zones"
                    subtitle={heartRateSubtitle}
                    slices={displayedHeartRateZones}
                    valueLabel="minutes"
                    maxDecimals={1}
                    emptyMessage={
                      activityHrZonesLoading
                        ? "Loading heart rate stream from Strava…"
                        : selectedHrActivityId === "all"
                          ? "No heart rate data on synced activities yet. Use a watch or chest strap during workouts."
                          : "No heart rate stream for this activity. Enable HR recording on your watch or chest strap."
                    }
                  />
                </CardContent>
              </Card>
            </div>
            {data.activityList.length > 0 && (
              <Card className="mt-4 border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold mb-1">
                    Activities in this period
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    {data.activityList.length} workout
                    {data.activityList.length === 1 ? "" : "s"} ·{" "}
                    {getChartTimeRangeLabel(chartRange)}
                  </p>
                  <ul className="max-h-64 space-y-2 overflow-y-auto text-sm">
                    {data.activityList.map((activity) => (
                      <li
                        key={activity.id}
                        className="flex items-start justify-between gap-3 rounded-lg border border-border/50 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{activity.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.startDate).toLocaleDateString()}{" "}
                            · {activity.activityLabel}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatDuration(activity.movingTime)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </FadeIn>
        )}

        {data.alignment && (
          <FadeIn>
            <PlanAlignmentCard alignment={data.alignment} />
          </FadeIn>
        )}

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
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                These suggestions are general fitness education, not medical
                advice.
              </strong>{" "}
              Heart-rate zones use estimated maximums (e.g. the Tanaka formula)
              and vary by individual.{" "}
              <a
                href="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise-intensity/art-20046887"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Learn how heart-rate zones work
              </a>
              .
            </p>
          </FadeIn>
        )}

        {data.routeComparisons.length > 0 && (
          <FadeIn>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              Same route comparisons
            </h2>
            <div className="space-y-4">
              {(routeComparisonsExpanded
                ? data.routeComparisons
                : data.routeComparisons.slice(0, DASHBOARD_LIST_PREVIEW_COUNT)
              ).map((cmp) => (
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
            {data.routeComparisons.length > DASHBOARD_LIST_PREVIEW_COUNT && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-3 w-full text-muted-foreground"
                onClick={() => setRouteComparisonsExpanded((expanded) => !expanded)}
                aria-expanded={routeComparisonsExpanded}
              >
                {routeComparisonsExpanded
                  ? "Show less"
                  : `Show ${data.routeComparisons.length - DASHBOARD_LIST_PREVIEW_COUNT} more`}
                <ChevronDown
                  className={cn(
                    "ml-1 size-4 transition-transform",
                    routeComparisonsExpanded && "rotate-180"
                  )}
                  aria-hidden
                />
              </Button>
            )}
          </FadeIn>
        )}

        {data.recentRuns.length > 0 && (
          <FadeIn>
            <h2 className="text-xl font-bold mb-4">Recent workouts</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Tap a workout for mile splits, laps, and aerobic decoupling from Strava.
            </p>
            <div className="space-y-2">
              {(recentWorkoutsExpanded
                ? data.recentRuns
                : data.recentRuns.slice(0, DASHBOARD_LIST_PREVIEW_COUNT)
              ).map((run) => (
                <Card key={run.id} className="border-border/60">
                  <CardContent className="p-0">
                    <button
                      type="button"
                      className="flex w-full flex-wrap items-center justify-between gap-2 p-4 text-left transition-colors hover:bg-muted/30"
                      onClick={() => setSelectedActivityId(run.id)}
                    >
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
                          {run.sufferScore != null && run.sufferScore > 0 &&
                            ` · effort ${run.sufferScore}`}
                          {run.elevationGain != null && run.elevationGain > 0 &&
                            ` · ${Math.round(run.elevationGain * 3.28084)} ft`}
                        </p>
                      </div>
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {data.recentRuns.length > DASHBOARD_LIST_PREVIEW_COUNT && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-3 w-full text-muted-foreground"
                onClick={() => setRecentWorkoutsExpanded((expanded) => !expanded)}
                aria-expanded={recentWorkoutsExpanded}
              >
                {recentWorkoutsExpanded
                  ? "Show less"
                  : `Show ${data.recentRuns.length - DASHBOARD_LIST_PREVIEW_COUNT} more`}
                <ChevronDown
                  className={cn(
                    "ml-1 size-4 transition-transform",
                    recentWorkoutsExpanded && "rotate-180"
                  )}
                  aria-hidden
                />
              </Button>
            )}
          </FadeIn>
        )}

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/plan" className="text-primary hover:underline">
            View training plans
          </Link>
          {" · "}
          {TEAMS_ROLLOUT_ENABLED ? (
            <Link href="/teams" className="text-primary hover:underline">
              Teams
            </Link>
          ) : (
            <Link
              href="/teams"
              className="text-muted-foreground hover:text-foreground"
            >
              Teams <span className="text-xs uppercase">(coming soon)</span>
            </Link>
          )}
          {" · "}
          Strava runs auto-match your plan when synced
        </p>

        <ActivityDetailPanel
          activityId={selectedActivityId}
          onClose={() => setSelectedActivityId(null)}
        />
    </div>
  );
}
