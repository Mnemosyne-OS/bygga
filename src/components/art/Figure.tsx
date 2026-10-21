export type Pose = "stand" | "cheer" | "think" | "point" | "wave" | "read" | "lift";

const ARMS: Record<Pose, [string, string]> = {
  stand: ["M22 34 Q15 46 16 58", "M38 34 Q45 46 44 58"],
  cheer: ["M22 34 Q13 23 12 9", "M38 34 Q47 23 48 9"],
  think: ["M22 34 Q15 46 16 58", "M38 34 Q49 36 41 21"],
  point: ["M22 34 Q15 46 16 58", "M38 34 Q48 33 58 30"],
  wave: ["M22 34 Q15 46 16 58", "M38 34 Q48 26 49 12"],
  read: ["M22 34 Q19 44 27 46", "M38 34 Q41 44 33 46"],
  lift: ["M22 34 Q15 26 14 15", "M38 34 Q45 26 46 15"],
};

/** The helper character: an original little builder drawn with outlined limbs. viewBox 0 0 60 100. */
export function Figure({ pose = "stand", size = 80, className, bubble }: { pose?: Pose; size?: number; className?: string; bubble?: "?" | "!" | "check" }) {
  const [l, r] = ARMS[pose];
  const limb = (d: string, key: string, cls?: string) => (
    <g key={key} className={cls}>
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth={7.4} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" />
    </g>
  );
  return (
    <svg viewBox="0 0 60 100" width={(size * 60) / 100} height={size} className={"figure " + (className ?? "")} aria-hidden="true" overflow="visible">
      {limb("M26 58 L23 91", "ll")}
      {limb("M34 58 L37 91", "lr")}
      <path d="M20 93 h7 M33 93 h7" stroke="var(--ink)" strokeWidth={4.6} strokeLinecap="round" />
      <rect x={20.5} y={27} width={19} height={34} rx={9} fill="#fff" stroke="var(--ink)" strokeWidth={2.2} />
      {limb(l, "al", "arm-l")}
      {limb(r, "ar", "arm-r")}
      {pose === "read" && <rect x={22} y={38} width={16} height={12} rx={1.5} fill="var(--accent-soft)" stroke="var(--ink)" strokeWidth={1.8} transform="rotate(-6 30 44)" />}
      <circle cx={30} cy={15} r={9.5} fill="#fff" stroke="var(--ink)" strokeWidth={2.2} className="head" />
      {bubble && (
        <g transform="translate(46 -6)" className="bubble">
          <path d="M0 10 a12 11 0 1 1 6 9 l-7 4 l2 -6 a11 11 0 0 1 -1 -7 z" fill={bubble === "check" ? "var(--accent)" : "#fff"} stroke="var(--ink)" strokeWidth={2} strokeLinejoin="round" />
          {bubble === "?" && <text x={12} y={16} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--ink)" fontFamily="var(--font)">?</text>}
          {bubble === "!" && <text x={12} y={16} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--ink)" fontFamily="var(--font)">!</text>}
          {bubble === "check" && <path d="M6.5 10.5 l4 4 l7 -8" fill="none" stroke="var(--ink)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      )}
    </svg>
  );
}

/** Two figures carrying a panel together. */
export function TwoPeople({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 -2 120 100" width={(size * 120) / 100} height={size} className={className} aria-hidden="true">
      <rect x={12} y={2} width={96} height={9} rx={2} fill="var(--accent-soft)" stroke="var(--ink)" strokeWidth={2.2} />
      <g transform="translate(4 4)">
        <Mini />
      </g>
      <g transform="translate(62 4)">
        <Mini />
      </g>
    </svg>
  );
}

function Mini() {
  const limb = (d: string) => (
    <>
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth={7} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" />
    </>
  );
  return (
    <g>
      {limb("M26 58 L23 89")}
      {limb("M34 58 L37 89")}
      <rect x={20.5} y={27} width={19} height={34} rx={9} fill="#fff" stroke="var(--ink)" strokeWidth={2.2} />
      {limb("M22 34 Q15 22 18 4")}
      {limb("M38 34 Q45 22 42 4")}
      <circle cx={30} cy={18} r={8.5} fill="#fff" stroke="var(--ink)" strokeWidth={2.2} />
    </g>
  );
}
