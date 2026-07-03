import {
  ExerciseChartConfig,
  FigurePoseSvg,
  MotionArrow,
  MuscleMap,
  StepBadge,
  shiftPose,
  type FigurePose,
} from "@/components/blog/dumbbell-exercise-figure";

type DumbbellExerciseDiagramProps = {
  exerciseId: string;
  className?: string;
};

const standing: FigurePose = {
  head: { x: 0, y: 0 },
  neck: { x: 0, y: 10 },
  shoulderL: { x: -11, y: 16 },
  shoulderR: { x: 11, y: 16 },
  elbowL: { x: -12, y: 32 },
  elbowR: { x: 12, y: 32 },
  handL: { x: -12, y: 46 },
  handR: { x: 12, y: 46 },
  hip: { x: 0, y: 38 },
  kneeL: { x: -7, y: 58 },
  kneeR: { x: 7, y: 58 },
  footL: { x: -8, y: 78 },
  footR: { x: 8, y: 78 },
  bells: { mode: "hands" },
};

const EXERCISE_CHARTS: Record<string, ExerciseChartConfig> = {
  "goblet-squat": {
    muscles: ["quads", "glutes"],
    pose1: { ...standing, bells: { mode: "single-chest" }, elbowL: { x: -6, y: 30 }, elbowR: { x: 6, y: 30 } },
    pose2: {
      ...standing,
      bells: { mode: "single-chest" },
      head: { x: 0, y: 18 },
      neck: { x: 0, y: 28 },
      shoulderL: { x: -12, y: 34 },
      shoulderR: { x: 12, y: 34 },
      elbowL: { x: -14, y: 48 },
      elbowR: { x: 14, y: 48 },
      hip: { x: 0, y: 48 },
      kneeL: { x: -16, y: 62 },
      kneeR: { x: 16, y: 62 },
      footL: { x: -14, y: 78 },
      footR: { x: 14, y: 78 },
    },
    arrow: { x1: 108, y1: 118, x2: 188, y2: 118, bend: -18 },
  },
  rdl: {
    muscles: ["hamstrings", "glutes"],
    pose1: { ...standing, bells: { mode: "hands" } },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 10, y: 8 },
      neck: { x: 8, y: 18 },
      shoulderL: { x: -2, y: 24 },
      shoulderR: { x: 14, y: 24 },
      elbowL: { x: -4, y: 40 },
      elbowR: { x: 16, y: 40 },
      handL: { x: -6, y: 58 },
      handR: { x: 18, y: 58 },
      hip: { x: 4, y: 36 },
      kneeL: { x: -2, y: 54 },
      kneeR: { x: 10, y: 54 },
      footL: { x: -4, y: 78 },
      footR: { x: 12, y: 78 },
    },
    arrow: { x1: 108, y1: 118, x2: 188, y2: 118, bend: 16 },
  },
  "walking-lunge": {
    muscles: ["quads", "glutes"],
    pose1: { ...standing, bells: { mode: "hands" } },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 4, y: 2 },
      neck: { x: 4, y: 12 },
      shoulderL: { x: -7, y: 18 },
      shoulderR: { x: 15, y: 18 },
      hip: { x: 4, y: 40 },
      kneeL: { x: -6, y: 58 },
      kneeR: { x: 18, y: 66 },
      footL: { x: -6, y: 78 },
      footR: { x: 22, y: 78 },
    },
    arrow: { x1: 108, y1: 124, x2: 188, y2: 124, bend: -12 },
  },
  "bent-row": {
    muscles: ["lats", "rhomboids"],
    pose1: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 8, y: 6 },
      neck: { x: 6, y: 16 },
      shoulderL: { x: -4, y: 22 },
      shoulderR: { x: 12, y: 22 },
      handL: { x: -2, y: 58 },
      handR: { x: 14, y: 58 },
      hip: { x: 2, y: 38 },
      kneeL: { x: -4, y: 56 },
      kneeR: { x: 8, y: 56 },
      footL: { x: -6, y: 78 },
      footR: { x: 10, y: 78 },
    },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 8, y: 6 },
      neck: { x: 6, y: 16 },
      shoulderL: { x: -4, y: 22 },
      shoulderR: { x: 12, y: 22 },
      elbowL: { x: -2, y: 34 },
      elbowR: { x: 2, y: 36 },
      handL: { x: 2, y: 42 },
      handR: { x: 6, y: 44 },
      hip: { x: 2, y: 38 },
      kneeL: { x: -4, y: 56 },
      kneeR: { x: 8, y: 56 },
      footL: { x: -6, y: 78 },
      footR: { x: 10, y: 78 },
    },
    arrow: { x1: 108, y1: 118, x2: 188, y2: 118, bend: -14 },
  },
  "single-row": {
    muscles: ["lats", "rhomboids"],
    pose1: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 6, y: 8 },
      neck: { x: 4, y: 18 },
      shoulderL: { x: -8, y: 24 },
      shoulderR: { x: 10, y: 24 },
      elbowR: { x: 18, y: 38 },
      handR: { x: 24, y: 52 },
      handL: { x: -10, y: 48 },
      hip: { x: 2, y: 40 },
      kneeL: { x: -10, y: 52 },
      kneeR: { x: 10, y: 58 },
      footL: { x: -10, y: 78 },
      footR: { x: 14, y: 78 },
      bench: { x: -22, y: 50, w: 28 },
    },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 6, y: 8 },
      neck: { x: 4, y: 18 },
      shoulderL: { x: -8, y: 24 },
      shoulderR: { x: 10, y: 24 },
      elbowR: { x: 12, y: 32 },
      handR: { x: 8, y: 40 },
      handL: { x: -10, y: 48 },
      hip: { x: 2, y: 40 },
      kneeL: { x: -10, y: 52 },
      kneeR: { x: 10, y: 58 },
      footL: { x: -10, y: 78 },
      footR: { x: 14, y: 78 },
      bench: { x: -22, y: 50, w: 28 },
    },
    arrow: { x1: 108, y1: 118, x2: 188, y2: 118, bend: -10 },
  },
  "floor-press": {
    muscles: ["chest", "triceps"],
    pose1: {
      ...standing,
      bells: { mode: "hands" },
      floor: true,
      head: { x: -18, y: 44 },
      neck: { x: -12, y: 44 },
      shoulderL: { x: -4, y: 44 },
      shoulderR: { x: 16, y: 44 },
      elbowL: { x: -8, y: 52 },
      elbowR: { x: 20, y: 52 },
      handL: { x: -12, y: 60 },
      handR: { x: 24, y: 60 },
      hip: { x: 6, y: 56 },
      kneeL: { x: -2, y: 64 },
      kneeR: { x: 14, y: 64 },
      footL: { x: -2, y: 76 },
      footR: { x: 14, y: 76 },
    },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      floor: true,
      head: { x: -18, y: 44 },
      neck: { x: -12, y: 44 },
      shoulderL: { x: -4, y: 44 },
      shoulderR: { x: 16, y: 44 },
      elbowL: { x: -4, y: 36 },
      elbowR: { x: 16, y: 36 },
      handL: { x: -4, y: 22 },
      handR: { x: 16, y: 22 },
      hip: { x: 6, y: 56 },
      kneeL: { x: -2, y: 64 },
      kneeR: { x: 14, y: 64 },
      footL: { x: -2, y: 76 },
      footR: { x: 14, y: 76 },
    },
    arrow: { x1: 108, y1: 100, x2: 188, y2: 100, bend: -20 },
  },
  ohp: {
    muscles: ["shoulders", "triceps"],
    pose1: {
      ...standing,
      bells: { mode: "hands" },
      elbowL: { x: -10, y: 26 },
      elbowR: { x: 10, y: 26 },
      handL: { x: -10, y: 34 },
      handR: { x: 10, y: 34 },
    },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      elbowL: { x: -12, y: 8 },
      elbowR: { x: 12, y: 8 },
      handL: { x: -12, y: -6 },
      handR: { x: 12, y: -6 },
    },
    arrow: { x1: 108, y1: 108, x2: 188, y2: 108, bend: -22 },
  },
  "hammer-curl": {
    muscles: ["biceps", "forearms"],
    pose1: { ...standing, bells: { mode: "hands" } },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      elbowL: { x: -12, y: 32 },
      elbowR: { x: 12, y: 32 },
      handL: { x: -10, y: 20 },
      handR: { x: 10, y: 20 },
    },
    arrow: { x1: 108, y1: 112, x2: 188, y2: 112, bend: -16 },
  },
  "tricep-ext": {
    muscles: ["triceps"],
    pose1: {
      ...standing,
      bells: { mode: "single-overhead" },
      elbowL: { x: -6, y: 10 },
      elbowR: { x: 6, y: 10 },
      handL: { x: -6, y: 2 },
      handR: { x: 6, y: 2 },
    },
    pose2: {
      ...standing,
      bells: { mode: "single-overhead" },
      elbowL: { x: -6, y: 10 },
      elbowR: { x: 6, y: 10 },
      handL: { x: -6, y: -14 },
      handR: { x: 6, y: -14 },
    },
    arrow: { x1: 108, y1: 100, x2: 188, y2: 100, bend: -18 },
  },
  "reverse-fly": {
    muscles: ["shoulders", "rhomboids"],
    pose1: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 6, y: 10 },
      neck: { x: 4, y: 20 },
      shoulderL: { x: -6, y: 26 },
      shoulderR: { x: 14, y: 26 },
      handL: { x: -8, y: 50 },
      handR: { x: 16, y: 50 },
      hip: { x: 2, y: 40 },
      kneeL: { x: -4, y: 58 },
      kneeR: { x: 8, y: 58 },
      footL: { x: -6, y: 78 },
      footR: { x: 10, y: 78 },
    },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      head: { x: 6, y: 10 },
      neck: { x: 4, y: 20 },
      shoulderL: { x: -6, y: 26 },
      shoulderR: { x: 14, y: 26 },
      elbowL: { x: -18, y: 30 },
      elbowR: { x: 26, y: 30 },
      handL: { x: -26, y: 32 },
      handR: { x: 34, y: 32 },
      hip: { x: 2, y: 40 },
      kneeL: { x: -4, y: 58 },
      kneeR: { x: 8, y: 58 },
      footL: { x: -6, y: 78 },
      footR: { x: 10, y: 78 },
    },
    arrow: { x1: 108, y1: 118, x2: 188, y2: 118, bend: -12 },
  },
  "calf-raise": {
    muscles: ["calves"],
    pose1: { ...standing, bells: { mode: "hands" } },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      footL: { x: -8, y: 74 },
      footR: { x: 8, y: 74 },
      kneeL: { x: -7, y: 54 },
      kneeR: { x: 7, y: 54 },
    },
    arrow: { x1: 108, y1: 124, x2: 188, y2: 124, bend: -14 },
  },
  "dead-bug": {
    muscles: ["core"],
    pose1: {
      ...standing,
      bells: { mode: "none" },
      floor: true,
      head: { x: -16, y: 48 },
      neck: { x: -10, y: 48 },
      shoulderL: { x: -6, y: 46 },
      shoulderR: { x: 10, y: 46 },
      elbowL: { x: -8, y: 36 },
      elbowR: { x: 12, y: 36 },
      handL: { x: -8, y: 26 },
      handR: { x: 12, y: 26 },
      hip: { x: 2, y: 54 },
      kneeL: { x: -6, y: 44 },
      kneeR: { x: 10, y: 44 },
      footL: { x: -6, y: 36 },
      footR: { x: 10, y: 36 },
    },
    pose2: {
      ...standing,
      bells: { mode: "none" },
      floor: true,
      head: { x: -16, y: 48 },
      neck: { x: -10, y: 48 },
      shoulderL: { x: -6, y: 46 },
      shoulderR: { x: 10, y: 46 },
      elbowL: { x: -8, y: 36 },
      elbowR: { x: 12, y: 36 },
      handL: { x: -18, y: 50 },
      handR: { x: 12, y: 26 },
      hip: { x: 2, y: 54 },
      kneeL: { x: -6, y: 44 },
      kneeR: { x: 22, y: 62 },
      footL: { x: -6, y: 36 },
      footR: { x: 22, y: 74 },
    },
    arrow: { x1: 108, y1: 112, x2: 188, y2: 112, bend: -10 },
  },
  "farmer-carry": {
    muscles: ["traps", "forearms", "core"],
    pose1: { ...standing, bells: { mode: "hands" } },
    pose2: {
      ...standing,
      bells: { mode: "hands" },
      footL: { x: -4, y: 78 },
      footR: { x: 14, y: 78 },
      kneeL: { x: -3, y: 58 },
      kneeR: { x: 12, y: 58 },
    },
    arrow: { x1: 108, y1: 130, x2: 198, y2: 130, bend: 0 },
  },
};

const POSE1_OFFSET = { x: 88, y: 52 };
const POSE2_OFFSET = { x: 168, y: 52 };

export function DumbbellExerciseDiagram({
  exerciseId,
  className,
}: DumbbellExerciseDiagramProps) {
  const config = EXERCISE_CHARTS[exerciseId];
  const prefix = exerciseId.replace(/[^a-z0-9]/gi, "");

  if (!config) {
    return (
      <svg viewBox="0 0 300 190" className={className} role="img" aria-hidden>
        <rect width="300" height="190" fill="#fff" rx="6" />
        <text x="150" y="95" textAnchor="middle" fill="#9ca3af" fontSize="12">
          Diagram
        </text>
      </svg>
    );
  }

  const pose1 = shiftPose(config.pose1, POSE1_OFFSET.x, POSE1_OFFSET.y);
  const pose2 = shiftPose(config.pose2, POSE2_OFFSET.x, POSE2_OFFSET.y);

  return (
    <svg
      viewBox="0 0 300 190"
      className={className}
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="300" height="190" fill="#fff" rx="6" stroke="#e5e7eb" strokeWidth="1" />
      <MuscleMap muscles={config.muscles} />
      <rect x={72} y={10} width={220} height={150} rx="4" fill="#fafafa" stroke="#f3f4f6" strokeWidth="1" />
      <FigurePoseSvg pose={pose1} />
      <FigurePoseSvg pose={pose2} />
      <StepBadge n={1} x={POSE1_OFFSET.x - 18} y={POSE1_OFFSET.y - 8} />
      <StepBadge n={2} x={POSE2_OFFSET.x - 18} y={POSE2_OFFSET.y - 8} />
      <MotionArrow id={`${prefix}-motion`} {...config.arrow} />
      <text
        x={150}
        y={178}
        textAnchor="middle"
        fill="#374151"
        fontSize="8"
        fontWeight="600"
        fontFamily="system-ui,sans-serif"
      >
        1 = start · 2 = finish · arrow = movement
      </text>
    </svg>
  );
}
