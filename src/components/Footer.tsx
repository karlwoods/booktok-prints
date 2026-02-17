import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-main">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Shop Prints
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=best-sellers" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-main">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-main transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-main">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-main transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
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
