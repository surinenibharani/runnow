import Image from "next/image";
import Link from "next/link";
import { BRAND_CAPTION, BRAND_LOGO_PATH } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** @deprecated Full logo image always includes the wordmark and tagline. */
  showWordmark?: boolean;
  href?: string;
};

export function Logo({ className, href = "/" }: LogoProps) {
  const image = (
    <Image
      src={BRAND_LOGO_PATH}
      alt={`${SITE_NAME} — ${BRAND_CAPTION}`}
      width={627}
      height={795}
      className="h-12 w-auto bg-transparent object-contain sm:h-14"
      priority
      unoptimized
    />
  );

  if (!href) {
    return (
      <span className={cn("inline-flex items-center bg-transparent", className)}>
        {image}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label="LetsRunNow home"
      className={cn("inline-flex items-center bg-transparent", className)}
    >
      {image}
    </Link>
  );
}
