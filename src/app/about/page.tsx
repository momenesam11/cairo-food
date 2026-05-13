import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { company } from "@/data/company";

export default function AboutPage() {
  return (
    <>
      <PageHero active="/about" title="About Cairo Food International" highlighted="Cairo Food" subtitle="Trusted Egyptian exporter of premium fresh produce and food supplies, delivering quality from local farms to global markets since 2014." background="/images/hero/about-vegetables.jpg" />
      <AboutPreview full />
      <section className="shell vision-grid">
        <article><h3>Our<br />Vision</h3><p>“ {company.vision} ”</p></article>
        <article><h3>Our<br />Mission</h3><p>“ {company.mission} ”</p></article>
      </section>
      <ProcessPreview />
      <section className="shell gallery-grid">
        {[1,2,3,4,5,6].map((n) => <Image key={n} src={`/images/gallery/gallery-${n}.jpg`} alt={`Cairo Food gallery ${n}`} width={460} height={720} />)}
      </section>
      <ContactSection />
      <Footer />
    </>
  );
}
