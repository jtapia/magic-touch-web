"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen pt-[60px] flex items-center justify-center">
      <div className="max-w-[480px] mx-auto px-6 py-20 text-center">
        <p className="text-5xl font-extrabold text-red-500 mb-4">!</p>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Something went wrong
        </h2>
        <p className="text-muted leading-relaxed mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}