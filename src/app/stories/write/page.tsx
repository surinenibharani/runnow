import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/seo/json-ld";
import { TestimonialForm } from "@/components/stories/testimonial-form";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";

const TITLE = "Share Your Success Story";
const DESCRIPTION =
  "Write a short testimonial about your beginner running journey — no account required. Your story helps the next runner start.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/stories/write",
});

export default function WriteStoryPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: TITLE,
            description: DESCRIPTION,
            path: "/stories/write",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Success Stories", path: "/stories" },
            { name: "Share your story", path: "/stories/write" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Success Stories", href: "/stories" },
            { label: "Share your story" },
          ]}
        />

        <FadeIn className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Share your story
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Finished a week, a streak, or your whole plan? Tell other beginners
            what helped — no login required. Stories appear on{" "}
            <Link href="/stories" className="text-primary hover:underline">
              Success Stories
            </Link>
            .
          </p>
        </FadeIn>

        <FadeIn>
          <TestimonialForm />
        </FadeIn>
      </div>
    </div>
  );
}
