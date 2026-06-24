"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "Training Plans" },
  { href: "/blog", label: "Blog" },
  { href: "/tips", label: "Tips" },
  { href: "/gear", label: "Gear" },
  { href: "/teams", label: "Teams" },
  { href: "/injuries", label: "Injuries" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { data: session } = useSession();

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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {pathname === link.href && (
                <span className="absolute inset-0 rounded-lg bg-muted transition-colors" />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {session ? (
            <>
              <Button nativeButton={false} render={<Link href="/dashboard" />} variant="outline" size="sm">
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button nativeButton={false} render={<Link href="/login" />} variant="outline" size="sm">
                Log in
              </Button>
              <Button nativeButton={false} render={<Link href="/signup" />} size="sm">
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-muted"
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
          className="border-t border-border md:hidden animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <div className="flex flex-col gap-1 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium",
                  pathname === link.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <Button
                variant="ghost"
                className="mt-2 justify-start"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Button nativeButton={false} render={<Link href="/login" />} variant="outline" className="mt-2" onClick={() => setOpen(false)}>
                  Log in
                </Button>
                <Button nativeButton={false} render={<Link href="/signup" />} className="mt-2" onClick={() => setOpen(false)}>
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
