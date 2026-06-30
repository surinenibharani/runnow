"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { SiteSearch } from "@/components/search/site-search";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useProfileModal } from "@/components/profile/profile-modal";
import {
  flattenNavGroups,
  isNavLinkActive,
  mainNavGroups,
  type NavLink,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavItem({
  link,
  pathname,
  onNavigate,
  className,
}: {
  link: NavLink;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const active = isNavLinkActive(pathname, link.href, link.matchPrefix);

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors lg:px-3",
        link.comingSoon && "text-muted-foreground/55 hover:text-muted-foreground/70",
        !link.comingSoon &&
          (active
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"),
        className
      )}
    >
      {active && !link.comingSoon && (
        <span
          className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-primary"
          aria-hidden
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {link.label}
        {link.comingSoon && (
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Soon
          </span>
        )}
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { data: session } = useSession();
  const { openProfile } = useProfileModal();

  const isAuthenticated = Boolean(session?.user);
  const mobileLinks = flattenNavGroups(mainNavGroups, { isAuthenticated });

  const displayName =
    session?.user?.name?.split(" ")[0] || session?.user?.email?.split("@")[0];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: MouseEvent) {
      const target = event.target;
      if (
        target instanceof Node &&
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:gap-5">
        <Logo className="mr-1 shrink-0 sm:mr-2" />

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex xl:gap-3"
          aria-label="Main"
        >
          {mainNavGroups.map((group, groupIndex) => {
            const links = group.links.filter(
              (link) => !link.authRequired || isAuthenticated
            );
            if (links.length === 0) return null;

            return (
              <Fragment key={group.ariaLabel ?? `nav-group-${groupIndex}`}>
                {groupIndex > 0 && (
                  <span
                    className="mx-1 hidden h-4 w-px shrink-0 bg-border lg:block xl:mx-1.5"
                    aria-hidden
                  />
                )}
                <div
                  className="flex items-center gap-0.5 xl:gap-1"
                  role={group.ariaLabel ? "group" : undefined}
                  aria-label={group.ariaLabel}
                >
                  {links.map((link) => (
                    <NavItem key={link.href} link={link} pathname={pathname} />
                  ))}
                </div>
              </Fragment>
            );
          })}
        </nav>

        <SiteSearch
          className="min-w-0 flex-1 sm:mx-2 md:max-w-xs lg:mx-3 lg:w-44 lg:flex-none lg:shrink-0 lg:max-w-none xl:w-52"
          inputClassName="bg-background/80"
        />

        <div className="hidden shrink-0 items-center gap-2 lg:ml-1 lg:flex xl:gap-2.5">
          <StartPlanCta variant="button" />
          {session ? (
            <>
              {displayName && (
                <span className="max-w-[8rem] truncate text-sm text-muted-foreground">
                  {displayName}
                </span>
              )}
              <Button variant="outline" size="sm" onClick={openProfile}>
                <User className="size-4" />
                Profile
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
              <Button
                nativeButton={false}
                render={<Link href="/login" />}
                variant="outline"
                size="sm"
              >
                Log in
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/signup" />}
                size="sm"
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="ml-1 shrink-0 rounded-lg p-2 hover:bg-muted lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-border animate-in fade-in slide-in-from-top-1 duration-200 lg:hidden"
        >
          <div className="flex flex-col gap-1 p-4">
            <div className="mb-2 px-1">
              <StartPlanCta variant="button" className="w-full justify-center" />
            </div>
            {mobileLinks.map((link) => {
              const active = isNavLinkActive(
                pathname,
                link.href,
                link.matchPrefix
              );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    active
                      ? "bg-primary/10 text-foreground ring-1 ring-primary/20"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {session ? (
              <>
                {displayName && (
                  <p className="px-4 py-2 text-sm font-medium text-foreground">
                    {displayName}
                  </p>
                )}
                <Button
                  variant="outline"
                  className="mx-4 justify-start"
                  onClick={() => {
                    setOpen(false);
                    openProfile();
                  }}
                >
                  <User className="size-4" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="mt-2 justify-start"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  nativeButton={false}
                  render={<Link href="/login" />}
                  variant="outline"
                  className="mt-2"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/signup" />}
                  className="mt-2"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
