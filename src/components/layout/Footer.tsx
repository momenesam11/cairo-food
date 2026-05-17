"use client";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

const navItems = [
  { key: "home",         href: "/" },
  { key: "about",        href: "/about" },
  { key: "products",     href: "/products" },
  { key: "certificates", href: "/certificates" },
] as const;

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/images/brand/logo-footer.png" alt="Cairo Food" width={260} height={92} priority />
        </div>

        <div className="footer-col hide-mobile">
          <h4>{t(T.footer.company, lang)}</h4>
          <div className="footer-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {t(T.nav[item.key as keyof typeof T.nav] as { en: string; ar: string }, lang)}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-col hide-mobile">
          <h4>{t(T.footer.legal, lang)}</h4>
          <div className="footer-links">
            <Link href="#">{t(T.footer.privacy, lang)}</Link>
            <Link href="#">{t(T.footer.terms, lang)}</Link>
          </div>
        </div>

        <div className="footer-col hide-mobile">
          <h4>{t(T.footer.reach, lang)}</h4>
          <div className="footer-contact">
            <p>
              <img src="/images/contact/contact-icon-phone.png" alt="Phone" />
              <span>{company.phone}</span>
            </p>
            <p>
              <img src="/images/contact/contact-icon-mail.png" alt="Mail" />
              <span>{company.email}</span>
            </p>
            <p>
              <img src="/images/contact/contact-icon-office.png" alt="Pin" />
              <span><strong>{t(T.footer.mainOffice, lang)}</strong> {company.address}</span>
            </p>
            <p>
              <img src="/images/contact/contact-icon-factory.png" alt="Factory" />
              <span><strong>{t(T.footer.packingHouse, lang)}</strong> {company.packingHouse}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="footer-divider" />
        <div className="footer-bottom">
          <p>{t(T.footer.copyright, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
