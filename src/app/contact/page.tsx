import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <>
      <PageHero 
        heroKey="contact"
        active="/contact"
        background="/images/hero/contact-hero.jpg"
      />
      <div style={{ paddingTop: '80px' }}>
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
