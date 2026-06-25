import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { TipIllustration } from "@/components/tips/tip-illustration";
import type { TipIllustrationId } from "@/lib/tips/tips";
import { cn } from "@/lib/utils";

type TipsGuideLinkProps = {
  id?: string;
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  illustration?: TipIllustrationId;
  blogSlug?: string;
  blogReadTime?: string;
};

export function TipsGuideLink({
  id,
  href,
  title,
  description,
  icon: Icon,
  iconClassName,
  illustration,
  blogSlug,
  blogReadTime,
}: TipsGuideLinkProps) {
  return (
    <FadeIn className="mt-16">
      <div id={id} className={id ? "scroll-mt-24" : undefined}>
        <Card className="gap-0 overflow-hidden border-border/60 py-0 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
          {illustration && <TipIllustration id={illustration} />}
          <CardContent className="relative px-6 pb-6 pt-9 sm:px-8 sm:pb-8">
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl",
                illustration &&
                  "absolute -top-6 left-6 z-10 border border-border/60 bg-background shadow-sm",
                iconClassName
              )}
            >
              <Icon className="size-6" />
            </div>
            <div className={cn("min-w-0 flex-1", illustration && "pt-4")}>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={href}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read full guide
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {blogSlug && (
                  <Link
                    href={`/blog/${blogSlug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                  >
                    <BookOpen className="size-3.5" />
                    Deep dive
                    {blogReadTime && (
                      <span className="font-normal">· {blogReadTime}</span>
                    )}
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
}
