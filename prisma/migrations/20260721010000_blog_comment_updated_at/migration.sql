-- AlterTable
ALTER TABLE "BlogComment" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "BlogComment" SET "updatedAt" = "createdAt";
