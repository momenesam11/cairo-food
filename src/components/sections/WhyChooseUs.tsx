"use client";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

const icons = ["why-icon-quality.png", "why-icon-global.png", "why-icon-commitment.png"];
const colors = ["#00122e", "#015c44", "#689d00"];

export function WhyChooseUs() {
  const { lang } = useLang();
  return (
    <section className="shell why-section-new">
      <div className="why-title-area">
        <div className="side-title">
          <span>{t(T.why.label, lang)}</span>
          <h3>{t(T.why.heading, lang)}</h3>
        </div>
      </div>

      <div className="why-features-grid">
        {T.why.features.map((item, index) => (
          <article className="why-card" key={index}>
            <div className="why-icon-box" style={{ backgroundColor: colors[index] }}>
              <img src={`/images/why/${icons[index]}`} alt={t(item.title, lang)} />
            </div>
            <h4>{t(item.title, lang)}</h4>
            <p>{t(item.text, lang)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
