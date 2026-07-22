import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TipDetailCard } from "@/components/tips/tip-detail-card";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { ContentCopyrightNotice } from "@/components/legal/content-copyright-notice";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { BAD_WEATHER_SEO_KEYWORDS, TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";
import {
  getAllWeatherTipSlugs,
  getWeatherTipBySlug,
  weatherTipMetaDescription,
  weatherTipSeoTitle,
} from "@/lib/tips/helpers";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllWeatherTipSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = getWeatherTipBySlug(slug);
  if (!tip) {
    return { title: "Tip Not Found", robots: { index: false, follow: false } };
  }

  const title = weatherTipSeoTitle(tip);
  const description = weatherTipMetaDescription(tip);

  return pageMetadata({
    title,
    description,
    path: `/tips/bad-weather/${slug}`,
    keywords: [
      ...BAD_WEATHER_SEO_KEYWORDS,
      ...TIPS_SEO_KEYWORDS.slice(0, 3),
      tip.condition.toLowerCase(),
      tip.title.toLowerCase(),
    ],
  });
}

export default async function WeatherTipDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tip = getWeatherTipBySlug(slug);
  if (!tip) notFound();

  const path = `/tips/bad-weather/${slug}`;
  const seoTitleText = weatherTipSeoTitle(tip);
  const description = weatherTipMetaDescription(tip);
  const faqAnswer = [
    ...tip.outdoorTips.slice(0, 2),
    tip.skipOutdoor ? `When to skip: ${tip.skipOutdoor}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: seoTitleText,
            description,
            path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tips", path: "/tips" },
            { name: "Bad weather", path: "/tips/bad-weather" },
            { name: tip.title, path },
          ]),
          faqPageJsonLd(
            [{ question: tip.title, answer: faqAnswer }],
            `${SITE_URL}${path}`
          ),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tips", href: "/tips" },
            { label: "Bad weather", href: "/tips/bad-weather" },
            { label: tip.title },
          ]}
        />

        <FadeIn className="mb-8">
          <Link
            href="/tips/bad-weather"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            All bad weather tips
          </Link>
        </FadeIn>

        <FadeIn>
          <TipDetailCard
            illustration={tip.illustration}
            icon={tip.icon}
            iconClassName="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
            badge={tip.condition}
            title={tip.title}
            titleAs="h1"
            footer={tip.skipOutdoor}
            footerClassName="text-indigo-700 dark:text-indigo-300/90"
          >
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-foreground">
              If you head out
            </p>
            <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
              {tip.outdoorTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-foreground">
              Indoor alternatives
            </p>
            <ul className="mt-1.5 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
              {tip.indoorAlternatives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TipDetailCard>
        </FadeIn>

        <FadeIn className="mt-6">
          <ContentCopyrightNotice kind="tip" />
        </FadeIn>

        <FadeIn className="mt-8">
          <MedicalDisclaimerBanner>
            Extreme heat, cold, or poor air quality carry real health risks —
            when in doubt, move your run indoors.{" "}
          </MedicalDisclaimerBanner>
        </FadeIn>

        <FadeIn className="mt-10">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
