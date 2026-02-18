import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8">
          Shipping &amp; Returns
        </h1>
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-6">
          <div className="space-y-4 text-gray-600">
            <p>
              We aim to provide reliable and efficient shipping to ensure your
              prints reach you safely and on time.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Processing Time</h2>
              <p>
                All orders are processed within 1–2 business days. Orders placed
                during weekends or holidays will be processed on the next
                business day.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Shipping Methods &amp; Delivery Times
              </h2>
              <p>
                Delivery times vary depending on your location and the shipping
                option selected at checkout:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Standard Shipping (estimated 3–5 business days in the UK)</strong>
                  <br />
                  Free on orders over £30 (UK only)
                </li>
                <li>
                  <strong>Express Shipping (estimated 1–2 business days in the UK)</strong>
                  <br />
                  Available at checkout for an additional fee
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Worldwide Shipping</h2>
              <p>
                We ship worldwide via our fulfilment partner PrintShrimp, so your
                order can be produced and shipped as efficiently as possible.
                International delivery times and costs will be shown at checkout.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Tracking Your Order</h2>
              <p>
                Once your order ships, you will receive a shipping confirmation
                email with a tracking number.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Returns</h2>
              <p>
                You have 30 calendar days to return an item from the date you
                received it. To be eligible for a return, the print must be
                unused and in the same condition that you received it, in its
                original packaging.
              </p>
              <p>
                If you&apos;d like to start a return, please get in touch with us
                first and we&apos;ll guide you through the next steps.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Refunds</h2>
              <p>
                Once we receive your returned item, we will inspect it and
                notify you of the status of your refund. If approved, we will
                initiate a refund to your original payment method. You will
                receive the credit within a few days, depending on your card
                issuer&apos;s policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Contact Us</h2>
              <p>
                If you have any questions about shipping or returns, please contact us at{" "}
                <a
                  href="mailto:hello@booktokprint.com"
                  className="text-main hover:underline"
                >
                  hello@booktokprint.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
