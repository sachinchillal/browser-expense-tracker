import React from "react";

export default function Header() {
  return (
    <header className="w-full py-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold">&#128221; Browser Notepad</h1>
      {/* You can add buttons or icons here, e.g., settings, user profile, etc. */}
    </header>
  );
}
