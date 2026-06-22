import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/layout/Footer";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { CertificatesStrip } from "@/components/sections/CertificatesStrip";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { MarketsSection } from "@/components/sections/MarketsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ContactSection } from "@/components/sections/ContactSection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <PageHero
        heroKey="home"
        background="/images/hero/home-market.jpg"
        active="/"
        align="left"
        actions
        personImage="/images/hero/hero-people.png"
      />
      <Reveal delay={0.2}><ProductsGrid limit={6} /></Reveal>
      <Reveal delay={0.3}><CertificatesStrip /></Reveal>
      <Reveal direction="left"><AboutPreview /></Reveal>
      <Reveal direction="right"><ProcessPreview /></Reveal>
      <Reveal><MarketsSection /></Reveal>
      <Reveal delay={0.1}><WhyChooseUs /></Reveal>
      <Reveal><ContactSection /></Reveal>
      <Footer />
    </>
  );
}
