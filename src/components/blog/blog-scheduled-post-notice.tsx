import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type BlogScheduledPostNoticeProps = {
  title: string;
  category: string;
  excerpt: string;
  publishSchedule: string;
};

/** Public soft landing for posts that exist but are not live yet. */
export function BlogScheduledPostNotice({
  title,
  category,
  excerpt,
  publishSchedule,
}: BlogScheduledPostNoticeProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Coming soon" },
        ]}
      />

      <div
        className="mt-8 rounded-2xl border border-border/70 bg-muted/20 px-6 py-10 text-center sm:px-10"
        role="status"
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarClock className="size-6" aria-hidden />
        </div>
        <p className="mt-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {category} · Coming soon
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
          This article isn&apos;t live yet. It will publish on{" "}
          <strong className="font-semibold text-foreground">
            {publishSchedule}
          </strong>
          .
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
          {excerpt}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/blog" />}>
            Browse live posts
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/start" />}
            variant="outline"
          >
            Start here
          </Button>
        </div>
      </div>
    </div>
  );
}
