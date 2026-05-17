import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { PackingGallery } from "@/components/products/PackingGallery";
import { CertificatesDetailed } from "@/components/sections/CertificatesDetailed";
import { company } from "@/data/company";
import { VisionMissionSection } from "@/components/sections/VisionMissionSection";

export default function AboutPage() {
  return (
    <>
      <PageHero
        heroKey="about"
        background="/images/hero/about-vegetables.jpg"
        active="/about"
      />
      <WhoWeAre />
      <VisionMissionSection />
      <ProcessPreview />

      {/* About Us Gallery Section - SCOPED STYLES ONLY */}
      {/* wrapperClassName="about-gallery-item" ensures this gallery gets its own CSS variables */}
      {/* --about-gallery-height (460px desktop) applies ONLY to elements with .about-gallery-item class */}
      {/* This prevents any impact on Product Details or other shared gallery uses */}
      <section className="shell about-gallery-section" style={{ padding: "80px 0" }}>
        <PackingGallery
          images={[1, 2, 3, 4, 5, 6].map((n) => `/images/gallery/gallery-${n}.jpg`)}
          wrapperHeight="460px"
          wrapperClassName="about-gallery-item h-60 sm:h-auto"
        />
      </section>
      <ContactSection />
      <Footer />
    </>
  );
}
