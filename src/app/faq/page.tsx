import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqs = [
  {
    question: "What sizes do your prints come in?",
    answer: "Our prints are available in A5, A4, and A3. Check the product page for available sizes for each design.",
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
    answer: "Currently we only ship within the United Kingdom. We hope to offer international shipping in the future.",
  },
  {
    question: "Can I return a print?",
    answer: "Yes! We offer hassle-free returns within 30 days of receipt. The print must be unused and in its original packaging. See our Shipping & Returns page for full details.",
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

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-main mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Got a question? We&apos;ve got answers.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-main mb-2">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
