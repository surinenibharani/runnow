-- CreateTable
CREATE TABLE "DailyWellness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "sleepMinutes" INTEGER,
    "restingHeartRate" INTEGER,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyWellness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyWellness_userId_date_idx" ON "DailyWellness"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyWellness_userId_date_key" ON "DailyWellness"("userId", "date");

-- AddForeignKey
ALTER TABLE "DailyWellness" ADD CONSTRAINT "DailyWellness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
