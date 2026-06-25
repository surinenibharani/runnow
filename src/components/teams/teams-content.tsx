"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Copy,
  CreditCard,
  Loader2,
  Plus,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { CoachPlanCard } from "@/components/teams/coach-plan-card";

type TeamListData = {
  coachedTeams: Array<{
    id: string;
    name: string;
    slug: string;
    inviteCode: string;
    description: string | null;
    members: Array<{ id: string; user: { name: string | null; email: string } }>;
    _count: { members: number };
  }>;
  memberships: Array<{
    id: string;
    status: string;
    team: {
      id: string;
      name: string;
      slug: string;
      coach: { name: string | null };
      members: { id: string }[];
    };
  }>;
};

export function TeamsContent() {
  const { data: session, status, update } = useSession();
  const searchParams = useSearchParams();
  const [data, setData] = useState<TeamListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const isCoach =
    session?.user?.role === "COACH" || session?.user?.subscriptionTier === "COACH";

  const load = useCallback(async () => {
    const res = await fetch("/api/teams");
    if (res.status === 401) {
      setLoading(false);
      return;
    }
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") {
      load();
    } else {
      setLoading(false);
    }
  }, [status, load]);

  useEffect(() => {
    const checkout = searchParams.get("checkout");
    if (checkout === "success" && status === "authenticated") {
      void (async () => {
        await fetch("/api/stripe/sync-subscription", { method: "POST" });
        await update();
        setMessage("Coach subscription active. You can create teams now.");
        load();
      })();
    } else if (checkout === "cancelled") {
      setMessage("Checkout cancelled. No charges were made.");
    }
  }, [searchParams, status, update, load]);

  async function startCheckout() {
    setCheckoutLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      if (res.status === 503) {
        const fallback = await fetch("/api/coach/activate", { method: "POST" });
        const fallbackJson = await fallback.json();
        setMessage(fallbackJson.message || fallbackJson.error);
        if (fallback.ok) {
          await update();
          load();
        }
        return;
      }
      setMessage(json.error || "Could not start checkout");
    } finally {
      setCheckoutLoading(false);
    }
  }

  async function openBillingPortal() {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const json = await res.json();
    if (json.url) {
      window.location.href = json.url;
    } else {
      setMessage(json.error || "Billing portal unavailable");
    }
  }

  async function createTeam(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: teamName }),
    });
    const json = await res.json();
    if (!res.ok) {
      setMessage(json.error);
      return;
    }
    setTeamName("");
    setMessage(`Team "${json.team.name}" created`);
    load();
  }

  async function joinTeam(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/teams/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode, message: joinMessage }),
    });
    const json = await res.json();
    setMessage(res.ok ? `Request sent to join ${json.teamName}` : json.error);
    if (res.ok) {
      setInviteCode("");
      setJoinMessage("");
      load();
    }
  }

  async function reviewMember(
    slug: string,
    memberId: string,
    decision: "APPROVED" | "REJECTED"
  ) {
    const res = await fetch(`/api/teams/${slug}/members/${memberId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: decision }),
    });
    if (res.ok) load();
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  if (loading || status === "loading") {
    return (
      <div className="py-20 flex justify-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <FadeIn>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Coaches run training groups with invite codes and a shared dashboard. Runners
            join their coach&apos;s team for free with an invite code.
          </p>
          {message && <p className="text-sm text-primary mt-3">{message}</p>}
        </FadeIn>

        {!isCoach && (
          <CoachPlanCard
            isAuthenticated={status === "authenticated"}
            checkoutLoading={checkoutLoading}
            onSubscribe={startCheckout}
          />
        )}

        {isCoach && (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={openBillingPortal}>
              <CreditCard className="size-4" />
              Manage billing
            </Button>
          </div>
        )}

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Join a team</CardTitle>
          </CardHeader>
          <CardContent>
            {status === "authenticated" ? (
              <form onSubmit={joinTeam} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="invite">Invite code from your coach</Label>
                  <Input
                    id="invite"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Paste invite code"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-msg">Message (optional)</Label>
                  <Input
                    id="join-msg"
                    value={joinMessage}
                    onChange={(e) => setJoinMessage(e.target.value)}
                    placeholder="e.g. Training for Chicago Marathon"
                  />
                </div>
                <Button type="submit">Request to join</Button>
              </form>
            ) : (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Runners join for free. Log in with your athlete account, then paste the
                  invite code from your coach.
                </p>
                <Button
                  nativeButton={false}
                  render={<Link href="/login?callbackUrl=/teams" />}
                  variant="outline"
                  size="sm"
                >
                  Log in to join a team
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {isCoach && (
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="size-5" />
                Create a team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={createTeam} className="flex gap-2">
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team name"
                  required
                  className="flex-1"
                />
                <Button type="submit">Create</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {data?.coachedTeams && data.coachedTeams.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Teams you coach</h2>
            {data.coachedTeams.map((team) => (
              <Card key={team.id} className="border-border/60">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/teams/${team.slug}`}
                        className="font-semibold text-lg hover:text-primary"
                      >
                        {team.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {team._count.members} members
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {team.inviteCode}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyCode(team.inviteCode)}
                      >
                        <Copy className="size-4" />
                        {copied === team.inviteCode ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                  {team.members.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Pending requests</p>
                      {team.members.map((m) => (
                        <div
                          key={m.id}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3 text-sm"
                        >
                          <span>
                            {m.user.name || m.user.email}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => reviewMember(team.slug, m.id, "APPROVED")}
                            >
                              <Check className="size-4" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => reviewMember(team.slug, m.id, "REJECTED")}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    nativeButton={false}
                    render={<Link href={`/teams/${team.slug}`} />}
                    variant="secondary"
                    size="sm"
                  >
                    <Users className="size-4" />
                    View team dashboard
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {data?.memberships && data.memberships.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Your team memberships</h2>
            {data.memberships.map((m) => (
              <Card key={m.id} className="border-border/60">
                <CardContent className="p-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <Link
                      href={m.status === "APPROVED" ? `/teams/${m.team.slug}` : "#"}
                      className="font-medium hover:text-primary"
                    >
                      {m.team.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Coach: {m.team.coach.name ?? "Coach"} ·{" "}
                      {m.team.members.length} athletes
                    </p>
                  </div>
                  <Badge
                    variant={m.status === "APPROVED" ? "default" : "secondary"}
                  >
                    {m.status.toLowerCase()}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
    </div>
  );
}
