"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Sidebar from "@/components/sections/social-sidebar";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen overflow-hidden bg-white">
      <Header />
      <Sidebar />
      
      {/* --- Full-width Mountain Background --- */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dkbvknwcu/image/upload/v1760494807/mountain_fpdj37.svg"
          alt="Mountain background"
          fill
          className="object-cover object-bottom w-full h-full"
          priority
          sizes="100vw"
        />

        {/* FADE GRADIENT - Fades mountain from bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
      </div>

      {/* --- Hero Content --- */}
      <div className="relative z-10 container flex items-center justify-center min-h-[90vh] sm:min-h-screen">
        <div className="hero-content">
          {/* Main Headline */}
          <h1 className="hero-headline animate-fade-in-up">
            <span className="hero-headline-emphasis">Ideas</span> Worth Spreading
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Empowering minds to shape tomorrow
          </p>

          {/* Tagline */}
          <p className="hero-tagline animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            Join us in celebrating innovation, creativity, and transformative thinking
          </p>

          {/* Optional CTA Badge */}
          <div className="hero-badge animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <span className="hero-badge-text">TEDxCITBengaluru 2025</span>
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