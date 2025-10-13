"use client";
import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      {/* --- Full-width Mountain Background --- */}
      <div className="absolute inset-0">
        <Image
          src="/images/mountain.svg"
          alt="Mountain background"
          fill
          className="
            object-cover     /* ensures full width coverage */
            object-bottom    /* keeps mountain anchored at bottom */
            w-full h-full
          "
          priority
          sizes="100vw"
        />
      </div>

      {/* --- Optional Birds Decoration --- */}
      <div className="absolute top-[25%] left-8 md:left-16 text-gray-700 opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-20 md:w-32"
        >
          <path d="M2 12 Q10 2, 20 12 Q30 2, 40 12" />
        </svg>
      </div>
    </section>
  );
}
