import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PlanDeletedMessage } from "@/lib/plan-messages";

type TrainingPlanSignupCardProps = {
  deletedNotice?: PlanDeletedMessage | null;
};

export function TrainingPlanSignupCard({
  deletedNotice,
}: TrainingPlanSignupCardProps) {
  return (
    <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <CardContent className="p-6 sm:p-8">
        {deletedNotice && (
          <div
            className="mb-6 rounded-xl border border-primary/25 bg-background/70 px-4 py-4"
            role="status"
          >
            <p className="font-semibold text-foreground">{deletedNotice.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {deletedNotice.body}
            </p>
          </div>
        )}

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <ClipboardList className="size-7" />
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            Sign up for a training plan
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Pick your distance, set your goal race, and customize your weekly schedule.
            Your plan will show here on the dashboard once you start.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/plan#plan-tracker" />}
            size="lg"
            className="mt-6 h-12 w-full gap-2 px-8 text-base sm:w-auto sm:min-w-[15rem]"
          >
            Choose your plan
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
