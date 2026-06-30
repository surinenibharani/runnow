import { SITE_URL } from "@/lib/site";

export function buildInjuryShareUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
