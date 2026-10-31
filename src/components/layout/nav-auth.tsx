"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { useProfileModal } from "@/components/profile/profile-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavAuthProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavAuth({ variant, onNavigate }: NavAuthProps) {
  const { data: session, status } = useSession();
  const { openProfile } = useProfileModal();
  const isAuthenticated = status === "authenticated" && Boolean(session?.user);
  const displayName =
    session?.user?.name?.split(" ")[0] || session?.user?.email?.split("@")[0];

  if (variant === "desktop") {
    return (
      <div className="flex shrink-0 items-center gap-1.5 xl:gap-2">
        <StartPlanCta variant="button" />
        {isAuthenticated ? (
          <>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Dashboard
            </Link>
            {displayName ? (
              <span className="hidden max-w-[7rem] truncate text-sm text-muted-foreground xl:inline">
                {displayName}
              </span>
            ) : null}
            <Button variant="outline" size="sm" onClick={openProfile}>
              <User className="size-4" />
              <span className="hidden xl:inline">Profile</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="mt-2 flex flex-col gap-2">
        {displayName ? (
          <p className="px-4 py-2 text-sm font-medium text-foreground">
            {displayName}
          </p>
        ) : null}
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-start"
          )}
          onClick={onNavigate}
        >
          Dashboard
        </Link>
        <Button
          variant="outline"
          className="justify-start"
          onClick={() => {
            onNavigate?.();
            openProfile();
          }}
        >
          <User className="size-4" />
          Profile
        </Button>
        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Link
        href="/login"
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
        onClick={onNavigate}
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className={cn(buttonVariants(), "justify-start")}
        onClick={onNavigate}
      >
        Sign up
      </Link>
    </div>
  );
}
