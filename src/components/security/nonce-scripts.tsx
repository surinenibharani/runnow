import { headers } from "next/headers";
import { GoogleAnalyticsScripts } from "@/components/analytics/google-analytics";
import { TurnstileScripts } from "@/components/security/turnstile-scripts";

/**
 * Reads the per-request CSP nonce. Isolated so the root layout shell
 * can stay free of `headers()` except through this Suspense boundary
 * (needed for Cache Components / PPR later).
 */
export async function NonceScripts() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <GoogleAnalyticsScripts nonce={nonce} />
      <TurnstileScripts nonce={nonce} />
    </>
  );
}
