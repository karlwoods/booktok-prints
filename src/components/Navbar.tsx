"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Folder, Menu, X } from "lucide-react";
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
import { siteConfig } from "@/config/site";
import { generateSlug } from "@/lib/products";
import { CurrencySelector } from "@/components/CurrencySelector";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const { items } = useCart();
  const { searchQuery, setSearchQuery, searchResults, categoryResults, isSearching, performSearch } = useSearch();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
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
              src="/booktokprint_banner_logo.jpg"
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
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl flex flex-col animate-slide-in-right z-10">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <span className="text-lg font-semibold text-main">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-main-light hover:text-main transition-colors text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {contactLink && (
                <Link
                  href={contactLink.href}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-main-light hover:text-main transition-colors text-lg border-t border-gray-100 dark:border-gray-800 mt-2 pt-5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {contactLink.label}
                </Link>
              )}
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
