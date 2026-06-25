"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { safeCallbackUrl } from "@/lib/security/callback-url";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const { status } = useSession();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"), "/dashboard");
  const isCoachFlow = callbackUrl.startsWith("/teams");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      window.location.assign(callbackUrl);
    }
  }, [status, callbackUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      setLoading(false);
      setError(
        result?.error === "CredentialsSignin"
          ? "Invalid email or password"
          : "Sign in failed. Please try again."
      );
      return;
    }

    window.location.assign(callbackUrl);
  }

  if (status === "loading") {
    return (
      <div className="py-16 text-center text-muted-foreground">Loading…</div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Redirecting…
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <FadeIn className="mx-auto max-w-md">
        <Card className="border-border/60">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-heading font-medium">
              {isCoachFlow ? "Log in as coach" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isCoachFlow
                ? "Sign in to manage your teams or subscribe to the coach plan"
                : "Log in to sync Strava and track your runs"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : isCoachFlow ? "Log in as coach" : "Sign in"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              No account?{" "}
              <Link
                href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="text-primary hover:underline"
              >
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
