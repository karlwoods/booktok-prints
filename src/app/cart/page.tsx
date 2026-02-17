"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { loadStripe } from "@stripe/stripe-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface CheckoutResponse {
  sessionId: string;
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, isLoading } = useCart();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    try {
      setIsSubmitting(true);

      // Validate email
      const result = checkoutSchema.safeParse({ email });
      if (!result.success) {
        setEmailError(result.error.errors[0].message);
        return;
      }

      // Create Stripe checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = (await response.json()) as CheckoutResponse;
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-main-light flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-1">
          <h1 className="text-3xl font-bold text-main text-center mb-8 animate-fade-in">
            Your Cart
          </h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-4 flex items-center gap-4"
              >
                <Skeleton className="w-20 h-20 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8 animate-fade-in">
          Your Cart
        </h1>

        <div
          className={`grid ${items.length > 0 ? "md:grid-cols-2" : ""} gap-8`}
        >
          {/* Cart Items */}
          <div className="space-y-4 animate-fade-in">
            {items.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}_${item.selectedSize || "default"}`}
                  className="bg-white rounded-lg p-4 flex items-center gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.selectedSize && (
                      <p className="text-sm text-main font-medium">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600">£{item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border rounded-md bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                              item.selectedSize
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:text-main transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.min(10, item.quantity + 1),
                              item.selectedSize
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:text-main transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Subtotal: £{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
            {items.length > 0 && (
              <div className="text-right text-xl font-semibold">
                Total: £{total.toFixed(2)}
              </div>
            )}
          </div>

          {/* Checkout Form */}
          {items.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-main">
                Checkout
              </h2>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-main text-white hover:bg-main/90"
                  disabled={isSubmitting || items.length === 0}
                >
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  You will be redirected to Stripe to complete your purchase
                  securely.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
