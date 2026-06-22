"use client";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

type HeroKey = "home" | "about" | "products" | "certificates" | "contact";

type Props = {
  heroKey: HeroKey;
  /** override title/subtitle if you don't use a heroKey preset */
  title?: string;
  highlighted?: string;
  subtitle?: string;
  background: string;
  active?: string;
  align?: "center" | "left";
  actions?: boolean;
  personImage?: string;
};

export function PageHero({
  heroKey,
  title: titleOverride,
  highlighted: highlightedOverride,
  subtitle: subtitleOverride,
  background,
  active = "/",
  align = "center",
  actions = false,
  personImage,
}: Props) {
  const { lang } = useLang();

  // Resolve text from translations or overrides
  const heroData = T.hero[heroKey];
  const rawTitle   = titleOverride   ?? t(heroData.title,    lang);
  const rawSubtitle = subtitleOverride ?? t(heroData.subtitle, lang);

  // Highlight a word inside the title
  const hlWord = highlightedOverride ?? ("highlighted" in heroData ? t((heroData as any).highlighted, lang) : "");
  let titleHtml = rawTitle;
  if (hlWord && rawTitle.includes(hlWord)) {
    titleHtml = rawTitle.replace(hlWord, `<strong>${hlWord}</strong>`);
  }

  return (
    <section
      className={`page-hero hero-${align} ${personImage ? "has-person" : ""}`}
    >
      <Image
        src={background}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={65}
        className="page-hero-bg"
      />
      <div className="page-hero-overlay" />
      <Header active={active} />
      <div className="shell page-hero-content-wrapper">
        <div className="page-hero-content">
          <h1 dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p>{rawSubtitle}</p>
          {actions && (
            <div className="hero-actions">
              <Button href="/products">
                {t(T.hero.home.exploreBtn, lang)}
              </Button>
              <Button href="#contact" variant="light">
                {t(T.hero.home.quoteBtn, lang)}
              </Button>
            </div>
          )}
        </div>

        {personImage && (
          <div className="hero-person-image">
            <Image src={personImage} alt="Cairo Food Team" width={1094} height={952} priority />
          </div>
        )}
      </div>
    </section>
  );
}
