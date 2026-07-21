"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";
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
  updatedAt?: string;
  mine?: boolean;
  edited?: boolean;
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

function commentItemPath(
  targetType: "blog" | "tip",
  slug: string,
  id: string
): string {
  return `${commentsApiPath(targetType, slug)}/${id}`;
}

export function BlogComments({
  postSlug,
  targetType = "blog",
  initialCount = 0,
}: BlogCommentsProps) {
  const { data: session, status: sessionStatus } = useSession();
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editError, setEditError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const captchaRequired = isTurnstileEnabled();
  const apiPath = commentsApiPath(targetType, postSlug);

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(apiPath, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setComments(data.comments ?? []);
      setCommentCount(data.comments?.length ?? 0);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    if (sessionStatus === "loading") return;
    setLoading(true);
    void loadComments();
  }, [loadComments, sessionStatus]);

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

  function startEdit(comment: Comment) {
    setEditingId(comment.id);
    setEditContent(comment.content);
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditContent("");
    setEditError("");
  }

  async function saveEdit(commentId: string) {
    setEditError("");
    setSavingId(commentId);

    const res = await fetch(commentItemPath(targetType, postSlug, commentId), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });

    const data = await res.json().catch(() => ({}));
    setSavingId(null);

    if (!res.ok) {
      setEditError(data.error || "Failed to update comment");
      return;
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? (data.comment as Comment) : comment
      )
    );
    cancelEdit();
  }

  async function handleDelete(commentId: string) {
    if (
      !window.confirm(
        "Delete this comment? This can’t be undone."
      )
    ) {
      return;
    }

    setDeletingId(commentId);
    setEditError("");

    const res = await fetch(commentItemPath(targetType, postSlug, commentId), {
      method: "DELETE",
    });

    const data = await res.json().catch(() => ({}));
    setDeletingId(null);

    if (!res.ok) {
      setEditError(data.error || "Failed to delete comment");
      return;
    }

    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    setCommentCount((count) => Math.max(0, count - 1));
    if (editingId === commentId) cancelEdit();
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
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
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
                {comment.edited && (
                  <span className="text-xs text-muted-foreground">(edited)</span>
                )}
                {comment.mine && editingId !== comment.id && (
                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 px-2 text-muted-foreground"
                      onClick={() => startEdit(comment)}
                      disabled={deletingId === comment.id}
                    >
                      <Pencil className="size-3.5" aria-hidden />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-destructive"
                      onClick={() => void handleDelete(comment.id)}
                      disabled={deletingId === comment.id}
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                      {deletingId === comment.id ? "Deleting…" : "Delete"}
                    </Button>
                  </div>
                )}
              </div>

              {editingId === comment.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={2000}
                    rows={4}
                    aria-label="Edit comment"
                    className="flex min-h-[100px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  />
                  {editError && (
                    <p className="text-sm text-destructive" role="alert">
                      {editError}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => void saveEdit(comment.id)}
                      disabled={savingId === comment.id || editContent.trim().length < 3}
                    >
                      {savingId === comment.id ? "Saving…" : "Save"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={cancelEdit}
                      disabled={savingId === comment.id}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                  {comment.content}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {editError && !editingId && (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {editError}
        </p>
      )}
    </section>
  );
}
