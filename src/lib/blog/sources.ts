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
  exerciseWithOsteoporosis: {
    label: "Exercising with osteoporosis: Stay active the safe way",
    href: "https://www.mayoclinic.org/diseases-conditions/osteoporosis/in-depth/osteoporosis/art-20044989",
    publisher: "Mayo Clinic",
  },
  menopauseFitnessMayo: {
    label: "Women's Wellness: Fitness tips for menopause",
    href: "https://newsnetwork.mayoclinic.org/discussion/womens-wellness-fitness-tips-for-menopause/",
    publisher: "Mayo Clinic",
  },
  menopauseWeightliftingBoneMayo: {
    label:
      "Perimenopause, menopause and weightlifting — bone health (Mayo Clinic Healthcare)",
    href: "https://newsnetwork.mayoclinic.org/discussion/perimenopause-menopause-and-weightlifting-expert-explains-value-for-bone-health/",
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
  altitudeSicknessCleveland: {
    label: "Altitude sickness — symptoms, causes & prevention",
    href: "https://my.clevelandclinic.org/health/diseases/15111-altitude-sickness",
    publisher: "Cleveland Clinic",
  },
  cdcHighAltitudeTravel: {
    label: "High-altitude travel and altitude illness (Yellow Book)",
    href: "https://wwwnc.cdc.gov/travel/yellowbook/2024/environmental-hazards-risks/high-altitude-travel-and-altitude-illness",
    publisher: "CDC / Travelers' Health",
  },
  mayoTravelHealth: {
    label: "How to stay healthy while traveling",
    href: "https://mcpress.mayoclinic.org/living-well/how-to-stay-healthy-while-traveling-tips-for-flights-cruises-and-road-trips/",
    publisher: "Mayo Clinic Press",
  },
  foamRollingBehm2015: {
    label:
      "The effects of self-myofascial release using a foam roller or roller massager on joint range of motion, muscle recovery, and performance — systematic review (Cheatham et al., 2015)",
    href: "https://pubmed.ncbi.nlm.nih.gov/26618062/",
    publisher: "PubMed / International Journal of Sports Physical Therapy",
  },
  strengthTrainingRunningEconomyBlagrove2018: {
    label:
      "Effects of strength training on the physiological determinants of middle- and long-distance running performance — systematic review (Blagrove, Howatson & Hayes, 2018)",
    href: "https://pubmed.ncbi.nlm.nih.gov/29249083/",
    publisher: "PubMed / Sports Medicine",
  },
  stretchingMayo: {
    label: "Stretching: Focus on flexibility",
    href: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/stretching/art-20047931",
    publisher: "Mayo Clinic",
  },
  staticStretchPerformanceKay2012: {
    label:
      "Effect of acute static stretch on maximal muscle performance — systematic review (Kay & Blazevich, 2012)",
    href: "https://pubmed.ncbi.nlm.nih.gov/21659901/",
    publisher: "PubMed / Medicine & Science in Sports & Exercise",
  },
  staticStretchMetaSimic2013: {
    label:
      "Does pre-exercise static stretching inhibit maximal muscular performance? Meta-analysis (Simic et al., 2013)",
    href: "https://pubmed.ncbi.nlm.nih.gov/22316148/",
    publisher: "PubMed / Scandinavian Journal of Medicine & Science in Sports",
  },
  acuteStretchReviewBehm2011: {
    label:
      "Acute effects of static and dynamic stretching on performance — review (Behm & Chaouachi, 2011)",
    href: "https://pubmed.ncbi.nlm.nih.gov/21373870/",
    publisher: "PubMed / European Journal of Applied Physiology",
  },
  passiveStretchForceFowles2000: {
    label:
      "Reduced strength after passive stretch of the human plantarflexors (Fowles et al., 2000)",
    href: "https://pubmed.ncbi.nlm.nih.gov/10904046/",
    publisher: "PubMed / Journal of Applied Physiology",
  },
  stretchingDomsCochrane2011: {
    label:
      "Stretching to prevent or reduce muscle soreness after exercise — Cochrane review (Herbert et al., 2011)",
    href: "https://pubmed.ncbi.nlm.nih.gov/21735398/",
    publisher: "Cochrane Database of Systematic Reviews / PubMed",
  },
  postExerciseStretchRecoveryAfonso2021: {
    label:
      "Post-exercise stretching and recovery of strength, ROM, and DOMS — systematic review & meta-analysis (Afonso et al., 2021)",
    href: "https://pubmed.ncbi.nlm.nih.gov/34025459/",
    publisher: "PubMed / Frontiers in Physiology",
  },
  postExerciseStretchZhang2025: {
    label:
      "Post-exercise stretching vs no stretching on lower-limb recovery and performance — meta-analysis (Zhang, Chen & Xing, 2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/41103301/",
    publisher: "PubMed / Frontiers in Physiology",
  },
  stretchIntensityEccentricRecoveryApostolopoulos2018: {
    label:
      "Different passive static stretching intensities and recovery from eccentric exercise — RCT (Apostolopoulos et al., 2018)",
    href: "https://pubmed.ncbi.nlm.nih.gov/29529387/",
    publisher: "PubMed / Applied Physiology, Nutrition, and Metabolism",
  },
  injuryPreventionExerciseLauersen2014: {
    label:
      "The effectiveness of exercise interventions to prevent sports injuries — meta-analysis (Lauersen et al., 2014)",
    href: "https://pubmed.ncbi.nlm.nih.gov/24100287/",
    publisher: "PubMed / British Journal of Sports Medicine",
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
  strengthTrainingRunningEconomyLlanos2024: {
    label:
      "Effect of strength training programs on middle- and long-distance runners’ economy — systematic review & meta-analysis (Llanos-Lagos et al., 2024)",
    href: "https://pubmed.ncbi.nlm.nih.gov/38165636/",
    publisher: "PubMed / Sports Medicine",
  },
  strengthTrainingRunnerPerformanceLlanos2024: {
    label:
      "Effect of strength training methods on middle- and long-distance runners’ athletic performance — systematic review & meta-analysis (Llanos-Lagos et al., 2024)",
    href: "https://pubmed.ncbi.nlm.nih.gov/38627351/",
    publisher: "PubMed / Sports Medicine",
  },
  strengthTrainingEnduranceUmbrella2025: {
    label:
      "Strength training and endurance performance determinants — umbrella review (Ramos-Campo et al., 2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/40153564/",
    publisher: "PubMed / Journal of Strength and Conditioning Research",
  },
  exerciseInjuryPreventionLauersen2014: {
    label:
      "Exercise interventions to prevent sports injuries — systematic review & meta-analysis (Lauersen, Bertelsen & Andersen, 2014)",
    href: "https://pubmed.ncbi.nlm.nih.gov/24100287/",
    publisher: "PubMed / British Journal of Sports Medicine",
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
  tendonAdaptationBohm2015: {
    label:
      "Human tendon adaptation to mechanical loading — systematic review & meta-analysis (Bohm, Mersmann & Arampatzis, 2015)",
    href: "https://doi.org/10.1186/s40798-015-0009-9",
    publisher: "Sports Medicine - Open",
  },
  tendonCollagenSynthesisMiller2005: {
    label:
      "Coordinated collagen and muscle protein synthesis after exercise (Miller et al., 2005)",
    href: "https://pubmed.ncbi.nlm.nih.gov/16002437/",
    publisher: "PubMed / Journal of Physiology",
  },
  boneStressWorkloadWarden2021: {
    label:
      "Preventing bone stress injuries in runners with optimal workload (Warden, Edwards & Willy, 2021)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8316280/",
    publisher: "Current Osteoporosis Reports / PMC",
  },
  boneStressExercisePrescription2022: {
    label:
      "Exercise prescription for stress fracture prevention — physiologic paradoxes (Hughes et al., 2022)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9679355/",
    publisher: "PMC",
  },
  runningInjuriesVanGent2007: {
    label:
      "Incidence and determinants of lower extremity running injuries in long distance runners — systematic review (van Gent et al., 2007)",
    href: "https://pubmed.ncbi.nlm.nih.gov/17473005/",
    publisher: "PubMed / British Journal of Sports Medicine",
  },
  runningKneeOAAlentornGeli2017: {
    label:
      "Recreational vs competitive running and hip/knee osteoarthritis — systematic review & meta-analysis (Alentorn-Geli et al., 2017)",
    href: "https://pubmed.ncbi.nlm.nih.gov/28504066/",
    publisher: "PubMed / Journal of Orthopaedic & Sports Physical Therapy",
  },
  runningKneeOALo2017: {
    label:
      "History of running and symptomatic knee osteoarthritis — Osteoarthritis Initiative (Lo et al., 2017)",
    href: "https://pubmed.ncbi.nlm.nih.gov/27333572/",
    publisher: "PubMed / Arthritis Care & Research",
  },
  runningKneeOALo2018: {
    label:
      "Running does not increase symptoms or structural progression in people with knee OA — OAI data (Lo et al., 2018)",
    href: "https://pubmed.ncbi.nlm.nih.gov/29728929/",
    publisher: "PubMed / Clinical Rheumatology",
  },
  runningKneeOADhillon2023: {
    label:
      "Effects of running on development of knee osteoarthritis — updated systematic review (Dhillon et al., 2023)",
    href: "https://pubmed.ncbi.nlm.nih.gov/36875337/",
    publisher: "PubMed / Orthopaedic Journal of Sports Medicine",
  },
  longDistanceRunningKneeOAChakravarty2008: {
    label:
      "Long distance running and knee osteoarthritis — prospective study (Chakravarty et al., 2008)",
    href: "https://pubmed.ncbi.nlm.nih.gov/18692736/",
    publisher: "PubMed / American Journal of Preventive Medicine",
  },
  marathonWallRapoport2010: {
    label:
      "Metabolic factors limiting performance in marathon runners — hitting the wall (Rapoport, 2010)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2958805/",
    publisher: "PLOS Computational Biology / PMC",
  },
  carbsTrainingCompetitionBurke2011: {
    label:
      "Carbohydrates for training and competition (Burke et al., 2011)",
    href: "https://pubmed.ncbi.nlm.nih.gov/21660838/",
    publisher: "PubMed / Journal of Sports Sciences",
  },
  nutritionAthleticPerformanceACSM2016: {
    label:
      "Nutrition and Athletic Performance — joint position statement (Thomas, Erdman & Burke, 2016)",
    href: "https://pubmed.ncbi.nlm.nih.gov/26891166/",
    publisher:
      "Academy of Nutrition and Dietetics, Dietitians of Canada & ACSM / PubMed",
  },
  eliteMarathonNutritionStellingwerff2013: {
    label:
      "Contemporary nutrition approaches to optimize elite marathon performance (Stellingwerff, 2013)",
    href: "https://pubmed.ncbi.nlm.nih.gov/23579229/",
    publisher: "PubMed / International Journal of Sport Nutrition and Exercise Metabolism",
  },
  acsmPhysicalActivityBoneHealth2004: {
    label:
      "ACSM Position Stand: Physical activity and bone health (Kohrt et al., 2004)",
    href: "https://pubmed.ncbi.nlm.nih.gov/15514517/",
    publisher: "PubMed / Medicine & Science in Sports & Exercise",
  },
  resistanceTrainingBMDZhao2015: {
    label:
      "Resistance training modes and bone mineral density in postmenopausal women — meta-analysis (Zhao, Zhao & Xu, 2015)",
    href: "https://pubmed.ncbi.nlm.nih.gov/25603795/",
    publisher: "PubMed / Journal of Biomedical Research",
  },
  exerciseBMDPostmenopausalKemmler2023: {
    label:
      "Exercise training and bone mineral density in postmenopausal women — updated meta-analysis (Mohebbi et al., 2023)",
    href: "https://pubmed.ncbi.nlm.nih.gov/36749350/",
    publisher: "PubMed / Osteoporosis International",
  },
  resistanceTrainingBMDOptimal2025: {
    label:
      "Optimal resistance training parameters for improving BMD in postmenopausal women — systematic review & meta-analysis (2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/40420105/",
    publisher: "PubMed",
  },
  yogaFlexibilityBalancePolsgrove2016: {
    label:
      "Impact of 10 weeks of yoga on flexibility and balance of college athletes (Polsgrove, Eggleston & Lockyer, 2016)",
    href: "https://pubmed.ncbi.nlm.nih.gov/26865768/",
    publisher: "PubMed / International Journal of Yoga",
  },
  yogaFunctionalMovementAthletes2022: {
    label:
      "Yoga intervention, functional movement patterns, and mindfulness in collegiate athletes (Xu et al., 2022)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9690310/",
    publisher: "International Journal of Environmental Research and Public Health / PMC",
  },
  yogaAnxietyCramer2018: {
    label:
      "Yoga for anxiety — systematic review and meta-analysis of RCTs (Cramer et al., 2018)",
    href: "https://pubmed.ncbi.nlm.nih.gov/29697885/",
    publisher: "PubMed / Depression and Anxiety",
  },
  yogaTrackFieldAthletes2025: {
    label:
      "Effect of yoga on performance metrics and mental health of track and field athletes — systematic review (2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/41316576/",
    publisher: "PubMed",
  },
  exercisePreventionRRIWu2024: {
    label:
      "Exercise-based prevention programs and running-related injuries — systematic review & meta-analysis (Wu et al., 2024)",
    href: "https://pubmed.ncbi.nlm.nih.gov/38261240/",
    publisher: "PubMed / Sports Medicine",
  },
  cycleRunCrossTrainingMutton1993: {
    label:
      "Run vs combined cycle/run training on VO₂max and running performance (Mutton et al., 1993)",
    href: "https://pubmed.ncbi.nlm.nih.gov/8107548/",
    publisher: "PubMed / Medicine & Science in Sports & Exercise",
  },
  crossTrainingTanaka1994: {
    label:
      "Effects of cross-training — VO₂max transfer between cycling, running and swimming (Tanaka, 1994)",
    href: "https://pubmed.ncbi.nlm.nih.gov/7871294/",
    publisher: "PubMed / Sports Medicine",
  },
  cycleRunCrossTrainingMeta2026: {
    label:
      "Cross-training between running and cycling: VO₂max and running performance — systematic review & meta-analysis (2026)",
    href: "https://doi.org/10.3389/fspor.2026.1843803",
    publisher: "Frontiers in Sports and Active Living",
  },
  sleepDeprivationEnduranceLopes2023: {
    label:
      "How much does sleep deprivation impair endurance performance? — systematic review & meta-analysis (Lopes et al., 2023)",
    href: "https://pubmed.ncbi.nlm.nih.gov/36472094/",
    publisher: "PubMed / European Journal of Sport Science",
  },
  sleepDeprivationAthletesGong2024: {
    label:
      "Acute sleep deprivation and sporting performance in athletes — systematic review & meta-analysis (Gong et al., 2024)",
    href: "https://pubmed.ncbi.nlm.nih.gov/39006249/",
    publisher: "PubMed",
  },
  sleepLossPhysicalPerformanceCraven2022: {
    label:
      "Effects of acute sleep loss on physical performance — systematic & meta-analytical review (Craven et al., 2022)",
    href: "https://pubmed.ncbi.nlm.nih.gov/35708888/",
    publisher: "PubMed / Sports Medicine",
  },
  sleepExtensionAthletesMah2011: {
    label:
      "Sleep extension and athletic performance in collegiate basketball players (Mah et al., 2011)",
    href: "https://pubmed.ncbi.nlm.nih.gov/21731144/",
    publisher: "PubMed / Sleep",
  },
  sleepInjuryAdolescentMilewski2014: {
    label:
      "Chronic lack of sleep and sports injuries in adolescent athletes (Milewski et al., 2014)",
    href: "https://pubmed.ncbi.nlm.nih.gov/25028798/",
    publisher: "PubMed / Journal of Pediatric Orthopaedics",
  },
  sleepAthleticPerformanceWatson2017: {
    label: "Sleep and athletic performance — review (Watson, 2017)",
    href: "https://pubmed.ncbi.nlm.nih.gov/29135639/",
    publisher: "PubMed / Current Sports Medicine Reports",
  },
  sleepAthleteConsensusBJSM2021: {
    label:
      "Sleep and the athlete — narrative review and expert consensus recommendations (Walsh et al., 2021)",
    href: "https://bjsm.bmj.com/content/55/7/356",
    publisher: "British Journal of Sports Medicine",
  },
  sleepInterventionsAthletes2023: {
    label:
      "Impact of sleep interventions on athletic performance — systematic review (2023)",
    href: "https://pubmed.ncbi.nlm.nih.gov/37462808/",
    publisher: "PubMed",
  },
  giEnduranceNutritionStrategies2025: {
    label:
      "Nutritional strategies for minimizing gastrointestinal symptoms during endurance exercise — systematic review (2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/40650376/",
    publisher: "PubMed / Journal of the International Society of Sports Nutrition",
  },
  gutTrainingFeedingChallenge2023: {
    label:
      "Gut-training and feeding-challenge effects on gastrointestinal status in endurance exercise — systematic review (2023)",
    href: "https://pubmed.ncbi.nlm.nih.gov/37061651/",
    publisher: "PubMed",
  },
  returnExerciseCovid2022: {
    label:
      "Return to exercise post-COVID-19 infection — pragmatic approach (2022)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9170595/",
    publisher: "PMC / Journal of Science and Medicine in Sport",
  },
  ahaLongCovidExercise2025: {
    label:
      "Exercise intolerance and training in Long COVID — AHA scientific statement (2025)",
    href: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001348",
    publisher: "American Heart Association / Circulation",
  },
  issnCaffeine2021: {
    label:
      "ISSN position stand: caffeine and exercise performance (2021)",
    href: "https://pubmed.ncbi.nlm.nih.gov/33388079/",
    publisher: "PubMed / Journal of the International Society of Sports Nutrition",
  },
  caffeineEnduranceRunningMeta2023: {
    label:
      "Caffeine intake and endurance running performance / time to exhaustion — systematic review & meta-analysis (2023)",
    href: "https://doi.org/10.3390/nu15010148",
    publisher: "Nutrients / MDPI",
  },
  alcoholSleepMayo: {
    label: "Alcohol and sleep — why drinking before bed backfires",
    href: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/alcohol/art-20044561",
    publisher: "Mayo Clinic",
  },
  hamstringStrainMayo: {
    label: "Hamstring injury — symptoms & causes",
    href: "https://www.mayoclinic.org/diseases-conditions/hamstring-injury/symptoms-causes/syc-20372985",
    publisher: "Mayo Clinic",
  },
  muscleStrainMayo: {
    label: "Muscle strains — diagnosis & treatment",
    href: "https://www.mayoclinic.org/diseases-conditions/muscle-strains/diagnosis-treatment/drc-20350823",
    publisher: "Mayo Clinic",
  },
  toenailFungusMayo: {
    label: "Nail fungus / toenail problems — overview",
    href: "https://www.mayoclinic.org/diseases-conditions/nail-fungus/symptoms-causes/syc-20352300",
    publisher: "Mayo Clinic",
  },
  marathonHeartAcuteLaily2026: {
    label:
      "Acute effects of marathon running on the heart — systematic review & meta-analysis (Laily et al., 2026)",
    href: "https://doi.org/10.1136/bmjsem-2026-003201",
    publisher: "BMJ Open Sport & Exercise Medicine",
  },
  marathonTroponinMetaLi2023: {
    label:
      "Marathon running and high-sensitivity cardiac troponin — systematic review & meta-analysis (Li et al., 2023)",
    href: "https://pubmed.ncbi.nlm.nih.gov/37248881/",
    publisher: "PubMed / Journal of Back and Musculoskeletal Rehabilitation",
  },
  bostonMarathonOrganStressMcKenna2025: {
    label:
      "Biomarkers of organ stress and injury following the Boston Marathon — sex & hydration (McKenna et al., 2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/41101781/",
    publisher: "PubMed / Journal of Applied Physiology",
  },
  marathonAkiBiomarkersMeta2025: {
    label:
      "Acute kidney injury biomarkers in marathon runners — systematic review & meta-analysis (Leucuța et al., 2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/41155766/",
    publisher: "PubMed / Medicina",
  },
  marathonEahReview2022: {
    label:
      "Exercise-associated hyponatremia in marathon runners — review (Klingert et al., 2022)",
    href: "https://pubmed.ncbi.nlm.nih.gov/36431252/",
    publisher: "PubMed / Journal of Clinical Medicine",
  },
  bostonEahAlmond2005: {
    label:
      "Hyponatremia among runners in the Boston Marathon (Almond et al., 2005)",
    href: "https://pubmed.ncbi.nlm.nih.gov/15814880/",
    publisher: "PubMed / New England Journal of Medicine",
  },
  vaporflyEconomyHoogkamer2018: {
    label:
      "Energetic cost of marathon racing shoes — prototype carbon-plate shoes (~4% savings) (Hoogkamer et al., 2018)",
    href: "https://pubmed.ncbi.nlm.nih.gov/29143929/",
    publisher: "PubMed / Sports Medicine",
  },
  carbonPlateBiomechanicsHoogkamer2019: {
    label:
      "Biomechanics of competitive male runners in three marathon racing shoes (Hoogkamer, Kipp & Kram, 2019)",
    href: "https://pubmed.ncbi.nlm.nih.gov/30460454/",
    publisher: "PubMed / Sports Medicine",
  },
  carbonPlateMetaFrontiers2025: {
    label:
      "Metabolic effects of carbon-plated running shoes — systematic review & meta-analysis (~2–3% lower demand) (2025)",
    href: "https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2025.1710224/full",
    publisher: "Frontiers in Sports and Active Living",
  },
  bendingStiffnessReview2021: {
    label:
      "Energetics and biomechanics of increased longitudinal bending stiffness — narrative review (2021)",
    href: "https://pubmed.ncbi.nlm.nih.gov/33830444/",
    publisher: "PubMed / Sports Medicine",
  },
  carbonPlateNavicularTenforde2023: {
    label:
      "Bone stress injuries in runners using carbon-fiber plate footwear — navicular case series (Tenforde et al., 2023)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10356879/",
    publisher: "PMC / Sports Medicine",
  },
  aftEversionFootwearScience2024: {
    label:
      "Injury- and performance-related biomechanics in advanced footwear technology vs minimalist shoes (2024)",
    href: "https://doi.org/10.1080/19424280.2024.2327317",
    publisher: "Footwear Science",
  },
  outsideSuperShoeInjuries: {
    label: "Does super shoe technology prevent injury? Experts aren't sure",
    href: "https://run.outsideonline.com/gear/do-super-shoes-prevent-injuries-experts-share-their-findings/",
    publisher: "Outside / Trail Runner",
  },
  runnersWorldWaShoeRules: {
    label: "Banned running shoes: World Athletics stack-height & plate rules",
    href: "https://www.runnersworld.com/gear/a42418666/banned-running-shoes/",
    publisher: "Runner's World",
  },
  runningWarehouseWhoSuperShoes: {
    label: "Who should buy super shoes?",
    href: "https://www.runningwarehouse.com/learningcenter/gear_guides/footwear/who-should-buy-super-shoes.html",
    publisher: "Running Warehouse",
  },
  wirecutterCasualSuperShoes: {
    label:
      "Super shoes aren't just for Olympians — but do casual runners really need them?",
    href: "https://www.nytimes.com/wirecutter/reviews/carbon-plate-running-shoes/",
    publisher: "NYT Wirecutter",
  },
} satisfies Record<string, BlogSource>;
