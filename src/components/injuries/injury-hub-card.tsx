import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CommonInjury } from "@/lib/injuries/common-injuries";
import { getInjuryPathway } from "@/lib/content-pathways";
import { cn } from "@/lib/utils";

type InjuryHubCardProps = {
  injury: CommonInjury;
  className?: string;
};

export function InjuryHubCard({ injury, className }: InjuryHubCardProps) {
  const pathway = getInjuryPathway(injury.slug);
  const next = pathway?.links[0];

  return (
    <Card
      id={injury.slug}
      className={cn(
        "scroll-mt-24 border-border/60 transition-shadow duration-300 hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <injury.icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <Badge variant="secondary" className="text-xs">
              {injury.area}
            </Badge>
            <h3 className="mt-2 text-lg font-semibold">
              <Link
                href={`/injuries/${injury.slug}`}
                className="hover:text-primary hover:underline"
              >
                {injury.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {injury.symptoms}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link
                href={`/injuries/${injury.slug}`}
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                Prevention & recovery
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              {injury.relatedBlog && (
                <Link
                  href={injury.relatedBlog.href}
                  className="text-muted-foreground hover:text-primary hover:underline"
                >
                  {injury.relatedBlog.label}
                </Link>
              )}
              {next && (
                <Link
                  href={next.href}
                  className="text-muted-foreground hover:text-primary hover:underline"
                >
                  {next.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
