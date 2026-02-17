import { fetchProducts, enrichProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import type { Metadata } from "next";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

function slugToCategory(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ');
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slugToCategory(slug);
  return {
    title: `${categoryName} Collection`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const categorySlug = slugToCategory(slug);
  const products = await fetchProducts();

  const matchedProducts = products.filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase()
  );

  if (matchedProducts.length === 0) {
    notFound();
  }

  const enriched = enrichProducts(matchedProducts);
  const collectionName = matchedProducts[0].category;

  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-main mb-4">{collectionName}</h1>
          <p className="text-lg text-gray-600">
            {enriched.length} {enriched.length === 1 ? 'print' : 'prints'} in this collection
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enriched.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
