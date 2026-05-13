import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/images/brand/logo-footer.png" alt="Cairo Food" width={260} height={92} priority />
        </div>
        
        <div className="footer-col hide-mobile">
          <h4>Company</h4>
          <div className="footer-links">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
        </div>
        
        <div className="footer-col hide-mobile">
          <h4>Legal</h4>
          <div className="footer-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Services</Link>
          </div>
        </div>
        
        <div className="footer-col hide-mobile">
          <h4>Reach us</h4>
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
              <span>{company.address}</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="shell">
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>© 2026 Cairo Food. Proudly powered by Momen Esam</p>
        </div>
      </div>
    </footer>
  );
}
