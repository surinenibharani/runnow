import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { CommonInjuryCard } from "@/components/injuries/common-injury-card";
import { InjuryShareButtons } from "@/components/injuries/injury-share-buttons";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  commonInjurySlugs,
  getCommonInjuryBySlug,
} from "@/lib/injuries/common-injuries";
import { pageMetadata } from "@/lib/seo/metadata";
import { INJURIES_SEO_KEYWORDS } from "@/lib/seo/keywords";

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

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Injuries", href: "/injuries" },
            { label: injury.title },
          ]}
        />

        <FadeIn className="mb-6 mt-8">
          <Button
            nativeButton={false}
            render={<Link href={`/injuries#${slug}`} />}
            variant="ghost"
            size="sm"
            className="gap-2 px-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All common injuries
          </Button>
        </FadeIn>

        <FadeIn className="mb-8">
          <CommonInjuryCard injury={injury} />
          <InjuryShareButtons
            title={`${injury.title} — running injury guide`}
            path={detailPath}
            compact={false}
            className="mt-6"
          />
        </FadeIn>

        <FadeIn className="text-center">
          <p className="text-sm text-muted-foreground">
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
