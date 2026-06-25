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
import {
  TurnstileWidget,
  isTurnstileEnabled,
} from "@/components/security/turnstile";
import { safeCallbackUrl } from "@/lib/security/callback-url";
import { AUTH_WELCOME_STORAGE_KEY } from "@/lib/auth-messages";
import { SITE_NAME } from "@/lib/site";
import { BodyMetricsFields } from "@/components/profile/body-metrics-fields";
import {
  bodyMetricsToStored,
  emptyBodyMetricsForm,
  type BodyMetricsFormValues,
} from "@/lib/body-metrics-form";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import {
  isValidPassword,
  passwordValidationMessage,
} from "@/lib/security/validation";

export default function SignupPage() {
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-md">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Sign up" }]}
        />
        <Suspense
          fallback={
            <div className="py-16 text-center text-muted-foreground">
              Loading…
            </div>
          }
        >
          <SignupForm />
        </Suspense>
      </div>
    </div>
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
  const [bodyMetrics, setBodyMetrics] = useState<BodyMetricsFormValues>(
    emptyBodyMetricsForm
  );
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

    if (!isValidPassword(password)) {
      setError(passwordValidationMessage(password) ?? "Choose a stronger password.");
      setLoading(false);
      return;
    }

    const metrics = bodyMetricsToStored(bodyMetrics);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        age: metrics.age,
        gender: metrics.gender,
        weightKg: metrics.weightKg,
        heightCm: metrics.heightCm,
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

    sessionStorage.setItem(AUTH_WELCOME_STORAGE_KEY, "new");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      sessionStorage.removeItem(AUTH_WELCOME_STORAGE_KEY);
      setLoading(false);
      setError("Account created but sign-in failed. Please log in manually.");
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

  const passwordValid = isValidPassword(password);

  return (
    <FadeIn>
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
                <Label htmlFor="password">Create a strong password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
                  aria-describedby="password-requirements"
                />
                <div
                  id="password-requirements"
                  className="rounded-lg border border-border/60 bg-muted/30 p-3"
                >
                  <p className="text-xs font-medium mb-2">Your password must include:</p>
                  <PasswordRequirements password={password} />
                </div>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4 space-y-1">
                <p className="text-sm font-medium">Body metrics</p>
                <p className="text-xs text-muted-foreground">
                  Optional — improves heart rate zone accuracy. You can add or
                  change these anytime from your profile.
                </p>
                <div className="pt-3">
                  <BodyMetricsFields
                    idPrefix="signup"
                    values={bodyMetrics}
                    onChange={setBodyMetrics}
                    optional
                  />
                </div>
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
                disabled={
                  loading ||
                  !passwordValid ||
                  (captchaRequired && !turnstileToken)
                }
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
  );
}
