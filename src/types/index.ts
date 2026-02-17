export interface ProductVariation {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  isTopSeller?: boolean;
  description?: string;
  additionalImages?: string[];
  rating?: number;
  reviewCount?: number;
  variations?: ProductVariation[];
}

export interface ProductWithRatings extends Product {
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}
