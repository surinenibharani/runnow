"use client";

import { useCallback, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentLikeTargetType } from "@/lib/engagement/content-likes";

type ContentLikeButtonProps = {
  targetType: ContentLikeTargetType;
  targetSlug: string;
  initialCount?: number;
  initialLiked?: boolean;
  className?: string;
  compact?: boolean;
};

export function ContentLikeButton({
  targetType,
  targetSlug,
  initialCount = 0,
  initialLiked = false,
  className,
  compact = false,
}: ContentLikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onToggle = useCallback(() => {
    setError(null);

    const prevCount = count;
    const prevLiked = liked;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => Math.max(0, c + (nextLiked ? 1 : -1)));

    startTransition(async () => {
      try {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: targetType, slug: targetSlug }),
        });

        if (!res.ok) {
          setLiked(prevLiked);
          setCount(prevCount);
          const data = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          setError(data?.error ?? "Could not update like");
          return;
        }

        const data = (await res.json()) as { count: number; liked: boolean };
        setCount(data.count);
        setLiked(data.liked);
      } catch {
        setLiked(prevLiked);
        setCount(prevCount);
        setError("Could not update like");
      }
    });
  }, [count, liked, startTransition, targetSlug, targetType]);

  const label =
    count === 0 ? "Like" : `${count} like${count === 1 ? "" : "s"}`;

  return (
    <div className={cn("space-y-1.5", className)}>
      <button
        type="button"
        onClick={onToggle}
        disabled={pending}
        aria-pressed={liked}
        aria-label={liked ? "Unlike" : "Like"}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
          compact && "px-2.5 py-1.5 text-xs",
          liked
            ? "border-rose-500/40 bg-rose-500/10 text-rose-700 hover:bg-rose-500/15 dark:text-rose-300"
            : "border-border/60 hover:bg-muted/50",
          pending && "opacity-70"
        )}
      >
        <Heart
          className={cn("size-4", liked && "fill-current")}
          aria-hidden
        />
        {label}
      </button>
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
