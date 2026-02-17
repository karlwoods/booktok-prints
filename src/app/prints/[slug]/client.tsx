"use client";

import { ProductWithRatings } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getLowestPrice } from "@/lib/products";

interface ProductDetailClientProps {
  product: ProductWithRatings;
  relatedProducts: ProductWithRatings[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const hasVariations = product.variations && product.variations.length > 0;
  const defaultSize = hasVariations ? product.variations![0].size : undefined;
  const defaultPrice = hasVariations
    ? product.variations![0].price
    : getLowestPrice(product);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    defaultSize
  );
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);
  const [currentHeroImage, setCurrentHeroImage] = useState(product.image);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const additionalImages = product.additionalImages || [];

  const handleImageClick = (clickedImage: string) => {
    if (clickedImage === currentHeroImage) return;
    setCurrentHeroImage(clickedImage);
  };

  const handleSizeSelect = (size: string, price: number) => {
    setSelectedSize(size);
    setCurrentPrice(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, currentPrice);
    }
    const sizeLabel = selectedSize ? ` (${selectedSize})` : "";
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.title}${sizeLabel} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square max-w-md mx-auto rounded-lg overflow-hidden bg-white border-8 border-white">
              <Image
                src={currentHeroImage}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            {(product.image || additionalImages.length > 0) && (
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                <div
                  key="original-main-image-thumbnail"
                  className={`relative aspect-square rounded-lg overflow-hidden bg-white border-4 cursor-pointer transition-colors ${
                    currentHeroImage === product.image
                      ? "border-main"
                      : "border-white hover:border-main"
                  }`}
                  onClick={() => handleImageClick(product.image)}
                >
                  <Image
                    src={product.image}
                    alt={`${product.title} - Main Image`}
                    fill
                    className="object-contain"
                  />
                </div>
                {additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-white border-4 cursor-pointer transition-colors ${
                      currentHeroImage === image
                        ? "border-main"
                        : "border-white hover:border-main"
                    }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 2}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link
                  href={`/collections/${encodeURIComponent(product.category.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="text-sm text-main bg-main-light px-3 py-1 rounded-full hover:bg-main/10 transition-colors"
                >
                  {product.category}
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-main mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviewCount} reviews
                </span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                £{currentPrice.toFixed(2)}
              </p>
            </div>

            {/* Size Selector */}
            {hasVariations && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Select Size
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variations!.map((variation) => (
                    <button
                      key={variation.size}
                      onClick={() =>
                        handleSizeSelect(variation.size, variation.price)
                      }
                      className={`px-3 py-2 rounded-md text-sm border transition-colors text-left ${
                        selectedSize === variation.size
                          ? "border-main bg-main text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-main"
                      }`}
                    >
                      <span className="block font-medium">{variation.size}</span>
                      <span className="block text-xs mt-0.5 opacity-80">
                        £{variation.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.description && (
              <div className="prose max-w-none">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-h-[400px] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-main mb-4">
                    About This Print
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    {product.description.split("\n").map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-gray-700">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-md px-3 py-2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                size="lg"
                className="bg-main text-white hover:bg-main/90 w-full"
                onClick={handleAddToCart}
              >
                Add to Cart — £{(currentPrice * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-main mb-8">
              More from this collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
