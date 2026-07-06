import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeginnerDumbbellWorkoutTrackerPrintSheet } from "@/components/blog/beginner-dumbbell-workout-tracker-print-sheet";
import {
  BEGINNER_DUMBBELL_WORKOUT_SLUG,
  beginnerDumbbellWorkoutPrintablePath,
} from "@/lib/blog/beginner-dumbbell-workout-sheet";
import { getVisiblePostBySlug } from "@/lib/blog/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Printable Beginner Dumbbell Workout Tracker",
  description:
    "Print or save as PDF: track dumbbell weight, reps per set, training days, and weekly body weight for 12 weeks.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_URL}${beginnerDumbbellWorkoutPrintablePath()}`,
  },
};

export default function BeginnerDumbbellWorkoutPrintablePage() {
  const post = getVisiblePostBySlug(BEGINNER_DUMBBELL_WORKOUT_SLUG);
  if (!post) notFound();

  const articleHref = `/blog/${BEGINNER_DUMBBELL_WORKOUT_SLUG}`;

  return (
    <div className="min-h-screen bg-background">
      <BeginnerDumbbellWorkoutTrackerPrintSheet articleHref={articleHref} />
      <p className="no-print pb-10 text-center text-sm text-muted-foreground">
        <Link href={articleHref} className="text-primary hover:underline">
          Read the full {SITE_NAME} article
        </Link>
      </p>
    </div>
  );
}
