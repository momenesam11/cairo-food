"use client";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function AboutPreview({ full = false }: { full?: boolean }) {
  const { lang } = useLang();
  return (
    <section className="about-section shell">
      <div className="section-title-center-lines">
        <span>{t(T.about.sectionLabel, lang)}</span>
        <strong>{t(T.about.sectionStrong, lang)}</strong>
      </div>

      <div className={`about-layout ${full ? "about-full" : ""}`}>
        <div className="about-collage-new">
          <div className="collage-main">
            <Image src="/images/about/about-farm.png" alt="Egyptian farms" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="collage-top-left">
            <Image src="/images/about/about-veg.jpg" alt="Fresh vegetables" width={200} height={240} />
          </div>
          <div className="collage-bottom-right">
            <Image src="/images/about/about-fruits.jpg" alt="Fresh fruits" width={200} height={240} />
          </div>
        </div>

        <div className="about-content-new">
          <h3>{t(T.about.heading, lang)}</h3>
          <p>{t(T.about.body, lang)}</p>

          <ul className="feature-list">
            <li>
              <span className="feature-icon">
                <img src="/images/about/about-icon-box.svg" alt="Export" />
              </span>
              {t(T.about.feat1, lang)}
            </li>
            <li>
              <span className="feature-icon">
                <img src="/images/about/about-icon-leaf.svg" alt="Fresh" />
              </span>
              {t(T.about.feat2, lang)}
            </li>
            <li>
              <span className="feature-icon">
                <img src="/images/about/about-icon-medal.svg" alt="Trusted" />
              </span>
              {t(T.about.feat3, lang)}
            </li>
          </ul>

          <Button href="/about" className="learn-more-btn">
            {t(T.about.learnMore, lang)}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }}>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white"/>
              <path d="M10.5 15.5L14 12L10.5 8.5" stroke="#72ad00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
