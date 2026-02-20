import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8">
          Privacy Policy
        </h1>
        <div className="max-w-3xl mx-auto bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-lg p-6">
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <p>
              This Privacy Policy explains how BookTokPrint (&quot;we&quot;,
              &quot;us&quot;, &quot;our&quot;) collects, uses, and shares
              personal information when you visit our website, place an order,
              or contact us for support.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                What personal information we collect
              </h2>
              <p>
                We only collect the information we need to process orders and
                provide customer support. This may include:
              </p>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-main">
                  1) Contact details
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Delivery address</li>
                  <li>Phone number (if provided)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-main">
                  2) Order information
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Items purchased</li>
                  <li>Order totals and delivery details</li>
                  <li>
                    Payment confirmation/status (we do not store full card
                    details)
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-main">
                  3) Customer support information
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Messages you send us (for example, questions about your
                    order, returns, or product enquiries)
                  </li>
                </ul>
              </div>

              <p>
                We do not offer customer accounts and we do not collect
                usernames or passwords.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Cookies and basic website data
              </h2>
              <p>
                Like most websites, we may use cookies or similar technologies
                to help the site function and understand general website usage
                (for example, pages viewed, device/browser type, and approximate
                location based on IP address). This data is used for site
                performance and improvement, not to create customer accounts or
                profiles.
              </p>
              <p>
                You can control cookies through your browser settings. Some site
                features may not work correctly if cookies are disabled.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                How we use your information
              </h2>
              <p>We use your personal information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Process and fulfil orders (including delivery and handling
                  returns/issues)
                </li>
                <li>
                  Communicate with you about your order or enquiries
                </li>
                <li>Provide customer support</li>
                <li>
                  Meet legal and accounting requirements (for example, keeping
                  records of sales)
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Sharing your information
              </h2>
              <p>
                We only share personal information when necessary to run our
                shop, for example with:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Delivery and fulfilment providers (so your order can be
                  printed/packed/shipped)
                </li>
                <li>
                  Payment processors (to take payment securely — we don&apos;t
                  receive or store full payment card details)
                </li>
                <li>
                  Website/IT service providers (hosting and site maintenance)
                </li>
              </ul>
              <p>We do not sell your personal information.</p>
              <p>
                We may also share information if required to comply with legal
                obligations, enforce our policies, or protect our rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                How long we keep your information
              </h2>
              <p>
                We keep personal information only as long as necessary to fulfil
                orders, provide support, and meet legal/tax obligations. After
                that, we delete or anonymise it where appropriate.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Your rights (UK GDPR)
              </h2>
              <p>
                If you are in the UK (or EEA), you may have rights to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Request access to the personal information we hold about you
                </li>
                <li>Ask us to correct inaccurate information</li>
                <li>
                  Request deletion of your information (where we&apos;re not
                  legally required to keep it)
                </li>
                <li>
                  Object to or restrict certain processing in some circumstances
                </li>
              </ul>
              <p>
                To make a request, contact us using the email below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">Contact</h2>
              <p>
                If you have any questions about this Privacy Policy or how we
                use your information, please email:
              </p>
              <p>
                <a
                  href="mailto:hello@booktokprint.com"
                  className="text-main hover:underline"
                >
                  hello@booktokprint.com
                </a>
              </p>
              <p>
                For data protection purposes, BookTokPrint is the data
                controller of your personal information.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
