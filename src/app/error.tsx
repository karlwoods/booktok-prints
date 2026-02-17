"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-main-light">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-main">Something went wrong</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <Button
          onClick={reset}
          className="bg-main text-white hover:bg-main/90"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
