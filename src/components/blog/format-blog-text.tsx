import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import {
  MEDICAL_DISCLAIMER_CLASS,
  MEDICAL_DISCLAIMER_SENTENCE_RE,
} from "@/lib/medical-disclaimer";
import { cn } from "@/lib/utils";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

const LINK_CLASS = "font-medium text-primary hover:underline";

function renderPlainTextWithDisclaimerBold(text: string, keyPrefix: string) {
  if (!text) return null;

  const disclaimerRe = new RegExp(MEDICAL_DISCLAIMER_SENTENCE_RE.source, "gi");
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let disclaimerIndex = 0;

  while ((match = disclaimerRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`${keyPrefix}-t-${lastIndex}`}>
          {text.slice(lastIndex, match.index)}
        </Fragment>
      );
    }

    nodes.push(
      <strong
        key={`${keyPrefix}-d-${disclaimerIndex++}`}
        className={MEDICAL_DISCLAIMER_CLASS}
      >
        {match[0]}
      </strong>
    );
    lastIndex = disclaimerRe.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <Fragment key={`${keyPrefix}-t-${lastIndex}`}>{text.slice(lastIndex)}</Fragment>
    );
  }

  return nodes.length > 0 ? nodes : text;
}

/** Same-page hashes and path+hash links need a native <a> so the browser scrolls to the id. */
export function isInPageOrHashHref(href: string): boolean {
  return href.startsWith("#") || (href.startsWith("/") && href.includes("#"));
}

export function isAppPathHref(href: string): boolean {
  return href.startsWith("/") && !href.includes("#");
}

type ContentLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Internal app routes via Next Link; in-page/#hash via native anchor for reliable scrolling. */
export function ContentLink({ href, children, className }: ContentLinkProps) {
  const classes = cn(LINK_CLASS, className);

  if (isInPageOrHashHref(href)) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  if (isAppPathHref(href)) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

/** Renders blog copy with `**bold**`, `[label](/path)` / `[label](#id)` markers, and auto-bold disclaimers. */
export function FormatBlogText({ text }: { text: string }) {
  const parts = text.split(INLINE_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className={MEDICAL_DISCLAIMER_CLASS}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        const linkMatch = part.match(LINK_PATTERN);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          return (
            <ContentLink key={index} href={href}>
              {label}
            </ContentLink>
          );
        }

        return (
          <Fragment key={index}>
            {renderPlainTextWithDisclaimerBold(part, String(index))}
          </Fragment>
        );
      })}
    </>
  );
}
