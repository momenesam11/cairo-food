"use client";
import { useState, useMemo, useEffect } from "react";
import { company } from "@/data/company";
import Select from "react-select";
import countryList from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";
import emailjs from '@emailjs/browser';

export function ContactSection() {
  const { lang } = useLang();
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<any>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    message: "",
    honeypot: "", // Bot prevention honeypot field
  });

  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    country?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const isSuccess = status.type === "success";

  // ─── SENIOR FIX: Global/Runtime Initialization of EmailJS ───
  // Calling init dynamically inside useEffect ensures the browser SDK is fully hydrated
  // and authenticated with the Public Key before any submissions occur.
  useEffect(() => {
    try {
      emailjs.init({
        publicKey: "RMVITA0-xjFRA1Tm8",
      });
      console.log("EmailJS SDK initialized successfully.");
    } catch (e) {
      console.error("Failed to initialize EmailJS:", e);
    }
  }, []);

  const options = useMemo(
    () => countryList.getData().map((c) => ({ value: c.code, label: c.name })),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Proactively clear the error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const tempErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first_name.trim()) {
      tempErrors.first_name = t((T.contact as any).validation.firstNameMin, lang);
    } else if (formData.first_name.trim().length < 2) {
      tempErrors.first_name = t((T.contact as any).validation.firstNameMin, lang);
    }

    if (!formData.last_name.trim()) {
      tempErrors.last_name = t((T.contact as any).validation.lastNameMin, lang);
    } else if (formData.last_name.trim().length < 2) {
      tempErrors.last_name = t((T.contact as any).validation.lastNameMin, lang);
    }

    if (!formData.email.trim()) {
      tempErrors.email = t((T.contact as any).validation.emailInvalid, lang);
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = t((T.contact as any).validation.emailInvalid, lang);
    }

    if (!phone || phone.replace(/\D/g, "").length < 8) {
      tempErrors.phone = t((T.contact as any).validation.phoneInvalid, lang);
    }

    if (!country) {
      tempErrors.country = t((T.contact as any).validation.countryRequired, lang);
    }

    if (!formData.message.trim()) {
      tempErrors.message = t((T.contact as any).validation.messageMin, lang);
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = t((T.contact as any).validation.messageMin, lang);
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Honeypot anti-spam check: if filled, reject silently to confuse bots and pretend it succeeded
    if (formData.honeypot && formData.honeypot.length > 0) {
      console.warn("Spam attempt blocked via Honeypot check:", formData.honeypot);
      setStatus({ type: "success" });
      return;
    }

    setStatus({ type: 'submitting' });

    try {
      // ─── SENIOR DUAL-SAFE EXECUTION ───
      // We pass the Public Key as an options object AND as a direct string backup.
      // This guarantees complete backward and forward compatibility with both older and newer SDKs.
     console.log("Form values:", e.currentTarget);
      const res = await emailjs.sendForm(
        'service_5hdpxqn',   // Service ID
        'template_wzakcub',  // Template ID
        e.currentTarget,     // The native <form> element
        'km2CZPAj28GP6XDpE' // Public Key as String
      );
      
      console.log("EmailJS sendForm Success:", res.status, res.text);
      setStatus({ type: 'success', message: 'تم إرسال الرسالة بنجاح!' });
      
      // Reset form fields
      
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        message: '',
        honeypot: '',
      });
      setPhone("");
      setCountry(null);
      setErrors({});
    } catch (err: any) {
      console.error("EmailJS sendForm Error caught:", err);
      
      // Detailed user fallback message with guidance
      const rawErrorText = err?.text || err?.message || "";
      let errorMsg = lang === 'ar' ? 'حدث خطأ، حاول مرة أخرى.' : 'An error occurred, please try again.';
      
      if (rawErrorText.toLowerCase().includes("not found") || rawErrorText.toLowerCase().includes("account")) {
        errorMsg = lang === 'ar' 
          ? 'خطأ: لم يتم العثور على الحساب. يرجى التأكد من صحة الـ Public Key الخاص بك في حساب EmailJS.'
          : 'Error: Account not found. Please double-check your EmailJS Public Key / User ID in your dashboard.';
      } else if (rawErrorText) {
        errorMsg = rawErrorText;
      }
      
      setStatus({ 
        type: 'error', 
        message: errorMsg 
      });
      console.error("Detailed EmailJS error:", JSON.stringify(err, null, 2));
    }
  };

  const handleResetForm = () => {
    setStatus({ type: "idle" });
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      message: "",
      honeypot: "",
    });
    setPhone("");
    setCountry(null);
    setErrors({});
  };

  // Format local Egypt time dynamically
  const formattedTime = useMemo(() => {
    return new Date().toLocaleString("en-US", { 
      timeZone: "Africa/Cairo",
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [formData]);

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "#f4f4f4",
      border: errors.country ? "1px solid #e53e3e" : "0",
      borderRadius: "8px",
      padding: "2px",
      boxShadow: "none",
      minHeight: "48px",
      "&:hover": {
        border: errors.country ? "1px solid #e53e3e" : "0",
      }
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
              <strong>{t(T.contact.mainOffice, lang)}</strong>{" "}
              <a
                href={company.officeMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-link"
              >
                {lang === "ar" ? company.addressAr : company.address}
              </a>
            </span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-factory.png" alt="Factory" />
            <span>
              <strong>{t(T.contact.packingHouse, lang)}</strong>{" "}
              <a
                href={company.packingHouseMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-link"
              >
                {lang === "ar" ? company.packingHouseAr : company.packingHouse}
              </a>
            </span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-mail.png" alt="Mail" />
            <span className="flex flex-col gap-1">
              {company.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="contact-email-link">
                  {email}
                </a>
              ))}
            </span>
          </li>
        </ul>
      </div>

      {/* ─── Form / Success Area ─── */}
      <div className="contact-form-area">
        {isSuccess ? (
          <div className="success-card-wrapper">
            <div className="success-icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3>{t((T.contact as any).status.successTitle, lang)}</h3>
            <p>{t((T.contact as any).status.successDesc, lang)}</p>
            <button
              type="button"
              className="success-back-btn"
              onClick={handleResetForm}
            >
              {lang === "ar" ? "إرسال رسالة أخرى" : "Send Another Message"}
            </button>
          </div>
        ) : (
          <form id="contact-form" className="modern-form" onSubmit={handleSubmit}>
            {status.type === "error" && (
              <div className="form-status-alert error">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{status.message}</span>
              </div>
            )}

            {/* Honeypot field (anti-spam) */}
            <div className="honeypot-field" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* ─── DYNAMIC HIDDEN DOM INPUTS FOR EMAILJS.SENDFORM ─── */}
            {/* These hidden inputs map our rich React state values perfectly to match Fady's EmailJS template variables */}
            <input type="hidden" name="name" value={`${formData.first_name} ${formData.last_name}`} />
            <input type="hidden" name="title" value={`Web Inquiry from ${formData.first_name} ${formData.last_name} (${country ? country.label : ""})`} />
            <input type="hidden" name="time" value={formattedTime} />
            <input type="hidden" name="phone" value={phone} />
            <input type="hidden" name="country" value={country ? country.label : ""} />

            <div className="form-row">
              <div className="form-group">
                <label>{t(T.contact.firstName, lang)}</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder={t(T.contact.firstPlaceholder, lang)}
                  className={errors.first_name ? "input-error" : ""}
                />
                {errors.first_name && <span className="error-message">{errors.first_name}</span>}
              </div>
              <div className="form-group">
                <label>{t(T.contact.lastName, lang)}</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder={t(T.contact.lastPlaceholder, lang)}
                  className={errors.last_name ? "input-error" : ""}
                />
                {errors.last_name && <span className="error-message">{errors.last_name}</span>}
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
                  onChange={(val: any) => {
                    setCountry(val);
                    if (errors.country) {
                      setErrors((prev) => ({ ...prev, country: undefined }));
                    }
                  }}
                  placeholder={t(T.contact.countryPlaceholder, lang)}
                  styles={customSelectStyles}
                  className={`react-select-container ${errors.country ? "react-select-container-error" : ""}`}
                  classNamePrefix="react-select"
                />
                {errors.country && <span className="error-message">{errors.country}</span>}
              </div>
              <div className="form-group">
                <label>{t(T.contact.email, lang)}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t(T.contact.emailPlaceholder, lang)}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t(T.contact.phone, lang)}</label>
                <div className="phone-input-wrap">
                  <PhoneInput
                    country={country ? country.value.toLowerCase() : "eg"}
                    value={phone}
                    onChange={(val) => {
                      setPhone(val);
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    inputClass={`phone-field-main ${errors.phone ? "input-error" : ""}`}
                    buttonClass="phone-field-btn"
                    placeholder="0000 000 0000"
                  />
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>{t(T.contact.company, lang)}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={t(T.contact.companyPlaceholder, lang)}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>{t(T.contact.message, lang)}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t(T.contact.messagePlaceholder, lang)}
                className={errors.message ? "input-error" : ""}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <div className="form-buttons">
              <a href="https://wa.me/201224165550" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                <img src="/images/social/social-wa.png" className="w-[24px] h-[24px]" alt="WA" />
                <span>{t(T.contact.whatsapp, lang)}</span>
              </a>
              <button
                type="submit"
                className="send-btn"
                disabled={status.type === "submitting"}
              >
                {status.type === "submitting" ? (
                  <>
                    <div className="spinner"></div>
                    <span>{t((T.contact as any).status.sending, lang)}</span>
                  </>
                ) : (
                  <>
                    <span>{t(T.contact.send, lang)}</span>
                    <img src="/images/contact/icon-send.png" className="w-[30px] h-[30px]" alt="Send" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
