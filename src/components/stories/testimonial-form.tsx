"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TurnstileWidget,
  isTurnstileEnabled,
} from "@/components/security/turnstile";

export function TestimonialForm() {
  const [authorName, setAuthorName] = useState("");
  const [quote, setQuote] = useState("");
  const [story, setStory] = useState("");
  const [detail, setDetail] = useState("");
  const [milestone, setMilestone] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [captchaUnavailable, setCaptchaUnavailable] = useState(false);

  const captchaRequired = isTurnstileEnabled();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (captchaRequired && !turnstileToken) {
      setError("Please complete the captcha");
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorName,
        quote,
        story: story.trim() || undefined,
        detail: detail.trim() || undefined,
        milestone: milestone.trim() || undefined,
        turnstileToken,
        website: honeypot,
      }),
    });

    const data = await res.json().catch(() => ({}));
    setSubmitting(false);

    if (!res.ok) {
      setError(
        typeof data.error === "string" ? data.error : "Failed to submit story"
      );
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div
        className="rounded-xl border border-border/60 bg-muted/20 p-6 sm:p-8 text-center"
        role="status"
      >
        <h2 className="text-xl font-semibold">Thanks for sharing</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Your story is live on Success Stories. It helps the next beginner lace
          up.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/stories" />}
          className="mt-5"
        >
          See success stories
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-7"
      aria-label="Share your success story"
    >
      <div className="space-y-2">
        <Label htmlFor="testimonial-name">Your name</Label>
        <Input
          id="testimonial-name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          maxLength={60}
          required
          autoComplete="name"
          placeholder="First name is fine"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="testimonial-quote">Short quote</Label>
        <textarea
          id="testimonial-quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          maxLength={280}
          required
          rows={3}
          className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-y min-h-[80px]"
          placeholder="One or two sentences — what changed for you?"
        />
        <p className="text-xs text-muted-foreground">{quote.length}/280</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testimonial-story">
          Longer story <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <textarea
          id="testimonial-story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          maxLength={2000}
          rows={5}
          className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-y min-h-[120px]"
          placeholder="How you started, what helped, and where you are now…"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="testimonial-detail">
            About you <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="testimonial-detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            maxLength={120}
            placeholder="e.g. Age 40 · couch to 5K"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testimonial-milestone">
            Milestone <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="testimonial-milestone"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            maxLength={120}
            placeholder="e.g. Finished week 8"
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

      {isTurnstileEnabled() && (
        <TurnstileWidget
          onVerify={setTurnstileToken}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
          onLoadError={() => setCaptchaUnavailable(true)}
        />
      )}
      {captchaUnavailable && (
        <p className="text-sm text-muted-foreground">
          Captcha failed to load. Use Retry captcha above or try again later.
        </p>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={
          submitting ||
          (captchaRequired && !turnstileToken) ||
          captchaUnavailable
        }
      >
        {submitting ? "Submitting…" : "Publish my story"}
      </Button>
      <p className="text-xs text-muted-foreground">
        No account needed. By submitting, you allow us to show your story on
        LetsRunNow.
      </p>
    </form>
  );
}
