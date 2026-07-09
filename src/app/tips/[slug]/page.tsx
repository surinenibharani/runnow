import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { TipCard } from "@/components/tips/tip-card";
import { TipIllustration } from "@/components/tips/tip-illustration";
import { MedicalDisclaimerBanner } from "@/components/legal/medical-disclaimer-banner";
import { getPostBySlug } from "@/lib/blog/posts";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { TIPS_SEO_KEYWORDS } from "@/lib/seo/keywords";
import {
  getAllTipSlugs,
  getTipBySlug,
  tipMetaDescription,
  tipSeoTitle,
} from "@/lib/tips/helpers";
import { runnerTips } from "@/lib/tips/tips";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllTipSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip) {
    return { title: "Tip Not Found", robots: { index: false, follow: false } };
  }

  const title = tipSeoTitle(tip);
  const description = tipMetaDescription(tip);

  return pageMetadata({
    title,
    description,
    path: `/tips/${slug}`,
    keywords: [...TIPS_SEO_KEYWORDS, tip.category.toLowerCase(), tip.title.toLowerCase()],
  });
}

export default async function TipDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tip = getTipBySlug(slug);
  if (!tip) notFound();

  const post = tip.blogSlug ? getPostBySlug(tip.blogSlug) : undefined;
  const pageUrl = `${SITE_URL}/tips/${slug}`;
  const seoTitleText = tipSeoTitle(tip);
  const description = tipMetaDescription(tip);
  const Icon = tip.icon;
  const relatedTips = runnerTips.filter((t) => t.slug !== slug).slice(0, 3);

  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: seoTitleText,
            description,
            path: `/tips/${slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tips", path: "/tips" },
            { name: tip.title, path: `/tips/${slug}` },
          ]),
          faqPageJsonLd(
            [{ question: tip.title, answer: tip.content }],
            pageUrl
          ),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tips", href: "/tips" },
            { label: tip.title },
          ]}
        />

        <FadeIn className="mb-8">
          <Link
            href="/tips"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            All tips
          </Link>
        </FadeIn>

        <FadeIn>
          <article>
            <div className="overflow-hidden rounded-xl border border-border/60">
              <TipIllustration id={tip.illustration} />
              <div className="relative px-6 pb-8 pt-10">
                <div className="absolute -top-6 left-5 flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm text-primary">
                  <Icon className="size-5" />
                </div>
                <Badge variant="secondary" className="mb-3 text-xs">
                  {tip.category}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {tip.title}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {tip.content}
                </p>
                {tip.blogSlug && post && (
                  <Link
                    href={`/blog/${tip.blogSlug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <BookOpen className="size-3.5" />
                    Read the full article
                    <span className="font-normal text-muted-foreground">
                      · {post.readTime}
                    </span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </article>
        </FadeIn>

        <FadeIn className="mt-8">
          <MedicalDisclaimerBanner />
        </FadeIn>

        {relatedTips.length > 0 && (
          <FadeIn className="mt-12">
            <h2 className="mb-5 text-xl font-bold tracking-tight">More tips</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedTips.map((related) => {
                const relatedPost = related.blogSlug
                  ? getPostBySlug(related.blogSlug)
                  : undefined;
                return (
                  <TipCard
                    key={related.slug}
                    tipHref={`/tips/${related.slug}`}
                    illustration={related.illustration}
                    icon={related.icon}
                    category={related.category}
                    title={related.title}
                    content={related.content}
                    blogSlug={related.blogSlug}
                    blogReadTime={relatedPost?.readTime}
                  />
                );
              })}
            </div>
          </FadeIn>
        )}

        <FadeIn className="mt-10">
          <StartPlanCta variant="compact" />
        </FadeIn>
      </div>
    </div>
  );
}
