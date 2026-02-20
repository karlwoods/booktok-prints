"use client";

import { ProductWithRatings } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getLowestPrice } from "@/lib/products";
import { ChevronDown, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ProductDetailClientProps {
  product: ProductWithRatings;
  relatedProducts: ProductWithRatings[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const hasVariations = product.variations && product.variations.length > 0;
  const defaultSize = hasVariations ? product.variations![0].name : undefined;
  const defaultPrice = hasVariations
    ? product.variations![0].price
    : getLowestPrice(product);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    defaultSize
  );
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);
  const [currentHeroImage, setCurrentHeroImage] = useState(product.image);
  const [sizeAccordionOpen, setSizeAccordionOpen] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const additionalImages = product.additionalImages || [];
  const allImages = [product.image, ...additionalImages];
  const currentImageIndex = allImages.indexOf(currentHeroImage);

  const goToPrevImage = useCallback(() => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentHeroImage(allImages[prevIndex]);
  }, [currentImageIndex, allImages]);

  const goToNextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentHeroImage(allImages[nextIndex]);
  }, [currentImageIndex, allImages]);

  const openLightbox = () => {
    setLightboxIndex(currentImageIndex >= 0 ? currentImageIndex : 0);
    setLightboxOpen(true);
  };

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  const handleImageClick = (clickedImage: string) => {
    if (clickedImage === currentHeroImage) return;
    setCurrentHeroImage(clickedImage);
  };

  const handleSizeSelect = (size: string, price: number) => {
    setSelectedSize(size);
    setCurrentPrice(price);
    setSizeAccordionOpen(false);
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

  // Truncate description for preview (~60 words)
  const getDescriptionPreview = (text: string) => {
    const words = text.split(/\s+/);
    if (words.length <= 60) return null; // No need to truncate
    return words.slice(0, 60).join(" ") + "…";
  };

  const fullDescription = product.description || "";
  const descriptionPreview = getDescriptionPreview(fullDescription);
  const needsTruncation = descriptionPreview !== null;

  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-square max-w-md mx-auto rounded-lg overflow-hidden bg-white border-8 border-white group cursor-zoom-in"
              onClick={openLightbox}
            >
              <Image
                src={currentHeroImage}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
              {/* Zoom indicator on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-70 transition-opacity drop-shadow-lg" />
              </div>
              {/* Left/Right arrows on main image */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
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
                  className="inline-block text-sm text-main bg-main-light px-3 py-1 rounded-full hover:bg-main hover:text-white transition-colors font-medium"
                >
                  {product.category}
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-main mb-2">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-gray-900">
                £{currentPrice.toFixed(2)}
              </p>
            </div>

            {/* Size Selector - Accordion Dropdown */}
            {hasVariations && (
              <div>
                <button
                  onClick={() => setSizeAccordionOpen(!sizeAccordionOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-white text-left hover:border-main transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {selectedSize
                      ? `${selectedSize} — £${currentPrice.toFixed(2)}`
                      : "Select size"}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${sizeAccordionOpen ? "rotate-180" : ""}`} />
                </button>
                {sizeAccordionOpen && (
                  <div className="mt-1 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                    {product.variations!.map((variation) => (
                      <button
                        key={variation.name}
                        onClick={() =>
                          handleSizeSelect(variation.name, variation.price)
                        }
                        className={`w-full px-4 py-3 text-sm text-left border-b last:border-b-0 transition-colors ${
                          selectedSize === variation.name
                            ? "bg-main text-white"
                            : "text-gray-700 hover:bg-main-light"
                        }`}
                      >
                        <span className="flex items-center justify-between w-full">
                          <span>{variation.name}</span>
                          <span>£{variation.price.toFixed(2)}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {fullDescription && (
              <div className="prose max-w-none">
                <div className="bg-white px-6 py-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-main mb-4">
                    About This Print
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    {(needsTruncation && !descriptionExpanded
                      ? descriptionPreview!
                      : fullDescription
                    ).split("\n").filter(p => p.trim()).map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {needsTruncation && (
                    <button
                      onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                      className="mt-3 text-main font-medium text-sm hover:underline"
                    >
                      {descriptionExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          {allImages.length > 1 && (
            <>
              <button
                onClick={lightboxPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={lightboxNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <div className="relative w-[90vw] h-[85vh] max-w-4xl">
            <Image
              src={allImages[lightboxIndex]}
              alt={`${product.title} - Image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          {/* Lightbox dots */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    lightboxIndex === index ? "bg-white w-5" : "bg-white/40"
                  }`}
                  onClick={() => setLightboxIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
