"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_VIDEO_SRC = "/hero/hero.mp4";
const PAUSE_AT_SECONDS = 6;

type HeroVideoProps = {
  className?: string;
};

type PlayPhase = "idle" | "first" | "second" | "paused";

/** Background hero video — plays 0→6s twice, then pauses with a replay control. */
export function HeroVideo({ className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const phaseRef = useRef<PlayPhase>("idle");
  const startSessionRef = useRef<(() => void) | null>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let unwatch: (() => void) | null = null;

    const clearWatcher = () => {
      unwatch?.();
      unwatch = null;
    };

    const getHoldTime = () =>
      Number.isFinite(video.duration)
        ? Math.min(PAUSE_AT_SECONDS, video.duration)
        : PAUSE_AT_SECONDS;

    const pauseAtHold = () => {
      clearWatcher();
      video.pause();
      video.currentTime = getHoldTime();
      phaseRef.current = "paused";
      setShowPlayButton(true);
    };

    const watchUntilHold = (onHold: () => void) => {
      clearWatcher();

      let active = true;

      const hitHold = () => {
        if (!active) return;
        if (video.currentTime >= PAUSE_AT_SECONDS - 0.05) {
          active = false;
          video.pause();
          video.currentTime = getHoldTime();
          clearWatcher();
          onHold();
        }
      };

      const onTimeUpdate = () => hitHold();
      video.addEventListener("timeupdate", onTimeUpdate);

      let rafId = 0;
      const poll = () => {
        hitHold();
        if (active) rafId = requestAnimationFrame(poll);
      };
      rafId = requestAnimationFrame(poll);

      unwatch = () => {
        active = false;
        video.removeEventListener("timeupdate", onTimeUpdate);
        cancelAnimationFrame(rafId);
      };
    };

    const playSegment = (segment: "first" | "second") => {
      phaseRef.current = segment;
      setShowPlayButton(false);
      clearWatcher();
      video.currentTime = 0;

      const onPlaying = () => {
        video.removeEventListener("playing", onPlaying);
        if (phaseRef.current !== segment) return;

        watchUntilHold(() => {
          if (segment === "first") {
            playSegment("second");
            return;
          }
          phaseRef.current = "paused";
          setShowPlayButton(true);
        });
      };

      video.addEventListener("playing", onPlaying);
      void video.play().catch(() => {
        video.removeEventListener("playing", onPlaying);
        if (segment === "second") {
          pauseAtHold();
        } else {
          setShowPlayButton(true);
        }
      });
    };

    const startSession = () => playSegment("first");
    startSessionRef.current = startSession;

    const applyReducedMotion = () => {
      clearWatcher();
      phaseRef.current = "paused";
      video.pause();
      if (video.readyState >= 1) {
        video.currentTime = getHoldTime();
      }
      setShowPlayButton(true);
    };

    const onLoadedMetadata = () => {
      if (phaseRef.current === "paused") {
        video.currentTime = getHoldTime();
      }
    };

    const onEnded = () => {
      if (phaseRef.current === "first") {
        playSegment("second");
        return;
      }
      if (phaseRef.current === "second") {
        pauseAtHold();
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) applyReducedMotion();
    };
    mq.addEventListener("change", onReducedMotionChange);

    if (mq.matches) {
      if (video.readyState >= 1) {
        applyReducedMotion();
      } else {
        video.addEventListener("loadedmetadata", applyReducedMotion, {
          once: true,
        });
      }
    } else if (video.readyState >= 1) {
      startSession();
    } else {
      video.addEventListener("loadedmetadata", startSession, { once: true });
    }

    return () => {
      clearWatcher();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
      mq.removeEventListener("change", onReducedMotionChange);
      startSessionRef.current = null;
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 h-[min(58vw,24rem)] sm:h-[min(48vw,26rem)] lg:h-[min(40vw,28rem)]",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden",
          "[mask-image:radial-gradient(ellipse_98%_100%_at_50%_44%,black_50%,transparent_92%)]"
        )}
      >
        <video
          ref={videoRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          src={HERO_VIDEO_SRC}
          muted
          playsInline
          preload="auto"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-orange-400/[0.07] to-transparent dark:from-primary/12 dark:via-orange-400/[0.08]"
        />

        {showPlayButton ? (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Play hero video"
            onClick={() => startSessionRef.current?.()}
            className="absolute right-3 top-3 z-10 size-10 rounded-full border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background/90 sm:right-4 sm:top-4 sm:size-11"
          >
            <Play className="size-4 fill-current sm:size-[1.125rem]" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
