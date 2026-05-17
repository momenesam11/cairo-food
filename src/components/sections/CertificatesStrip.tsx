"use client";
import { certificates } from "@/data/certificates";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function CertificatesStrip() {
  const { lang } = useLang();
  return (
    <section className="shell cert-section">
      <div className="cert-card">
        <div className="section-title">
          <span>{t(T.cert.label, lang)}</span>
          <h2>{t(T.cert.heading, lang)}</h2>
        </div>

        <div className="cert-logos">
          {certificates.map((cert) => (
            <a key={cert.id} href="/about#certificates" className="cert-logo-link">
              <img src={cert.logoImage} alt={cert.id} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
