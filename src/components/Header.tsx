import Link from "next/link";
import React from "react";

export function HeaderComponent() {
  return (
    <header className="w-full py-4 border-b border-gray-300 dark:border-gray-700 flex flex-wrap items-center justify-between px-6">
      <h1 className="text-2xl font-bold">&#128221; Browser Expense Tracker</h1>
      {/* You can add buttons or icons here, e.g., settings, user profile, etc. */}
      <i className="ms-auto"></i>
      <div className="flex items-center">
        <Link href="/" >
          <button className="p-2 hover:bg-gray-200 rounded">
            &#127968;
          </button>
        </Link>
        <Link href="/notes" >
          <button className="p-0 hover:bg-gray-200 rounded" title="Notes" aria-label="Notes">
            &#128211;
          </button>
        </Link>
      </div>
    </header>
  );
}
