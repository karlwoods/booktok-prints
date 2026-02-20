"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
          We use essential cookies to make our site work. By continuing to browse, you agree to our{" "}
          <Link href="/cookies" className="text-main underline hover:text-main-dark">
            Cookie Policy
          </Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Reject
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-main text-white hover:bg-main-hover"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
