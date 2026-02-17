"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-main-light">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-main">
          Failed to load products
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn&apos;t load the products right now. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-main text-white hover:bg-main/90"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="border-main text-main">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
