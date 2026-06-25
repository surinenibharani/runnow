import type { Metadata } from "next";
import Link from "next/link";
import { Check, Flame, Trophy } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pageMetadata } from "@/lib/seo/metadata";
import { parseProgressShareParams } from "@/lib/progress-share";
import { SITE_NAME } from "@/lib/site";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const data = parseProgressShareParams(params);

  if (!data) {
    return pageMetadata({
      title: "Training progress",
      description: "Celebrate a training milestone on Let's Run Now.",
      path: "/plan/share",
    });
  }

  const title =
    data.percentComplete >= 100
      ? `Finished ${data.planName}!`
      : `Week ${data.week} of ${data.planName}`;

  const description = `${data.percentComplete}% complete · ${data.completedCount}/${data.totalWorkouts} activities on ${SITE_NAME}.`;

  return pageMetadata({
    title,
    description,
    path: "/plan/share",
  });
}

export default async function PlanSharePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = parseProgressShareParams(params);

  if (!data) {
    return (
      <div className="py-16 px-4 text-center max-w-lg mx-auto">
        <h1 className="text-2xl font-bold">Progress link not found</h1>
        <p className="text-muted-foreground mt-3">
          This share link is missing details. Open your training plan and use
          Share progress to generate a new link.
        </p>
        <Button nativeButton={false} render={<Link href="/plan" />} className="mt-6">
          View training plans
        </Button>
      </div>
    );
  }

  const isComplete = data.percentComplete >= 100;
  const headline = isComplete
    ? `${data.planName} — done!`
    : `Week ${data.week} complete!`;

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {isComplete ? (
                <Trophy className="size-8" aria-hidden />
              ) : (
                <Check className="size-8" aria-hidden />
              )}
            </div>
            <p className="text-sm font-medium text-primary uppercase tracking-wide">
              Training milestone
            </p>
            <h1 className="text-3xl font-bold tracking-tight mt-2">{headline}</h1>
            <p className="text-muted-foreground mt-3 text-lg">
              {isComplete
                ? `Finished the ${data.planDuration} ${data.planName} plan on ${SITE_NAME}.`
                : `Crushed Week ${data.week} of ${data.totalWeeks}-week ${data.planName} (${data.planDuration}).`}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-muted/40 p-4">
                  <p className="text-2xl font-bold">
                    {data.completedCount}/{data.totalWorkouts}
                  </p>
                  <p className="text-sm text-muted-foreground">Activities done</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4">
                  <p className="text-2xl font-bold flex items-center gap-2">
                    <Flame className="size-5 text-orange-500" aria-hidden />
                    {data.streak}
                  </p>
                  <p className="text-sm text-muted-foreground">Day streak</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Overall progress</p>
                  <p className="text-sm font-semibold">{data.percentComplete}%</p>
                </div>
                <Progress
                  value={data.percentComplete}
                  className="h-2"
                  aria-label={`${data.percentComplete} percent of plan complete`}
                />
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button nativeButton={false} render={<Link href="/plan" />} size="lg">
              Start your own plan
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/signup" />}
              variant="outline"
              size="lg"
            >
              Create free account
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
