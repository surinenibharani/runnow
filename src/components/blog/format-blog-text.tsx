import { Fragment } from "react";

const BOLD_PATTERN = /(\*\*[^*]+\*\*)/g;

/** Renders blog copy with `**bold**` markers as semantic strong text. */
export function FormatBlogText({ text }: { text: string }) {
  const parts = text.split(BOLD_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={index}
              className="font-semibold text-foreground"
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
