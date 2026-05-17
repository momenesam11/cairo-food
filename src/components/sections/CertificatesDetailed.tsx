"use client";
import { certificates } from "@/data/certificates";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function CertificatesDetailed() {
  const { lang } = useLang();
  return (
    <section className="shell cert-section-detailed">
      <div className="cert-list">
        {certificates.map((cert, index) => (
          <div key={cert.id} className={`certificate-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
            <div className="cert-image-box">
              <img src={cert.image} alt={cert.title} />
              <div className="cert-overlay">
                <a href={cert.pdf} target="_blank" rel="noreferrer" className="view-cert-btn">
                  {t(T.certs.viewCert, lang)}
                </a>
              </div>
            </div>
            <div className="cert-info">
              <span className="cert-eyebrow">{lang === 'ar' ? cert.eyebrowAr ?? cert.eyebrow : cert.eyebrow}</span>
              <h3 className="cert-title">{lang === 'ar' ? cert.titleAr ?? cert.title : cert.title}</h3>
              <p className="cert-desc">{lang === 'ar' ? cert.descAr ?? cert.desc : cert.desc}</p>
              <div className="cert-brand-logo">
                <img src={cert.logoImage} alt={lang === 'ar' ? cert.eyebrowAr ?? cert.eyebrow : cert.eyebrow} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
