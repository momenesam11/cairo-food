import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import type { Metadata } from "next";
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} | Cairo Food` : "Product Not Found" };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailsClient product={product} />;
}
