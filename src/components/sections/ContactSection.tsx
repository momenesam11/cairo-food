"use client";
import { useState, useMemo } from "react";
import { company } from "@/data/company";
import Select from "react-select";
import countryList from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function ContactSection() {
  const { lang } = useLang();
  const [phone, setPhone]   = useState("");
  const [country, setCountry] = useState<any>(null);

  const options = useMemo(
    () => countryList.getData().map((c) => ({ value: c.code, label: c.name })),
    []
  );

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      background: "#f4f4f4",
      border: "0",
      borderRadius: "8px",
      padding: "2px",
      boxShadow: "none",
      minHeight: "48px",
    }),
    placeholder: (base: any) => ({ ...base, color: "#999", fontSize: "14px" }),
  };

  return (
    <section id="contact" className="contact-section-new shell">
      {/* ─── Info card ─── */}
      <div className="contact-info-card">
        <h2>
          {t(T.contact.heading, lang)}
          <br />
          <strong>{t(T.contact.headingBold, lang)}</strong>{" "}
          {t(T.contact.headingSuffix, lang)}
        </h2>
        <p>{t(T.contact.body, lang)}</p>

        <ul className="contact-details-list">
          <li>
            <img src="/images/contact/contact-icon-phone.png" alt="Phone" />
            <span className="ltr-phone">{company.phone}</span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-office.png" alt="Office" />
            <span>
              {t(T.contact.mainOffice, lang)} {lang === "ar" ? company.addressAr : company.address}
            </span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-factory.png" alt="Factory" />
            <span>
              {t(T.contact.packingHouse, lang)} {lang === "ar" ? company.packingHouseAr : company.packingHouse}
            </span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-mail.png" alt="Mail" />
            <span>
              {company.email}
              <br />
              {company.secondaryEmail}
            </span>
          </li>
        </ul>
      </div>

      {/* ─── Form ─── */}
      <div className="contact-form-area">
        <form className="modern-form">
          <div className="form-row">
            <div className="form-group">
              <label>{t(T.contact.firstName, lang)}</label>
              <input type="text" placeholder={t(T.contact.firstPlaceholder, lang)} />
            </div>
            <div className="form-group">
              <label>{t(T.contact.lastName, lang)}</label>
              <input type="text" placeholder={t(T.contact.lastPlaceholder, lang)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t(T.contact.country, lang)}</label>
              <Select
                instanceId="contact-country-select"
                inputId="contact-country-input"
                options={options}
                value={country}
                onChange={(val: any) => setCountry(val)}
                placeholder={t(T.contact.countryPlaceholder, lang)}
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-group">
              <label>{t(T.contact.email, lang)}</label>
              <input type="email" placeholder={t(T.contact.emailPlaceholder, lang)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t(T.contact.phone, lang)}</label>
              <div className="phone-input-wrap">
                <PhoneInput
                  country={country ? country.value.toLowerCase() : "eg"}
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  inputClass="phone-field-main"
                  buttonClass="phone-field-btn"
                  placeholder="0000 000 0000"
                />
              </div>
            </div>
            <div className="form-group">
              <label>{t(T.contact.company, lang)}</label>
              <input type="text" placeholder={t(T.contact.companyPlaceholder, lang)} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>{t(T.contact.message, lang)}</label>
            <textarea placeholder={t(T.contact.messagePlaceholder, lang)} />
          </div>

          <div className="form-buttons">
            <button type="button" className="whatsapp-btn">
              <img src="/images/social/social-wa.png" className="w-[24px] h-[24px]" alt="WA" />
              <span>{t(T.contact.whatsapp, lang)}</span>
            </button>
            <button type="submit" className="send-btn">
              <span>{t(T.contact.send, lang)}</span>
              <img src="/images/contact/icon-send.png" className="w-[30px] h-[30px]" alt="Send" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
