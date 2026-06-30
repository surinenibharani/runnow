import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormatBlogText } from "@/components/blog/format-blog-text";
import type { BlogSection } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

export function BlogSectionBlock({ section }: { section: BlogSection }) {
  return (
    <section
      id={section.id}
      className={cn(section.id && "scroll-mt-24", "space-y-4")}
    >
      {section.heading && (
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {section.heading}
        </h2>
      )}
      {section.paragraphs?.map((p) => (
        <p key={p} className="text-muted-foreground leading-relaxed">
          <FormatBlogText text={p} />
        </p>
      ))}
      {section.figures && section.figures.length > 0 && (
        <div
          className={cn(
            "grid gap-4",
            section.figures.length > 1 && "sm:grid-cols-2"
          )}
        >
          {section.figures.map((figure) => (
            <figure
              key={figure.src}
              className="overflow-hidden rounded-xl border border-border/60 bg-muted/20"
            >
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-primary/5 via-background to-muted/40 p-4">
                {figure.src.endsWith(".svg") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={figure.src}
                    alt={figure.alt}
                    className="absolute inset-0 h-full w-full object-contain p-3"
                  />
                ) : (
                  <Image
                    src={figure.src}
                    alt={figure.alt}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                )}
              </div>
              {figure.caption && (
                <figcaption className="border-t border-border/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                  {figure.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      {section.list && (
        <ul className="space-y-2">
          {section.list.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-muted-foreground leading-relaxed text-sm sm:text-base"
            >
              <span className="text-primary shrink-0 mt-1.5">·</span>
              <FormatBlogText text={item} />
            </li>
          ))}
        </ul>
      )}
      {section.subsections?.map((sub) => (
        <div
          key={sub.heading}
          className={
            sub.variant === "quote"
              ? "rounded-xl border border-border/60 border-l-4 border-l-primary/40 bg-muted/20 p-4 sm:p-5 space-y-3"
              : "rounded-xl border border-border/60 bg-muted/30 p-4 sm:p-5 space-y-3"
          }
        >
          {sub.variant !== "quote" && (
            <h3 className="font-semibold text-foreground">{sub.heading}</h3>
          )}
          {sub.paragraphs?.map((p) => (
            <p
              key={p}
              className={
                sub.variant === "quote"
                  ? "text-sm text-foreground leading-relaxed italic"
                  : "text-sm text-muted-foreground leading-relaxed"
              }
            >
              {sub.variant === "quote" ? (
                <>
                  “<FormatBlogText text={p} />”
                </>
              ) : (
                <FormatBlogText text={p} />
              )}
            </p>
          ))}
          {sub.variant === "quote" && (
            <p className="text-sm font-medium text-muted-foreground not-italic">
              {sub.heading}
            </p>
          )}
          {sub.list && (
            <ul className="space-y-1.5">
              {sub.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-primary shrink-0">·</span>
                  <FormatBlogText text={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {section.cta && (
        <Button
          nativeButton={false}
          render={<Link href={section.cta.href} />}
          size="lg"
          className="mt-2"
        >
          {section.cta.text}
        </Button>
      )}
    </section>
  );
}
