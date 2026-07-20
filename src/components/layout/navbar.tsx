"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { SiteSearch } from "@/components/search/site-search";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useProfileModal } from "@/components/profile/profile-modal";
import {
  getMoreNavLinks,
  getPrimaryNavLinks,
  isNavLinkActive,
  type NavLink,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Below this width, use hamburger for the whole nav (phone / small tablet). */
const FORCE_HAMBURGER_MAX = 767;
const NAV_GAP_PX = 2;
/** Always keep at least this many primary links in the bar before collapsing to hamburger. */
const MIN_VISIBLE_PRIMARY = 2;

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
        link.comingSoon &&
          "text-muted-foreground/55 hover:text-muted-foreground/70",
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

function MoreNavMenu({
  links,
  pathname,
}: {
  links: NavLink[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const moreActive = links.some((link) =>
    isNavLinkActive(pathname, link.href, link.matchPrefix)
  );

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
        rootRef.current &&
        !rootRef.current.contains(target)
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

  if (links.length === 0) return null;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        data-nav-more
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
          moreActive || open
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        More
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="More navigation"
          className="absolute left-0 top-full z-50 mt-1 min-w-[11rem] rounded-xl border border-border/70 bg-popover p-1.5 text-popover-foreground shadow-lg"
        >
          {links.map((link) => {
            const active = isNavLinkActive(
              pathname,
              link.href,
              link.matchPrefix
            );
            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  link.comingSoon && "text-muted-foreground/70"
                )}
              >
                <span>{link.label}</span>
                {link.comingSoon && (
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileNavLink({
  link,
  pathname,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isNavLinkActive(pathname, link.href, link.matchPrefix);

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium",
        active
          ? "bg-primary/10 text-foreground ring-1 ring-primary/20"
          : "text-muted-foreground"
      )}
    >
      <span>{link.label}</span>
      {link.comingSoon && (
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Soon
        </span>
      )}
    </Link>
  );
}

/**
 * Fits as many primary links as the nav slot allows. Always-more links plus
 * overflowed primaries go under More. When space is too tight, use hamburger.
 */
function useResponsiveNav(
  flexibleLinks: NavLink[],
  alwaysMoreLinks: NavLink[],
  slotRef: RefObject<HTMLDivElement | null>,
  measureRef: RefObject<HTMLDivElement | null>,
  barRef: RefObject<HTMLDivElement | null>
) {
  const [visibleCount, setVisibleCount] = useState(flexibleLinks.length);
  const [useHamburger, setUseHamburger] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth <= FORCE_HAMBURGER_MAX
      : true
  );

  useLayoutEffect(() => {
    const slot = slotRef.current;
    const measure = measureRef.current;
    const bar = barRef.current;
    if (!slot || !measure || !bar) return;

    function recompute() {
      if (typeof window === "undefined") return;

      if (window.innerWidth <= FORCE_HAMBURGER_MAX) {
        setUseHamburger(true);
        setVisibleCount(0);
        return;
      }

      // Prefer live slot width; when collapsed in hamburger mode, estimate
      // from the bar (logo + search + actions ≈ 420px on desktop).
      let available = slot!.clientWidth;
      if (available < 48) {
        available = Math.max(0, bar!.clientWidth - 420);
      }

      const itemEls = [
        ...measure!.querySelectorAll<HTMLElement>("[data-nav-measure-item]"),
      ];
      const moreEl = measure!.querySelector<HTMLElement>(
        "[data-nav-measure-more]"
      );
      const moreWidth = moreEl?.offsetWidth ?? 72;

      if (available < 120) {
        setUseHamburger(true);
        setVisibleCount(0);
        return;
      }

      let count = 0;
      let used = 0;

      for (let i = 0; i < flexibleLinks.length; i++) {
        const width = itemEls[i]?.offsetWidth ?? 0;
        const nextUsed = used + (count > 0 ? NAV_GAP_PX : 0) + width;
        const remainingFlexible = flexibleLinks.length - (i + 1);
        const needsMore =
          alwaysMoreLinks.length > 0 || remainingFlexible > 0;
        const total = nextUsed + (needsMore ? NAV_GAP_PX + moreWidth : 0);

        if (total <= available) {
          used = nextUsed;
          count = i + 1;
        } else {
          break;
        }
      }

      if (count === 0) {
        if (moreWidth + 8 <= available && alwaysMoreLinks.length > 0) {
          setUseHamburger(false);
          setVisibleCount(0);
          return;
        }
        setUseHamburger(true);
        setVisibleCount(0);
        return;
      }

      if (
        count < MIN_VISIBLE_PRIMARY &&
        flexibleLinks.length > MIN_VISIBLE_PRIMARY
      ) {
        setUseHamburger(true);
        setVisibleCount(0);
        return;
      }

      setUseHamburger(false);
      setVisibleCount(count);
    }

    recompute();

    const observer = new ResizeObserver(() => {
      recompute();
    });
    observer.observe(slot);
    observer.observe(measure);
    observer.observe(bar);
    window.addEventListener("resize", recompute);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [flexibleLinks, alwaysMoreLinks, slotRef, measureRef, barRef]);

  useEffect(() => {
    setVisibleCount(flexibleLinks.length);
  }, [flexibleLinks.length]);

  return { visibleCount, useHamburger };
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const navSlotRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { openProfile } = useProfileModal();

  const isAuthenticated = Boolean(session?.user);
  const primaryLinks = getPrimaryNavLinks({ isAuthenticated });
  const alwaysMoreLinks = getMoreNavLinks({ isAuthenticated });

  const { visibleCount, useHamburger } = useResponsiveNav(
    primaryLinks,
    alwaysMoreLinks,
    navSlotRef,
    measureRef,
    barRef
  );

  const visibleLinks = primaryLinks.slice(0, visibleCount);
  const overflowedPrimary = primaryLinks.slice(visibleCount);
  const moreMenuLinks = [...overflowedPrimary, ...alwaysMoreLinks];

  const displayName =
    session?.user?.name?.split(" ")[0] || session?.user?.email?.split("@")[0];

  useEffect(() => {
    if (!useHamburger) setMenuOpen(false);
  }, [useHamburger]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previouslyFocused = document.activeElement;
    const panel = mobileNavRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
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
        setMenuOpen(false);
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
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full max-w-full overflow-x-clip border-b border-border/60 bg-background/80 backdrop-blur-lg"
    >
      {/* Hidden measurer for link widths — keeps overflow math accurate */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 -z-50 flex items-center gap-0.5 opacity-0"
      >
        {primaryLinks.map((link) => (
          <span
            key={link.href}
            data-nav-measure-item
            className="whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium"
          >
            {link.label}
            {link.comingSoon ? " Soon" : ""}
          </span>
        ))}
        <span
          data-nav-measure-more
          className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium"
        >
          More
          <ChevronDown className="size-3.5" />
        </span>
      </div>

      <div
        ref={barRef}
        className="mx-auto flex h-16 w-full min-w-0 max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6"
      >
        <Logo className="shrink-0 [&_img]:h-11 sm:[&_img]:h-12" />

        <div
          ref={navSlotRef}
          className={cn(
            "min-w-0",
            useHamburger ? "w-0 flex-none overflow-hidden" : "flex-1"
          )}
        >
          {!useHamburger && (
            <nav
              className="flex min-w-0 items-center gap-0.5"
              aria-label="Main"
            >
              {visibleLinks.map((link) => (
                <NavItem key={link.href} link={link} pathname={pathname} />
              ))}
              <MoreNavMenu links={moreMenuLinks} pathname={pathname} />
            </nav>
          )}
        </div>

        <SiteSearch
          className={cn(
            "min-w-0 shrink",
            useHamburger
              ? "flex-1 sm:max-w-xs"
              : "w-28 sm:w-36 md:w-40 xl:w-48"
          )}
          inputClassName="bg-background/80"
        />

        {!useHamburger && (
          <div className="flex shrink-0 items-center gap-1.5 xl:gap-2">
            <StartPlanCta variant="button" />
            {session ? (
              <>
                {displayName && (
                  <span className="hidden max-w-[7rem] truncate text-sm text-muted-foreground xl:inline">
                    {displayName}
                  </span>
                )}
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
        )}

        {useHamburger && (
          <button
            ref={menuToggleRef}
            type="button"
            className="ml-1 shrink-0 rounded-lg p-2 hover:bg-muted"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-haspopup="dialog"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        )}
      </div>

      {useHamburger && menuOpen && (
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="border-t border-border animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <div className="flex flex-col gap-1 p-4">
            <div className="mb-2 px-1">
              <StartPlanCta variant="button" className="w-full justify-center" />
            </div>
            {primaryLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                link={link}
                pathname={pathname}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}

            {alwaysMoreLinks.length > 0 && (
              <div className="mt-2 border-t border-border/60 pt-2">
                <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  More
                </p>
                {alwaysMoreLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    link={link}
                    pathname={pathname}
                    onNavigate={() => setMenuOpen(false)}
                  />
                ))}
              </div>
            )}

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
                    setMenuOpen(false);
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
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/signup" />}
                  className="mt-2"
                  onClick={() => setMenuOpen(false)}
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
