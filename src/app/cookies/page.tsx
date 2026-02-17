import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8">Cookie Policy</h1>
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-6">
          <div className="space-y-4 text-gray-600">
            <p>
              This Cookie Policy explains how {siteConfig.name} uses cookies and similar technologies when you visit our website.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">What Are Cookies?</h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences and improve your experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">How We Use Cookies</h2>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the site to function (e.g., shopping cart, cookie consent preference).
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences such as dark mode settings.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Managing Cookies</h2>
              <p>
                You can manage or disable cookies through your browser settings. Note that disabling essential cookies may affect the functionality of the website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at{" "}
                <a href={`mailto:${siteConfig.company.supportEmail}`} className="text-main hover:underline">
                  {siteConfig.company.supportEmail}
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
