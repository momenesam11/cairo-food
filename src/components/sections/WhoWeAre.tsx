"use client";
import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function WhoWeAre() {
  const { lang } = useLang();
  return (
    <section className="shell who-we-are-section">
      <div className="who-we-are-top">
        <div className="who-title">
          <span>{t(T.who.label, lang)}</span>
          <h2>{t(T.who.heading, lang)}</h2>
        </div>
        <div className="who-text">
          <p>{t(T.who.p1, lang)}</p>
          <p>{t(T.who.p2, lang)}</p>
        </div>
        <div className="who-image">
          <Image src="/images/about/about-farm.png" alt="Farm Landscape" width={800} height={450} priority />
        </div>
      </div>

      <div className="who-features">
        <div className="who-feature">
          <div className="who-icon-circle">
            <img src="/images/about/about-icon-export.svg" alt="Export" />
          </div>
          <span className="text">{t(T.who.feat1, lang)}</span>
        </div>
        <div className="who-feature">
          <div className="who-icon-circle">
            <img src="/images/about/about-icon-products.svg" alt="Products" />
          </div>
          <span className="text">{t(T.who.feat2, lang)}</span>
        </div>
        <div className="who-feature">
          <div className="who-icon-circle">
            <img src="/images/about/about-icon-standards.svg" alt="Standards" />
          </div>
          <span className="text">{t(T.who.feat3, lang)}</span>
        </div>
      </div>
    </section>
  );
}
