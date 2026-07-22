import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Copyright & DMCA",
  description: `How ${SITE_NAME} protects its content, and how to report copyright infringement.`,
  path: "/dmca",
});

const LAST_UPDATED = "July 22, 2026";
const siteHost = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function DmcaPage() {
  return (
    <LegalPage
      title="Copyright & DMCA"
      description={`${SITE_NAME} owns its original writing, training plans, tips, and branding. This page explains what’s protected, how we monitor copies, and how to send a takedown notice.`}
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          heading: "Our content",
          paragraphs: [
            `Original blog posts, tips, training plans, quizzes, printable trackers, graphics, and branding on ${siteHost} are owned by ${SITE_NAME} unless otherwise noted. You may read, share links, and use plans for your own personal training.`,
            "You may not copy, republish, scrape, mirror, or commercially reuse our wording, plan structures, or tip libraries on another site or product without written permission — including feeding our content into datasets or AI systems for redistribution.",
          ],
        },
        {
          heading: "How we watch for copies",
          list: [
            "Search distinctive phrases from our posts in Google (in quotes) every few weeks.",
            "Check Google Search Console for sudden ranking drops that might signal scraped duplicates.",
            "Run `npm run content:copy-check` locally to print sample search queries from our catalog.",
            "Review printables and Instagram graphics for missing watermarks when we publish new ones.",
          ],
        },
        {
          heading: "If you find a copy",
          paragraphs: [
            `Email ${SUPPORT_EMAIL} with the copied URL, our original URL, and a short description. We usually start with a polite takedown request to the site owner, then escalate to their host or Google’s DMCA process when needed.`,
          ],
        },
        {
          heading: "DMCA notice template",
          paragraphs: [
            "If you are the copyright owner (or an authorized agent) and need to send a formal notice about material hosted by us or about our material hosted elsewhere, include the items below. We respond to valid notices in good faith.",
          ],
          list: [
            "Your full legal name, mailing address, phone number, and email.",
            "A description of the copyrighted work (title + original URL on LetsRunNow when applicable).",
            "The exact URL(s) of the allegedly infringing material.",
            "A statement that you have a good-faith belief the use is not authorized by the owner, its agent, or the law.",
            "A statement, under penalty of perjury, that the information in the notice is accurate and that you are the owner or authorized to act for the owner.",
            "Your physical or electronic signature (typing your full name is fine for email).",
          ],
        },
        {
          heading: "Where to send notices",
          paragraphs: [
            `Copyright / DMCA agent email: ${SUPPORT_EMAIL}`,
            `Subject line suggestion: “DMCA notice — ${SITE_NAME}”`,
            "For copies on other sites: also file with that site’s host and, if indexed, Google’s copyright removal tools after you have a valid notice.",
          ],
        },
        {
          heading: "Counter-notice",
          paragraphs: [
            "If your material was removed from LetsRunNow because of a DMCA notice and you believe it was a mistake or misidentification, email a counter-notice to the same address with your contact details, the removed material, a good-faith statement under penalty of perjury, consent to jurisdiction of an appropriate federal court, and your signature.",
          ],
        },
        {
          heading: "Repeat infringement",
          paragraphs: [
            "We may suspend or terminate accounts that repeatedly post infringing content or that scrape/republish our materials in violation of our Terms.",
          ],
        },
      ]}
    />
  );
}
