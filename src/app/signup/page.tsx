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
import {
  TurnstileWidget,
  isTurnstileEnabled,
} from "@/components/security/turnstile";
import { safeCallbackUrl } from "@/lib/security/callback-url";
import { AUTH_WELCOME_STORAGE_KEY } from "@/lib/auth-messages";
import { SITE_NAME } from "@/lib/site";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading…</div>}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const { status } = useSession();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"), "/dashboard");
  const isCoachFlow = callbackUrl.startsWith("/teams");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const captchaRequired = isTurnstileEnabled();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.assign(callbackUrl);
    }
  }, [status, callbackUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (captchaRequired && !turnstileToken) {
      setError("Please complete the captcha");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        age,
        turnstileToken,
        website: honeypot,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to create account");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      setLoading(false);
      setError("Account created but sign-in failed. Please log in manually.");
      return;
    }

    sessionStorage.setItem(AUTH_WELCOME_STORAGE_KEY, "new");
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
              {isCoachFlow ? "Sign up as coach" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isCoachFlow
                ? "Create your account, then subscribe to the coach plan on the Teams page"
                : `Join ${SITE_NAME} — connect Strava for personalized insights`}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={80}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  maxLength={254}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password (8+ characters)</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age (for heart rate zones)</Label>
                <Input
                  id="age"
                  type="number"
                  min={13}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 32"
                />
              </div>
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
              {captchaRequired && (
                <TurnstileWidget
                  onVerify={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                />
              )}
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={loading || (captchaRequired && !turnstileToken)}
              >
                {loading ? "Creating account…" : "Create account"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
