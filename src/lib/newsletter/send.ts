import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { getBlogPostPublishInstant } from "@/lib/blog/publish-schedule";
import type { BlogPost } from "@/lib/blog/types";
import { sendEmail, isEmailConfigured } from "@/lib/email/client";
import {
  newPostEmail,
  weeklyTipEmail,
  welcomeEmail,
} from "@/lib/email/templates";
import { pickRandomNewsletterTip } from "@/lib/newsletter/tips";
import { prisma } from "@/lib/prisma";
import type { NewsletterTip } from "@/lib/newsletter/weekly-tips";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const NEW_POST_WINDOW_MS = 48 * 60 * 60 * 1000;

type Subscriber = {
  id: string;
  email: string;
  weeklyTips: boolean;
  newPosts: boolean;
  unsubscribeToken: string;
};

export async function sendWelcomeNewsletter(email: string): Promise<boolean> {
  if (!isEmailConfigured()) return false;

  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  });

  if (!subscriber || subscriber.unsubscribedAt) return false;

  const message = welcomeEmail(subscriber.unsubscribeToken);
  const result = await sendEmail({
    to: subscriber.email,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });

  return result.ok;
}

async function sendTipToSubscriber(subscriber: Subscriber, tip: NewsletterTip) {
  const message = weeklyTipEmail(tip, subscriber.unsubscribeToken);
  return sendEmail({
    to: subscriber.email,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

async function sendPostToSubscriber(subscriber: Subscriber, post: BlogPost) {
  const message = newPostEmail(post, subscriber.unsubscribeToken);
  return sendEmail({
    to: subscriber.email,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

export async function runNewsletterCron(now = new Date()) {
  if (!isEmailConfigured()) {
    return {
      ok: false,
      error: "Email not configured",
      weeklyTipsSent: 0,
      newPostsSent: 0,
    };
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { unsubscribedAt: null },
    select: {
      id: true,
      email: true,
      weeklyTips: true,
      newPosts: true,
      unsubscribeToken: true,
      lastWeeklyTipAt: true,
    },
  });

  let weeklyTipsSent = 0;
  let newPostsSent = 0;

  const weeklyRecipients = subscribers.filter((subscriber) => {
    if (!subscriber.weeklyTips) return false;
    if (!subscriber.lastWeeklyTipAt) return true;
    return now.getTime() - subscriber.lastWeeklyTipAt.getTime() >= WEEK_MS;
  });

  if (weeklyRecipients.length > 0) {
    const tip = pickRandomNewsletterTip();
    for (const subscriber of weeklyRecipients) {
      const result = await sendTipToSubscriber(subscriber, tip);
      if (result.ok) {
        weeklyTipsSent += 1;
        await prisma.newsletterSubscriber.update({
          where: { id: subscriber.id },
          data: { lastWeeklyTipAt: now },
        });
      }
    }
  }

  const sentSlugs = new Set(
    (await prisma.newsletterPostSent.findMany({ select: { postSlug: true } })).map(
      (row) => row.postSlug
    )
  );

  const recentPosts = getPublishedBlogPosts(now).filter((post) => {
    if (sentSlugs.has(post.slug)) return false;
    const publishedAt = getBlogPostPublishInstant(post.publishedAt);
    return now.getTime() - publishedAt <= NEW_POST_WINDOW_MS;
  });

  const postRecipients = subscribers.filter((subscriber) => subscriber.newPosts);

  for (const post of recentPosts) {
    let postDeliveries = 0;

    for (const subscriber of postRecipients) {
      const result = await sendPostToSubscriber(subscriber, post);
      if (result.ok) postDeliveries += 1;
    }

    if (postDeliveries > 0) {
      await prisma.newsletterPostSent.upsert({
        where: { postSlug: post.slug },
        create: { postSlug: post.slug },
        update: { sentAt: now },
      });
      newPostsSent += postDeliveries;
    }
  }

  return {
    ok: true,
    weeklyTipsSent,
    newPostsSent,
    postsNotified: recentPosts.map((post) => post.slug),
  };
}
