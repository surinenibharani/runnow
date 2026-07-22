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
import { SITUATIONAL_SEO_KEYWORDS, TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";
import {
  getAllSituationalTipSlugs,
  getSituationalTipBySlug,
  situationalTipMetaDescription,
  situationalTipSeoTitle,
} from "@/lib/tips/helpers";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllSituationalTipSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = getSituationalTipBySlug(slug);
  if (!tip) {
    return { title: "Tip Not Found", robots: { index: false, follow: false } };
  }

  const title = situationalTipSeoTitle(tip);
  const description = situationalTipMetaDescription(tip);

  return pageMetadata({
    title,
    description,
    path: `/tips/specific-situations/${slug}`,
    keywords: [
      ...SITUATIONAL_SEO_KEYWORDS,
      ...TIPS_SEO_KEYWORDS.slice(0, 3),
      tip.audience.toLowerCase(),
      tip.title.toLowerCase(),
    ],
  });
}

export default async function SituationalTipDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tip = getSituationalTipBySlug(slug);
  if (!tip) notFound();

  const path = `/tips/specific-situations/${slug}`;
  const seoTitleText = situationalTipSeoTitle(tip);
  const description = situationalTipMetaDescription(tip);
  const faqAnswer = `${tip.tips[0] ?? ""} ${tip.caution}`.trim();

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
            {
              name: "Specific situations",
              path: "/tips/specific-situations",
            },
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
            {
              label: "Specific situations",
              href: "/tips/specific-situations",
            },
            { label: tip.title },
          ]}
        />

        <FadeIn className="mb-8">
          <Link
            href="/tips/specific-situations"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            All specific situation tips
          </Link>
        </FadeIn>

        <FadeIn>
          <TipDetailCard
            illustration={tip.illustration}
            icon={tip.icon}
            iconClassName="bg-sky-500/10 text-sky-600 dark:text-sky-400"
            badge={tip.audience}
            title={tip.title}
            titleAs="h1"
            footer={tip.caution}
          >
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
              {tip.tips.map((item) => (
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
            LetsRunNow provides general fitness education, not medical advice.
            Talk to your physician before starting or changing exercise.{" "}
          </MedicalDisclaimerBanner>
        </FadeIn>

        <FadeIn className="mt-10">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
