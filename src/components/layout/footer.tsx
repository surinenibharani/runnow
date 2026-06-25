import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";
import {
  footerLearnLinks,
  footerTipsLinks,
  footerTrainLinks,
} from "@/lib/navigation";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Helping beginners lace up and love running — one step at a time.
            </p>
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
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
            <h3 className="mb-3 text-sm font-semibold">Get started</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              No sign-up required. Jump into a plan and track progress in your
              browser.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/plan"
                className="inline-flex rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open training plans
              </Link>
              <Link
                href="/signup"
                className="inline-flex rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Create account
              </Link>
            </div>
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
