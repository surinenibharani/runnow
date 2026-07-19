import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FadeIn } from "@/components/motion/fade-in";
import { PaceCalculator } from "@/components/tools/pace-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";

const PAGE_TITLE = "Running Pace Calculator — Distance, Time & Finish";
const PAGE_DESCRIPTION =
  "Free running pace calculator: enter distance and time for pace per mile or kilometer, or enter pace and distance for finish time.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/tools/pace-calculator",
});

export default function PaceCalculatorPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            path: "/tools/pace-calculator",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Pace calculator", path: "/tools/pace-calculator" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Pace calculator" },
          ]}
        />

        <FadeIn className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pace Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Distance and time → pace, or pace and distance → finish time. Miles
            or kilometers.
          </p>
        </FadeIn>

        <FadeIn>
          <PaceCalculator />
        </FadeIn>
      </div>
    </div>
  );
}
