"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "What sizes do your prints come in?",
    answer: "A5 (14.8\u00d721 cm), A4 (21\u00d729.7 cm), A3 (29.7\u00d742 cm), A2 (42\u00d759.4 cm), A1 (59.4\u00d784.1 cm), 8\u00d710\u201d (20\u00d725 cm), 11\u00d714\u201d (27\u00d735 cm), 11\u00d717\u201d (28\u00d743 cm), 12\u00d718\u201d (30\u00d745 cm), 16\u00d720\u201d (40\u00d750 cm), 16\u00d724\u201d (40\u00d760 cm), 18\u00d724\u201d (45\u00d760 cm), and 24\u00d736\u201d (60\u00d790 cm).\n\nAvailable sizes can vary by design \u2014 please check the size dropdown on the product page for the options for that print.",
  },
  {
    question: "What paper do you print on?",
    answer: "We use high-quality, heavyweight matte paper that produces vibrant colours and sharp detail. All prints are produced by our fulfilment partner, PrintShrimp.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available at checkout. All orders are processed within 1-2 business days.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Shipping Available worldwide. Printed locally from hubs in the UK, USA, Germany, France, Spain, Australia, and EU regions.",
  },
  {
    question: "Can I return a print?",
    answer: null,
  },
  {
    question: "Are frames included?",
    answer: "No, our prints are sold unframed. This allows you to choose a frame that perfectly matches your space.",
  },
  {
    question: "How are prints packaged?",
    answer: "Every print is carefully packaged in a sturdy mailer with protective backing to ensure it arrives in perfect condition.",
  },
  {
    question: "How do I contact you?",
    answer: "You can reach us via our Contact page or email us directly at hello@booktokprint.com.",
  },
];

function FAQItem({ faq }: { faq: { question: string; answer: string | null } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
      >
        <h2 className="text-lg font-semibold text-main pr-4">{faq.question}</h2>
        <span className="text-main text-2xl font-light shrink-0 w-8 h-8 flex items-center justify-center">
          {isOpen ? "\u2013" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
            {faq.answer ? (
              <div className="space-y-3">
                {faq.answer.split("\n").filter(p => p.trim()).map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ) : faq.question === "Can I return a print?" ? (
              <p>
                Yes! We offer hassle-free returns within 30 days of receipt. The print must be unused and in its original packaging. See our{" "}
                <Link href="/shipping" className="text-main underline hover:text-main-dark">
                  Shipping &amp; Returns
                </Link>{" "}
                page for full details.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-main-light dark:bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-main mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Got a question? We&apos;ve got answers.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
