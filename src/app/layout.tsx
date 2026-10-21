import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import "./guide.css";
import "./home.css";
import "./scan.css";

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

export const metadata: Metadata = {
  title: "Bygga: IKEA assembly, step by step",
  description: "Type the product name from the box. Bygga shows every assembly step in 3D, with the exact parts, screws and tools.",
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${noto.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
