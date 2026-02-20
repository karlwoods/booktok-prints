import { NextResponse } from "next/server";
import { CartItem } from "@/types";
import { siteConfig } from "@/config/site";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-01-27.acacia" as const,
      httpClient: Stripe.createFetchHttpClient(),
    })
  : null;

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

interface CheckoutPayload {
  items: CartItem[];
  email: string;
}

function getAbsoluteImageUrl(relativeUrl: string): string {
  // If it's already an absolute URL, return it
  if (relativeUrl.startsWith("http")) {
    return relativeUrl;
  }
  // Otherwise, prepend the base URL
  return `${process.env.NEXT_PUBLIC_BASE_URL}${relativeUrl}`;
}

async function sendDiscordNotification(order: {
  sessionId: string;
  email: string;
  items: CartItem[];
  total: number;
}) {
  const itemsList = order.items
    .map(
      (item) => {
        const sizeLabel = item.selectedSize ? ` (${item.selectedSize})` : "";
        return `• ${item.title}${sizeLabel} - Quantity: ${item.quantity} - £${(
          item.price * item.quantity
        ).toFixed(2)}`;
      }
    )
    .join("\n");

  const message = {
    embeds: [
      {
        title: "🛍️ New Stripe checkout session created!",
        color: 0x7b3f00, // SCNT brown color
        fields: [
          {
            name: "Order ID",
            value: order.sessionId,
            inline: true,
          },
          {
            name: "Customer Email",
            value: order.email,
            inline: true,
          },
          {
            name: "Items",
            value: itemsList,
          },
          {
            name: "Total",
            value: `£${order.total.toFixed(2)}`,
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  if (!DISCORD_WEBHOOK_URL) return;

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
    // Don't throw - we don't want to affect the checkout process
  }
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const payload = (await request.json()) as CheckoutPayload;

    // Validate email
    if (!payload.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate items array
    if (!Array.isArray(payload.items)) {
      return NextResponse.json(
        { error: "Items must be an array" },
        { status: 400 }
      );
    }

    if (payload.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate each item
    for (const item of payload.items) {
      if (!item.id || !item.title || !item.price || !item.quantity) {
        return NextResponse.json(
          { error: "Invalid item data" },
          { status: 400 }
        );
      }
    }

    // Calculate total for Discord notification
    const total = payload.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: payload.items.map((item: CartItem) => {
        const sizeLabel = item.selectedSize ? ` — ${item.selectedSize}` : "";
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${item.title}${sizeLabel}`,
              images: [getAbsoluteImageUrl(item.image)],
            },
            unit_amount: Math.round(item.price * 100), // Convert to pence
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || request.headers.get('origin')}/checkout`,
      customer_email: payload.email,
      shipping_address_collection: {
        allowed_countries: [...siteConfig.shipping.allowedCountries],
      },
      shipping_options: siteConfig.shipping.options.map((opt) => ({
        shipping_rate_data: {
          type: "fixed_amount" as const,
          fixed_amount: {
            amount: opt.amount,
            currency: siteConfig.shipping.currency,
          },
          display_name: opt.name,
          delivery_estimate: {
            minimum: { unit: "business_day" as const, value: opt.minDays },
            maximum: { unit: "business_day" as const, value: opt.maxDays },
          },
        },
      })),
    });

    // Send Discord notification
    await sendDiscordNotification({
      sessionId: session.id,
      email: payload.email,
      items: payload.items,
      total,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
