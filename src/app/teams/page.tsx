import type { Metadata } from "next";
import { Suspense } from "react";
import { TeamsContent } from "@/components/teams/teams-content";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Coach plan from $9.99/month — create teams, approve athletes, and view group Strava stats and training progress.",
};

export default function TeamsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading teams...</div>}>
      <TeamsContent />
    </Suspense>
  );
}
