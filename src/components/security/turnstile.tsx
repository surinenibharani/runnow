"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileWidgetProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  onLoadError?: () => void;
  className?: string;
};

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function waitForTurnstile(timeoutMs = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const started = Date.now();
    const tick = () => {
      if (window.turnstile) {
        resolve();
        return;
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error("Turnstile timed out"));
        return;
      }
      window.requestAnimationFrame(tick);
    };
    tick();
  });
}

function loadTurnstileScript(): Promise<void> {
  if (document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) {
    return waitForTurnstile();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      waitForTurnstile().then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(script);
  });
}

export function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
  onLoadError,
  className,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  const onLoadErrorRef = useRef(onLoadError);

  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;
  onErrorRef.current = onError;
  onLoadErrorRef.current = onLoadError;

  const handleScriptLoadFailure = useCallback(() => {
    setLoadError(true);
    setReady(false);
    onLoadErrorRef.current?.();
  }, []);

  useEffect(() => {
    if (!SITE_KEY || !isTurnstileEnabled()) return;

    let cancelled = false;

    async function boot() {
      try {
        await loadTurnstileScript();
        if (!cancelled) {
          setLoadError(false);
          setWidgetError(false);
          setReady(true);
        }
      } catch {
        if (!cancelled) handleScriptLoadFailure();
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [loadAttempt, handleScriptLoadFailure]);

  useEffect(() => {
    if (!SITE_KEY || !ready || !containerRef.current || !window.turnstile) return;

    const container = containerRef.current;

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: SITE_KEY,
      callback: (token) => {
        setWidgetError(false);
        onVerifyRef.current(token);
      },
      "expired-callback": () => onExpireRef.current?.(),
      "error-callback": () => {
        setWidgetError(true);
        onErrorRef.current?.();
      },
      theme: "auto",
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Widget may already be gone during fast remounts
        }
        widgetIdRef.current = null;
      }
    };
  }, [ready, loadAttempt]);

  if (!SITE_KEY || !isTurnstileEnabled()) {
    return null;
  }

  if (loadError) {
    return (
      <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
        <p className="text-sm text-destructive">
          Captcha failed to load. Disable ad blockers for this site, check your
          connection, then try again.
        </p>
        <p className="text-xs text-muted-foreground">
          For production, add this site&apos;s domain (e.g.{" "}
          {typeof window !== "undefined" ? window.location.hostname : "yourdomain.com"}
          ) under Hostname in your{" "}
          <a
            href="https://dash.cloudflare.com/?to=/:account/turnstile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Cloudflare Turnstile
          </a>{" "}
          widget settings.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setLoadError(false);
            setWidgetError(false);
            setLoadAttempt((attempt) => attempt + 1);
          }}
        >
          Retry captcha
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div ref={containerRef} className="min-h-[65px]" />
      {widgetError && (
        <p className="text-xs text-destructive">
          Captcha challenge failed. Retry or check that this domain is allowed in
          Cloudflare Turnstile.
        </p>
      )}
    </div>
  );
}

export function isTurnstileEnabled(): boolean {
  // Local dev: skip widget (verifyTurnstile also skips server-side in development)
  if (process.env.NODE_ENV === "development") {
    return false;
  }

  return (
    process.env.NEXT_PUBLIC_TURNSTILE_CONFIGURED === "true" &&
    Boolean(SITE_KEY)
  );
}
