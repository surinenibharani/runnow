import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TipIllustration } from "@/components/tips/tip-illustration";
import type { TipIllustrationId } from "@/lib/tips/tips";
import { containsMedicalDisclaimer } from "@/lib/medical-disclaimer";
import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { cn } from "@/lib/utils";

type TipDetailCardProps = {
  illustration: TipIllustrationId;
  icon: LucideIcon;
  iconClassName?: string;
  badge: string;
  title: string;
  children: React.ReactNode;
  footer?: string;
  footerClassName?: string;
  blogSlug?: string;
  blogReadTime?: string;
};

export function TipDetailCard({
  illustration,
  icon: Icon,
  iconClassName,
  badge,
  title,
  children,
  footer,
  footerClassName,
  blogSlug,
  blogReadTime,
}: TipDetailCardProps) {
  return (
    <Card className="h-full gap-0 overflow-hidden border-border/60 py-0">
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
        <div className="min-w-0 pt-2">
          <Badge variant="outline" className="mb-2 text-xs">
            {badge}
          </Badge>
          <h2 className="font-semibold text-lg">{title}</h2>
          {children}
          {footer && (
            <p
              className={cn(
                "mt-4 border-t border-border/60 pt-3 text-xs leading-relaxed",
                footerClassName ??
                  "text-amber-700 dark:text-amber-400/90"
              )}
            >
              {containsMedicalDisclaimer(footer) ? (
                <MedicalDisclaimerText>{footer}</MedicalDisclaimerText>
              ) : (
                footer
              )}
            </p>
          )}
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
