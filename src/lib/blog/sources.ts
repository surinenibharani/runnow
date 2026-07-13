import type { BlogSource } from "./types";

/**
 * Reusable authoritative references for health-related posts.
 * Prefer durable landing pages (Mayo Clinic condition pages, NHS, ACOG,
 * PubMed permalinks) that are unlikely to move.
 */
export const SOURCES = {
  physicalActivityGuidelines: {
    label: "Physical activity guidelines for adults (UK)",
    href: "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/",
    publisher: "NHS",
  },
  physicalActivityGuidelinesUS: {
    label: "Physical activity guidelines for adults",
    href: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
    publisher: "Centers for Disease Control and Prevention (CDC)",
  },
  preParticipationScreening: {
    label: "Exercise and chronic disease — when to check with your doctor",
    href: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise-and-chronic-disease/art-20046049",
    publisher: "Mayo Clinic",
  },
  redS: {
    label: "2023 IOC consensus statement on Relative Energy Deficiency in Sport (REDs)",
    href: "https://doi.org/10.1136/bjsports-2023-106994",
    publisher: "British Journal of Sports Medicine",
  },
  femaleAthleteTriad: {
    label: "Relative Energy Deficiency in Sport (REDs) & the Female Athlete Triad",
    href: "https://orthoinfo.aaos.org/en/diseases--conditions/relative-energy-deficiency-in-sport-reds/",
    publisher: "OrthoInfo — American Academy of Orthopaedic Surgeons",
  },
  cadenceResearch: {
    label: "Effects of step-rate manipulation on joint mechanics during running (Heiderscheit et al., 2011)",
    href: "https://pubmed.ncbi.nlm.nih.gov/21131861/",
    publisher: "PubMed / Med Sci Sports Exerc",
  },
  menstrualCycleReview: {
    label: "The effects of menstrual cycle phase on exercise performance (McNulty et al., 2020)",
    href: "https://pubmed.ncbi.nlm.nih.gov/32661839/",
    publisher: "Sports Medicine",
  },
  menstrualCycleUmbrella2023: {
    label: "Umbrella review: menstrual cycle phase and strength performance (2023)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10076834/",
    publisher: "Frontiers in Sports and Active Living / PMC",
  },
  ironDeficiency: {
    label: "Iron deficiency anemia — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/iron-deficiency-anemia/symptoms-causes/syc-20355034",
    publisher: "Mayo Clinic",
  },
  hyponatremia: {
    label: "Hyponatremia (low blood sodium) — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/hyponatremia/symptoms-causes/syc-20373711",
    publisher: "Mayo Clinic",
  },
  shinSplints: {
    label: "Shin splints — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/shin-splints/symptoms-causes/syc-20354105",
    publisher: "Mayo Clinic",
  },
  patellofemoralPain: {
    label: "Patellofemoral pain syndrome (runner's knee)",
    href: "https://www.mayoclinic.org/diseases-conditions/patellofemoral-pain-syndrome/symptoms-causes/syc-20350792",
    publisher: "Mayo Clinic",
  },
  itBandSyndrome: {
    label: "Iliotibial (IT) band syndrome",
    href: "https://my.clevelandclinic.org/health/diseases/21967-iliotibial-band-syndrome",
    publisher: "Cleveland Clinic",
  },
  plantarFasciitis: {
    label: "Plantar fasciitis — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/plantar-fasciitis/symptoms-causes/syc-20354846",
    publisher: "Mayo Clinic",
  },
  stressFracture: {
    label: "Stress fractures — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/stress-fractures/symptoms-causes/syc-20354057",
    publisher: "Mayo Clinic",
  },
  achillesTendinitis: {
    label: "Achilles tendinitis — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/achilles-tendinitis/symptoms-causes/syc-20369020",
    publisher: "Mayo Clinic",
  },
  mortonsNeuroma: {
    label: "Morton's neuroma — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/mortons-neuroma/symptoms-causes/syc-20351935",
    publisher: "Mayo Clinic",
  },
  peaceAndLove: {
    label: "Soft-tissue injuries need PEACE & LOVE (modern rehab guidance)",
    href: "https://blogs.bmj.com/bjsm/2019/04/26/soft-tissue-injuries-simply-need-peace-love/",
    publisher: "British Journal of Sports Medicine blog",
  },
  intermittentFasting: {
    label: "Intermittent fasting: what is it, and how does it work?",
    href: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/intermittent-fasting-what-is-it-and-how-does-it-work",
    publisher: "Johns Hopkins Medicine",
  },
  weightLoss: {
    label: "Weight loss: 6 strategies for success",
    href: "https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/weight-loss/art-20047752",
    publisher: "Mayo Clinic",
  },
  runningNutrition: {
    label: "Eating and exercise: 5 tips to maximize your workouts",
    href: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise/art-20045506",
    publisher: "Mayo Clinic",
  },
  pregnancyExercise: {
    label: "Exercise during pregnancy",
    href: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy",
    publisher: "American College of Obstetricians and Gynecologists",
  },
  diabetesExercise: {
    label: "Fitness and blood glucose",
    href: "https://diabetes.org/health-wellness/fitness",
    publisher: "American Diabetes Association",
  },
  exerciseInducedAsthma: {
    label: "Exercise-induced asthma — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/exercise-induced-asthma/symptoms-causes/syc-20372300",
    publisher: "Mayo Clinic",
  },
  osteoporosis: {
    label: "Osteoporosis — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/osteoporosis/symptoms-causes/syc-20351968",
    publisher: "Mayo Clinic",
  },
  strengthForRunners: {
    label: "Strength training: get stronger, leaner, healthier",
    href: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/strength-training/art-20046670",
    publisher: "Mayo Clinic",
  },
  heartRateZones: {
    label: "Exercise intensity: how to measure it (target heart rate)",
    href: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise-intensity/art-20046887",
    publisher: "Mayo Clinic",
  },
  heatSafety: {
    label: "Exercising safely in the summer heat",
    href: "https://communityhealth.mayoclinic.org/featured-stories/exercise-summer-heat",
    publisher: "Mayo Clinic",
  },
  sleepTips: {
    label: "Sleep tips: 6 steps to better sleep",
    href: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379",
    publisher: "Mayo Clinic",
  },
  dehydration: {
    label: "Dehydration — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/dehydration/symptoms-causes/syc-20354086",
    publisher: "Mayo Clinic",
  },
  intervalTrainingVO2max2024: {
    label:
      "HIIT vs continuous training for aerobic performance (systematic review & meta-analysis, 2024)",
    href: "https://pubmed.ncbi.nlm.nih.gov/38904772/",
    publisher: "PubMed",
  },
  intervalTrainingVO2maxRunners2021: {
    label:
      "Interval training and VO₂max in well-trained endurance runners (systematic review, 2021)",
    href: "https://pubmed.ncbi.nlm.nih.gov/33605843/",
    publisher: "PubMed",
  },
  strengthTrainingRunningEconomy2016: {
    label:
      "Strength training improves running economy in trained runners (systematic review & meta-analysis, 2016)",
    href: "https://pubmed.ncbi.nlm.nih.gov/26694507/",
    publisher: "J Strength Cond Res / PubMed",
  },
  acsmExercisePrescription2009: {
    label:
      "ACSM Position Stand: Exercise prescription for apparently healthy adults (2009)",
    href: "https://www.bewegenismedicijn.nl/files/downloads/full_text_acsm_position_stand_parameters_of_exercise_for_adults.pdf",
    publisher: "ACSM",
  },
  exerciseAfterPregnancy: {
    label: "Exercise after pregnancy",
    href: "https://www.acog.org/womens-health/faqs/exercise-after-pregnancy",
    publisher: "American College of Obstetricians and Gynecologists",
  },
  anxietyDisorders: {
    label: "Anxiety disorders — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961",
    publisher: "Mayo Clinic",
  },
  heatExhaustion: {
    label: "Heat exhaustion — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/heat-exhaustion/symptoms-causes/syc-20373250",
    publisher: "Mayo Clinic",
  },
} satisfies Record<string, BlogSource>;
