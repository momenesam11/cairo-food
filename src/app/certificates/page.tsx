import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CertificatesDetailed } from "@/components/sections/CertificatesDetailed";

export default function CertificatesPage() {
  return (
    <>
      <PageHero 
        heroKey="certificates"
        active="/certificates" 
        title="Quality Assurance & Certifications" 
        highlighted="Certificates" 
        subtitle="Certified quality and trusted standards for safe, reliable, and export-ready food products. We adhere to international food safety management systems." 
        background="/images/hero/certificates-bg.jpg" 
      />
      
      <div style={{ padding: '80px 0' }}>
        <CertificatesDetailed />
      </div>

      <Footer />
    </>
  );
}
