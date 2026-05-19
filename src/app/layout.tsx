import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { GlobalScrollReveal } from "@/components/layout/GlobalScrollReveal";

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
  title: "Cairo Food International | كايرو فود إنترناشيونال",
  description:
    "Premium Egyptian fresh produce and food supply exports for global markets. | تصدير أجود المنتجات الطازجة والغذائية المصرية للأسواق العالمية.",
  icons: {
    icon: "/images/fav.png",
    shortcut: "/images/fav.png",
    apple: "/images/fav.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${cairo.variable} ${roboto.variable}`}>
      <body>
        <LanguageProvider>
          <GlobalScrollReveal />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
