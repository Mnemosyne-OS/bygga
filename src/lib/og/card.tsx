import { ImageResponse } from "next/og";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { TogetherStamp } from "./factory";

/**
 * The share cards, drawn like a page of the guide: warm paper, the product
 * on a white sheet in the app's own line art, the name in its display face.
 * Drawings come from public/og (scripts/og/render.mjs renders them with the
 * real engine); products without one use the drawing of their kind.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const PAGE = "#f5f4f0";
const INK = "#121212";
const INK_2 = "#4a4945";
const LINE = "#e8e6e0";
const ACCENT = "#ffd21f";

const here = join(process.cwd(), "src/lib/og");
let fonts: Promise<{ name: string; data: Buffer; weight: 500 | 700 | 800; style: "normal" }[]> | null = null;
function loadFonts() {
  fonts ??= Promise.all([
    readFile(join(here, "display-800.woff")).then((data) => ({ name: "Display", data, weight: 800 as const, style: "normal" as const })),
    readFile(join(here, "sans-500.woff")).then((data) => ({ name: "Sans", data, weight: 500 as const, style: "normal" as const })),
    readFile(join(here, "sans-700.woff")).then((data) => ({ name: "Sans", data, weight: 700 as const, style: "normal" as const })),
  ]);
  return fonts;
}

/** A drawing from public/og as a data URI, or null. */
export async function drawing(name: string) {
  const file = join(process.cwd(), "public/og", `${name}.png`);
  if (!existsSync(file)) return null;
  return `data:image/png;base64,${(await readFile(file)).toString("base64")}`;
}

/** The logo mark: an Allen bolt head seen from above. */
function Mark({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <circle cx="16" cy="16" r="15.5" fill={INK} />
      <path d="M16 6.2 L24.5 11.1 L24.5 20.9 L16 25.8 L7.5 20.9 L7.5 11.1 Z" fill={ACCENT} stroke={ACCENT} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M16 11.2 L20.2 13.6 L20.2 18.4 L16 20.8 L11.8 18.4 L11.8 13.6 Z" fill={INK} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function Frame({ left, art, corner }: { left: React.ReactNode; art: string | null; corner?: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: PAGE, padding: 40, fontFamily: "Sans", color: INK }}>
      <div style={{ display: "flex", flexDirection: "column", width: 560, padding: "18px 36px 14px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Mark size={40} />
          <span style={{ fontFamily: "Display", fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>bygga</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>{left}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 19, color: INK_2 }}>
          <span>Powered by</span>
          <TogetherStamp height={24} color={INK} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 36,
          border: `2px solid ${LINE}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {art && <img src={art} alt="" width={520} height={455} style={{ objectFit: "contain" }} />}
        {corner && (
          <span style={{ position: "absolute", top: 18, left: 30, fontFamily: "Display", fontSize: 96, fontWeight: 800, letterSpacing: "-0.05em" }}>{corner}</span>
        )}
      </div>
    </div>
  );
}

/** Words on a yellow marker, like a highlighted line in the margin. */
function Marked({ children, size }: { children: string; size: number }) {
  return (
    <span style={{ display: "flex", background: ACCENT, borderRadius: size * 0.16, padding: `0 ${size * 0.14}px`, marginLeft: -size * 0.1 }}>{children}</span>
  );
}

export async function siteCard() {
  const art = (await drawing("step-hero")) ?? (await drawing("kallax-2x2"));
  return new ImageResponse(
    (
      <Frame
        art={art}
        corner="4"
        left={
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Display", fontWeight: 800, fontSize: 66, lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            <span>IKEA assembly,</span>
            <div style={{ display: "flex", marginTop: 6 }}>
              <Marked size={66}>step by step.</Marked>
            </div>
          </div>
        }
      />
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

export async function guideCard(o: { name: string; variant: string; steps: number | null; art: string | null }) {
  const long = o.name.length > 9;
  return new ImageResponse(
    (
      <Frame
        art={o.art}
        left={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: INK_2, letterSpacing: "0.08em" }}>ASSEMBLY GUIDE</span>
            <span style={{ fontFamily: "Display", fontWeight: 800, fontSize: long ? 76 : 104, lineHeight: 1, letterSpacing: "-0.04em", marginTop: 10 }}>{o.name}</span>
            <span style={{ fontSize: 32, fontWeight: 500, color: INK_2, marginTop: 14, lineHeight: 1.25 }}>{o.variant}</span>
            <div style={{ display: "flex", marginTop: 28 }}>
              <span style={{ display: "flex", background: ACCENT, borderRadius: 999, padding: "10px 22px", fontSize: 26, fontWeight: 700 }}>
                {o.steps ? `${o.steps} steps, in 3D` : "Every step, in 3D"}
              </span>
            </div>
          </div>
        }
      />
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
