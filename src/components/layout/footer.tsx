import Link from "next/link";
import { Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="size-4" />
              </span>
              RunNow
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Helping beginners lace up and love running — one step at a time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/plan" className="hover:text-foreground transition-colors">
                  8-Week Plan
                </Link>
              </li>
              <li>
                <Link href="/tips" className="hover:text-foreground transition-colors">
                  Running Tips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Get Started</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No sign-up required. Jump into the plan and track your progress right in your browser.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RunNow. Built to help you move.
        </p>
      </div>
    </footer>
  );
}
