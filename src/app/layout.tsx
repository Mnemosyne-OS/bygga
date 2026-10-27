import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import "./guide.css";
import "./home.css";
import "./scan.css";
import { Analytics } from "@vercel/analytics/next";
import Offline from "@/components/Offline";
import { SITE_URL } from "@/lib/site";

const noto = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto",
  display: "swap",
});

const display = Noto_Sans_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const description = "Type the product name from the box. Bygga shows every assembly step in 3D, with the parts, screws and tools for each one, and reads it out loud.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bygga: step-by-step assembly for IKEA furniture",
  description,
  applicationName: "Bygga",
  appleWebApp: { capable: true, title: "Bygga", statusBarStyle: "default" },
  openGraph: { type: "website", siteName: "Bygga", title: "Bygga: step-by-step assembly for IKEA furniture", description, url: "/" },
  twitter: { card: "summary_large_image", title: "Bygga: step-by-step assembly for IKEA furniture", description },
};

export const viewport: Viewport = {
  themeColor: "#f5f4f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${noto.variable} ${display.variable}`}>
      <body>
        {children}
        <Analytics />
        <Offline />
      </body>
    </html>
  );
}
