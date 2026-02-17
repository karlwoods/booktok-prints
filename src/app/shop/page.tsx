import { ShopClient } from "./client";
import { fetchProducts, enrichProducts } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Prints",
};

export default async function ShopPage() {
  const products = await fetchProducts();
  const productsWithRatings = enrichProducts(products);

  return <ShopClient products={productsWithRatings} />;
}
