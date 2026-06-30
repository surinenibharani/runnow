/**
 * One-time migration: encrypt existing plaintext Strava tokens in the database.
 * Requires TOKEN_ENCRYPTION_KEY and DATABASE_URL in the environment.
 *
 * Usage: node scripts/encrypt-strava-tokens.mjs
 */
import { PrismaClient } from "@prisma/client";
import {
  createCipheriv,
  randomBytes,
} from "node:crypto";

const PREFIX = "enc1:";
const ALGORITHM = "aes-256-gcm";

function getEncryptionKey() {
  const raw = process.env.TOKEN_ENCRYPTION_KEY?.trim();
  if (!raw) {
    throw new Error("TOKEN_ENCRYPTION_KEY is required");
  }
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("TOKEN_ENCRYPTION_KEY must decode to 32 bytes");
  }
  return key;
}

function encryptStoredToken(plaintext, key) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return `${PREFIX}${Buffer.concat([iv, tag, encrypted]).toString("base64url")}`;
}

const prisma = new PrismaClient();

async function main() {
  const key = getEncryptionKey();
  const accounts = await prisma.stravaAccount.findMany({
    select: { userId: true, accessToken: true, refreshToken: true },
  });

  let updated = 0;
  for (const account of accounts) {
    if (
      account.accessToken.startsWith(PREFIX) &&
      account.refreshToken.startsWith(PREFIX)
    ) {
      continue;
    }

    await prisma.stravaAccount.update({
      where: { userId: account.userId },
      data: {
        accessToken: encryptStoredToken(account.accessToken, key),
        refreshToken: encryptStoredToken(account.refreshToken, key),
      },
    });
    updated += 1;
  }

  console.log(`Encrypted Strava tokens for ${updated} account(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
