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
  heartDiseaseExercise: {
    label: "Exercise and chronic disease — when to check with your doctor",
    href: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise-and-chronic-disease/art-20046049",
    publisher: "Mayo Clinic",
  },
  bloodPressureExercise: {
    label: "Exercise: A drug-free approach to lowering high blood pressure",
    href: "https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/high-blood-pressure/art-20045206",
    publisher: "Mayo Clinic",
  },
  restingHeartRateMayo: {
    label: "Heart rate: What's normal?",
    href: "https://www.mayoclinic.org/healthy-lifestyle/fitness/expert-answers/heart-rate/faq-20057979",
    publisher: "Mayo Clinic",
  },
  targetHeartRatesAHA: {
    label: "Target heart rates chart",
    href: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates",
    publisher: "American Heart Association",
  },
  vo2maxMayoQA: {
    label: "What does a VO₂ max have to do with overall fitness?",
    href: "https://newsnetwork.mayoclinic.org/discussion/mayo-clinic-qa-what-does-a-vo2-max-have-to-do-with-overall-fitness/",
    publisher: "Mayo Clinic News Network",
  },
  hrvMonitoringBuchheit2014: {
    label:
      "Monitoring training status with HR measures: do all roads lead to Rome? (Buchheit, 2014)",
    href: "https://pubmed.ncbi.nlm.nih.gov/24578692/",
    publisher: "PubMed / Sports Med",
  },
  hrvMobileAthletesReview2025: {
    label:
      "Monitoring training adaptation and recovery with HRV via mobile devices (narrative review)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12787763/",
    publisher: "PMC / Sensors",
  },
  hrvNocturnalRecreationalRunners2024: {
    label:
      "Morning versus nocturnal HR and HRV responses to intensified training in recreational runners (2024)",
    href: "https://doi.org/10.1186/s40798-024-00779-5",
    publisher: "Sports Medicine - Open",
  },
  bloodPressureChartMayo: {
    label: "Blood pressure chart: What your reading means",
    href: "https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982",
    publisher: "Mayo Clinic",
  },
  highBloodPressureMayo: {
    label: "High blood pressure (hypertension) — diagnosis & treatment",
    href: "https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/diagnosis-treatment/drc-20373417",
    publisher: "Mayo Clinic",
  },
  ahaExerciseBloodPressure: {
    label: "Getting active to control high blood pressure",
    href: "https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/getting-active-to-control-high-blood-pressure",
    publisher: "American Heart Association",
  },
  lactateThresholdNarrative2024: {
    label:
      "Lactate threshold training to improve long-distance running performance (narrative review, 2024)",
    href: "https://doi.org/10.26773/mjssm.240303",
    publisher: "Montenegrin Journal of Sports Science and Medicine",
  },
  lactateFixedThresholdIndividual2023: {
    label:
      "Individual responses to continuous running at a fixed lactate threshold (2023)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10611166/",
    publisher: "PMC / Frontiers in Physiology",
  },
  faudeLactateThreshold2009: {
    label:
      "Lactate threshold concepts: how valid are they? (Faude, Kindermann & Meyer, 2009)",
    href: "https://pubmed.ncbi.nlm.nih.gov/19480095/",
    publisher: "PubMed / Sports Medicine",
  },
  inspiratoryMuscleTrainingMeta2013: {
    label:
      "Inspiratory muscle training in healthy humans: a meta-analysis of exercise performance (Illi et al., 2012/2013)",
    href: "https://pubmed.ncbi.nlm.nih.gov/22706912/",
    publisher: "PubMed / Sports Medicine",
  },
  diaphragmaticBreathingMayo: {
    label: "Decrease stress by using your breath",
    href: "https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/decrease-stress-by-using-your-breath/art-20247654",
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
