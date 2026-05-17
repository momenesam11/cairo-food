"use client";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

const icons = [
  "/images/icons/icon-fresh.svg",
  "/images/icons/icon-frozen.svg",
  "/images/icons/icon-crops.svg",
];

export function ProductCategories() {
  const { lang } = useLang();
  return (
    <section className="shell categories-section">
      <div className="category-title-wrap">
        <h2>
          {t(T.categories.heading, lang)}{" "}
          <strong>{t(T.categories.headingStrong, lang)}</strong>
        </h2>
      </div>
      <p>{t(T.categories.body, lang)}</p>

      <div className="category-grid">
        {T.categories.cats.map((cat, index) => (
          <article key={index} className={`category-card ${index === 1 ? "navy" : ""}`}>
            <div className="category-icon-box">
              <img src={icons[index]} alt={t(cat.title, lang)} />
            </div>
            <div className="category-content">
              <h3>{t(cat.title, lang)}</h3>
              <p>{t(cat.desc, lang)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
