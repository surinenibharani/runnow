import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_LOGO_PATH } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

let logoDataUrl: string | null = null;

async function getLogoDataUrl(): Promise<string> {
  if (logoDataUrl) return logoDataUrl;
  const logoBytes = await readFile(
    join(process.cwd(), "public", BRAND_LOGO_PATH.replace(/^\//, ""))
  );
  logoDataUrl = `data:image/png;base64,${logoBytes.toString("base64")}`;
  return logoDataUrl;
}

export async function generatePostOgImage(opts: {
  title: string;
  category?: string;
}) {
  const logoSrc = await getLogoDataUrl();
  const displayTitle =
    opts.title.length > 90 ? `${opts.title.slice(0, 87)}…` : opts.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "linear-gradient(145deg, #f0f7ff 0%, #ffffff 55%, #f9fcff 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={120} height={82} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: 28, color: "#64748b", fontWeight: 600 }}>
            {SITE_NAME}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {opts.category && (
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {opts.category}
            </span>
          )}
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.15,
              maxWidth: "100%",
            }}
          >
            {displayTitle}
          </span>
        </div>
      </div>
    ),
    OG_IMAGE_SIZE
  );
}
