-- AlterTable
ALTER TABLE "Activity" ADD COLUMN "elevationGain" DOUBLE PRECISION,
ADD COLUMN "averageCadence" DOUBLE PRECISION,
ADD COLUMN "sufferScore" INTEGER,
ADD COLUMN "workoutType" INTEGER;

-- AlterTable
ALTER TABLE "StravaAccount" ADD COLUMN "recentRunDistance" DOUBLE PRECISION,
ADD COLUMN "recentRunCount" INTEGER,
ADD COLUMN "ytdRunDistance" DOUBLE PRECISION,
ADD COLUMN "statsFetchedAt" TIMESTAMP(3),
ADD COLUMN "bestEffortsCache" JSONB;
