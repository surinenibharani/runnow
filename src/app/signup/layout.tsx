import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sign Up",
  description: "Create a free LetsRunNow account to track training plans and connect Strava.",
  path: "/signup",
  noindex: true,
});

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
