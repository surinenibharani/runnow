import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { RacePredictor } from "@/components/tools/race-predictor";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";

const PAGE_TITLE = "Race Time Predictor — 5K to Marathon (Riegel)";
const PAGE_DESCRIPTION =
  "Predict a 5K, 10K, half, or marathon finish from a known race time using the Riegel formula — a rough endurance estimate for beginners.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/tools/race-predictor",
});

export default function RacePredictorPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            path: "/tools/race-predictor",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Race predictor", path: "/tools/race-predictor" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Race predictor" },
          ]}
        />

        <FadeIn className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Race Time Predictor
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Enter a race you&apos;ve finished and see a ballpark time for another
            distance.
          </p>
        </FadeIn>

        <FadeIn>
          <RacePredictor />
        </FadeIn>
      </div>
    </div>
  );
}
