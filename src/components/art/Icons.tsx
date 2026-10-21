import type { WarnId } from "@/lib/types";

type P = { size?: number; className?: string; strokeWidth?: number };

function I({ size = 22, className, strokeWidth = 2, children }: P & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export const IArrowRight = (p: P) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>;
export const IArrowLeft = (p: P) => <I {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></I>;
export const ICheck = (p: P) => <I {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></I>;
export const IClose = (p: P) => <I {...p}><path d="M6 6l12 12M18 6L6 18" /></I>;
export const ISearch = (p: P) => <I {...p}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L20 20" /></I>;
export const ICamera = (p: P) => <I {...p}><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.6-2.2h5.8L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" /><circle cx="12" cy="12.8" r="3.4" /></I>;
export const IMic = (p: P) => <I {...p}><rect x="9" y="3.5" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5" /></I>;
export const IGrid = (p: P) => <I {...p}><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></I>;
export const IHelp = (p: P) => <I {...p}><circle cx="12" cy="12" r="8.5" /><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .9-1 1.6v.4" /><circle cx="12" cy="16.8" r=".4" fill="currentColor" /></I>;
export const IReplay = (p: P) => <I {...p}><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" /><path d="M4.5 4.5v3.8h3.8" /></I>;
export const IPause = (p: P) => <I {...p}><path d="M9 6v12M15 6v12" /></I>;
export const IPlay = (p: P) => <I {...p}><path d="M8 5.5v13l10-6.5z" /></I>;
export const IClock = (p: P) => <I {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></I>;
export const IPeople = (p: P) => <I {...p}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></I>;
export const IPerson = (p: P) => <I {...p}><circle cx="12" cy="8" r="3.2" /><path d="M6 19.5a6 6 0 0 1 12 0" /></I>;
export const IRuler = (p: P) => <I {...p}><path d="M3.5 15.5l12-12 5 5-12 12z" /><path d="M7 12l2 2M10 9l1.5 1.5M13 6l2 2" /></I>;
export const IBox = (p: P) => <I {...p}><path d="M12 3.5l8 4v9l-8 4-8-4v-9z" /><path d="M4 7.5l8 4 8-4M12 11.5v9" /></I>;
export const ISparkle = (p: P) => <I {...p}><path d="M12 3.5c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7z" /></I>;
export const IVolume = (p: P) => <I {...p}><path d="M5 9.5h3l4-3.5v12l-4-3.5H5z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /></I>;
export const IRotate = (p: P) => <I {...p}><path d="M19.5 12A7.5 7.5 0 1 1 17.3 6.7" /><path d="M19.5 4.5v3.8h-3.8" /></I>;
export const IHome = (p: P) => <I {...p}><path d="M4.5 10.5L12 4l7.5 6.5V19a1 1 0 0 1-1 1h-4v-5h-5v5h-4a1 1 0 0 1-1-1z" /></I>;
export const IChevron = (p: P) => <I {...p}><path d="M9 6l6 6-6 6" /></I>;
export const IChevronDown = (p: P) => <I {...p}><path d="M6 9l6 6 6-6" /></I>;
export const IExternal = (p: P) => <I {...p}><path d="M14 4.5h5.5V10M19.5 4.5L11 13M17 14v4.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1H10" /></I>;
export const ISend = (p: P) => <I {...p}><path d="M5 12h13M12 5.5l6.5 6.5-6.5 6.5" /></I>;
export const IEye = (p: P) => <I {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></I>;
export const IWand = (p: P) => <I {...p}><path d="M4.5 19.5l10-10M13 6l5 5" /><path d="M18 3.5v3M16.5 5h3M6 4v2M5 5h2M19 15v2M18 16h2" /></I>;
export const ISun = (p: P) => <I {...p}><circle cx="12" cy="12" r="3.6" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></I>;
export const IBolt = (p: P) => <I {...p}><path d="M13 3L6 13.5h5L10 21l7.5-11H12z" /></I>;
export const IMore = (p: P) => <I {...p}><circle cx="6" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="18" cy="12" r="1" fill="currentColor" /></I>;
export const IUpload = (p: P) => <I {...p}><path d="M12 15.5V4.5M7.5 9L12 4.5 16.5 9" /><path d="M4.5 15v3.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V15" /></I>;
export const ITrash = (p: P) => <I {...p}><path d="M5 7h14M9.5 7V5h5v2M7 7l.8 12a1 1 0 0 0 1 1h6.4a1 1 0 0 0 1-1L17 7" /></I>;

/* Warning pictograms: chunkier, shown in step cards */
export function WarnIcon({ id, size = 36 }: { id: WarnId; size?: number }) {
  const s = { stroke: "var(--ink)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
  const body: Record<WarnId, React.ReactNode> = {
    two: (
      <g {...s}>
        <rect x="5" y="6" width="30" height="4" rx="1" fill="var(--accent-soft)" />
        <circle cx="12" cy="16" r="3.4" fill="#fff" />
        <path d="M7 31v-6a5 5 0 0 1 10 0v6M9 20l-2-10M15 20l2-10" fill="#fff" />
        <circle cx="28" cy="16" r="3.4" fill="#fff" />
        <path d="M23 31v-6a5 5 0 0 1 10 0v6M25 20l-2-10M31 20l2-10" fill="#fff" />
      </g>
    ),
    loose: (
      <g {...s}>
        <rect x="9" y="22" width="22" height="9" rx="1.5" fill="#f1efe9" />
        <path d="M17 22V10h6v12" fill="#fff" />
        <path d="M14 8h12" />
        <path d="M27.5 13.5a6 6 0 0 0-3-4.6" />
        <path d="M24.5 6.5l0 2.6 2.6.2" />
      </g>
    ),
    hand: (
      <g {...s}>
        <path d="M13 31v-9l-3-3.5a1.8 1.8 0 0 1 2.6-2.4L15 18V8.5a1.8 1.8 0 0 1 3.6 0V15V7a1.8 1.8 0 0 1 3.6 0v8V8.5a1.8 1.8 0 0 1 3.6 0V16v-4.5a1.8 1.8 0 0 1 3.6 0V22c0 5-3 9-8 9z" fill="#fff" />
      </g>
    ),
    wall: (
      <g {...s}>
        <path d="M6 4v32" />
        <path d="M6 8l-3 3M6 15l-3 3M6 22l-3 3M6 29l-3 3" strokeWidth={1.4} />
        <rect x="16" y="10" width="17" height="25" rx="1.5" fill="#fff" />
        <path d="M6 11h7v5" fill="none" />
        <path d="M13 16h3" />
      </g>
    ),
    square: (
      <g {...s}>
        <rect x="6" y="8" width="28" height="24" rx="1.5" fill="#fff" />
        <path d="M9 11l22 18M31 11L9 29" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="4.5" fill="#fff" />
        <path d="M18 19h4M18 21.2h4" strokeWidth={1.4} />
      </g>
    ),
    floor: (
      <g {...s}>
        <path d="M4 28l10-6h22l-10 6z" fill="var(--accent-soft)" />
        <path d="M10 23V12h14v10" fill="#fff" />
        <path d="M8 34l4-2.5M16 34l4-2.5M24 34l4-2.5" strokeWidth={1.4} />
      </g>
    ),
    face: (
      <g {...s}>
        <rect x="6" y="9" width="28" height="22" rx="1.5" fill="#fff" />
        <circle cx="13" cy="15" r="1.8" />
        <circle cx="13" cy="25" r="1.8" />
        <circle cx="27" cy="15" r="1.8" />
        <circle cx="27" cy="25" r="1.8" />
        <path d="M17 20h6M20.5 17.5L23 20l-2.5 2.5" />
      </g>
    ),
    tip: (
      <g {...s}>
        <path d="M5 35h30" />
        <g transform="rotate(14 24 34)">
          <rect x="15" y="6" width="16" height="28" rx="1.5" fill="#fff" />
          <path d="M15 15h16M15 24h16" />
        </g>
        <path d="M8 10l6 6M14 10l-6 6" strokeWidth={2.4} />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      {body[id]}
    </svg>
  );
}

export const WARN_TEXT: Record<WarnId, string> = {
  two: "Two people",
  loose: "Don't tighten fully yet",
  hand: "Hand tight only",
  wall: "Wall fixing",
  square: "Keep it square",
  floor: "Protect the surface",
  face: "Holes face inwards",
  tip: "Tip-over risk",
};

export const IWrench = (p: P) => <I {...p}><path d="M14.7 6.3a4 4 0 0 0 5.2 5.2l-8.6 8.6a2.1 2.1 0 0 1-3-3l8.6-8.6a4 4 0 0 1-2.2-2.2z" /><path d="M14.7 6.3L17 4l3 3-2.3 2.3" /></I>;
export const IHammer = (p: P) => <I {...p}><path d="M13.5 9.5L5 18a1.8 1.8 0 0 0 2.5 2.5l8.5-8.5" /><path d="M10.5 6.5l3-3c1.6-.6 3.4-.4 5 .8l1.2 1.2-2 2 1.5 1.5-2.5 2.5-1.5-1.5-2 2-2.7-2.7" /></I>;
export const IFlag = (p: P) => <I {...p}><path d="M5.5 21V4.5" /><path d="M5.5 4.5h11l-2.5 4 2.5 4h-11" /></I>;
export const ISound = (p: P) => <I {...p}><path d="M5 9.5h3l4-3.5v12l-4-3.5H5z" /><path d="M16 9a4 4 0 0 1 0 6" /></I>;
export const ISoundOff = (p: P) => <I {...p}><path d="M5 9.5h3l4-3.5v12l-4-3.5H5z" /><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" /></I>;
export const ILibrary = (p: P) => <I {...p}><rect x="4" y="4" width="4" height="16" rx="1" /><rect x="10" y="4" width="4" height="16" rx="1" /><path d="M16.2 5.2l3.8-1 3.2 14.8-3.8 1z" /></I>;
export const IShare = (p: P) => <I {...p}><path d="M12 15V4M7.5 8.5L12 4l4.5 4.5" /><path d="M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" /></I>;
export const IPrint = (p: P) => <I {...p}><path d="M7 9V4h10v5" /><rect x="4" y="9" width="16" height="8" rx="2" /><path d="M7 14h10v6H7z" /></I>;
export const IAlert = (p: P) => <I {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5.5" /><circle cx="12" cy="16.4" r=".5" fill="currentColor" /></I>;
export const IPlus = (p: P) => <I {...p}><path d="M12 5v14M5 12h14" /></I>;
export const IFilter = (p: P) => <I {...p}><path d="M4 6h16M7 12h10M10 18h4" /></I>;
export const IArrowUpRight = (p: P) => <I {...p}><path d="M7 17L17 7M8 7h9v9" /></I>;

export function IGithub({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.3-3.3-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.6-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.5 1 2.6 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2z" />
    </svg>
  );
}
export const IStar = (p: P) => <I {...p}><path d="M12 4.2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" /></I>;
export const IScan = (p: P) => <I {...p}><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" /><path d="M8 9h8M8 12h8M8 15h5" /></I>;
export const IKey = (p: P) => <I {...p}><circle cx="8" cy="15" r="3.8" /><path d="M10.8 12.3L19 4.2M16 7.2l2.3 2.3M13.8 9.4l1.8 1.8" /></I>;
export const IImage = (p: P) => <I {...p}><rect x="4" y="4.5" width="16" height="15" rx="2" /><circle cx="9" cy="9.5" r="1.6" /><path d="M20 16l-4.5-4.5L7 20" /></I>;
export const IDoc = (p: P) => <I {...p}><path d="M6.5 3.5h7.5l4.5 4.5v11.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z" /><path d="M13.5 3.5V8.5h5" /></I>;
export const ILock = (p: P) => <I {...p}><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></I>;
