"use client";

import { SessionProvider } from "next-auth/react";
import { SessionIdleGuard } from "@/components/auth/session-idle-guard";
import { AuthWelcomeModal } from "@/components/auth/auth-welcome-modal";
import { ProfileModalProvider } from "@/components/profile/profile-modal";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
      <ProfileModalProvider>
        {children}
        <AuthWelcomeModal />
        <SessionIdleGuard />
      </ProfileModalProvider>
    </SessionProvider>
  );
}
