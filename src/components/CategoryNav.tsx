"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryNavProps {
  categories: string[];
  isHomePage?: boolean;
}

export function CategoryNav({ categories, isHomePage = false }: CategoryNavProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const category = searchParams.get("collection");
    if (category) {
      setSelectedCategory(decodeURIComponent(category));
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string | null) => {
    if (isHomePage) {
      router.push(`/shop?collection=${encodeURIComponent(category || "")}`);
      return;
    }

    if (selectedCategory === category) {
      setSelectedCategory(null);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("collection");
      router.push(`/shop?${params.toString()}`);
      return;
    }

    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("collection", category);
    } else {
      params.delete("collection");
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 overflow-x-auto">
          <Button
            key="best-sellers"
            variant={selectedCategory === "best-sellers" ? "default" : "ghost"}
            onClick={() => handleCategoryChange("best-sellers")}
            className={`mr-0 ${
              selectedCategory === "best-sellers"
                ? "bg-main text-white hover:bg-main/90"
                : "hover:bg-main/5"
            }`}
          >
            Best Sellers
          </Button>
          {categories.length > 0 && (
            <span className="mx-3 h-6 w-px bg-main inline-block align-middle" aria-hidden="true"></span>
          )}
          {categories.map((category, idx) => (
            <span key={category}>
              <Button
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => handleCategoryChange(category)}
                className={`mr-0 ${
                  selectedCategory === category
                    ? "bg-main text-white hover:bg-main/90"
                    : "hover:bg-main/5"
                }`}
              >
                {category}
              </Button>
              {idx < categories.length - 1 && (
                <span className="mx-3 h-6 w-px bg-main inline-block align-middle" aria-hidden="true"></span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
