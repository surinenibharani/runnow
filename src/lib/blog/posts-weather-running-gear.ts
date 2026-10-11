import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * Weather-specific running gear: tops, bottoms, shoes.
 * Emphasis on what not to wear; split General / Women / Men.
 * Live at 7:00 AM Eastern on publishedAt.
 */
export const weatherRunningGearPosts: BlogPost[] = [
  {
    slug: "weather-running-gear-tops-bottoms-shoes",
    metaTitle: "Running Clothes by Weather: What Not to Wear",
    title:
      "Weather Running Gear: Tops, Bottoms & Shoes — What to Wear, and What Not To",
    excerpt:
      "Heat, cold, rain, and ice punish the wrong kit faster than a slow mile. A situation-by-situation map for tops, bottoms, and shoes — with a louder list of what not to wear, split for everyone, women, and men.",
    category: "Gear",
    author: AUTHOR,
    publishedAt: "2026-10-11",
    readTime: "15 min",
    relatedSlugs: [
      "what-to-wear-running",
      "choosing-running-shoes",
      "sports-bra-guide-runners",
      "chafing-blisters-running",
      "hot-weather-running-hub",
      "cold-weather-running-hub",
      "running-in-bad-weather",
      "night-running-safety",
      "running-guide-for-women",
      "running-guide-for-men",
    ],
    closingQuestion:
      "Which 'never again' piece of kit taught you the weather lesson — cotton hoodie, fashion sneakers, or a sports bra that looked fine in the mirror?",
    sources: [
      SOURCES.heatSafety,
      SOURCES.heatExhaustion,
      SOURCES.cdcHeatPrevention,
      SOURCES.acsmExertionalHeat2023,
      SOURCES.cdcHypothermiaFrostbite,
      SOURCES.mayoFrostbite,
      SOURCES.mayoHypothermia,
      SOURCES.nwsWindChill,
      SOURCES.cdcLightningSafety,
      SOURCES.sportsBraPhysicalActivityMeta2024,
      SOURCES.breastSupportBiomechanics2020,
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.clevelandJoggersNipple,
      SOURCES.rwBeginnerGear2025,
      SOURCES.rwSummerGear2026,
      SOURCES.rwRunningShorts2026,
      SOURCES.rwWinterShoes2025,
      SOURCES.outsideRunningShirts2026,
      SOURCES.fleetFeetSummer2026,
      SOURCES.irunfarRainJackets2026,
      SOURCES.irunfarTraction2026,
      SOURCES.irunfarSportsBras2026,
    ],
    faq: [
      {
        question: "What's the one clothing mistake that ruins the most beginner runs?",
        answer:
          "Cotton next to skin. It holds sweat, gets heavy, chafes, and in cold weather it stays wet — which CDC winter guidance treats as a hypothermia risk, not a cozy look. Technical or merino fabrics dry faster. Pair with [what to wear running](/blog/what-to-wear-running) for the short starter kit.",
      },
      {
        question: "Should I dress differently as a woman or a man, or is kit unisex?",
        answer:
          "Most weather rules are general: skip cotton, dress a little cooler than the doorway feel, match shoes to traction, and stay visible. Women usually need a real sports bra in every season — everyday bras and unsupportive bralettes fail bounce and chafe tests. Men more often need to prevent nipple chafe (skip cotton tees on long, hot, or wet runs) and protect skin from cold wind. If a tip applies to everyone, this post labels it General.",
      },
      {
        question: "Can I wear waterproof hiking shoes or boots in rain or snow?",
        answer:
          "Usually no for running. Hiking boots are stiff, heavy, and change your stride. Waterproof running shoes can help in slush, but in heat they trap sweat. For ice, traction (trail lugs or add-on grips) matters more than a membrane. For pavement rain, a daily trainer with remaining tread plus wicking socks beats a fashion boot.",
      },
      {
        question: "Is it OK for men to run shirtless in the heat?",
        answer:
          "It's a personal choice, not a heat-safety upgrade. CDC heat guidance favors lightweight, light-colored, loose, moisture-wicking clothes — not bare skin as a strategy. Shirtless running raises sunburn and nipple-chafe risk and can be against race or path rules. A light technical tee is the better default.",
      },
      {
        question: "Do I need a different sports bra in winter?",
        answer:
          "You still need support. Cold layers do not cancel bounce. Skip the everyday underwire or fashion bralette under a fleece. A moisture-wicking sports bra under a technical base layer is the winter version of the same rule — see the [sports bra guide](/blog/sports-bra-guide-runners).",
      },
      {
        question: "What shoes should I not wear on ice?",
        answer:
          "Do not wear racing flats, carbon-plated racers, smooth worn-out road shoes, or fashion sneakers. They have little bite. Trail shoes with lugs or clip-on traction devices are the practical answer. If sidewalks are a skating rink, the [cold-weather hub](/blog/cold-weather-running-hub) says stay in — shoes cannot fix black ice.",
      },
      {
        question: "Do I have to buy the exact brands named in this post?",
        answer:
          "No. Named products are popular 2025–2026 tester and community picks — Runner's World, Outside, Fleet Feet, iRunFar, and repeated r/running threads — not medical devices and not affiliate rankings. Fit, fabric, and remaining tread beat the logo. Models change every year; try shoes on. A $30 Nike Challenger short that doesn't chafe beats a $128 Tracksmith pair that does.",
      },
    ],
    howTo: {
      name: "How to pick running kit for the day's weather",
      description:
        "Start from the everyday kit, skip cotton, then change tops, bottoms, and shoes only for heat, cold, rain, or ice — including women- and men-specific chafe and support rules.",
      steps: [
        {
          name: "Start from the everyday kit",
          text: "Technical top, lined shorts or tights you already like, daily trainers, wicking socks. Change pieces only when heat, cold, rain, or ice requires it.",
          url: "/blog/what-to-wear-running",
        },
        {
          name: "Ban cotton next to skin",
          text: "No cotton tees, hoodies, underwear, or socks for anything longer than a short shuffle. Wet cotton chafes in heat and chills you in cold.",
        },
        {
          name: "Dress as if it's 10–15°F warmer",
          text: "You should feel slightly cool at the door. A puffy coat that feels perfect on the porch is too much at mile two.",
          url: "/blog/cold-weather-running-hub",
        },
        {
          name: "Match shoes to traction, not the outfit",
          text: "Heat wants breathable trainers. Ice wants lugs or grips. Rain wants remaining tread — not racing plates.",
          url: "/blog/choosing-running-shoes",
        },
        {
          name: "Fix the gender-specific hot spots before you leave",
          text: "Women: a real sports bra, not an everyday bra. Men: skip cotton tees on long/wet days; tape or a technical shirt if nipples chafe. Everyone: lube known rub zones.",
          url: "/blog/chafing-blisters-running",
        },
      ],
    },
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** Heat exhaustion, heatstroke, frostbite, and hypothermia are medical emergencies. Stop, get to shelter, and seek care for confusion, collapse, numbness that doesn't return, or skin that turns white, gray, or waxy. Clothing helps comfort and risk — it is not a substitute for checking the forecast or knowing when to stay in.",
          "The short [what to wear](/blog/what-to-wear-running) post gets you out the door. This one is the weather map: start with the **everyday kit** (general weather), then change only what heat, cold, rain, or ice actually demands — with the louder half of every section reserved for **what not to wear**.",
          "Labels in every section: **General** (everyone), **Women**, **Men**. If it isn't tagged, it's general. Beginners, comebacks, and experienced runners use the same fabric and traction rules. Walk-run is allowed in any of this kit.",
          "**Named products** in each section are popular 2025–2026 picks from Runner's World testers, Outside lab tests, Fleet Feet and iRunFar roundups, plus repeated r/running and r/runningshoes threads — not medical devices, not affiliate rankings. Fit beats the logo. Shoe models change yearly; try them on. Same closet logic lives on the [gear guide](/gear).",
        ],
      },
      {
        id: "never-wear",
        heading: "The never-wear list (read this first)",
        paragraphs: [
          "Most ruined first runs are kit, not fitness. If you remember nothing else, remember this dumpster.",
        ],
        subsections: [
          {
            heading: "General — do not wear",
            list: [
              "Cotton t-shirts, hoodies, sweatpants, or socks once you're actually jogging — they hold sweat, get heavy, and stay wet",
              "Jeans, cargo pants, or anything with a rigid waistband",
              "Fashion sneakers, court shoes, hiking boots, or flip-flops",
              "Brand-new race shoes, carbon plates, or spikes on a random weather day",
              "A puffy winter coat that feels perfect standing still — you will overheat, then soak, then freeze",
              "All-black, non-reflective kit at dawn, dusk, or in rain near traffic — see [night running safety](/blog/night-running-safety)",
              "Noise-canceling headphones that erase cars and bikes on busy roads",
              "A full waterproof rain-pant + non-breathable jacket combo that turns you into a mobile sauna",
            ],
          },
          {
            heading: "Women — do not wear",
            list: [
              "An everyday underwire bra or unsupportive bralette as your only support — bounce and bra-line chafe are not a weather tax you have to pay",
              "Cotton underwear or cotton-lined shorts on long or wet days",
              "A cute crop that rides up every 30 seconds (you'll stop more than you run)",
              "Skipping the sports bra in winter because 'the fleece covers it' — layers don't reduce breast motion",
            ],
          },
          {
            heading: "Men — do not wear",
            list: [
              "A heavy cotton gym tee on anything longer, hotter, or wetter than a short shuffle — this is how nipple chafe happens",
              "Baggy basketball shorts with no liner that soak, slap, and rub the inner thigh",
              "Boxer-brief underwear that bunches into a seam under wet shorts",
              "Bare skin as your only 'heat strategy' without sunscreen — sunburn is an injury, not a tan line",
            ],
          },
        ],
        closingParagraphs: [
          "If a piece of clothing would be miserable after a 20-minute walk in the rain, it has no business on a run. Everyday weather is next — then heat, cold, rain, and ice. Heat rules pair with the [hot-weather hub](/blog/hot-weather-running-hub); ice rules pair with the [cold-weather hub](/blog/cold-weather-running-hub).",
        ],
      },
      {
        id: "everyday",
        heading: "Everyday weather (the default kit)",
        paragraphs: [
          "Most runs are not a heat wave or a blizzard. If the air is dry, you're not overheating at the door, and the ground isn't ice or a puddle, wear the **everyday kit** and stop shopping. Special weather only swaps pieces — it doesn't replace this base.",
          "Think roughly mild and dry: you're not thinking about weather. Tops, bottoms, and shoes below are the default. What not to wear still matters on a boring Tuesday.",
        ],
        subsections: [
          {
            heading: "General — best",
            list: [
              "**Tops:** a dry technical T-shirt or light long sleeve you can move in — seams that don't saw the neck or armpits",
              "**Bottoms:** lined running shorts or tights that stay put; whatever you won't tug every 200 meters",
              "**Shoes:** one pair of honest daily trainers with room at the toes — not court shoes, not boots",
              "**Socks:** moisture-wicking; one pair, snug at the heel",
              "That's the whole outfit for most people on most days. Visibility (light colors or a small reflective bit) if you run near traffic",
            ],
          },
          {
            heading: "General — do not wear",
            list: [
              "Cotton tees, hoodies, sweatpants, or socks — even when the forecast looks 'fine'",
              "Jeans, cargo shorts, or a belt",
              "Fashion sneakers, gym-only shoes with a flat pretty sole, or someone else's pair",
              "A race kit you haven't tested on an easy day",
              "A jacket 'just in case' that you never unzip — if you might need a layer, pick one you can tie around your waist",
            ],
          },
          {
            heading: "Women — best / do not wear",
            list: [
              "**Best:** a real sports bra (support you forget after mile one) under the everyday top; underwear that isn't cotton if shorts or tights will be on a while",
              "**Do not wear:** an everyday underwire bra, a fashion bralette, or going without support because 'it's only 25 minutes'",
              "**Do not wear:** unlined short shorts if inner thighs already rub on a dry day — fix that before you add heat or rain",
            ],
          },
          {
            heading: "Men — best / do not wear",
            list: [
              "**Best:** a technical tee; liner shorts under split shorts if thighs slap; that's enough most Tuesdays",
              "**Do not wear:** a cotton gym tee as the default — it becomes the problem the first time the run is longer, hotter, or damper than you planned",
              "**Do not wear:** baggy unlined basketball shorts as everyday bottoms",
            ],
          },
          {
            heading: "Specific gear people actually buy",
            table: {
              caption:
                "Popular 2025–2026 tester and community picks. Fit beats the logo — one starter that doesn't chafe is enough.",
              columns: ["Piece", "Start here", "Also good", "Skip"],
              rows: [
                [
                  "Shoes",
                  "Brooks Ghost ([gear guide](/gear#shoes) default)",
                  "ASICS Novablast; Hoka Clifton; Saucony Ride",
                  "Fashion sneakers, court shoes",
                ],
                [
                  "Tops",
                  "Nike Dri-FIT Miler or Under Armour Tech",
                  "Women: lululemon Swiftly Tech 2.0. Men: Rabbit EZ Tee; Patagonia Capilene Cool",
                  "Cotton gym tee",
                ],
                [
                  "Bottoms",
                  "Nike Challenger (lined, ~5\")",
                  "Tracksmith Session; New Balance RC Essential. Women: Hotty Hot, Vuori Clementine, Nike Tempo",
                  "Unlined basketball shorts",
                ],
                [
                  "Socks",
                  "Darn Tough Run no-show",
                  "Feetures Elite Ultra Light",
                  "Cotton crew socks",
                ],
                [
                  "Women — bra",
                  "Brooks Drive or Racerback 2.0",
                  "DD+: Panache Sport or Shefit Flex. Smaller chest: lululemon Energy, Nike Swoosh",
                  "Everyday bra, fashion bralette",
                ],
                [
                  "Men — chafe",
                  "Lined shorts (Challenger or Pace Breaker)",
                  "Body Glide or Nip Guards; snug technical shirt",
                  "Cotton tee on a long run",
                ],
              ],
            },
          },
        ],
        closingParagraphs: [
          "If this kit feels good on a nothing-special day, you're done. The sections below only tell you **what to change** when the weather actually changes.",
        ],
        cta: { text: "What to wear (short version)", href: "/blog/what-to-wear-running" },
      },
      {
        id: "heat",
        heading: "Hot and humid (about 65°F / 18°C and up)",
        paragraphs: [
          "Start from the everyday kit, then strip insulation. CDC heat guidance: lightweight, light-colored, loose-fitting clothes; slow down; drink fluids. ACSM's 2023 exertional-heat consensus treats clothing as one part of risk management — not a license to 'tough out' a heat advisory. Mayo Clinic's summer-exercise advice is the same: shade, timing, and knowing heat-exhaustion signs beat a heroic dark hoodie.",
        ],
        subsections: [
          {
            heading: "General — best",
            list: [
              "**Tops:** light-colored technical tee or singlet; visor or cap; sunglasses if glare bothers you",
              "**Bottoms:** lined running shorts or light capris/leggings you won't tug",
              "**Shoes:** breathable mesh daily trainers with room in the toe box — feet swell in heat",
              "Sunscreen on exposed skin; a small anti-chafe balm in the pocket for known rub spots",
            ],
          },
          {
            heading: "General — do not wear",
            list: [
              "Dark, heavy cotton, or a rain shell 'just in case' — you will cook",
              "Compression tights you only own for winter (they trap heat)",
              "Waterproof hiking shoes or insulated winter trainers",
              "Brand-new carbon racers — they don't make heat safer, and they blister on swollen feet",
              "A hydration vest stuffed for a 25-minute jog",
            ],
          },
          {
            heading: "Women — best / do not wear",
            list: [
              "**Best:** a supportive sports bra (encapsulation or combo for longer efforts) under a light tee or tank; dark shorts if that reduces period stress — that's comfort, not a rule",
              "**Do not wear:** everyday bras, cotton sports bras that stay soaked, or a bra with a rigid underwire that digs once you're sweaty",
              "**Do not wear:** short unlined shorts if inner-thigh chafe is already a thing — pick a liner or longer brief",
            ],
          },
          {
            heading: "Men — best / do not wear",
            list: [
              "**Best:** a light technical tee; liner shorts under split shorts if thighs rub; nipple tape or a snug technical shirt if you've ever bled through a shirt",
              "**Do not wear:** cotton tees, coarse-seam basketball jerseys, or going shirtless as your only sun plan",
              "**Do not wear:** a tight race singlet you haven't tested — new seams plus salt sweat is a chafe experiment",
            ],
          },
          {
            heading: "Specific gear people actually buy",
            table: {
              caption:
                "Strip insulation from the everyday kit. Light colors, mesh, and remaining tread — not Gore-Tex.",
              columns: ["Piece", "Start here", "Also good", "Skip"],
              rows: [
                [
                  "Tops",
                  "Swiftly Tech 2.0 (women) or Mile Maker Mesh (men)",
                  "Rabbit EZ Tee or Bunny Hop Tank; Saucony Stopwatch Singlet; Patagonia Capilene Cool Ultra",
                  "Dark cotton, rain shell \"just in case\"",
                ],
                [
                  "Cap / glasses",
                  "Ciele GOCap or Nike Featherlight visor",
                  "Goodr sunglasses",
                  "Heavy trucker hat",
                ],
                [
                  "Bottoms",
                  "Bandit Vanisher or New Balance RC / Impact Run 5\"",
                  "Smartwool Active Lined; Tracksmith Twilight; Adidas Own the Run",
                  "Winter compression tights",
                ],
                [
                  "Shoes",
                  "Same daily trainer (Ghost, Novablast, Clifton, Ride)",
                  "Extra toe-box room — feet swell",
                  "Gore-Tex / GTX, carbon racers",
                ],
                [
                  "Chafe",
                  "Body Glide or Squirrel's Nut Butter before you leave",
                  "Women: stay in Brooks / Panache / Shefit. Men: Nip Guards",
                  "Soaked cotton bra; shirtless as a sun plan",
                ],
              ],
            },
          },
        ],
        closingParagraphs: [
          "If you feel dizzy, nauseated, confused, or stop sweating on a brutal day, that is not a clothing problem — stop, cool down, and get help ([heat exhaustion](https://www.mayoclinic.org/diseases-conditions/heat-exhaustion/symptoms-causes/syc-20373250)).",
        ],
        cta: { text: "Hot-weather running hub", href: "/blog/hot-weather-running-hub" },
      },
      {
        id: "cool",
        heading: "Cool but not cold (about 45–65°F / 7–18°C)",
        paragraphs: [
          "Start from the everyday kit. This is the 'I overdressed' zone. Dress like it's 10–15°F warmer than the thermometer. You should feel slightly underdressed on the porch.",
        ],
        subsections: [
          {
            heading: "General — best",
            list: [
              "**Tops:** long-sleeve technical tee or a light zip you can tie around your waist",
              "**Bottoms:** shorts or light tights — pick the one you won't negotiate with at mile two",
              "**Shoes:** your normal daily trainers",
              "Light gloves optional near 50°F if fingers go numb early",
            ],
          },
          {
            heading: "General — do not wear",
            list: [
              "A cotton hoodie 'because it's 52°'",
              "A down vest you can't unzip",
              "Winter insulated shoes",
              "Two pairs of socks 'for warmth' — that's a blister sandwich",
            ],
          },
          {
            heading: "Women — extra",
            list: [
              "**Best:** sports bra + technical long sleeve; a light vest you can shed",
              "**Do not wear:** a fashion cardigan or crewneck sweatshirt you'll hate once you're warm",
            ],
          },
          {
            heading: "Men — extra",
            list: [
              "**Best:** long-sleeve tech tee you can push up; shorts unless wind is nasty",
              "**Do not wear:** a team cotton hoodie over basketball shorts — classic too-hot-then-soaked combo",
            ],
          },
          {
            heading: "Specific gear people actually buy",
            table: {
              caption:
                "This is the overdress zone. Feel slightly cool at the door, and pick a layer you can tie around your waist.",
              columns: ["Piece", "Start here", "Also good", "Skip"],
              rows: [
                [
                  "Tops",
                  "Nike or Under Armour long-sleeve Dri-FIT",
                  "Tracksmith Brighton; Swiftly or Rabbit tee plus a packable wind layer",
                  "Cotton hoodie",
                ],
                [
                  "Wind layer",
                  "Brooks Canopy",
                  "Patagonia Houdini (wind and drizzle only — not a rain jacket)",
                  "Down vest you can't unzip",
                ],
                [
                  "Bottoms",
                  "Everyday shorts until your knees complain",
                  "Nike Pro Warm; lululemon Fast and Free; Brooks Method 7/8",
                  "Fleece-lined tights",
                ],
                [
                  "Hands",
                  "Cheap running gloves near 50°F",
                  "Tracksmith Harrier merino",
                  "Two pairs of socks",
                ],
                [
                  "Shoes",
                  "Same daily trainer",
                  "",
                  "Winter GTX, hiking shoes",
                ],
              ],
            },
          },
        ],
      },
      {
        id: "cold",
        heading: "Cold (about 45°F / 7°C and below)",
        paragraphs: [
          "Start from the everyday kit, then add layers. CDC winter guidance: wear layers, stay dry, cover extremities, and treat wet clothing as a hypothermia risk. Mayo Clinic's frostbite and hypothermia pages are the red-flag list — white or gray waxy skin, confusion, intense shivering, then shivering that stops. National Weather Service **wind chill** is the number that matters more than the cute app temperature.",
          "Layer: wicking base, optional light mid, wind-resistant shell you can unzip. Not: one giant cotton sweatshirt.",
        ],
        subsections: [
          {
            heading: "General — best",
            list: [
              "**Tops:** moisture-wicking base + light mid if needed + zip shell for wind",
              "**Bottoms:** tights or lined running pants below ~40°F; shorts only if you truly run hot and the wind is calm",
              "**Shoes:** your trainers with room for a slightly thicker wicking sock — not two cotton pairs",
              "Hat or headband, gloves, and a buff you can pull over your mouth if dry cold air bites",
            ],
          },
          {
            heading: "General — do not wear",
            list: [
              "Cotton anything next to skin",
              "A ski parka, ski bibs, or fashion wool coat",
              "Cotton gloves that freeze when they get wet",
              "Earbuds that block traffic plus a hood that blocks sightlines",
              "Racing flats — less insulation, less rubber on cold pavement",
            ],
          },
          {
            heading: "Women — extra",
            list: [
              "**Best:** same sports bra you'd wear in spring under the base layer; tights with a real waistband that doesn't slide when you add a jacket",
              "**Do not wear:** a bralette under a fleece and calling it winter kit",
              "**Do not wear:** cotton leggings from the lounge drawer — they bag, soak, and freeze at the hem",
            ],
          },
          {
            heading: "Men — extra",
            list: [
              "**Best:** wind-resistant briefs or tights when it's truly cold and windy (yes, that body part can get frostnipped)",
              "**Do not wear:** baggy cotton sweatpants over boxers — they load with sweat, then chill",
              "**Do not wear:** a cotton beanie that soaks through; a wicking hat dries",
            ],
          },
          {
            heading: "Specific gear people actually buy",
            table: {
              caption:
                "Wicking base, optional mid, unzippable shell. Cotton next to skin is the hypothermia mistake.",
              columns: ["Piece", "Start here", "Also good", "Skip"],
              rows: [
                [
                  "Base",
                  "Icebreaker or Smartwool long-sleeve",
                  "Tracksmith Brighton; Under Armour ColdGear",
                  "Cotton waffle henley",
                ],
                [
                  "Mid",
                  "Light unzippable running fleece",
                  "Tracksmith Franklin Fleece",
                  "Puffy ski jacket",
                ],
                [
                  "Shell",
                  "Brooks Canopy for wind",
                  "Wet + cold: Patagonia Storm Racer; Janji Rainrunner; Salomon Bonatti",
                  "Waterproof shell on a dry 40°F day",
                ],
                [
                  "Bottoms",
                  "Nike Pro Warm or lululemon Fast and Free ([gear guide](/gear#tights))",
                  "Under Armour ColdGear; budget Baleaf; deep-cold Tracksmith NDO",
                  "Cotton sweatpants, lounge leggings",
                ],
                [
                  "Head / hands / socks",
                  "Smartwool beanie or Buff; merino gloves; one pair of Darn Tough or Smartwool socks",
                  "Mittens when fingers go numb (Tracksmith Nor'Easter)",
                  "Cotton beanie; two cotton sock pairs",
                ],
                [
                  "Women — bra",
                  "Same as spring (Brooks Drive / Racerback, Panache, Shefit)",
                  "Merino blend (Smartwool Send-It style)",
                  "Fashion bralette under a fleece",
                ],
                [
                  "Men",
                  "Wind-resistant briefs (Craft, SAXX Kinetic) under tights",
                  "",
                  "Cotton boxers under sweatpants",
                ],
              ],
            },
          },
        ],
        cta: { text: "Cold-weather running hub", href: "/blog/cold-weather-running-hub" },
      },
      {
        id: "rain",
        heading: "Rain (no thunder)",
        paragraphs: [
          "Start from the everyday kit, then swap for wet-weather fabric and tread. Light rain is runnable. Thunder is not — CDC lightning guidance is still 'when thunder roars, go indoors.' Wet kit is a chafe-and-blister machine. Fabric choice matters more than a $200 rain jacket.",
        ],
        subsections: [
          {
            heading: "General — best",
            list: [
              "**Tops:** light waterproof-breathable shell you can stow if the rain stops; brimmed cap so you can see",
              "**Bottoms:** lined shorts or tights that don't turn transparent and heavy",
              "**Shoes:** daily trainers with **remaining tread**; wicking socks (maybe a slightly thicker pair)",
              "Anti-chafe on thighs, toes, and bra line / chest before you leave — see [chafing & blisters](/blog/chafing-blisters-running)",
            ],
          },
          {
            heading: "General — do not wear",
            list: [
              "Cotton hoodie 'to stay warm in the rain' — it becomes a wet backpack",
              "Non-breathable cheap poncho that balloons and blinds you",
              "Waterproof pants that don't vent — swamp city",
              "Smooth, worn-out outsoles (paint-slick on metal utility covers)",
              "Brand-new shoes; white fashion sneakers; leather boots",
            ],
          },
          {
            heading: "Women — extra",
            list: [
              "**Best:** a sports bra you already know doesn't saw the ribcage when soaked; darker bottoms if you want less see-through stress",
              "**Do not wear:** a light-colored unlined short that turns see-through, then ride-up, then chafe",
              "**Do not wear:** cotton underwear under wet tights",
            ],
          },
          {
            heading: "Men — extra",
            list: [
              "**Best:** technical shirt (wet cotton + rain = nipple chafe almost on schedule); liner shorts",
              "**Do not wear:** a heavy cotton race tee 'from the 5K last year'",
              "**Do not wear:** unlined gym shorts that glue to the thigh",
            ],
          },
          {
            heading: "Specific gear people actually buy",
            table: {
              caption:
                "A brim and remaining tread matter more than a $200 jacket. A Houdini is wind, not waterproof.",
              columns: ["Piece", "Start here", "Also good", "Skip"],
              rows: [
                [
                  "Real rain jacket",
                  "Patagonia Storm Racer or Janji Rainrunner",
                  "Rab Phantom; Salomon Bonatti; budget REI Xerocloud",
                  "Poncho, non-breathable rain pants",
                ],
                [
                  "Drizzle / wind",
                  "Brooks Canopy or Patagonia Houdini",
                  "Fast-dry tee only if the rain is warm — a shell can cook you",
                  "Treating a Houdini as a waterproof",
                ],
                [
                  "Cap",
                  "Ciele GOCap or any brimmed running cap",
                  "",
                  "Hoodie visor",
                ],
                [
                  "Shoes",
                  "Everyday trainer with remaining tread",
                  "Brooks Ghost GTX for slush only",
                  "White fashion sneakers, leather boots, GTX in warm rain",
                ],
                [
                  "Socks / chafe",
                  "Darn Tough or Smartwool merino + Body Glide",
                  "Men: technical shirt or nipple tape",
                  "Wet cotton tee",
                ],
                [
                  "Women",
                  "Darker lined shorts or tights; a sports bra you trust wet",
                  "Brooks / Panache / Shefit",
                  "Light unlined shorts (see-through)",
                ],
              ],
            },
          },
        ],
        cta: { text: "Bad-weather tips", href: "/tips/bad-weather" },
      },
      {
        id: "ice-snow",
        heading: "Ice, packed snow, and slush",
        paragraphs: [
          "Shoes and traction are the whole sport here. Clothes still follow the cold rules. If the sidewalk is a rink, **stay in** — the [cold hub](/blog/cold-weather-running-hub) and treadmill options exist so you don't collect an ankle sprain.",
        ],
        subsections: [
          {
            heading: "General — best",
            list: [
              "**Tops / bottoms:** cold-weather layers above; extra visibility (snow + gray sky + cars = you disappear)",
              "**Shoes:** trail shoes with real lugs, or road shoes plus clip-on traction (Yaktrax-style) you've practiced in",
              "Shorter stride, eyes up, skip earbuds",
            ],
          },
          {
            heading: "General — do not wear",
            list: [
              "**Do not wear racing flats, carbon plates, or marathon racers on ice**",
              "Do not wear fashion sneakers, worn-bald road shoes, or leather dress trainers",
              "Do not wear hiking boots for 'ankle support' — they're slow, stiff, and still slip",
              "Do not wear a long scarf that can snag, or a hood that deletes peripheral vision",
              "Do not wear headphones that hide the snowplow",
            ],
          },
          {
            heading: "Women — extra",
            list: [
              "**Best:** tights you can move in plus a jacket you can see from a car; sports bra unchanged",
              "**Do not wear:** a long fashion coat over tights — you can't see your feet on ice",
            ],
          },
          {
            heading: "Men — extra",
            list: [
              "**Best:** wind-layer on the torso; bright jacket; traction on the shoe, not 'I'll be careful'",
              "**Do not wear:** a dark navy puffy that matches every sedan in a snowstorm",
            ],
          },
          {
            heading: "Specific gear people actually buy",
            table: {
              caption:
                "Rubber lugs grip snow. Metal grips ice. Practice clip-ons in a parking lot before mile four.",
              columns: ["Piece", "Start here", "Also good", "Skip"],
              rows: [
                [
                  "Packed snow / mud",
                  "Hoka Challenger or Salomon Speedcross 6",
                  "Merrell Agility Peak; Topo trail; Saucony Peregrine",
                  "Carbon racers, bald road shoes",
                ],
                [
                  "True ice — shoe",
                  "Icebug NewRun BUGrip GTX",
                  "Salomon Spikecross (trail ice)",
                  "Wearing studs on dry pavement all winter",
                ],
                [
                  "True ice — clip-on",
                  "Kahtoola EXOspikes (mixed paths)",
                  "NANOspikes (icy roads); Yaktrax Pro (more pavement); MICROspikes (serious trail)",
                  "Hiking boots \"for ankle support\"",
                ],
                [
                  "Clothes",
                  "Bright or Brooks Run Visible jacket over cold layers",
                  "Cheap reflective vest",
                  "Navy puffy (you disappear)",
                ],
              ],
            },
          },
        ],
        cta: {
          text: "Injury hub — slips and sprains",
          href: "/injuries",
        },
      },
      {
        id: "shoes-by-weather",
        heading: "Shoes by situation (quick matrix)",
        paragraphs: [
          "One pair of honest daily trainers covers most beginners most of the year. Extra pairs are for traction and weather — not Instagram. Full fit rules: [choosing running shoes](/blog/choosing-running-shoes).",
        ],
        subsections: [
          {
            heading: "General — best shoe for…",
            list: [
              "**Heat / dry pavement:** breathable daily trainer, thumb's width at the toes",
              "**Cool / dry:** same daily trainer",
              "**Rain:** same trainer **if the outsole still has tread**; swap if it's slick",
              "**Mud / wet trail:** trail shoe with lugs — road foam on wet roots is a slip",
              "**Packed snow / ice:** trail lugs or add-on grips; practice before you need them",
              "**Treadmill / indoor:** daily trainer, not aggressive trail lugs (they grab the belt oddly)",
            ],
          },
          {
            heading: "General — do not wear",
            list: [
              "Court shoes, skate shoes, or 'fashion runners' with a flat, pretty outsole",
              "Carbon-plated racers as daily weather shoes",
              "Waterproof winter boots for easy miles on dry pavement",
              "Trail shoes with huge lugs as your only summer road shoe (clunky, not evil — just the wrong tool)",
              "Someone else's shoes, even in the same size",
            ],
          },
          {
            heading: "Women — extra",
            list: [
              "**Best:** try women's lasts and wide options; heat swelling is real — don't start the season in a snug race shoe",
              "**Do not assume** a men's pair 'in a smaller size' fits the same. Heel volume and forefoot shape often differ — the [gear guide](/gear#shoes) notes women's models are not just pink men's shoes",
            ],
          },
          {
            heading: "Men — extra",
            list: [
              "**Best:** if you have wide feet, buy the wide last — squeezing into a pretty narrow racer in winter cold (when feet need room) is how black toenails start",
              "**Do not wear** last year's 500-mile pair 'until spring' — dead foam is worse on cold, stiff pavement",
            ],
          },
          {
            heading: "Specific gear people actually buy",
            table: {
              caption:
                "One honest daily trainer covers most of the year. Extra pairs are for traction, not Instagram.",
              columns: ["Situation", "Start here", "Also good", "Skip"],
              rows: [
                [
                  "Heat / dry / cool pavement",
                  "Brooks Ghost",
                  "ASICS Novablast; Hoka Clifton; Saucony Ride; Gel-Nimbus; New Balance 880 (wide) — [gear guide](/gear#shoes)",
                  "Fashion runners, carbon racers",
                ],
                [
                  "Rain on pavement",
                  "Same daily trainer if the tread remains",
                  "Brooks Ghost GTX for slush",
                  "GTX in warm rain",
                ],
                [
                  "Mud / wet trail",
                  "Salomon Speedcross; Hoka Speedgoat or Challenger",
                  "Saucony Peregrine",
                  "Road foam on wet roots",
                ],
                [
                  "Packed snow",
                  "Those same trail shoes",
                  "",
                  "Rubber-only shoes on black ice",
                ],
                [
                  "Ice",
                  "Icebug BUGrip, or Kahtoola / Yaktrax on the daily trainer",
                  "See the [ice section](#ice-snow)",
                  "Carbon plates, racing flats",
                ],
                [
                  "Treadmill",
                  "Ghost / Novablast / Clifton",
                  "",
                  "Speedcross lugs, carbon racers",
                ],
                [
                  "Women / wide feet",
                  "Women's last and wide options (Ghost, Clifton, 880)",
                  "",
                  "A men's pair \"a size down\"",
                ],
              ],
            },
          },
        ],
        cta: { text: "Gear guide — shoes", href: "/gear#shoes" },
      },
      {
        id: "chooser",
        heading: "A 30-second doorway check",
        paragraphs: [
          "Before you leave, run this filter. If you fail two items, change clothes. If the sidewalk is ice or you hear thunder, change the workout.",
        ],
        list: [
          "Am I wearing the everyday kit unless today's weather actually requires a swap?",
          "Will this fabric still be decent if I'm sweaty in 10 minutes? Cotton → change",
          "Will I be slightly cool at the door? If you feel toasty standing still, you're overdressed",
          "Can a driver see me if the weather is gray, rainy, or dark?",
          "Does the outsole still have tread for today's surface?",
          "**Women:** is this a real sports bra, not a fashion layer?",
          "**Men:** if it's long, hot, or wet, is this a technical shirt (or taped nipples) — not cotton?",
          "Is staying inside the smarter call? Treadmill and rest still count",
        ],
        closingParagraphs: [
          "Kit is supposed to disappear after mile one. If you're tugging, slipping, steaming, or freezing, the weather didn't fail you — the closet did. Fix it once; keep the habit.",
        ],
        cta: { text: "Start here — free plan", href: "/start" },
      },
      {
        id: "what-research-shows",
        heading: "What the research and medical agencies actually say",
        paragraphs: [
          "There isn't a randomized trial titled 'Don't wear a cotton hoodie.' There is clear medical guidance on **heat, cold, wet clothing, and breast support** — and that's what this closet advice is translating.",
          "CDC heat-prevention pages recommend lightweight, light-colored, loose-fitting clothes, slowing down, and fluids. ACSM's 2023 exertional-heat consensus treats clothing, acclimatization, and knowing when to stop as part of the same risk picture. Mayo Clinic's heat-exhaustion overview is the symptom list you should actually fear: heavy sweating or a stop in sweating, dizziness, nausea, confusion — not a slow split.",
          "CDC winter pages: layers, stay dry, cover head/hands/feet, and treat wet clothes as a hypothermia risk. Mayo Clinic frostbite and hypothermia pages describe white, gray, or waxy skin, numbness, confusion, and shivering that stops — those are clinic problems, not 'one more mile' problems. National Weather Service wind-chill charts explain why 25°F with wind is not the same as 25°F in a still parking lot.",
          "For women, a 2024 systematic review and meta-analysis in the *Journal of Women's Sports Medicine* found sports bras associated with less exercise-induced breast pain than everyday bras. McGhee & Steele (2020) describe how unsupported breast motion during running contributes to pain and can change upper-body mechanics. Winter layers do not replace that support.",
          "Journals will not parent you out of basketball shorts. They will tell you wet cotton dumps heat in the cold, dark heavy clothes work against heat loss in summer, and ice plus smooth rubber is a fall.",
          "The **named shirts, shorts, shoes, and jackets** in this post are not in those medical papers. They come from 2025–2026 tester roundups (Runner's World, Outside lab, Fleet Feet, iRunFar) and from what r/running repeats: Ghost or Novablast for pavement, Canopy/Houdini for wind, Janji/Bonatti/Storm Racer for real rain, Icebug or Kahtoola for ice, a real sports bra every season. Treat them as a shopping shortlist, then [try shoes on](/gear#shoes).",
        ],
      },
    ],
  },
];
