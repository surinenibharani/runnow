import type { BlogPost } from "@/lib/blog/types";
import { getBlogPostCanonicalUrl } from "@/lib/blog/urls";
import { emailLayout } from "@/lib/email/client";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { NewsletterTip } from "@/lib/newsletter/weekly-tips";

function tipReadMoreHref(tip: NewsletterTip): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (tip.blogSlug) return `${base}/blog/${tip.blogSlug}`;
  if (tip.href) return `${base}${tip.href.startsWith("/") ? tip.href : `/${tip.href}`}`;
  return `${base}/tips`;
}

function ctaButton(href: string, label: string): string {
  return `<p style="margin:24px 0 0;">
    <a href="${href}" style="display:inline-block;background:#ea580c;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;">
      ${label}
    </a>
  </p>`;
}

export function welcomeEmail(unsubscribeToken: string) {
  const planUrl = `${SITE_URL.replace(/\/$/, "")}/plan?plan=5k-8w#plan-tracker`;
  const preheader = "Weekly beginner tips and new blog posts — here's what to expect.";

  const body = `
    <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">Welcome to ${SITE_NAME}</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;">
      Thanks for subscribing. Here&apos;s what you can expect in your inbox — short, practical, and beginner-friendly.
    </p>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:18px 20px;">
      <h2 style="margin:0 0 14px;font-size:16px;line-height:1.35;">What you&apos;ll receive</h2>
      <ul style="margin:0;padding:0 0 0 18px;font-size:15px;line-height:1.7;color:#374151;">
        <li style="margin-bottom:10px;"><strong>Weekly beginner tip</strong> — one random, bite-sized running tip about once a week (pace, shoes, recovery, and more).</li>
        <li style="margin-bottom:10px;"><strong>New blog posts</strong> — an email when we publish a new article on training, nutrition, form, and gear.</li>
        <li style="margin-bottom:0;"><strong>No spam</strong> — only ${SITE_NAME} content. Unsubscribe anytime with one click.</li>
      </ul>
    </div>
    <p style="margin:20px 0 0;font-size:15px;line-height:1.6;color:#4b5563;">
      Your first weekly tip will arrive soon. In the meantime, you can start a free couch-to-5K plan in your browser — no app download required.
    </p>
    ${ctaButton(planUrl, "Start your free plan")}
  `;

  return {
    subject: `Welcome to ${SITE_NAME} — what to expect`,
    html: emailLayout({ preheader, body, unsubscribeToken }),
    text: `Welcome to ${SITE_NAME}

Thanks for subscribing. Here's what to expect:

- Weekly beginner tip — one random, bite-sized running tip about once a week.
- New blog posts — an email when we publish a new article.
- No spam — only ${SITE_NAME} content. Unsubscribe anytime.

Your first weekly tip will arrive soon.

Start your free plan: ${planUrl}`,
  };
}

export function weeklyTipEmail(tip: NewsletterTip, unsubscribeToken: string) {
  const readMore = tipReadMoreHref(tip);
  const preheader = tip.headline;

  const body = `
    <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">This week&apos;s beginner tip</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;">
      A quick nudge from ${SITE_NAME} — small habits add up.
    </p>
    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:16px 18px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#c2410c;text-transform:uppercase;letter-spacing:0.04em;">${tip.category}</p>
      <h2 style="margin:0 0 8px;font-size:18px;line-height:1.35;">${tip.headline}</h2>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#6b7280;font-style:italic;">${tip.title}</p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;">${tip.content}</p>
    </div>
    ${ctaButton(readMore, "Read more")}
  `;

  return {
    subject: tip.headline,
    html: emailLayout({ preheader, body, unsubscribeToken }),
    text: `${tip.headline}\n\n${tip.title}\n\n${tip.content}\n\nRead more: ${readMore}`,
  };
}

export function newPostEmail(post: BlogPost, unsubscribeToken: string) {
  const url = getBlogPostCanonicalUrl(post.slug);
  const preheader = post.excerpt;

  const body = `
    <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">New on the blog</h1>
    <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">${post.category}</p>
    <h2 style="margin:0 0 12px;font-size:20px;line-height:1.35;">${post.title}</h2>
    <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#4b5563;">${post.excerpt}</p>
    <p style="margin:0;font-size:13px;color:#9ca3af;">${post.readTime} read</p>
    ${ctaButton(url, "Read the post")}
  `;

  return {
    subject: `New post: ${post.title}`,
    html: emailLayout({ preheader, body, unsubscribeToken }),
    text: `${post.title}\n\n${post.excerpt}\n\nRead: ${url}`,
  };
}
