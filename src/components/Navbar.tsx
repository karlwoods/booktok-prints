"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Folder, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { generateSlug } from "@/lib/products";
import { CurrencySelector } from "@/components/CurrencySelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrency, currencies, CurrencyCode } from "@/context/CurrencyContext";

export function Navbar() {
  const { items } = useCart();
  const { searchQuery, setSearchQuery, searchResults, categoryResults, isSearching, performSearch } = useSearch();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { currency, setCurrency, currencyInfo } = useCurrency();

  useEffect(() => setMounted(true), []);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = siteConfig.nav.links.filter(link => !("highlight" in link && link.highlight));
  const contactLink = siteConfig.nav.links.find(link => "highlight" in link && link.highlight);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="relative shrink-0">
            <Image
              src={mounted && resolvedTheme === "dark" ? "/dark-mode-logo.png" : "/final-logo.png"}
              alt={siteConfig.name}
              width={200}
              height={50}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-main transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {contactLink && (
              <Link
                href={contactLink.href}
                className="px-4 py-2 rounded-md border-2 border-main text-main dark:text-main hover:bg-main hover:text-white transition-all duration-300"
              >
                {contactLink.label}
              </Link>
            )}
            <CurrencySelector />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-main dark:text-gray-400 dark:hover:text-main"
              onClick={() => setOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/checkout" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 dark:text-gray-300 hover:text-main"
              >
                <ShoppingBag className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-main text-xs font-medium text-white flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Icons */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-main"
              onClick={() => setOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/checkout" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 dark:text-gray-300 hover:text-main"
              >
                <ShoppingBag className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-main text-xs font-medium text-white flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-main"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-slide-in-right z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-semibold text-main">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-300 hover:text-main"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col py-2 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-3.5 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-main active:bg-gray-200 dark:active:bg-gray-700 transition-colors text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {contactLink && (
                <Link
                  href={contactLink.href}
                  className="px-6 py-3.5 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-main active:bg-gray-200 dark:active:bg-gray-700 transition-colors text-base font-medium border-t border-gray-200 dark:border-gray-700 mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {contactLink.label}
                </Link>
              )}
            </div>

            {/* Settings section: Theme toggle + Currency */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-between w-full px-3 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {resolvedTheme === "dark" ? "Dark Mode" : "Light Mode"}
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-600 shadow-sm">
                    {resolvedTheme === "dark" ? (
                      <Moon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                    ) : (
                      <Sun className="h-4 w-4 text-gray-700" />
                    )}
                  </span>
                </button>
              )}

              {/* Currency selector */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">Currency</span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(currencies).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code as CurrencyCode)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        currency === c.code
                          ? "bg-main text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span>{c.symbol}</span>
                      <span>{c.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search prints or collections..."
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
            performSearch(value);
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {isSearching ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : (
            <>
              {categoryResults.length > 0 && (
                <CommandGroup heading="Collections">
                  {categoryResults.map((category) => (
                    <CommandItem
                      key={category}
                      value={category}
                      onSelect={() => {
                        router.push(`/shop?collection=${encodeURIComponent(category)}`);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-muted-foreground" />
                        <span>{category}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {searchResults.length > 0 && (
                <CommandGroup heading="Prints">
                  {searchResults.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.title}
                      onSelect={() => {
                        router.push(`/prints/${generateSlug(product.title)}`);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </nav>
  );
}
