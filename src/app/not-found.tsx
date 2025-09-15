import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Page Not Found</p>
    <Link href="/">
      <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Go Home</span>
    </Link>
  </div>
);

export default NotFound;
