import type { AdaptiveBrief } from "@/lib/adaptive-brief";

export type AdaptivePolishResult = {
  headline: string;
  body: string;
  polished: boolean;
  provider: "openai" | "none";
};

/**
 * Optional LLM polish for the adaptive brief.
 * Uses OPENAI_API_KEY when set; otherwise returns the rule-based copy unchanged.
 * Never invents metrics — only rewrites tone from structured context.
 */
export async function polishAdaptiveBrief(
  brief: AdaptiveBrief
): Promise<AdaptivePolishResult> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return {
      headline: brief.headline,
      body: brief.body,
      polished: false,
      provider: "none",
    };
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const system = `You are a calm beginner-running coach for LetsRunNow.
Rewrite the headline (max 12 words) and body (max 2 sentences) to sound warm and specific.
Do NOT invent numbers, diagnoses, or gear brands.
Keep the same action intent. Return JSON: {"headline":"...","body":"..."}`;

  const user = JSON.stringify({
    headline: brief.headline,
    body: brief.body,
    action: brief.action,
    reasons: brief.reasons,
    todayWorkout: brief.todayWorkout,
    confidence: brief.confidence,
  });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return {
        headline: brief.headline,
        body: brief.body,
        polished: false,
        provider: "none",
      };
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data.choices?.[0]?.message?.content;
    if (!raw) {
      return {
        headline: brief.headline,
        body: brief.body,
        polished: false,
        provider: "none",
      };
    }

    const parsed = JSON.parse(raw) as { headline?: string; body?: string };
    if (!parsed.headline?.trim() || !parsed.body?.trim()) {
      return {
        headline: brief.headline,
        body: brief.body,
        polished: false,
        provider: "none",
      };
    }

    return {
      headline: parsed.headline.trim().slice(0, 120),
      body: parsed.body.trim().slice(0, 500),
      polished: true,
      provider: "openai",
    };
  } catch {
    return {
      headline: brief.headline,
      body: brief.body,
      polished: false,
      provider: "none",
    };
  }
}

export function isAdaptiveAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
