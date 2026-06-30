import {
  decryptStoredToken,
  encryptStoredToken,
  isTokenEncryptionConfigured,
} from "@/lib/security/token-crypto";

export function readStoredToken(stored: string): string {
  return decryptStoredToken(stored);
}

export function writeStoredToken(plaintext: string): string {
  return encryptStoredToken(plaintext);
}

export function readStoredTokenPair(stored: {
  accessToken: string;
  refreshToken: string;
}): { accessToken: string; refreshToken: string } {
  return {
    accessToken: readStoredToken(stored.accessToken),
    refreshToken: readStoredToken(stored.refreshToken),
  };
}

export function writeStoredTokenPair(tokens: {
  accessToken: string;
  refreshToken: string;
}): { accessToken: string; refreshToken: string } {
  return {
    accessToken: writeStoredToken(tokens.accessToken),
    refreshToken: writeStoredToken(tokens.refreshToken),
  };
}

export async function maybeReencryptStravaTokens(userId: string): Promise<void> {
  if (!isTokenEncryptionConfigured()) return;

  const { prisma } = await import("@/lib/prisma");
  const account = await prisma.stravaAccount.findUnique({ where: { userId } });
  if (!account) return;

  if (
    account.accessToken.startsWith("enc1:") &&
    account.refreshToken.startsWith("enc1:")
  ) {
    return;
  }

  await prisma.stravaAccount.update({
    where: { userId },
    data: writeStoredTokenPair({
      accessToken: readStoredToken(account.accessToken),
      refreshToken: readStoredToken(account.refreshToken),
    }),
  });
}
