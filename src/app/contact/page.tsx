import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/site";

const TITLE = "Contact";
const DESCRIPTION = `Get in touch with ${SITE_NAME} for account help, content questions, or partnership inquiries.`;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: `${TITLE} — ${SITE_NAME}`,
            description: DESCRIPTION,
            path: "/contact",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

        <FadeIn className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Questions about your account, training plans, or the site? Email us
            and we&apos;ll get back as soon as we can.
          </p>

          <div className="mt-8 rounded-xl border border-border/70 bg-muted/20 px-6 py-8">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-2 inline-block text-xl font-semibold text-primary hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              For billing issues on a coach subscription, use the Stripe
              customer portal from your dashboard after signing in. For medical
              questions, talk to a clinician — we can&apos;t diagnose or treat
              injuries by email.
            </p>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Looking for quick answers? See the{" "}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>{" "}
            or start with{" "}
            <Link href="/start" className="text-primary hover:underline">
              Find your plan
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
