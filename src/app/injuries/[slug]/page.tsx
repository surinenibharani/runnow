import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { CommonInjuryCard } from "@/components/injuries/common-injury-card";
import { InjuryShareButtons } from "@/components/injuries/injury-share-buttons";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RelatedPathways } from "@/components/content/related-pathways";
import { BlogFaq } from "@/components/blog/blog-faq";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  simpleArticleJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import {
  commonInjurySlugs,
  getCommonInjuryBySlug,
} from "@/lib/injuries/common-injuries";
import {
  commonInjuryOverviews,
  injuryGuideFaqs,
  injuryGuideHowTo,
} from "@/lib/injuries/injury-schema";
import { getInjuryPathway } from "@/lib/content-pathways";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { SITE_URL } from "@/lib/site";

type InjuryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return commonInjurySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InjuryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const injury = getCommonInjuryBySlug(slug);
  if (!injury) return {};

  return pageMetadata({
    title: `${injury.title} — Prevention & Recovery for Runners`,
    description: injury.symptoms,
    path: `/injuries/${slug}`,
    keywords: [...INJURIES_SEO_KEYWORDS, injury.title.toLowerCase()],
  });
}

export default async function CommonInjuryDetailPage({
  params,
}: InjuryDetailPageProps) {
  const { slug } = await params;
  const injury = getCommonInjuryBySlug(slug);
  if (!injury) notFound();

  const detailPath = `/injuries/${slug}`;
  const pathway = getInjuryPathway(slug);
  const faqs = injuryGuideFaqs(injury);
  const howTo = injuryGuideHowTo(injury);
  const overview = commonInjuryOverviews[slug];

  return (
    <div className="py-8 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: `${injury.title} — Prevention & Recovery for Runners`,
            description: injury.symptoms,
            path: detailPath,
          }),
          simpleArticleJsonLd({
            headline: `${injury.title} — Prevention & Recovery for Runners`,
            description: injury.symptoms,
            path: detailPath,
            articleSection: "Injuries",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Injuries", path: "/injuries" },
            { name: injury.title, path: detailPath },
          ]),
          faqPageJsonLd(faqs, `${SITE_URL}${detailPath}`),
          howToJsonLd({
            name: howTo.name,
            description: howTo.description,
            path: detailPath,
            steps: howTo.steps,
          }),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Injuries", href: "/injuries" },
            { label: injury.title },
          ]}
        />

        <FadeIn className="mb-6 mt-6 sm:mt-8">
          <Button
            nativeButton={false}
            render={<Link href={`/injuries#${slug}`} />}
            variant="ghost"
            size="sm"
            className="min-h-11 gap-2 px-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All common injuries
          </Button>
        </FadeIn>

        {overview && (
          <FadeIn className="mb-8 space-y-3 text-base leading-relaxed text-muted-foreground">
            {overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </FadeIn>
        )}

        <FadeIn className="mb-8">
          <CommonInjuryCard injury={injury} />
          {pathway && <RelatedPathways pathway={pathway} className="mt-6" />}
          <MedicalDisclaimerBanner className="mt-6">
            Persistent, worsening, or one-spot pain needs a professional exam.{" "}
          </MedicalDisclaimerBanner>
          <BlogFaq items={faqs} heading="Quick questions" />
          <InjuryShareButtons
            title={`${injury.title} — running injury guide`}
            path={detailPath}
            compact={false}
            className="mt-6"
          />
        </FadeIn>

        <FadeIn className="text-center">
          <p className="text-sm text-muted-foreground">
            {injury.relatedBlog && (
              <>
                <Link
                  href={injury.relatedBlog.href}
                  className="text-primary hover:underline"
                >
                  {injury.relatedBlog.label}
                </Link>
                {" · "}
              </>
            )}
            <Link href="/injuries" className="text-primary hover:underline">
              All running injuries
            </Link>
            {" · "}
            <Link
              href="/injuries/for-women-runners"
              className="text-primary hover:underline"
            >
              Women runner health
            </Link>
            {" · "}
            <Link
              href="/injuries/for-men-runners"
              className="text-primary hover:underline"
            >
              Men runner health
            </Link>
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
