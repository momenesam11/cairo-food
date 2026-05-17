import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <>
      <PageHero 
        heroKey="contact"
        active="/contact" 
        title="Get in Touch with Cairo Food" 
        highlighted="Contact Us" 
        subtitle="Have questions or ready to start an order? Our team is here to help you with any inquiries about our premium Egyptian products and export services." 
        background="/images/hero/contact-hero.jpg" 
      />
      <div style={{ paddingTop: '80px' }}>
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
