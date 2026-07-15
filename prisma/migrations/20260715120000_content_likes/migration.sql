-- CreateTable
CREATE TABLE "ContentLike" (
    "id" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetSlug" TEXT NOT NULL,
    "identityKey" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContentLike_targetType_targetSlug_idx" ON "ContentLike"("targetType", "targetSlug");

-- CreateIndex
CREATE UNIQUE INDEX "ContentLike_identityKey_targetType_targetSlug_key" ON "ContentLike"("identityKey", "targetType", "targetSlug");

-- AddForeignKey
ALTER TABLE "ContentLike" ADD CONSTRAINT "ContentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
