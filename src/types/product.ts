export interface ProductFlavor {
  name: string;
  color: string;
}

export interface ProductStock {
  size: number;
  price: number;
  sale_price: number;
  stock: number;
}

export interface ProductReview {
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
}

export interface ProductBenefit {
  description?: string;
  text?: string;
}

export interface ProductNutrition {
  serving_size_description: string;
  serving_size: number;
  amount: Record<string, string | number>;
  ingredients: string;
}

export interface ProductMedia {
  storage_path: string;
  // TODO: verify media types
  type: "image" | "video" | "model";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  how_to_use: string;
  product_flavors: ProductFlavor[];
  product_stock: ProductStock[];
  product_reviews: ProductReview[];
  product_benefits: ProductBenefit[];
  product_nutrition: ProductNutrition[];
  product_media: ProductMedia[];
  glbUrl: string;
}

