"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* --- Gradient Accent on Top --- */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E62B1E] via-red-600 to-[#8B1E15]" />

      {/* --- Main Content Section --- */}
      <div className="flex flex-col items-center justify-center text-center section px-6 sm:px-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 md:mb-10 leading-tight">
          Join us as a part of the{" "}
          <span className="text-[#E62B1E] font-extrabold">TEDxCITBengaluru</span> team
        </h3>

        {/* --- Premium Button --- */}
        <button
          onClick={() => router.push("/joinus")}
          className="
            relative group inline-flex items-center justify-center
            px-14 sm:px-16 py-5 sm:py-6 min-h-[3.25rem] sm:min-h-[3.5rem]
            rounded-full text-base sm:text-lg font-semibold tracking-tight whitespace-nowrap leading-normal
            text-white bg-gradient-to-r from-[#E62B1E] to-[#8B1E15]
            shadow-[0_6px_16px_rgba(230,43,30,0.32)]
            ring-1 ring-white/10
            transition-all duration-200 ease-out
            hover:shadow-[0_10px_20px_rgba(230,43,30,0.38)]
            hover:ring-white/20 hover:translate-y-[-1px]
            active:translate-y-0
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E62B1E]/60
          "
        >
          <span className="relative z-10 flex items-center gap-3 sm:gap-4 leading-normal">
            Join Us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.4"
              stroke="currentColor"
              className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>

          {/* Subtle glossy reflection overlay */}
          <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-200" />
        </button>
      </div>

      {/* --- Divider Line --- */}
      <div className="w-4/5 mx-auto border-t border-gray-800" />

      {/* --- Copyright --- */}
      <div className="py-8 text-center text-gray-400 text-sm sm:text-base">
        © 2025{" "}
        <span className="font-semibold text-white">TEDxCITBengaluru</span>. This independent
        TEDx event is operated under license from TED.
      </div>
    </footer>
  );
}
