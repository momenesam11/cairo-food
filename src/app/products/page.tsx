import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { PackagingOptions } from "@/components/sections/PackagingOptions";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Browse Cairo Food International's range of premium Egyptian fresh and frozen fruits, vegetables, and agricultural products for export.",
  alternates: { canonical: "/products" },
  openGraph: { url: "/products", title: "Products | Cairo Food International" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero heroKey="products" active="/products" background="/images/hero/products-market.jpg" actions />
      <ProductCategories />
      <ProductsGrid />
      <ProcessPreview horizontal />
      <PackagingOptions />
      <Footer />
    </>
  );
}
