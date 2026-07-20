import type { Metadata } from "next";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { EmailSignup } from "@/components/newsletter/email-signup";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site";
import { successStories } from "@/lib/testimonials";
import { getCommunityTestimonials } from "@/lib/testimonials/community";

const TITLE = "Success Stories from Beginner Runners";
const DESCRIPTION =
  "Real beginners sharing how they started running with LetsRunNow — walk-run wins, streaks, and finishing their first training plan.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/stories",
});

export const revalidate = 60;

export default async function StoriesPage() {
  const community = await getCommunityTestimonials();

  const listItems = [
    ...successStories.map((story) => ({
      name: `${story.name} — ${story.milestone ?? story.detail}`,
      path: "/stories",
    })),
    ...community.map((story) => ({
      name: `${story.authorName} — ${story.milestone ?? story.detail ?? "Community story"}`,
      path: "/stories",
    })),
  ];

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: TITLE,
            description: DESCRIPTION,
            path: "/stories",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Success Stories", path: "/stories" },
          ]),
          itemListJsonLd({
            name: "Beginner running success stories",
            path: "/stories",
            items: listItems,
          }),
        ]}
      />
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
          <Button
            nativeButton={false}
            render={<Link href="/stories/write" />}
            className="mt-6"
          >
            Share your story
          </Button>
        </FadeIn>

        <StaggerChildren className="grid gap-6">
          {successStories.map((story) => (
            <StaggerItem key={story.name}>
              <article className="rounded-2xl border border-border/60 bg-muted/15 px-6 py-7 sm:px-8">
                <p className="text-lg leading-relaxed sm:text-xl">
                  &ldquo;{story.quote}&rdquo;
                </p>
                {story.story && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {story.story}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-border/60 pt-4">
                  <div>
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-sm text-muted-foreground">{story.detail}</p>
                  </div>
                  {story.milestone && (
                    <p className="text-sm font-medium text-foreground/80">
                      {story.milestone}
                    </p>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {community.length > 0 && (
          <FadeIn className="mt-14">
            <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
              From the community
            </h2>
            <StaggerChildren className="grid gap-6">
              {community.map((story) => (
                <StaggerItem key={story.id}>
                  <article className="rounded-2xl border border-border/60 bg-muted/15 px-6 py-7 sm:px-8">
                    <p className="text-lg leading-relaxed sm:text-xl">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                    {story.story && (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base whitespace-pre-wrap">
                        {story.story}
                      </p>
                    )}
                    <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-border/60 pt-4">
                      <div>
                        <p className="font-semibold">{story.authorName}</p>
                        {story.detail && (
                          <p className="text-sm text-muted-foreground">
                            {story.detail}
                          </p>
                        )}
                      </div>
                      {story.milestone && (
                        <p className="text-sm font-medium text-foreground/80">
                          {story.milestone}
                        </p>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </FadeIn>
        )}

        <FadeIn className="mt-12 space-y-8">
          <div className="rounded-xl border border-border/60 bg-muted/20 p-6 sm:p-8 text-center">
            <h2 className="text-xl font-semibold">Share your story</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              No account needed. Write a short quote about what helped you stick
              with running — it shows under Success Stories for the next beginner.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/stories/write" />}
              className="mt-4"
            >
              Write a testimonial
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-xl border border-border/60 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-foreground">
              <InstagramIcon className="size-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Tips from Instagram</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Curated posts from {SITE_NAME} — warm-ups, easy days, shoes, and more.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/instagram" />}
              variant="outline"
            >
              See Instagram tips
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
