import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import "./guide.css";
import "./home.css";
import "./scan.css";
import { Analytics } from "@vercel/analytics/next";
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

const description = "Type the product name from the box. Bygga shows every assembly step in 3D, with the exact parts, screws and tools, and reads each one out loud.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bygga: IKEA assembly, step by step",
  description,
  applicationName: "Bygga",
  appleWebApp: { capable: true, title: "Bygga", statusBarStyle: "default" },
  openGraph: { type: "website", siteName: "Bygga", title: "Bygga: IKEA assembly, step by step", description, url: "/" },
  twitter: { card: "summary_large_image", title: "Bygga: IKEA assembly, step by step", description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${noto.variable} ${display.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
