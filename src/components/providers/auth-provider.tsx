"use client";

import { SessionProvider } from "next-auth/react";
import { SessionIdleGuard } from "@/components/auth/session-idle-guard";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <SessionIdleGuard />
    </SessionProvider>
  );
}
