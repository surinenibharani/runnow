/** @typedef {{ slug: string; title: string; keywords: string[] }} GearCategoryMapEntry */

/** @type {GearCategoryMapEntry[]} */
export const GEAR_CATEGORY_MAP = [
  {
    slug: "shoes",
    title: "Running Shoes",
    keywords: [
      "shoe",
      "shoes",
      "trainer",
      "trainers",
      "sneaker",
      "footwear",
      "brooks",
      "hoka",
      "saucony",
      "asics",
      "nike peg",
      "new balance",
    ],
  },
  {
    slug: "shirts",
    title: "Shirts & Tops",
    keywords: [
      "shirt",
      "shirts",
      "top",
      "tee",
      "jersey",
      "singlet",
      "apparel",
      "sports bra",
      "run bra",
      "oiselle",
      "women's",
    ],
  },
  {
    slug: "bottoms",
    title: "Shorts & Bottoms",
    keywords: ["shorts", "bottoms", "skirt", "2-in-1"],
  },
  {
    slug: "tights",
    title: "Tights & Leggings",
    keywords: ["tights", "leggings", "tight", "compression pants"],
  },
  {
    slug: "apple-watch",
    title: "Apple Watch",
    keywords: ["apple watch", "watchos", "ultra 2", "series 10", "series 11"],
  },
  {
    slug: "garmin",
    title: "Garmin",
    keywords: ["garmin", "forerunner", "fenix", "epix"],
  },
  {
    slug: "coros",
    title: "Coros",
    keywords: ["coros", "pace 3", "apex"],
  },
  {
    slug: "strava-app",
    title: "Strava App",
    keywords: ["strava", "running app", "gps app"],
  },
  {
    slug: "cap",
    title: "Caps & Headwear",
    keywords: ["cap", "hat", "headwear", "visor", "beanie", "headband"],
  },
  {
    slug: "goggles",
    title: "Sunglasses",
    keywords: ["sunglasses", "eyewear", "goodr", "shades", "goggles"],
  },
  {
    slug: "sunscreen",
    title: "Sunscreen",
    keywords: ["sunscreen", "spf", "sun protection", "uv"],
  },
  {
    slug: "chafing-creams",
    title: "Chafing Creams",
    keywords: ["chafe", "chafing", "anti-chafe", "body glide", "balm"],
  },
  {
    slug: "hydration-tablets",
    title: "Hydration Tablets",
    keywords: [
      "electrolyte",
      "hydration tablet",
      "nuun",
      "lmnt",
      "saltstick",
    ],
  },
  {
    slug: "gels",
    title: "Energy Gels",
    keywords: ["gel", "gels", "fuel", "nutrition", "maurten", "gu energy"],
  },
  {
    slug: "hydration-packs",
    title: "Hydration Packs",
    keywords: [
      "hydration pack",
      "hydration vest",
      "running vest",
      "salomon",
      "bladder",
      "flask",
    ],
  },
];

export const GEAR_CATEGORY_SLUGS = GEAR_CATEGORY_MAP.map((category) => category.slug);

const DEFAULT_CATEGORY = GEAR_CATEGORY_MAP[0];

/**
 * @param {string} text
 * @returns {GearCategoryMapEntry}
 */
export function categorizeGearText(text) {
  const lower = text.toLowerCase();
  let best = DEFAULT_CATEGORY;
  let bestScore = 0;

  for (const category of GEAR_CATEGORY_MAP) {
    let score = 0;
    for (const keyword of category.keywords) {
      if (lower.includes(keyword)) score += keyword.includes(" ") ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = category;
    }
  }

  return bestScore > 0 ? best : DEFAULT_CATEGORY;
}
