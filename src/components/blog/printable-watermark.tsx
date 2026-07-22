import { BRAND_LOGO_PATH } from "@/lib/brand";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type PrintableWatermarkProps = {
  /**
   * `fixed` — overlays the viewport; browsers that support it repeat on every printed page.
   * `section` — overlays a `relative` parent (use on each week/page block as a fallback).
   */
  mode?: "fixed" | "section";
  className?: string;
};

/**
 * LetsRunNow logo + URL watermark for printable / PDF sheets.
 * Drawn above content at low opacity so opaque cards don’t hide it.
 */
export function PrintableWatermark({
  mode = "fixed",
  className,
}: PrintableWatermarkProps) {
  const host = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      aria-hidden
      className={cn(
        "print-watermark pointer-events-none flex flex-col items-center justify-center gap-2 overflow-hidden",
        mode === "fixed"
          ? "fixed inset-0 z-50"
          : "absolute inset-0 z-[5]",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BRAND_LOGO_PATH}
        alt=""
        className={cn(
          "print-watermark-img select-none w-auto max-w-[min(70%,22rem)] opacity-[0.09] print:opacity-[0.16]",
          mode === "fixed"
            ? "h-44 sm:h-56 print:h-60"
            : "h-40 sm:h-48 print:h-52"
        )}
        style={{
          // Inline fallback — some PDF engines drop Tailwind opacity utilities
          opacity: 0.14,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      />
      <p
        className="print-watermark-url select-none text-center text-[10px] font-medium tracking-wide text-foreground/25 print:text-[11px] print:text-foreground/35 sm:text-xs"
        style={{
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        {SITE_NAME} · {host} · Personal use only
      </p>
    </div>
  );
}
