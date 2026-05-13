import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export function PackagingOptions() {
  const items = ["Various sizes and materials available", "Custom labeling and branding", "Palletized and container-ready", "Meet international import standards"];
  return (
    <section className="packaging-section">
      <div className="shell packaging-grid">
        <article className="packaging-main">
          <div><h2>Packaging & <strong>Supply Options</strong></h2><p>We offer flexible packaging solutions tailored to your market requirements. All packaging materials are food-safe, durable, and designed to maintain product freshness during transit.</p><ul>{items.map(item => <li key={item}><Icon name="check" />{item}</li>)}</ul></div>
          <Image src="/images/products/packaging-crates.jpg" alt="Packaging crates" width={420} height={280} />
        </article>
        <div className="packing-side">
          {[
            ["Boxes", "We Used Plastic And Carton Boxes For Package"],
            ["Bags", "Mesh, PP Suitable For Vegetables And Bulk Supplies."],
            ["Custom Packaging", "Branded And Tailored Packaging Solutions To Match Your Market Needs."]
          ].map((item, i) => <article key={item[0]}><span><Icon name={i === 0 ? "box" : i === 1 ? "shield" : "check"} /></span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}
