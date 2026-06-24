-- CreateTable
CREATE TABLE "BlogComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postSlug" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BlogComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "BlogComment_postSlug_createdAt_idx" ON "BlogComment"("postSlug", "createdAt");
