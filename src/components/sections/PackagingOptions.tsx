import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export function PackagingOptions() {
  const items = [
    "Various sizes and materials available",
    "Custom labeling and branding",
    "Palletized and container-ready",
    "Meet international import standards"
  ];
  
  return (
    <section className="packaging-section">
      <div className="shell packaging-grid">
        <article className="packaging-main">
          <div className="packaging-info">
            <h2>Packaging & <strong>Supply Options</strong></h2>
            <p>We offer flexible packaging solutions tailored to your market requirements. All packaging materials are food-safe, durable, and designed to maintain product freshness during transit.</p>
            <ul className="packaging-list">
              {items.map(item => (
                <li key={item}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img src="/images/products/packaging-crates.png" alt="Packaging crates" className="packaging-image" />
        </article>
        
        <div className="packing-side">
          {[
            { title: "Boxes", desc: "We Used Plastic And Carton Boxes For Package", icon: "/images/icons/icon-box.svg" },
            { title: "Bags", desc: "Mesh, PP Suitable For Vegetables And Bulk Supplies.", icon: "/images/icons/icon-bag.svg" },
            { title: "Custom Packaging", desc: "Branded And Tailored Packaging Solutions To Match Your Market Needs.", icon: "/images/icons/icon-custom.svg" }
          ].map((item) => (
            <article key={item.title} className="packing-card">
              <div className="packing-icon-box">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="packing-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
