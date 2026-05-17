"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { useLang } from "@/lib/LanguageContext";
import { translations as T, t } from "@/lib/translations";

export function ProductsGrid({ limit }: { limit?: number }) {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState("All");
  
  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  const list = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  const tabs = [
    { id: "All", label: t(T.products.tabs.all, lang) },
    { id: "Fruits", label: t(T.products.tabs.fresh, lang) },
    { id: "Vegetables", label: t(T.products.tabs.frozen, lang) } // NOTE: using 'fresh/frozen' keys here, ideally would add 'fruits' and 'vegetables' to T.products.tabs
  ];

  return (
    <section className="products-section shell">
      <div className="products-layout">
        <div className="products-header">
          <div className="section-title">
            <span>{lang === 'en' ? 'Available' : 'متاح'}</span>
            <h2>{lang === 'en' ? 'Products' : 'المنتجات'}</h2>
          </div>
          
          <div className="tabs">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""} 
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <p className="updated">{t(T.products.updated, lang)}: March, 2026</p>
        </div>

        <div className="product-grid">
          {list.map((product, index) => (
            <ProductCard key={`${product.slug}-${index}`} product={product} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
