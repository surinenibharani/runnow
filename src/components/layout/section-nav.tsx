"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export type SectionNavItem = {
  href: string;
  label: string;
};

type SectionNavProps = {
  items: readonly SectionNavItem[];
  /** Accessible name for the tab list, e.g. "Tips sections" */
  ariaLabel: string;
  className?: string;
};

export function SectionNav({ items, ariaLabel, className }: SectionNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "mb-8 flex flex-wrap gap-2 border-b border-border/60 pb-4",
        className
      )}
    >
      {items.map((item) => {
        const active = isNavLinkActive(pathname, item.href, true);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "border-primary bg-primary/10 text-foreground shadow-sm"
                : "border-border/50 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
