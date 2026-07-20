import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { Suspense } from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import { NonceScripts } from "@/components/security/nonce-scripts";
import { GoogleAnalyticsPageView } from "@/components/analytics/page-view-tracker";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { BRAND_APPLE_ICON_PATH, BRAND_FAVICON_PATH, BRAND_ICON_PATH } from "@/lib/brand";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION, SITE_KEYWORDS, TWITTER_HANDLE } from "@/lib/site";
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
    site: TWITTER_HANDLE,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [ogImageMeta()[0].url],
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} h-full max-w-full overflow-x-clip antialiased`}
    >
      <head>
        <Suspense fallback={null}>
          <NonceScripts />
        </Suspense>
      </head>
      <body className="min-h-full flex w-full max-w-full flex-col overflow-x-clip">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <AuthProvider>
          <SkipLink />
          <Navbar />
          <main
            id="main-content"
            className="min-w-0 w-full max-w-full flex-1 overflow-x-clip outline-none"
            tabIndex={-1}
          >
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
