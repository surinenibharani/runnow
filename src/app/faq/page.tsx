import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION = `Common questions about ${SITE_NAME} training plans, accounts, Strava sync, and getting started as a beginner runner.`;

const FAQ_ITEMS = [
  {
    question: "Do I need to download an app?",
    answer:
      "No. Training plans run in your browser. You can check off workouts on your phone or computer without installing anything.",
  },
  {
    question: "Are the training plans really free?",
    answer:
      "Yes. Couch to 5K through marathon plans are free. Optional coach tools and subscriptions are separate if you choose them later.",
  },
  {
    question: "Do I need an account?",
    answer:
      "You can start a plan as a guest. Creating an account saves progress across devices and unlocks the dashboard and Strava sync.",
  },
  {
    question: "What if I have to walk during runs?",
    answer:
      "Walk breaks are part of many beginner plans. Easy effort and consistency matter more than never walking.",
  },
  {
    question: "Is Strava required?",
    answer:
      "No. Strava is optional. Connect it from the dashboard if you want synced activities and deeper run stats.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No. Content is educational. If you have pain, a medical condition, or are returning after illness or pregnancy, check with a qualified clinician before starting or continuing a program.",
  },
  {
    question: "How do I get help with my account?",
    answer: `Email ${SUPPORT_EMAIL}. Include the email on your account so we can find it quickly.`,
  },
];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="py-12 sm:py-16">
      <JsonLd
        data={[
          webPageJsonLd({
            name: TITLE,
            description: DESCRIPTION,
            path: "/faq",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqPageJsonLd(FAQ_ITEMS, `${SITE_URL}/faq`),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        />

        <FadeIn className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            FAQ
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Short answers to the questions beginners ask most.
          </p>

          <div className="mt-10 space-y-6">
            {FAQ_ITEMS.map((item) => (
              <section
                key={item.question}
                className="border-b border-border/60 pb-6 last:border-0"
              >
                <h2 className="text-lg font-semibold tracking-tight">
                  {item.question}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            Still stuck?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{" "}
            or{" "}
            <Link href="/start" className="text-primary hover:underline">
              Start here
            </Link>{" "}
            if you don&apos;t know which plan fits.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
