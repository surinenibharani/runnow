import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DumbbellWorkoutPrintSheet } from "@/components/blog/dumbbell-workout-print-sheet";
import {
  DUMBBELL_WORKOUT_SHEET_SLUG,
  dumbbellWorkoutPrintablePath,
} from "@/lib/blog/dumbbell-workout-sheet";
import { getVisiblePostBySlug } from "@/lib/blog/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Printable Full-Body Dumbbell Workout Sheet",
  description:
    "Print or save as PDF: 13-exercise dumbbell workout with sets, reps, and basic form diagrams.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${SITE_URL}${dumbbellWorkoutPrintablePath()}`,
  },
};

export default function DumbbellWorkoutPrintablePage() {
  const post = getVisiblePostBySlug(DUMBBELL_WORKOUT_SHEET_SLUG);
  if (!post) notFound();

  const articleHref = `/blog/${DUMBBELL_WORKOUT_SHEET_SLUG}`;

  return (
    <div className="min-h-screen bg-background">
      <DumbbellWorkoutPrintSheet articleHref={articleHref} />
      <p className="no-print pb-10 text-center text-sm text-muted-foreground">
        <Link href={articleHref} className="text-primary hover:underline">
          Read the full {SITE_NAME} article
        </Link>
      </p>
    </div>
  );
}
