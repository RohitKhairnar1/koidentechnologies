/**
 * Branded vector illustration set — a DISTINCT illustration per product type.
 *
 * These are illustrations, not photographs: they give each product its own
 * on-brand visual without implying a specific verified SKU (per the
 * "zero invented claims" rule). When real photography is available, pass
 * `src` to <Illustration> / set `image` on a product and these become the
 * automatic fallback.
 *
 * Palette (reads on the dark navy/steel frame):
 *   body #17304C   stroke #5F82AD   steel #6E8FB8 / #8AA8CE
 *   accent #1E7A5E / #2FA079        light #CFE0F5 / #D6E5F8   dark #0E2136
 */
import type { ReactElement } from "react";

type ArtProps = { className?: string };
const AR = "xMidYMid meet";

/* ── Cells ─────────────────────────────────────────────────────── */

/** 18650 — three slim cylindrical cells. */
export function CellArt({ className }: ArtProps) {
  const cells = [
    { x: 150, top: 72 },
    { x: 210, top: 56 },
    { x: 270, top: 88 },
  ];
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      {cells.map((c) => (
        <g key={c.x}>
          <rect x={c.x - 27} y={c.top} width={54} height={250 - c.top} rx={12} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
          <rect x={c.x - 27} y={c.top + 70} width={54} height={54} fill="#1E7A5E" opacity={0.9} />
          <rect x={c.x - 27} y={c.top + 70} width={54} height={8} fill="#2FA079" />
          <ellipse cx={c.x} cy={c.top} rx={27} ry={8} fill="#9BBAE0" />
          <ellipse cx={c.x} cy={c.top} rx={15} ry={4} fill="#17304C" />
          <rect x={c.x - 9} y={c.top - 13} width={18} height={12} rx={3} fill="#D6E5F8" />
        </g>
      ))}
    </svg>
  );
}

/** 32700 LFP — two fatter cells, steel/grey body to read as LFP. */
export function CellLfpArt({ className }: ArtProps) {
  const cells = [
    { x: 162, top: 62 },
    { x: 244, top: 62 },
  ];
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      {cells.map((c) => (
        <g key={c.x}>
          <rect x={c.x - 37} y={c.top} width={74} height={250 - c.top} rx={16} fill="#1B3A4F" stroke="#6E8FB8" strokeWidth={2} />
          <rect x={c.x - 37} y={c.top + 78} width={74} height={56} fill="#6E8FB8" opacity={0.6} />
          <ellipse cx={c.x} cy={c.top} rx={37} ry={10} fill="#9BBAE0" />
          <ellipse cx={c.x} cy={c.top} rx={20} ry={5} fill="#1B3A4F" />
          <rect x={c.x - 12} y={c.top - 14} width={24} height={13} rx={3} fill="#D6E5F8" />
        </g>
      ))}
    </svg>
  );
}

/** Prismatic cell — rectangular body with two top terminals. */
export function PrismaticArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={104} y={92} width={192} height={150} rx={12} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      <rect x={104} y={92} width={192} height={26} rx={12} fill="#24405F" />
      <rect x={148} y={74} width={30} height={24} rx={5} fill="#9BBAE0" />
      <rect x={222} y={74} width={30} height={24} rx={5} fill="#9BBAE0" />
      <path d="M163 80 v12 M157 86 h12" stroke="#17304C" strokeWidth={2} strokeLinecap="round" />
      <path d="M231 86 h12" stroke="#17304C" strokeWidth={2} strokeLinecap="round" />
      <rect x={128} y={150} width={140} height={6} rx={3} fill="#6E8FB8" opacity={0.5} />
      <rect x={128} y={172} width={100} height={6} rx={3} fill="#6E8FB8" opacity={0.5} />
    </svg>
  );
}

/* ── Interconnects ─────────────────────────────────────────────── */

/** Nickel strip — a coil at left with the strip unrolling across to the right. */
export function StripArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      {/* unrolled strip */}
      <rect x={140} y={132} width={244} height={34} rx={3} fill="#AEC6E6" />
      <rect x={140} y={132} width={244} height={9} fill="#CFE0F5" />
      {[186, 222, 258, 294, 330, 366].map((cx) => (
        <circle key={cx} cx={cx} cy={149} r={4.5} fill="#5F82AD" />
      ))}
      {/* coil */}
      <circle cx={122} cy={150} r={94} fill="#33506E" stroke="#8AA8CE" strokeWidth={4} />
      <circle cx={122} cy={150} r={66} fill="none" stroke="#6E8FB8" strokeWidth={3} opacity={0.7} />
      <circle cx={122} cy={150} r={44} fill="none" stroke="#6E8FB8" strokeWidth={2.5} opacity={0.5} />
      <circle cx={122} cy={150} r={22} fill="#0E2136" />
      <path d="M64 104 A94 94 0 0 1 188 118" stroke="#CFE0F5" strokeWidth={3} fill="none" opacity={0.45} strokeLinecap="round" />
    </svg>
  );
}

/** H-type nickel strip — flat band with punched H motifs. */
export function HStripArt({ className }: ArtProps) {
  const centers = [120, 200, 280];
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={56} y={116} width={300} height={68} rx={8} fill="#AEC6E6" stroke="#6E8FB8" strokeWidth={2} />
      <rect x={56} y={116} width={300} height={12} rx={8} fill="#CFE0F5" />
      {centers.map((cx) => (
        <g key={cx} fill="#2C4A66">
          <rect x={cx - 24} y={132} width={9} height={38} rx={2} />
          <rect x={cx + 15} y={132} width={9} height={38} rx={2} />
          <rect x={cx - 24} y={146} width={48} height={9} rx={2} />
        </g>
      ))}
    </svg>
  );
}

/** Cell holder / spacer grid. */
export function AssemblyArt({ className }: ArtProps) {
  const cols = [150, 215, 280];
  const rows = [128, 188];
  const filled = new Set(["150-128", "215-188"]);
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={92} y={78} width={216} height={162} rx={18} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      {rows.map((y) =>
        cols.map((x) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={24} fill="#0E2136" stroke="#7FA3CC" strokeWidth={2} />
            {filled.has(`${x}-${y}`) ? (
              <circle cx={x} cy={y} r={16} fill="#1E7A5E" />
            ) : (
              <circle cx={x} cy={y} r={15} fill="#1C3A5E" />
            )}
          </g>
        )),
      )}
    </svg>
  );
}

/* ── Insulation / tape / sleeve / sheet ────────────────────────── */

/** Tape — a roll lying on its side with a peeling strip. */
export function TapeArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={130} y={110} width={150} height={80} rx={40} fill="#3A5876" stroke="#8AA8CE" strokeWidth={2} />
      <ellipse cx={130} cy={150} rx={20} ry={40} fill="#24405F" stroke="#8AA8CE" strokeWidth={2} />
      <ellipse cx={280} cy={150} rx={20} ry={40} fill="#2C4A66" stroke="#8AA8CE" strokeWidth={2} />
      <ellipse cx={280} cy={150} rx={8} ry={18} fill="#0E2136" />
      <path d="M190 112 q30 -22 96 -10 l0 14 q-64 -10 -96 8 z" fill="#CFE0F5" opacity={0.85} />
    </svg>
  );
}

/** Sleeve / heat-shrink tube. */
export function SleeveArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={92} y={124} width={216} height={52} rx={26} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      <ellipse cx={92} cy={150} rx={14} ry={26} fill="#0E2136" stroke="#6E8FB8" strokeWidth={2} />
      <ellipse cx={308} cy={150} rx={14} ry={26} fill="#24405F" stroke="#6E8FB8" strokeWidth={2} />
      <rect x={112} y={134} width={176} height={6} rx={3} fill="#2FA079" opacity={0.5} />
      <rect x={112} y={160} width={130} height={5} rx={3} fill="#6E8FB8" opacity={0.4} />
    </svg>
  );
}

/** Sheet — flat insulation/paper sheet with a curled corner. */
export function SheetArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={112} y={78} width={176} height={150} rx={6} fill="#24405F" stroke="#6E8FB8" strokeWidth={2} />
      {[104, 128, 152, 176].map((y) => (
        <rect key={y} x={134} y={y} width={110} height={7} rx={3} fill="#6E8FB8" opacity={0.5} />
      ))}
      <path d="M288 200 L288 228 L252 228 Z" fill="#17304C" stroke="#6E8FB8" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}

/* ── Battery management ────────────────────────────────────────── */

/** BMS board. */
export function BmsArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={64} y={70} width={272} height={160} rx={14} fill="#102A47" stroke="#2FA079" strokeWidth={2} />
      <path d="M96 118 H206 V172 H300" stroke="#2FA079" strokeWidth={2} opacity={0.45} />
      <path d="M110 205 H190" stroke="#2FA079" strokeWidth={2} opacity={0.45} />
      <path d="M300 96 V150" stroke="#2FA079" strokeWidth={2} opacity={0.45} />
      <rect x={150} y={120} width={72} height={56} rx={6} fill="#1C3A5E" stroke="#7FA3CC" strokeWidth={1.5} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={`t${i}`} x={158 + i * 16} y={112} width={6} height={8} rx={1} fill="#7FA3CC" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`b${i}`} x={158 + i * 16} y={176} width={6} height={8} rx={1} fill="#7FA3CC" />
      ))}
      <rect x={92} y={92} width={32} height={20} rx={3} fill="#9BBAE0" />
      <rect x={250} y={188} width={38} height={24} rx={3} fill="#6E8FB8" />
      <circle cx={108} cy={192} r={11} fill="#1E7A5E" />
      <circle cx={300} cy={110} r={13} fill="#2FA079" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`p${i}`} x={96 + i * 15} y={206} width={8} height={14} rx={1} fill="#CFE0F5" />
      ))}
      <circle cx={80} cy={86} r={5} fill="#0A1A2F" stroke="#7FA3CC" strokeWidth={1.5} />
      <circle cx={320} cy={214} r={5} fill="#0A1A2F" stroke="#7FA3CC" strokeWidth={1.5} />
    </svg>
  );
}

/** Active balancer — board with resistor arrays and status LEDs. */
export function BalancerArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={70} y={80} width={260} height={140} rx={12} fill="#102A47" stroke="#2FA079" strokeWidth={2} />
      {[110, 150].map((y) =>
        [0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`${y}-${i}`} x={92 + i * 34} y={y} width={24} height={16} rx={2} fill="#CFE0F5" opacity={0.85} />
        )),
      )}
      {[96, 130, 164, 198, 232, 266, 300].map((cx) => (
        <circle key={cx} cx={cx} cy={196} r={5} fill={cx % 68 === 28 ? "#2FA079" : "#1E7A5E"} />
      ))}
      <rect x={92} y={190} width={216} height={2} fill="#2FA079" opacity={0.4} />
    </svg>
  );
}

/* ── Pack components ───────────────────────────────────────────── */

/** Battery housing / enclosure. */
export function HousingArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={96} y={92} width={208} height={150} rx={14} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      <path d="M96 122 H304" stroke="#5F82AD" strokeWidth={2} opacity={0.6} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={124 + i * 40} y={150} width={26} height={8} rx={4} fill="#0E2136" />
      ))}
      <rect x={124} y={178} width={70} height={30} rx={5} fill="#102A47" stroke="#2FA079" strokeWidth={1.5} />
      <circle cx={140} cy={193} r={4} fill="#2FA079" />
      <circle cx={178} cy={193} r={4} fill="#1E7A5E" />
    </svg>
  );
}

/** Housing handle. */
export function HandleArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={104} y={182} width={192} height={34} rx={8} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      <path d="M132 190 V150 Q132 108 200 108 Q268 108 268 150 V190" fill="none" stroke="#8AA8CE" strokeWidth={16} strokeLinecap="round" />
      <circle cx={132} cy={199} r={5} fill="#0E2136" />
      <circle cx={268} cy={199} r={5} fill="#0E2136" />
    </svg>
  );
}

/** Assembly hardware — hex bolt + bracket. */
export function HardwareArt({ className }: ArtProps) {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <polygon points={hex(160, 150, 52)} fill="#17304C" stroke="#8AA8CE" strokeWidth={2} />
      <circle cx={160} cy={150} r={22} fill="#0E2136" stroke="#6E8FB8" strokeWidth={2} />
      {/* bracket */}
      <path d="M236 108 h64 v16 h-48 v64 h-16 z" fill="#1C3A5E" stroke="#6E8FB8" strokeWidth={2} strokeLinejoin="round" />
      <circle cx={288} cy={116} r={4} fill="#0E2136" />
      <circle cx={244} cy={180} r={4} fill="#0E2136" />
    </svg>
  );
}

/* ── EV ────────────────────────────────────────────────────────── */

/** EV charger unit with cable + connector. */
export function ChargerArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={96} y={72} width={128} height={172} rx={18} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      <rect x={118} y={94} width={84} height={56} rx={8} fill="#102A47" stroke="#2FA079" strokeWidth={1.5} />
      <path d="M166 104 l-16 26 h12 l-8 20 24 -30 h-12 z" fill="#2FA079" />
      <rect x={124} y={172} width={72} height={10} rx={5} fill="#6E8FB8" opacity={0.6} />
      <rect x={124} y={192} width={52} height={10} rx={5} fill="#6E8FB8" opacity={0.4} />
      <path d="M224 168 q70 6 78 44" stroke="#6E8FB8" strokeWidth={7} fill="none" strokeLinecap="round" />
      <rect x={286} y={196} width={44} height={40} rx={8} fill="#24405F" stroke="#8AA8CE" strokeWidth={2} />
      <circle cx={300} cy={216} r={4} fill="#2FA079" />
      <circle cx={316} cy={216} r={4} fill="#2FA079" />
    </svg>
  );
}

/** EV electrical component — connector with pins. */
export function ElectricalArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={116} y={104} width={110} height={100} rx={16} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      <circle cx={150} cy={140} r={13} fill="#0E2136" stroke="#6E8FB8" strokeWidth={2} />
      <circle cx={192} cy={140} r={13} fill="#0E2136" stroke="#6E8FB8" strokeWidth={2} />
      <rect x={150} y={168} width={42} height={12} rx={3} fill="#0E2136" stroke="#6E8FB8" strokeWidth={1.5} />
      {/* prongs */}
      <rect x={226} y={126} width={40} height={12} rx={4} fill="#8AA8CE" />
      <rect x={226} y={158} width={40} height={12} rx={4} fill="#8AA8CE" />
      {/* wire */}
      <path d="M266 132 q40 0 40 32 q0 20 -40 20" stroke="#6E8FB8" strokeWidth={7} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ── Composites / generic ──────────────────────────────────────── */

/** Hero: a stylised battery pack — cells linked by nickel strip. */
export function PackArt({ className }: ArtProps) {
  const xs = [86, 148, 210, 272, 334];
  const ys = [96, 160, 224];
  const stripX = 70;
  const stripW = 280;
  return (
    <svg viewBox="0 0 420 320" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      {ys.map((y) => (
        <rect key={`s${y}`} x={stripX} y={y - 7} width={stripW} height={14} rx={7} fill="#4E6E92" opacity={0.55} />
      ))}
      <rect x={stripX + stripW - 6} y={ys[0] - 10} width={42} height={20} rx={5} fill="#2FA079" />
      <rect x={stripX + stripW - 6} y={ys[2] - 10} width={42} height={20} rx={5} fill="#1E7A5E" />
      {ys.map((y) =>
        xs.map((x) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={23} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
            <circle cx={x} cy={y} r={11} fill="#2FA079" />
            <circle cx={x} cy={y} r={4} fill="#0E2136" />
          </g>
        )),
      )}
    </svg>
  );
}

/** Generic technical / document illustration (resources, misc). */
export function DocArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" preserveAspectRatio={AR} className={className} aria-hidden>
      <rect x={120} y={62} width={160} height={200} rx={12} fill="#17304C" stroke="#5F82AD" strokeWidth={2} />
      {[96, 120, 144, 168].map((y) => (
        <rect key={y} x={144} y={y} width={112} height={8} rx={4} fill="#6E8FB8" opacity={0.7} />
      ))}
      <rect x={144} y={192} width={64} height={8} rx={4} fill="#6E8FB8" opacity={0.7} />
      <circle cx={256} cy={214} r={30} fill="#102A47" stroke="#2FA079" strokeWidth={2} />
      <path d="M256 214 L256 194 M256 214 L272 224" stroke="#CFE0F5" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}

export type ArtKey =
  | "hero"
  | "generic"
  | "cell-18650"
  | "cell-lfp"
  | "cell-prismatic"
  | "nickel-strip"
  | "h-strip"
  | "cell-holder"
  | "tape"
  | "sleeve"
  | "sheet"
  | "bms"
  | "balancer"
  | "housing"
  | "handle"
  | "hardware"
  | "ev-charger"
  | "ev-electrical";

export const artRegistry: Record<ArtKey, (props: ArtProps) => ReactElement> = {
  hero: PackArt,
  generic: DocArt,
  "cell-18650": CellArt,
  "cell-lfp": CellLfpArt,
  "cell-prismatic": PrismaticArt,
  "nickel-strip": StripArt,
  "h-strip": HStripArt,
  "cell-holder": AssemblyArt,
  tape: TapeArt,
  sleeve: SleeveArt,
  sheet: SheetArt,
  bms: BmsArt,
  balancer: BalancerArt,
  housing: HousingArt,
  handle: HandleArt,
  hardware: HardwareArt,
  "ev-charger": ChargerArt,
  "ev-electrical": ElectricalArt,
};
