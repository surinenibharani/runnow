/**
 * Live Instagram feed via Graph API (Business/Creator account).
 *
 * Required env:
 *   INSTAGRAM_ACCESS_TOKEN — long-lived Instagram or Page token
 *
 * Recommended:
 *   INSTAGRAM_USER_ID — IG professional account ID (or omit / use "me" with Instagram Login)
 *
 * Optional:
 *   INSTAGRAM_GRAPH_HOST — graph.instagram.com (default when user is "me") or graph.facebook.com
 *   INSTAGRAM_GRAPH_VERSION — e.g. v21.0
 *   INSTAGRAM_FEED_LIMIT — default 12
 *
 * Setup: Meta Developer app + Instagram professional account.
 * Docs: https://developers.facebook.com/docs/instagram-platform/
 */
import {
  curatedInstagramPosts,
  type InstagramPost,
} from "@/lib/instagram/posts";

const FEED_REVALIDATE_SECONDS = 3600;

type GraphMediaItem = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

type GraphMediaResponse = {
  data?: GraphMediaItem[];
  error?: { message?: string; type?: string; code?: number };
};

export function isInstagramFeedConfigured(): boolean {
  return Boolean(process.env.INSTAGRAM_ACCESS_TOKEN?.trim());
}

function graphRequestUrl(limit: number): string | null {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!token) return null;

  const userId = process.env.INSTAGRAM_USER_ID?.trim() || "me";
  const version = process.env.INSTAGRAM_GRAPH_VERSION?.trim() || "v21.0";
  const defaultHost =
    userId === "me" ? "graph.instagram.com" : "graph.facebook.com";
  const host = (
    process.env.INSTAGRAM_GRAPH_HOST?.trim() || defaultHost
  ).replace(/^https?:\/\//, "");

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  const params = new URLSearchParams({
    fields,
    limit: String(limit),
    access_token: token,
  });

  return `https://${host}/${version}/${userId}/media?${params}`;
}

function stripLeadingEmoji(text: string): string {
  return text
    .replace(
      /^(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\s]|[\u{1F1E0}-\u{1F1FF}])+/gu,
      ""
    )
    .trim();
}

function captionToCopy(caption: string | undefined): {
  headline: string;
  excerpt: string;
} {
  const lines = (caption ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (line) =>
        !line.startsWith("#") &&
        !/^follow\s+@/i.test(line) &&
        !/^visit\s+https?:\/\//i.test(line)
    );

  const headlineRaw = lines[0] ?? "View on Instagram";
  const headline = stripLeadingEmoji(headlineRaw) || headlineRaw;

  const rest = lines.slice(1).join(" ");
  let excerpt = rest;
  if (excerpt.length > 180) {
    const cut = excerpt.slice(0, 177);
    const lastSpace = cut.lastIndexOf(" ");
    excerpt = `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?-]+$/, "")}…`;
  }

  if (!excerpt) {
    excerpt = "Open this post on Instagram for the full tip.";
  }

  return { headline, excerpt };
}

function mediaImageUrl(item: GraphMediaItem): string | null {
  if (item.media_type === "VIDEO" || item.media_type === "CAROUSEL_ALBUM") {
    return item.thumbnail_url || item.media_url || null;
  }
  return item.media_url || item.thumbnail_url || null;
}

function toPost(item: GraphMediaItem): InstagramPost | null {
  const image = mediaImageUrl(item);
  const url = item.permalink?.trim();
  if (!image || !url) return null;

  const { headline, excerpt } = captionToCopy(item.caption);

  return {
    id: item.id,
    url,
    headline,
    excerpt,
    image,
  };
}

/**
 * Fetches recent media from the Graph API.
 * Returns null when not configured or the request fails (caller should fall back).
 */
export async function fetchInstagramFeed(
  limit = Number(process.env.INSTAGRAM_FEED_LIMIT?.trim() || 12)
): Promise<InstagramPost[] | null> {
  const requestUrl = graphRequestUrl(Math.min(Math.max(limit, 1), 25));
  if (!requestUrl) return null;

  try {
    const res = await fetch(requestUrl, {
      next: { revalidate: FEED_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    const json = (await res.json()) as GraphMediaResponse;

    if (!res.ok || json.error) {
      console.error(
        "[instagram] Graph API error:",
        json.error?.message ?? res.statusText
      );
      return null;
    }

    const posts = (json.data ?? [])
      .map(toPost)
      .filter((post): post is InstagramPost => post !== null);

    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.error("[instagram] Failed to fetch feed:", error);
    return null;
  }
}

/** Live feed when configured, otherwise curated fallback posts. */
export async function getInstagramGridPosts(): Promise<{
  posts: InstagramPost[];
  source: "live" | "curated";
}> {
  if (!isInstagramFeedConfigured()) {
    return { posts: curatedInstagramPosts, source: "curated" };
  }

  const live = await fetchInstagramFeed();
  if (live?.length) {
    return { posts: live, source: "live" };
  }

  return { posts: curatedInstagramPosts, source: "curated" };
}
