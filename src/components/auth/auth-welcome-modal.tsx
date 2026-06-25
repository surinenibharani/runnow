"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AUTH_WELCOME_STORAGE_KEY,
  NEW_RUNNER_WELCOME,
  pickRandomLoginMessage,
  type AuthWelcomeMessage,
} from "@/lib/auth-messages";

function readWelcomeMessage(): AuthWelcomeMessage | null {
  const kind = sessionStorage.getItem(AUTH_WELCOME_STORAGE_KEY);
  if (!kind) return null;

  if (kind === "new") return NEW_RUNNER_WELCOME;
  if (kind === "login") return pickRandomLoginMessage();
  return null;
}

export function AuthWelcomeModal() {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<AuthWelcomeMessage | null>(null);
  const shownRef = useRef(false);

  useLayoutEffect(() => {
    if (status !== "authenticated" || shownRef.current) return;

    const welcome = readWelcomeMessage();
    if (!welcome) return;

    shownRef.current = true;
    setMessage(welcome);
    setOpen(true);
  }, [status]);

  function dismiss() {
    sessionStorage.removeItem(AUTH_WELCOME_STORAGE_KEY);
    setOpen(false);
  }

  if (status !== "authenticated" || !open || !message) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={dismiss}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-welcome-title"
        aria-describedby="auth-welcome-description"
        className="w-full max-w-md border-primary/20 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Footprints className="size-6" />
          </div>
          <CardTitle id="auth-welcome-title" className="text-xl">
            {message.title}
          </CardTitle>
          <CardDescription
            id="auth-welcome-description"
            className="text-sm leading-relaxed"
          >
            {message.body}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" className="w-full" onClick={dismiss}>
            Lace up — let&apos;s go
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
