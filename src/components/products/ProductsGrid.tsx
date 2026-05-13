"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductsGrid({ limit }: { limit?: number }) {
  const [activeTab, setActiveTab] = useState("All");
  
  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  const list = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <section className="products-section shell">
      <div className="products-layout">
        <div className="products-header">
          <div className="section-title">
            <span>Available</span>
            <h2>Products</h2>
          </div>
          
          <div className="tabs">
            {["All", "Fruits", "Vegetables"].map((tab) => (
              <button 
                key={tab}
                className={activeTab === tab ? "active" : ""} 
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="updated">Last Updated At March, 2026</p>
        </div>

        <div className="product-grid">
          {list.map((product, index) => (
            <ProductCard key={`${product.slug}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
