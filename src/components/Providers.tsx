"use client";

import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/CookieConsent";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <CurrencyProvider>
          <CartProvider>
            <SearchProvider>
              <Toaster />
              <CookieConsent />
              {children}
            </SearchProvider>
          </CartProvider>
        </CurrencyProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
