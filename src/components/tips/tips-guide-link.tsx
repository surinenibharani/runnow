import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

type TipsGuideLinkProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
};

export function TipsGuideLink({
  href,
  title,
  description,
  icon: Icon,
  iconClassName,
}: TipsGuideLinkProps) {
  return (
    <FadeIn className="mt-16">
      <Link href={href} className="group block rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <Card className="border-border/60 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-md">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-xl",
                  iconClassName
                )}
              >
                <Icon className="size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl group-hover:text-primary transition-colors">
                  {title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read full guide
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </FadeIn>
  );
}
