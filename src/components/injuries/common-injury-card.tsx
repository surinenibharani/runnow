import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InjuryShareButtons } from "@/components/injuries/injury-share-buttons";
import type { CommonInjury } from "@/lib/injuries/common-injuries";
import { cn } from "@/lib/utils";

function ConcernList({
  items,
  bulletClassName,
}: {
  items: string[];
  bulletClassName?: string;
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((tip) => (
        <li
          key={tip}
          className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
        >
          <span className={cn("shrink-0", bulletClassName ?? "text-primary")}>
            ·
          </span>
          {tip}
        </li>
      ))}
    </ul>
  );
}

type CommonInjuryCardProps = {
  injury: CommonInjury;
  linkTitle?: boolean;
  showShare?: boolean;
  className?: string;
};

export function CommonInjuryCard({
  injury,
  linkTitle = false,
  showShare = false,
  className,
}: CommonInjuryCardProps) {
  const detailPath = `/injuries/${injury.slug}`;

  return (
    <Card
      id={injury.slug}
      className={cn(
        "scroll-mt-24 border-border/60 transition-shadow duration-300 hover:shadow-md",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <injury.icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {injury.area}
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl">
              {linkTitle ? (
                <Link
                  href={detailPath}
                  className="hover:text-primary hover:underline"
                >
                  {injury.title}
                </Link>
              ) : (
                injury.title
              )}
            </CardTitle>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {injury.symptoms}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid gap-4 sm:ml-14 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/40 p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Prevention tips
            </h3>
            <ConcernList items={injury.avoid} />
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              How to fix / recover
            </h3>
            <ConcernList items={injury.fix} />
          </div>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 sm:ml-14">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Stethoscope className="size-4 text-amber-600 dark:text-amber-500" />
            When to see a specialist
          </h3>
          <ul className="space-y-1.5">
            {injury.seeSpecialist.map((tip) => (
              <li
                key={tip}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="shrink-0 text-amber-600 dark:text-amber-500">
                  ·
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        {injury.learnMore && (
          <p className="text-sm text-muted-foreground sm:ml-14">
            Read more about this condition:{" "}
            <a
              href={injury.learnMore.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              {injury.learnMore.label}
            </a>{" "}
            <span className="text-xs">({injury.learnMore.publisher})</span>
          </p>
        )}
        {showShare && (
          <div className="sm:ml-14">
            <InjuryShareButtons
              title={`${injury.title} — running injury guide`}
              path={detailPath}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
