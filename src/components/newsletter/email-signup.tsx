"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type EmailSignupProps = {
  className?: string;
  compact?: boolean;
};

export function EmailSignup({ className, compact = false }: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "You're subscribed!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not connect. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("rounded-xl border border-primary/20 bg-primary/5 p-4", className)}>
        <p className="text-sm font-medium text-foreground">{message}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Weekly tips and new blog posts — unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <Mail className="size-4 shrink-0 text-primary" aria-hidden />
        <p className="text-sm font-semibold">Get tips and new posts by email</p>
      </div>
      {!compact && (
        <p className="text-sm text-muted-foreground">
          A random beginner tip each week plus an email when we publish — no spam.
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className="h-9 flex-1"
          aria-label="Email address"
        />
        <Button type="submit" disabled={status === "loading"} className="shrink-0">
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          {message}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        By subscribing you agree to our{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        . No account required.
      </p>
    </form>
  );
}
