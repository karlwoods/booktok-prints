import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8">
          Cookie Policy — BookTokPrint
        </h1>
        <div className="max-w-3xl mx-auto bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-lg p-6">
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <p>
              This Cookie Policy explains how BookTokPrint uses cookies and
              similar technologies when you visit our website.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                What are cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your device when
                you browse a website. They help the website work properly,
                remember your preferences, and understand how the site is used.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                How we use cookies
              </h2>
              <p>We use cookies for the following purposes:</p>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-main">
                  1) Essential cookies (strictly necessary)
                </h3>
                <p>
                  These cookies are required for the website to function and
                  cannot be switched off in our systems. They help with things
                  like:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Site security and basic functionality</li>
                  <li>Remembering cookie consent choices</li>
                  <li>
                    Keeping items in your basket and enabling checkout
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-main">
                  2) Preference / functional cookies
                </h3>
                <p>
                  These cookies help remember the choices you make, such as:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Display preferences (for example, light/dark mode)</li>
                  <li>Region or currency selection (if enabled)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-main">
                  3) Analytics cookies (if enabled)
                </h3>
                <p>
                  If we use analytics tools, these cookies help us understand
                  how visitors use the site (e.g., which pages are visited most,
                  how users move through the site). This information is used to
                  improve performance and usability and does not directly
                  identify you.
                </p>
              </div>

              <p>
                We do not use cookies to sell personal information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Managing your cookie choices
              </h2>
              <p>You can control cookies in two ways:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>On our website:</strong> where available, you can
                  accept or reject non-essential cookies using the cookie
                  banner/settings.
                </li>
                <li>
                  <strong>In your browser:</strong> you can block or delete
                  cookies at any time through your browser settings.
                </li>
              </ul>
              <p>
                Please note: blocking essential cookies may mean parts of the
                website (like the basket or checkout) don&apos;t work as
                intended.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Contact</h2>
              <p>
                If you have any questions about this Cookie Policy, please
                contact us at:{" "}
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
