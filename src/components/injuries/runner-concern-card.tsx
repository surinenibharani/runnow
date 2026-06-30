import Link from "next/link";
import { Quote, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WomenRunnerIllustration } from "@/components/injuries/women-runner-illustrations";
import { InjuryShareButtons } from "@/components/injuries/injury-share-buttons";
import type { WomenRunnerIllustrationId } from "@/lib/injuries/women-runner-concerns";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type RunnerConcernTheme = "violet" | "sky";

export type RunnerConcernData = {
  id: string;
  icon: LucideIcon;
  area: string;
  title: string;
  intro?: string;
  symptoms: string;
  symptomsList?: string[];
  avoid: string[];
  fix: string[];
  extraSections?: { heading: string; items: string[] }[];
  seeSpecialist: string[];
  quote?: string;
  callout?: string;
  illustration?: WomenRunnerIllustrationId;
  readMore?: { label: string; href: string }[];
};

const themeStyles: Record<
  RunnerConcernTheme,
  {
    card: string;
    iconWrap: string;
    icon: string;
    badge: string;
    bullet: string;
    quoteBorder: string;
    quoteIcon: string;
    navPill: string;
  }
> = {
  violet: {
    card: "border-violet-500/20 bg-violet-500/[0.03]",
    iconWrap: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    icon: "text-violet-600 dark:text-violet-400",
    badge: "border-violet-500/20",
    bullet: "text-violet-600 dark:text-violet-400",
    quoteBorder: "border-violet-500/20",
    quoteIcon: "text-violet-600 dark:text-violet-400",
    navPill:
      "border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10",
  },
  sky: {
    card: "border-sky-500/20 bg-sky-500/[0.03]",
    iconWrap: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    icon: "text-sky-600 dark:text-sky-400",
    badge: "border-sky-500/20",
    bullet: "text-sky-600 dark:text-sky-400",
    quoteBorder: "border-sky-500/20",
    quoteIcon: "text-sky-600 dark:text-sky-400",
    navPill: "border-sky-500/30 bg-sky-500/5 hover:bg-sky-500/10",
  },
};

function ConcernList({
  items,
  bulletClassName,
}: {
  items: string[];
  bulletClassName: string;
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((tip) => (
        <li
          key={tip}
          className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
        >
          <span className={cn("shrink-0", bulletClassName)}>·</span>
          {tip}
        </li>
      ))}
    </ul>
  );
}

type RunnerConcernCardProps = {
  concern: RunnerConcernData;
  theme: RunnerConcernTheme;
  basePath: string;
  linkTitle?: boolean;
  showShare?: boolean;
  showIllustration?: boolean;
};

export function RunnerConcernCard({
  concern,
  theme,
  basePath,
  linkTitle = false,
  showShare = false,
  showIllustration = false,
}: RunnerConcernCardProps) {
  const styles = themeStyles[theme];
  const detailPath = `${basePath}/${concern.id}`;

  return (
    <Card
      id={concern.id}
      className={cn(
        "scroll-mt-24 transition-shadow duration-300 hover:shadow-md",
        styles.card
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              styles.iconWrap
            )}
          >
            <concern.icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className={cn("text-xs", styles.badge)}>
                {concern.area}
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl">
              {linkTitle ? (
                <Link
                  href={detailPath}
                  className="hover:text-primary hover:underline"
                >
                  {concern.title}
                </Link>
              ) : (
                concern.title
              )}
            </CardTitle>
            {concern.intro && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {concern.intro}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {concern.symptoms}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {showIllustration && concern.illustration && (
          <WomenRunnerIllustration
            id={concern.illustration}
            className="sm:ml-14"
          />
        )}

        {concern.symptomsList && concern.symptomsList.length > 0 && (
          <div
            className={cn(
              "rounded-xl border p-4 sm:ml-14",
              theme === "violet"
                ? "border-violet-500/15 bg-violet-500/[0.04]"
                : "border-sky-500/15 bg-sky-500/[0.04]"
            )}
          >
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Signs to watch for
            </h3>
            <ConcernList items={concern.symptomsList} bulletClassName={styles.bullet} />
          </div>
        )}

        {concern.quote && (
          <blockquote
            className={cn(
              "flex gap-3 rounded-xl border bg-background/60 p-4 sm:ml-14",
              styles.quoteBorder
            )}
          >
            <Quote
              className={cn("mt-0.5 size-4 shrink-0", styles.quoteIcon)}
              aria-hidden
            />
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              {concern.quote}
            </p>
          </blockquote>
        )}

        {concern.callout && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:ml-14">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {concern.callout}
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:ml-14 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/40 p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              How to avoid
            </h3>
            <ConcernList items={concern.avoid} bulletClassName={styles.bullet} />
          </div>
          <div className="rounded-xl bg-muted/40 p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              How to fix / recover
            </h3>
            <ConcernList items={concern.fix} bulletClassName={styles.bullet} />
          </div>
        </div>

        {concern.extraSections?.map((section) => (
          <div
            key={section.heading}
            className="rounded-xl bg-muted/30 p-4 sm:ml-14"
          >
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              {section.heading}
            </h3>
            <ConcernList items={section.items} bulletClassName={styles.bullet} />
          </div>
        ))}

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 sm:ml-14">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Stethoscope className="size-4 text-amber-600 dark:text-amber-500" />
            When to see a specialist
          </h3>
          <ul className="space-y-1.5">
            {concern.seeSpecialist.map((tip) => (
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

        {concern.readMore && concern.readMore.length > 0 && (
          <p className="text-sm sm:ml-14">
            <span className="text-muted-foreground">Related: </span>
            {concern.readMore.map((link, index) => (
              <span key={link.href}>
                {index > 0 && " · "}
                <Link
                  href={link.href}
                  className="font-medium text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        )}

        {showShare && (
          <div className="sm:ml-14">
            <InjuryShareButtons
              title={`${concern.title} — runner health guide`}
              path={detailPath}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function runnerConcernNavPillClass(theme: RunnerConcernTheme): string {
  return cn(
    "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors",
    themeStyles[theme].navPill
  );
}
