import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your information.`,
  path: "/privacy",
});

const LAST_UPDATED = "June 28, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`${SITE_NAME} respects your privacy. This policy explains what we collect, why we collect it, and the choices you have.`}
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          heading: "What we collect",
          list: [
            "Account info you provide: name, email, password (stored hashed), and optional profile details such as age, gender, weight, and height.",
            "Training data you save on the site: plan progress, wellness logs, and team membership if you use coach features.",
            "Strava data if you connect an account: activity summaries, heart rate, and route metadata synced via Strava’s API.",
            "Payment-related info if you subscribe: handled by Stripe; we do not store full card numbers.",
            "Blog comments you post, including display name and comment text.",
            "Basic usage data: page views and device/browser info via Google Analytics and Vercel Analytics.",
          ],
        },
        {
          heading: "How we use it",
          list: [
            "Provide training plans, dashboards, recovery insights, and account features you request.",
            "Sync and display your Strava activities when you opt in.",
            "Process subscriptions and manage billing through Stripe.",
            "Improve the site, fix bugs, and understand aggregate usage.",
            "Protect against abuse, spam, and unauthorized access.",
          ],
        },
        {
          heading: "What we share",
          paragraphs: [
            "We do not sell your personal information. We share data only with service providers that help us run the site — for example, hosting, authentication, Strava, Stripe, Cloudflare Turnstile, and analytics — and only as needed to provide the service.",
            "If you join a coach team, your coach may see training and activity data relevant to that team. Public blog comments are visible to other visitors.",
          ],
        },
        {
          heading: "Cookies & local storage",
          paragraphs: [
            "We use session cookies to keep you signed in, and analytics cookies/scripts to measure traffic. You can limit cookies in your browser settings; some features may not work without them.",
          ],
        },
        {
          heading: "Data retention & deletion",
          paragraphs: [
            "We keep your account data while your account is active. You can disconnect Strava, delete wellness entries, and remove comments where available. To delete your account or request data removal, contact us using the support channel listed on the site.",
          ],
        },
        {
          heading: "Your choices",
          list: [
            "Use the site without an account for basic training plans.",
            "Connect or disconnect Strava at any time from your dashboard.",
            "Update profile details in your account settings.",
            "Manage subscription billing through the Stripe customer portal.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            `${SITE_NAME} is not directed at children under 13. We do not knowingly collect personal information from children under 13.`,
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "We may update this policy from time to time. We will revise the “Last updated” date when we do. Continued use of the site after changes means you accept the updated policy.",
          ],
        },
      ]}
    />
  );
}
