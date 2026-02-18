import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
};

const sizes = [
  { name: "A5", dimensions: "14.8 × 21 cm" },
  { name: "A4", dimensions: "21 × 29.7 cm" },
  { name: "A3", dimensions: "29.7 × 42 cm" },
  { name: "A2", dimensions: "42 × 59.4 cm" },
  { name: "A1", dimensions: "59.4 × 84.1 cm" },
  { name: '8×10"', dimensions: "20 × 25 cm" },
  { name: '11×14"', dimensions: "27 × 35 cm" },
  { name: '11×17"', dimensions: "28 × 43 cm" },
  { name: '12×18"', dimensions: "30 × 45 cm" },
  { name: '16×20"', dimensions: "40 × 50 cm" },
  { name: '16×24"', dimensions: "40 × 60 cm" },
  { name: '18×24"', dimensions: "45 × 60 cm" },
  { name: '24×36"', dimensions: "60 × 90 cm" },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-main mb-4">Size Guide</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All of our prints are available in standard paper sizes. Here&apos;s a quick guide to help you choose.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sizes.map((size) => (
              <div key={size.name} className="bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-sm text-center">
                <h2 className="text-xl font-bold text-main mb-1">{size.name}</h2>
                <p className="text-gray-600 text-sm">{size.dimensions}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-main mb-4">Tips for Choosing</h2>
            <ul className="space-y-3 text-gray-600">
              <li>Measure your wall space before ordering to ensure the perfect fit.</li>
              <li>A5 prints work beautifully in gallery walls alongside other frames.</li>
              <li>A4 is the most versatile size and suits standard off-the-shelf frames.</li>
              <li>A3 prints make a bold statement and are ideal as a focal point.</li>
              <li>All prints are sold unframed so you can choose the frame that best suits your space.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
