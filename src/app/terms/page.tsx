import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold text-main text-center mb-8">
          Terms of Service
        </h1>
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-6">
          <div className="space-y-4 text-gray-600">
            <p>
              Please read these Terms of Service carefully before using our
              website.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-main">
                Agreement to Terms
              </h2>
              <div className="space-y-4">
                <p>
                  This website is run by BookTokPrint, an online retailer of book-inspired wall art and prints. Throughout the site,
                  the terms &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;
                  refer to BookTokPrint. BookTokPrint provides this
                  website—along with all information, tools, and Services
                  available on the site—to you, the user, under the condition
                  that you accept all terms, conditions, policies, and notices
                  described here.
                </p>
                <p>
                  By accessing our website and/or purchasing something from us,
                  you participate in our &quot;Service&quot; and agree to abide
                  by these terms and conditions (&quot;Terms of Service,&quot;
                  &quot;Terms&quot;). These Terms include any additional
                  conditions and policies referenced here or accessible via
                  hyperlink. They apply to every user of the site, including,
                  without limitation, browsers, vendors, customers, merchants,
                  and those contributing content.
                </p>
                <p>
                  Please read these Terms of Service carefully before you visit
                  or use our website. By accessing or using any part of our
                  site, you agree to these Terms of Service. If you do not agree
                  with all the terms and conditions herein, you may not use our
                  website or any Services. If these Terms of Service are
                  regarded as an offer, acceptance is expressly limited to these
                  Terms of Service.
                </p>
                <p>
                  Any new features or tools that we add to the current store
                  also fall under these Terms of Service. You can review the
                  most recent version of the Terms of Service on this page at
                  any time. We reserve the right to update, modify, or replace
                  any part of these Terms of Service by posting updates and/or
                  changes on our website. You are responsible for checking this
                  page periodically for changes. Continued use of or access to
                  our website after any changes are posted indicates acceptance
                  of those changes.
                </p>
                <p>
                  Our online store is hosted on Vercel. They provide the
                  hosting platform through which we sell our products and
                  Services to you.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 1 – ONLINE STORE TERMS
              </h2>
              <div className="space-y-4">
                <p>
                  By agreeing to these Terms of Service, you affirm that you are
                  at least the legal age of majority in your country of
                  residence or that you are the age of majority in your country
                  and have given us consent to permit any of your minor
                  dependents to use this site.
                </p>
                <p>
                  You must not use our products for any illegal or unauthorized
                  purpose, nor violate any laws in your jurisdiction (including,
                  but not limited to, copyright laws) through your use of the
                  Service.
                </p>
                <p>
                  You may not transmit any destructive code such as worms or
                  viruses.
                </p>
                <p>
                  Any breach of these Terms will result in the immediate
                  termination of your Services.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 2 – GENERAL CONDITIONS
              </h2>
              <div className="space-y-4">
                <p>
                  We reserve the right, at any time and for any reason, to
                  refuse Service to anyone.
                </p>
                <p>
                  You acknowledge that your content (excluding payment
                  information) may be transferred unencrypted and involve:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Transmissions across different networks.</li>
                  <li>
                    Modifications to conform and adapt to technical requirements
                    of connecting networks or devices.
                  </li>
                </ul>
                <p>
                  Payment information (credit/debit card data) is always
                  encrypted when transferred over networks.
                </p>
                <p>
                  You agree not to reproduce, duplicate, copy, sell, resell, or
                  exploit any aspect of the Service, or access the Service or
                  any contact on the website through which the Service is
                  provided, without our express written permission.
                </p>
                <p>
                  Any headings in this agreement are for convenience only and do
                  not limit or affect these Terms.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 3 – ACCURACY, COMPLETENESS, AND TIMELINESS OF
                INFORMATION
              </h2>
              <div className="space-y-4">
                <p>
                  We are not responsible if the information on this site is not
                  accurate, complete, or current. The material on this site is
                  for general information only and should not be your sole basis
                  for making decisions. You should consult more accurate,
                  complete, or up-to-date sources before making any decisions.
                  Any reliance on the material on this site is at your own risk.
                </p>
                <p>
                  This site may contain historical information, which may not be
                  current and is provided only for reference. We reserve the
                  right to modify the site&quot;s contents at any time, but we
                  have no obligation to update any information. You agree it is
                  your responsibility to monitor changes to our site.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES
              </h2>
              <div className="space-y-4">
                <p>
                  Prices for our products are subject to change without notice.
                </p>
                <p>
                  We reserve the right to modify or discontinue the Service (or
                  any part or content) at any time, without notice.
                </p>
                <p>
                  We will not be liable to you or any third party for any
                  modifications, price changes, suspensions, or discontinuation
                  of the Service.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 5 – PRODUCTS OR SERVICES (IF APPLICABLE)
              </h2>
              <div className="space-y-4">
                <p>
                  Certain products or Services may be available exclusively
                  online via the website. These may have limited quantities and
                  are subject to return or exchange only according to our Refund
                  Policy.
                </p>
                <p>
                  While we strive to display our products colors and images
                  accurately, we cannot guarantee that your computer
                  monitor&quot;s display of any color will be accurate.
                </p>
                <p>
                  We reserve the right, but are under no obligation, to limit
                  the sales of our products or Services to any person,
                  geographic region, or jurisdiction, assessed on a case-by-case
                  basis. We reserve the right to limit the quantities of
                  products or Services offered. All product descriptions and
                  prices can change at any time without notice, at our sole
                  discretion. We may discontinue any product at any time. Any
                  offer for any product or Service on this site is void where
                  prohibited.
                </p>
                <p>
                  We do not guarantee that the quality of any products,
                  Services, information, or other material you purchase or
                  obtain will meet your expectations, nor do we guarantee that
                  any errors in the Service will be corrected.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 6 – ACCURACY OF BILLING AND ACCOUNT INFORMATION
              </h2>
              <div className="space-y-4">
                <p>
                  We reserve the right to refuse any order placed with us. At
                  our discretion, we may limit or cancel quantities per person,
                  per household, or per order. These restrictions can apply to
                  orders placed under the same customer account, credit card,
                  and/or orders using the same billing and/or shipping address.
                  If we make changes to or cancel an order, we may attempt to
                  notify you by contacting the email, billing address, or phone
                  number provided at the time of the order. We also reserve the
                  right to reject orders that appear to be placed by dealers,
                  resellers, or distributors.
                </p>
                <p>
                  You agree to provide current, complete, and accurate purchase
                  and account information for all purchases at our store. You
                  also agree to promptly update any personal and payment
                  information, including email addresses and credit card
                  details, so that we can finalize your transactions and contact
                  you when needed.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 7 – OPTIONAL TOOLS
              </h2>
              <div className="space-y-4">
                <p>
                  We may provide you with access to third-party tools that we
                  neither monitor nor have control or input over.
                </p>
                <p>
                  You acknowledge and agree that access to such tools is
                  provided &quot;as is&quot; and &quot;as available,&quot;
                  without any warranties, representations, or conditions and
                  without any endorsement. We assume no liability arising from
                  or relating to your use of optional third-party tools.
                </p>
                <p>
                  Using these optional tools offered through the site is
                  entirely at your own discretion and risk. You should be
                  familiar with and approve the terms on which the tools are
                  provided by the relevant third-party provider(s).
                </p>
                <p>
                  In the future, we may also offer new Services or features
                  (including new tools and resources) through the website. These
                  new features and/or Services will also be subject to these
                  Terms of Service.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 8 – THIRD-PARTY LINKS
              </h2>
              <div className="space-y-4">
                <p>
                  Some content, products, and Services available through our
                  Service may include materials from third parties.
                </p>
                <p>
                  Third-party links on this site may direct you to websites not
                  affiliated with us. We are not responsible for examining or
                  evaluating the content or accuracy and do not warrant or
                  assume any liability for third-party materials, products,
                  websites, or Services.
                </p>
                <p>
                  We are not responsible for any harm or damages related to
                  purchases or use of goods, Services, resources, or other
                  transactions made with third-party websites. Please review the
                  third partys policies and practices carefully before engaging
                  in any transaction. Any complaints, claims, or questions
                  regarding third-party products should be directed to the
                  relevant third party. We disclaim all responsibility for any
                  activity conducted on a third-party site.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 9 – USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS
              </h2>
              <div className="space-y-4">
                <p>
                  If you send us specific submissions at our request (for
                  example, contest entries) or, without our request, you send
                  creative ideas, suggestions, proposals, or other materials
                  (collectively, &quot;comments&quot;), you agree that we may,
                  at any time and without restriction, edit, copy, publish,
                  distribute, translate, and otherwise use in any medium any
                  comments you submit. We are not obligated to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain any comments in confidence.</li>
                  <li>Pay compensation for comments.</li>
                  <li>Respond to any comments.</li>
                </ul>
                <p>
                  We may (but are not required to) monitor, edit, or remove
                  content that we determine, in our sole discretion, is
                  unlawful, offensive, threatening, defamatory, libelous,
                  pornographic, obscene, otherwise objectionable, or violates
                  any partys intellectual property or these Terms of Service.
                </p>
                <p>
                  You agree that your comments will not breach any third-party
                  rights, including copyright, trademark, privacy, personality,
                  or other personal or proprietary rights. You further agree
                  that your comments will not contain unlawful, abusive, or
                  obscene material or computer viruses/malware that could affect
                  the Service or any related website. You may not use a false
                  email address, pretend to be someone else, or otherwise
                  mislead us or third parties about the origin of any comments.
                  You are solely responsible for the accuracy of any comments
                  you make. We take no responsibility and have no liability for
                  any comments posted by you or any third party.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 10 – PERSONAL INFORMATION
              </h2>
              <div className="space-y-4">
                <p>
                  Your submission of personal information through the store is
                  governed by our
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 11 – ERRORS, INACCURACIES, AND OMISSIONS
              </h2>
              <div className="space-y-4">
                <p>
                  Occasionally, information on our site or within the Service
                  may contain typographical errors, inaccuracies, or omissions
                  that could relate to product descriptions, pricing,
                  promotions, offers, shipping charges, transit times, or
                  availability. We reserve the right to correct these errors,
                  inaccuracies, or omissions and to change or update information
                  or cancel orders if any information in the Service or on a
                  related website is found to be inaccurate at any time without
                  prior notice (including after you have submitted your order).
                </p>
                <p>
                  We undertake no obligation to update, amend, or clarify
                  information in the Service or on any related website,
                  including pricing information, unless required by law. No
                  specified update or refresh date in the Service or on any
                  related website should be assumed to indicate that all
                  information in the Service or on any related website has been
                  modified or updated.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 12 – PROHIBITED USES
              </h2>
              <div className="space-y-4">
                <p>
                  In addition to other prohibitions stated in these Terms of
                  Service, you are prohibited from using the site or its
                  content:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>For any unlawful purpose.</li>
                  <li>
                    To solicit others to perform or participate in unlawful
                    acts.
                  </li>
                  <li>
                    To violate any laws, regulations, rules, or local
                    ordinances. (We are subject to UK legislation, and those
                    laws govern our actions.)
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights
                    or those of others.
                  </li>
                  <li>
                    To harass, abuse, insult, harm, defame, slander, disparage,
                    intimidate, or discriminate based on gender, sexual
                    orientation, religion, ethnicity, race, age, national
                    origin, or disability.
                  </li>
                  <li>To submit false or misleading information.</li>
                  <li>
                    To upload or transmit viruses or any other malicious code
                    that may affect the functionality or operation of the
                    Service, any related website, other websites, or the
                    Internet.
                  </li>
                  <li>
                    To collect or track the personal information of others.
                  </li>
                  <li>
                    To spam, phish, pharm, pretext, spider, crawl, or scrape.
                  </li>
                  <li>For any obscene or immoral purpose.</li>
                  <li>
                    To interfere with or circumvent the security features of the
                    Service or any related website, other websites, or the
                    Internet.
                  </li>
                </ul>
                <p>
                  We reserve the right to terminate your use of the Service or
                  any related website if you violate any prohibited uses.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 13 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
              </h2>
              <div className="space-y-4">
                <p>
                  We do not guarantee that your use of our Service will be
                  uninterrupted, timely, secure, or error-free. We also do not
                  warrant that the results obtained from using the Service will
                  be accurate or reliable.
                </p>
                <p>
                  You agree that we may remove the Service for an indefinite
                  period or cancel the Service at any time without notice.
                </p>
                <p>
                  You expressly agree that your use of (or inability to use) the
                  Service is at your own risk. The Service and all products and
                  Services delivered through it are (except as specifically
                  stated by us) provided &quot;as is&quot; and &quot;as
                  available&quot; for your use, without warranties or conditions
                  of any kind, whether express or implied. This includes implied
                  warranties or conditions of merchantability, merchantable
                  quality, fitness for a particular purpose, durability, title,
                  or non-infringement.
                </p>
                <p>
                  Under no circumstances shall BookTokPrint, its directors,
                  officers, employees, affiliates, agents, contractors, interns,
                  suppliers, Service providers, or licensors be liable for any
                  injury, loss, claim, or direct, indirect, incidental,
                  punitive, special, or consequential damages of any kind. This
                  includes, but is not limited to, lost profits, lost revenue,
                  lost savings, data loss, replacement costs, or other damages
                  related to your use of the Service or any products obtained
                  through the Service, or for any other claim related to your
                  use of the Service or any product (including errors or
                  omissions in any content). Because some jurisdictions do not
                  permit the exclusion or limitation of liability for
                  consequential or incidental damages, our liability is limited
                  to the maximum extent allowed by law extent allowed by law in
                  those jurisdictions.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 14 – INDEMNIFICATION
              </h2>
              <div className="space-y-4">
                <p>
                  You agree to indemnify, defend, and hold harmless BookTokPrint,
                  as well as our parents, subsidiaries, affiliates,
                  partners, officers, directors, agents, contractors, licensors,
                  Service providers, subcontractors, suppliers, interns, and
                  employees, from any claim or demand (including reasonable
                  attorneys fees) arising out of your breach of these Terms of
                  Service or the documents they reference, or your violation of
                  any law or third-party rights.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 15 – SEVERABILITY
              </h2>
              <div className="space-y-4">
                <p>
                  If any provision of these Terms of Service is determined to be
                  unlawful, void, or unenforceable, that provision shall still
                  be enforceable to the fullest extent permitted by law. The
                  unenforceable portion shall be considered severed from these
                  Terms, and such determination will not affect the validity and
                  enforceability of the remaining provisions.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 16 – TERMINATION
              </h2>
              <div className="space-y-4">
                <p>
                  Any obligations or liabilities that arose prior to the
                  termination date will continue after this agreement ends for
                  all relevant purposes.
                </p>
                <p>
                  These Terms of Service remain effective unless you or we end
                  them. You may terminate these Terms at any time by notifying
                  us that you no longer wish to use our Services or by ceasing
                  all use of our site.
                </p>
                <p>
                  If, in our sole judgment, you fail or we suspect you have
                  failed to comply with any term or provision of these Terms, we
                  may end this agreement at any time without notice. You will
                  remain responsible for all amounts due up to and including the
                  date of termination, and we may deny you access to our
                  Services (or any part thereof).
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 17 – ENTIRE AGREEMENT
              </h2>
              <div className="space-y-4">
                <p>
                  Our failure to enforce or exercise any right or provision of
                  these Terms of Service does not constitute a waiver of that
                  right or provision.
                </p>
                <p>
                  These Terms of Service, along with any policies or operating
                  rules posted by us on this site or concerning the Service,
                  form the entire agreement and understanding between you and
                  us. They govern your use of the Service and override any
                  previous or simultaneous agreements, communications, or
                  proposals, whether verbal or written (including prior versions
                  of the Terms of Service).
                </p>
                <p>
                  Any ambiguities in interpreting these Terms of Service shall
                  not be held against the drafting party.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 18 – GOVERNING LAW
              </h2>
              <div className="space-y-4">
                <p>
                  These Terms of Service and any separate agreements through
                  which we provide you Services shall be governed by and
                  interpreted in accordance with the laws of the United Kingdom.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 19 – CHANGES TO TERMS OF SERVICE
              </h2>
              <div className="space-y-4">
                <p>
                  You can always review the most recent version of the Terms of
                  Service on this page.
                </p>
                <p>
                  We reserve the right, at our sole discretion, to update,
                  modify, or replace any part of these Terms of Service by
                  posting changes to our website. It is your responsibility to
                  periodically check for updates. Your continued use of or
                  access to our website or the Service after any changes are
                  posted will constitute your acceptance of those changes.
                </p>
                <p>
                  Any changes to these Terms become effective immediately once
                  published.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-main mt-8 mb-4">
                SECTION 20 – CONTACT INFORMATION
              </h2>
              <div className="space-y-4">
                <p>
                  For any questions about these Terms of Service, please email
                  us at{" "}
                  <a
                    href="mailto:hello@booktokprint.com"
                    className="text-main hover:underline"
                  >
                    hello@booktokprint.com
                  </a>
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Contact Information:</p>
                  <a
                    href="mailto:hello@booktokprint.com"
                    className="text-main hover:underline"
                  >
                    hello@booktokprint.com
                  </a>
                  <p>
                    5 Westfield Drive, Leatherhead, KT23 3NU
                  </p>
                  <p>VAT Number: GB428337584</p>
                  <p>Company Number: 14321221</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
