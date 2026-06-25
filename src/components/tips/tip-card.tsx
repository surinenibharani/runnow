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
  illustration: TipIllustrationId;
  icon: LucideIcon;
  iconClassName?: string;
  category: string;
  title: string;
  content: string;
  blogSlug?: string;
  blogReadTime?: string;
  className?: string;
};

export function TipCard({
  id,
  illustration,
  icon: Icon,
  iconClassName,
  category,
  title,
  content,
  blogSlug,
  blogReadTime,
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
      <TipIllustration id={illustration} />
      <CardContent className="relative px-6 pb-6 pt-9">
        <div
          className={cn(
            "absolute -top-6 left-5 z-10 flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background shadow-sm",
            iconClassName ?? "text-primary"
          )}
        >
          <Icon className="size-5" />
        </div>
        <div className="pt-2">
          <Badge variant="secondary" className="mb-2 text-xs">
            {category}
          </Badge>
          <h2 className="font-semibold text-lg leading-snug">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
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
        </div>
      </CardContent>
    </Card>
  );
}
