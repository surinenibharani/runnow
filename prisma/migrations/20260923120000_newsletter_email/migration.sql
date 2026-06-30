-- AlterTable
ALTER TABLE "NewsletterSubscriber" ADD COLUMN "newPosts" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "NewsletterSubscriber" ADD COLUMN "unsubscribedAt" TIMESTAMP(3);
ALTER TABLE "NewsletterSubscriber" ADD COLUMN "lastWeeklyTipAt" TIMESTAMP(3);
ALTER TABLE "NewsletterSubscriber" ADD COLUMN "unsubscribeToken" TEXT;

UPDATE "NewsletterSubscriber"
SET "unsubscribeToken" = md5(random()::text || clock_timestamp()::text || id)
WHERE "unsubscribeToken" IS NULL;

ALTER TABLE "NewsletterSubscriber" ALTER COLUMN "unsubscribeToken" SET NOT NULL;

CREATE UNIQUE INDEX "NewsletterSubscriber_unsubscribeToken_key" ON "NewsletterSubscriber"("unsubscribeToken");

-- CreateTable
CREATE TABLE "NewsletterPostSent" (
    "postSlug" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterPostSent_pkey" PRIMARY KEY ("postSlug")
);
