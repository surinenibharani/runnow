import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Strava sync, run streaks, route comparisons, and coaching suggestions.",
};

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
