"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { PostShareButtons } from "@/components/blog/post-share-buttons";
import { EmailSignup } from "@/components/newsletter/email-signup";
import { Button } from "@/components/ui/button";
import {
  buildProgressShareMessage,
  buildProgressShareUrl,
  type ProgressShareInput,
} from "@/lib/progress-share";
import {
  milestoneHeadline,
  type MilestoneHighlight,
} from "@/lib/milestones";
import { cn } from "@/lib/utils";

type ProgressShareProps = {
  input: ProgressShareInput;
  highlight?: MilestoneHighlight | null;
  sectionRef?: React.RefObject<HTMLElement | null>;
};

export function ProgressShare({
  input,
  highlight = null,
  sectionRef,
}: ProgressShareProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const url = buildProgressShareUrl(input);
  const message = buildProgressShareMessage(input);
  const headline = highlight
    ? milestoneHeadline(highlight)
    : input.percentComplete >= 100
      ? "Plan complete — share your finish!"
      : `Finished Week ${input.week}? Share your progress`;

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable
    }
  }, [message]);

  const onNativeShare = useCallback(async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: headline,
        text: message.split("\n")[0],
        url,
      });
    } catch {
      // user cancelled or share unavailable
    }
  }, [headline, message, url]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "rounded-xl border bg-muted/20 p-4 sm:p-5 transition-shadow",
        highlight
          ? "border-primary/40 ring-2 ring-primary/20 shadow-md"
          : "border-border/60"
      )}
      aria-labelledby="progress-share-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="progress-share-heading" className="font-medium">
            {headline}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {input.percentComplete}% complete · {input.completedCount}/
            {input.totalWorkouts} activities
            {input.streak > 0 && ` · ${input.streak}-day streak`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canNativeShare && (
            <Button type="button" size="sm" variant="default" onClick={onNativeShare}>
              <Share2 className="size-4" aria-hidden />
              Share milestone
            </Button>
          )}
          <Button type="button" size="sm" variant="outline" onClick={onCopy}>
            {copied ? (
              <>
                <Check className="size-4" aria-hidden />
                Copied
              </>
            ) : (
              <>
                <Link2 className="size-4" aria-hidden />
                Copy link
              </>
            )}
          </Button>
        </div>
      </div>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {copied ? "Progress link copied to clipboard" : ""}
      </div>
      <PostShareButtons
        title={message.split("\n")[0]}
        url={url}
        shareLabel="Share your milestone"
        className="mt-4 pt-4 border-t border-border/60"
      />
      {highlight && (
        <div className="mt-4 border-t border-border/60 pt-4">
          <EmailSignup compact />
        </div>
      )}
    </section>
  );
}
