"use client";

import { useEffect, useRef, useState } from "react";
import type { Plan } from "@/lib/types";
import type { StageMode } from "@/engine/stage";
import { peekThumbnail, thumbnail } from "@/engine/thumbs";
import { useMounted } from "@/lib/useMounted";

/** A static line drawing of a plan, rendered offscreen. With `lazy`, it waits until scrolled into view. */
export default function Thumb({
  id,
  plan,
  mode,
  w = 360,
  h = 270,
  className,
  alt = "",
  lazy,
}: {
  id: string;
  plan: Plan | null | (() => Plan);
  mode: StageMode;
  w?: number;
  h?: number;
  className?: string;
  alt?: string;
  lazy?: boolean;
}) {
  const key = `${id}:${JSON.stringify(mode)}:${w}x${h}`;
  const mounted = useMounted();
  const el = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(!lazy);
  const [loaded, setLoaded] = useState<{ key: string; url: string } | null>(null);
  const url = (mounted ? peekThumbnail(key) : undefined) ?? (loaded?.key === key ? loaded.url : undefined);

  useEffect(() => {
    if (seen || !el.current) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el.current);
    return () => io.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen || !plan || peekThumbnail(key)) return;
    let alive = true;
    const p = typeof plan === "function" ? plan() : plan;
    thumbnail(key, p, mode, w, h).then((u) => alive && setLoaded({ key, url: u }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, plan, seen]);

  return (
    <span ref={el} className={"thumb " + (className ?? "") + (url ? " ready" : "")} style={{ aspectRatio: `${w} / ${h}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url && <img src={url} alt={alt} draggable={false} />}
    </span>
  );
}
