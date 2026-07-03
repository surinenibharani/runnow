import { BRAND_LOGO_PATH } from "@/lib/brand";

export function PrintableWatermark() {
  return (
    <div
      aria-hidden
      className="print-watermark pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <div className="flex select-none items-center justify-center opacity-[0.04] sm:opacity-[0.055] print:opacity-[0.08]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BRAND_LOGO_PATH}
          alt=""
          className="h-40 w-auto sm:h-52 print:h-56"
        />
      </div>
    </div>
  );
}
