import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <>
      <PageHero 
        active="/contact" 
        title="Get in Touch with Cairo Food" 
        highlighted="Contact Us" 
        subtitle="Have questions or ready to start an order? Our team is here to help you with any inquiries about our premium Egyptian products and export services." 
        background="/images/hero/contact-hero.jpg" 
      />
      <div style={{ paddingTop: '80px' }}>
        <ContactSection />
      </div>
      
      {/* Contact Info Strip */}
      <section className="shell contact-info-strip">
        <div className="info-grid">
          <article className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-text">
              <h4>Our Location</h4>
              <p>Alexandria, Egypt</p>
            </div>
          </article>
          <article className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-text">
              <h4>Phone Number</h4>
              <p>+20 123 456 789</p>
            </div>
          </article>
          <article className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-text">
              <h4>Email Address</h4>
              <p>info@cairofood.com</p>
            </div>
          </article>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
