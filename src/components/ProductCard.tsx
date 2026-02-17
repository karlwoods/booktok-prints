"use client";

import { Product } from "@/types";
import { generateSlug, getLowestPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasVariations = product.variations && product.variations.length > 0;
  const displayPrice = getLowestPrice(product);

  return (
    <Link href={`/prints/${generateSlug(product.title)}`}>
      <div className="group relative h-[420px] overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg animate-fade-in flex flex-col">
        {product.isTopSeller && (
          <div className="absolute top-2 left-2 z-10 px-3 py-1 bg-main text-white text-sm font-medium rounded-full">
            Best Seller
          </div>
        )}
        {product.category && (
          <div className="absolute top-2 right-2 z-10 px-2 py-0.5 bg-main-light text-main text-xs font-medium rounded-full">
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
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{product.title}</h3>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-medium text-gray-900">
                {hasVariations ? `From £${displayPrice.toFixed(2)}` : `£${displayPrice.toFixed(2)}`}
              </span>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const rating = product.rating || 4;
                    const isHalfStar = rating % 1 !== 0 && Math.floor(rating) === i;
                    return (
                      <div key={i} className="relative w-4 h-4">
                        <svg
                          className={`w-4 h-4 text-gray-300`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {i < Math.floor(rating) && (
                          <svg
                            className={`absolute top-0 left-0 w-4 h-4 text-yellow-400`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                        {isHalfStar && (
                          <svg
                            className={`absolute top-0 left-0 w-4 h-4 text-yellow-400`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <defs>
                              <linearGradient id="halfStar" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="url(#halfStar)"
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
                <span className="text-xs text-gray-500">
                  {product.reviewCount || product.title.length} reviews
                </span>
              </div>
            </div>

            {hasVariations && (
              <p className="text-sm text-gray-500 mb-2">
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
