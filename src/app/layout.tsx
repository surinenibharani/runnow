import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { Suspense } from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import { GoogleAnalyticsScripts } from "@/components/analytics/google-analytics";
import { TurnstileScripts } from "@/components/security/turnstile-scripts";
import { GoogleAnalyticsPageView } from "@/components/analytics/page-view-tracker";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { BRAND_APPLE_ICON_PATH, BRAND_FAVICON_PATH, BRAND_ICON_PATH } from "@/lib/brand";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION, SITE_KEYWORDS } from "@/lib/site";
import { ogImageMeta } from "@/lib/seo/metadata";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: ogImageMeta(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [ogImageMeta()[0].url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: BRAND_FAVICON_PATH, sizes: "any" },
      { url: BRAND_ICON_PATH, type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: BRAND_APPLE_ICON_PATH, type: "image/png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <GoogleAnalyticsScripts nonce={nonce} />
        <TurnstileScripts nonce={nonce} />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <AuthProvider>
          <SkipLink />
          <Navbar />
          <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
