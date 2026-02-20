"use client";

import { Product } from "@/types";
import { generateSlug, getLowestPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasVariations = product.variations && product.variations.length > 0;
  const displayPrice = getLowestPrice(product);
  const { formatPrice } = useCurrency();

  return (
    <Link href={`/prints/${generateSlug(product.title)}`}>
      <div className="group relative h-[420px] overflow-hidden rounded-lg bg-white dark:bg-card p-4 shadow-md transition-all duration-300 hover:shadow-lg animate-fade-in flex flex-col">
        {product.isTopSeller && (
          <div className="absolute top-2 left-2 z-10 px-3 py-1 bg-main text-white text-xs font-medium rounded-full">
            Best Seller
          </div>
        )}
        {product.category && (
          <div className="absolute top-2 right-2 z-10 px-3 py-1 bg-main-light text-main text-xs font-medium rounded-full">
            {product.category}
          </div>
        )}

        <div className="relative w-full h-[240px] mt-6">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col flex-1 mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">{product.title}</h3>

          <div className="mt-auto">
            <div className="mb-3">
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {hasVariations ? `From ${formatPrice(displayPrice)}` : formatPrice(displayPrice)}
              </span>
            </div>

            {hasVariations && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {product.variations!.length} sizes available
              </p>
            )}

            <div
              className="w-full text-center py-2 px-4 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
            >
              View Options
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
