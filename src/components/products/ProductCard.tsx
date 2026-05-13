import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <Image src={product.images.card} alt={product.name} width={520} height={360} />
      </div>
      <div className="product-card-body">
        <div className="product-card-head">
          <h3 className="">{product.name}</h3>
          <span className="category-tag">{product.category}</span>
        </div>
        <p>{product.shortDescription}</p>
        <Link href={`/products/${product.slug}`} className="view-details-btn">
          View Details 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white"/>
            <path d="M10.5 15.5L14 12L10.5 8.5" stroke="#72ad00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}
