"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerImages = [
  "/collections-banner-1.jpg",
  "/collections-banner-2.jpg",
  "/collections-banner-3.jpg",
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isHovering, goToNext]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px]">
        {bannerImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Collection banner ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 md:p-3 transition-colors"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 md:p-3 transition-colors"
        aria-label="Next banner"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
