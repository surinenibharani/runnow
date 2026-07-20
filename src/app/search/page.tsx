import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StartPlanCta } from "@/components/cta/start-plan-cta";
import {
  SiteSearch,
  SiteSearchResultLink,
} from "@/components/search/site-search";
import { pageMetadata } from "@/lib/seo/metadata";
import { searchSite } from "@/lib/search/search";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description: "Search LetsRunNow for training plans, blog posts, tips, and gear.",
  path: "/search",
  noindex: true,
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query.length >= 2 ? searchSite(query, 50) : [];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Search" }]}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Search
          </h1>
          <p className="mt-3 text-muted-foreground">
            Find training plans, blog posts, tips, gear guides, and more.
            Don&apos;t know where to start?{" "}
            <Link href="/start" className="font-medium text-primary hover:underline">
              Start here
            </Link>
            .
          </p>

          <div className="mt-6">
            <SiteSearch className="max-w-xl" defaultQuery={query} />
          </div>
        </div>

        {query.length >= 2 && (
          <div className="mt-10">
            <p className="text-sm text-muted-foreground">
              {results.length === 0
                ? `No results for “${query}”`
                : `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`}
            </p>

            {results.length === 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                Try another search, or{" "}
                <Link href="/start" className="font-medium text-primary hover:underline">
                  Start here
                </Link>{" "}
                for a plan recommendation.
              </p>
            )}

            {results.length > 0 && (
              <ul className="mt-4 flex flex-col gap-3">
                {results.map((result) => (
                  <li key={result.id}>
                    <SiteSearchResultLink result={result} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-12">
          <StartPlanCta variant="compact" />
        </div>
      </div>
    </div>
  );
}
