import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { TipsBackLink } from "@/components/tips/tips-back-link";
import { SituationalTipsGrid } from "@/components/tips/situational-tips-grid";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Running for Specific Situations",
  description:
    "Running guidance for pregnancy, runners 55+, and common health conditions including diabetes, asthma, arthritis, and more.",
  path: "/tips/specific-situations",
});

export default function SpecificSituationsTipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <TipsBackLink />

        <FadeIn className="text-center mb-12">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Users className="size-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Running for specific situations
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Extra guidance for pregnancy, older runners, and common health
            conditions. Always defer to your doctor when advice conflicts with a
            training plan.
          </p>
        </FadeIn>

        <SituationalTipsGrid />

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Dealing with pain from running? See our{" "}
            <Link href="/injuries" className="text-primary hover:underline">
              injury prevention guide
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
