import { OG_SIZE, siteCard } from "@/lib/og/card";

export const alt = "Bygga: IKEA assembly, step by step, in 3D. Powered by Together AI";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return siteCard();
}
