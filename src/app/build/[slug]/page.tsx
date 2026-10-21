import { Suspense } from "react";
import type { Metadata } from "next";
import GuideApp from "@/components/guide/GuideApp";
import { catalogSpec } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug.startsWith("scan-")) return { title: "Scanned guide | Bygga" };
  const s = catalogSpec(decodeURIComponent(slug));
  const name = s ? `${s.name} ${s.variant.toLowerCase()}` : decodeURIComponent(slug).replace(/-/g, " ").toUpperCase();
  return { title: `${name}: assembly step by step | Bygga` };
}

export default function Page(props: Props) {
  return (
    <Suspense fallback={<div className="guide shell" />}>
      <Inner {...props} />
    </Suspense>
  );
}

async function Inner({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.slice(0, 80) : undefined;
  const step = typeof sp.step === "string" ? Number(sp.step) : undefined;
  const kind = typeof sp.kind === "string" ? sp.kind : undefined;
  return <GuideApp slug={decodeURIComponent(slug)} query={q} kind={kind} step={step && step > 0 ? Math.floor(step) : undefined} />;
}
