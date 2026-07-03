export type Point = { x: number; y: number };

export type BellHold =
  | { mode: "hands" }
  | { mode: "single-chest" }
  | { mode: "single-overhead" }
  | { mode: "none" };

export type FigurePose = {
  head: Point;
  neck: Point;
  shoulderL: Point;
  shoulderR: Point;
  elbowL: Point;
  elbowR: Point;
  handL: Point;
  handR: Point;
  hip: Point;
  kneeL: Point;
  kneeR: Point;
  footL: Point;
  footR: Point;
  bells?: BellHold;
  bench?: { x: number; y: number; w: number };
  floor?: boolean;
};

export type MuscleGroup =
  | "quads"
  | "glutes"
  | "hamstrings"
  | "lats"
  | "rhomboids"
  | "chest"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "calves"
  | "core"
  | "traps";

export type ExerciseChartConfig = {
  muscles: MuscleGroup[];
  pose1: FigurePose;
  pose2: FigurePose;
  /** Curved motion arrow in action-area coordinates */
  arrow: { x1: number; y1: number; x2: number; y2: number; bend?: number };
};

const ink = "#111827";
const inkLight = "#6b7280";
const muscle = "#dc2626";
const mapFill = "#e5e7eb";
const SW = 2.2;

function limb(x1: number, y1: number, x2: number, y2: number, w = SW) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={ink}
      strokeWidth={w}
      strokeLinecap="round"
    />
  );
}

function joint(cx: number, cy: number) {
  return <circle cx={cx} cy={cy} r={2.2} fill={ink} />;
}

function dumbbellAt(x: number, y: number, angle = 0, size: "sm" | "md" = "sm") {
  const w = size === "sm" ? 14 : 18;
  const h = size === "sm" ? 5 : 6;
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="1.5" fill="#fff" stroke={ink} strokeWidth="1.25" />
      <rect x={-w / 2 + 2} y={-0.9} width={w - 4} height={1.8} rx="0.5" fill={ink} />
    </g>
  );
}

function gobletAt(x: number, y: number) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-7} y={-9} width={14} height={16} rx="3" fill="#fff" stroke={ink} strokeWidth="1.25" />
      <rect x={-2} y={-5} width={4} height={8} rx="1" fill={ink} opacity="0.85" />
    </g>
  );
}

function drawBells(pose: FigurePose) {
  const mode = pose.bells?.mode ?? "hands";
  if (mode === "none") return null;
  if (mode === "single-chest") {
    const cx = (pose.shoulderL.x + pose.shoulderR.x) / 2;
    const cy = (pose.shoulderL.y + pose.shoulderR.y) / 2 + 14;
    return gobletAt(cx, cy);
  }
  if (mode === "single-overhead") {
    const cx = (pose.handL.x + pose.handR.x) / 2;
    const cy = (pose.handL.y + pose.handR.y) / 2 - 4;
    return gobletAt(cx, cy);
  }
  return (
    <>
      {dumbbellAt(pose.handL.x, pose.handL.y)}
      {dumbbellAt(pose.handR.x, pose.handR.y)}
    </>
  );
}

export function FigurePoseSvg({
  pose,
  opacity = 1,
}: {
  pose: FigurePose;
  opacity?: number;
}) {
  const midShoulder = {
    x: (pose.shoulderL.x + pose.shoulderR.x) / 2,
    y: (pose.shoulderL.y + pose.shoulderR.y) / 2,
  };

  return (
    <g opacity={opacity}>
      {pose.floor && (
        <line
          x1={pose.footL.x - 20}
          y1={pose.footL.y + 2}
          x2={pose.footR.x + 20}
          y2={pose.footR.y + 2}
          stroke={inkLight}
          strokeWidth="1.5"
        />
      )}
      {pose.bench && (
        <rect
          x={pose.bench.x}
          y={pose.bench.y}
          width={pose.bench.w}
          height={5}
          rx="1.5"
          fill={mapFill}
          stroke={inkLight}
          strokeWidth="1"
        />
      )}
      <circle cx={pose.head.x} cy={pose.head.y} r={7} fill="#fff" stroke={ink} strokeWidth={SW} />
      {limb(pose.head.x, pose.head.y + 7, pose.neck.x, pose.neck.y, SW)}
      {limb(pose.neck.x, pose.neck.y, midShoulder.x, midShoulder.y, SW)}
      {limb(pose.shoulderL.x, pose.shoulderL.y, pose.elbowL.x, pose.elbowL.y)}
      {limb(pose.shoulderR.x, pose.shoulderR.y, pose.elbowR.x, pose.elbowR.y)}
      {limb(pose.elbowL.x, pose.elbowL.y, pose.handL.x, pose.handL.y)}
      {limb(pose.elbowR.x, pose.elbowR.y, pose.handR.x, pose.handR.y)}
      {limb(midShoulder.x, midShoulder.y, pose.hip.x, pose.hip.y, SW)}
      {limb(pose.hip.x, pose.hip.y, pose.kneeL.x, pose.kneeL.y)}
      {limb(pose.hip.x, pose.hip.y, pose.kneeR.x, pose.kneeR.y)}
      {limb(pose.kneeL.x, pose.kneeL.y, pose.footL.x, pose.footL.y)}
      {limb(pose.kneeR.x, pose.kneeR.y, pose.footR.x, pose.footR.y)}
      {joint(pose.elbowL.x, pose.elbowL.y)}
      {joint(pose.elbowR.x, pose.elbowR.y)}
      {joint(pose.kneeL.x, pose.kneeL.y)}
      {joint(pose.kneeR.x, pose.kneeR.y)}
      {drawBells(pose)}
    </g>
  );
}

const MUSCLE_DOTS: Record<MuscleGroup, { side: "front" | "back"; x: number; y: number; rx: number; ry: number }[]> = {
  quads: [
    { side: "front", x: 11, y: 58, rx: 4, ry: 9 },
    { side: "front", x: 19, y: 58, rx: 4, ry: 9 },
  ],
  glutes: [
    { side: "back", x: 11, y: 46, rx: 5, ry: 5 },
    { side: "back", x: 19, y: 46, rx: 5, ry: 5 },
  ],
  hamstrings: [
    { side: "back", x: 11, y: 58, rx: 4, ry: 8 },
    { side: "back", x: 19, y: 58, rx: 4, ry: 8 },
  ],
  lats: [
    { side: "back", x: 8, y: 38, rx: 3, ry: 7 },
    { side: "back", x: 22, y: 38, rx: 3, ry: 7 },
  ],
  rhomboids: [{ side: "back", x: 15, y: 32, rx: 6, ry: 4 }],
  chest: [{ side: "front", x: 15, y: 34, rx: 7, ry: 5 }],
  shoulders: [
    { side: "front", x: 8, y: 28, rx: 3.5, ry: 3 },
    { side: "front", x: 22, y: 28, rx: 3.5, ry: 3 },
    { side: "back", x: 8, y: 28, rx: 3.5, ry: 3 },
    { side: "back", x: 22, y: 28, rx: 3.5, ry: 3 },
  ],
  biceps: [
    { side: "front", x: 7, y: 38, rx: 2.5, ry: 5 },
    { side: "front", x: 23, y: 38, rx: 2.5, ry: 5 },
  ],
  triceps: [
    { side: "back", x: 7, y: 38, rx: 2.5, ry: 5 },
    { side: "back", x: 23, y: 38, rx: 2.5, ry: 5 },
  ],
  forearms: [
    { side: "front", x: 6, y: 48, rx: 2, ry: 4 },
    { side: "front", x: 24, y: 48, rx: 2, ry: 4 },
  ],
  calves: [
    { side: "back", x: 11, y: 68, rx: 3, ry: 5 },
    { side: "back", x: 19, y: 68, rx: 3, ry: 5 },
  ],
  core: [{ side: "front", x: 15, y: 42, rx: 5, ry: 6 }],
  traps: [{ side: "back", x: 15, y: 26, rx: 6, ry: 3 }],
};

function miniBody(side: "front" | "back", ox: number) {
  const cx = ox + 15;
  return (
    <g>
      <circle cx={cx} cy={16} r={5.5} fill={mapFill} stroke={inkLight} strokeWidth="1" />
      <rect x={cx - 6} y={22} width={12} height={18} rx={4} fill={mapFill} stroke={inkLight} strokeWidth="1" />
      <line x1={cx - 6} y1={26} x2={cx - 11} y2={38} stroke={inkLight} strokeWidth="1.2" strokeLinecap="round" />
      <line x1={cx + 6} y1={26} x2={cx + 11} y2={38} stroke={inkLight} strokeWidth="1.2" strokeLinecap="round" />
      <line x1={cx - 3} y1={40} x2={cx - 4} y2={58} stroke={inkLight} strokeWidth="1.2" strokeLinecap="round" />
      <line x1={cx + 3} y1={40} x2={cx + 4} y2={58} stroke={inkLight} strokeWidth="1.2" strokeLinecap="round" />
      {side === "back" && (
        <line x1={cx} y1={22} x2={cx} y2={40} stroke={inkLight} strokeWidth="0.8" opacity="0.5" />
      )}
    </g>
  );
}

export function MuscleMap({ muscles }: { muscles: MuscleGroup[] }) {
  const active = new Set(muscles);
  return (
    <g>
      <rect x={4} y={8} width={62} height={76} rx="4" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" />
      {miniBody("front", 4)}
      {miniBody("back", 34)}
      {(Object.keys(MUSCLE_DOTS) as MuscleGroup[]).map((key) =>
        active.has(key)
          ? MUSCLE_DOTS[key].map((dot, i) => (
              <ellipse
                key={`${key}-${i}`}
                cx={dot.side === "front" ? dot.x : dot.x + 30}
                cy={dot.y}
                rx={dot.rx}
                ry={dot.ry}
                fill={muscle}
                opacity="0.88"
              />
            ))
          : null,
      )}
      <text x={19} y={78} textAnchor="middle" fill={inkLight} fontSize="6" fontFamily="system-ui,sans-serif">
        front
      </text>
      <text x={49} y={78} textAnchor="middle" fill={inkLight} fontSize="6" fontFamily="system-ui,sans-serif">
        back
      </text>
    </g>
  );
}

export function StepBadge({ n, x, y }: { n: 1 | 2; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={8} fill={ink} />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fill="#fff"
        fontSize="9"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        {n}
      </text>
    </g>
  );
}

export function MotionArrow({
  id,
  x1,
  y1,
  x2,
  y2,
  bend = 0,
}: {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  bend?: number;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 + bend;
  return (
    <>
      <defs>
        <marker id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={ink} />
        </marker>
      </defs>
      <path
        d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
        fill="none"
        stroke={ink}
        strokeWidth="1.75"
        markerEnd={`url(#${id})`}
      />
    </>
  );
}

export function shiftPose(pose: FigurePose, dx: number, dy: number): FigurePose {
  const mv = (p: Point) => ({ x: p.x + dx, y: p.y + dy });
  return {
    ...pose,
    head: mv(pose.head),
    neck: mv(pose.neck),
    shoulderL: mv(pose.shoulderL),
    shoulderR: mv(pose.shoulderR),
    elbowL: mv(pose.elbowL),
    elbowR: mv(pose.elbowR),
    handL: mv(pose.handL),
    handR: mv(pose.handR),
    hip: mv(pose.hip),
    kneeL: mv(pose.kneeL),
    kneeR: mv(pose.kneeR),
    footL: mv(pose.footL),
    footR: mv(pose.footR),
    bells: pose.bells,
    bench: pose.bench ? { ...pose.bench, x: pose.bench.x + dx, y: pose.bench.y + dy } : undefined,
    floor: pose.floor,
  };
}
