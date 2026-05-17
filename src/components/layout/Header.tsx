"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

const navItems = [
  { key: "home",         href: "/" },
  { key: "about",        href: "/about" },
  { key: "products",     href: "/products" },
  { key: "certificates", href: "/certificates" },
] as const;

export function Header({ active = "/" }: { active?: string }) {
  const { lang, toggle } = useLang();
  const [isSticky, setIsSticky]   = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isSticky ? "is-sticky" : ""} ${isMenuOpen ? "is-open" : ""}`}>
      {/* ── Mobile Bar ─────────────────────────── */}
      <div className="mobile-bar shell">
        <button
          aria-label="Toggle menu"
          className={`hamburger ${isMenuOpen ? "is-active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span /><span /><span />
        </button>
        <Link href="/" className="mobile-logo">
          <Image src="/images/brand/logo-header.png" alt="Cairo Food" width={135} height={41} priority />
        </Link>
      </div>

      {/* ── Mobile Menu ────────────────────────── */}
      <div className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <nav className="mobile-nav-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              {t(T.nav[item.key as keyof typeof T.nav] as { en: string; ar: string }, lang)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mobile-contact-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            {t(T.nav.contact, lang)}
          </Link>
          {/* Language Toggle (mobile) */}
          <button
            className="lang-toggle-mobile"
            onClick={() => { toggle(); setIsMenuOpen(false); }}
          >
            {t(T.nav.langToggle, lang)}
          </button>
        </nav>
      </div>

      {/* ── Desktop Nav ────────────────────────── */}
      <nav className="desktop-nav shell" aria-label="Main navigation">
        {/* Left: nav links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={active === item.href ? "active" : ""}>
              {t(T.nav[item.key as keyof typeof T.nav] as { en: string; ar: string }, lang)}
            </Link>
          ))}
        </div>

        {/* Center: logo */}
        <Link href="/" className="brand-logo">
          <Image src="/images/brand/logo-header.png" alt="Cairo Food International" width={155} height={47} priority />
        </Link>

        {/* Right: lang toggle + contact */}
        <div className="nav-actions">
          <button className="lang-toggle-btn" onClick={toggle} aria-label="Switch language">
            {t(T.nav.langToggle, lang)}
          </button>
          <Link className="contact-btn" href="/contact">
            {t(T.nav.contact, lang)}
          </Link>
        </div>
      </nav>
    </header>
  );
}
