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

export default function HomePage() {
  return (
    <>
      <PageHero 
        active="/" 
        title="Egyptian Fresh Produce Delivered to Global Markets" 
        highlighted="Fresh Produce" 
        subtitle="Cairo Food International exports high-quality Egyptian fruits and vegetables to Europe, Asia, and Africa with reliable sourcing, careful handling, and export-ready standards." 
        background="/images/hero/home-market.jpg" 
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
