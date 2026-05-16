import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";

const categories = [
  { title: "Fresh Produce", icon: "/images/icons/icon-fresh.svg" },
  { title: "Frozen Produce", icon: "/images/icons/icon-frozen.svg" },
  { title: "Agri Crops", icon: "/images/icons/icon-crops.svg" }
];

export function ProductCategories() {
  return (
    <section className="shell categories-section">
      <div className="category-title-wrap">
        <h2>Product <strong>Categories</strong></h2>
      </div>
      <p>High-quality produce and food supplies, carefully sourced and prepared to meet the needs of global buyers.</p>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <article key={index} className={`category-card ${index === 1 ? 'navy' : ''}`}>
            <div className="category-icon-box">
              <img src={cat.icon} alt={cat.title} />
            </div>
            <div className="category-content">
              <h3>{cat.title}</h3>
              <p>Farm-Fresh Fruits And Vegetables Handpicked At Peak Ripeness For Maximum Quality And Flavor.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
