import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Cairo Food International",
  description: "Premium Egyptian fresh produce and food supply exports for global markets.",
};

import { GlobalScrollReveal } from "@/components/layout/GlobalScrollReveal";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cairo.variable} ${roboto.variable}`}>
      <body>
        <GlobalScrollReveal />
        {children}
      </body>
    </html>
  );
}
