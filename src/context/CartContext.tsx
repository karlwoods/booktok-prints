"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Product, CartItem } from "@/types";

const STORAGE_KEY = "cart_items";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function persistCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — cart still works in memory
  }
}

/** Match cart items by product id + selected size */
function itemMatches(item: CartItem, productId: string, selectedSize?: string): boolean {
  return item.id === productId && item.selectedSize === selectedSize;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedSize?: string, selectedPrice?: number) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  total: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
    setIsLoading(false);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      persistCart(items);
    }
  }, [items, isLoading]);

  const addToCart = useCallback(
    (product: Product, selectedSize?: string, selectedPrice?: number) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) =>
          itemMatches(item, product.id, selectedSize)
        );
        if (existingItem) {
          return currentItems.map((item) =>
            itemMatches(item, product.id, selectedSize)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [
          ...currentItems,
          {
            ...product,
            price: selectedPrice ?? product.price,
            quantity: 1,
            selectedSize,
          },
        ];
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, selectedSize?: string) => {
      setItems((currentItems) =>
        currentItems.filter((item) => !itemMatches(item, productId, selectedSize))
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, selectedSize?: string) => {
      setItems((currentItems) =>
        currentItems.map((item) =>
          itemMatches(item, productId, selectedSize)
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
