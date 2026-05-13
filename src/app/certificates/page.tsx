import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { certificates } from "@/data/certificates";

export default function CertificatesPage() {
  return (
    <>
      <PageHero active="/certificates" title="Our Certificates" highlighted="Certificates" subtitle="Certified quality and trusted standards for safe, reliable, and export-ready food products." background="/images/hero/certificates-bg.jpg" />
      <main className="certificates-page shell">
        {certificates.map((cert, index) => <section className={`certificate-row ${index % 2 ? "reverse" : ""}`} key={cert.title}><div className="cert-image"><Image src={cert.image} alt={cert.title} width={600} height={420} /></div><div className="cert-text"><span>{cert.title}</span><h2>{cert.subtitle}</h2><p>{cert.text}</p><strong>{cert.logoText}</strong></div></section>)}
      </main>
      <Footer />
    </>
  );
}
