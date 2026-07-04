import Image from "next/image";
import { BRAND_MARK_PATH } from "@/lib/brand";
import { cn } from "@/lib/utils";

type StrideMarkProps = {
  className?: string;
};

/** Runner mark only (no wordmark). */
export function StrideMark({ className }: StrideMarkProps) {
  return (
    <Image
      src={BRAND_MARK_PATH}
      alt=""
      width={694}
      height={694}
      className={cn("h-full w-full object-contain", className)}
      unoptimized
      aria-hidden
    />
  );
}
