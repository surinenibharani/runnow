import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { ShoeQuiz } from "@/components/tools/shoe-quiz";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";

const PAGE_TITLE = "Running Shoe Quiz — Find Your Shoe Category";
const PAGE_DESCRIPTION =
  "Short beginner shoe quiz: mileage, surface, cushion preference, and injury history — get category guidance and links to our gear guide.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/tools/shoe-quiz",
});

export default function ShoeQuizPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            path: "/tools/shoe-quiz",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Shoe quiz", path: "/tools/shoe-quiz" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Shoe quiz" },
          ]}
        />

        <FadeIn className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shoe Quiz
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Four quick questions. We&apos;ll suggest a shoe category and send you
            to the gear guide — no fake medical claims.
          </p>
        </FadeIn>

        <FadeIn>
          <ShoeQuiz />
        </FadeIn>
      </div>
    </div>
  );
}
