/**
 * Curated @letsrunnowcoach Instagram posts — fallback when Graph API
 * credentials are missing or the live feed request fails.
 * Thumbnails live in public/instagram/ (stable; CDN URLs expire).
 *
 * Live auto-pull: set INSTAGRAM_ACCESS_TOKEN (+ INSTAGRAM_USER_ID).
 * See src/lib/instagram/fetch-posts.ts.
 */
export type InstagramPost = {
  id: string;
  /** Canonical post or reel URL on Instagram */
  url: string;
  headline: string;
  excerpt: string;
  /** Local path under public/, or remote Graph API media URL */
  image: string;
};

export const curatedInstagramPosts: InstagramPost[] = [
  {
    id: "DalLU68oBMJ",
    url: "https://www.instagram.com/reel/DalLU68oBMJ/",
    headline: "Ready to start running but not sure where to begin?",
    excerpt:
      "You're in the right place — no matter your level. Lace up and get started with us.",
    image: "/instagram/DalLU68oBMJ.jpg",
  },
  {
    id: "DalO9pyIBAE",
    url: "https://www.instagram.com/p/DalO9pyIBAE/",
    headline: "Running because you love food? Same!",
    excerpt:
      "No guilt, just gains — a fun push for beginners and anyone who needs a delicious reason to lace up.",
    image: "/instagram/DalO9pyIBAE.jpg",
  },
  {
    id: "DalQJktIJRy",
    url: "https://www.instagram.com/p/DalQJktIJRy/",
    headline: "Cold legs + speed = recipe for injury",
    excerpt:
      "Your warm-up is not optional. Take a few minutes now so your future self doesn't pay for it later.",
    image: "/instagram/DalQJktIJRy.jpg",
  },
  {
    id: "DalQXLuoJnM",
    url: "https://www.instagram.com/p/DalQXLuoJnM/",
    headline: "Easy days should feel easy",
    excerpt:
      "If you're gasping on an \"easy\" run, you're probably pushing too hard. Easy miles build the base without breaking you down.",
    image: "/instagram/DalQXLuoJnM.jpg",
  },
  {
    id: "DalRM5EoEjH",
    url: "https://www.instagram.com/p/DalRM5EoEjH/",
    headline: "Not sure which shoe drop is right for you?",
    excerpt:
      "Quick guide: 0mm more natural, 4–8mm balanced for most runners, 10–12mm more cushion and support.",
    image: "/instagram/DalRM5EoEjH.jpg",
  },
];
