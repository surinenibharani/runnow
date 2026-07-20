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
        "relative shrink-0 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium transition-colors",
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
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
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

    const previouslyFocused = document.activeElement;
    const panel = mobileNavRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = [
        ...panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ),
      ].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
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
      if (
        previouslyFocused instanceof HTMLElement &&
        document.contains(previouslyFocused)
      ) {
        previouslyFocused.focus();
      } else {
        menuToggleRef.current?.focus();
      }
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full max-w-full overflow-x-clip border-b border-border/60 bg-background/80 backdrop-blur-lg"
    >
      <div className="mx-auto flex h-16 w-full min-w-0 max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Logo className="shrink-0 [&_img]:h-11 sm:[&_img]:h-12" />

        {/*
          Full desktop nav only from 2xl (~1536px) so the header fits max-w-6xl
          without forcing horizontal page scroll. Below that, use the menu.
        */}
        <nav
          className="hidden min-w-0 items-center gap-1 2xl:ml-4 2xl:flex"
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
                    className="mx-1 hidden h-4 w-px shrink-0 bg-border 2xl:block"
                    aria-hidden
                  />
                )}
                <div
                  className="flex min-w-0 items-center gap-0"
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

        <div className="hidden min-w-2 flex-1 2xl:block" aria-hidden />

        <SiteSearch
          className="min-w-0 flex-1 sm:max-w-xs 2xl:mx-2 2xl:w-44 2xl:flex-none 2xl:shrink-0 2xl:max-w-none"
          inputClassName="bg-background/80"
        />

        <div className="hidden shrink-0 items-center gap-2 2xl:ml-1 2xl:flex">
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
          ref={menuToggleRef}
          type="button"
          className="ml-1 shrink-0 rounded-lg p-2 hover:bg-muted 2xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-haspopup="dialog"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="border-t border-border animate-in fade-in slide-in-from-top-1 duration-200 2xl:hidden"
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
