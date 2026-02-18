"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function InfoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % siteConfig.announcements.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-main text-white text-sm overflow-hidden">
      <div className="container mx-auto px-4 py-2.5 md:py-1.5">
        <div className="flex items-center justify-center relative h-6">
          {siteConfig.announcements.map((text, index) => (
            <div
              key={index}
              className={`absolute w-full text-center transition-all duration-500 transform ${
                index === currentIndex
                  ? "translate-y-0 opacity-100"
                  : index < currentIndex
                  ? "-translate-y-8 opacity-0"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <span className="font-medium tracking-wide">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
