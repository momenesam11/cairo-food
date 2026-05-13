"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";

export function Header({ active = "/" }: { active?: string }) {
  const [isSticky, setIsSticky] = useState(false);

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
    <header className={`site-header ${isSticky ? "is-sticky" : ""}`}>
      <div className="mobile-bar">
        <button aria-label="Open menu" className="hamburger"><span /><span /><span /></button>
        <Link href="/" className="mobile-logo"><Image src="/images/brand/logo-header.png" alt="Cairo Food" width={135} height={41} priority /></Link>
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
          <Link className="contact-btn" href="#contact">Contact Us</Link>
        </div>
      </nav>
    </header>
  );
}
