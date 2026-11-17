import type { BlogPost } from "./types";
import { SOURCES } from "./sources";

const AUTHOR = "B";

/**
 * East Coast winter after fall race season.
 * Live at 7:00 AM Eastern on publishedAt.
 */
export const winterEastCoastPosts: BlogPost[] = [
  {
    slug: "winter-east-coast-after-race-season",
    metaTitle: "East Coast Winter After Race Season: What Actually Helps",
    title:
      "After the Fall Races: What to Do on the East Coast So Next Season Still Works",
    excerpt:
      "Just finished a first 5K, a half, or a marathon — or coming back after time off? Keep the engine warm without an ice injury. Walk-run counts. Indoor miles count.",
    category: "Training",
    author: AUTHOR,
    publishedAt: "2026-11-16",
    readTime: "12 min",
    relatedSlugs: [
      "cold-weather-running-hub",
      "off-season-between-training-plans",
      "treadmill-indoor-winter-running",
      "importance-of-cross-training",
      "cross-training-swim-elliptical-aqua-jog",
      "bodyweight-strength-for-runners",
      "running-in-bad-weather",
      "night-running-safety",
      "weather-running-gear-tops-bottoms-shoes",
      "comeback-after-running-break",
    ],
    closingQuestion:
      "After your fall race, what did you actually keep through winter — and what did you wish you had started before the sidewalks froze?",
    howTo: {
      name: "How to train through an East Coast winter after race season",
      description:
        "Recover from the fall race, run outside only when the surface and wind chill are honest, and keep strength plus a little intensity for spring.",
      steps: [
        {
          name: "Downshift before you maintain",
          text: "Give a 5K a few easy days, a half an easier week or two, and a marathon longer. Walk, sleep, and eat. Do not start the next build the morning after the race.",
        },
        {
          name: "Run outside only on honest days",
          text: "Prefer a clear afternoon over a dark dawn. Use the feels-like temperature, dress so the first minutes are slightly cool, and judge pace by effort.",
        },
        {
          name: "Stay in when ice or wind chill wins",
          text: "Skip untreated ice, storms, and wind chills near the 30-minute frostbite range. Use the treadmill, bike, or elliptical instead of making the miles up later.",
        },
        {
          name: "Keep the work that transfers to spring",
          text: "Lift twice a week, keep one short dose of quicker running on a safe surface, and keep one longer easy effort so two-hour durability does not disappear.",
        },
      ],
    },
    sources: [
      SOURCES.mujikaPadillaDetraining2000a,
      SOURCES.mujikaPadillaDetraining2000b,
      SOURCES.zhengDetrainingVo2max2022,
      SOURCES.hicksonFrequency1981,
      SOURCES.hicksonDuration1982,
      SOURCES.spieringMinimalDose2021,
      SOURCES.crossTrainingTanaka1994,
      SOURCES.cycleRunCrossTrainingMutton1993,
      SOURCES.strengthTrainingRunningEconomyBlagrove2018,
      SOURCES.strengthTrainingRunningEconomyLlanos2024,
      SOURCES.exerciseInjuryPreventionLauersen2014,
      SOURCES.acsmColdInjury2006,
      SOURCES.acsmColdInjuryConsensus2021,
      SOURCES.nwsWindChill,
      SOURCES.cdcHypothermiaFrostbite,
      SOURCES.ahaColdWeatherHeart,
      SOURCES.ahaActiveInCold,
      SOURCES.exerciseInducedAsthma,
      SOURCES.rwColdWeatherClothing,
      SOURCES.physicalActivityGuidelinesUS,
      SOURCES.preParticipationScreening,
    ],
    faq: [
      {
        question: "Will I lose all my fitness if I barely run until March?",
        answer:
          "You lose some aerobic fitness if you stop, and more if the stop lasts the whole winter. Strength fades more slowly. A smaller plan — a little real effort, one longer easy session, two strength days — holds more than the couch, and it will not hold a marathon-length long run by itself. The ranges from the detraining reviews are in the optional notes at the bottom. You can skip them.",
      },
      {
        question: "How cold is too cold to run outside on the East Coast?",
        answer:
          "There is no single cutoff. Most cold-weather exercise is safe with the right clothes, wind plan, and dry layers. On the I-95 corridor the usual reason to skip the outdoor run is ice, not frostbite. A 34°F morning after rain is often more dangerous than a dry afternoon in the 20s. The wind-chill lines where exposed skin can freeze are in the optional notes at the bottom. You can skip them.",
      },
      {
        question: "Is the treadmill a real run in the off-season?",
        answer:
          "Yes for the heart and the legs, with one limit: the belt does not teach you to land on a cambered, dark, possibly icy sidewalk. Use it when the surface outside is a bad idea. Keep most treadmill days easy, and save any harder piece for the belt rather than a glazed road. Details are in the indoor winter guide.",
      },
      {
        question: "Should I keep doing speedwork after the goal race?",
        answer:
          "Not the week you finish, and not on ice. After the downshift, one short dose of quicker running — strides, or a few comfortably hard minutes on a clear path or treadmill — is enough to protect fitness. That is not a track workout in a nor'easter. Keep one longer easy session too. Very short work does not fully protect a two-hour effort. The studies behind that split are in the notes.",
      },
      {
        question: "I have a spring half or Boston. When does training start again?",
        answer:
          "Recover from the fall race first. A November marathon does not lead into a hard build the next Monday. Boston is Patriots' Day, the third Monday in April, so the serious build is a winter project — after the downshift, not instead of it. A spring 10K or half has more room. Open a plan when sleep, soreness, and motivation have caught up, and start earlier in the plan than ego suggests if the fall block emptied you.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "**Educational only — not medical advice.** Chest pain, pressure, fainting, sudden shortness of breath, wheezing that does not settle, confusion, or a fall that leaves focal bone pain need clinical care. People with heart disease, asthma, or another condition that changes how they handle cold should follow their own clinician's plan before treating a blog as clearance.",
          "Whether you just finished your first 5K, a half, or a marathon — or you're coming back after time off — the goal is the same: keep the engine warm without collecting an ice injury. Walk-run still counts. Indoor miles still count.",
          "Fall road racing on the East Coast runs from mid-October into November: Marine Corps, New York, the Philadelphia Marathon, half, and 8K, Atlantic City, and the other start lines people actually train for. Then the daylight shrinks, the freeze-thaw cycle starts, and a lot of good runners disappear until the first warm Saturday in March.",
          "Hibernating feels logical. It is also how April becomes a six-week panic. The useful winter is smaller than race season. It is picky about which days deserve shoes, and it is fine if some of those days are a walk.",
        ],
      },
      {
        id: "first-weeks",
        heading: "The first job is finishing the season you just ran",
        paragraphs: [
          "There is no rule of one rest day per mile raced. Stopping costs aerobic fitness. A reduced plan costs less than stopping. The week after a goal race is a downshift, then a maintenance winter — not a second peak, and not a couch until the forsythia. The numbers behind that are in the notes at the bottom.",
          "A 5K can be a few easy days. A half wants an easier week or two. A marathon wants longer. Sleep, eat, and walk. If something hurts in a way that is not ordinary soreness, treat that before you 'stay in shape.' The between-plans guide has the general shape; this post is what that shape looks like once the East Coast actually gets cold.",
        ],
        list: [
          "Let the goal race be over before you sign up for the next one out of adrenaline",
          "Keep blood moving with walks, an easy spin, or a short treadmill jog if legs allow",
          "Strength can wait a few days if tissues are angry; it should not wait until March",
          "Protect sleep the way you protected the long run ([sleep and recovery](/blog/sleep-recovery-for-runners))",
        ],
        cta: {
          text: "Off-season between training plans",
          href: "/blog/off-season-between-training-plans",
        },
      },
      {
        id: "east-coast",
        heading: "What East Coast winter actually threatens",
        paragraphs: [
          "From northern New England down the I-95 corridor, winter is not one climate. A January afternoon in Washington is a different sport from a January morning in Portland, Maine, or Burlington.",
          "The shared problems are the same: early dark, wind off the ocean or a river, and pavement that melts at lunch and freezes by dinner.",
          "Around the winter solstice, Boston through Washington has roughly nine to nine and a half hours of daylight, and sunset is mid-afternoon. The coldest, slickest hour is often near sunrise, after the overnight refreeze. The warmest part of a clear day is typically mid-afternoon.",
          "If you have a choice, that later window is usually the outdoor run. If your only window is dark, the night-running rules apply, and ice plus darkness is a reason to stay in.",
          "Use the feels-like temperature, not only the number on a bank sign. Frostbite needs the air itself below freezing. Above freezing, wind and wet clothes can still drop your core temperature. The chart values are in the optional notes at the bottom.",
          "On this coast, the injury that ends more winters is a fall. Black ice does not care that the sign says 34°F. Traction devices help on packed snow. They do not turn glare ice into a workout.",
          "If the sidewalk is a rink, the treadmill is the training decision. Layering, cotton, and shoe rules live in the [cold-weather hub](/blog/cold-weather-running-hub) and the [gear guide](/blog/weather-running-gear-tops-bottoms-shoes).",
        ],
      },
      {
        id: "decide",
        heading: "Quick decision guide",
        paragraphs: [
          "When the forecast is messy, use this before you debate the workout.",
        ],
        subsections: [
          {
            heading: "Pick one. Then stop negotiating.",
            table: {
              columns: ["If this is true", "Do this"],
              rows: [
                [
                  "Clear sidewalk and a reasonable wind chill",
                  "Outdoor easy run, or a walk-run",
                ],
                [
                  "Ice, a storm, or very low visibility",
                  "Treadmill, bike, or strength",
                ],
                ["You feel off or sick", "Rest"],
              ],
            },
          },
        ],
      },
      {
        id: "when-to-run",
        heading: "If you feel like running, here is when",
        paragraphs: [
          "Wanting the run is useful information. It is not a weather report. Go outside when the surface is honest, you can see it, and the wind chill is nowhere near frostbite territory for the time you will be out.",
        ],
        list: [
          "Prefer a clear afternoon over a dark dawn when both are available",
          "Read the forecast's 'feels like,' not only the air temperature, especially on the water",
          "Dress so the first few minutes feel a little cool — you will heat up",
          "Dress for air about 10–20°F warmer than it is. If the wind chill is colder, use that number instead",
          "Short easy run, or you stay cold: add about 10–15°F, which means wear more. Long run, or you heat up fast: add about 20°F. It is a coaching guess. The source is in the optional notes",
          "Skip cotton next to the skin. Once it is wet, it stays wet",
          "Cover ears, nose, fingers, and toes. Those are the parts that freeze. A light layer you can vent beats a parka you sweat through",
          "Run by effort. Cold, clothes, and cautious footing make summer pace feel harder. The talk test still works ([easy effort](/blog/easy-runs-effort-heart-rate))",
          "Change into dry clothes when you stop. That is when people get chilled",
          "Leave the alcohol for later. It can make you feel warmer than you are",
        ],
        closingParagraphs: [
          "A heavy outdoor outfit can still make sense down through the single digits above 0°F, with no skin showing. Colder than that band, indoors is the simpler call for most people. The wind-chill line where exposed skin freezes quickly is in the optional notes.",
          "If you cannot feel your fingers or toes, or the skin turns white, gray, or waxy, the run is over. If you have chest pain, pressure, lightheadedness, or a heartbeat that will not settle, stop and get help.",
          "Cold tightens blood vessels and can raise blood pressure. People with coronary disease often feel chest pain in the cold. A sudden hard effort — shoveling is the classic case — is a bad idea if your heart history is complicated.",
          "Cold, dry air can also irritate airways, especially with a cold face. Cover your mouth lightly if that helps, use the inhaler plan you already have, and do not negotiate with wheezing that is new or getting worse.",
        ],
        cta: {
          text: "Cold-weather running hub",
          href: "/blog/cold-weather-running-hub",
        },
      },
      {
        id: "stay-in",
        heading: "Stay in on these days",
        list: [
          "Ice storms, untreated sidewalks, or a route you cannot see well enough to trust",
          "Wind chill near the 30-minute frostbite range, unless you are fully covered and the session is short and planned",
          "Whiteout, heavy wet snow, or a nor'easter that soaks the kit you cannot change",
          "Night plus ice — visibility and footing fail together ([night safety](/blog/night-running-safety))",
          "You are sick with chest symptoms, fever, or dizziness. Fitness can wait a week. A bad decision in the cold cannot",
          "White, gray, or waxy skin, or numbness: treat that as frostbite and get out of the cold. Shivering plus confusion, fumbling hands, slurred speech, or drowsiness: treat that as hypothermia. A core temperature below 95°F is an emergency",
        ],
        paragraphs: [
          "Indoor miles count. The [treadmill guide](/blog/treadmill-indoor-winter-running) is the swap for a bad sidewalk, not a consolation prize.",
        ],
      },
      {
        id: "what-helps",
        heading: "What to do instead, if the point is next season",
        paragraphs: [
          "You don't need to train hard all winter. You just need to protect four things.",
          "Here's what actually moves the needle — and it's okay if some weeks are lighter. Do them through December, January, and February, and March is a build instead of a rescue. The studies are optional reading at the bottom.",
        ],
        subsections: [
          {
            heading: "1. Two real strength sessions a week",
            paragraphs: [
              "Two real strength sessions a week is the highest-return indoor work for most recreational runners — including beginners. Heavier lifting and plyometrics are the versions tied to easier running at the same pace, and to fewer overuse injuries. That is a help, not a promise you cannot get hurt, and it does not replace sensible mileage when you build again.",
              "Do the lifting indoors, on a floor that is not icy. Hips, single-leg strength, calves, and a hinge pattern cover most of what running asks. If bodyweight squats and lunges are still shaky, start there. If they are easy, add load. Plyometrics belong on a dry gym floor, not a frozen stoop. Two days is the right dose if you want next season's economy, not merely 'not weaker.'",
            ],
          },
          {
            heading: "2. Keep a little intensity, on a safe surface",
            paragraphs: [
              "A little intensity keeps the engine from fading. It does not have to be a full track session. Volume can drop. Easy-only, all winter, is the version that lets fitness slip.",
              "Once you have recovered from the race, one day a week with a few strides, or a short comfortably hard piece, on a treadmill or a clearly dry path. That is the intensity. It is not a track workout in the dark on untreated pavement. The lab sessions behind this were much harder, in young people. Do not copy them outdoors.",
            ],
          },
          {
            heading: "3. Keep one longer easy effort",
            paragraphs: [
              "Short and fierce protects the engine. It does not fully protect the ability to stay out for two hours. Once a week, keep a longer easy session: a conversational run when the route is clean, or 60–90 easy minutes on the bike or elliptical when it is not. Hiking counts on days the trail is dry and the footing is obvious. Icy singletrack is not the virtuous version of a long run.",
            ],
          },
          {
            heading: "4. Cross-train for the days running is the wrong tool",
            paragraphs: [
              "Cycling, the elliptical, swimming, and aqua jogging keep the heart working when impact is a bad idea. Some of that fitness carries back to running. None of it replaces running. Swimming carries the least. The fitter you are, the more the actual sport matters.",
              "Use the bike and the pool to replace the runs the weather stole. Keep at least a little running in the week when skin, lungs, and sidewalks allow, so spring is not your first landing in four months. Session ideas are in the [swim, elliptical, and aqua-jog guide](/blog/cross-training-swim-elliptical-aqua-jog).",
            ],
          },
        ],
        cta: {
          text: "Bodyweight strength for runners",
          href: "/blog/bodyweight-strength-for-runners",
        },
      },
      {
        id: "week",
        heading: "One winter week that is enough",
        paragraphs: [
          "This is a maintenance template, not a rigid plan. Move days when the weather turns. Missed sessions stay missed — no doubling up. It is also not medical clearance.",
        ],
        subsections: [
          {
            heading: "A maintenance week after the downshift",
            paragraphs: [
              "Use this after the easy post-race weeks, when you want to run again in the spring. Swap any run for a walk-run if that is what the day allows.",
            ],
            table: {
              caption: "What to aim for. Ice days use the right-hand column.",
              columns: ["Day", "Focus", "If the sidewalk is ice"],
              rows: [
                [
                  "Monday",
                  "Strength, 30–45 minutes",
                  "Still lift. You are indoors",
                ],
                [
                  "Tuesday",
                  "Easy run, 30–45 minutes, conversational",
                  "Treadmill, or an easy bike of similar effort",
                ],
                ["Wednesday", "Walk or full rest", "Rest"],
                [
                  "Thursday",
                  "Easy run with 4–6 short strides, or a few comfortably hard minutes",
                  "Do the quicker part on the treadmill, or skip it",
                ],
                ["Friday", "Strength again", "Still lift"],
                [
                  "Saturday",
                  "Longer easy effort, 60–90 minutes",
                  "Bike, elliptical, or aqua jog. Same easy effort",
                ],
                ["Sunday", "Off", "Off"],
              ],
            },
          },
        ],
        closingParagraphs: [
          "A winter that still includes moderate aerobic work most weeks, plus two strength days, has done the health job even if the long run moved to the trainer. If a spring race is the real goal, start the structured plan with enough weeks left. Do not invent the whole build in March. Coming back after a longer break has its own rules ([comeback guide](/blog/comeback-after-running-break)).",
        ],
      },
      {
        id: "enough",
        heading: "A smaller winter is not lost time",
        paragraphs: [
          "A smaller winter is not lost time. It is how next spring starts from a better place instead of a rescue mission. Keep the easy days easy, respect the ice, and show up in whatever form the day allows — run, walk-run, bike, or strength. That is enough.",
        ],
      },
      {
        id: "what-research-shows",
        heading: "Notes and references (optional deeper reading)",
        paragraphs: [
          "Optional. The plan above is enough. This is the research behind it, for anyone who wants the sources and the limits. The link list follows the questions.",
        ],
        subsections: [
          {
            heading: "What you lose if you stop",
            paragraphs: [
              "Mujika and Padilla’s two-part review in *Sports Medicine* (2000) is the standard map of detraining. In highly trained athletes, the studies they summarize show VO₂max falling about 4–14% with less than four weeks of too little training, and about 6–20% when the shortfall lasts longer. Blood volume and stroke volume drop quickly. Endurance performance drops with them. People who only recently got fit can lose those new gains more completely. Strength and muscle size decline more slowly, and often stay above an untrained baseline for a long time.",
              "A 2022 meta-analysis of 21 athlete studies (Zheng et al.) found a moderate VO₂max drop after about 30 days or less of training cessation (effect size about −0.62) and a large drop after longer cessation (about −1.42). The long-term pool was inconsistent across studies (I² about 76%), so that large number is an average, not a personal forecast. Doing some training during a long layoff blunted the loss compared with stopping outright. In the first 30 days, that partial-versus-complete difference was not clear. Stretching a total stop past 30–90 days did not clearly make VO₂max fall further. The useful reading: the first month off is the expensive month.",
              "Mujika and Padilla’s own maintenance advice is slightly stricter than the smallest Hickson dose below: negative effects can be limited if intensity stays up, frequency is cut only moderately, and volume is what you slash.",
            ],
          },
          {
            heading: "How little still holds fitness",
            paragraphs: [
              "Hickson and Rosenkoetter (1981) trained 12 young adults hard — about 40 minutes, six days a week — for 10 weeks, then cut them to four days or two days for 15 weeks without easing the intensity or the session length. VO₂max stayed at the trained level. Hickson and colleagues (1982) then cut session length to 26 or 13 minutes while keeping frequency and intensity. VO₂max and short endurance held. The two-hour-plus effort did not fully hold in the 13-minute group: the paper reports time to exhaustion falling about 10%, from 139 minutes to 123.",
              "Spiering, Mujika, Sharp, and Foulis (2021) reviewed the minimum dose that preserves performance. Endurance, in the populations studied, held for up to about 15 weeks when frequency dropped to two sessions a week, or when volume was cut by a third to two-thirds, if intensity stayed up. Lowering intensity is the change that let VO₂max fall. Strength in younger adults held for a long stretch with one hard session a week. Older adults often needed two sessions and two or three sets to hold muscle size. The authors are explicit that the data are not strong enough for a precise recipe in already-trained athletes, and the original aerobic sessions were near maximal. A January stride session is the translation. A near-max laboratory workout on an icy road is not.",
            ],
          },
          {
            heading: "Strength, and why the bike is only a bridge",
            paragraphs: [
              "Blagrove, Howatson, and Hayes (2018) and a 2024 meta-analysis by Llanos-Lagos and colleagues find that heavy strength work and plyometrics can improve running economy in middle- and long-distance runners. Earlier reviews of programs that were actually carried out often describe gains of a few percent, sometimes in the range of about 2–8%. That is not a guaranteed discount on your next race. Lauersen, Bertelsen, and Andersen (2014), across sports rather than in runners alone, found strength training reduced sports injuries to less than a third and could almost halve overuse injuries. It is not a force field, and it does not replace a sane return to mileage.",
              "Tanaka’s 1994 review: some of a VO₂max gain transfers among cycling, running, and swimming; swim training transfers the least; cross-training never beats training the sport you care about; specificity matters more the fitter you are. For everyone else it is useful for general fitness, rehab, and stretches of mental fatigue. Mutton and colleagues (1993): over five weeks, moderately fit runners who alternated hard running and cycling improved treadmill fitness and run times in line with a run-only group.",
              "The adult activity floor underneath a maintenance winter is the CDC guideline: at least 150 minutes a week of moderate aerobic work, plus muscle-strengthening on two days.",
            ],
          },
          {
            heading: "Cold, wind, and when to stay in",
            paragraphs: [
              "The National Weather Service wind-chill chart applies only at or below 50°F with wind above 3 mph. Their worked example: 0°F and a 15 mph wind is a −19°F wind chill, and exposed skin can freeze in about 30 minutes. Frostbite requires the air temperature itself to be below freezing. Wind cannot freeze skin when the thermometer is above 32°F.",
              "The American College of Sports Medicine position stand (Castellani et al., 2006), and the 2021 consensus that updated it, say exercise is reasonable in most cold environments if clothing, wind, and wet are managed. Frostbite risk on exposed skin is under 5% when the air is warmer than 5°F (−15°C). They want extra surveillance once wind chill falls to about −27°C. The 2006 paper prints that as −18°F; the 2021 statement prints −17°F. Same threshold, rounding. Exposed skin can freeze in 30 minutes or less in that band. People with asthma or cardiovascular disease can exercise in the cold and should be followed closely. Cold, dry air plus facial cooling is a known trigger for exercise-induced bronchospasm.",
              "The CDC lists adult hypothermia signs as shivering, exhaustion, confusion, fumbling hands, memory loss, slurred speech, and drowsiness. A temperature below 95°F is an emergency. Hypothermia can also happen above 40°F if you are wet from rain, sweat, or cold water and then get chilled. Numbness and white, gray, or waxy skin are frostbite signs, not the hypothermia list. Nose, ears, cheeks, chin, fingers, and toes are the sites the CDC tells you to cover.",
              "The American Heart Association’s cold-weather pages: cold constricts blood vessels and can raise blood pressure; people with coronary disease often get angina in the cold; 30°F with a 30 mph wind feels like about 15°F, which matches the weather-service chart; wet clothes make the loss faster; skip cotton against the skin; cover your head; hydrate; alcohol can make you feel warmer than you are. Their hard-effort warning is written around snow shoveling. The same physiology is why a sudden all-out run is a poor idea if your heart history is complicated.",
              "Runner’s World’s cold-clothing guide is the field manual for dressing 10–20°F warmer than the air. The finer split in their articles: add about 10–15°F for a short easy run, a smaller runner, or someone who stays cold (that means wear more), and about 20°F for a long run, a hard workout, or someone who overheats. Their clothing chart still describes an outdoor outfit down through the 0–9°F band, and says that colder than that is probably an indoor day. It does not include wind chill. Adjust before you add the degrees.",
            ],
          },
        ],
      },
    ],
  },
];
