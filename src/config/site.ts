export const siteConfig = {
  name: "BookTokPrint",
  company: {
    legalName: "BookTokPrint Ltd",
    tradingName: "BookTokPrint",
    vatNumber: "GBXXXXXXXXX",
    companyNumber: "XXXXXXXX",
    registeredAddress: "Address to be confirmed",
    supportEmail: "hello@booktokprint.com",
    phone: "+44 XXXX XXXXXX",
  },
  description: "Book-inspired prints for readers, dreamers, and shelf-decorators.",

  nav: {
    links: [
      { href: "/shop", label: "Shop Prints" },
      { href: "/collections", label: "Collections" },
      { href: "/shop?filter=best-sellers", label: "Best Sellers" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact", highlight: true },
    ],
  },

  announcements: [
    "FREE UK SHIPPING ON ORDERS OVER £30",
    "RATED EXCELLENT ★★★★★ BY OUR READERS",
    "BOOK-INSPIRED WALL ART — DESIGNED FOR READERS, BY READERS",
  ],

  shipping: {
    currency: "gbp",
    allowedCountries: ["GB"] as const,
    options: [
      {
        name: "Standard Shipping",
        amount: 399,
        minDays: 3,
        maxDays: 5,
      },
      {
        name: "Express Shipping",
        amount: 799,
        minDays: 1,
        maxDays: 2,
      },
    ],
  },

  features: [
    {
      icon: "BadgeCheck",
      title: "High-Quality Printing",
      description: "Premium paper and vibrant inks for prints that look stunning on your wall.",
    },
    {
      icon: "Maximize",
      title: "Multiple Sizes",
      description: "Available in A5, A4, and A3 to fit any space in your reading nook.",
    },
    {
      icon: "Package",
      title: "Carefully Packaged",
      description: "Every print is packaged with care so it arrives in perfect condition.",
    },
    {
      icon: "Truck",
      title: "Fulfilled by PrintShrimp",
      description: "Professional print fulfilment with fast, reliable UK delivery.",
    },
    {
      icon: "ShieldCheck",
      title: "Quality Assured",
      description: "Every design is carefully checked for excellence before printing.",
    },
    {
      icon: "RotateCcw",
      title: "Easy Returns",
      description: "Hassle-free returns for peace of mind.",
    },
  ],
} as const;
