"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { InfoBanner } from "@/components/InfoBanner";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { CategoryNav } from "@/components/CategoryNav";
import { SortOptions } from "@/components/SortOptions";

type SortOption = "price-low" | "price-high" | "name" | "top-sellers" | "newest";

export function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  useEffect(() => {
    const collection = searchParams.get("collection");
    const filter = searchParams.get("filter");
    const sort = searchParams.get("sort") as SortOption;

    if (filter === "best-sellers") {
      setSelectedCollection("best-sellers");
    } else if (collection) {
      setSelectedCollection(decodeURIComponent(collection));
    } else {
      setSelectedCollection(null);
    }

    if (sort) {
      setSortOption(sort);
    }
  }, [searchParams]);

  const categories = Array.from(
    new Set(products.map((product) => product.category.trim()))
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const filteredProducts = products.filter((product) => {
    if (selectedCollection === 'best-sellers') return product.isTopSeller;
    if (!selectedCollection) return true;
    return product.category.trim() === selectedCollection;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "name":
        return a.title.localeCompare(b.title);
      case "top-sellers":
        return (b.isTopSeller ? 1 : 0) - (a.isTopSeller ? 1 : 0);
      case "newest":
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <InfoBanner />
      <CategoryNav categories={categories} />

      <div className="container mx-auto px-2 py-12 flex-1">
        <div className="relative flex items-center justify-between mb-8 min-h-[48px]">
          <h1 className="text-3xl font-bold text-main m-0">
            {selectedCollection === 'best-sellers'
              ? 'Best Sellers'
              : selectedCollection || 'All Prints'}
          </h1>
          <div className="ml-auto">
            <SortOptions />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
