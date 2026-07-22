import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type ContentCopyrightNoticeProps = {
  className?: string;
  /** Page type shown in the notice, e.g. "article", "tip", "plan". */
  kind?: "article" | "tip" | "plan" | "content";
};

/**
 * Subtle ownership notice for educational pages (blog, tips, plans).
 */
export function ContentCopyrightNotice({
  className,
  kind = "content",
}: ContentCopyrightNoticeProps) {
  const label =
    kind === "article"
      ? "This article"
      : kind === "tip"
        ? "This tip"
        : kind === "plan"
          ? "This training plan"
          : "This content";

  return (
    <p
      className={cn(
        "text-xs leading-relaxed text-muted-foreground/90",
        className
      )}
    >
      {label} is © {new Date().getFullYear()} {SITE_NAME}. For personal use
      only — please don’t republish or scrape it for another site. See our{" "}
      <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
        Terms
      </Link>{" "}
      and{" "}
      <Link href="/dmca" className="underline underline-offset-2 hover:text-foreground">
        copyright / DMCA
      </Link>{" "}
      page.
    </p>
  );
}
