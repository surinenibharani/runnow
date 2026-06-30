import { NextResponse } from "next/server";
import { SITE_NAME } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.json({ error: "Missing unsubscribe token." }, { status: 400 });
  }

  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { unsubscribeToken: token },
  });

  if (!subscriber) {
    return NextResponse.json({ error: "Invalid unsubscribe link." }, { status: 404 });
  }

  if (!subscriber.unsubscribedAt) {
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: { unsubscribedAt: new Date() },
    });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Unsubscribed — ${SITE_NAME}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 32rem; margin: 4rem auto; padding: 0 1rem; color: #111827; }
    h1 { font-size: 1.5rem; }
    p { line-height: 1.6; color: #4b5563; }
    a { color: #ea580c; }
  </style>
</head>
<body>
  <h1>You&apos;re unsubscribed</h1>
  <p>You won&apos;t receive more tips or new-post emails from ${SITE_NAME}. You can always subscribe again from the site footer.</p>
  <p><a href="/">Back to ${SITE_NAME}</a></p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
