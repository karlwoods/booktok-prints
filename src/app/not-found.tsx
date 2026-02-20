import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-main-light dark:bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-main mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Oops! Page not found</p>
        <Link
          href="/"
          className="text-main hover:text-main/90 underline text-lg"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
