import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TipIllustration } from "@/components/tips/tip-illustration";
import type { TipIllustrationId } from "@/lib/tips/tips";
import { cn } from "@/lib/utils";

type TipCardProps = {
  id?: string;
  tipHref?: string;
  illustration: TipIllustrationId;
  icon: LucideIcon;
  iconClassName?: string;
  category: string;
  title: string;
  content: string;
  blogSlug?: string;
  blogReadTime?: string;
  compact?: boolean;
  className?: string;
};

export function TipCard({
  id,
  tipHref,
  illustration,
  icon: Icon,
  iconClassName,
  category,
  title,
  content,
  blogSlug,
  blogReadTime,
  compact = false,
  className,
}: TipCardProps) {
  return (
    <Card
      id={id}
      className={cn(
        "h-full scroll-mt-24 gap-0 overflow-hidden border-border/60 py-0 transition-shadow duration-300 hover:shadow-md",
        className
      )}
    >
      {!compact && <TipIllustration id={illustration} />}
      <CardContent
        className={cn(
          "relative px-5 pb-5 sm:px-6 sm:pb-6",
          compact ? "pt-5" : "pt-9"
        )}
      >
        {!compact && (
        <div
          className={cn(
            "absolute -top-6 left-5 z-10 flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm",
            iconClassName ?? "text-primary"
          )}
        >
          <Icon className="size-5" />
        </div>
        )}
        <div className={compact ? undefined : "pt-2"}>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {compact && (
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg bg-primary/10",
                  iconClassName ?? "text-primary"
                )}
              >
                <Icon className="size-4" />
              </span>
            )}
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
          {tipHref ? (
            <h2 className="font-semibold text-lg leading-snug">
              <Link href={tipHref} className="hover:text-primary hover:underline">
                {title}
              </Link>
            </h2>
          ) : (
            <h2 className="font-semibold text-lg leading-snug">{title}</h2>
          )}
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed text-muted-foreground",
              compact && "line-clamp-3"
            )}
          >
            {content}
          </p>
          {blogSlug && (
            <Link
              href={`/blog/${blogSlug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <BookOpen className="size-3.5" />
              Read full article
              {blogReadTime && (
                <span className="font-normal text-muted-foreground">
                  · {blogReadTime}
                </span>
              )}
              <ArrowRight className="size-3.5" />
            </Link>
          )}
          {tipHref && !blogSlug && (
            <Link
              href={tipHref}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Read more
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
