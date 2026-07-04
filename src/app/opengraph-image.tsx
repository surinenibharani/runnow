import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_CAPTION, BRAND_LOGO_PATH } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — ${BRAND_CAPTION}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public", BRAND_LOGO_PATH.replace(/^\//, ""))
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fcff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={340}
          height={550}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
