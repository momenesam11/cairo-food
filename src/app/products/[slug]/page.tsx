import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { getProductBySlug, products } from "@/data/products";
import { Icon } from "@/components/ui/Icon";
import type { Metadata } from "next";

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

  const sizeCards = product.defaultPacking.length ? product.defaultPacking.slice(0, 3) : ["15 kg Carton", "8 kg Carton", "5 kg Carton"];
  const diameter = product.sizes.length ? product.sizes.slice(0, 9) : ["81–84", "85–88", "89–92", "93–96", "97–100", "101–104", "105–108", "109–112", "113–116"];
  const packingTypes = product.defaultPacking.length ? product.defaultPacking : ["Telescope carton 15kg.", "Plastic box 15kg, 8kg.", "Open top carton 15kg, 8kg."];

  return (
    <>
      <PageHero active="/products" title={product.name} subtitle={`Premium Egyptian ${product.name.toLowerCase()} prepared for global markets.`} background="/images/hero/products-market.jpg" align="left" />
      <main className="product-details shell">
        <section className="product-overview-card">
          <Image src={product.images.main} alt={product.name} width={620} height={420} />
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="availability"><Icon name="check" /> {product.season.label}</div>
            <div className="product-meta-grid">
              <span><Icon /> <small>Category</small><strong>{product.category}</strong></span>
              <span><Icon /> <small>Origin</small><strong>{product.origin}</strong></span>
              <span><Icon /> <small>Export Type</small><strong>{product.exportType}</strong></span>
            </div>
            <div className="detail-actions"><Link href="#contact">Request a Quote</Link><Link href="https://wa.me/201224165550">WhatsApp</Link></div>
          </div>
        </section>
        <section className="size-section">
          <h2>Size & <strong>Packing Options</strong></h2>
          <div className="size-grid">
            {sizeCards.map((pack, i) => <article key={`${pack}-${i}`}><h3><Icon name="box" /> {pack}</h3><hr /><h4>Average Diameter (mm)</h4><div>{diameter.map((size) => <span key={size}>{size}</span>)}</div></article>)}
          </div>
        </section>
        <section className="packing-types">
          <div className="packing-text"><h2>Packing<br /><strong>Types</strong></h2><ul>{packingTypes.map((item) => <li key={item}><Icon name="check" /> {item}</li>)}</ul></div>
          <div className="packing-gallery">{(product.images.packing?.length ? product.images.packing : ["/images/products/packing-1.jpg", "/images/products/packing-2.jpg", "/images/products/packing-3.jpg"]).slice(0,3).map((src) => <Image key={src} src={src} alt="Packing" width={320} height={320} />)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
