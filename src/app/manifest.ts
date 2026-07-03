import type { MetadataRoute } from "next";
import { BRAND_APPLE_ICON_PATH, BRAND_ICON_PATH } from "@/lib/brand";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ea580c",
    icons: [
      { src: BRAND_ICON_PATH, type: "image/png", sizes: "512x512" },
      { src: BRAND_APPLE_ICON_PATH, type: "image/png", sizes: "180x180" },
    ],
  };
}
