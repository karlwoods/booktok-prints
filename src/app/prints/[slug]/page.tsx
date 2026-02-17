import { fetchProducts, findProductBySlug, enrichProducts, generateSlug } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./client";
import type { Metadata } from "next";

interface PrintPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PrintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await fetchProducts();
  const product = findProductBySlug(products, slug);

  if (!product) {
    return { title: "Print Not Found" };
  }

  return {
    title: product.title,
    description: product.description?.slice(0, 160) || `${product.title} — book-inspired wall art from BookTokPrint.`,
    openGraph: {
      title: product.title,
      images: [product.image],
    },
  };
}

export default async function PrintPage({ params }: PrintPageProps) {
  const { slug } = await params;
  const products = await fetchProducts();
  const product = findProductBySlug(products, slug);

  if (!product) {
    notFound();
  }

  const enriched = enrichProducts(products);
  const enrichedProduct = enriched.find((p) => generateSlug(p.title) === slug)!;
  const relatedProducts = enriched
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={enrichedProduct}
      relatedProducts={relatedProducts}
    />
  );
}
