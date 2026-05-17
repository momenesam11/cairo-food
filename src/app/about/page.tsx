import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { PackingGallery } from "@/components/products/PackingGallery";
import { CertificatesDetailed } from "@/components/sections/CertificatesDetailed";
import { company } from "@/data/company";

export default function AboutPage() {
  return (
    <>
      <PageHero active="/about" title="About Cairo Food International" highlighted="Cairo Food" subtitle="Trusted Egyptian exporter of premium fresh produce and food supplies, delivering quality from local farms to global markets since 2014." background="/images/hero/about-vegetables.jpg" />
      <WhoWeAre />
      <section className="shell vision-grid">
        <article>
          <img src="/images/about/vision-eye.svg" className="watermark" alt="" />
          <div className="vm-header">
            <h3>Our<br /><strong>Vision</strong></h3>
          </div>
          <div className="vm-body">
            <span className="quote-start">“</span>
            <p>{company.vision}</p>
            <span className="quote-end">”</span>
          </div>
        </article>
        <article>
          <img src="/images/about/mission-target.svg" className="watermark" alt="" />
          <div className="vm-header">
            <h3>Our<br /><strong>Mission</strong></h3>
          </div>
          <div className="vm-body">
            <span className="quote-start">“</span>
            <p>{company.mission}</p>
            <span className="quote-end">”</span>
          </div>
        </article>
      </section>
      <ProcessPreview />
      
      <section className="shell about-gallery-section" style={{ padding: '80px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: 'var(--navy)' }}>Our <strong>Gallery</strong></h2>
        <PackingGallery images={[1,2,3,4,5,6].map((n) => `/images/gallery/gallery-${n}.jpg`)} wrapperHeight="460px" />
      </section>
      <ContactSection />
      <Footer />
    </>
  );
}
