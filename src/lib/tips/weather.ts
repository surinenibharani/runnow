import type { LucideIcon } from "lucide-react";
import {
  CloudLightning,
  CloudRain,
  Flame,
  Home,
  Snowflake,
  Sun,
  Wind,
} from "lucide-react";
import type { TipIllustrationId } from "@/lib/tips/tips";

export type WeatherTip = {
  icon: LucideIcon;
  illustration: TipIllustrationId;
  condition: string;
  title: string;
  outdoorTips: string[];
  indoorAlternatives: string[];
  skipOutdoor?: string;
};

export const weatherTips: WeatherTip[] = [
  {
    icon: CloudRain,
    illustration: "rain",
    condition: "Rain",
    title: "Rainy days",
    outdoorTips: [
      "Light rain is fine — a brimmed hat and a thin water-resistant jacket beat a bulky coat.",
      "Wear bright colors or a reflective vest; drivers see worse in rain.",
      "Shorten your run or stick to walk-run if footing feels slick.",
      "Change out of wet clothes quickly afterward to avoid chafing and getting chilled.",
    ],
    indoorAlternatives: [
      "Treadmill run or brisk walk — match planned duration, not pace obsession.",
      "Stair climbing intervals: 5 × 2 min up, easy walk down.",
      "Indoor cycling or elliptical for 25–40 min at easy effort.",
      "Follow your plan's cross-training day from home (yoga, bodyweight strength).",
    ],
    skipOutdoor:
      "Skip outdoor running in thunderstorms, flooded paths, or when visibility is dangerously low.",
  },
  {
    icon: Sun,
    illustration: "heat",
    condition: "Heat & humidity",
    title: "Hot and humid days",
    outdoorTips: [
      "Run early morning or near sunset — avoid 10 a.m.–4 p.m. peak heat.",
      "Wear light, breathable fabrics and a cap; sunscreen on exposed skin.",
      "Slow your pace 30–90 sec/mile — heat stress matters more than the watch.",
      "Pre-hydrate and bring water on anything over 30 minutes.",
    ],
    indoorAlternatives: [
      "Treadmill in air conditioning — same time on feet, easier pace.",
      "Pool walk or easy swim for cardio without overheating.",
      "Indoor walking laps at a mall or gym track.",
      "Swap to a rest day if you felt dizzy or nauseous on a recent hot run.",
    ],
    skipOutdoor:
      "Do not run outdoors in heat advisories, extreme humidity with high heart rate, or if you feel faint or headachey before you start.",
  },
  {
    icon: Snowflake,
    illustration: "cold",
    condition: "Cold & ice",
    title: "Cold, ice, and snow",
    outdoorTips: [
      "Layer up: moisture-wicking base, insulating mid-layer, wind-resistant shell.",
      "Warm up indoors 5 minutes before heading out; start slower on icy days.",
      "Traction helps — consider grips on shoes for packed snow or black ice.",
      "Cover ears and hands; breathe through a buff in very cold dry air.",
    ],
    indoorAlternatives: [
      "Treadmill or indoor track when sidewalks are pure ice.",
      "Brisk indoor walking plus your plan's strength or mobility work.",
      "Stationary bike — 30–45 min easy spin maintains fitness without fall risk.",
      "Treat the day as cross-training from your plan instead of forcing a run.",
    ],
    skipOutdoor:
      "Skip outdoor running on untreated ice, during blizzard conditions, or when wind chill makes exposed skin risky within minutes.",
  },
  {
    icon: CloudLightning,
    illustration: "storm",
    condition: "Storms",
    title: "Thunderstorms & lightning",
    outdoorTips: [
      "If you hear thunder, you're close enough to be at risk — head inside immediately.",
      "Never shelter under lone trees; a car or sturdy building is safer.",
      "Check the forecast before you leave; summer storms can build fast.",
    ],
    indoorAlternatives: [
      "Full indoor workout: 10 min warm-up walk, 20 min treadmill or stairs, 5 min cool-down.",
      "Yoga or mobility session — matches a recovery day in your plan.",
      "Bodyweight circuit: squats, lunges, planks, glute bridges (3 rounds).",
      "Reschedule the run — one moved workout does not ruin your plan.",
    ],
    skipOutdoor:
      "Never run outdoors during active lightning. Wait 30 minutes after the last thunder clap before going back out.",
  },
  {
    icon: Wind,
    illustration: "wind",
    condition: "High wind",
    title: "Windy days",
    outdoorTips: [
      "Start into the wind so the return leg is with you — you'll thank yourself later.",
      "Loose braids or a cap with a strap; grit in eyes is miserable at mile 2.",
      "Shorten the loop or pick tree-lined streets and trails for shelter.",
      "Effort matters more than pace — a headwind is a hidden workout.",
    ],
    indoorAlternatives: [
      "Treadmill at planned effort for the day.",
      "Indoor bike — wind doesn't matter and joints get a break.",
      "Walk-run on a gym indoor track if available.",
    ],
  },
  {
    icon: Flame,
    illustration: "air-quality",
    condition: "Poor air quality",
    title: "Smoke, pollution, or high pollen",
    outdoorTips: [
      "Check local air quality index (AQI) — many apps show it by hour.",
      "Below AQI 100 is usually okay for healthy adults; above 150, move indoors.",
      "Run early when ozone and pollen counts are often lower.",
      "A buff can help with pollen; it won't fix heavy smoke.",
    ],
    indoorAlternatives: [
      "Treadmill or gym cardio with filtered air.",
      "Low-impact indoor options: elliptical, rowing machine, swimming.",
      "Strength and mobility from your training plan's cross-training day.",
      "Take a true rest day if air quality is hazardous — health beats the schedule.",
    ],
    skipOutdoor:
      "Avoid outdoor exercise when air is rated unhealthy or hazardous, or when wildfire smoke is in your area.",
  },
  {
    icon: Home,
    illustration: "indoor",
    condition: "No safe option outside",
    title: "Stuck inside? Keep the habit",
    outdoorTips: [
      "Consistency beats perfection — 20 minutes indoors counts as showing up.",
      "Match your plan's intended effort (easy, cross-train, rest) even if the activity changes.",
      "Text a running friend or log the workout anyway — momentum matters.",
    ],
    indoorAlternatives: [
      "Follow a free treadmill or indoor walking video for your planned duration.",
      "Substitute cross-training from your LetsRunNow plan — open the week view and pick today's cross-train block.",
      "Mobility + core: 30 min of yoga, hip openers, and planks.",
      "If you're sick or the weather is dangerous, rest is the right workout.",
    ],
  },
];
