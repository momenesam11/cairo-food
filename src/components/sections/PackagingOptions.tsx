"use client";
import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function PackagingOptions() {
  const { lang } = useLang();
  
  const items = [
    { en: "Various sizes and materials available", ar: "أحجام ومواد مختلفة متاحة" },
    { en: "Custom labeling and branding", ar: "تسمية مخصصة وعلامة تجارية" },
    { en: "Palletized and container-ready", ar: "مجهزة للمنصات والحاويات" },
    { en: "Meet international import standards", ar: "تلبية معايير الاستيراد الدولية" }
  ];
  
  const packingSideItems = [
    { title: { en: "Boxes", ar: "صناديق" }, desc: { en: "We Used Plastic And Carton Boxes For Package", ar: "نستخدم صناديق بلاستيكية وكرتونية للتعبئة" }, icon: "/images/icons/icon-box.svg" },
    { title: { en: "Bags", ar: "أكياس" }, desc: { en: "Mesh, PP Suitable For Vegetables And Bulk Supplies.", ar: "شبك وبولي بروبيلين مناسبة للخضروات والإمدادات السائبة." }, icon: "/images/icons/icon-bag.svg" },
    { title: { en: "Custom Packaging", ar: "تعبئة مخصصة" }, desc: { en: "Branded And Tailored Packaging Solutions To Match Your Market Needs.", ar: "حلول تعبئة مخصصة وذات علامة تجارية لتناسب احتياجات سوقك." }, icon: "/images/icons/icon-custom.svg" }
  ];

  return (
    <section className="packaging-section">
      <div className="shell packaging-grid">
        <article className="packaging-main">
          <div className="packaging-info">
            <h2>{t(T.packaging.heading, lang)} & <strong>{t(T.packaging.headingS, lang)}</strong></h2>
            <p>{t(T.packaging.body, lang)}</p>
            <ul className="packaging-list">
              {items.map((item, i) => (
                <li key={i}>
                  <span className="check-icon">✓</span>
                  {lang === 'ar' ? item.ar : item.en}
                </li>
              ))}
            </ul>
          </div>
          <img src="/images/products/packaging-crates.png" alt="Packaging crates" className="packaging-image" />
        </article>
        
        <div className="packing-side">
          {packingSideItems.map((item) => (
            <article key={item.title.en} className="packing-card">
              <div className="packing-icon-box">
                <img src={item.icon} alt={lang === 'ar' ? item.title.ar : item.title.en} />
              </div>
              <div className="packing-content">
                <h3>{lang === 'ar' ? item.title.ar : item.title.en}</h3>
                <p>{lang === 'ar' ? item.desc.ar : item.desc.en}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
