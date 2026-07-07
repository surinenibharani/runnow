import Link from "next/link";
import { Fragment } from "react";
import {
  MEDICAL_DISCLAIMER_CLASS,
  MEDICAL_DISCLAIMER_SENTENCE_RE,
} from "@/lib/medical-disclaimer";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

function renderPlainTextWithDisclaimerBold(text: string, keyPrefix: string) {
  if (!text) return null;

  const disclaimerRe = new RegExp(MEDICAL_DISCLAIMER_SENTENCE_RE.source, "gi");
  const nodes: React.ReactNode[] = [];
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

/** Renders blog copy with `**bold**`, `[label](/path)` markers, and auto-bold disclaimers. */
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

        return (
          <Fragment key={index}>
            {renderPlainTextWithDisclaimerBold(part, String(index))}
          </Fragment>
        );
      })}
    </>
  );
}
