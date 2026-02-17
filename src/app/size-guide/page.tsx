import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
};

const sizes = [
  { name: "A5", dimensions: "148 x 210 mm", description: "Perfect for desks, shelves, and small spaces." },
  { name: "A4", dimensions: "210 x 297 mm", description: "Our most popular size — great for any room." },
  { name: "A3", dimensions: "297 x 420 mm", description: "A statement piece for your reading nook or living room." },
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
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sizes.map((size) => (
              <div key={size.name} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm text-center">
                <h2 className="text-2xl font-bold text-main mb-2">{size.name}</h2>
                <p className="text-gray-800 font-medium mb-2">{size.dimensions}</p>
                <p className="text-gray-600 text-sm">{size.description}</p>
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
