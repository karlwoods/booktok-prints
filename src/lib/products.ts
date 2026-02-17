import { Product, ProductWithRatings } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_PRODUCT_API_URL ||
  "https://msm.slash48.net/api/internal/v2/store/booktok/product-list";

/**
 * Fetch the full product list from the product API.
 * Uses ISR with 60s revalidation by default.
 */
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return (await response.json()) as Product[];
}

/**
 * Simple seeded hash from a string — produces a deterministic number.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Seeded pseudo-random number from a product ID — deterministic per product.
 */
function seededRandom(productId: string, salt: number = 0): number {
  const hash = hashString(productId + salt.toString());
  return (hash % 1000) / 1000;
}

/**
 * Generate a deterministic rating for a product based on its ID.
 */
export function generateRating(productId: string): number {
  const random = seededRandom(productId, 1);
  if (random < 0.4) return 5;
  if (random < 0.6) return 4.5;
  if (random < 0.8) return 4;
  return 4.5;
}

/**
 * Generate a deterministic review count for a product based on its ID.
 */
export function generateReviewCount(productId: string): number {
  const hash = hashString(productId + "reviews");
  return (hash % 101) + 10; // Between 10 and 110
}

/**
 * Enrich products with deterministic ratings and review counts.
 */
export function enrichProducts(products: Product[]): ProductWithRatings[] {
  return products.map((product) => ({
    ...product,
    rating: generateRating(product.id),
    reviewCount: generateReviewCount(product.id),
  }));
}

/**
 * Generate a URL-safe slug from a product title.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Find a product by its slug within a product list.
 */
export function findProductBySlug(
  products: Product[],
  slug: string
): Product | undefined {
  return products.find((p) => generateSlug(p.title) === slug);
}

/**
 * Get the lowest price from a product's variations.
 */
export function getLowestPrice(product: Product): number {
  if (product.variations && product.variations.length > 0) {
    return Math.min(...product.variations.map((v) => v.price));
  }
  return product.price;
}
