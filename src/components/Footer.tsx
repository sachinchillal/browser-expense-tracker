import React from "react";

export function FooterComponent() {
  return (
    <footer className="w-full py-4 px-6 mt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm bg-white dark:bg-gray-900">
      <div className="mb-2">
        <span className="font-semibold">Open Source Project</span> &mdash; Made with <span className="font-semibold">Next.js 14</span>
      </div>
      <div className="mb-2">
        <a
          href="https://github.com/sachinchillal/browser-expense-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          GitHub Repository
        </a>
      </div>
      <div className="text-xs text-gray-500">
        Created On 15 Sep, 2025, 6:00 AM
      </div>
    </footer>
  );
}