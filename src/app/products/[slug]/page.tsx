import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { getProductBySlug, products, isSeasonAvailable } from "@/data/products";
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

  const isAvailable = isSeasonAvailable(product.season.start, product.season.end);

  const sizeCards = product.defaultPacking.length ? product.defaultPacking.slice(0, 3) : ["15 kg Carton", "8 kg Carton", "5 kg Carton"];
  const diameter = product.sizes.length ? product.sizes.slice(0, 9) : ["81–84", "85–88", "89–92", "93–96", "97–100", "101–104", "105–108", "109–112", "113–116"];
  const packingTypes = product.defaultPacking.length ? product.defaultPacking : ["Telescope carton 15kg.", "Plastic box 15kg, 8kg.", "Open top carton 15kg, 8kg."];

  return (
    <>
      <PageHero active="/products" title={product.name} subtitle={`Premium Egyptian ${product.name.toLowerCase()} prepared for global markets.`} background="/images/hero/products-market.jpg" align="left" />
      <main className="product-details shell">
        <section className="product-overview-card">
          <div className="product-details-image-wrapper">
            <Image 
              src={product.images.main} 
              alt={product.name} 
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="product-details-content">
            <h1 className="product-details-title">{product.name}</h1>
            <p className="product-details-desc">{product.description}</p>
            
            {/* Availability Strip */}
            <div className={`availability-strip ${isAvailable ? "available" : "unavailable"}`}>
              <div className="availability-icon">
                {isAvailable ? (
                  // Green check circle SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                ) : (
                  // Red cross circle SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <span className="availability-text">
                {isAvailable 
                  ? `Available now (${product.season.label})` 
                  : `Currently out of season (will be available in ${product.season.start})`}
              </span>
            </div>

            {/* Spec Columns */}
            <div className="product-specs-grid">
              <div className="spec-card-item">
                <div className="spec-icon-box" title="Category Icon (Grid Layout)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div className="spec-info-text">
                  <small>Category</small>
                  <strong>{product.category === "Fruits" ? "Fresh Fruit" : product.category === "Vegetables" ? "Fresh Vegetables" : product.category}</strong>
                </div>
              </div>

              <div className="spec-card-item">
                <div className="spec-icon-box" title="Origin Icon (Map Pin)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="spec-info-text">
                  <small>Origin</small>
                  <strong>{product.origin}</strong>
                </div>
              </div>

              <div className="spec-card-item">
                <div className="spec-icon-box" title="Export Type Icon (Shipping Truck)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="spec-info-text">
                  <small>Export Type</small>
                  <strong>{product.exportType}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions-box">
              <Link href="#contact" className="action-quote-btn">Request a Quote</Link>
              <Link href="https://wa.me/201224165550" className="action-whatsapp-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.56 0 11.9-5.335 11.903-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </Link>
            </div>
          </div>
        </section>
        <section className="size-section">
          <h2>Size & <strong>Packing Options</strong></h2>
          <div className="size-grid">
            {sizeCards.map((pack, i) => (
              <article key={`${pack}-${i}`}>
                <h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                  {pack}
                </h3>
                <hr />
                <div className="size-card-body">
                  <h4>Average Diameter (mm)</h4>
                  <div className="size-tags">
                    {diameter.map((size) => <span key={size}>{size}</span>)}
                  </div>
                </div>
              </article>
            ))}
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
