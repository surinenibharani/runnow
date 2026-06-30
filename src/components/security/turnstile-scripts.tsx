import Script from "next/script";

const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileScriptsProps = {
  nonce?: string;
};

export function TurnstileScripts({ nonce }: TurnstileScriptsProps) {
  const configured =
    process.env.NODE_ENV !== "development" &&
    process.env.NEXT_PUBLIC_TURNSTILE_CONFIGURED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  if (!configured) return null;

  return (
    <Script
      id="cloudflare-turnstile"
      src={TURNSTILE_SCRIPT}
      strategy="lazyOnload"
      nonce={nonce}
    />
  );
}
