"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_PRODUCT_API_URL ||
  "https://msm.slash48.net/api/internal/v2/store/booktok/product-list";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  categoryResults: string[];
  isSearching: boolean;
  performSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categoryResults, setCategoryResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setCategoryResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = (await response.json()) as Product[];

      // Get unique categories
      const allCategories = Array.from(new Set(products.map(p => p.category)));

      // Filter categories that match the search query
      const matchingCategories = allCategories.filter(category =>
        category.toLowerCase().includes(query.toLowerCase())
      );
      setCategoryResults(matchingCategories);

      // Filter products that match the search query
      const matchingProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(matchingProducts);
    } catch (error) {
      console.error("Error performing search:", error);
      setSearchResults([]);
      setCategoryResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        categoryResults,
        isSearching,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
