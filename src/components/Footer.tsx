"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FooterSection({ title, children }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Desktop: always show */}
      <h3 className="hidden md:block text-lg font-semibold text-main">{title}</h3>
      <div className="hidden md:block">{children}</div>

      {/* Mobile: accordion */}
      <button
        className="md:hidden flex items-center justify-between w-full py-3 text-lg font-semibold text-main border-b border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="md:hidden pb-2">{children}</div>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t mt-auto pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 mb-8">
          <FooterSection title="Shop">
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="/shop" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Shop Prints
                </Link>
              </li>
              <li>
                <Link href="/collections" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=best-sellers" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection title="Help">
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="/faq" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection title="Legal">
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="/privacy" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="block py-2 md:py-0 text-sm text-gray-600 hover:text-main transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </FooterSection>
        </div>
        <div className="text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
