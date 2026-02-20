"use client";

import { useCurrency, currencies, CurrencyCode } from "@/context/CurrencyContext";
import { useState, useRef, useEffect } from "react";

const currencyList = Object.values(currencies);

export function CurrencySelector() {
  const { currency, setCurrency, currencyInfo } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-main transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Select currency"
      >
        <span className="font-medium">{currencyInfo.symbol}</span>
        <span>{currency}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-700 py-1 min-w-[160px] z-50">
          {currencyList.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code as CurrencyCode);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between ${
                currency === c.code ? "text-main font-medium" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span>
                {c.symbol} {c.code}
              </span>
              <span className="text-gray-400 text-xs">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
