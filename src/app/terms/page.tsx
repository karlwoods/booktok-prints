import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8">
          Terms of Service
        </h1>
        <div className="max-w-3xl mx-auto bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-lg p-6">
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <p>
              Please read these Terms of Service carefully before using our
              website.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Agreement to these Terms
              </h2>
              <p>
                This website is operated by BookTokPrint, a UK-based small
                business selling book-inspired wall art and prints. Throughout
                the site, the terms &quot;we&quot;, &quot;us&quot; and
                &quot;our&quot; refer to BookTokPrint.
              </p>
              <p>
                By visiting our site and/or purchasing something from us, you
                agree to be bound by these Terms of Service and any additional
                policies referenced on our website (including our Shipping &amp;
                Returns Policy and Privacy Policy). These Terms apply to all
                visitors and users of the site, including customers and
                browsers.
              </p>
              <p>
                If you do not agree to these Terms, you should not use the
                website or purchase from us.
              </p>
              <p>
                We may update these Terms from time to time to reflect changes
                to our business, our products, or legal requirements. The most
                recent version will always be available on this page, and your
                continued use of the website after changes are posted means you
                accept the updated Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Website platform
              </h2>
              <p>
                Our website is hosted on Vercel, which provides the platform we
                use to display and sell our products online.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at{" "}
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
