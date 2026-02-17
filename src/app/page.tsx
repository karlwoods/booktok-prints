import { HomeClient } from "./client";
import { fetchProducts, enrichProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await fetchProducts();
  const productsWithRatings = enrichProducts(products);

  const topSellers = productsWithRatings.filter(
    (product) => product.isTopSeller
  );

  return (
    <HomeClient topSellers={topSellers} allProducts={productsWithRatings} />
  );
}
