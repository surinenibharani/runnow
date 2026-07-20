"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  TurnstileWidget,
  isTurnstileEnabled,
} from "@/components/security/turnstile";

type Comment = {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
};

type BlogCommentsProps = {
  /** Content slug (blog post or tip). */
  postSlug: string;
  targetType?: "blog" | "tip";
  initialCount?: number;
};

function commentsApiPath(targetType: "blog" | "tip", slug: string): string {
  return targetType === "tip"
    ? `/api/tips/${slug}/comments`
    : `/api/blog/${slug}/comments`;
}

export function BlogComments({
  postSlug,
  targetType = "blog",
  initialCount = 0,
}: BlogCommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(initialCount);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [captchaUnavailable, setCaptchaUnavailable] = useState(false);

  const captchaRequired = isTurnstileEnabled();
  const apiPath = commentsApiPath(targetType, postSlug);

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(apiPath);
      if (!res.ok) return;
      const data = await res.json();
      setComments(data.comments ?? []);
      setCommentCount(data.comments?.length ?? 0);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    if (session?.user?.name) {
      setAuthorName(session.user.name);
    }
  }, [session?.user?.name]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (captchaRequired && !turnstileToken) {
      setError("Please complete the captcha");
      return;
    }

    setSubmitting(true);

    const res = await fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorName,
        content,
        turnstileToken,
        website: honeypot,
      }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Failed to post comment");
      return;
    }

    setComments((prev) => [data.comment, ...prev]);
    setCommentCount((count) => count + 1);
    setContent("");
    setTurnstileToken(null);
  }

  return (
    <section
      id="comments"
      className="mt-12 scroll-mt-24"
      aria-labelledby={`comments-heading-${postSlug}`}
    >
      <Separator className="mb-8" />
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="size-5 text-primary" aria-hidden />
        <h2 id={`comments-heading-${postSlug}`} className="text-xl font-bold">
          Comments
        </h2>
        <span className="text-sm text-muted-foreground">({commentCount})</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5"
        aria-label="Post a comment"
      >
        {!session?.user && (
          <div className="space-y-2">
            <Label htmlFor={`comment-name-${postSlug}`}>Name</Label>
            <Input
              id={`comment-name-${postSlug}`}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={60}
              required
              autoComplete="name"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor={`comment-body-${postSlug}`}>Your comment</Label>
          <textarea
            id={`comment-body-${postSlug}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
            required
            rows={4}
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-y min-h-[100px]"
            placeholder="Share your experience or ask a question…"
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
          {submitting ? "Posting…" : "Post comment"}
        </Button>
      </form>

      {loading ? (
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          Loading comments…
        </p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <ul className="space-y-4" aria-label="Comments">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-xl border border-border/60 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span className="font-medium text-sm">{comment.authorName}</span>
                <time
                  dateTime={comment.createdAt}
                  className="text-xs text-muted-foreground"
                >
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
