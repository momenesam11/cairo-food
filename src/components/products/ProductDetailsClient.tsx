"use client";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { isSeasonAvailable } from "@/data/products";
import { PackingGallery } from "@/components/products/PackingGallery";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";
import type { Product } from "@/types/product";

export function ProductDetailsClient({ product }: { product: Product }) {
  const { lang } = useLang();
  const isAvailable = isSeasonAvailable(product.season.start, product.season.end);

  const packingOptions = lang === 'ar'
    ? (product.defaultPackingAr?.length ? product.defaultPackingAr : product.defaultPacking)
    : product.defaultPacking;

  const availableSizes = lang === 'ar'
    ? (product.sizesAr?.length ? product.sizesAr : product.sizes)
    : product.sizes;
    
  const seasonInfo = lang === 'ar'
    ? product.season.labelAr ?? product.season.label
    : product.season.label;

  const packingTypes = packingOptions.length
    ? packingOptions
    : [lang === 'ar' ? 'حسب طلب العميل' : 'As per client request'];

  const title = lang === 'ar' ? product.nameAr ?? product.name : product.name;
  const description = lang === 'ar' ? product.descriptionAr ?? product.description : product.description;
  const productNameForSubtitle = lang === 'ar' ? product.nameAr ?? product.name : product.name;

  const categoryLabel = lang === 'ar'
    ? product.categoryAr ?? (product.category === 'Fruits' ? 'فواكه طازجة' : product.category === 'Vegetables' ? 'خضروات طازجة' : 'منتجات طازجة')
    : product.category;
  const exportTypeLabel = lang === 'ar'
    ? product.exportTypeAr ?? (product.exportType === 'Fresh Produce' ? 'منتجات طازجة' : product.exportType)
    : product.exportType;
  const originLabel = lang === 'ar'
    ? product.originAr ?? (product.origin === 'Egypt' ? 'مصر' : product.origin)
    : product.origin;

  const subtitle = lang === 'ar'
    ? `منتجات ${productNameForSubtitle} مصرية فاخرة مُعدَّة للأسواق العالمية.`
    : `Premium Egyptian ${product.name.toLowerCase()} prepared for global markets.`;

  return (
    <>
      <PageHero 
        heroKey="products" 
        title={title} 
        subtitle={subtitle} 
        background="/images/hero/products-market.jpg" 
        align="left" 
      />
      <main className="product-details shell">
        <section className="product-overview-card">
          <div className="product-details-image-wrapper relative h-[420px] w-full overflow-hidden rounded-[20px] bg-[#fafafa]">
            <Image 
              src={product.images.main} 
              alt={product.name} 
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="product-details-content">
            <h1 className="product-details-title">{title}</h1>
            <p className="product-details-desc">{description}</p>
            
            <div className={`availability-strip ${isAvailable ? "available" : "unavailable"}`}>
              <div className="availability-icon">
                {isAvailable ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <span className="availability-text">
                {isAvailable 
                  ? (lang === 'ar' ? `متاح الآن (${seasonInfo})` : `Available now (${seasonInfo})`)
                  : (lang === 'ar' ? `خارج الموسم حالياً (سيكون متاحاً في ${product.season.start})` : `Currently out of season (will be available in ${product.season.start})`)}
              </span>
            </div>

            <div className="product-specs-grid">
              <div className="spec-card-item">
                <div className="spec-icon-box" title="Category Icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div className="spec-info-text">
                  <small>{t(T.products.category, lang)}</small>
                  <strong>{categoryLabel}</strong>
                </div>
              </div>

              <div className="spec-card-item">
                <div className="spec-icon-box" title="Origin Icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="spec-info-text">
                  <small>{t(T.products.origin, lang)}</small>
                  <strong>{originLabel}</strong>
                </div>
              </div>

              <div className="spec-card-item">
                <div className="spec-icon-box" title="Export Type Icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="spec-info-text">
                  <small>{lang === 'ar' ? 'نوع التصدير' : 'Export Type'}</small>
                  <strong>{exportTypeLabel}</strong>
                </div>
              </div>
            </div>

            <div className="product-actions-box">
              <Link href="#contact" className="action-quote-btn">{t(T.products.quoteBtn, lang)}</Link>
              <Link href="https://wa.me/201224165550" className="action-whatsapp-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: lang === 'en' ? '8px' : '0', marginLeft: lang === 'ar' ? '8px' : '0', flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.56 0 11.9-5.335 11.903-11.893a11.821 11.821 0 00-3.48-8.413z" />
127:                 </svg>
                {t(T.products.whatsappBtn, lang)}
              </Link>
            </div>
          </div>
        </section>
        
        <section className="size-section">
          <h2>
            {lang === 'ar' ? "خيارات الحجم و" : "Size &"} <strong>{lang === 'ar' ? "التعبئة" : "Packing Options"}</strong>
          </h2>

          <div className="size-grid">
            <article>
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
                {lang === 'ar' ? 'خيارات التعبئة' : 'Packing Options'}
              </h3>
              <hr />
              <div className="size-card-body">
                <h4>{lang === 'ar' ? 'التعبئة المتاحة' : 'Available Packing'}</h4>
                <div className="size-tags">
                  {packingOptions.map((pack) => (
                    <span key={pack}>{pack}</span>
                  ))}
                </div>
              </div>
            </article>

            <article>
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
                {lang === 'ar' ? 'الأحجام المتاحة' : 'Available Sizes'}
              </h3>
              <hr />
              <div className="size-card-body">
                <h4>{lang === 'ar' ? 'الأحجام / القطر' : 'Sizes / Diameter'}</h4>
                <div className="size-tags">
                  {availableSizes.map((size) => (
                    <span key={size}>{size}</span>
                  ))}
                </div>
              </div>
            </article>

            <article className={`availability-card ${isAvailable ? 'card-in-season' : 'card-out-of-season'}`}>
              {isAvailable ? (
                <svg className="bg-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="bg-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
                {lang === 'ar' ? 'توافر الموسم' : 'Season Availability'}
              </h3>
              <hr />
              <div className="size-card-body relative-body">
                <div className="availability-status">
                  <div className="status-indicator"></div>
                  <span style={{ fontWeight: 700, color: 'white' }}>{isAvailable ? (lang === 'ar' ? 'في الموسم حالياً' : 'Currently in Season') : (lang === 'ar' ? 'خارج الموسم' : 'Out of Season')}</span>
                </div>
                <div className="season-months">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>{seasonInfo}</span>
                </div>
              </div>
            </article>
          </div>
        </section>
        
        {/* Product Details Packing Gallery - SCOPED STYLES ONLY */}
        {/* wrapperClassName="product-details-gallery-item" ensures this gallery gets its own CSS variables */}
        {/* --product-details-gallery-height (360px desktop) applies ONLY to elements with .product-details-gallery-item class */}
        {/* This prevents any impact on About Us or other shared gallery uses */}
        <section className="packing-types">
          <div className="packing-text">
            <h2>{lang === 'ar' ? 'أنواع' : 'Packing'}<br /><strong>{lang === 'ar' ? 'التعبئة' : 'Types'}</strong></h2>
            <ul>
              {packingTypes.map((item) => (
                <li key={item}>
                  <svg className="check-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <PackingGallery
            images={product.images.packing?.length ? product.images.packing : ["/images/products/packing-1.jpg", "/images/products/packing-2.jpg", "/images/products/packing-3.jpg"]}
            wrapperHeight="360px"
            wrapperClassName="product-details-gallery-item h-60 sm:h-auto"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
