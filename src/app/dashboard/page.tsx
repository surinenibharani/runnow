import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { pageMetadata } from "@/lib/seo/metadata";

const DashboardContent = dynamic(
  () =>
    import("@/components/dashboard/dashboard-content").then((m) => ({
      default: m.DashboardContent,
    })),
  { loading: () => <div className="py-20 text-center text-muted-foreground">Loading…</div> }
);

export const metadata: Metadata = pageMetadata({
  title: "Dashboard",
  description: "Strava sync, run streaks, route comparisons, and coaching suggestions.",
  path: "/dashboard",
  noindex: true,
});

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-muted-foreground">Loading…</div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
