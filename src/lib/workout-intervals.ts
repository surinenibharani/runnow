export type IntervalCueKind = "Walk" | "Jog" | "Run" | "Rest";

export type IntervalCue = {
  kind: IntervalCueKind;
  seconds: number;
};

const REPEAT_BLOCK =
  /\(([^)]+)\)\s*[×x]\s*(\d+)/i;
const SEGMENT =
  /\b(Walk|Jog|Run|Rest)\s+(\d+(?:\.\d+)?)\s*(min(?:ute)?s?|sec(?:ond)?s?)\b/gi;

function parseSegments(text: string): IntervalCue[] {
  const cues: IntervalCue[] = [];
  SEGMENT.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = SEGMENT.exec(text)) !== null) {
    const amount = Number(match[2]);
    if (!Number.isFinite(amount) || amount <= 0) continue;
    const unit = match[3].toLowerCase();
    const seconds = unit.startsWith("min")
      ? Math.round(amount * 60)
      : Math.round(amount);
    if (seconds < 1 || seconds > 60 * 60) continue;
    cues.push({
      kind: match[1] as IntervalCueKind,
      seconds,
    });
  }
  return cues;
}

function parseBlock(block: string): IntervalCue[] {
  const repeat = REPEAT_BLOCK.exec(block);
  if (repeat) {
    const inner = parseSegments(repeat[1]);
    const times = Number(repeat[2]);
    if (inner.length === 0 || !Number.isFinite(times) || times < 1 || times > 40) {
      return parseSegments(block);
    }
    return Array.from({ length: times }, () => inner).flat();
  }
  return parseSegments(block);
}

/** Expand "Walk 5 min → (Jog 1 min, Walk 2 min) × 5 → Walk 5 min" into timed cues. */
export function parseWorkoutIntervals(text: string): IntervalCue[] | null {
  if (!text.trim()) return null;

  const parts = text
    .split(/\s*(?:→|->)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  const cues = parts.flatMap(parseBlock);
  if (cues.length < 2) return null;

  const total = cues.reduce((sum, cue) => sum + cue.seconds, 0);
  if (total < 60 || total > 3 * 60 * 60) return null;

  return cues;
}

export function formatCueClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
