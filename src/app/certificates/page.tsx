import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CertificatesDetailed } from "@/components/sections/CertificatesDetailed";

export const metadata: Metadata = {
  title: "Certificates & Quality Standards",
  description:
    "Explore the quality, safety, and export certifications held by Cairo Food International for its Egyptian fresh produce and food products.",
  alternates: { canonical: "/certificates" },
  openGraph: { url: "/certificates", title: "Certificates | Cairo Food International" },
};

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
