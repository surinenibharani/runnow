"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { PostShareButtons } from "@/components/blog/post-share-buttons";
import { Button } from "@/components/ui/button";
import {
  buildProgressShareMessage,
  buildProgressShareUrl,
  type ProgressShareInput,
} from "@/lib/progress-share";

type ProgressShareProps = {
  input: ProgressShareInput;
};

export function ProgressShare({ input }: ProgressShareProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const url = buildProgressShareUrl(input);
  const message = buildProgressShareMessage(input);
  const headline =
    input.percentComplete >= 100
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
      className="rounded-xl border border-border/60 bg-muted/20 p-4 sm:p-5"
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
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canNativeShare && (
            <Button type="button" size="sm" variant="outline" onClick={onNativeShare}>
              <Share2 className="size-4" aria-hidden />
              Share
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
        className="mt-4 pt-4 border-t border-border/60"
      />
    </section>
  );
}
