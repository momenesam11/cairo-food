import { certificates } from "@/data/certificates";

export function CertificatesStrip() {
  return (
    <section className="shell cert-section">
      <div className="cert-card">
        <div className="section-title">
          <span>Our</span>
          <h2>Certificates</h2>
        </div>
        
        <div className="cert-logos">
          {certificates.map(cert => (
            <a key={cert.id} href="/about#certificates" className="cert-logo-link">
              <img src={cert.logoImage} alt={cert.id} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
