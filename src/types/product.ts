export type ProductCategory = "Fruits" | "Vegetables" | "Fresh Produce";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  origin: string;
  exportType: string;
  season: {
    start: string;
    end: string;
    label: string;
  };
  images: {
    card: string;
    main: string;
    packing?: string[];
  };
  shortDescription: string;
  description: string;
  defaultPacking: string[];
  sizes: string[];
  variants: string[];
  featured?: boolean;
};
