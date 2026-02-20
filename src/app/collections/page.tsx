import { fetchProducts } from "@/lib/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
};

export default async function CollectionsPage() {
  const products = await fetchProducts();

  const categoryCounts: Record<string, number> = {};
  products.forEach((product) => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });

  const collections = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({ name: category, count }));

  return (
    <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
      <Navbar />
      <HeroCarousel />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-main mb-4">Browse Collections</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collections of book-inspired wall art, organised by theme and style.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={`/collections/${encodeURIComponent(collection.name.toLowerCase().replace(/\s+/g, '-'))}`}
              className="group"
            >
              <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] h-full">
                <h2 className="text-xl font-bold text-main mb-2">{collection.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{collection.count} {collection.count === 1 ? 'print' : 'prints'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
