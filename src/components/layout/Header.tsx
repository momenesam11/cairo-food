"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";

export function Header({ active = "/" }: { active?: string }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isSticky ? "is-sticky" : ""} ${isMenuOpen ? "is-open" : ""}`}>
      <div className="mobile-bar shell">
        <button 
          aria-label="Toggle menu" 
          className={`hamburger ${isMenuOpen ? "is-active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
        <Link href="/" className="mobile-logo">
          <Image src="/images/brand/logo-header.png" alt="Cairo Food" width={135} height={41} priority />
        </Link>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <nav className="mobile-nav-links">
          {navigation.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={active === item.href ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="mobile-contact-btn" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
        </nav>
      </div>

      <nav className="desktop-nav shell" aria-label="Main navigation">
        <div className="nav-links">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={active === item.href ? "active" : ""}>{item.label}</Link>
          ))}
        </div>
        <Link href="/" className="brand-logo"><Image src="/images/brand/logo-header.png" alt="Cairo Food International" width={155} height={47} priority /></Link>
        <div className="nav-actions">
          <span className="lang">العربية ✥</span>
          <Link className="contact-btn" href="/contact">Contact Us</Link>
        </div>
      </nav>
    </header>
  );
}
