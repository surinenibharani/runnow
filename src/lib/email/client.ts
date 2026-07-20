import { BRAND_CAPTION, BRAND_LOGO_PATH } from "@/lib/brand";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type SendEmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

/** Resend allows this sender without a verified custom domain (often limited to account inbox). */
const RESEND_ONBOARDING_FROM = "LetsRunNow <onboarding@resend.dev>";

function getFromAddress(): string | null {
  const from = process.env.EMAIL_FROM?.trim();
  return from || null;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && getFromAddress());
}

function isUnverifiedDomainError(status: number, body: string): boolean {
  return (
    status === 400 &&
    body.includes("domain") &&
    body.toLowerCase().includes("not verified")
  );
}

async function postResendEmail(
  apiKey: string,
  from: string,
  input: SendEmailInput
): Promise<{ ok: true; id?: string } | { ok: false; status: number; body: string }> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    return { ok: false, status: response.status, body };
  }

  const data = (await response.json()) as { id?: string };
  return { ok: true, id: data.id };
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = getFromAddress();

  if (!apiKey || !from) {
    console.warn("[email] RESEND_API_KEY or EMAIL_FROM not configured — skipping send");
    return { ok: false, error: "Email not configured" };
  }

  const primary = await postResendEmail(apiKey, from, input);
  if (primary.ok) {
    return { ok: true, id: primary.id };
  }

  console.error("[email] Resend error:", primary.status, primary.body);

  // Custom domain often unverified on fresh Resend keys — retry via Resend's onboarding sender.
  if (
    isUnverifiedDomainError(primary.status, primary.body) &&
    !from.includes("onboarding@resend.dev")
  ) {
    console.warn(
      `[email] EMAIL_FROM domain not verified — retrying via ${RESEND_ONBOARDING_FROM}. Verify letsrunnow.com in Resend for branded sends.`
    );
    const fallback = await postResendEmail(apiKey, RESEND_ONBOARDING_FROM, input);
    if (fallback.ok) {
      return { ok: true, id: fallback.id };
    }
    console.error("[email] Resend fallback error:", fallback.status, fallback.body);
    return {
      ok: false,
      error:
        "Resend domain not verified and onboarding@resend.dev fallback failed — verify EMAIL_FROM in Resend (or confirm COMMENT_NOTIFY_EMAIL matches your Resend account email)",
    };
  }

  if (isUnverifiedDomainError(primary.status, primary.body)) {
    return {
      ok: false,
      error:
        "Resend domain not verified — verify the EMAIL_FROM domain in Resend, or create an API key with full access",
    };
  }

  return { ok: false, error: "Failed to send email" };
}

export function unsubscribeUrl(token: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  return `${base}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

export function emailLayout({
  preheader,
  body,
  unsubscribeToken,
}: {
  preheader: string;
  body: string;
  unsubscribeToken?: string;
}): string {
  const footer = unsubscribeToken
    ? `<p style="margin:32px 0 0;font-size:12px;color:#6b7280;line-height:1.5;">
        You&apos;re receiving this because you subscribed at ${SITE_NAME}.
        <a href="${unsubscribeUrl(unsubscribeToken)}" style="color:#6b7280;">Unsubscribe</a>
      </p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
  <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;padding:28px 24px;">
          <tr>
            <td>
              <p style="margin:0 0 20px;">
                <img src="${SITE_URL.replace(/\/$/, "")}${BRAND_LOGO_PATH}" alt="${SITE_NAME} — ${BRAND_CAPTION}" width="140" height="97" style="display:block;width:140px;height:auto;border:0;" />
              </p>
              ${body}
              ${footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
