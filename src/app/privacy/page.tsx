import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8">
          Privacy Policy
        </h1>
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-6">
          <div className="space-y-4 text-gray-600">
            <p>
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              our website.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Personal Information We Collect
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-main">
                  Information We Collect Directly from You
                </h3>
                <p className="leading-relaxed">
                  When you use or interact with our Services, you may provide
                  us with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Contact details</strong>, such as your name,
                    address, phone number, and email address.
                  </li>
                  <li>
                    <strong>Order information</strong>, including billing and
                    shipping addresses, payment confirmation, email address,
                    and phone number.
                  </li>
                  <li>
                    <strong>Account information</strong>, such as your
                    username, password, and security questions.
                  </li>
                  <li>
                    <strong>Customer support information</strong>, such as
                    content in messages you send to us via the Services.
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-medium text-main">
                Information We Collect About Your Usage
              </h3>
              <p className="leading-relaxed">
                We may automatically collect details about how you use and
                interact with the Services (&quot;Usage Data&quot;). This can
                involve cookies, pixels, or similar technologies
                (&quot;Cookies&quot;). Usage Data may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device and browser details</li>
                <li>Network connection information</li>
                <li>IP address</li>
                <li>
                  Other information regarding how you engage with the Services
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-medium text-main">
                Information We Obtain from Third Parties
              </h3>
              <p className="leading-relaxed">
                We may also receive personal information from third parties,
                such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Vendors and service providers</strong> that host or
                  support our Site.
                </li>
                <li>
                  <strong>Payment processors</strong> that collect payment
                  details (bank account or credit/debit card information,
                  billing address) to fulfill orders under our contract with
                  you.
                </li>
                <li>
                  <strong>Third parties</strong> we collaborate with, who may
                  use online tracking technologies like pixels, web beacons,
                  software development kits, third-party libraries, and
                  cookies when you visit our Site, open our emails, or
                  interact with our Services or advertisements.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                How We Use Your Personal Information
              </h2>

              <h3 className="text-xl font-medium text-main">
                Providing Products and Services
              </h3>
              <p className="leading-relaxed">
                We use your personal information to deliver the Services under
                our contract with you, which includes processing payments,
                fulfilling orders, and sending notifications regarding your
                account or transactions. We also use this information to
                manage your account, arrange for shipping, and handle returns
                or exchanges.
              </p>

              <h3 className="text-xl font-medium text-main">
                Marketing and Advertising
              </h3>
              <p className="leading-relaxed">
                We may use your personal information for marketing and
                promotional purposes, such as sending you offers by email,
                text message, or postal mail, and displaying relevant ads for
                our products or services on this and other websites. If you
                are in the EEA, we rely on our legitimate interest (Art.
                6(1)(f) GDPR) for these activities.
              </p>

              <h3 className="text-xl font-medium text-main">
                Security and Fraud Prevention
              </h3>
              <p className="leading-relaxed">
                We may use your personal information to detect, investigate,
                or take action against fraudulent, illegal, or malicious
                activities. If you have an account, please keep your login
                details private. If you suspect unauthorized access, contact
                us immediately. If you are in the EEA, our legitimate interest
                (Art. 6(1)(f) GDPR) is the legal basis for protecting our
                website and customers.
              </p>

              <h3 className="text-xl font-medium text-main">
                Communicating with You and Improving Services
              </h3>
              <p className="leading-relaxed">
                We may use your personal information to provide customer
                support and improve our Services. This aligns with our
                legitimate interest (Art. 6(1)(f) GDPR) in being responsive
                and maintaining a professional relationship with you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Cookies
              </h2>
              <p className="leading-relaxed">
                We use Cookies on our Site for various reasons, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Power and improve our Site and Services</li>
                <li>Remember user actions and preferences</li>
                <li>Conduct analytics to better understand user behavior</li>
              </ul>
              <p className="leading-relaxed">
                Your browser may allow you to remove or reject Cookies through
                its controls. However, doing so might adversely impact your
                experience on the Site, and certain features may not function
                properly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                How We Disclose Personal Information
              </h2>
              <p className="leading-relaxed">
                We may share your personal information with third parties
                under specific circumstances related to contractual
                obligations, legitimate business operations, or as otherwise
                described in this Privacy Policy, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Vendors and service providers</strong> performing
                  tasks on our behalf (e.g., IT management, payment
                  processing, data analytics, customer support, cloud storage,
                  and fulfillment or shipping).
                </li>
                <li>
                  <strong>Business and marketing partners</strong> who will
                  use your information in accordance with their own privacy
                  notices.
                </li>
                <li>
                  <strong>Other parties</strong>, when you instruct us to do
                  so or consent to such sharing, for example to facilitate
                  shipping or if you use social media widgets or logins.
                </li>
                <li>
                  <strong>Affiliates</strong> or within our corporate group,
                  for our legitimate interests in running a successful
                  business.
                </li>
                <li>
                  <strong>In connection with a business transaction</strong>,
                  such as a merger or bankruptcy; to comply with legal
                  obligations; to enforce our terms of service; or to protect
                  our rights and those of our users or others.
                </li>
              </ul>
              <p className="leading-relaxed">
                We share the following categories of personal information and
                sensitive personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Identifiers</strong> (contact details, certain order
                  and account information)
                </li>
                <li>
                  <strong>Commercial information</strong> (order details,
                  shopping info, customer support info)
                </li>
                <li>
                  <strong>Internet or similar network activity</strong> (Usage
                  Data)
                </li>
                <li>
                  <strong>Geolocation data</strong> (derived from IP addresses
                  or similar methods)
                </li>
              </ul>
              <p className="leading-relaxed">
                We do not use or disclose sensitive personal information
                without your consent or in a manner that infers
                characteristics about you. With your consent, we may share
                personal information for advertising and marketing purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                User-Generated Content
              </h2>
              <p className="leading-relaxed">
                The Services may allow you to submit product reviews or other
                content in publicly accessible sections. Any information you
                make public can be viewed by anyone, and we cannot guarantee
                that third parties will respect your privacy. You are
                responsible for what you share, and we are not liable for the
                security or privacy of any public content or for third parties
                use of such information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Third Party Websites and Links
              </h2>
              <p className="leading-relaxed">
                Our Site may contain links to websites or platforms operated
                by third parties. If you follow these links, you should review
                the respective privacy policies of those sites. We are not
                responsible for the privacy or security practices of these
                third-party sites, nor for the accuracy or reliability of
                their content. Information you provide on social media
                platforms or other public forums may be accessible to users of
                those platforms. Our inclusion of links does not imply
                endorsement, unless explicitly stated.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Childrens Data
              </h2>
              <p className="leading-relaxed">
                Our Services are not designed for children, and we do not
                knowingly collect their personal information. If you are a
                parent or guardian who believes your child has provided us
                with personal details, please contact us using the information
                below so we can delete this information. As of the effective
                date of this Privacy Policy, we are not aware of any
                &quot;sharing&quot; or &quot;selling&quot; of personal
                information of individuals under 16 years old, as defined by
                applicable law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Security and Retention of Your Information
              </h2>
              <p className="leading-relaxed">
                We strive to protect your personal information, but no
                security measures are foolproof. Please do not use unsecured
                channels to send us sensitive information. How long we keep
                your personal information varies based on factors such as
                maintaining your account, providing Services, fulfilling legal
                obligations, resolving disputes, or enforcing contracts.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Your Rights
              </h2>
              <p className="leading-relaxed">
                Depending on your location, you may have some or all of the
                following rights regarding your personal information. These
                rights may only apply in certain cases, and we may decline
                requests as allowed by law.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Right to Access / Know</strong>: Request information
                  about the personal data we hold about you and how we
                  use/share it.
                </li>
                <li>
                  <strong>Right to Delete</strong>: Ask us to delete your
                  personal data.
                </li>
                <li>
                  <strong>Right to Correct</strong>: Request corrections to
                  any inaccurate personal data we hold about you.
                </li>
                <li>
                  <strong>Right of Portability</strong>: Obtain a copy of your
                  personal data or request its transfer to a third party,
                  where feasible.
                </li>
                <li>
                  <strong>
                    Right to Opt out of Sale or Sharing or Targeted
                    Advertising
                  </strong>
                  : In certain jurisdictions, request that we do not
                  &quot;sell&quot; or &quot;share&quot; your personal data for
                  targeted advertising. We recognize Global Privacy Control
                  signals in applicable regions.
                </li>
                <li>
                  <strong>Restrict Processing</strong>: Ask us to stop or
                  limit our processing of your personal information.
                </li>
                <li>
                  <strong>Withdrawal of Consent</strong>: If we rely on
                  consent, you can withdraw it at any time.
                </li>
                <li>
                  <strong>Appeal</strong>: If we deny your request, you may
                  have the right to appeal our decision.
                </li>
                <li>
                  <strong>Manage Communication Preferences</strong>: Opt out
                  of promotional emails by clicking &quot;unsubscribe&quot; in
                  our emails. We may still send transactional emails about
                  orders or your account.
                </li>
              </ul>
              <p className="leading-relaxed">
                You can exercise these rights through our Site or by
                contacting us at the details provided below. We may request
                additional information to verify your identity before we can
                fulfill certain requests. You can also designate an authorized
                agent, subject to verifying their authority to act on your
                behalf.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Complaints
              </h2>
              <p className="leading-relaxed">
                If you have concerns about how we handle your personal
                information, please reach out to us using the contact
                information below. If you are dissatisfied with our response,
                you may have the right to appeal or to lodge a complaint with
                your local data protection authority (e.g., for the EEA, you
                can find a list at{" "}
                <a
                  href="https://edpb.europa.eu/about-edpb/board/members_en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this link
                </a>
                ).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                International Users
              </h2>
              <p className="leading-relaxed">
                We may transfer, store, and process your personal information
                outside your home country, including by our staff, third-party
                service providers, and partners. If we transfer your personal
                information from Europe, we will rely on recognized transfer
                methods (e.g., European Commissions Standard Contractual
                Clauses) unless it is to a country deemed to offer adequate
                protection.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Contact
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or our
                privacy practices, or if you wish to exercise any of your
                rights, please email us at{" "}
                <a
                  href="mailto:hello@booktokprint.com"
                  className="text-main hover:underline"
                >
                  hello@booktokprint.com
                </a>
              </p>
              <p className="leading-relaxed">
                For purposes of data protection laws, and unless otherwise
                specified, BookTokPrint is the data controller of your
                personal information.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
