import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Catalog } from "@/components/home/Sections";
import { PRODUCT_COUNT } from "@/lib/search";

export const metadata: Metadata = { title: "All guides | Bygga" };

export default function Page() {
  return (
    <div className="site">
      <SiteHeader />
      <main className="browse">
        <header className="page-head">
          <h1>All guides</h1>
          <p className="lead">{PRODUCT_COUNT} IKEA products, drawn and ready to build. Not listed? Search for it by name on the home page.</p>
        </header>
        <Catalog search />
      </main>
      <SiteFooter />
    </div>
  );
}
