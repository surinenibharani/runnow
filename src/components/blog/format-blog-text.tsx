import Link from "next/link";
import { Fragment } from "react";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

/** Renders blog copy with `**bold**` and `[label](/path)` markers. */
export function FormatBlogText({ text }: { text: string }) {
  const parts = text.split(INLINE_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const linkMatch = part.match(LINK_PATTERN);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          const isInternal = href.startsWith("/");

          if (isInternal) {
            return (
              <Link
                key={index}
                href={href}
                className="font-medium text-primary hover:underline"
              >
                {label}
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={href}
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          );
        }

        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
