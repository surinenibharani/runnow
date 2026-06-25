"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const IDLE_MS = 12 * 60 * 1000;
const PROMPT_MS = 3 * 60 * 1000;

const ACTIVITY_EVENTS = [
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
] as const;

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function SessionIdleGuard() {
  const { status } = useSession();
  const [showPrompt, setShowPrompt] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(PROMPT_MS / 1000);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const promptOpenRef = useRef(false);

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const clearPromptTimers = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearIdleTimer();
    clearPromptTimers();
    promptOpenRef.current = false;
    setShowPrompt(false);
    void signOut({ callbackUrl: "/" });
  }, [clearIdleTimer, clearPromptTimers]);

  const openPrompt = useCallback(() => {
    promptOpenRef.current = true;
    setShowPrompt(true);
    setSecondsLeft(PROMPT_MS / 1000);
    clearPromptTimers();

    countdownRef.current = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, PROMPT_MS);
  }, [clearPromptTimers, logout]);

  const scheduleIdleTimer = useCallback(() => {
    clearIdleTimer();
    idleTimerRef.current = setTimeout(openPrompt, IDLE_MS);
  }, [clearIdleTimer, openPrompt]);

  const stayLoggedIn = useCallback(() => {
    promptOpenRef.current = false;
    setShowPrompt(false);
    clearPromptTimers();
    scheduleIdleTimer();
  }, [clearPromptTimers, scheduleIdleTimer]);

  useEffect(() => {
    if (status !== "authenticated") {
      clearIdleTimer();
      clearPromptTimers();
      promptOpenRef.current = false;
      setShowPrompt(false);
      return;
    }

    scheduleIdleTimer();

    const onActivity = () => {
      if (promptOpenRef.current) return;
      scheduleIdleTimer();
    };

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity, { passive: true });
    }

    return () => {
      clearIdleTimer();
      clearPromptTimers();
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
    };
  }, [status, scheduleIdleTimer, clearIdleTimer, clearPromptTimers]);

  if (status !== "authenticated" || !showPrompt) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <Card
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="session-idle-title"
        aria-describedby="session-idle-description"
        className="w-full max-w-md border-border/60 shadow-lg"
      >
        <CardHeader>
          <CardTitle id="session-idle-title">
            Taking a walk break?
          </CardTitle>
          <CardDescription id="session-idle-description">
            You have been still longer than a water stop. Want to lace back in and
            stay logged in, or call it a day?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Logging out automatically in{" "}
            <span className="font-medium text-foreground">
              {formatCountdown(secondsLeft)}
            </span>{" "}
            unless you respond.
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={logout}>
              No, log out
            </Button>
            <Button type="button" onClick={stayLoggedIn}>
              Yes, stay logged in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
