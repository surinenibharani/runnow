import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
  title: {
    default: "RunNow — Start Running Today",
    template: "%s | RunNow",
  },
  description:
    "Your friendly guide to becoming a runner. Free 8-week beginner plan, daily tips, and progress tracking to keep you coming back.",
  keywords: ["running", "beginner runner", "couch to 5k", "start running", "running plan"],
  openGraph: {
    title: "RunNow — Start Running Today",
    description: "From zero to your first 5K in 8 weeks. Free, simple, and built for beginners.",
    type: "website",
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
      className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
