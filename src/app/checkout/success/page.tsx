"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-main">
        Thank You for Your Order!
      </h1>
      <p className="text-gray-600">We&apos;ve received your order.</p>
      <div className="space-y-4">
        <p className="text-gray-600">
          Your order number is: <br />
          <span className="font-mono text-main">{sessionId}</span>
        </p>
        <p className="text-gray-600">
          If you have any questions about your order, please email us at{" "}
          <a
            href={`mailto:${siteConfig.company.supportEmail}`}
            className="text-main underline"
          >
            {siteConfig.company.supportEmail}
          </a>
        </p>
      </div>
      <div className="pt-6">
        <Link href="/shop">
          <Button className="bg-main text-white hover:bg-main/90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
              </div>
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
