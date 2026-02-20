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
import { useCurrency } from "@/context/CurrencyContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(1, "Full name is required"),
  country: z.string().min(1, "Country is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  stateRegion: z.string().optional(),
  postcode: z.string().min(1, "Postcode/ZIP is required"),
});

interface CheckoutResponse {
  sessionId: string;
}

const countries = [
  { code: "GB", name: "United Kingdom", regionLabel: "County" },
  { code: "US", name: "United States", regionLabel: "State" },
  { code: "CA", name: "Canada", regionLabel: "Province" },
  { code: "AU", name: "Australia", regionLabel: "State" },
  { code: "DE", name: "Germany", regionLabel: "Region" },
  { code: "FR", name: "France", regionLabel: "Region" },
  { code: "ES", name: "Spain", regionLabel: "Province" },
  { code: "IT", name: "Italy", regionLabel: "Province" },
  { code: "NL", name: "Netherlands", regionLabel: "Province" },
  { code: "IE", name: "Ireland", regionLabel: "County" },
  { code: "SE", name: "Sweden", regionLabel: "Region" },
  { code: "NO", name: "Norway", regionLabel: "Region" },
  { code: "DK", name: "Denmark", regionLabel: "Region" },
  { code: "FI", name: "Finland", regionLabel: "Region" },
  { code: "AT", name: "Austria", regionLabel: "Region" },
  { code: "BE", name: "Belgium", regionLabel: "Province" },
  { code: "CH", name: "Switzerland", regionLabel: "Canton" },
  { code: "PT", name: "Portugal", regionLabel: "District" },
  { code: "NZ", name: "New Zealand", regionLabel: "Region" },
  { code: "JP", name: "Japan", regionLabel: "Prefecture" },
];

const shippingOptions = [
  { id: "standard", name: "Standard Shipping", price: 0, days: "3–5 business days" },
  { id: "express", name: "Express Shipping", price: 2.00, days: "1–2 business days" },
];

export default function CheckoutPage() {
  const { items, removeFromCart, updateQuantity, total, isLoading } = useCart();
  const { formatPrice } = useCurrency();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form fields
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const selectedShipping = shippingOptions.find(o => o.id === shippingMethod)!;
  const orderTotal = total + selectedShipping.price;

  const selectedCountry = countries.find(c => c.code === country);
  const regionLabel = selectedCountry?.regionLabel || "State/Province/Region";

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      setIsSubmitting(true);

      // Validate form
      const result = checkoutSchema.safeParse({
        email,
        fullName,
        country,
        addressLine1,
        addressLine2,
        city,
        stateRegion,
        postcode,
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
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
      <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-1">
          <h1 className="text-3xl font-bold text-main text-center mb-8 animate-fade-in">
            Checkout
          </h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-card rounded-lg p-4 flex items-center gap-4"
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
    <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8 animate-fade-in">
          Checkout
        </h1>

        <div
          className={`grid ${items.length > 0 ? "lg:grid-cols-2" : ""} gap-8 max-w-6xl mx-auto`}
        >
          {/* Cart Items */}
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Items</h2>
            {items.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}_${item.selectedSize || "default"}`}
                  className="bg-white dark:bg-card rounded-lg p-4 flex items-center gap-4"
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
                      <p className="text-gray-600">
                        {formatPrice(item.price)} each
                      </p>
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
                        onClick={() =>
                          removeFromCart(item.id, item.selectedSize)
                        }
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Form */}
          {items.length > 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-lg p-6 space-y-6">
                <h2 className="text-xl font-semibold text-main">
                  Delivery Details
                </h2>
                <form onSubmit={handleCheckout} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        errors.country ? "border-red-500" : "border-input"
                      }`}
                    >
                      <option value="">Select a country</option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-sm text-red-500">{errors.country}</p>
                    )}
                  </div>

                  {/* Address Line 1 */}
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      type="text"
                      placeholder="123 High Street"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className={errors.addressLine1 ? "border-red-500" : ""}
                    />
                    {errors.addressLine1 && (
                      <p className="text-sm text-red-500">
                        {errors.addressLine1}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">
                      Address Line 2{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="addressLine2"
                      type="text"
                      placeholder="Flat 2, Building name"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="London"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>

                  {/* State/Province/Region */}
                  <div className="space-y-2">
                    <Label htmlFor="stateRegion">{regionLabel}</Label>
                    <Input
                      id="stateRegion"
                      type="text"
                      placeholder={regionLabel}
                      value={stateRegion}
                      onChange={(e) => setStateRegion(e.target.value)}
                    />
                  </div>

                  {/* Postcode/ZIP */}
                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode / ZIP</Label>
                    <Input
                      id="postcode"
                      type="text"
                      placeholder="SW1A 1AA"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className={errors.postcode ? "border-red-500" : ""}
                    />
                    {errors.postcode && (
                      <p className="text-sm text-red-500">{errors.postcode}</p>
                    )}
                  </div>

                  {/* Gift Option */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isGift}
                        onChange={(e) => setIsGift(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-main focus:ring-main"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        This is a gift
                      </span>
                    </label>
                    {isGift && (
                      <div className="space-y-2 pl-7">
                        <Label htmlFor="giftMessage">
                          Gift message{" "}
                          <span className="text-gray-400 font-normal">
                            (optional)
                          </span>
                        </Label>
                        <textarea
                          id="giftMessage"
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Add a personal message..."
                          maxLength={200}
                          rows={3}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                        />
                        <p className="text-xs text-gray-400">
                          {giftMessage.length}/200 characters
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Shipping Method */}
                  <div className="space-y-3 pt-2">
                    <Label>Shipping Method</Label>
                    <div className="space-y-2">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                            shippingMethod === option.id
                              ? "border-main bg-main/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={option.id}
                              checked={shippingMethod === option.id}
                              onChange={(e) =>
                                setShippingMethod(e.target.value)
                              }
                              className="w-4 h-4 text-main focus:ring-main"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {option.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {option.days}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {option.price === 0 ? "Free" : `+${formatPrice(option.price)}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {selectedShipping.price === 0
                          ? "Free"
                          : formatPrice(selectedShipping.price)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                      <span>Total</span>
                      <span>{formatPrice(orderTotal)}</span>
                    </div>
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
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
