import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { EmailSignup } from "@/components/newsletter/email-signup";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { AppImage } from "@/components/ui/app-image";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { getInstagramGridPosts } from "@/lib/instagram/fetch-posts";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SITE_NAME } from "@/lib/site";

const PAGE_TITLE = `Instagram Tips from @${INSTAGRAM_HANDLE}`;
const PAGE_DESCRIPTION =
  "Beginner running tips from LetsRunNow on Instagram — warm-ups, easy days, shoes, and motivation. Follow @letsrunnowcoach for more.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/instagram",
});

/** Refresh live Graph API posts about once an hour. */
export const revalidate = 3600;

export default async function InstagramPage() {
  const { posts, source } = await getInstagramGridPosts();
  const isLive = source === "live";

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            path: "/instagram",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Instagram", path: "/instagram" },
          ]),
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Instagram" }]}
        />

        <FadeIn className="mb-10 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-600 dark:text-pink-400">
            <InstagramIcon className="size-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From Instagram
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {isLive ? "Latest tips and motivation from" : "Tips and motivation from"}{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              @{INSTAGRAM_HANDLE}
            </a>
            . Tap a post to watch or save it on Instagram.
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => {
            const remoteImage = post.image.startsWith("http");
            return (
              <StaggerItem key={post.id}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-primary/40 hover:bg-muted/20"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
                    <AppImage
                      src={post.image}
                      alt=""
                      decorative
                      fill
                      unoptimized={remoteImage}
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h2 className="text-base font-semibold leading-snug tracking-tight group-hover:text-primary">
                      {post.headline}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      View on Instagram
                      <ExternalLink
                        className="size-3.5 opacity-60"
                        aria-hidden
                      />
                    </span>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <FadeIn className="mt-12 space-y-8">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border/60 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-600 dark:text-pink-400">
              <InstagramIcon className="size-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">More on Instagram</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Daily tips, motivation, and community highlights from {SITE_NAME}.
                {isLive
                  ? " This grid refreshes about hourly — follow for everything new."
                  : " Follow for everything new."}
              </p>
            </div>
            <Button
              nativeButton={false}
              render={
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
            >
              @{INSTAGRAM_HANDLE}
            </Button>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/20 p-6 text-center sm:p-8">
            <h2 className="text-xl font-semibold">Prefer long-form tips?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              The blog and tips pages go deeper on pace, shoes, recovery, and
              how to start — free, no app required.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button nativeButton={false} render={<Link href="/tips" />}>
                Running tips
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/blog" />}
                variant="outline"
              >
                Blog
              </Button>
            </div>
          </div>

          <EmailSignup />

          <StartPlanCta
            headline="Put the tips into a plan"
            description="Don't know where to start? Start here for a free plan recommendation — then check off workouts in your browser."
          />
        </FadeIn>
      </div>
    </div>
  );
}
