import { certificates } from "@/data/certificates";

export function CertificatesDetailed() {
  return (
    <section className="shell cert-section-detailed">
      <div className="cert-list">
        {certificates.map((cert, index) => (
          <div key={cert.id} className={`certificate-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
            <div className="cert-image-box">
              <img src={cert.image} alt={cert.title} />
              <div className="cert-overlay">
                <a href={cert.pdf} target="_blank" rel="noreferrer" className="view-cert-btn">
                  View Certificate
                </a>
              </div>
            </div>
            <div className="cert-info">
              <span className="cert-eyebrow">{cert.eyebrow}</span>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.desc}</p>
              <div className="cert-brand-logo">
                <img src={cert.logoImage} alt={cert.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
