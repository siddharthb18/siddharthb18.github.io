import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/newsreader";
import Palette, { paletteScript } from "@/components/Palette";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://siddharthb18.github.io"),
  title: { default: "Siddharth Bhatt", template: "%s · Siddharth Bhatt" },
  description: "Siddharth Bhatt studies at Texas A&M and spent two years as a software developer at Walmart Global Tech.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#ebe7dc" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The palette script sets data-palette before React loads, so the attribute can differ from the server HTML.
    <html lang="en" data-palette="tea" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <Palette />
      </body>
    </html>
  );
}
