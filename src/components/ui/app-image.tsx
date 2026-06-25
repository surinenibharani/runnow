import Image, { type ImageProps } from "next/image";

type AppImageProps = Omit<ImageProps, "alt"> & {
  /** Required for accessibility. Use "" only when the image is purely decorative. */
  alt: string;
  /** When true, sets alt="" and aria-hidden (decorative only). */
  decorative?: boolean;
};

/**
 * Next.js Image wrapper that requires alt text for every photo/illustration asset.
 * Use `decorative` only when adjacent text fully describes the content.
 */
export function AppImage({
  alt,
  decorative = false,
  ...props
}: AppImageProps) {
  if (decorative && alt !== "") {
    throw new Error("AppImage: decorative images must use alt=\"\".");
  }

  return (
    <Image
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? true : undefined}
      {...props}
    />
  );
}
