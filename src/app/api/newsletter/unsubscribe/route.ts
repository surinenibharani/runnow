import { NextResponse } from "next/server";
import { SITE_NAME } from "@/lib/site";
import { prisma } from "@/lib/prisma";

function unsubscribePageHtml(options: {
  title: string;
  heading: string;
  body: string;
  token?: string;
  showConfirm?: boolean;
}): string {
  const confirmForm =
    options.showConfirm && options.token
      ? `<form method="post" action="/api/newsletter/unsubscribe?token=${encodeURIComponent(options.token)}" style="margin-top: 1.5rem;">
  <button type="submit" style="cursor: pointer; border: 1px solid #ea580c; background: #ea580c; color: #fff; border-radius: 0.5rem; padding: 0.625rem 1rem; font-size: 0.875rem; font-weight: 600;">
    Confirm unsubscribe
  </button>
</form>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${options.title} — ${SITE_NAME}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 32rem; margin: 4rem auto; padding: 0 1rem; color: #111827; }
    h1 { font-size: 1.5rem; }
    p { line-height: 1.6; color: #4b5563; }
    a { color: #ea580c; }
  </style>
</head>
<body>
  <h1>${options.heading}</h1>
  ${options.body}
  ${confirmForm}
  <p style="margin-top: 1.5rem;"><a href="/">Back to ${SITE_NAME}</a></p>
</body>
</html>`;
}

async function findSubscriber(token: string) {
  return prisma.newsletterSubscriber.findUnique({
    where: { unsubscribeToken: token },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.json({ error: "Missing unsubscribe token." }, { status: 400 });
  }

  const subscriber = await findSubscriber(token);

  if (!subscriber) {
    return NextResponse.json({ error: "Invalid unsubscribe link." }, { status: 404 });
  }

  if (subscriber.unsubscribedAt) {
    return new NextResponse(
      unsubscribePageHtml({
        title: "Unsubscribed",
        heading: "You're already unsubscribed",
        body: `<p>You won't receive more tips or new-post emails from ${SITE_NAME}.</p>`,
      }),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  return new NextResponse(
    unsubscribePageHtml({
      title: "Confirm unsubscribe",
      heading: "Unsubscribe from email tips?",
      body: `<p>Click below to stop weekly tips and new-post emails from ${SITE_NAME}. This won't delete your account if you have one.</p>`,
      token,
      showConfirm: true,
    }),
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.json({ error: "Missing unsubscribe token." }, { status: 400 });
  }

  const subscriber = await findSubscriber(token);

  if (!subscriber) {
    return NextResponse.json({ error: "Invalid unsubscribe link." }, { status: 404 });
  }

  if (!subscriber.unsubscribedAt) {
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: { unsubscribedAt: new Date() },
    });
  }

  return new NextResponse(
    unsubscribePageHtml({
      title: "Unsubscribed",
      heading: "You're unsubscribed",
      body: `<p>You won't receive more tips or new-post emails from ${SITE_NAME}. You can always subscribe again from the site footer.</p>`,
    }),
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
