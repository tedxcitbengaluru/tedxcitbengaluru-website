"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen overflow-hidden bg-white">
      <Header />
      
      {/* --- Full-width Mountain Background --- */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760513189/Mask_group_qwx8ys.svg"
          alt="Mountain background"
          fill
          className="object-cover object-bottom w-full h-full"
          priority
          sizes="100vw"
        />

        {/* FADE GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F1F1F]"></div>
      </div>

      {/* --- Hero Content --- */}
      <div className="relative z-10 container flex items-center justify-center min-h-[90vh] sm:min-h-screen">
        <div className="hero-content flex flex-col items-center text-center">
          
          {/* Main Headline */}
          <h1 className="hero-headline animate-fade-in-up">
            <span className="hero-headline-emphasis">Ideas</span> Worth Spreading
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Empowering minds to shape tomorrow
          </p>

          {/* Tagline */}
          <p
            className="hero-tagline animate-fade-in-up max-w-2xl text-gray-300"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            Join us in celebrating innovation, creativity, and transformative thinking
          </p>

          {/* --- CINEMATIC PREMIUM CTA BUTTON --- */}
          <div
            className="mt-12 relative group animate-fade-in-up"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            {/* Atmospheric glow */}
            <div
              className="absolute -inset-3 rounded-full opacity-60 blur-2xl
              bg-[radial-gradient(circle,rgba(230,43,30,0.55),transparent_65%)]
              group-hover:opacity-100 transition duration-700"
            />

            <Link
              href="/tickets"
              className="
                relative flex items-center justify-center gap-3
                px-9 py-4 sm:px-11 sm:py-5
                rounded-full
                text-white
                font-semibold uppercase tracking-[0.28em]
                overflow-hidden
                bg-gradient-to-r from-[#7a0c05] via-[#E62B1E] to-[#7a0c05]
                shadow-[0_10px_40px_rgba(230,43,30,0.45)]
                transition-all duration-500 ease-out
                hover:scale-[1.06]
                hover:shadow-[0_18px_60px_rgba(230,43,30,0.75)]
                active:scale-95
              "
            >
              {/* Moving inner energy */}
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,0,0,0.35),transparent)] animate-energy" />
              </span>

              {/* Surface depth */}
              <span className="absolute inset-0 rounded-full border border-white/20" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-40" />

              <span className="relative text-sm sm:text-base">
                Get Your Tickets
              </span>

              <svg
                className="relative w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* --- Optional Birds Decoration --- */}
      <div className="absolute top-[22%] left-6 sm:left-8 md:left-16 text-gray-700 opacity-80 animate-fade-in-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-16 sm:w-20 md:w-32"
        >
          <path d="M2 12 Q10 2, 20 12 Q30 2, 40 12" />
        </svg>
      </div>
    </section>
  );
}