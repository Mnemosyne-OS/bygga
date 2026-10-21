import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Workshop from "@/components/workshop/Workshop";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Your workshop | Bygga" };

export default function Page() {
  return (
    <div className="site">
      <SiteHeader />
      <main>
        <Workshop />
      </main>
      <SiteFooter />
    </div>
  );
}
