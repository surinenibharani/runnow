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
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { safeCallbackUrl } from "@/lib/security/callback-url";
import { AUTH_WELCOME_STORAGE_KEY } from "@/lib/auth-messages";

export default function LoginPage() {
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-md">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Log in" }]}
        />
        <Suspense fallback={<AuthFormFallback title="Welcome back" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

function AuthFormFallback({ title }: { title: string }) {
  return (
    <Card className="border-border/60">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-heading font-medium">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Log in to save your plan and check off workouts
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" aria-hidden>
          <div className="space-y-2">
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-9 rounded-lg bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-9 rounded-lg bg-muted" />
          </div>
          <div className="h-10 rounded-lg bg-muted" />
        </div>
      </CardContent>
    </Card>
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

    sessionStorage.setItem(AUTH_WELCOME_STORAGE_KEY, "login");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      sessionStorage.removeItem(AUTH_WELCOME_STORAGE_KEY);

      if (result?.error === "CredentialsSignin") {
        setError("Invalid email or password.");
      } else {
        setError("Sign in failed. Please try again.");
      }

      setLoading(false);
      return;
    }

    window.location.assign(callbackUrl);
  }

  if (status === "authenticated") {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Redirecting…
      </div>
    );
  }

  return (
    <FadeIn>
      <Card className="border-border/60">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-heading font-medium">
              {isCoachFlow ? "Log in as coach" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isCoachFlow
                ? "Sign in to manage your teams or subscribe to the coach plan"
                : "Log in to save your plan and check off workouts"}
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
                <div
                  className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                  aria-live="polite"
                >
                  <p>{error}</p>
                </div>
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
  );
}
