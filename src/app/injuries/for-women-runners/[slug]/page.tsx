import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { RunnerConcernCard } from "@/components/injuries/runner-concern-card";
import { InjuryShareButtons } from "@/components/injuries/injury-share-buttons";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import {
  getWomenRunnerConcernBySlug,
  womenRunnerConcernSlugs,
} from "@/lib/injuries/women-runner-concerns";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";

const BASE_PATH = "/injuries/for-women-runners";

type ConcernDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return womenRunnerConcernSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ConcernDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concern = getWomenRunnerConcernBySlug(slug);
  if (!concern) return {};

  return pageMetadata({
    title: `${concern.title} — Women Runner Health`,
    description: concern.symptoms,
    path: `${BASE_PATH}/${slug}`,
    keywords: [...INJURIES_SEO_KEYWORDS],
  });
}

export default async function WomenRunnerConcernDetailPage({
  params,
}: ConcernDetailPageProps) {
  const { slug } = await params;
  const concern = getWomenRunnerConcernBySlug(slug);
  if (!concern) notFound();

  const detailPath = `${BASE_PATH}/${slug}`;

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: `${concern.title} — Women Runner Health`,
            description: concern.symptoms,
            path: detailPath,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Injuries", path: "/injuries" },
            { name: "For women runners", path: BASE_PATH },
            { name: concern.title, path: detailPath },
          ]),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Injuries", href: "/injuries" },
            { label: "For women runners", href: BASE_PATH },
            { label: concern.title },
          ]}
        />

        <FadeIn className="mb-6 mt-8">
          <Button
            nativeButton={false}
            render={<Link href={`${BASE_PATH}#${slug}`} />}
            variant="ghost"
            size="sm"
            className="gap-2 px-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All women runner topics
          </Button>
        </FadeIn>

        <FadeIn className="mb-8">
          <RunnerConcernCard
            concern={concern}
            theme="violet"
            basePath={BASE_PATH}
            showIllustration
          />
          <MedicalDisclaimerBanner className="mt-6">
            Missed periods, pelvic-floor symptoms, or pregnancy and postpartum
            questions should be reviewed with a clinician.{" "}
          </MedicalDisclaimerBanner>
          <InjuryShareButtons
            title={`${concern.title} — women runner health guide`}
            path={detailPath}
            compact={false}
            className="mt-6"
          />
        </FadeIn>

        <FadeIn className="text-center">
          <p className="text-sm text-muted-foreground">
            <Link href={BASE_PATH} className="text-primary hover:underline">
              Women runner health index
            </Link>
            {" · "}
            <Link
              href="/blog/running-guide-for-women"
              className="text-primary hover:underline"
            >
              Women&apos;s running guide
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
