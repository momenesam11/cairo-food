import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cairo Food International for export inquiries, quotes, and partnerships in premium Egyptian fresh produce.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact Cairo Food International" },
};

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
