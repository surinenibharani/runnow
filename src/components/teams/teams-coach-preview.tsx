import {
  Activity,
  BarChart3,
  Check,
  Copy,
  CreditCard,
  Crown,
  Flame,
  Plus,
  Shield,
  UserPlus,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { COACH_PLAN_BENEFITS, COACH_PLAN_PRICE } from "@/lib/coach-plan";

const benefitIcons = [Users, UserPlus, Shield, BarChart3, Check, CreditCard];

const previewAthletes = [
  {
    name: "Jordan Lee",
    streak: 12,
    runs: 28,
    plan: "Half Marathon · W6",
    alignment: 78,
    completed: 14,
    total: 18,
    message: "On track this week",
    recentRun: "Sat — Long run · 8.2 mi",
  },
  {
    name: "Sam Rivera",
    streak: 5,
    runs: 19,
    plan: "5K · W4",
    alignment: 92,
    completed: 11,
    total: 12,
    message: "Strong consistency",
    recentRun: "Sun — Easy run · 3.1 mi",
  },
];

/** Static preview of the coach Teams experience for the coming-soon page. */
export function TeamsCoachPreview() {
  return (
    <div
      className="pointer-events-none select-none space-y-8 p-4 sm:p-6"
      aria-hidden
    >
      <div className="opacity-25">
        <h2 className="text-3xl font-bold">Teams</h2>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Coaches run training groups with invite codes and a shared dashboard.
          Runners join their coach&apos;s team for free with an invite code.
        </p>
      </div>

      <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-background opacity-25">
        <CardContent className="space-y-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="size-6 text-primary" />
                <Badge variant="secondary">Coach plan</Badge>
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Subscribe as coach</h3>
              <p className="max-w-xl text-muted-foreground">
                Create teams, approve athletes, and monitor everyone&apos;s training
                progress from one dashboard.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-3xl font-bold">{COACH_PLAN_PRICE.label}</p>
              <p className="text-sm text-muted-foreground">Billed monthly · cancel anytime</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {COACH_PLAN_BENEFITS.slice(0, 4).map((benefit, index) => {
              const Icon = benefitIcons[index] ?? Check;
              return (
                <div
                  key={benefit.title}
                  className="flex gap-3 rounded-xl border border-border/60 bg-background/80 p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{benefit.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="inline-flex h-9 items-center rounded-lg bg-primary/80 px-4 text-sm font-medium text-primary-foreground">
            Subscribe as coach
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 opacity-[0.08]">
        <CardHeader>
          <CardTitle className="text-lg">Join a team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-10 rounded-lg border border-input bg-muted/40 px-3 text-sm leading-10 text-muted-foreground">
            Paste invite code from your coach
          </div>
          <div className="h-10 rounded-lg border border-input bg-muted/40 px-3 text-sm leading-10 text-muted-foreground">
            e.g. Training for Chicago Marathon
          </div>
          <div className="inline-flex h-9 items-center rounded-lg border border-border px-4 text-sm font-medium">
            Request to join
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 opacity-25">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="size-5" />
            Create a team
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div className="h-10 flex-1 rounded-lg border border-input bg-muted/40 px-3 text-sm leading-10 text-muted-foreground">
            Riverside Run Club
          </div>
          <div className="inline-flex h-10 items-center rounded-lg bg-primary/80 px-4 text-sm font-medium text-primary-foreground">
            Create
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4 opacity-[0.08]">
        <h3 className="text-xl font-bold">Teams you coach</h3>
        <Card className="border-border/60">
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">Riverside Run Club</p>
                <p className="text-sm text-muted-foreground">8 members</p>
              </div>
              <div className="flex items-center gap-2">
                <code className="rounded bg-muted px-2 py-1 text-xs">RUNNOW-7K2M</code>
                <div className="inline-flex size-8 items-center justify-center rounded-lg border border-border">
                  <Copy className="size-4" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Pending requests</p>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3 text-sm">
                <span>Alex Morgan · marathon block</span>
                <div className="flex gap-2">
                  <div className="inline-flex h-8 items-center rounded-lg bg-primary/80 px-3 text-xs font-medium text-primary-foreground">
                    Approve
                  </div>
                  <div className="inline-flex h-8 items-center rounded-lg border border-border px-3 text-xs">
                    Decline
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-secondary px-3 text-sm font-medium">
              <Users className="size-4" />
              View team dashboard
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4 opacity-[0.08]">
        <div>
          <h3 className="text-xl font-bold">Team dashboard</h3>
          <p className="text-sm text-muted-foreground">
            See every athlete&apos;s streak, Strava runs, and plan alignment in one place.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {previewAthletes.map((athlete) => (
            <Card key={athlete.name} className="border-border/60">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{athlete.name}</CardTitle>
                  <Badge>Strava</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Flame className="size-4 text-orange-500" />
                    <span>{athlete.streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Activity className="size-4 text-primary" />
                    <span>{athlete.runs} runs</span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">{athlete.plan}</span>
                    <span className="font-medium">{athlete.alignment}%</span>
                  </div>
                  <Progress value={athlete.alignment} className="h-1.5" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {athlete.completed}/{athlete.total} sessions · {athlete.message}
                  </p>
                </div>
                <p className="border-t pt-3 text-xs text-muted-foreground">
                  {athlete.recentRun}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
