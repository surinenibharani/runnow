"use client";

import { SessionProvider } from "next-auth/react";
import { SessionIdleGuard } from "@/components/auth/session-idle-guard";
import { AuthWelcomeModal } from "@/components/auth/auth-welcome-modal";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <AuthWelcomeModal />
      <SessionIdleGuard />
    </SessionProvider>
  );
}
