import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { PackagingOptions } from "@/components/sections/PackagingOptions";

export default function ProductsPage() {
  return (
    <>
      <PageHero heroKey="products" active="/products" title="Our Products" highlighted="Products" subtitle="Premium Egyptian fruits, vegetables, and food supply solutions for global markets." background="/images/hero/products-market.jpg" actions />
      <ProductCategories />
      <ProductsGrid />
      <ProcessPreview horizontal />
      <PackagingOptions />
      <Footer />
    </>
  );
}
