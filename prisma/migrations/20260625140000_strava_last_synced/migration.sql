-- AlterTable
ALTER TABLE "StravaAccount" ADD COLUMN "lastSyncedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "StravaAccount_athleteId_idx" ON "StravaAccount"("athleteId");
