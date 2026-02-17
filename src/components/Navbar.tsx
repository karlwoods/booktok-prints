"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Folder } from "lucide-react";
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

export function Navbar() {
  const { items } = useCart();
  const { searchQuery, setSearchQuery, searchResults, categoryResults, isSearching, performSearch } = useSearch();
  const [open, setOpen] = useState(false);
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

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="relative">
            <h1 className="text-2xl font-bold tracking-tight text-main">
              <span className="font-extrabold">{siteConfig.name.toUpperCase()}</span>
            </h1>
          </Link>
          <div className="flex items-center space-x-8">
            {siteConfig.nav.links.map((link) =>
              "highlight" in link && link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-md border-2 border-main text-main hover:bg-main hover:text-white transition-all duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-main transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-main"
              onClick={() => setOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 hover:text-main"
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
        </div>
      </div>

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
