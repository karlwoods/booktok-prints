"use client";

import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { InfoBanner } from "@/components/InfoBanner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { useEffect, useState, useCallback } from "react";
import { CategoryNav } from "@/components/CategoryNav";
import { siteConfig } from "@/config/site";
import { BadgeCheck, Maximize, Package, Truck, ShoppingBag, Sparkles, Gift, ChevronLeft, ChevronRight } from 'lucide-react';

export function HomeClient({ topSellers, allProducts }: { topSellers: Product[]; allProducts: Product[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for carousel
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 4;
  const totalSlides = Math.ceil(topSellers.length / itemsPerSlide);

  // Auto-scroll carousel
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides, isHovering]);

  // Reset slide when switching between mobile/desktop
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Get all categories from allProducts for navigation
  const categories = Array.from(
    new Set(allProducts.map((product) => product.category))
  ).sort((a, b) => a.localeCompare(b));

  // Count products per category for featured cards
  const categoryCounts: Record<string, number> = {};
  allProducts.forEach((product) => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });
  const featuredCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category)
    .slice(0, 4);

  const featureIcons: Record<string, React.ReactNode> = {
    "BadgeCheck": <BadgeCheck className="w-7 h-7 text-main" />,
    "Maximize": <Maximize className="w-7 h-7 text-main" />,
    "Package": <Package className="w-7 h-7 text-main" />,
    "Truck": <Truck className="w-7 h-7 text-main" />,
  };

  return (
    <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
      <Navbar />
      <InfoBanner />
      <CategoryNav categories={categories} isHomePage={true} />

      {/* Hero Section */}
      <div className="relative w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/homepage-banner.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book-Inspired Wall Art
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Because your walls deserve a plot twist.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-main font-semibold hover:bg-white/90 transition-colors min-w-[200px]">
                Shop Prints
              </Button>
            </Link>
            <Link href="/collections">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 min-w-[200px]">
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links Cards (directly beneath hero) */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/shop?filter=best-sellers" className="group">
            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center group-hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-main/10 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-main" />
              </div>
              <h3 className="font-semibold text-main text-lg mb-1">Best Sellers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Our most-loved prints</p>
            </div>
          </Link>
          <Link href="/collections" className="group">
            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center group-hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-main/10 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6 text-main" />
              </div>
              <h3 className="font-semibold text-main text-lg mb-1">Shop by Vibe</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Browse by collection</p>
            </div>
          </Link>
          <Link href="/shop" className="group">
            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center group-hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-main/10 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-main" />
              </div>
              <h3 className="font-semibold text-main text-lg mb-1">Gifts for Readers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Perfect presents for book lovers</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="w-full bg-gradient-to-b from-main-light to-white dark:from-background dark:to-background">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">
              Best Sellers
            </h2>
          </div>
          <div
            className="relative overflow-hidden w-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Mobile prev/next arrows */}
            {isMobile && totalSlides > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-main" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-main" />
                </button>
              </>
            )}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, pageIndex) => (
                <div key={pageIndex} className={`flex gap-8 min-w-full ${isMobile ? 'justify-center px-8' : 'justify-evenly px-4'}`}>
                  {topSellers.slice(pageIndex * itemsPerSlide, (pageIndex + 1) * itemsPerSlide).map((product: Product) => (
                    <div key={product.id} className={isMobile ? "w-full max-w-[320px]" : "w-[300px]"}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Carousel Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-main w-4' : 'bg-main/30'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Our Prints - Bento Grid */}
      <div className="py-12 mb-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">
              Why Choose Our Prints?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Quality, care, and attention to detail in every order.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-6xl mx-auto">
            {/* Large CTA Card with background image */}
            <div className="relative col-span-1 md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-8 transition-transform duration-300 group hover:scale-[1.02] hover:shadow-2xl min-h-[300px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/why-choose-bg.png')" }}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Shop Our Prints</h2>
                <p className="text-lg text-white/90 mb-6 max-w-sm">
                  Discover book-inspired wall art designed for readers, dreamers, and shelf-decorators.
                </p>
                <Link href="/shop">
                  <Button size="lg" className="bg-white text-main font-semibold hover:bg-main-light transition-colors">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
            {/* Feature cards from siteConfig */}
            {siteConfig.features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center justify-center bg-white dark:bg-card rounded-2xl shadow p-6 group hover:scale-105 hover:shadow-xl transition-transform duration-300 min-w-0">
                <div className="w-12 h-12 rounded-full bg-main/10 flex items-center justify-center mb-3">
                  {featureIcons[feature.icon]}
                </div>
                <span className="font-semibold text-main text-lg mb-1">{feature.title}</span>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Browse Collections */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-main mb-4">
            Browse Collections
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Explore our curated collections of book-inspired prints.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => {
            const slug = category.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={category}
                href={`/collections/${encodeURIComponent(slug)}`}
                className="group"
              >
                <div className="bg-white dark:bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] h-full border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
                  <div className="border-t-4 border-main" />
                  <h3 className="text-xl font-bold text-main px-6 pt-5 pb-3">{category}</h3>
                  <div className="relative w-full h-40 mx-auto px-4">
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-main-light">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/collections/${slug}.jpg`}
                        alt={category}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="px-6 pt-4 pb-5 mt-auto">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {categoryCounts[category]} {categoryCounts[category] === 1 ? 'print' : 'prints'}
                    </p>
                    <span className="inline-block text-main text-sm font-medium group-hover:underline">
                      View Collection &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
