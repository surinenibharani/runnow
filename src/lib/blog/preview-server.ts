import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  BLOG_PREVIEW_COOKIE,
  createPreviewSessionValue,
  hasBlogPreviewAccess,
  isValidPreviewSecret,
  previewSessionCookieOptions,
} from "./preview-session";

const PREVIEW_MAX_AGE_SEC = 24 * 60 * 60;

/** Legacy `?preview=` query support — exchanges secret for HttpOnly cookie, then redirects. */
export async function bootstrapBlogPreview(
  previewToken: string | null | undefined,
  redirectPath: string
): Promise<boolean> {
  if (process.env.NODE_ENV === "development") return true;

  if (previewToken && isValidPreviewSecret(previewToken)) {
    const secret = process.env.BLOG_PREVIEW_SECRET!.trim();
    const cookieStore = await cookies();
    cookieStore.set(
      BLOG_PREVIEW_COOKIE,
      createPreviewSessionValue(secret),
      previewSessionCookieOptions(PREVIEW_MAX_AGE_SEC)
    );
    redirect(redirectPath);
  }

  return hasBlogPreviewAccess();
}

export { hasBlogPreviewAccess, isValidPreviewSecret } from "./preview-session";
