import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { GlobalScrollReveal } from "@/components/layout/GlobalScrollReveal";
import { company } from "@/data/company";

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

const siteUrl = "https://www.cairofoodintl.eg";
const siteTitle = "Cairo Food International | كايرو فود إنترناشيونال";
const siteDescription =
  "Premium Egyptian fresh produce and food supply exports for global markets. | تصدير أجود المنتجات الطازجة والغذائية المصرية للأسواق العالمية.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Cairo Food International",
  },
  description: siteDescription,
  keywords: [
    "Egyptian food exports",
    "fresh produce export Egypt",
    "Cairo Food International",
    "تصدير منتجات مصرية",
    "تصدير خضروات وفاكهة",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: "/images/fav.png",
    shortcut: "/images/fav.png",
    apple: "/images/fav.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Cairo Food International",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${cairo.variable} ${roboto.variable}`}>
      <body>
        <LanguageProvider>
          <GlobalScrollReveal />
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Cairo Food International",
                url: siteUrl,
                logo: `${siteUrl}/images/brand/logo-header.png`,
                description: siteDescription,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "19 Abdel Galil Street, Al-Zaytoun",
                  addressLocality: "Cairo",
                  addressCountry: "EG",
                },
                email: company.email,
                telephone: company.phone,
              }),
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
