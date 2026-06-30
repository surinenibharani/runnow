import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  Footprints,
  Glasses,
  Package,
  Shield,
  Shirt,
  Smartphone,
  Sun,
  Tablet,
  Watch,
  Zap,
} from "lucide-react";

export type GearSuggestion = {
  name: string;
  note: string;
};

export type GearTier = "start-here" | "level-up";

export type GearCategory = {
  slug: string;
  title: string;
  icon: LucideIcon;
  group: "Apparel" | "Hydration & Fuel" | "Accessories" | "Tracking & Apps";
  tier: GearTier;
  /** Typical spend for a solid beginner pick, e.g. "$25–45" or "Free" */
  priceRange: string;
  /** Body types, conditions, or situations this category suits best */
  bestFor: string[];
  summary: string;
  whenYouNeedIt: string;
  whatToLookFor: string[];
  suggestions: GearSuggestion[];
  /** Women-specific product picks when this category has meaningful options */
  womenSuggestions?: GearSuggestion[];
  pros?: string[];
  cons?: string[];
};

export type GearTierSuggestion = {
  name: string;
  note: string;
  price: string;
  /** Links to the full category card on this page */
  categorySlug: string;
};

export const gearTierMeta: Record<
  GearTier,
  {
    title: string;
    description: string;
    suggestionsIntro: string;
    suggestions: GearTierSuggestion[];
  }
> = {
  "start-here": {
    title: "Start Here (Essentials)",
    description:
      "Shoes first, then budget-friendly layers and free tools — most add-ons stay under $100 once you have footwear sorted.",
    suggestionsIntro:
      "A sensible first kit — shoes are the main spend; the rest can stay near $100 combined (Strava is free).",
    suggestions: [
      {
        name: "Brooks Ghost",
        note: "Forgiving daily trainer — buy these before your first real run.",
        price: "$140",
        categorySlug: "shoes",
      },
      {
        name: "Strava (phone-only)",
        note: "Record every run before spending on anything else.",
        price: "Free",
        categorySlug: "strava-app",
      },
      {
        name: "Nike Dri-FIT Miler",
        note: "Light, breathable top — skip cotton from day one.",
        price: "$25–35",
        categorySlug: "shirts",
      },
      {
        name: "Nike Challenger Shorts",
        note: "Built-in liner, small pocket — no fuss for early miles.",
        price: "$30–40",
        categorySlug: "bottoms",
      },
      {
        name: "Goodr",
        note: "Affordable shades that stay put on sweaty runs.",
        price: "$25",
        categorySlug: "goggles",
      },
      {
        name: "Body Glide",
        note: "Apply before long or hot runs — cheap insurance.",
        price: "$8–12",
        categorySlug: "chafing-creams",
      },
      {
        name: "Nuun Sport",
        note: "Add once runs hit an hour or temps climb.",
        price: "$7–10",
        categorySlug: "hydration-tablets",
      },
    ],
  },
  "level-up": {
    title: "Level Up",
    description:
      "Worth the investment once you're running regularly — cold-weather layers, hydration systems, and GPS watches.",
    suggestionsIntro:
      "Buy in this order once you're running 2–3 times a week and know the habit is sticking.",
    suggestions: [
      {
        name: "Coros Pace 3",
        note: "Best value GPS watch — weeks of battery, clean interface.",
        price: "$229",
        categorySlug: "coros",
      },
      {
        name: "Garmin Forerunner 165",
        note: "Colour screen Garmin if you want training metrics on your wrist.",
        price: "$249",
        categorySlug: "garmin",
      },
      {
        name: "Nike Pro Warm Tights",
        note: "When shorts aren't enough below ~50°F (10°C).",
        price: "$60–80",
        categorySlug: "tights",
      },
      {
        name: "Salomon Active Skin 8",
        note: "Hands-free water for 90+ minute runs and trail days.",
        price: "$120–140",
        categorySlug: "hydration-packs",
      },
      {
        name: "Apple Watch SE (2nd gen)",
        note: "If you want one watch for runs and everyday life on iPhone.",
        price: "$249",
        categorySlug: "apple-watch",
      },
    ],
  },
};

export const gearTiers: GearTier[] = ["start-here", "level-up"];

export const gearCategories: GearCategory[] = [
  {
    slug: "shoes",
    title: "Running Shoes",
    icon: Footprints,
    group: "Apparel",
    tier: "start-here",
    priceRange: "$100–150",
    bestFor: ["Beginners", "Wide feet", "Neutral gait", "Extra cushioning"],
    summary:
      "The single most important purchase. Running shoes are built for forward motion, impact, and breathability — not gym training or casual walking.",
    whenYouNeedIt: "Before your first run. Everything else can wait.",
    whatToLookFor: [
      "Thumb's width of space at the toes",
      "Snug heel with no slipping",
      "Comfortable out of the box — no long break-in",
      "Replace every 300–500 miles",
      "Women's models are not just pink versions — different last and width options",
    ],
    suggestions: [
      {
        name: "Brooks Ghost",
        note: "Reliable daily trainer — soft, forgiving, great for beginners.",
      },
      {
        name: "ASICS Gel-Nimbus",
        note: "Extra cushioning if you want maximum impact protection.",
      },
      {
        name: "Saucony Ride",
        note: "Balanced feel — not too soft, not too firm. Good all-rounder.",
      },
      {
        name: "New Balance Fresh Foam 880",
        note: "Comfortable neutral shoe; wide widths available.",
      },
    ],
    womenSuggestions: [
      {
        name: "Brooks Ghost (women's)",
        note: "Same forgiving ride with a women's-specific last — try both standard and wide.",
      },
      {
        name: "ASICS Gel-Cumulus (women's)",
        note: "Soft daily trainer; popular for higher arches and narrower heels.",
      },
      {
        name: "New Balance Fresh Foam 880 (wide)",
        note: "Extra forefoot room if standard women's widths feel tight.",
      },
      {
        name: "Hoka Clifton (women's)",
        note: "Plush cushioning with a roomy toe box — good for longer easy miles.",
      },
    ],
  },
  {
    slug: "shirts",
    title: "Shirts & Tops",
    icon: Shirt,
    group: "Apparel",
    tier: "start-here",
    priceRange: "$20–45",
    bestFor: ["Hot weather", "Sensitive skin", "All builds", "Women runners"],
    summary:
      "Skip cotton — it holds sweat and causes chafing. Technical fabrics wick moisture and dry fast.",
    whenYouNeedIt: "As soon as you run more than a walk around the block.",
    whatToLookFor: [
      "Polyester or merino blends — not cotton",
      "Flat seams to reduce rubbing",
      "Relaxed or athletic fit based on preference",
      "UPF protection for sunny days",
    ],
    suggestions: [
      {
        name: "Nike Dri-FIT Miler",
        note: "Classic beginner top — light, breathable, affordable.",
      },
      {
        name: "Under Armour Tech 2.0",
        note: "Soft feel, good value, widely available.",
      },
      {
        name: "Patagonia Capilene Cool",
        note: "Great for hot weather and sustainability-minded runners.",
      },
      {
        name: "Merino base layer (Icebreaker / Smartwool)",
        note: "Odour-resistant and comfortable for cool-weather runs.",
      },
    ],
    womenSuggestions: [
      {
        name: "Brooks Drive 3 Pocket Run Bra",
        note: "High-support sports bra with a phone pocket — reduces bounce on easy and long runs.",
      },
      {
        name: "Lululemon Energy Longline Bra",
        note: "Medium support for smaller frames; comfortable under tanks.",
      },
      {
        name: "Nike Dri-FIT Swoosh Women's Tank",
        note: "Light, breezy top with a flattering cut — easy first technical shirt.",
      },
      {
        name: "Oiselle Flyout Tank",
        note: "Women's running brand — soft fabric and a relaxed race-day feel.",
      },
    ],
  },
  {
    slug: "bottoms",
    title: "Shorts & Bottoms",
    icon: Zap,
    group: "Apparel",
    tier: "start-here",
    priceRange: "$30–55",
    bestFor: ["Thigh chafing", "Warm weather", "Most builds"],
    summary:
      "Running shorts are lightweight with a built-in liner so you don't need extra layers underneath.",
    whenYouNeedIt: "When gym shorts start feeling heavy or rubbing.",
    whatToLookFor: [
      "Built-in brief or liner",
      "Lightweight, quick-dry fabric",
      "Side split or length that suits your comfort",
      "Small pocket for a key or gel",
    ],
    suggestions: [
      {
        name: "Nike Challenger Shorts",
        note: "Simple 5\" inseam with liner — a safe first pick.",
      },
      {
        name: "Tracksmith Session Shorts",
        note: "Premium feel with a classic look if you want to invest.",
      },
      {
        name: "Lululemon Pace Breaker",
        note: "Comfortable liner and phone pocket; popular for everyday runs.",
      },
      {
        name: "SOAR Running Split Shorts",
        note: "Light and fast — better once you're running regularly.",
      },
    ],
    womenSuggestions: [
      {
        name: "Lululemon Hotty Hot High-Rise",
        note: "Light 4\" short with liner and pockets — a common women's starter pick.",
      },
      {
        name: "Oiselle Roga Short",
        note: "Women's-specific cut with a comfortable brief liner.",
      },
      {
        name: "Athleta Ultimate Lined Short",
        note: "Mid-rise option with a secure waistband for longer runs.",
      },
      {
        name: "Nike Tempo Women's Short",
        note: "Classic curved-hem running short — widely available and affordable.",
      },
    ],
  },
  {
    slug: "tights",
    title: "Tights & Leggings",
    icon: Zap,
    group: "Apparel",
    tier: "level-up",
    priceRange: "$60–120",
    bestFor: ["Cold weather", "Muscular thighs", "Long legs"],
    summary:
      "Full or ¾-length tights keep muscles warm in cool weather and reduce wind chill on your legs.",
    whenYouNeedIt: "Below ~50°F (10°C) or when shorts feel too cold.",
    whatToLookFor: [
      "Moisture-wicking fabric with some stretch",
      "Flat waistband that won't dig in",
      "Reflective details for low-light runs",
      "Phone pocket on thigh or hip if you carry one",
    ],
    suggestions: [
      {
        name: "Nike Pro Warm Tights",
        note: "Solid cold-weather staple with good warmth-to-weight ratio.",
      },
      {
        name: "Lululemon Fast and Free Tight",
        note: "Multiple pockets and a comfortable high waist.",
      },
      {
        name: "Under Armour ColdGear Leggings",
        note: "Brushed interior for winter mornings.",
      },
      {
        name: "2XU Compression Tights",
        note: "Snug fit — some runners like the supported feel on long runs.",
      },
    ],
    womenSuggestions: [
      {
        name: "Lululemon Fast and Free High-Rise Tight",
        note: "High waist stays put; multiple pockets for phone and gels.",
      },
      {
        name: "Athleta Ultimate Stash Tight",
        note: "Soft, squat-proof fabric with side pockets — great for cold commutes.",
      },
      {
        name: "Sweaty Betty Power Leggings",
        note: "Comfortable compression feel without feeling restrictive.",
      },
      {
        name: "Brooks Method 7/8 Tight",
        note: "Running-specific fit with reflective details for dawn and dusk.",
      },
    ],
  },
  {
    slug: "cap",
    title: "Caps & Headwear",
    icon: Sun,
    group: "Accessories",
    tier: "start-here",
    priceRange: "$25–40",
    bestFor: ["Sunny runs", "Sweaty hair", "Most head sizes"],
    summary:
      "Keeps sun off your face, absorbs sweat, and holds hair out of your eyes. A simple running cap beats a fashion hat every time.",
    whenYouNeedIt: "Sunny days, sweaty summer runs, or anytime glare is an issue.",
    whatToLookFor: [
      "Lightweight, breathable panels",
      "Adjustable back strap",
      "Curved brim for sun protection",
      "Machine-washable — you'll sweat in it",
    ],
    suggestions: [
      {
        name: "Ciele GOCap",
        note: "The cult favourite — light, stylish, great sweat management.",
      },
      {
        name: "Nike Featherlight Cap",
        note: "Budget-friendly and does the job well.",
      },
      {
        name: "Buff UV Headband (winter alternative)",
        note: "Covers ears in cold weather without overheating your head.",
      },
      {
        name: "Smartwool Merino Beanie",
        note: "For freezing temps when a cap isn't enough.",
      },
    ],
    womenSuggestions: [
      {
        name: "Ciele TRKCap",
        note: "Ponytail-friendly opening in back — no awkward bun stuffing.",
      },
      {
        name: "Nike AeroBill Featherlight (women's)",
        note: "Light cap with a lower profile that fits smaller head sizes.",
      },
      {
        name: "Buff Coolnet UV+ Headband",
        note: "Keeps hair off your face on hot runs without full hat hair.",
      },
      {
        name: "Smartwool Merino Headband",
        note: "Covers ears in winter while leaving room for a ponytail or braid.",
      },
    ],
  },
  {
    slug: "goggles",
    title: "Sunglasses & Eye Protection",
    icon: Glasses,
    group: "Accessories",
    tier: "start-here",
    priceRange: "$25–35",
    bestFor: ["Bright roads", "Light-sensitive eyes", "Small faces"],
    summary:
      "Running sunglasses stay put, block UV, and cut glare on bright roads and trails. Regular fashion shades often bounce and slip.",
    whenYouNeedIt: "Daytime outdoor runs — especially on roads, snow, or open trails.",
    whatToLookFor: [
      "UV400 protection",
      "Lightweight frame with grip on the nose and temples",
      "Interchangeable or tinted lenses for different light",
      "Polarized lenses reduce road glare",
    ],
    suggestions: [
      {
        name: "Goodr",
        note: "Affordable, fun colours, no-slip fit — perfect starter shades.",
      },
      {
        name: "Tifosi Swank",
        note: "Light, budget-friendly, solid UV protection.",
      },
      {
        name: "Oakley Sutro Lite",
        note: "Premium option with excellent clarity and stability.",
      },
      {
        name: "Julbo Fury",
        note: "Great for trail runners who want wraparound coverage.",
      },
    ],
    womenSuggestions: [
      {
        name: "Goodr Circle G",
        note: "Smaller frame and nose bridge — fits narrower faces without sliding.",
      },
      {
        name: "Tifosi Swank (XS)",
        note: "Extra-small size option for petite faces.",
      },
      {
        name: "Oakley Revolver",
        note: "Women's-specific fit with secure temples for sweaty miles.",
      },
      {
        name: "100% Speedcraft SL (narrow)",
        note: "Lightweight with a slimmer temple if standard sport frames feel wide.",
      },
    ],
  },
  {
    slug: "sunscreen",
    title: "Sunscreen",
    icon: Shield,
    group: "Accessories",
    tier: "start-here",
    priceRange: "$10–18",
    bestFor: ["Fair skin", "Long outdoor runs", "Sensitive skin"],
    summary:
      "UV exposure adds up mile by mile — especially on long runs, midday sessions, and reflective roads. A sport sunscreen stays on when you sweat.",
    whenYouNeedIt: "Any daytime outdoor run longer than 20 minutes, year-round on exposed skin.",
    whatToLookFor: [
      "Broad-spectrum SPF 30+ (SPF 50 for long summer runs)",
      "Water- and sweat-resistant label (80 min minimum)",
      "Non-greasy formula so it won't run into your eyes",
      "Apply 15–20 min before you start; reapply on runs over 2 hours",
    ],
    suggestions: [
      {
        name: "Neutrogena Sport Face SPF 70",
        note: "Sweat-resistant and less likely to sting eyes than body formulas.",
      },
      {
        name: "Banana Boat Sport Ultra SPF 50",
        note: "Budget-friendly, widely available, solid for arms and legs.",
      },
      {
        name: "Supergoop! Play Everyday Lotion SPF 50",
        note: "Light feel, no white cast — good for daily training.",
      },
      {
        name: "Sun Bum Original SPF 50",
        note: "Popular sport formula with a pleasant scent; reapply on long runs.",
      },
    ],
    womenSuggestions: [
      {
        name: "EltaMD UV Clear SPF 46",
        note: "Lightweight face formula — popular under ponytails and visors.",
      },
      {
        name: "Supergoop! Unseen Sunscreen SPF 40",
        note: "Invisible finish that won't clash with sports bra straps or tank lines.",
      },
      {
        name: "Neutrogena Sport Face Oil-Free SPF 70",
        note: "Sweat-resistant without a greasy feel on forehead and shoulders.",
      },
      {
        name: "Banana Boat Light as Air SPF 50",
        note: "Thin body lotion for arms and legs — absorbs quickly before you lace up.",
      },
    ],
  },
  {
    slug: "chafing-creams",
    title: "Chafing Creams & Balms",
    icon: Package,
    group: "Accessories",
    tier: "start-here",
    priceRange: "$8–15",
    bestFor: ["Thigh rub", "Long runs", "Sensitive skin"],
    summary:
      "Friction happens — thighs, nipples, armpits, sports bra lines. A good anti-chafe product prevents hot spots before they become bloody disasters.",
    whenYouNeedIt: "Before long runs, hot weather, or any time you've felt rubbing.",
    whatToLookFor: [
      "Glide-on stick or cream — apply before you run",
      "Petroleum-free options if you have sensitive skin",
      "Water-resistant formulas for sweaty days",
      "Reapply on runs over 90 minutes",
    ],
    suggestions: [
      {
        name: "Body Glide",
        note: "The classic stick — apply to thighs, feet, and anywhere that rubs.",
      },
      {
        name: "Squirrel's Nut Butter",
        note: "Natural anti-chafe balm; popular with trail runners.",
      },
      {
        name: "Bandelettes or Nip Guards",
        note: "Physical barriers for nipple chafing on long runs.",
      },
      {
        name: "Vaseline",
        note: "Cheap and works in a pinch — not ideal for fabric stains.",
      },
    ],
    womenSuggestions: [
      {
        name: "Body Glide (sports bra band & underarms)",
        note: "Apply along bra band, straps, and underarm seams before long runs.",
      },
      {
        name: "Shefit Ultimate Sports Bra",
        note: "Adjustable zip-front bra — dial in support to cut bounce-related rubbing.",
      },
      {
        name: "Bandelettes thigh bands",
        note: "Lace-free barrier when shorts liners aren't enough for thigh rub.",
      },
      {
        name: "Monistat Chafing Relief Powder Gel",
        note: "Drugstore option many runners use along bra lines and inner thighs.",
      },
    ],
  },
  {
    slug: "hydration-tablets",
    title: "Hydration Tablets",
    icon: Tablet,
    group: "Hydration & Fuel",
    tier: "start-here",
    priceRange: "$7–12",
    bestFor: ["Heavy sweaters", "Hot & humid runs", "Runs over 60 min"],
    summary:
      "Electrolyte tablets replace sodium, potassium, and minerals lost in sweat — especially on hot days or runs over an hour.",
    whenYouNeedIt: "Runs over 60 minutes, hot/humid weather, or if you cramp easily.",
    whatToLookFor: [
      "Sodium content — most runners need 300–600mg per hour in heat",
      "Low or zero sugar options for easy days",
      "Dissolves cleanly in water bottles",
      "Test in training — never race day first",
    ],
    suggestions: [
      {
        name: "Nuun Sport",
        note: "Light, fizzy, easy on the stomach — great starter electrolyte.",
      },
      {
        name: "LMNT",
        note: "Higher sodium — popular for heavy sweaters and hot climates.",
      },
      {
        name: "Precision Fuel & Hydration",
        note: "Customizable sodium levels to match your sweat rate.",
      },
      {
        name: "SaltStick FastChews",
        note: "Chewable electrolytes if you prefer not to mix drinks.",
      },
    ],
    womenSuggestions: [
      {
        name: "Nuun Sport (lower-sugar flavours)",
        note: "Gentle on the stomach — useful if gels and sweet drinks feel heavy.",
      },
      {
        name: "Precision Fuel PF 30 Electrolyte",
        note: "Sweat-test kits help match sodium needs across cycle phases.",
      },
      {
        name: "SaltStick FastChews",
        note: "Easy to dose on long runs without carrying a full bottle mix.",
      },
      {
        name: "LMNT (half packet in 16 oz)",
        note: "High sodium for heavy sweaters — start with a lighter mix if new to electrolytes.",
      },
    ],
  },
  {
    slug: "gels",
    title: "Energy Gels",
    icon: Zap,
    group: "Hydration & Fuel",
    tier: "start-here",
    priceRange: "$24–36",
    bestFor: ["Half marathon prep", "Runs 90+ min", "Sensitive stomach"],
    summary:
      "Concentrated carbs in a small packet — fast fuel when your body runs low on glycogen during longer efforts.",
    whenYouNeedIt: "Runs over 75–90 minutes, half marathon training, and race day.",
    whatToLookFor: [
      "20–30g carbs per gel is standard",
      "Caffeine gels for late-race boosts (if you tolerate caffeine)",
      "Take with water — gels need fluid to absorb",
      "Practice your timing: every 30–45 min on long runs",
    ],
    suggestions: [
      {
        name: "Maurten Gel 100",
        note: "Gentle on the stomach — popular with marathoners.",
      },
      {
        name: "GU Energy Gel",
        note: "Wide flavour range; easy to find at races and shops.",
      },
      {
        name: "Huma Gel",
        note: "Made with chia and fruit — good if standard gels upset your gut.",
      },
      {
        name: "Spring Energy",
        note: "Whole-food style fuel for runners who want real-ingredient options.",
      },
    ],
    womenSuggestions: [
      {
        name: "Huma Gel",
        note: "Real-food ingredients — often easier on sensitive stomachs.",
      },
      {
        name: "Maurten Gel 100",
        note: "Lower osmolality can sit better during hard efforts.",
      },
      {
        name: "GU Roctane (caffeine-free flavours)",
        note: "Test caffeine-free first if you're sensitive during your cycle.",
      },
      {
        name: "Spring Energy Canaberry",
        note: "Mild, fruit-forward taste — good starter gel for long runs.",
      },
    ],
  },
  {
    slug: "hydration-packs",
    title: "Hydration Packs & Vests",
    icon: Droplets,
    group: "Hydration & Fuel",
    tier: "level-up",
    priceRange: "$80–150",
    bestFor: ["Trail runners", "Runs 90+ min", "No water on route"],
    summary:
      "Hands-free water carry for long runs, trails, and hot days when looping back to a fountain isn't practical.",
    whenYouNeedIt: "Runs over 90 minutes, trail runs, or summer long runs without water stops.",
    whatToLookFor: [
      "1–2L capacity for most long runs",
      "Snug fit — shouldn't bounce when you run",
      "Front pockets for gels and phone",
      "Easy-to-clean bladder or soft flasks",
    ],
    suggestions: [
      {
        name: "Salomon Active Skin 8",
        note: "Light race vest — popular for half and full marathon training.",
      },
      {
        name: "Nathan VaporHowe 2.0",
        note: "Comfortable women's-specific fit with good storage.",
      },
      {
        name: "Osprey Dyna LT",
        note: "Hybrid pack/vest — great for trail beginners.",
      },
      {
        name: "FlipBelt or handheld bottle",
        note: "Simpler option for shorter long runs — no vest needed yet.",
      },
    ],
    womenSuggestions: [
      {
        name: "Nathan VaporHowe 2.0",
        note: "Women's-specific cut — shorter torso and shaped sternum straps.",
      },
      {
        name: "Osprey Dyna 15 (women's)",
        note: "Hydration pack sized for narrower shoulders and shorter backs.",
      },
      {
        name: "Salomon Active Skin 8 (S/M women's)",
        note: "Race vest with front flasks — check size chart for bust fit.",
      },
      {
        name: "FlipBelt",
        note: "Waist belt option if vests chafe under sports bra bands.",
      },
    ],
  },
  {
    slug: "apple-watch",
    title: "Apple Watch",
    icon: Watch,
    group: "Tracking & Apps",
    tier: "level-up",
    priceRange: "$249–799",
    bestFor: ["iPhone users", "All-in-one lifestyle", "Heart rate tracking"],
    summary:
      "The do-everything wrist computer. Great if you already live in the Apple ecosystem and want running data alongside texts, music, and daily health tracking.",
    whenYouNeedIt:
      "When you want one device for runs and everyday life — and you use an iPhone.",
    whatToLookFor: [
      "Built-in GPS (all current models)",
      "Water resistance for sweaty and rainy runs",
      "Heart rate sensor for easy-pace guidance",
      "Apple Watch SE for budget; Series 9/10 for brighter screen",
    ],
    suggestions: [
      {
        name: "Apple Watch SE (2nd gen)",
        note: "Best value — full GPS running features without the premium price.",
      },
      {
        name: "Apple Watch Series 9 / 10",
        note: "Brighter always-on display; easier to read mid-run.",
      },
      {
        name: "Apple Watch Ultra",
        note: "Overkill for beginners — consider only for trail ultras and multi-day battery needs.",
      },
    ],
    womenSuggestions: [
      {
        name: "Apple Watch SE (40mm)",
        note: "Smaller case fits narrower wrists without overpowering your arm.",
      },
      {
        name: "Apple Watch Series 9 / 10 (41mm)",
        note: "Compact size with a brighter screen for glancing at pace mid-run.",
      },
      {
        name: "Sport Loop or Solo Loop (small)",
        note: "Flexible bands that fit smaller wrists without extra tail flapping.",
      },
    ],
    pros: [
      "Seamless with iPhone — calls, texts, Apple Pay, and music on your wrist",
      "Automatic workout detection and a familiar, polished interface",
      "Strong health features: heart rate, sleep, fall detection, ECG (model-dependent)",
      "Huge app ecosystem beyond running",
      "Syncs runs to Apple Health and Strava easily",
    ],
    cons: [
      "Battery lasts ~1–2 days with GPS — needs nightly charging",
      "Less running-specific depth than Garmin or Coros (no native training load / race predictor)",
      "Requires an iPhone — no Android support",
      "Premium price compared to dedicated running watches",
      "Smaller GPS antenna than most running watches — fine for roads, less ideal for dense trails",
    ],
  },
  {
    slug: "garmin",
    title: "Garmin",
    icon: Watch,
    group: "Tracking & Apps",
    tier: "level-up",
    priceRange: "$199–499",
    bestFor: ["Marathon prep", "Data-driven training", "Android & iPhone"],
    summary:
      "The gold standard for dedicated running watches. Built for athletes who want deep metrics, long battery life, and data that actually helps training.",
    whenYouNeedIt:
      "When you're serious about pace, heart rate zones, and following a structured plan beyond a 5K.",
    whatToLookFor: [
      "GPS + heart rate built in (avoid non-GPS models)",
      "Garmin Coach or training plan support on watch",
      "Battery life matching your longest run",
      "Forerunner line = best for road runners",
    ],
    suggestions: [
      {
        name: "Garmin Forerunner 165",
        note: "Colour AMOLED screen, beginner-friendly — great first Garmin.",
      },
      {
        name: "Garmin Forerunner 255 / 265",
        note: "The sweet spot for half and full marathon training.",
      },
      {
        name: "Garmin Forerunner 55",
        note: "Cheapest entry point — basic but reliable GPS tracking.",
      },
    ],
    womenSuggestions: [
      {
        name: "Garmin Forerunner 165",
        note: "43mm case suits smaller wrists; quick-release bands for a secure fit.",
      },
      {
        name: "Garmin Forerunner 265S",
        note: "Smaller \"S\" size — same features with a narrower case and band.",
      },
      {
        name: "Garmin silicone band (small)",
        note: "Stock bands run long — size down so the watch doesn't slide on sweaty runs.",
      },
    ],
    pros: [
      "Week-long battery on many models (no daily charging)",
      "Running-specific metrics: VO2 max estimate, training load, recovery time, race predictor",
      "Excellent GPS accuracy on roads and trails",
      "Works with both iPhone and Android",
      "Syncs directly to Strava and most training platforms",
    ],
    cons: [
      "Interface has a learning curve — not as intuitive as Apple Watch",
      "Fewer smart features (limited texting, apps, payments on lower models)",
      "Garmin Connect app can feel overwhelming at first",
      "AMOLED models (165, 265) drain faster than older MIP-screen watches",
      "Overkill if you only run 2–3 easy miles a week",
    ],
  },
  {
    slug: "coros",
    title: "Coros",
    icon: Watch,
    group: "Tracking & Apps",
    tier: "level-up",
    priceRange: "$149–349",
    bestFor: ["Budget-conscious athletes", "Long battery life", "Structured plans"],
    summary:
      "The fast-rising challenger — premium running watch features at a lower price than Garmin, with exceptional battery life and a clean, simple interface.",
    whenYouNeedIt:
      "When you want Garmin-level running data without Garmin-level pricing.",
    whatToLookFor: [
      "Dual-frequency GPS on newer models (Pace 3, Apex 2)",
      "Battery rated in weeks, not hours",
      "Strava and training plan compatibility",
      "Coros EvoLab for fitness and fatigue tracking",
    ],
    suggestions: [
      {
        name: "Coros Pace 3",
        note: "Best beginner pick — light, accurate GPS, weeks of battery.",
      },
      {
        name: "Coros Pace 2",
        note: "Still solid if you find it discounted — slightly older but capable.",
      },
      {
        name: "Coros Apex 2",
        note: "Step up for trail runners who want maps and sapphire glass.",
      },
    ],
    womenSuggestions: [
      {
        name: "Coros Pace 3",
        note: "Light 30g case works well on smaller wrists — silicone band in S/M.",
      },
      {
        name: "Coros Pace 3 nylon band",
        note: "Softer, lower-profile strap if the stock band feels stiff or long.",
      },
      {
        name: "Coros Apex 2 (42mm)",
        note: "Smaller case option if you want maps without a bulky watch face.",
      },
    ],
    pros: [
      "Outstanding battery — often 2–3 weeks between charges",
      "Excellent value vs Garmin and Apple Watch",
      "Fast GPS lock and reliable tracking",
      "Clean, uncluttered software — easier than Garmin for beginners",
      "Strong Strava integration and free EvoLab training insights",
    ],
    cons: [
      "Smaller brand — fewer retail stores for try-before-you-buy",
      "Less third-party app support than Apple or Garmin",
      "Smart features are basic (notifications yes, apps no)",
      "Fewer model choices and accessories in local shops",
      "Customer support and repair network not as widespread as Garmin",
    ],
  },
  {
    slug: "strava-app",
    title: "Strava App",
    icon: Smartphone,
    group: "Tracking & Apps",
    tier: "start-here",
    priceRange: "Free",
    bestFor: ["Day-one tracking", "Social motivation", "All phone types"],
    summary:
      "The social network for runners. Record with your phone or sync from any watch — then analyse pace, routes, segments, and progress over time.",
    whenYouNeedIt:
      "From day one. Free to start — use phone GPS before buying a watch.",
    whatToLookFor: [
      "Free tier covers GPS tracking, pace, distance, and elevation",
      "Works with Apple Watch, Garmin, Coros, and 500+ devices",
      "Connect to LetsRunNow dashboard for streaks and coaching tips",
      "Strava Summit subscription optional — not required to begin",
    ],
    suggestions: [
      {
        name: "Phone-only tracking",
        note: "Start here — just open Strava and hit Record before your run.",
      },
      {
        name: "Strava + Apple Watch / Garmin / Coros",
        note: "Record on your watch; sync automatically when done.",
      },
      {
        name: "LetsRunNow dashboard",
        note: "Connect Strava in your account for streaks, route comparisons, and HR tips.",
      },
    ],
    womenSuggestions: [
      {
        name: "FlipBelt or armband (phone carry)",
        note: "If you run phone-only, waist belts often sit better over high-rise shorts than pockets.",
      },
      {
        name: "Strava privacy zones",
        note: "Hide start/end near home — useful if you often run solo from the same address.",
      },
      {
        name: "Strava + sports watch (40–43mm)",
        note: "Smaller watches pair the same way — record on wrist, review on phone after.",
      },
    ],
    pros: [
      "Free to track runs with GPS, pace, and distance",
      "Huge community — segments, kudos, clubs, and local routes",
      "Syncs with virtually every watch and app",
      "Works on iPhone and Android",
      "Pairs with LetsRunNow for personalised dashboard insights",
    ],
    cons: [
      "Phone-only tracking drains battery and is less accurate than a watch",
      "Advanced features (training plans, relative effort, route builder) need subscription",
      "Public profiles expose your routes — check privacy settings",
      "Can encourage unhealthy comparison if you chase kudos and segment PRs",
      "Depends on a device to record — Strava itself doesn't have GPS hardware",
    ],
  },
];

export const gearGroups = [
  "Apparel",
  "Tracking & Apps",
  "Accessories",
  "Hydration & Fuel",
] as const;

export function getGearByTier(tier: GearTier): GearCategory[] {
  return gearCategories.filter((item) => item.tier === tier);
}
