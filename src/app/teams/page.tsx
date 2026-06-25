import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { pageMetadata } from "@/lib/seo/metadata";

const TeamsContent = dynamic(
  () =>
    import("@/components/teams/teams-content").then((m) => ({ default: m.TeamsContent })),
  { loading: () => <div className="py-20 text-center text-muted-foreground">Loading teams...</div> }
);

export const metadata: Metadata = pageMetadata({
  title: "Teams",
  description:
    "Coach plan from $9.99/month — create teams, approve athletes, and view group Strava stats and training progress.",
  path: "/teams",
});

export default function TeamsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Teams" }]} />
        <Suspense
          fallback={
            <div className="py-20 text-center text-muted-foreground">
              Loading teams...
            </div>
          }
        >
          <TeamsContent />
        </Suspense>
      </div>
    </div>
  );
}
