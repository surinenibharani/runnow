import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { TipsGuideLink } from "@/components/tips/tips-guide-link";
import { pageMetadata } from "@/lib/seo/metadata";
import { runnerTips, tipsPageGuides } from "@/lib/tips/tips";

export const metadata: Metadata = pageMetadata({
  title: "Beginner Running Tips",
  description:
    "Practical advice for new runners — pacing, gear, recovery, bad-weather indoor alternatives, and guidance for pregnancy, runners 55+, and common health conditions.",
  path: "/tips",
});

export default function TipsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tips for New Runners
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            The stuff nobody tells you when you&apos;re starting out.
            Bookmark this page and come back whenever you need a reminder.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-4 sm:grid-cols-2">
          {runnerTips.map((tip) => (
            <StaggerItem key={tip.slug}>
              <Card
                id={tip.slug}
                className="h-full scroll-mt-24 border-border/60 hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <tip.icon className="size-5" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {tip.category}
                      </Badge>
                      <h2 className="font-semibold text-lg">{tip.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {tipsPageGuides.map((guide) => (
          <TipsGuideLink
            key={guide.slug}
            id={guide.slug}
            href={guide.href}
            title={guide.title}
            description={guide.description}
            icon={guide.icon}
            iconClassName={guide.iconClassName}
          />
        ))}

        <FadeIn className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Dealing with pain from running? See our{" "}
            <Link href="/injuries" className="text-primary hover:underline">
              injury prevention guide
            </Link>{" "}
            or build a plan tuned to your age on the{" "}
            <Link href="/plan" className="text-primary hover:underline">
              training plans
            </Link>{" "}
            page.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
