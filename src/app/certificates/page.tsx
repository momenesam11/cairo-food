import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CertificatesDetailed } from "@/components/sections/CertificatesDetailed";

export default function CertificatesPage() {
  return (
    <>
      <PageHero 
        heroKey="certificates"
        active="/certificates" 
        background="/images/hero/certificates-bg.jpg" 
      />
      
      <div style={{ padding: '80px 0' }}>
        <CertificatesDetailed />
      </div>

      <Footer />
    </>
  );
}
