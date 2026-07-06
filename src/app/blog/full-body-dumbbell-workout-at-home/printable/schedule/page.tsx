import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DumbbellWorkoutSchedulePrintSheet } from "@/components/blog/dumbbell-workout-schedule-print-sheet";
import {
  DUMBBELL_WORKOUT_SHEET_SLUG,
  dumbbellWorkoutSchedulePrintablePath,
} from "@/lib/blog/dumbbell-workout-sheet";
import { getVisiblePostBySlug } from "@/lib/blog/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Printable 12-Week Dumbbell Workout Schedule",
  description:
    "Print or save as PDF: twice-a-week lifting schedule, 12-week progression, and weekly check-off tracker.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_URL}${dumbbellWorkoutSchedulePrintablePath()}`,
  },
};

export default function DumbbellWorkoutSchedulePrintablePage() {
  const post = getVisiblePostBySlug(DUMBBELL_WORKOUT_SHEET_SLUG);
  if (!post) notFound();

  const articleHref = `/blog/${DUMBBELL_WORKOUT_SHEET_SLUG}`;

  return (
    <div className="min-h-screen bg-background">
      <DumbbellWorkoutSchedulePrintSheet articleHref={articleHref} />
      <p className="no-print pb-10 text-center text-sm text-muted-foreground">
        <Link href={articleHref} className="text-primary hover:underline">
          Read the full {SITE_NAME} article
        </Link>
      </p>
    </div>
  );
}
