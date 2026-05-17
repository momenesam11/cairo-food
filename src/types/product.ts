export type ProductCategory = "Fruits" | "Vegetables" | "Fresh Produce";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  category: ProductCategory;
  categoryAr?: string;
  origin: string;
  originAr?: string;
  exportType: string;
  exportTypeAr?: string;
  season: {
    start: string;
    end: string;
    label: string;
    labelAr?: string;
  };
  images: {
    card: string;
    main: string;
    packing?: string[];
  };
  shortDescription: string;
  shortDescriptionAr?: string;
  description: string;
  descriptionAr?: string;
  defaultPacking: string[];
  defaultPackingAr?: string[];
  sizes: string[];
  sizesAr?: string[];
  variants: string[];
  variantsAr?: string[];
  featured?: boolean;
};
