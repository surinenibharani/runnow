"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_VIDEO_SRC = "/hero/hero.mp4";
const HOLD_AT = 1;
const HOLD_PLAY = 2;

type HeroVideoProps = {
  className?: string;
};

/** Hero video — one full play, then a second play that holds at 1s. */
export function HeroVideo({ className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playIndexRef = useRef(0);
  const phaseRef = useRef<"idle" | "playing" | "paused">("idle");
  const rafRef = useRef(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAutoStartedRef = useRef(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const clearHoldWatch = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (holdTimerRef.current !== null) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const getHoldTime = useCallback((video: HTMLVideoElement) => {
    return Number.isFinite(video.duration)
      ? Math.min(HOLD_AT, video.duration)
      : HOLD_AT;
  }, []);

  const pauseAtHold = useCallback(
    (video: HTMLVideoElement) => {
      clearHoldWatch();
      phaseRef.current = "paused";
      video.pause();
      video.currentTime = getHoldTime(video);
      setShowPlayButton(true);
    },
    [clearHoldWatch, getHoldTime]
  );

  const startHoldWatch = useCallback(
    (video: HTMLVideoElement, playNumber: number) => {
      clearHoldWatch();
      const startedAt = performance.now();

      const tick = () => {
        if (phaseRef.current !== "playing" || playIndexRef.current !== playNumber) {
          return;
        }

        const byClock = performance.now() - startedAt >= HOLD_AT * 1000;
        const byVideo = video.currentTime >= HOLD_AT - 0.04;

        if (byClock || byVideo) {
          pauseAtHold(video);
          return;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
      holdTimerRef.current = setTimeout(() => {
        if (phaseRef.current === "playing" && playIndexRef.current === playNumber) {
          pauseAtHold(video);
        }
      }, HOLD_AT * 1000 + 40);
    },
    [clearHoldWatch, pauseAtHold]
  );

  const beginPlay = useCallback(
    (index: number) => {
      const video = videoRef.current;
      if (!video) return;

      playIndexRef.current = index;
      phaseRef.current = "playing";
      setShowPlayButton(false);
      clearHoldWatch();

      const onPlaying = () => {
        video.removeEventListener("playing", onPlaying);
        if (phaseRef.current !== "playing" || playIndexRef.current !== index) return;
        if (index === HOLD_PLAY) {
          startHoldWatch(video, index);
        }
      };

      video.addEventListener("playing", onPlaying);

      const begin = () => {
        void video.play().catch(() => {
          video.removeEventListener("playing", onPlaying);
          if (index === HOLD_PLAY) {
            pauseAtHold(video);
          } else {
            setShowPlayButton(true);
          }
        });
      };

      video.pause();
      if (video.currentTime <= 0.01) {
        begin();
        return;
      }

      video.addEventListener("seeked", begin, { once: true });
      video.currentTime = 0;
    },
    [clearHoldWatch, pauseAtHold, startHoldWatch]
  );

  const beginPlayRef = useRef(beginPlay);
  beginPlayRef.current = beginPlay;

  const startSession = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    playIndexRef.current = 1;
    phaseRef.current = "playing";
    setShowPlayButton(false);
    clearHoldWatch();

    video.pause();
    video.currentTime = 0;

    // play() must run in the click handler — waiting for `seeked` loses the gesture.
    void video.play().catch(() => {
      setShowPlayButton(true);
    });
  }, [clearHoldWatch]);

  const pauseAtHoldRef = useRef(pauseAtHold);
  pauseAtHoldRef.current = pauseAtHold;

  const startSessionRef = useRef(startSession);
  startSessionRef.current = startSession;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      if (phaseRef.current !== "playing") return;

      const index = playIndexRef.current;
      if (index < HOLD_PLAY) {
        beginPlayRef.current(index + 1);
        return;
      }

      pauseAtHoldRef.current(video);
    };

    const onTimeUpdate = () => {
      if (phaseRef.current !== "playing" || playIndexRef.current !== HOLD_PLAY) {
        return;
      }
      if (video.currentTime >= HOLD_AT - 0.04) {
        pauseAtHoldRef.current(video);
      }
    };

    const applyReducedMotion = () => {
      clearHoldWatch();
      phaseRef.current = "paused";
      video.pause();
      if (video.readyState >= 1) {
        video.currentTime = getHoldTime(video);
      }
      setShowPlayButton(true);
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) applyReducedMotion();
    };
    mq.addEventListener("change", onReducedMotionChange);

    if (mq.matches) {
      applyReducedMotion();
    } else if (!hasAutoStartedRef.current) {
      hasAutoStartedRef.current = true;
      const boot = () => startSessionRef.current();
      if (video.readyState >= 1) {
        boot();
      } else {
        video.addEventListener("loadedmetadata", boot, { once: true });
      }
    }

    return () => {
      clearHoldWatch();
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      mq.removeEventListener("change", onReducedMotionChange);
    };
  }, [clearHoldWatch, getHoldTime]);

  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(58vw,24rem)] sm:h-[min(48vw,26rem)] lg:h-[min(40vw,28rem)]",
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
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)] [backface-visibility:hidden]"
            src={HERO_VIDEO_SRC}
            muted
            playsInline
            preload="metadata"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-orange-400/[0.07] to-transparent dark:from-primary/12 dark:via-orange-400/[0.08]"
          />
        </div>
      </div>

      {showPlayButton ? (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label="Play hero video"
          onClick={startSession}
          className="pointer-events-auto absolute right-3 top-3 z-30 size-10 rounded-full border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background/90 sm:right-4 sm:top-4 sm:size-11"
        >
          <Play className="size-4 fill-current sm:size-[1.125rem]" />
        </Button>
      ) : null}
    </>
  );
}
