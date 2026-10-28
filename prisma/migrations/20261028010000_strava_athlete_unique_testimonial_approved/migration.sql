-- Keep the newest Strava link when the same athlete was attached to two users.
DELETE FROM "StravaAccount" a
WHERE a.id IN (
  SELECT id FROM (
    SELECT id,
      ROW_NUMBER() OVER (
        PARTITION BY "athleteId"
        ORDER BY "updatedAt" DESC
      ) AS rn
    FROM "StravaAccount"
  ) ranked
  WHERE ranked.rn > 1
);

DROP INDEX IF EXISTS "StravaAccount_athleteId_idx";

CREATE UNIQUE INDEX "StravaAccount_athleteId_key" ON "StravaAccount"("athleteId");

-- Existing community stories stay public; new submissions need approval.
ALTER TABLE "Testimonial" ADD COLUMN "approved" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "Testimonial" ALTER COLUMN "approved" SET DEFAULT false;

CREATE INDEX "Testimonial_approved_createdAt_idx" ON "Testimonial"("approved", "createdAt");
