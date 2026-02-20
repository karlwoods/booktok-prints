"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CurrencyCode = "GBP" | "USD" | "EUR" | "AUD";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // relative to GBP (GBP = 1)
}

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  GBP: { code: "GBP", symbol: "\u00a3", name: "British Pound", rate: 1 },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rate: 1.27 },
  EUR: { code: "EUR", symbol: "\u20ac", name: "Euro", rate: 1.17 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.95 },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInGBP: number) => string;
  convertPrice: (priceInGBP: number) => number;
  currencyInfo: CurrencyInfo;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Auto-detect currency from browser locale/timezone
function detectCurrency(): CurrencyCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("America/") || tz.startsWith("US/")) return "USD";
    if (tz.startsWith("Australia/")) return "AUD";
    if (tz.startsWith("Europe/London") || tz.startsWith("GB")) return "GBP";
    // Most European timezones
    if (tz.startsWith("Europe/")) return "EUR";
  } catch {
    // Ignore detection errors
  }
  return "GBP";
}

const STORAGE_KEY = "booktokprint_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("GBP");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved currency or auto-detect on first visit
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && currencies[saved]) {
      setCurrencyState(saved);
    } else {
      const detected = detectCurrency();
      setCurrencyState(detected);
      localStorage.setItem(STORAGE_KEY, detected);
    }
    setIsInitialized(true);
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const currencyInfo = currencies[currency];

  const convertPrice = useCallback(
    (priceInGBP: number) => {
      return priceInGBP * currencyInfo.rate;
    },
    [currencyInfo.rate]
  );

  const formatPrice = useCallback(
    (priceInGBP: number) => {
      const converted = convertPrice(priceInGBP);
      return `${currencyInfo.symbol}${converted.toFixed(2)}`;
    },
    [convertPrice, currencyInfo.symbol]
  );

  // Avoid rendering with wrong currency before hydration
  if (!isInitialized) {
    return (
      <CurrencyContext.Provider
        value={{
          currency: "GBP",
          setCurrency,
          formatPrice: (p) => `\u00a3${p.toFixed(2)}`,
          convertPrice: (p) => p,
          currencyInfo: currencies.GBP,
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  }

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, convertPrice, currencyInfo }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
