import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";

const categories = [
  { title: "Fresh Produce", icon: "leaf" },
  { title: "Fresh Produce", icon: "shield" },
  { title: "Fresh Produce", icon: "box" }
];

export function ProductCategories() {
  return (
    <section className="shell categories-section">
      <SectionTitle title="Product Categories" center />
      <p>High-quality produce and food supplies, carefully sourced and prepared to meet the needs of global buyers.</p>
      <div className="category-grid">
        {categories.map((cat, index) => <article key={index}><span><Icon name={cat.icon} /></span><div><h3>{cat.title}</h3><p>Farm-Fresh Fruits And Vegetables Handpicked At Peak Ripeness For Maximum Quality And Flavor.</p></div></article>)}
      </div>
    </section>
  );
}
