import React from "react";

export const LoaderComponent: React.FC = () => (
  <div className="flex justify-center items-center h-full" role="status" aria-label="Loading">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
  </div>
);