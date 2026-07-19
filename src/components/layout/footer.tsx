"use client";

import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram";
import { Logo } from "@/components/brand/logo";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { EmailSignup } from "@/components/newsletter/email-signup";
import { Separator } from "@/components/ui/separator";
import {
  footerCompanyLinks,
  footerLearnLinks,
  footerTipsLinks,
  footerTrainLinks,
} from "@/lib/navigation";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <StartPlanCta
            variant="compact"
            headline="Start your free training plan"
            description="Couch to 5K in your browser — check off workouts, build a streak, no app required."
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="[&_img]:h-24 sm:[&_img]:h-28" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Helping beginners lace up and love running — one step at a time.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/instagram"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                <InstagramIcon className="size-4" />
                Instagram tips
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Follow @{INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Train</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerTrainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLearnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
                      link.comingSoon && "text-muted-foreground/55"
                    )}
                  >
                    {link.label}
                    {link.comingSoon && (
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/search"
                  className="transition-colors hover:text-foreground"
                >
                  Search site
                </Link>
              </li>
              <li className="pt-1">
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-foreground/70">
                  Tips guides
                </p>
                <ul className="space-y-1.5 border-l border-border/60 pl-3">
                  {footerTipsLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <EmailSignup compact />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Built to help you move.
          </p>
          <nav aria-label="Legal">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <span className="mx-2 text-muted-foreground/60" aria-hidden>
              ·
            </span>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
