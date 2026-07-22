import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `Terms for using ${SITE_NAME} training plans, dashboard, and related features.`,
  path: "/terms",
});

const LAST_UPDATED = "July 22, 2026";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description={`By using ${SITE_NAME}, you agree to these terms. Please read them — they’re written in plain language on purpose.`}
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          heading: "Using the service",
          paragraphs: [
            `${SITE_NAME} provides beginner-friendly training plans, educational content, and optional tools to track progress. You may use the site for personal, non-commercial purposes unless we agree otherwise in writing.`,
            "You are responsible for your account credentials and for activity under your account.",
          ],
        },
        {
          heading: "Our content & copyright",
          paragraphs: [
            `Blog posts, tips, training plans, quizzes, printable trackers, graphics, logos, and other original materials on ${SITE_NAME} are owned by ${SITE_NAME} (or its licensors) and protected by copyright and related laws.`,
            "You may access content for your own personal training and share links to our pages. You may not copy, scrape, mirror, republish, sell, or commercially reuse our wording, plan structures, tip libraries, or branding on another website, app, newsletter, or product without prior written permission.",
            "Automated collection of our content for search indexing by mainstream search engines is allowed as described in robots.txt. Using our content to train, fine-tune, or redistribute AI / machine-learning models or datasets without written permission is not allowed.",
            "Copyright questions and takedown requests: see our Copyright & DMCA page at /dmca.",
          ],
        },
        {
          heading: "Not medical advice",
          paragraphs: [
            "Training plans, tips, blog posts, and dashboard insights are for general fitness education only. They are not medical advice, diagnosis, or treatment. Consult a physician before starting or changing an exercise program, especially if you have health conditions, are pregnant, or have not been active recently.",
          ],
        },
        {
          heading: "Accounts & subscriptions",
          list: [
            "You must provide accurate registration information and keep it up to date.",
            "Paid features, if offered, are billed through Stripe under the pricing shown at checkout.",
            "Subscriptions renew automatically unless canceled through the billing portal before the renewal date.",
            "We may suspend or terminate accounts that violate these terms or abuse the service.",
          ],
        },
        {
          heading: "Third-party integrations",
          paragraphs: [
            "If you connect Strava or other third-party services, their terms and privacy policies also apply. We are not responsible for third-party outages, data handling, or policy changes.",
          ],
        },
        {
          heading: "Your content",
          paragraphs: [
            "You retain ownership of content you submit, such as blog comments. You grant us a limited license to display and store that content to operate the service. Do not post unlawful, harassing, spam, or misleading content.",
          ],
        },
        {
          heading: "Acceptable use",
          list: [
            "Do not attempt to break, scrape at abusive rates, overload, mirror, or reverse engineer the site.",
            "Do not republish our posts, tips, or plans on other sites or feed them into AI datasets without permission.",
            "Do not use the service to harm others or violate applicable laws.",
            "Do not misrepresent your identity or impersonate others.",
          ],
        },
        {
          heading: "Disclaimers",
          paragraphs: [
            `${SITE_NAME} is provided “as is” without warranties of any kind. We do not guarantee uninterrupted service, error-free data, or specific fitness outcomes. Running and training involve inherent risk; you assume those risks when you participate.`,
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, LetsRunNow and its operators are not liable for indirect, incidental, or consequential damages arising from your use of the site, including injury, lost data, or missed training goals.",
          ],
        },
        {
          heading: "Changes & contact",
          paragraphs: [
            "We may update these terms from time to time. Material changes will be reflected in the “Last updated” date. Continued use after changes constitutes acceptance.",
            "Questions about these terms, privacy, or copyright can be sent through the support contact listed on the site, or via /dmca for infringement notices.",
          ],
        },
      ]}
    />
  );
}
