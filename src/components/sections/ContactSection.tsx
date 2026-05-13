"use client";
import { useState, useMemo } from "react";
import { company } from "@/data/company";
import Select from "react-select";
import countryList from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function ContactSection() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<any>(null);

  // Prepare country options
  const options = useMemo(() => {
    return countryList.getData().map((c) => ({
      value: c.code,
      label: c.name,
    }));
  }, []);

  // Custom styles for react-select to match the identity
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
    placeholder: (base: any) => ({
      ...base,
      color: "#999",
      fontSize: "14px",
    }),
  };

  return (
    <section id="contact" className="contact-section-new shell">
      <div className="contact-info-card">
        <h2>Ready to Import Premium<br /><strong>Egyptian</strong> Products?</h2>
        <p>Get in touch with Cairo Food International to request product availability, pricing, export details, or partnership opportunities tailored to your market.</p>
        
        <ul className="contact-details-list">
          <li>
            <img src="/images/contact/contact-icon-phone.png" alt="Phone" />
            <span>{company.phone}</span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-office.png" alt="Office" />
            <span>Main Office: {company.address}</span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-factory.png" alt="Factory" />
            <span>Packing House: {company.packingHouse}</span>
          </li>
          <li>
            <img src="/images/contact/contact-icon-mail.png" alt="Mail" />
            <span>{company.email}<br />{company.secondaryEmail}</span>
          </li>
        </ul>
      </div>
      
      <div className="contact-form-area">
        <form className="modern-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="e.g Mohammed" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="e.g Yasser" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <Select 
                options={options} 
                value={country}
                onChange={(val: any) => {
                  setCountry(val);
                }}
                placeholder="Select Country"
                styles={customSelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="e.g abc@gmail.com" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
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
              <label>Company Name</label>
              <input type="text" placeholder="e.g ISEM" />
            </div>
          </div>
          
          <div className="form-group full-width">
            <label>Message</label>
            <textarea placeholder="e.g I ask about ...."></textarea>
          </div>
          
          <div className="form-buttons">
            <button type="button" className="whatsapp-btn">
              <img src="/images/social/social-wa.png"  className="w-[24px] h-[24px]"   alt="WA" />
              <span>WhatsApp</span>
            </button>
            <button type="submit" className="send-btn">
              <span>Send</span>
              <img src="/images/contact/icon-send.png" className="w-[30px] h-[30px]" alt="Send" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
