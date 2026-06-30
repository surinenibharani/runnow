import type { Metadata } from "next";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { EmailSignup } from "@/components/newsletter/email-signup";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo/metadata";
import { INSTAGRAM_URL, SITE_NAME } from "@/lib/site";
import { successStories } from "@/lib/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Success Stories from Beginner Runners",
  description:
    "Real beginners sharing how they started running with LetsRunNow — walk-run wins, streaks, and finishing their first training plan.",
  path: "/stories",
});

export default function StoriesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Success Stories" }]} />

        <FadeIn className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Success Stories
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Beginners who laced up, stuck with the plan, and proved they could do
            hard things — one week at a time.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {successStories.map((story) => (
            <StaggerItem key={story.name}>
              <Card className="h-full border-border/60">
                <CardContent className="flex h-full flex-col p-6">
                  <p className="flex-1 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-sm text-muted-foreground">{story.detail}</p>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn className="mt-12 space-y-8">
          <div className="rounded-xl border border-border/60 bg-muted/20 p-6 sm:p-8 text-center">
            <h2 className="text-xl font-semibold">Share your story</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Finished a week or your whole plan? Use the share buttons on your
              training tracker — friends see your progress and can start their own
              plan from your link.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/plan" />}
              className="mt-4"
            >
              Open training tracker
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-xl border border-border/60 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-600 dark:text-pink-400">
              <InstagramIcon className="size-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Follow on Instagram</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tips, motivation, and community highlights from {SITE_NAME}.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" />
              }
              variant="outline"
            >
              @{INSTAGRAM_URL.replace(/^https?:\/\/(www\.)?instagram\.com\//, "")}
            </Button>
          </div>

          <EmailSignup />

          <StartPlanCta
            headline="Write your own success story"
            description="Start the free plan today — no app, no paywall. Your first week is one checkbox at a time."
          />
        </FadeIn>
      </div>
    </div>
  );
}
